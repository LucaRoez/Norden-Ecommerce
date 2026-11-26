
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import Cart from "@/pages/Cart";
import { useCart } from "@/hooks/useCart";
import { getProductByID } from "@/services/productServices";
import { mockProduct } from "@/services/__tests__/fixtures/mockProduct";

import type { Cart as CartData } from "@/interfaces/cart";
import { AppError } from "@/errors/AppError";

vi.mock("@/hooks/useCart", () => ({
    useCart: vi.fn(),
}));

vi.mock("@/services/productServices", () => ({
    getProductByID: vi.fn(),
}));

vi.mock("@/components/layout/cart/CartItem", () => ({
    default: () => <div data-testid="cart-item" />,
}));

vi.mock("@/components/layout/cart/CartSummary", () => ({
    default: () => <div data-testid="cart-summary" />,
}));

const emptyCart: CartData = {
    items: [],
    updatedAt: new Date().toISOString(),
};

const populatedCart: CartData = {
    items: [
        {
            productId: "product-1",
            variantId: "variant-1",
            quantity: 2,
        },
    ],
    updatedAt: new Date().toISOString(),
};

const defaultContext = {
    cart: emptyCart,
    count: 0,
    status: "ready" as const,
    initializationError: null,
    refreshCart: vi.fn(),
    addItem: vi.fn(),
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
};

const renderCart = () =>
    render(
        <MemoryRouter>
            <Cart />
        </MemoryRouter>
    );

beforeEach(() => {
    vi.resetAllMocks();

    vi.mocked(useCart).mockReturnValue(defaultContext);
    vi.mocked(getProductByID).mockReturnValue(mockProduct);
});

describe("CartPage", () => {
    // recarga de carrito exitosamente desplegada en la interfaz
    it("muestra el estado de carga", () => {
        // Arrange
        vi.mocked(useCart).mockReturnValue({
            ...defaultContext,
            status: "loading",
        });

        // Act
        renderCart();

        // Assert
        expect(screen.getByText("Recuperando tu carrito...")).toBeInTheDocument();
    });

    // error de carrito exitosamente desplegado en la interfaz + exitosa llamada a 'refreshCart'
    it("muestra el error y permite reintentar", () => {
        const refreshCart = vi.fn();

        vi.mocked(useCart).mockReturnValue({
            ...defaultContext,
            status: "error",
            initializationError: new AppError("STORAGE_READ_ERROR", "Error de almacenamiento"),
            refreshCart,
        });

        renderCart();

        expect(screen.getByText("Error de almacenamiento")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));

        expect(refreshCart).toHaveBeenCalledOnce();
    });

    // ausencia de carrito exitosamente desplegada en la interfaz
    it("muestra el estado vacío y el enlace al catálogo", () => {
        renderCart();

        expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Explorar productos" }))
            .toHaveAttribute("href", "/productos");
    });

    // carga de carrito exitosamente desplegada en la interfaz
    it("renderiza los artículos disponibles y el resumen", () => {
        vi.mocked(useCart).mockReturnValue({
            ...defaultContext,
            cart: populatedCart,
        });

        renderCart();

        expect(screen.getByTestId("cart-item")).toBeInTheDocument();
        expect(screen.getByTestId("cart-summary")).toBeInTheDocument();
    });

    // ausencia o pérdida de carga de segundo elemento en el carrito exitosamente desplegado en la interfaz
    it("advierte cuando un producto ya no existe en el catálogo", () => {
        vi.mocked(useCart).mockReturnValue({
            ...defaultContext,
            cart: populatedCart,
        });

        vi.mocked(getProductByID).mockReturnValue(undefined);

        renderCart();

        expect(screen.getByRole("status")).toHaveTextContent(
            "Algunos productos de tu carrito ya no están disponibles"
        );
        expect(screen.queryByTestId("cart-item")).not.toBeInTheDocument();
        expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
    });

    // ausencia o pérdida de carga de objeto anidado en el carrito exitosamente desplegado en la interfaz
    it("advierte cuando la variante ya no existe en el producto", () => {
        vi.mocked(useCart).mockReturnValue({
            ...defaultContext,
            cart: populatedCart,
        });

        vi.mocked(getProductByID).mockReturnValue({
            ...mockProduct,
            variants: [],
        });

        renderCart();

        expect(screen.getByRole("status")).toBeInTheDocument();
        expect(screen.queryByTestId("cart-item")).not.toBeInTheDocument();
    });
});