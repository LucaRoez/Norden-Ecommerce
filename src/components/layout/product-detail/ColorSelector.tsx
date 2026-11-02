interface ColorOption {
    id: string;
    name: string;
    hex: string;
}

interface ColorSelectorProps {
    colors: ColorOption[];
    selectedColorID: string;
    onColorChange: (color: string) => void;
}

const ColorSelector = ({
    colors,
    selectedColorID,
    onColorChange,
}: ColorSelectorProps) => {
    const selectedColor = colors.find(
        (color) => color.id === selectedColorID
    );

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="font-medium">Color:</span>
                <span className="text-text-secondary">
                    {selectedColor?.name}
                </span>
            </div>

            <div className="flex gap-3">
                {
                    colors.map((color) => (
                        <button
                            key={color.id}
                            type="button"
                            onClick={() => onColorChange(color.id)}
                            aria-label={color.name}
                            aria-pressed={selectedColorID === color.id}
                            className={`size-8 rounded-full border-2 transition-colors ${
                            selectedColorID === color.id
                                ? "border-primary ring-2 ring-primary/20 ring-offset-2"
                                : "border-border hover:scale-110"
                            }`}
                            style={{ backgroundColor: color.hex }}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default ColorSelector;