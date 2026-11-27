import type { SearchEvent } from "@/interfaces/searchEvent";

const STORAGE_EVENTS_KEY = "norden_search_analytics";

export const getSearchEvents = (): SearchEvent[] => {
    try {
        const storedData = localStorage.getItem(STORAGE_EVENTS_KEY);

        if (!storedData) return [];

        const parsedData: unknown = JSON.parse(storedData);

        if (!Array.isArray(parsedData)) {
            throw new Error("Formato de datos inválido.");
        }

        return parsedData as SearchEvent[];
    } catch {
        return [];
    }
};

export const registerProductEvent = (
    productId: string,
    eventType: SearchEvent["eventType"],
    source: SearchEvent["source"],
    query?: string
): void => {
    const events = getSearchEvents();

    const newEvent: SearchEvent = {
        productId,
        eventType,
        source,
        query: query?.trim().toLowerCase(),
        timestamp: Date.now(),
    };

    try {
        localStorage.setItem(
            STORAGE_EVENTS_KEY,
            JSON.stringify([...events, newEvent])
        );
    } catch (error) {
        console.error("No se pudo registrar el evento de búsqueda:", error);
    }
};

export const getProductPopularity = (): Record<string, number> => {
    const events = getSearchEvents();

    return events.reduce<Record<string, number>>((scores, event) => {
        const points = event.eventType === "click" ? 3 : 1;

        scores[event.productId] = 
            (scores[event.productId] ?? 0) + points;

        return scores;
    }, {});
};