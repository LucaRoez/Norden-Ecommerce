import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router";

import ProductBreadcrumb  from "@/components/layout/product-detail/ProductBreadcrumb";
import ProductImages from "@/components/layout/product-detail/ProductImages";
import ProductSummary from "@/components/layout/product-detail/ProductSummary";
import ProductDescription from "@/components/layout/product-detail/ProductDescription";

import { getProductByID } from "@/services/productServices";
import { getCategoryByID, getCategories } from "@/services/categoryServices";


const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedVariantID, setSelectedVariantID] = useState<string | null>(
        null
    );

    useEffect(() => {                           // reinicia la selección al cambiar de producto
        setSelectedVariantID(null);
    }, [id]);

    const product = getProductByID(id);
    if (!product)                               // seguro contra errores de usuario
        return <Navigate to="/404" replace />;

    const category = getCategoryByID(product.categoryId) ?? getCategories()[0];

    const selectedVariant =
        product.variants.find(
            (variant) => variant.id === selectedVariantID
        ) ?? product.variants[0];
    
    return (
        <article className="bg-surface">
            <section className="grid grid-rows-[3rem_1fr]">
                <div className="flex justify-center items-center">
                    <ProductBreadcrumb productName={product.name} categoryName={category.name} categorySlug={category.slug} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <ProductImages key={selectedVariant.id} images={selectedVariant.images} alt={product.name + " - " + selectedVariant.id} />
                    <ProductSummary key={product.id} product={product} selectedVariant={selectedVariant} onVariantChange={setSelectedVariantID} />
                </div>
            </section>
            <section>
                <ProductDescription product={product} />
            </section>
        </article>
    )
}

export default ProductDetail;