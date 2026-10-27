
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { getAsset } from "@/utils/assets";
import categories from "@/data/categories.json";

const Categories = () => {
    return (
        <section id="categories" className="flex flex-col items-center justify-center py-8">
            <h2>Categorias destacadas</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <Carousel
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                    {
                        categories.map((category) => (
                            <CarouselItem
                            key={category.id}
                            className="basis-full pl-4 sm:basis-1/2 lg:basis-1/4"
                            >
                            <a href="#productos" className="group block">
                                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-surface-alt">
                                <img
                                    src={getAsset(category.src)}
                                    alt={category.name}
                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                </div>

                                <h3 className="mt-3 font-semibold text-primary">
                                    {category.name}
                                </h3>
                                <p className="mt-1 text-sm text-text/80">
                                    {category.description}
                                </p>
                            </a>
                            </CarouselItem>
                        ))
                    }
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
        
    );
};

export default Categories;