import type { Product } from "@/interfaces/product";
import { normalize } from "@/utils/normalizations";

// lógica para la 'relevancia'
export const getTextScore = (
    product: Product,
    query: string
): number => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) return 0;

    const terms = normalizedQuery.split(/\s+/);

    const name = normalize(product.name);
    const category = normalize(product.category);
    const description = normalize(product.description);
    const features = normalize(product.features.join(" "));

    return terms.reduce((total, term) => {
        let score = 0;

        if (name === term) score += 100;
        else if (name.includes(term)) score += 80;

        if (category.includes(term)) score += 60;
        if (features.includes(term)) score += 50;
        if (description.includes(term)) score += 30;

        return total + score;
    }, 0)
};

export const getPopularityBonus = (
    productId: string,
    popularity: Record<string, number>
): number => {
    const score = popularity[productId] ?? 0;

    return Math.min(15, Math.log1p(score) * 3);
};