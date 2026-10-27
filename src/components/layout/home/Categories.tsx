
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getAsset } from "@/utils/assets";
import categories from "@/data/categories.json";

const Categories = () => {
    return (
        <section id="categories" className="flex flex-col items-center justify-center py-8 text-center">
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
                        categories.map((category) => (
                            <CarouselItem
                                key={category.id}
                                className="
                                    basis-[calc(100%-.2rem)] sm:basis-[calc((100%-1.2rem)/2)] lg:basis-[calc((100%-3.1rem)/4)]
                                    border border-border rounded-xl pl-0
                                "
                            >
                            <a href="#productos" className="group block flex justify-center items-center flex-col">
                                <div className="
                                    w-full overflow-hidden rounded-xl bg-surface-alt
                                    h-70 min-[490px]:h-100 min-[640px]:h-60 min-[840px]:h-80 min-[1024px]:h-40 min-[1320px]:h-50
                                ">
                                    <img
                                        src={getAsset(category.src)}
                                        alt={category.name}
                                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="pb-2 px-2">
                                    <h3 className="mt-3 font-semibold text-text text-lg min-md:text-xl min-lg:text-2xl">
                                        {category.name}
                                    </h3>
                                    <p className="mt-1 text-text-text-secondary text-sm min-md:text-base min-lg:text-lg">
                                        {category.description}
                                    </p>
                                </div>
                            </a>
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

export default Categories;