import type { Product } from "@/interfaces/product";

export const createProduct = (
    overrides: Partial<Product> = {}
): Product => ({
    id: "product-1",
    name: "Lámpara de madera",
    description: "Iluminación para interiores",
    price: 100000,
    category: "Iluminación",
    categoryId: 1,
    image: "/images/lamp.jpg",
    rate: 4.5,
    active: true,
    featuredEligible: true,
    variants: [],
    features: ["Madera natural", "Luz cálida"],
    specifications: [],
    shipping: {
        weight: 1,
        weightUnit: "kg",
        dimensions: {
            width: 20,
            height: 30,
            depth: 20,
            unit: "cm",
        },
        shippingClass: "standard",
        handlingTime: 1,
    },
    ...overrides,
});