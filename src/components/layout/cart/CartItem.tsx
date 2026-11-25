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
import { useCart } from "@/hooks/useCart";
import { AppError } from "@/errors/AppError";

interface CartItemProps extends CartItemDetails {
    onRemove: (productId: string, variantId: string) => void;
    onUpdateQuantity: (productId: string, variantId: string, quantity: number) => void;
}

const CartItem = ({ cartItem, product, variant, onRemove, onUpdateQuantity }: CartItemProps) => {
    const { status } = useCart();
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleRemove = () => {
        try {
            setErrorMessage(null);
            onRemove(product.id, variant.id);
        } catch (error) {
            setErrorMessage(
                error instanceof AppError
                    ? error.message
                    : "No se pudo eliminar el producto."
            );
        }
    };

    const handleUpdateQuantity = () => {
        try {
            setErrorMessage(null);
            onUpdateQuantity(product.id, variant.id, quantity);
        } catch (error) {
            setErrorMessage(
                error instanceof AppError
                    ? error.message
                    : "No se pudo actualizar la cantidad."
            );
        }
    };

    return (
        <Card className="
            gap-0 py-0 h-120 sm:h-90 text-text sm:my-5 grid grid-cols-1 sm:grid-cols-2
            grid-rows-[40%_minmax(0,20%)_minmax(0,30%)_10%] sm:grid-rows-[auto_auto_auto]
        ">
            <div className="w-full min-h-0 sm:row-span-2">
                <Link to={`/productos/${product.id}`} className="h-full min-h-0">
                    <img
                        src={getAsset(variant.images[0])}
                        alt={`${product.name} - ${variant.color.name}`}
                        className="w-full h-full object-cover"
                    />
                </Link>
            </div>
            <CardHeader className="pt-2 min-w-0 min-h-0 h-full grid grid-rows-1 gap-0">
                <Link to={`/productos/${product.id}`}
                    className="grid grid-rows-[1fr_3fr]"
                    aria-label={`Ver detalles de ${product.name}`}
                >
                    <CardTitle className="mb-2 font-semibold text-lg md:text-xl">{product.name}</CardTitle>
                    <CardDescription className="text-text-secondary text-sm md:text-base line-clamp-3">{product.description}</CardDescription>
                </Link>
            </CardHeader>
            <div className="min-w-0 min-h-0 items-center gap-2 grid grid-cols-2 sm:grid-cols-1">
                <CardContent className="font-semibold min-w-0 min-h-0 text-sm md:text-base sm:px-5">
                    <Link to={`/productos/${product.id}`}>
                        <dl>
                            <div className="flex justify-between">
                                <dt>Cantidad: </dt>
                                <dd className="justify-self-end text-text-secondary font-normal">{quantity}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt>Precio unitario: </dt>
                                <dd className="justify-self-end text-text-secondary font-normal">{formatToCurrency(product.price)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt>Subtotal: </dt>
                                <dd className="justify-self-end text-text-secondary font-normal">{formatToCurrency(product.price * quantity)}</dd>
                            </div>
                        </dl>
                    </Link>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-evenly sm:gap-3 sm:px-4">
                        <div className="mb-2 sm:mb-0">
                            <QuantitySelector
                                quantity={quantity}
                                onQuantityChange={setQuantity}
                                maxStock={variant.stock}
                            />
                        </div>
                        <Button variant="ghost" size="icon" aria-label="Eliminar producto"
                            disabled={status !== "ready"} onClick={() => {handleRemove()}}
                            >
                            <Trash2 className="size-5 md:size-6" />
                        </Button>
                </CardFooter>
                {
                    errorMessage && (
                        <p
                            role="alert" 
                            className="col-span-full text-sm sm:text-base text-error flex justify-center"
                        >
                            {errorMessage}
                        </p>
                    )
                }
            </div>
            <div className="col-span-1 sm:col-span-2 p-5 pt-0 w-full sm:place-self-end flex">
                <Button onClick={() => {handleUpdateQuantity()}}
                    disabled={status !== "ready" || quantity === cartItem.quantity} aria-label="Confirmar Cambios"
                    className="
                        mt-2 w-full px-4 py-2 rounded-sm bg-primary text-surface sm:text-lg lg:text-xl
                        whitespace-nowrap overflow-hidden ml-auto sm:w-[90%] sm:hover:w-full
                        transition-all duration-400 ease-out hover:bg-button-secondary hover:text-text
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