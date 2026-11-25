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
                gap-0 sm:gap-1 text-text p-0 my-5 min-h-0 h-110 sm:h-90 grid grid-cols-[50%_auto]
                min-[412px]:grid-cols-[60%_auto] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-[calc(50%-.5rem)_calc(50%-.5rem)]
                grid-rows-[40%_28%_32%] sm:grid-rows-[calc(50%-3.5rem)_calc(50%-5rem)_8rem]
            ">
                <div className="w-full col-span-2 sm:col-span-1 row-span-1 sm:row-span-3">
                    <Link to={`/productos/${product.id}`}>
                        <img
                            src={getAsset(variant.images[0])}
                            alt={`${product.name} - ${variant.color.name}`}
                            className="w-full h-full object-cover"
                        />
                    </Link>
                </div>
                <CardHeader className="gap-0 min-w-0 min-h-0 h-full grid grid-rows-[minmax(0,1fr)_4fr] col-span-2 sm:col-span-1 sm:row-span-1">
                    <Link to={`/productos/${product.id}`}>
                        <CardTitle className="font-semibold text-lg md:text-xl">{product.name}</CardTitle>
                        <CardDescription className="text-text-secondary text-sm md:text-base line-clamp-3 sm:overflow-visible">{product.description}</CardDescription>
                    </Link>
                </CardHeader>
                <CardContent className="
                    font-semibold sm:px-5 min-h-0 text-sm md:text-base sm:mt-5 grid
                    grid-rows-[repeat(3,1.46rem)] grid-cols-[50%_auto] row-span-1
                ">
                    <Link to={`/productos/${product.id}`}>
                        <p className="">Cantidad: </p><span className="justify-self-end text-text-secondary font-normal">{quantity}</span>
                        <p className="">Precio unitario: </p><span className="justify-self-end text-text-secondary font-normal">{formatToCurrency(product.price)}</span>
                        <p className="">Subtotal: </p><span className="justify-self-end text-text-secondary font-normal">{formatToCurrency(product.price * quantity)}</span>
                    </Link>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <div className="justify-evenly gap-2 px-0 sm:px-4 md:p-0 flex-col sm:flex-row">
                        <div className="p-auto ml-3">
                            <QuantitySelector
                                quantity={quantity}
                                onQuantityChange={setQuantity}
                                maxStock={variant.stock}
                            />
                        </div>
                        <Button variant="ghost" size="icon" aria-label="Eliminar producto"
                            onClick={() => {onRemove(product.id, variant.id)}}
                            >
                            <Trash2 className="size-5 md:size-6" />
                        </Button>
                    </div>
                    <div className="w-full">
                        <Button onClick={() => {
                                onUpdateQuantity(product.id, variant.id, quantity);
                            }} disabled={quantity === cartItem.quantity}
                            className="
                                mt-2 w-full px-4 py-2 rounded-sm bg-primary text-surface sm:text-lg lg:text-xl transition-colors duration-400
                                hover:bg-button-secondary hover:text-text active:text-surface active:bg-primary active:duration-0 hover:cursor-pointer
                            "
                        >
                            Confirmar Cambios
                        </Button>
                    </div>
                </CardFooter>
            </Card>
    );
};

export default CartItem;