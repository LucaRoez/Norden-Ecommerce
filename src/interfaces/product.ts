export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	categoryId: number;
	image: string;
	rate: number;
	active: boolean;
	featuredEligible: boolean;
	variants: ProductVariant[];
	features: string[];
	specifications: ProductSpecification[];
	shipping: ProductShipping;
}

export interface ProductVariant {
	id: string;
	color: {
		name: string;
		hex: string;
	};
	images: string[];
	stock: number;
}

export interface ProductSpecification {
	label: string;
	value: string;
	group: string;
}

export interface ProductShipping {
	weight: number;
	weightUnit: "kg" | "g";
	dimensions: {
		width: number;
		height: number;
		depth: number;
		unit: "cm" | "mm";
	};
	shippingClass: ShippingClass;
	handlingTime: number;
}

// Tipos de envío a modo de simulación híper simplificada
export type ShippingClass =
    | "standard"
    | "voluminous"
    | "oversized"
    | "fragile"
    | "heavy";
