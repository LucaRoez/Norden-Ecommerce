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
  group?: string;
}

export interface ProductShipping {
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: "cm" | "mm";
  };
  shippingClass: string;
  handlingTime: number;
}