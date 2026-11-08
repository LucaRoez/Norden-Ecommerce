import { Trash2 } from "lucide-react";

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

interface CartItemProps extends CartItemDetails {
    onRemove: (productId: string, variantId: string) => void;
}

const CartItem = ({ cartItem, product, variant, onRemove }: CartItemProps) => {
    return (
        <Card className="flex items-center gap-4">
            <CardHeader className="flex-1">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p>Cantidad: {cartItem.quantity}</p>
                <p>Precio unitario: {product.price}</p>
                <p>Subtotal: {product.price * cartItem.quantity}</p>
                <div className="w-full">
                    <img
                        src={variant.images[0]}
                        alt={`${product.name} - ${variant.color.name}`}
                        className="w-full object-cover rounded-md border border-border"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
                <Button variant="ghost" size="icon" aria-label="Eliminar producto" onClick={() => onRemove(product.id, variant.id)}>
                    <Trash2 className="size-5" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CartItem;