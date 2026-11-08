import { useState } from "react";

import ColorSelector from "@/components/layout/product-detail/ColorSelector";
import QuantitySelector from "@/components/layout/product-detail/QuantitySelector";
import { Button } from "@/components/ui/button";
import type { Product, ProductVariant } from "@/interfaces/product";
import { formatToCurrency } from "@/utils/formats";
import { getAsset } from "@/utils/assets";

interface ProductSummaryProps {
    product: Product;
    selectedVariant: ProductVariant;
    onVariantChange: (variantID: string) => void;
    handleAddToCart: (productId: string, variantId: string, quantity: number) => void;
}

const ProductSummary = ({ product, selectedVariant, onVariantChange, handleAddToCart }: ProductSummaryProps) => {
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
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{product.name}</h1>
            <h2 className="text-text-secondary sm:text-lg lg:text-xl">{product.description}</h2>
            <div className="mb-5 grid grid-cols-[1fr_auto]">
                <div className="flex flex-col">
                    <span className="text-lg font-bold sm:text-xl lg:text-2xl">{formatToCurrency(product.price, 'PYG', 'es-PY')}</span>
                    <div className="">
                        <ColorSelector
                            colors={product.variants.map((variant) => ({
                                id: variant.id,
                                name: variant.color.name,
                                hex: variant.color.hex,
                            }))}
                            selectedColorID={selectedVariant.id}
                            onColorChange={handleVariantChange}
                        />
                    </div>
                    <div className="mt-5 sm:mt-6 lg:mt-8">
                        <QuantitySelector
                            quantity={quantity}
                            onQuantityChange={setQuantity}
                            maxStock={selectedVariant.stock}
                        />
                    </div>
                </div>
                <div className="w-full pl-5">
                    <img src={getAsset(product.image)} alt={product.name}
                        className="
                            w-full h-full max-h-58 min-[640px]:max-h-40 min-[715px]:max-h-76 min-[1024px]:max-h-94 object-cover rounded-lg
                        "
                    />
                </div>
            </div>
        </div>
        <div>
            <Button onClick={(event) => {
                event.stopPropagation();
                handleAddToCart(product.id, selectedVariant.id, quantity);
                }} className="
                    mt-2 w-full px-4 py-2 rounded-sm bg-primary text-surface sm:text-lg lg:text-xl transition-colors duration-400
                    hover:bg-button-secondary hover:text-text active:text-surface active:bg-primary active:duration-0 hover:cursor-pointer
                "
            >
                Add to Cart
            </Button>
        </div>
    </div>
  );
}

export default ProductSummary;