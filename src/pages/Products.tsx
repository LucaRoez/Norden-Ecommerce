import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Hero from "@/components/layout/products/Hero";
import ProductGrid from "@/components/layout/products/ProductGrid";
import Aside from "@/components/layout/products/Aside";
import { useSearchParams } from "react-router";
import { getCategoryBySlug, getCategories } from "@/services/categoryServices";
import { getProductsByCategory } from "@/services/productServices";
import type { Category } from "@/interfaces/category";

type SortOrder =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "rating-desc";

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortOrder, setSortOrder] = useState<SortOrder>("relevance");
    
    // buscador inicial de la Categoría
    const slug = searchParams.get("categoria");
    const defaultCategory = getCategories().find((c) => c.id === 0)!;
    const category: Category = slug
        ? getCategoryBySlug(slug) ?? defaultCategory
        : defaultCategory;

    // manipulador de Categoría elegida
    const products = getProductsByCategory(category.id);
    const handleCategoryChange = (categoryId: number) => {
        const selected = getCategories().find((c) => c.id === categoryId);
        if (!selected) return;

        setSearchParams(
            categoryId === 0 ? {} : { categoria: selected.slug }
        );
    };

    // manipulador del rango de precio elegido
    const [priceRange, setPriceRange] = useState<number[]>([0,2000000]);
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            return (
                product.price >= priceRange[0] &&
                product.price <= priceRange[1]
            );
        });
    }, [products, priceRange]);
    
    // ordenador de Productos
    const sortedProducts = useMemo(() => {
        const result = [...filteredProducts];

        switch (sortOrder) {
            case "price-asc":
                return result.sort((a, b) => a.price - b.price);

            case "price-desc":
                return result.sort((a, b) => b.price - a.price);

            case "name-asc":
                return result.sort((a, b) =>
                a.name.localeCompare(b.name, "es"),
                );

            case "name-desc":
                return result.sort((a, b) =>
                b.name.localeCompare(a.name, "es"),
                );

            case "rating-desc":
                return result.sort((a, b) => b.rate - a.rate);

            case "relevance":   // falta implementación !!!
            default:
                return result;
        }
    }, [products, sortOrder]);

    const sortLabels: Record<SortOrder, string> = {
        "relevance": "Relevancia",
        "price-asc": "Precio: menor a mayor",
        "price-desc": "Precio: mayor a menor",
        "name-asc": "Nombre: A-Z",
        "name-desc": "Nombre: Z-A",
        "rating-desc": "Mejor valorados",
    };

    return (
        <div className="bg-background">
            <Hero category={category} />
            <section className="grid grid-cols-1 gap-8 md:grid-cols-[240px_minmax(0,1fr)]">
                <Aside
                    selectedCategory={category.id}
                    onCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                />
                <section id="sorted-products" className="mx-auto max-w-7xl px-4 py-8">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-text-secondary">
                            {sortedProducts.length} productos
                        </p>

                        <div className="flex items-center gap-3">
                            <label htmlFor="catalog-sort" className="text-sm whitespace-nowrap">
                                Ordenar por
                            </label>

                            <Select
                                value={sortOrder}
                                onValueChange={(value) => setSortOrder(value as SortOrder)}
                            >
                                <SelectTrigger id="catalog-sort" className="w-[220px]">
                                    <SelectValue>
                                        {sortLabels[sortOrder]}
                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="relevance">Relevancia</SelectItem>
                                    <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                                    <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                                    <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                                    <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
                                    <SelectItem value="rating-desc">Mejor valorados</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <ProductGrid products={sortedProducts} />
                </section>
            </section>
        </div>
    )
}

export default Products;