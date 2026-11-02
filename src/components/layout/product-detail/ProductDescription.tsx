
import type { Product } from "@/interfaces/product";


const ProductDescription = ({ product }: { product: Product }) => {
    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl mb-4">Descripción del producto</h2>
            <p className="text-text-secondary sm:text-lg lg:text-xl">{product.description}</p>
        </div>
    );
}

export default ProductDescription;