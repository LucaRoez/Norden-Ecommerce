import productsData from "../data/products.json";
import type { Product } from "../interfaces/product.ts";
import featuredProducts from "@/data/featured-products.json";

const products: Product[] = productsData as Product[];
const featuredIds = featuredProducts as string[];
const FEATURED_LIMIT = 8;

// Catálogo Completo
export const getProducts = (): Product[] => {
  return products;
};

// Productos por Categoría
export const getProductsByCategory = (
  categoryId: number
): Product[] => {
  return getProducts().filter(
    (product) =>
      product.active &&
      product.categoryId === categoryId
  );
};

// Productos Destacados por ID
export const getFeaturedIds = (): string[] => {
  return featuredIds;
};

// Productos Destacados iniciales
const getDefaultFeaturedIds = (): number[] => {
  return products
    .filter((product) => product.active && product.featuredEligible)
    .slice(0, FEATURED_LIMIT)
    .map((product) => product.id);
};

// Productos Destacados como Productos
export const getFeaturedProducts = (): Product[] => {
  const availableProducts = products.filter((product) => product.active);
  const availableIds = new Set(
    availableProducts.map((product) => product.id)
  );
  const selectedIds = featuredIds.length > 0
    ? featuredIds
    : getDefaultFeaturedIds();

  return selectedIds
    .filter((id) => availableIds.has(id as number))
    .map((id) => availableProducts.find((product) => product.id === id)!) // regla básica
    .slice(0, FEATURED_LIMIT);
};

// Productos Destacados por fecha
export async function getFeaturedProductsByDate(
): Promise<Product[]> {
  const eligible = products.filter((product) => product.active);

  if (eligible.length === 0 || FEATURED_LIMIT <= 0) {
    return [];
  }

  // Patrón temporal
  const now = new Date();
  const dayNumber = Math.floor(
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ) / 86_400_000
  );

  const start = dayNumber % eligible.length;
  const resultCount = Math.min(FEATURED_LIMIT, eligible.length);

  return Array.from({ length: resultCount }, (_, index) => {
    return eligible[(start + index) % eligible.length];                   // regla temporal
  });
}