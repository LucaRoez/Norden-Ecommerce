import CartItem from "@/components/layout/cart/CartItem";
import CartSummary from "@/components/layout/cart/CartSummary";
import type { CartItemDetails } from "@/interfaces/cart";
import { getProductByID }  from "@/services/productServices";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
    const { cart, removeItem, updateQuantity } = useCart();
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
        <section className="mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold mb-8">
                Mi carrito
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-[auto_20rem] sm:gap-8">
                <section className="flex flex-col justify-evenly">
                    {
                        cartItems.map((item, i) => {
                            const { cartItem, product, variant } = item;
                            return (
                                <div className={`${i === cartItems.length ? "" : "mb-5"}`}>
                                    <CartItem
                                        key={`${cartItem.productId}-${cartItem.variantId}`}
                                        cartItem={cartItem}
                                        product={product}
                                        variant={variant}
                                        onRemove={removeItem}
                                        onUpdateQuantity={updateQuantity}
                                    />
                                </div>
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