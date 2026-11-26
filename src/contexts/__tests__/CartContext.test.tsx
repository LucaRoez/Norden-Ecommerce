import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { useContext } from "react";

import { CartProvider, CartContext } from "../CartContext";
import type { Cart } from "@/interfaces/cart";
import { AppError } from "@/errors/AppError";

import { getCart, addItem, removeItem, updateQuantity, clearCart, } from "@/services/cartServices";
import { useCart } from "@/hooks/useCart";

vi.mock("@/services/cartServices", () => ({
    getCart: vi.fn(),
    addItem: vi.fn(),
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
}));

const emptyCart: Cart = {
    items: [],
    updatedAt: new Date().toISOString(),
};

const populatedCart: Cart = {
    items: [
        { productId: "product-1", variantId: "variant-1", quantity: 3 },
    ],
    updatedAt: new Date().toISOString(),
};

const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);

beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(getCart).mockReturnValue(emptyCart);
});

describe("CartContext", () => {
    // recuperación básica exitosa
    it("inicializa y recupera el carrito almacenado", async () => {
        // Arrange
        vi.mocked(getCart).mockReturnValue(populatedCart);

        // Act
        const { result } = renderHook(() => useContext(CartContext), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current?.status).toBe("ready");
        });

        // Assert
        expect(result.current?.cart).toEqual(populatedCart);
        expect(result.current?.count).toBe(3);
        expect(result.current?.initializationError).toBeNull();
    });

    // error de lectura representado
    it("establece el estado de error si falla la inicialización", async () => {
        const error = new AppError(
            "STORAGE_READ_ERROR",
            "No se pudo recuperar el carrito."
        );

        vi.mocked(getCart).mockImplementation(() => {
            throw error;
        });

        const { result } = renderHook(() => useContext(CartContext), {
            wrapper
        });

        await waitFor(() => {
            expect(result.current?.status).toBe("error");
        });

        expect(result.current?.initializationError).toBe(error);
    });

    // secuencia: error primero, recuperación exitosa con refreshCart segundo
    it("permite recuperar el carrito mediante refreshCart", async () => {
        vi.mocked(getCart)
            .mockImplementationOnce(() => {
                throw new Error("Error inicial");
            })
            .mockReturnValueOnce(populatedCart);

        const { result } = renderHook(() => useContext(CartContext), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current?.status).toBe("error");
        });

        // 2do acto
        act(() => {
            result.current?.refreshCart();
        });

        expect(result.current?.status).toBe("ready");
        expect(result.current?.cart).toEqual(populatedCart);
        expect(result.current?.initializationError).toBeNull();
    });

    // inserción exitosa de contenido compatible
    it("agrega un artículo y actualiza el contador", async () => {
        vi.mocked(addItem).mockReturnValue(populatedCart);

        const { result } = renderHook(() => useContext(CartContext), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current?.status).toBe("ready");
        });

        act(() => {
            result.current?.addItem("product-1", "variant-1", 3);
        });

        expect(addItem).toHaveBeenCalledWith(
            "product-1",
            "variant-1",
            3
        );
        expect(result.current?.cart).toEqual(populatedCart);
        expect(result.current?.count).toBe(3);
    });

    // remoción exitosa de contenido compatible
    it("elimina un artículo del carrito", async () => {
        vi.mocked(removeItem).mockReturnValue(emptyCart);

        const { result } = renderHook(() => useContext(CartContext), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current?.status).toBe("ready");
        });

        act(() => {
            result.current?.removeItem("product-1", "variant-1");
        });

        expect(removeItem).toHaveBeenCalledWith(
            "product-1",
            "variant-1"
        );
        expect(result.current?.cart).toEqual(emptyCart);
    });

    // actualización exitosa de contenido compatible
    it("actualiza la cantidad de un artículo", async () => {
        vi.mocked(updateQuantity).mockReturnValue(populatedCart);

        const { result } = renderHook(() => useContext(CartContext), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current?.status).toBe("ready");
        });

        act(() => {
            result.current?.updateQuantity(
                "product-1",
                "variant-1",
                3
            );
        });

        expect(updateQuantity).toHaveBeenCalledWith(
            "product-1",
            "variant-1",
            3
        );
        expect(result.current?.count).toBe(3);
    });

    // remoción exitosa de todos el contenido del servicio
    it("vacía el carrito", async () => {
        vi.mocked(clearCart).mockReturnValue(emptyCart);

        const { result } = renderHook(() => useContext(CartContext), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current?.status).toBe("ready");
        });

        act(() => {
            result.current?.clearCart();
        });

        expect(clearCart).toHaveBeenCalledOnce();
        expect(result.current?.cart).toEqual(emptyCart);
        expect(result.current?.count).toBe(0);
    });

    // Bloqueo exitoso de petición prematura sin contenido sincronizado (preparado)
    it("bloquea las operaciones cuando el carrito no está listo", async () => {
        vi.mocked(getCart).mockImplementation(() => {
            throw new Error("Error inicial");
        });

        const { result } = renderHook(() => useContext(CartContext), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current?.status).toBe("error");
        });

        expect(() => {
            result.current?.addItem("product-1", "variant-1", 1);
        }).toThrow(
            expect.objectContaining({
                code: "CART_NOT_READY",
            })
        );

        expect(addItem).not.toHaveBeenCalled();
    });

    // recuperación exitosa de error representado como operación fallida
    it("propaga los errores de las operaciones del carrito", async () => {
        const error = new AppError(
            "INSUFFICIENT_STOCK",
            "Stock insuficiente."
        );

        vi.mocked(addItem).mockImplementation(() => {
            throw error;
        });

        const { result } = renderHook(() => useContext(CartContext), {
            wrapper
        });

        await waitFor(() => {
            expect(result.current?.status).toBe("ready");
        });

        expect(() => {
            act(() => {
                result.current?.addItem("product-1", "variant-1", 1);
            });
        }).toThrow(error);
        // verificación final de estado previo preparado tras el fallo
        expect(result.current?.cart).toEqual(emptyCart);
    });

    // simulación de consumo del Contexto por fuera de su Provider (sin el 'wrapper')
    it("arroja un error cuando useCart se utiliza fuera del Provider", () => {
        expect(() => {
            renderHook(() => useCart());
        }).toThrow(
            "useCart debe utilizarse dentro de CartProvider"
        );
    });
});