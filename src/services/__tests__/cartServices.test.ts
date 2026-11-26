import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getCart, CART_STORAGE_KEY } from "../cartServices";
import { addItem, updateQuantity, removeItem, clearCart, getCartCount, getCartSubtotal } from "../cartServices";
import { getProductByID } from "@/services/productServices";

import type { Product } from "@/interfaces/product";
import { mockProduct, mockProduct2, mockProductWithStock5 } from "./fixtures/mockProduct";

vi.mock("@/services/productServices", () => ({
    getProductByID: vi.fn(),
}));

beforeEach(() => {
    localStorage.clear();
});
afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
});

// READ ops
describe("getCart", () => {
    // recuperación básica
    it("devuelve un carrito vacío cuando no existe uno almacenado", () => {
        const cart = getCart();

        expect(cart.items).toEqual([]);
        expect(cart.updatedAt).toBeDefined();
        expect(Date.parse(cart.updatedAt)).not.toBeNaN();
    });

    // contenido válido y persistido en memoria local
    it("recupera un carrito válido almacenado", () => {
        // Arrange
        const storedCart = {
            items: [
                {
                    productId: "product-1",
                    variantId: "variant-1",
                    quantity: 2,
                },
            ],
            updatedAt: new Date().toISOString(),
        };

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));

        // Act
        const cart = getCart();

        // Assert
        expect(cart).toEqual(storedCart);
    });

    // intento de persistir en local contenido de formato incompatible
    it("lanza STORAGE_DATA_INVALID cuando el JSON almacenado está corrupto", () => {
        localStorage.setItem(CART_STORAGE_KEY, "{invalid-json");

        expect(() => getCart()).toThrow(
            expect.objectContaining({
                code: "STORAGE_DATA_INVALID",
            })
        );
    });

    // intento de persistir en local contenido de formato compatible pero con un campo inválido
    it("lanza STORAGE_DATA_INVALID cuando los datos almacenados no cumplen la estructura de Cart", () => {
        const invalidCart = {
            items: "invalid",
            updatedAt: new Date().toISOString(),
        };

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(invalidCart));

        expect(() => getCart()).toThrow(
            expect.objectContaining({
                code: "STORAGE_DATA_INVALID",
            })
        );
    });

    // error de lectura representado
    it("lanza STORAGE_READ_ERROR cuando falla el acceso al almacenamiento", () => {
        vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
            throw new Error("Storage unavailable");
        });

        expect(() => getCart()).toThrow(
            expect.objectContaining({
                code: "STORAGE_READ_ERROR",
            })
        );
    });
});

describe("getCartCount", () => {
    // función idempotente, variante con contenido en el servicio
    it("devuelve la suma total de unidades de todos los elementos", () => {
        // Arrange
        vi.mocked(getProductByID).mockImplementation((productId) => {
            if (!productId) return undefined;

            const products: Record<string, Product> = {
                "product-1": mockProduct,
                "product-2": mockProduct2,
            };

            return products[productId];
        });

        addItem("product-1", "variant-1", 3);
        addItem("product-2", "variant-2", 2);

        // Act && Assert
        expect(getCartCount()).toBe(5);
    });

    // llamada alternativa sin contenido en el servicio (y/o en memoria)
    it("devuelve cero cuando el carrito está vacío", () => {
        expect(getCartCount()).toBe(0);
    });
});

describe("getCartSubtotal", () => {
    // llamada con contenido válido, con su parámetro (el catálogo) compatible con el contenido y su consecuente cálculo exitoso
    it("calcula el subtotal de los productos del carrito", () => {
        // Arrange
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        addItem("product-1", "variant-1", 2);

        // Act
        const subtotal = getCartSubtotal([mockProduct]);

        // Assert
        expect(subtotal).toBe(300000);
    });

    // llamada sobre contenido válido, pero su parámetro incompatible con el contenido
    it("ignora los elementos cuyo producto no existe en el catálogo", () => {
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        addItem("product-1", "variant-1", 2);

        const subtotal = getCartSubtotal([]);

        expect(subtotal).toBe(0);
    });

    // llamada sobre contenido válido, pero con su objeto anidado representado deshabilitado dentro de su parámetro
    it("ignora los artículos cuya variante no existe en el catálogo", () => {
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        addItem("product-1", "variant-1", 2);

        const productWithoutVariants: Product = {
            ...mockProduct,
            variants: [],
        };

        const subtotal = getCartSubtotal([productWithoutVariants]);

        expect(subtotal).toBe(0);
    });
});

// CREATE ops
describe("addItem", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // llamada compatible con el contenido representado
    it("agrega un producto nuevo al carrito", () => {
        // Arrange
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        // Act
        const cart = addItem("product-1", "variant-1", 2);

        // Assert
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0]).toEqual({
            productId: "product-1",
            variantId: "variant-1",
            quantity: 2,
        });
    });

    // segunda llamada compatible sobre el mismo producto representado
    it("incrementa la cantidad cuando el producto ya existe en el carrito", () => {
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        addItem("product-1", "variant-1", 2);

        const cart = addItem("product-1", "variant-1", 3);

        expect(cart.items).toHaveLength(1);
        expect(cart.items[0].quantity).toBe(5);
    });

    // llamada sobre producto representado, pero con una cantidad incompatible con su rango mínimo
    it("lanza INVALID_QUANTITY cuando se intenta agregar una cantidad menor a uno", () => {
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        expect(() => addItem("product-1", "variant-1", 0)).toThrow(
            expect.objectContaining({
                code: "INVALID_QUANTITY",
            })
        );
    });

    // llamada sobre producto representado, pero con cantidad incompatible con su rango máximo
    it("lanza INSUFFICIENT_STOCK cuando la cantidad supera el stock disponible", () => {
        vi.mocked(getProductByID).mockReturnValue({
            id: "product-1",
            variants: [
                {
                    id: "variant-1",
                    stock: 5,
                },
            ],
        } as Product);

        expect(() => addItem("product-1", "variant-1", 6)).toThrow(
            expect.objectContaining({
                code: "INSUFFICIENT_STOCK",
            })
        );
    });

    // segunda llamada sobre producto representado, pero nuevamente superando la cantidad máxima
    it("lanza INSUFFICIENT_STOCK cuando la cantidad acumulada supera el stock", () => {
        vi.mocked(getProductByID).mockReturnValue(mockProductWithStock5);

        addItem("product-1", "variant-1", 4);

        expect(() => addItem("product-1", "variant-1", 2)).toThrow(
            expect.objectContaining({
                code: "INSUFFICIENT_STOCK",
            })
        );
        // resultado final y coherente
        expect(getCart().items[0].quantity).toBe(4);
    });

    // llamada sobre objeto representado como inexistente
    it("lanza PRODUCT_NOT_FOUND cuando el producto no existe", () => {
        vi.mocked(getProductByID).mockReturnValue(undefined);   // undefined es la respuesta efectiva del caso

        expect(() => addItem("invalid-product", "variant-1", 1)).toThrow(
            expect.objectContaining({
                code: "PRODUCT_NOT_FOUND",
            })
        );
    });

    // llamada sobre objeto anidado representado como inexistente
    it("lanza VARIANT_NOT_FOUND cuando la variante no existe", () => {
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        expect(() => addItem("product-1", "invalid-variant", 1)).toThrow(
            expect.objectContaining({
                code: "VARIANT_NOT_FOUND",
            })
        );
    });
});

// UPDATE ops
describe("updateQuantity", () => {
    // llamada sobre contenido válidado, con parámetros compatibles con la representación
    it("actualiza la cantidad de un elemento existente", () => {
        // Arrange
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        addItem("product-1", "variant-1", 2);

        // Act
        const cart = updateQuantity("product-1", "variant-1", 5);

        // Assert
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0].quantity).toBe(5);
    });

    // llamada sobre contenido inválido (el servicio está vacío), aunque el objeto representado podrían ser compatibles con la petición y sus parámetros
    it("lanza CART_ITEM_NOT_FOUND cuando el elemento no existe en el carrito", () => {
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        // la llamada es sobre un objeto representado existente, pero sobre un carrito vacío
        expect(() => updateQuantity("product-1", "variant-1", 3)).toThrow(
            expect.objectContaining({
                code: "CART_ITEM_NOT_FOUND",
            })
        );
    });

    // llamada sobre contenido válido, pero con un parámetro incompatible con su rango mínimo
    it("lanza INVALID_QUANTITY cuando se intenta establecer una cantidad menor a uno", () => {
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        addItem("product-1", "variant-1", 2);

        expect(() => updateQuantity("product-1", "variant-1", 0)).toThrow(
            expect.objectContaining({
                code: "INVALID_QUANTITY",
            })
        );
    });

    // llamada sobre contenido válido, pero con un parámetro incompatible con su rango máximo
    it("lanza INSUFFICIENT_STOCK cuando la cantidad supera el stock disponible", () => {
        vi.mocked(getProductByID).mockReturnValue(mockProductWithStock5);

        addItem("product-1", "variant-1", 2);

        expect(() => updateQuantity("product-1", "variant-1", 6)).toThrow(
            expect.objectContaining({
                code: "INSUFFICIENT_STOCK",
            })
        );

        expect(getCart().items[0].quantity).toBe(2);
    });
});

// REMOVE ops
describe("removeItem", () => {
    // llamada sobre contenido válido
    it("elimina un elemento existente del carrito", () => {
        // Arrange
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        addItem("product-1", "variant-1", 2);

        // Act
        const cart = removeItem("product-1", "variant-1");

        // Assert
        expect(cart.items).toHaveLength(0);
    });

    // llamada inválida con su objeto anidado representado
    it("no modifica el carrito cuando el elemento no existe", () => {
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        addItem("product-1", "variant-1", 2);

        const cart = removeItem("product-1", "invalid-variant");

        // el resultado final no debe modificar el contenido del servicio
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0]).toEqual({
            productId: "product-1",
            variantId: "variant-1",
            quantity: 2,
        });
    });
});

describe("clearCart", () => {
    // llamada idempotente, única prueba unitaria necesaria
    it("vacía todos los elementos del carrito", () => {
        // Arrange
        vi.mocked(getProductByID).mockReturnValue(mockProduct);

        addItem("product-1", "variant-1", 3);

        // Act
        const cart = clearCart();

        // Assert
        expect(cart.items).toHaveLength(0);
        expect(getCart().items).toHaveLength(0);
    });
});