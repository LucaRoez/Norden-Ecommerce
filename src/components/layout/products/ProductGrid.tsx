import ProductCard from "./ProductCard";
import type { Product } from "@/interfaces/product";

interface ProductGridProps {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {

    return (
        <section id="product-grid" className="mx-5 my-5">
            <div className="
                grid gap-4 grid-cols-1 xs:grid-cols-[repeat(2,minmax(0,1fr))]
                lg:grid-cols-[repeat(3,minmax(0,1fr))] xl:grid-cols-[repeat(4,minmax(0,1fr))]
            ">
                {
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </div>
        </section>
    );
};

export default ProductGrid;