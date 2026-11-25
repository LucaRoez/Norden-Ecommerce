export type AppErrorCode =
    | "PRODUCT_NOT_FOUND"
    | "VARIANT_NOT_FOUND"
    | "INVALID_QUANTITY"
    | "INSUFFICIENT_STOCK"
    | "CART_ITEM_NOT_FOUND"
    | "STORAGE_READ_ERROR"
    | "STORAGE_WRITE_ERROR"
    | "STORAGE_DATA_INVALID"
    | "UNEXPECTED_ERROR"
    | "CART_NOT_READY";

export class AppError extends Error {
    readonly code: AppErrorCode;
    
    constructor(
        code: AppErrorCode,
        message: string,
        options?: ErrorOptions
    ) {
        super(message, options);

        this.name = "AppError";
        this.code = code;
    }
}