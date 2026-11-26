import type { Product } from "@/interfaces/product";

export const mockProduct: Product = {
    id: "product-1",
    name: "Producto de prueba",
    description: "Descripción de prueba",
    price: 150000,
    category: "Decoración",
    categoryId: 1,
    image: "/images/test.jpg",
    rate: 5,
    active: true,
    featuredEligible: false,
    variants: [
        {
            id: "variant-1",
            color: {
                name: "Natural",
                hex: "#A28B73",
            },
            images: ["/images/test.jpg"],
            stock: 10,
        },
    ],
    features: [],
    specifications: [],
    shipping: {
        weight: 1,
        weightUnit: "kg",
        dimensions: {
            width: 20,
            height: 20,
            depth: 20,
            unit: "cm",
        },
        shippingClass: "standard",
        handlingTime: 2,
    },
};

export const mockProductWithStock5: Product = {
    ...mockProduct,
    variants: mockProduct.variants.map(variant => ({
        ...variant,
        stock: 5,
    })),
};

export const mockProduct2: Product = {
    ...mockProduct,
    id: "product-2",
    name: "Segundo producto de prueba",
    variants: mockProduct.variants.map(variant => ({
        ...variant,
        id: "variant-2",
    })),
};