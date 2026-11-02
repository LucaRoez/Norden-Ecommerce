import { useState } from "react";

import ColorSelector from "@/components/layout/product-detail/ColorSelector";
import QuantitySelector from "@/components/layout/product-detail/QuantitySelector";
import { Button } from "@/components/ui/button";
import type { Product, ProductVariant } from "@/interfaces/product";
import { formatToCurrency } from "@/utils/formats";

interface ProductSummaryProps {
    product: Product;
    selectedVariant: ProductVariant;
    onVariantChange: (variantID: string) => void;
}

const ProductSummary = ({ product, selectedVariant, onVariantChange }: ProductSummaryProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleVariantChange = (variantID: string) => {
        const variant = product.variants.find(
            (v) => v.id === variantID
        );

        if (!variant) return;

        setQuantity(1);
        onVariantChange(variantID);
    };

  return (
    <div className="flex flex-col justify-between p-5">
        <div className="mb-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{product.name}</h1>
            <p className="text-text-secondary sm:text-lg lg:text-xl">{product.description}</p>
            <p className="text-lg font-bold sm:text-xl lg:text-2xl">{formatToCurrency(product.price, 'PYG', 'es-PY')}</p>
            <ColorSelector
                colors={product.variants.map((variant) => ({
                    id: variant.id,
                    name: variant.color.name,
                    hex: variant.color.hex,
                }))}
                selectedColorID={selectedVariant.id}
                onColorChange={handleVariantChange}
            />
            <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                maxStock={selectedVariant.stock}
            />
        </div>
        <div>
            <Button className="
                w-full px-4 py-2 rounded-sm bg-primary text-surface sm:text-lg lg:text-xl transition-colors duration-400
                hover:bg-button-secondary hover:text-text active:text-surface active:bg-primary active:duration-0
            ">
                Add to Cart
            </Button>
        </div>
    </div>
  );
}

export default ProductSummary;