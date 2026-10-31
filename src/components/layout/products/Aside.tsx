
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import categories from "@/data/categories.json";
import { formatToCurrency } from "@/utils/formats";

interface ProductsAsideProps {
    selectedCategory: number;
    onCategoryChange: (categoryId: number) => void;
    priceRange: number[];
    onPriceChange: (range: number[]) => void;
}

const categoryNames = [
    "Todas las categorías",
    "Decoración",
    "Iluminación",
    "Organización",
    "Textiles",
    "Cocina y mesa",
    "Escritorio",
];

const ProductsAside = ({
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceChange,
}: ProductsAsideProps) => {

    return (
        <aside className="w-full space-y-6 lg:w-64 lg:shrink-0 bg-primary p-5 text-secondary-light">
            <div>
                <h2 className="text-lg font-semibold">Filtros</h2>
                <p className="text-sm text-secondary-pale">
                    Ajustá los resultados del catálogo.
                </p>
            </div>

            <Separator />

            <section className="space-y-1">
                <h3 className="font-medium">Categorías</h3>
                <Select
                    value={selectedCategory}
                    onValueChange={(value) => onCategoryChange(value === null ? 0 : value)}
                >
                <SelectTrigger id="catalog-category" className="w-[220px] [&_svg]:text-secondary-pale text-secondary-pale">
                    <SelectValue>
                        {categoryNames[selectedCategory]}
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
            </section>

            <Separator />

            <section className="space-y-3">
                    <h3 className="font-medium">Precio</h3>

                    <Slider
                        min={0}
                        max={2000000}
                        step={50000}
                        value={priceRange}
                        onValueChange={(value) => {
                            if (Array.isArray(value)) {
                                onPriceChange([...value]);
                            }
                        }}
                    />

                    <div className="flex justify-between text-sm text-secondary-pale">
                        <span>{formatToCurrency(priceRange[0])}</span>
                        <span>{formatToCurrency(priceRange[1])}</span>
                    </div>
            </section>
        </aside>
    );
};

export default ProductsAside;