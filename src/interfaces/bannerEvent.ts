export interface BannerEvent {
    bannerId: string;
    eventType: "impression" | "click";
    timestamp: number;
}