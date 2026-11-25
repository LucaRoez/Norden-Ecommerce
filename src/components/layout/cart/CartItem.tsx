import { Trash2 } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import type { CartItemDetails } from "@/interfaces/cart";
import { formatToCurrency } from "@/utils/formats";
import { getAsset } from "@/utils/assets";
import QuantitySelector from "../QuantitySelector";
import { Link } from "react-router";

interface CartItemProps extends CartItemDetails {
    onRemove: (productId: string, variantId: string) => void;
    onUpdateQuantity: (productId: string, variantId: string, quantity: number) => void;
}

const CartItem = ({ cartItem, product, variant, onRemove, onUpdateQuantity }: CartItemProps) => {
    const [quantity, setQuantity] = useState(cartItem.quantity);

    return (
        <Card className="
            gap-0 py-0 h-120 sm:h-90 text-text sm:my-5 grid grid-cols-1 sm:grid-cols-2
            grid-rows-[45%_auto_minmax(auto_15%)_1fr] sm:grid-rows-[auto_auto_auto]
        ">
            <div className="w-full min-h-0 sm:row-span-2">
                <Link to={`/productos/${product.id}`}>
                    <img
                        src={getAsset(variant.images[0])}
                        alt={`${product.name} - ${variant.color.name}`}
                        className="w-full h-full object-cover"
                    />
                </Link>
            </div>
            <CardHeader className="pt-2 min-w-0 min-h-0 h-full grid grid-rows-1">
                <Link to={`/productos/${product.id}`} className="grid grid-rows-[1fr_3fr]">
                    <CardTitle className="mb-2 font-semibold text-lg md:text-xl">{product.name}</CardTitle>
                    <CardDescription className="text-text-secondary text-sm md:text-base line-clamp-3">{product.description}</CardDescription>
                </Link>
            </CardHeader>
            <div className="min-w-0 min-h-0 items-center gap-2 grid grid-cols-2 sm:grid-cols-1">
                <CardContent className="font-semibold min-w-0 min-h-0 text-sm md:text-base sm:px-5">
                    <Link to={`/productos/${product.id}`}>
                    <div className="flex justify-between">
                        <p className="">Cantidad: </p><span className="justify-self-end text-text-secondary font-normal">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                        <p className="">Precio unitario: </p><span className="justify-self-end text-text-secondary font-normal">{formatToCurrency(product.price)}</span>
                    </div>
                    <div className="flex justify-between">
                        <p className="">Subtotal: </p><span className="justify-self-end text-text-secondary font-normal">{formatToCurrency(product.price * quantity)}</span>
                    </div>
                    </Link>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-evenly sm:gap-3 sm:px-4">
                        <QuantitySelector
                            quantity={quantity}
                            onQuantityChange={setQuantity}
                            maxStock={variant.stock}
                        />
                        <Button variant="ghost" size="icon" aria-label="Eliminar producto"
                            onClick={() => {onRemove(product.id, variant.id)}}
                            >
                            <Trash2 className="size-5 md:size-6" />
                        </Button>
                </CardFooter>
            </div>
            <div className="col-span-1 sm:col-span-2 p-5 pt-0 sm:w-[90%] sm:place-self-end">
                <Button onClick={() => {
                        onUpdateQuantity(product.id, variant.id, quantity);
                    }} disabled={quantity === cartItem.quantity}
                    className="
                        mt-2 w-full px-4 py-2 rounded-sm bg-primary text-surface sm:text-lg lg:text-xl
                        transition-colors duration-400 hover:bg-button-secondary hover:text-text
                        active:text-surface active:bg-primary active:duration-0 hover:cursor-pointer
                    "
                >
                    Confirmar Cambios
                </Button>
            </div>
        </Card>
    );
};

export default CartItem;