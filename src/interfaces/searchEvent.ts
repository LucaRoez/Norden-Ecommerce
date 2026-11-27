export type SearchEvent = {
    productId: string;
    eventType: "impression" | "click";
    source: "search" | "featured";
    query?: string;
    timestamp: number;
};