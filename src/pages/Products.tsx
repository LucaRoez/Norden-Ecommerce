import { useMemo, useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";

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

import { getCategoryByID, getCategoryBySlug, getCategories } from "@/services/categoryServices";
import { getProductsByCategory, getProducts } from "@/services/productServices";
import { registerProductEvent, getProductPopularity } from "@/services/searchAnalyticsServices";
import type { Category } from "@/interfaces/category";
import type { Product } from "@/interfaces/product";

type SortOrder =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "rating-desc";

const sortLabels: Record<SortOrder, string> = {
    "relevance": "Relevancia",
    "price-asc": "Precio: menor a mayor",
    "price-desc": "Precio: mayor a menor",
    "name-asc": "Nombre: A-Z",
    "name-desc": "Nombre: Z-A",
    "rating-desc": "Mejor valorados",
};

const normalize = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q")?.trim() ?? "";
    const [sortOrder, setSortOrder] = useState<SortOrder>("relevance");
    
    // buscador inicial de la Categoría
    const slug = searchParams.get("categoria");
    const defaultCategory = getCategoryByID(0) as Category;
    const category: Category = slug
        ? getCategoryBySlug(slug) ?? defaultCategory
        : defaultCategory;

    // manipulador de Categoría elegida
    const products = getProductsByCategory(category.id);
    const handleCategoryChange = (categoryId: number) => {
        const selected = getCategories().find((c) => c.id === categoryId);
        if (!selected) return;

        setSearchParams({categoria: selected.slug});
    };

    // manipulador del rango de precio elegido
    const prices = getProducts()
        .filter((product) => product.active)
        .map((product) => product.price);
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);

    // resultado final (de búsqueda + filtros aplicados)
    const filteredProducts = useMemo(() => {
        const normalize = (value: string) =>
            value
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

        const normalizedQuery = normalize(query);

        return products.filter((product) => {
            const matchesPrice =
                product.price >= priceRange[0] &&
                product.price <= priceRange[1];

            const searchableText = normalize([
                product.name,
                product.description,
                product.category,
                ...(product.features ?? []),
            ].join(" "));

            const matchesQuery =
                !normalizedQuery ||
                searchableText.includes(normalizedQuery);

            return matchesPrice && matchesQuery;
        });
    }, [products, priceRange]);
    
    // ordenador de Productos
    const sortedProducts = useMemo(() => {
        const popularity = getProductPopularity();
        const normalizedQuery = normalize(query);

        // lógica para la 'relevancia'
        const getTextScore = (product: Product): number => {
            if (!normalizedQuery) return 0;

            const name = normalize(product.name);
            const category = normalize(product.category);
            const description = normalize(product.description);
            const features = normalize(product.features.join(" "));

            let score = 0;

            if (name === normalizedQuery) score += 100;
            else if (name.includes(normalizedQuery)) score += 80;

            if (category.includes(normalizedQuery)) score += 60;
            if (features.includes(normalizedQuery)) score += 50;
            if (description.includes(normalizedQuery)) score += 30;
            
            return 0;
        };
        const popularityBonus = (productId: string) => {
            const score = popularity[productId] ?? 0;
            return Math.min(15, Math.log1p(score) * 3); // "suavizador" de distorsiones para la 'popularidad'
        };

        return [...filteredProducts].sort((a, b) => {
            switch (sortOrder) {
                case "relevance":
                    return (
                        (getTextScore(b) + popularityBonus(b.id)) -
                        (getTextScore(a) + popularityBonus(a.id))
                    );

                case "price-asc":
                    return a.price - b.price;

                case "price-desc":
                    return b.price - a.price;

                case "name-asc":
                    return a.name.localeCompare(b.name);

                case "name-desc":
                    return b.name.localeCompare(a.name);

                case "rating-desc":
                    return b.rate - a.rate;

                default:
                    return 0;
            }
        });
    }, [filteredProducts, sortOrder]);
    
    // controlador de analíticas
    const registeredImpressions = useRef(new Set<string>());

    useEffect(() => {
        if (!query) return;

        sortedProducts.forEach((product) => {
            const eventKey = `${query}:${product.id}`;

            if (registeredImpressions.current.has(eventKey)) return;

            registerProductEvent(product.id, "impression", "search", query);
            registeredImpressions.current.add(eventKey);
        });
    }, [sortedProducts, query]);

    return (
        <div className="bg-surface">
            <Hero category={category} />
            <section className="grid grid-cols-1 gap-8 md:grid-cols-[240px_minmax(0,1fr)]">
                <Aside
                    categories={getCategories()}
                    selectedCategory={category.id}
                    onCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    maxPrice={maxPrice}
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

                    <ProductGrid products={sortedProducts} query={query} />
                </section>
            </section>
        </div>
    )
}

export default Products;