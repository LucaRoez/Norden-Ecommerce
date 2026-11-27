import type { BannerEvent } from "@/interfaces/bannerEvent";

const STORAGE_KEY = "norden_banner_analytics";

export const getBannerEvents = (): BannerEvent[] => {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (!storedData) return [];

        const parsedData: unknown = JSON.parse(storedData);

        if (!Array.isArray(parsedData)) {
            throw new Error("Formato de datos inválido.");
        }

        return parsedData as BannerEvent[];
    } catch {
        return [];
    }
};

export const registerBannerEvent = (
    bannerId: string,
    eventType: BannerEvent["eventType"]
): void => {
    const events = getBannerEvents();

    const newEvent: BannerEvent = {
        bannerId,
        eventType,
        timestamp: Date.now(),
    };

    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([...events, newEvent])
        );
    } catch (error) {
        console.error("No se pudo registrar el evento del banner:", error);
    }
};