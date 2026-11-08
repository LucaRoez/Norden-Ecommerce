import { createContext, useState } from "react";
import type { ReactNode } from "react";

import type { Cart as CartData } from "@/interfaces/cart";

import {
    getCart,
    addItem as addCartItem,
    removeItem as removeCartItem,
    updateQuantity as updateCartQuantity,
    clearCart as clearCartService,
} from "@/services/cartServices";

interface CartContextValue {
    cart: CartData;
    count: number;
    addItem: (productId: string, variantId: string, quantity?: number) => void;
    removeItem: (productId: string, variantId: string) => void;
    updateQuantity: (productId: string, variantId: string, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartData>(() => getCart());

    const count = cart.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const addItem = (
        productId: string,
        variantId: string,
        quantity: number = 1
    ) => {
        setCart(addCartItem(productId, variantId, quantity));
    };

    const removeItem = (productId: string, variantId: string) => {
        setCart(removeCartItem(productId, variantId));
    };

    const updateQuantity = (
        productId: string,
        variantId: string,
        quantity: number
    ) => {
        setCart(updateCartQuantity(productId, variantId, quantity));
    };

    const clearCart = () => {
        setCart(clearCartService());
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                count,
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