import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { Cart as CartData } from "@/interfaces/cart";
import { AppError } from "@/errors/AppError";

import {
    getCart,
    addItem as addCartItem,
    removeItem as removeCartItem,
    updateQuantity as updateCartQuantity,
    clearCart as clearCartService,
} from "@/services/cartServices";

type CartStatus = "loading" | "ready" | "error";
interface CartContextValue {
    cart: CartData;
    count: number;
    status: CartStatus;
    initializationError: AppError | null;
    refreshCart: () => void;
    addItem: (productId: string, variantId: string, quantity?: number) => void;
    removeItem: (productId: string, variantId: string) => void;
    updateQuantity: (productId: string, variantId: string, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);



export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartData>({
        items: [],
        updatedAt: new Date().toISOString(),
    });
    // variables para controlar un posible error al iniciar
    const [status, setStatus] = useState<CartStatus>("loading");
    const [initializationError, setInitializationError] =
        useState<AppError | null>(null);

    // operación vinculada a este posible error de conexión inicial
    const ensureCartReady = (): void => {
        if (status !== "ready") {
            throw new AppError(
                "CART_NOT_READY",
                "El carrito todavía no está disponible."
            );
        }
    };
    const refreshCart = () => {
        try {
            const storedCart = getCart();

            setCart(storedCart);
            setInitializationError(null);
            setStatus("ready");
        } catch (error) {
            const appError = error instanceof AppError
                ? error
                : new AppError(
                    "UNEXPECTED_ERROR",
                    "Ocurrió un error inesperado al recuperar el carrito.",
                    { cause: error }
                );

            setInitializationError(appError);
            setStatus("error");
        }
    };
    useEffect(() => {
        refreshCart();
    }, []);

    const count = cart.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const addItem = (
        productId: string,
        variantId: string,
        quantity: number = 1
    ) => {
        ensureCartReady();
        setCart(addCartItem(productId, variantId, quantity));
    };

    const removeItem = (productId: string, variantId: string) => {
        ensureCartReady();
        setCart(removeCartItem(productId, variantId));
    };

    const updateQuantity = (
        productId: string,
        variantId: string,
        quantity: number
    ) => {
        ensureCartReady();
        setCart(updateCartQuantity(productId, variantId, quantity));
    };

    const clearCart = () => {
        ensureCartReady();
        setCart(clearCartService());
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                count,
                status,
                initializationError,
                refreshCart,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};