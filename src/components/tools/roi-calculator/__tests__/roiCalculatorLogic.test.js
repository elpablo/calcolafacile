import { describe, expect, it } from "vitest";

import {
    buildRoiQueryParams,
    calculateRoi,
    calculateRoiScenario,
    normalizeRoiInput,
    parseRoiQueryParams,
} from "../roiCalculatorLogic";

describe("roiCalculatorLogic", () => {
    describe("normalizeRoiInput", () => {
        it("normalizes numeric values", () => {
            const result = normalizeRoiInput({
                initialInvestment: "10000",
                finalValue: "15000",
                additionalCosts: "500",
                years: "2.5",
            });

            expect(result).toEqual({
                initialInvestment: 10000,
                finalValue: 15000,
                additionalCosts: 500,
                years: 2.5,
            });
        });

        it("clamps invalid values", () => {
            const result = normalizeRoiInput({
                initialInvestment: -100,
                finalValue: -200,
                additionalCosts: -50,
                years: 500,
            });

            expect(result).toEqual({
                initialInvestment: 0,
                finalValue: 0,
                additionalCosts: 0,
                years: 100,
            });
        });
    });

    describe("calculateRoi", () => {
        it("calculates a profitable investment", () => {
            const result = calculateRoi({
                initialInvestment: 10000,
                finalValue: 15000,
                additionalCosts: 0,
                years: 1,
            });

            expect(result.totalInvestment).toBe(10000);
            expect(result.netProfit).toBe(5000);
            expect(result.roiPercent).toBe(50);
            expect(result.annualizedRoiPercent).toBe(50);
            expect(result.investmentMultiple).toBe(1.5);
            expect(result.breakEvenFinalValue).toBe(10000);
            expect(result.isProfit).toBe(true);
            expect(result.isLoss).toBe(false);
            expect(result.isBreakEven).toBe(false);
        });

        it("includes additional costs in total investment", () => {
            const result = calculateRoi({
                initialInvestment: 5000,
                finalValue: 9000,
                additionalCosts: 750,
                years: 0.25,
            });

            expect(result.totalInvestment).toBe(5750);
            expect(result.netProfit).toBe(3250);
            expect(result.roiPercent).toBe(56.52);
            expect(result.investmentMultiple).toBe(1.57);
            expect(result.isProfit).toBe(true);
        });

        it("calculates annualized ROI for multi-year investments", () => {
            const result = calculateRoi({
                initialInvestment: 25000,
                finalValue: 40000,
                additionalCosts: 0,
                years: 5,
            });

            expect(result.roiPercent).toBe(60);
            expect(result.annualizedRoiPercent).toBe(9.86);
            expect(result.investmentMultiple).toBe(1.6);
        });

        it("calculates a loss", () => {
            const result = calculateRoi({
                initialInvestment: 10000,
                finalValue: 7000,
                additionalCosts: 1000,
                years: 1,
            });

            expect(result.totalInvestment).toBe(11000);
            expect(result.netProfit).toBe(-4000);
            expect(result.roiPercent).toBe(-36.36);
            expect(result.isProfit).toBe(false);
            expect(result.isLoss).toBe(true);
            expect(result.isBreakEven).toBe(false);
        });

        it("handles break-even investments", () => {
            const result = calculateRoi({
                initialInvestment: 10000,
                finalValue: 12000,
                additionalCosts: 2000,
                years: 1,
            });

            expect(result.netProfit).toBe(0);
            expect(result.roiPercent).toBe(0);
            expect(result.annualizedRoiPercent).toBe(0);
            expect(result.isProfit).toBe(false);
            expect(result.isLoss).toBe(false);
            expect(result.isBreakEven).toBe(true);
        });

        it("returns zero percentages when total investment is zero", () => {
            const result = calculateRoi({
                initialInvestment: 0,
                finalValue: 1000,
                additionalCosts: 0,
                years: 1,
            });

            expect(result.totalInvestment).toBe(0);
            expect(result.roiPercent).toBe(0);
            expect(result.annualizedRoiPercent).toBe(0);
            expect(result.investmentMultiple).toBe(0);
        });
    });

    describe("calculateRoiScenario", () => {
        it("calculates a scenario with a final value multiplier", () => {
            const result = calculateRoiScenario(
                {
                    initialInvestment: 10000,
                    finalValue: 20000,
                    additionalCosts: 0,
                    years: 1,
                },
                0.75,
            );

            expect(result.input.finalValue).toBe(15000);
            expect(result.netProfit).toBe(5000);
            expect(result.roiPercent).toBe(50);
        });
    });

    describe("query params", () => {
        it("builds query params from input", () => {
            const query = buildRoiQueryParams({
                initialInvestment: 5000,
                finalValue: 9000,
                additionalCosts: 750,
                years: 0.25,
            });

            expect(query).toContain("initialInvestment=5000");
            expect(query).toContain("finalValue=9000");
            expect(query).toContain("additionalCosts=750");
            expect(query).toContain("years=0.25");
        });

        it("parses query params", () => {
            const params = new URLSearchParams(
                "initialInvestment=25000&finalValue=40000&additionalCosts=0&years=5",
            );

            const result = parseRoiQueryParams(params);

            expect(result).toEqual({
                initialInvestment: 25000,
                finalValue: 40000,
                additionalCosts: 0,
                years: 5,
            });
        });
    });
});
