
import ProductBreadcrumb  from "@/components/layout/product-detail/ProductBreadcrumb";
import ProductImages from "@/components/layout/product-detail/ProductImages";

import { useParams, Navigate } from "react-router";
import { getProductByID } from "@/services/productServices";
import { getCategoryByID, getCategories } from "@/services/categoryServices";


const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const product = getProductByID(id);
    if (!product)
        return <Navigate to="/404" replace />;

    const category = getCategoryByID(product.categoryId) ?? getCategories()[0];

    return (
        <article className="bg-surface">
            <section className="grid grid-cols-1 sm:grid-cols-2">
                <div>
                    <ProductImages images={product.images} alt={product.name} />
                </div>
                <div>
                    <ProductBreadcrumb productName={product.name} categoryName={category.name} categorySlug={category.slug} />
                </div>
            </section>
            <section></section>
        </article>
    )
}

export default ProductDetail;