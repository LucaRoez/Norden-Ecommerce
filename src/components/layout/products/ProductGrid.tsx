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

interface ProductGridProps {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
    const { addItem } = useCart();

    return (
        <section id="product-grid" className="mx-5 my-5">
            <div className="
                grid gap-4 grid-cols-1 xs:grid-cols-[repeat(2,minmax(0,1fr))]
                lg:grid-cols-[repeat(3,minmax(0,1fr))] xl:grid-cols-[repeat(4,minmax(0,1fr))]
            ">
                {
                    products.map((product) => {
                        const imageUrl = getAsset(product.image);
    
                        return (
                            <article key={product.id} className="min-w-0 w-full">
                                <Link to={`/productos/${product.id}`} className="block min-w-0 w-full">
                                    <Card className="
                                        p-0 overflow-hidden bg-background group h-[25rem] min-w-0 min-h-0 w-full
                                        grid grid-cols-1 grid-rows-[12rem_minmax(4rem,1fr)_minmax(3rem,1fr)_3rem] gap-2
                                    ">
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
                                            <CardDescription>{product.category}</CardDescription>
                                        </CardHeader>

                                        <CardContent className="">
                                            <p className="truncate">
                                                {product.description}
                                            </p>
                                            <div className="my-1 flex flex-col justify-between">
                                                <span className="font-semibold mb-1">{formatToCurrency(product.price, 'PYG', 'es-PY')}</span>
                                                <Rating value={product.rate} />
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex flex-col items-end">
                                            <Button 
                                                onClick={(event) => {
                                                    event.stopPropagation(); event.preventDefault();
                                                    addItem(product.id, product.variants[0].id);
                                                }} 
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