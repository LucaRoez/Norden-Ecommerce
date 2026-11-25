import { getProductByID } from "@/services/productServices";

import type { Cart, CartItem } from "@/interfaces/cart";
import type { Product } from "@/interfaces/product";
import { AppError } from "@/errors/AppError";

const CART_STORAGE_KEY = "norden-cart";

// Funciones privadas
// start
const createEmptyCart = (): Cart => ({
    items: [],
    updatedAt: new Date().toISOString(),
});
// delegations
const getVariantStock = (
    productId: string,
    variantId: string
): number => {
    const product = getProductByID(productId);

    if (!product) {
        throw new AppError(
            "PRODUCT_NOT_FOUND",
            "El producto no existe o no está disponible."
        );
    }

    const variant = product?.variants.find(
        variant => variant.id === variantId
    );

    if (!variant) {
        throw new AppError(
            "VARIANT_NOT_FOUND",
            "La variante solicitada no existe."
        );
    }

    return variant.stock;
};
// security
const validateQuantity = (
    quantity: number,
    maxStock: number
): void => {
    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new AppError(
            "INVALID_QUANTITY",
            "La cantidad debe ser un entero positivo."
        );
    }

    if (quantity > maxStock) {
        throw new AppError(
            "INSUFFICIENT_STOCK",
            "La cantidad solicitada supera el stock disponible."
        );
    }
};
const isCartItem = (value: unknown): value is CartItem => {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const item = value as Record<string, unknown>;

    return (
        typeof item.productId === "string" &&
        typeof item.variantId === "string" &&
        Number.isInteger(item.quantity) &&
        (item.quantity as number) >= 1
    );
};
const isCart = (value: unknown): value is Cart => {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const cart = value as Record<string, unknown>;

    return (
        Array.isArray(cart.items) &&
        cart.items.every(isCartItem) &&
        typeof cart.updatedAt === "string" &&
        !Number.isNaN(Date.parse(cart.updatedAt))
    );
};

// Recuperar carrito
export const getCart = (): Cart => {
    let storedCart: string | null;

    try {
        storedCart = localStorage.getItem(CART_STORAGE_KEY);
    } catch (error) {
        throw new AppError(
            "STORAGE_READ_ERROR",
            "No se pudo acceder al almacenamiento del carrito.",
            { cause: error }
        );
    }

    if (!storedCart) return createEmptyCart();

    try {
        const parsedData: unknown = JSON.parse(storedCart);

        if (!isCart(parsedData)) {
            throw new AppError(
                "STORAGE_DATA_INVALID",
                "La estructura de los datos almacenados del carrito no es válida."
            );
        }

        return parsedData;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(
            "STORAGE_DATA_INVALID",
            "Los datos almacenados del carrito no son válidos.",
            { cause: error }
        );
    }
};

// Persistir carrito
const saveCart = (cart: Cart): void => {
    const updatedCart: Cart = {
        ...cart,
        updatedAt: new Date().toISOString(),
    };

    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    } catch (error) {
        throw new AppError(
            "STORAGE_WRITE_ERROR",
            "No se pudo guardar el carrito.",
            { cause: error }
        );
    }
};

// Agregar producto
export const addItem = (
    productId: string,
    variantId: string,
    quantity: number = 1
): Cart => {
    const cart = getCart();
    const maxStock = getVariantStock(productId, variantId);

    const existingItem = cart.items.find(
        item => item.productId === productId &&
                item.variantId === variantId
    );

    const newQuantity = existingItem
        ? existingItem.quantity + quantity
        : quantity;

    validateQuantity(newQuantity, maxStock);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId,
            variantId,
            quantity,
        });
    }

    saveCart(cart);
    return cart;
};

// Eliminar producto
export const removeItem = (
    productId: string,
    variantId: string
): Cart => {
    const cart = getCart();

    cart.items = cart.items.filter(
        item => !(item.productId === productId &&
                  item.variantId === variantId)
    );

    saveCart(cart);
    return cart;
};

// Actualizar cantidad
export const updateQuantity = (
    productId: string,
    variantId: string,
    quantity: number
): Cart => {
    const cart = getCart();
    const maxStock = getVariantStock(productId, variantId);

    validateQuantity(quantity, maxStock);

    const item = cart.items.find(
        item => item.productId === productId &&
                item.variantId === variantId
    );

    if (!item) {
        throw new AppError(
            "CART_ITEM_NOT_FOUND",
            "El producto solicitado no se encuentra en el carrito."
        );
    }
    item.quantity = quantity;

    saveCart(cart);
    return cart;
};

// Vaciar carrito
export const clearCart = (): Cart => {
    const cart = createEmptyCart();

    saveCart(cart);
    return cart;
};

// Obtener cantidad total de unidades
export const getCartCount = (): number => {
    const cart = getCart();

    return cart.items.reduce(
        (total, item) => total + item.quantity,
        0
    );
};

// Calcular subtotal
export const getCartSubtotal = (products: Product[]): number => {
    const cart = getCart();

    return cart.items.reduce((total, item) => {
        const product = products.find(
            product => product.id === item.productId
        );

        if (!product) return total;

        const variant = product.variants.find(
            variant => variant.id === item.variantId
        );

        if (!variant) return total;

        return total + product.price * item.quantity;
    }, 0);
};
