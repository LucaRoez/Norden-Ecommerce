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

interface ProductGridProps {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <section id="product-grid" className="mx-5 my-5">
            <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    products.map((product) => {
                        const imageUrl = getAsset(product.images[0]);
                        return (
                            <article>
                                <Link to={`/productos/${product.id}`}>
                                    <Card className="pb-3 overflow-hidden gap-2 justify-between bg-background group">
                                        <img
                                            src={`${imageUrl}`}
                                            alt={product.name}
                                            className="
                                                w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105
                                        "/>

                                        <CardHeader>
                                            <CardTitle>{product.name}</CardTitle>
                                            <CardDescription>{product.category}</CardDescription>
                                        </CardHeader>

                                        <CardContent className="">
                                            <p className="truncate">
                                                {product.description}
                                            </p>
                                            <div className="my-4 flex justify-between">
                                                <p className="font-semibold">{formatToCurrency(product.price, 'PYG', 'es-PY')}</p>
                                                <Rating value={product.rate} />
                                            </div>
                                        </CardContent>

                                        <CardFooter className="justify-end">
                                            <Button className="
                                                w-[70%] transition-bg-color duration-300
                                                hover:bg-button-secondary hover:text-text active:text-surface
                                            ">
                                                Agregar al carrito
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </article>
                        );                        
                    })
                }
            </div>
        </section>
    );
};

export default ProductGrid;