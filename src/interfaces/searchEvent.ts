export type SearchEvent = {
    productId: string;
    eventType: "impression" | "click";
    query: string;
    timestamp: number;
};