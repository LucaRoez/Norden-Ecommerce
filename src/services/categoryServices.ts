import categoriesData from "@/data/categories.json";
import type { Category } from "@/interfaces/category";

const categories: Category[] = categoriesData;

// Categorías
export const getCategories = (): Category[] => categories;
export const getCategoryBySlug = (slug: string) =>
  categories.find((category) => category.slug === slug);
export const getCategoryByID = (id: number) =>
  categories.find((category) => category.id === id);