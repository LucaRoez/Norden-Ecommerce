import { useState } from "react";
import { getAsset } from "@/utils/assets";

interface ProductImagesProps {
  images: string[];
  alt: string;
}

const ProductImages = ({ images, alt }: ProductImagesProps) => {
    const [activeImage, setActiveImage] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [origin, setOrigin] = useState("50% 50%");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setOrigin(`${x}% ${y}%`);
    };

    const handleImageChange = (index: number) => {
        setActiveImage(index);
        setZoom(false);
        setOrigin("50% 50%");
    };

    if (images.length === 0) return null;
    
    return (
        <div
            className="overflow-hidden rounded-xl cursor-zoom-in p-5"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => {
                setZoom(false);
                setOrigin("50% 50%");
            }}
            onMouseMove={handleMouseMove}
        >
            <div className="overflow-hidden rounded-xl h-96 sm:h-[500px] mb-5">
                <img
                    src={getAsset(images[activeImage])}
                    alt={alt}
                    className="w-full h-full object-cover transition-transform duration-300 mb-15"
                    style={{
                    transform: zoom ? "scale(1.7)" : "scale(1)",
                    transformOrigin: origin,
                    }}
                />
            </div>
            <div className="flex gap-3 overflow-x-auto">
                {
                    images.map((src, index) => (
                        <button
                            key={`${src}-${index}`}
                            type="button"
                            onClick={() => handleImageChange(index)}
                            aria-label={`Ver imagen ${index + 1} de ${alt}`}
                            aria-pressed={activeImage === index}
                            className={`w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                                activeImage === index
                                    ? "border-primary"
                                    : "border-transparent hover:border-border"
                                }
                            `}
                        >
                            <img
                                src={getAsset(src)}
                                alt={`Foto ${index + 1} de ${alt}`}
                                className="aspect-square w-full object-cover"
                            />
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

export default ProductImages;