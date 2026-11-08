export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    passwordHash?: string;
    createdAt: string;
}

export interface Address {
    id: string;
    userId: string;
    recipient: string;
    street: string;
    number: string;
    apartment?: string;
    city: string;
    department: string;
    postalCode?: string;
    references?: string;
    isDefault: boolean;
}
export type AddressSnapshot = Omit<
    Address,
    "id" | "userId" | "isDefault"
>;

export interface Order {
    id: string;
    userId: string | null;

    customer: {
        name: string;
        email: string;
        phone: string;
    };

    shippingAddress: AddressSnapshot;

    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    total: number;

    status: OrderStatus;
    createdAt: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
    productId: string;
    variantId: string;
    name: string;
    quantity: number;
    subTotal: number;
}