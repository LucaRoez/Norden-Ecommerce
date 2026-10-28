import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../../ui/button";
import Rating from "../Rating";
import { getAsset } from "@/utils/assets";
import { formatToCurrency } from "@/utils/formats";

import type { Product } from "@/interfaces/product.ts";
import { getFeaturedProducts } from "@/services/productServices.ts";

const FeaturedProducts = () => {
    /*
    const [featured, setFeatured] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getFeaturedProducts()
        .then(setFeatured)
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p>Cargando productos destacados...</p>;
    }
    if (error) {
        return <p>No se pudieron cargar los productos.</p>;
    }
    */

    const featured: Product[] = getFeaturedProducts();

    if (featured.length === 0) {
        return null;
    }
    

    return (
        <section id="features" className="bg-light py-12">
            <h2 className="w-full pl-5 flex flex-start font-bold text-text text-2xl min-[998px]:text-3xl my-4">Categorias destacadas</h2>
            <div className="grid grid-cols-1 gap-4 mt-4">
                <Carousel
                    opts={{ align: "start", loop: true }}
                    plugins={[
                        Autoplay({
                        delay: 4000,
                        stopOnInteraction: false,
                        stopOnMouseEnter: true,
                        }),
                    ]}
                    className="mx-4 lg:mx-8 relative"
                >
                    <CarouselContent className="h-full flex justify-between gap-4 ml-[.1rem]">
                    {
                        featured.map((product) => (
                            <CarouselItem
                                key={product.id}
                                className="
                                    basis-[calc(100%-.2rem)] sm:basis-[calc((100%-1.2rem)/2)] lg:basis-[calc((100%-3.1rem)/4)]
                                    border border-border rounded-sm pl-0 bg-surface-raised
                                "
                            >
                                <div className="group block flex flex-col justify-between items-center h-full">
                                    <a href="#productos" className="
                                        w-full overflow-hidden rounded-sm
                                        h-70 min-[490px]:h-100 min-[640px]:h-60 min-[840px]:h-80 min-[1024px]:h-40 min-[1320px]:h-50
                                    ">
                                        <img
                                            src={getAsset(product.image)}
                                            alt={product.name}
                                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </a>

                                    <div className="pb-3 px-3 flex flex-col justify-between items-center">
                                        <h3 className="mt-3 font-semibold text-text text-lg min-md:text-xl min-lg:text-2xl">
                                            {product.name}
                                        </h3>
                                        <p className="mt-1 text-text-text-secondary text-sm min-md:text-base min-lg:text-lg">
                                            {formatToCurrency(product.price, 'PYG', 'es-PY')}
                                        </p>
                                    </div>
                                    <div className="w-full flex flex-col items-end mr-2 mb-2">
                                        <Rating value={product.rate} />
                                        <Button className="rounded-sm px-3 py-2 mt-2 text-sm min-lg:text-base bg-primary text-white hover:bg-primary-dark transition-colors duration-300 active:ring-1 active:ring-focus/50 active:ring-offset-0">
                                            Agregar al carrito - {formatToCurrency(product.price, 'PYG', 'es-PY')}
                                        </Button>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    }
                    </CarouselContent>

                    <CarouselPrevious className="absolute left-4 top-4" />
                    <CarouselNext className="absolute right-4 top-4" />
                </Carousel>
            </div>
        </section>
    );
};

export default FeaturedProducts;