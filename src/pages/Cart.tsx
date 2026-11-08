import CartItem from "@/components/layout/cart/CartItem";
import CartSummary from "@/components/layout/cart/CartSummary";
import type { CartItemDetails } from "@/interfaces/cart";
import { getProductByID }  from "@/services/productServices";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
    const { cart, removeItem } = useCart();
    const cartItems: CartItemDetails[] = cart.items.flatMap((cartItem) => {
        const product = getProductByID(cartItem.productId);

        if (!product) return [];

        const variant = product.variants.find(
            (variant) => variant.id === cartItem.variantId
        );

        if (!variant) return [];

        return [{ cartItem, product, variant }];
    });
    return (
        <section className="container mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold mb-8">
                Mi carrito
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                <section>
                    {
                        cartItems.map((item) => {
                            const { cartItem, product, variant } = item;
                            return (
                                <CartItem
                                    key={product.id}
                                    cartItem={cartItem}
                                    product={product}
                                    variant={variant}
                                    onRemove={removeItem}
                                />
                            );
                        })
                    }
                </section>
                <aside>
                    <CartSummary items={cartItems} />
                </aside>
            </div>
        </section>
    );
};

export default Cart;