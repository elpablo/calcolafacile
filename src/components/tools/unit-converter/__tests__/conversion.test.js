import { describe, it, expect } from "vitest";
import {
    convertTemperature,
    convertValue,
} from "@/components/tools/unit-converter/conversion";

describe("convertTemperature", () => {
    it("C → F", () => {
        expect(convertTemperature(0, "C", "F")).toBe(32);
        expect(convertTemperature(100, "C", "F")).toBe(212);
    });
    it("F → C", () => {
        expect(convertTemperature(32, "F", "C")).toBe(0);
        expect(convertTemperature(212, "F", "C")).toBeCloseTo(100, 6);
    });
    it("C → K", () => {
        expect(convertTemperature(0, "C", "K")).toBe(273.15);
        expect(convertTemperature(-273.15, "C", "K")).toBeCloseTo(0, 6);
    });
    it("K → C", () => {
        expect(convertTemperature(0, "K", "C")).toBe(-273.15);
    });
    it("same unit is identity", () => {
        expect(convertTemperature(42, "C", "C")).toBe(42);
    });
});

describe("convertValue", () => {
    it("length kilometre → metre", () => {
        expect(convertValue(1, "length", "km", "m")).toBeCloseTo(1000, 6);
    });
    it("mass kg → lb", () => {
        expect(convertValue(1, "mass", "kg", "lb")).toBeCloseTo(2.20462262, 5);
    });
    it("delegates to temperature handler", () => {
        expect(convertValue(0, "temperature", "C", "F")).toBe(32);
    });
    it("returns 0 for unknown category", () => {
        expect(convertValue(1, "made-up", "a", "b")).toBe(0);
    });
    it("returns 0 for unknown units within a category", () => {
        expect(convertValue(1, "length", "made-up", "m")).toBe(0);
        expect(convertValue(1, "length", "m", "made-up")).toBe(0);
    });
    it("returns 0 for NaN input", () => {
        expect(convertValue(Number.NaN, "length", "m", "km")).toBe(0);
    });
    it("handles very large numbers without precision loss to integers", () => {
        const result = convertValue(1e9, "length", "m", "km");
        expect(result).toBeCloseTo(1e6, 0);
    });
});
