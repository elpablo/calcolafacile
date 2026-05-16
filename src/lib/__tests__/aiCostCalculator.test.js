

import { describe, expect, test } from "vitest";

import {
    calculateAiCosts,
    calculateTokenCost,
    normalizePositiveNumber,
} from "../aiCostCalculator";

describe("aiCostCalculator", () => {
    test("normalizes invalid or negative numbers to zero", () => {
        expect(normalizePositiveNumber("42")).toBe(42);
        expect(normalizePositiveNumber(0)).toBe(0);
        expect(normalizePositiveNumber(-10)).toBe(0);
        expect(normalizePositiveNumber("not-a-number")).toBe(0);
        expect(normalizePositiveNumber(undefined)).toBe(0);
        expect(normalizePositiveNumber(Number.POSITIVE_INFINITY)).toBe(0);
    });

    test("calculates token cost from per-million pricing", () => {
        expect(calculateTokenCost(1_000_000, 5)).toBe(5);
        expect(calculateTokenCost(500_000, 5)).toBe(2.5);
        expect(calculateTokenCost(10_000, 2)).toBe(0.02);
    });

    test("calculates request, daily and monthly AI costs", () => {
        const result = calculateAiCosts({
            inputTokens: "10000",
            outputTokens: "5000",
            requestsPerDay: "100",
            model: {
                inputCostPerMillion: 2,
                outputCostPerMillion: 8,
            },
        });

        expect(result.inputCost).toBeCloseTo(0.02);
        expect(result.outputCost).toBeCloseTo(0.04);
        expect(result.requestCost).toBeCloseTo(0.06);
        expect(result.dailyCost).toBeCloseTo(6);
        expect(result.monthlyCost).toBeCloseTo(180);
    });

    test("handles missing model pricing safely", () => {
        const result = calculateAiCosts({
            inputTokens: "10000",
            outputTokens: "5000",
            requestsPerDay: "100",
            model: null,
        });

        expect(result.inputCost).toBe(0);
        expect(result.outputCost).toBe(0);
        expect(result.requestCost).toBe(0);
        expect(result.dailyCost).toBe(0);
        expect(result.monthlyCost).toBe(0);
    });

    test("treats negative tokens and requests as zero", () => {
        const result = calculateAiCosts({
            inputTokens: "-10000",
            outputTokens: "5000",
            requestsPerDay: "-20",
            model: {
                inputCostPerMillion: 2,
                outputCostPerMillion: 8,
            },
        });

        expect(result.inputCost).toBe(0);
        expect(result.outputCost).toBeCloseTo(0.04);
        expect(result.requestCost).toBeCloseTo(0.04);
        expect(result.dailyCost).toBe(0);
        expect(result.monthlyCost).toBe(0);
    });
});