import { describe, it, expect } from "vitest";
import { getTextScore, getPopularityBonus } from "../productRankingServices";
import { createProduct } from "./fixtures/productRanking";

// Pruebas Unitarias de los servicios del productRankingServices
describe("getTextScore", () => {
    // retorno extoso de coincidencia exacta del contenido
    it("debe devolver 100 ante una coincidencia exacta del nombre", () => {
        // Arrange
        const product = createProduct({
            name: "Lámpara",
            category: "Decoración",
            description: "Producto para interiores",
            features: [],
        });

        // Act + Assert
        expect(getTextScore(product, "lámpara")).toBe(100);
    });

    // retorno exitoso de múltiples coincidencias exactas del contenido
    it("debe acumular las coincidencias de distintos campos", () => {
        const product = createProduct({
            name: "Lámpara de techo",
            category: "Iluminación",
            description: "Lámpara para interiores",
            features: ["Lámpara LED"],
        });

        // Nombre 80 + descripción 30 + características 50
        expect(getTextScore(product, "lámpara")).toBe(160);
    });

    // retorno exitoso de coincidencias arbitrarias exactas del contenido
    it("debe acumular las coincidencias de categoría, características y descripción", () => {
        const product = createProduct({
            name: "Producto nuevo",
            category: "Iluminación",
            description: "Lámpara para interiores",
            features: ["Lámpara LED"],
        });

        expect(getTextScore(product, "lámpara ilumina")).toBe(140);
    });

    // retorno exitoso de coincidencias que requieren normalización para su compatibilidad con el contenido
    it("debe ignorar diferencias entre mayúsculas y minúsculas y acentos", () => {
        const product = createProduct({
            name: "Iluminación",
            category: "Decoración",
            description: "",
            features: [],
        });

        expect(getTextScore(product, "iluminacion")).toBe(100);
    });

    // retorno exitoso de ausencia de coincidencias con el contenido
    it("debe devolver cero cuando no hay coincidencias", () => {
        const product = createProduct();

        expect(getTextScore(product, "escritorio")).toBe(0);
    });

    // retorno exitoso en caso de llamada vacía
    it("debe devolver cero cuando la consulta está vacía", () => {
        const product = createProduct();

        expect(getTextScore(product, "")).toBe(0);
    });
});

describe("getPopularityBonus", () => {
    // retorno exitoso en caso de llamada a contenido vacío
    it("debe devolver cero si el producto no tiene popularidad registrada", () => {
        expect(getPopularityBonus("product-1", {})).toBe(0);
    });

    // retorno correcto del cálculo interno de la lógica del parámetro 'popularidad' del contenido
    it("debe calcular el bonus según la popularidad", () => {
        const popularity = {
            "product-1": 10,
        };

        expect(getPopularityBonus("product-1", popularity))
            .toBeCloseTo(Math.min(15, Math.log1p(10) * 3));
    });

    // retorno exitoso del límite establecido al rango del parámetro
    it("no debe superar el límite de 15 puntos", () => {
        const popularity = {
            "product-1": 100000,
        };

        expect(getPopularityBonus("product-1", popularity)).toBe(15);
    });
});

