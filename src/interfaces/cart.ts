import type { Product } from "./product";

export interface CartItem {
    productId: string;
    variantId: string;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    updatedAt: string;
}

export interface CartItemDetails {
    cartItem: CartItem;
    product: Product;
    variant: Product["variants"][number];
}