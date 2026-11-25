import type { CartItemDetails } from "@/interfaces/cart";
import { formatToCurrency } from "@/utils/formats";

interface CartSummaryProps {
    items: CartItemDetails[];
}
const CartSummary = ({ items }: CartSummaryProps) => {
    const totalItems = items.reduce((sum, item) => sum + item.cartItem.quantity, 0);
    const totalAmount = items.reduce(
        (total, item) => total + item.product.price * item.cartItem.quantity,
        0
    );

    return (
        <div className="bg-surface/10 p-6 sticky h-fit top-10 flex flex-col justify-start gap-2">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Resumen del carrito</h2>
            <span className="text-text-muted">
                Total de productos: {totalItems}
            </span>
            <span className="text-2xl lg:3xl font-bold">
                {formatToCurrency(totalAmount, 'PYG', 'es-PY')}
            </span>
        </div>
    );
};

export default CartSummary;