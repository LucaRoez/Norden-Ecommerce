
import Hero from "@/components/layout/products/Hero";
import ProductGrid from "@/components/layout/products/ProductGrid";
import { useSearchParams } from "react-router";
import { getCategoryBySlug, getCategories } from "@/services/categoryServices";
import { getProductsByCategory } from "@/services/productServices";
import type { Category } from "@/interfaces/category";


const Products = () => {
    const [searchParams] = useSearchParams();
    const slug = searchParams.get("categoria");
    const defaultCategory = getCategories().find((c) => c.id === 0)!;
    const category: Category = slug
        ? getCategoryBySlug(slug) ?? defaultCategory
        : defaultCategory;

    const products = getProductsByCategory(category.id);
  
    return (
        <div>
            <Hero category={category} />
            <ProductGrid products={products} />
        </div>
    )
}

export default Products;