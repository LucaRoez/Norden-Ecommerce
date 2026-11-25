import { Label } from "../ui/label";

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    maxStock: number;
}

const QuantitySelector = ({
    quantity,
    onQuantityChange,
    maxStock,
}: QuantitySelectorProps) => {
    const decrease = () => {
        onQuantityChange(Math.max(1, quantity - 1));
    };
    const increase = () => {
        onQuantityChange(Math.min(maxStock, quantity + 1));
    };

    return (
        <div className="space-y-3 flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <div className="flex flex-col my-2 sm:mx-0 sm:me-2">
                <label className="font-medium flex self-center justify-center sm:text-base lg:text-lg">Cantidad</label>
                {
                    maxStock <= 0 && (<label className="text-error font-semibold font-sm">sin stock</label>)
                }
            </div>

            <div className="
                flex items-center w-fit border border-border rounded-lg
                text-sm sm:text-base lg:text-lg
            ">
                <button
                    type="button"
                    onClick={decrease}
                    disabled={quantity <= 1 || maxStock === 0}
                    aria-label="Disminuir cantidad"
                    className="size-9 sm:size-10 disabled:opacity-40"
                >
                    −
                </button>

                <span role="status" aria-live="polite" aria-atomic="true" className="w-10 text-center tabular-nums">
                    <span className="sr-only">Cantidad seleccionada: </span>
                    {quantity}
                </span>

                <button
                    type="button"
                    onClick={increase}
                    disabled={quantity >= maxStock}
                    aria-label="Aumentar cantidad"
                    className="size-9 sm:size-10 disabled:opacity-40"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;