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
        <div className="bg-surface/10 p-6">
            <h2 className="text-xl font-bold mb-4">Resumen del carrito</h2>
            <p className="text-text-muted">
                Total de productos: {totalItems}
            </p>
            <p className="text-2xl font-bold">
                {formatToCurrency(totalAmount, 'PYG', 'es-PY')}
            </p>
        </div>
    );
};

export default CartSummary;