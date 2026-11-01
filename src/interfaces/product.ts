export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  images: string[];
  rate: number;
  active: boolean;
  featuredEligible: boolean;
}