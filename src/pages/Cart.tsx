import CartItem from "@/components/layout/cart/CartItem";
import CartSummary from "@/components/layout/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

import type { CartItemDetails } from "@/interfaces/cart";
import { getProductByID }  from "@/services/productServices";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
    const { 
        cart,
        removeItem,
        updateQuantity,
        status,
        initializationError,
        refreshCart,
    } = useCart();

    // verificación de estado inicial y prevención del posible error inicial
    if (status === "loading") {
        return (
            <section className="mx-auto px-5 py-10">
                <h1 className="mb-8 text-3xl font-bold">
                    Mi carrito
                </h1>
                <p className="text-text-secondary">Recuperando tu carrito...</p>
            </section>
        );
    }
    if (status === "error") {
        return (
            <section className="mx-auto px-5 py-10">
                <h1 className="mb-8 text-3xl font-bold">
                    Mi carrito
                </h1>

                <p className="text-error">
                    {
                        initializationError?.message ??
                        "No se pudo recuperar tu carrito."
                    }
                </p>

                <Button className="bg-background-warm text-text-warm" onClick={refreshCart}>
                    Reintentar
                </Button>
            </section>
        );
    }

    const cartItems: CartItemDetails[] = cart.items.flatMap((cartItem) => {
        const product = getProductByID(cartItem.productId);

        if (!product) return [];

        const variant = product.variants.find(
            (variant) => variant.id === cartItem.variantId
        );

        if (!variant) return [];

        return [{ cartItem, product, variant }];
    });
    const unavailableItems = cart.items.length - cartItems.length;

    return (
        <section className="mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold mb-8">
                Mi carrito
            </h1>
            {
                unavailableItems > 0 && (
                    <p role="status" className="mb-4 text-sm text-text-warning">
                        Algunos productos de tu carrito ya no están disponibles y no se incluyen en el resumen.
                    </p>
                )
            }  
            {
                cartItems.length !== 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-[auto_20rem] sm:gap-8">
                        <section className="flex flex-col justify-evenly">
                            {
                                cartItems.map((item, i) => {
                                    const { cartItem, product, variant } = item;
                                    return (
                                        <div
                                            key={`${cartItem.productId}-${cartItem.variantId}`}
                                            className={`${i === cartItems.length - 1 ? "" : "mb-5"}`}
                                        >
                                            <CartItem
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
                ) : (
                    <>
                        <p className="mb-4 text-text-secondary">
                            Tu carrito está vacío.
                        </p>

                        <Link to="/productos">
                            <Button className="
                                    mt-2 w-full px-4 py-2 rounded-sm bg-primary text-surface sm:text-lg lg:text-xl
                                    transition-colors duration-400 hover:cursor-pointer
                                    hover:bg-button-secondary hover:text-text active:text-surface active:bg-primary active:duration-0
                                "
                            >Explorar productos</Button>
                        </Link>
                    </>
                )
            }
        </section>
    );
};

export default Cart;