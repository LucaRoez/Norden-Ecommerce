import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

import type { Category } from "@/interfaces/category";
import { formatToCurrency } from "@/utils/formats";

interface ProductsAsideProps {
    categories: Category[];
    selectedCategory: number;
    onCategoryChange: (categoryId: number) => void;
    priceRange: number[];
    onPriceChange: (range: number[]) => void;
    maxPrice: number;
}

const ProductsAside = ({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceChange,
    maxPrice
}: ProductsAsideProps) => {
    const selectedCategoryName =
        categories.find((category) => category.id === selectedCategory)?.name
        ?? "Todas las categorías";

    return (
        <aside className="w-full space-y-6 md:w-64 lg:shrink-0 md:h-full bg-primary p-5 text-secondary-light">
            <div className="md:sticky md:top-6 md:self-start md:h-85">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Filtros</h3>
                    <p className="text-sm text-secondary-pale">
                        Ajustá los resultados del catálogo.
                    </p>
                </div>

                <Separator />

                <section className="mt-4">
                    <h4 className="font-medium mb-2">Categorías</h4>
                    <div className="w-full mb-4">
                        <Select
                            value={selectedCategory}
                            onValueChange={(value) => onCategoryChange(Number(value))}
                        >
                        <SelectTrigger id="catalog-category" className="w-[220px] [&_svg]:text-secondary-pale text-secondary-pale">
                            <SelectValue>
                                {selectedCategoryName}
                            </SelectValue>
                        </SelectTrigger>
                            {
                                <SelectContent>
                                    {
                                        categories.map((category) => {
                                            return (                                                
                                                <SelectItem key={category.id} value={category.id} className="text-primary px-3 pt-2">{category.name}</SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            }
                        </Select>
                    </div>
                </section>

                <Separator />

                <section className="mt-4">
                        <h4 className="font-medium">Precio</h4>
                        <div className="w-full mt-3">
                            <Slider
                                min={0}
                                max={maxPrice}
                                step={50000}
                                value={priceRange}
                                onValueChange={(value) => {
                                    if (Array.isArray(value)) {
                                        onPriceChange([...value]);
                                    }
                                }}
                            />
                        </div>
                        <div className="my-3 flex justify-between text-sm text-secondary-pale">
                            <span>{formatToCurrency(priceRange[0])}</span>
                            <span>{formatToCurrency(priceRange[1])}</span>
                        </div>
                </section>
            </div>
        </aside>
    );
};

export default ProductsAside;