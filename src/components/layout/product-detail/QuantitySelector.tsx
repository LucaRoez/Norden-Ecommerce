interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    maxStock?: number;
}

const QuantitySelector = ({
    quantity,
    onQuantityChange,
    maxStock = 99,
}: QuantitySelectorProps) => {
    const decrease = () => {
        onQuantityChange(Math.max(1, quantity - 1));
    };

    const increase = () => {
        onQuantityChange(Math.min(maxStock, quantity + 1));
    };

    return (
        <div className="space-y-3 flex flex-col gap-2 sm:gap-3">
            <label className="font-medium lg:text-lg mb-0">Cantidad</label>

            <div className="
                flex items-center w-fit border border-border rounded-lg
                text-sm sm:text-base lg:text-lg
            ">
                <button
                    type="button"
                    onClick={decrease}
                    disabled={quantity <= 1}
                    aria-label="Disminuir cantidad"
                    className="size-10 disabled:opacity-40"
                >
                    −
                </button>

                <span className="w-10 text-center tabular-nums">
                    {quantity}
                </span>

                <button
                    type="button"
                    onClick={increase}
                    disabled={quantity >= maxStock}
                    aria-label="Aumentar cantidad"
                    className="size-10 disabled:opacity-40"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;