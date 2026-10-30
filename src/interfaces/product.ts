export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  image: string;
  rate: number;
  active: boolean;
  featuredEligible: boolean;
}