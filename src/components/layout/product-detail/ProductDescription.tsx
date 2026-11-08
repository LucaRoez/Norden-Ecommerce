
import type { Product, ProductSpecification } from "@/interfaces/product";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";


const ProductDescription = ({ product }: { product: Product }) => {
    const groupedSpecifications = product.specifications.reduce<
        Partial<Record<string, ProductSpecification[]>>
    >((groups, specification) => {
        const group = specification.group;

        if (!groups[group]) {
            groups[group] = [];
        }

        groups[group].push(specification);

        return groups;
    }, {});
    
    return (
        <div className="p-5">
            <Tabs defaultValue="features" className="w-full">
                <TabsList className="w-full text-center py-6 sm:py-7 lg:py-8 mb-0 md:mb-2 lg:mb-4">
                    <TabsTrigger value="features" className="flex-1 px-0 text-base sm:text-lg lg:text-xl hover:cursor-pointer">
                        Descripción
                    </TabsTrigger>
                    <TabsTrigger value="specifications" className="flex-1 px-0 sm:text-base lg:text-lg hover:cursor-pointer">
                        Características
                    </TabsTrigger>
                    <TabsTrigger value="shipping" className="flex-1 px-0 sm:text-base lg:text-lg hover:cursor-pointer">
                        Envío
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="p-4">
                    <ul>
                        {
                            product.features.map((feature, index) => (
                                <li key={index} className={`
                                    text-text-secondary text-base sm:text-lg lg:text-xl 
                                    ${index === product.features.length - 1 ? '' : 'mb-2'}
                                `}>
                                    {feature}
                                </li>
                            ))
                        }
                    </ul>
                </TabsContent>
                <TabsContent value="specifications" className="p-4">
                    {
                        Object.entries(groupedSpecifications).map(([group, specs], index) => {
                            const isLastGroup = index === Object.entries(groupedSpecifications).length - 1;
                            return (
                                <div key={group} className={`${isLastGroup ? 'mb-0' : 'mb-4 sm:mb-7 lg:mb-10'}`}>
                                    <h4 className="text-lg font-bold mb-2 sm:text-xl lg:text-2xl sm:mb-4 lg:mb-5">{group}</h4>
                                    <dl className={`list-disc pl-5 ${isLastGroup ? 'mb-0' : 'mb-2 sm:mb-4 lg:mb-5'}`}>
                                        {
                                            specs?.map((spec, i) => (
                                                <div
                                                    key={`${group}-${spec.label}`}
                                                    className={
                                                        "flex justify-between gap-4 text-text-secondary" +
                                                        (i === specs.length - 1 ? '' : ' mb-2 sm:mb-4 lg:mb-5')
                                                    }
                                                >
                                                    <dt className="font-semibold text-sm sm:text-base lg:lg">{spec.label}</dt>
                                                    <dd className="text-right text-sm sm:text-base lg:lg">{spec.value}</dd>
                                                </div>
                                            ))
                                        }
                                    </dl>
                                </div>
                            );
                        })
                    }
                </TabsContent>
                <TabsContent value="shipping" className="p-4">
                    <ShippingRow label="Peso" value={`${product.shipping.weight} ${product.shipping.weightUnit}`} />
                    <ShippingRow label="Dimensiones" value={`${product.shipping.dimensions.width} x ${product.shipping.dimensions.height} x ${product.shipping.dimensions.depth} ${product.shipping.dimensions.unit}`} />
                    <ShippingRow label="Clase de envío" value={product.shipping.shippingClass} />
                    <ShippingRow label="Tiempo de manejo" value={`${product.shipping.handlingTime} días`} />
                </TabsContent>
            </Tabs>
            
        </div>
    );
}
const ShippingRow = ({
    label,
    value,
    isLast
}: {
    label: string;
    value: string;
    isLast?: boolean;
}) => (
    <div className={`flex justify-between gap-4 text-text-secondary ${isLast ? '' : 'mb-3 sm:mb-5 lg:mb-8'}`}>
        <span className="font-semibold text-base sm:text-lg lg:xl">{label}</span>
        <span className="text-right text-base sm:text-lg lg:xl">{value}</span>
    </div>
);

export default ProductDescription;