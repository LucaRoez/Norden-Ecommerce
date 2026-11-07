
import type { Product, ProductSpecification, ProductShipping } from "@/interfaces/product";
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
                <TabsList className="w-full border-b border-border">
                    <TabsTrigger value="features" className="w-1/2 text-center">
                        Descripción
                    </TabsTrigger>
                    <TabsTrigger value="specifications" className="w-1/2 text-center">
                        Características
                    </TabsTrigger>
                    <TabsTrigger value="shipping">
                        Envío
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="p-4">
                    <ul>
                        {
                            product.features.map((feature, index) => (
                                <li key={index} className="text-text-secondary">
                                    {feature}
                                </li>
                            ))
                        }
                    </ul>
                </TabsContent>
                <TabsContent value="specifications" className="p-4">
                    {
                        Object.entries(groupedSpecifications).map(([group, specs]) => (
                            <div key={group} className="mb-4">
                                <h4 className="text-lg font-bold sm:text-xl lg:text-2xl">{group}</h4>
                                <dl className="list-disc pl-5">
                                    {
                                        specs?.map((spec) => (
                                            <div
                                                key={`${group}-${spec.label}`}
                                                className="flex justify-between gap-4"
                                            >
                                                <dt key={spec.label} className="text-text-secondary font-medium">
                                                    {spec.label}
                                                </dt>
                                                <dd key={spec.value} className="text-text-secondary text-right">
                                                    {spec.value}
                                                </dd>
                                            </div>
                                        ))
                                    }
                                </dl>
                            </div>
                        ))
                    }
                </TabsContent>
                <TabsContent value="shipping" className="p-4">
                    <ShippingRow label="Peso" value={`${product.shipping.weight} kg`} />
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
}: {
    label: string;
    value: string;
}) => (
    <div className="flex justify-between gap-4">
        <span className="text-text-secondary">{label}</span>
        <span className="text-right">{value}</span>
    </div>
);

export default ProductDescription;