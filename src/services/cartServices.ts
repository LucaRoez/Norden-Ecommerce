
import type { Cart } from "@/interfaces/cart";
import type { Product } from "@/interfaces/product";

const CART_STORAGE_KEY = "norden-cart";

const createEmptyCart = (): Cart => ({
    items: [],
    updatedAt: new Date().toISOString(),
});

// Recuperar carrito
export const getCart = (): Cart => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) return createEmptyCart();

    try {
        return JSON.parse(storedCart) as Cart;
    } catch {
        return createEmptyCart();
    }
};

// Persistir carrito
const saveCart = (cart: Cart): void => {
    const updatedCart: Cart = {
        ...cart,
        updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
};

// Agregar producto
export const addItem = (
    productId: string,
    variantId: string,
    quantity: number = 1
): Cart => {
    const cart = getCart();

    const existingItem = cart.items.find(
        item => item.productId === productId &&
                item.variantId === variantId
    );

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

    if (quantity <= 0) {
        return removeItem(productId, variantId);
    }

    const item = cart.items.find(
        item => item.productId === productId &&
                item.variantId === variantId
    );

    if (item) {
        item.quantity = quantity;
    }

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
