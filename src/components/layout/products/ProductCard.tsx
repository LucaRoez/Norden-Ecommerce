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
import { Link } from "react-router";
import Rating from "../Rating";

import { getAsset } from "@/utils/assets";
import { formatToCurrency } from "@/utils/formats";
import type { Product } from "@/interfaces/product";
import { useCart } from "@/hooks/useCart";
import { AppError } from "@/errors/AppError";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addItem, status } = useCart();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleAdd = () => {
        try {
            setErrorMessage(null);

            const variant = product.variants[0];

            if (!variant) {
                throw new AppError(
                    "VARIANT_NOT_FOUND",
                    "Este producto no tiene variantes disponibles."
                );
            }

            addItem(product.id, variant.id);
        } catch (error) {
            setErrorMessage(
                error instanceof AppError
                    ? error.message
                    : "No se pudo agregar el producto al carrito."
            );
        }
    };

    const imageUrl = getAsset(product.image);

    return (
        <article className="min-w-0 w-full">
            <Card className="
                p-0 overflow-hidden bg-background group h-[25rem] min-w-0 min-h-0 w-full
                grid grid-cols-1 grid-rows-[12rem_minmax(4rem,1fr)_minmax(3rem,1fr)_3rem] gap-2
            ">
                <Link to={`/productos/${product.id}`} className="contents">
                    <div className="relative w-full h-full min-w-0 min-h-0 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={product.name}
                            className="
                                object-cover transition-transform duration-500 group-hover:scale-105
                                block w-full h-full
                            "
                        />
                    </div>

                    <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription aria-label={`Categoría de ${product.name}`}>{product.category}</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <p className="truncate" aria-label={`Descripción de ${product.name}`}>{product.description}</p>
                        <div className="my-1 flex flex-col justify-between">
                            <span className="font-semibold mb-1">
                                {formatToCurrency(product.price, "PYG", "es-PY")}
                            </span>
                            <Rating value={product.rate} />
                        </div>
                    </CardContent>
                </Link>

                <CardFooter className="flex flex-col items-end">
                    {errorMessage && (
                        <p role="alert" className="text-xs text-error">
                            {errorMessage}
                        </p>
                    )}

                    <Button
                        disabled={status !== "ready"}
                        onClick={handleAdd}
                        className="
                            w-[70%] transition-colors duration-400 rounded-sm bg-button-primary text-surface
                            hover:bg-button-secondary hover:text-text active:text-surface active:duration-0
                            hover:cursor-pointer px-2 sm:px-4 lg:px-5 min-[480px]:w-[90%] min-[560px]:w-[70%]
                            min-[768px]:w-[90%] min-[864px]:w-[70%] min-[1024px]:w-[90%] min-[1368px]:w-[70%]
                        "
                    >
                        Agregar al carrito
                    </Button>
                </CardFooter>
            </Card>
        </article>
    );
};

export default ProductCard;