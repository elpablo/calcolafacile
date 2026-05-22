import { describe, expect, it } from "vitest";

import {
    buildMortgageQueryParams,
    calculateMortgage,
    normalizeMortgageInput,
    parseMortgageQueryParams,
} from "../mortgageCalculatorLogic";

describe("mortgageCalculatorLogic", () => {
    describe("normalizeMortgageInput", () => {
        it("normalizes numeric values", () => {
            const result = normalizeMortgageInput({
                propertyPrice: "300000",
                downPayment: "50000",
                loanAmount: "250000",
                annualRate: "4",
                years: "30",
            });

            expect(result).toEqual({
                propertyPrice: 300000,
                downPayment: 50000,
                loanAmount: 250000,
                annualRate: 4,
                years: 30,
            });
        });

        it("clamps invalid values", () => {
            const result = normalizeMortgageInput({
                propertyPrice: -100,
                downPayment: -50,
                loanAmount: -200,
                annualRate: 500,
                years: 0,
            });

            expect(result).toEqual({
                propertyPrice: 0,
                downPayment: 0,
                loanAmount: 0,
                annualRate: 100,
                years: 1,
            });
        });

        it("caps down payment to property price", () => {
            const result = normalizeMortgageInput({
                propertyPrice: 200000,
                downPayment: 250000,
                loanAmount: 0,
                annualRate: 3,
                years: 20,
            });

            expect(result.downPayment).toBe(200000);
        });
    });

    describe("calculateMortgage", () => {
        it("calculates a standard fixed-rate mortgage", () => {
            const result = calculateMortgage({
                propertyPrice: 300000,
                downPayment: 50000,
                loanAmount: 250000,
                annualRate: 4,
                years: 30,
            });

            expect(result.months).toBe(360);
            expect(result.monthlyPayment).toBe(1193.54);
            expect(result.totalPaid).toBe(429673.77);
            expect(result.totalInterest).toBe(179673.77);
            expect(result.totalCost).toBe(479673.77);
            expect(result.loanToValuePercent).toBe(83.33);
            expect(result.yearlyBreakdown).toHaveLength(30);
        });

        it("calculates a zero-interest mortgage", () => {
            const result = calculateMortgage({
                propertyPrice: 120000,
                downPayment: 20000,
                loanAmount: 100000,
                annualRate: 0,
                years: 10,
            });

            expect(result.months).toBe(120);
            expect(result.monthlyPayment).toBe(833.33);
            expect(result.totalPaid).toBe(100000);
            expect(result.totalInterest).toBe(0);
            expect(result.yearlyBreakdown).toHaveLength(10);
        });

        it("builds a yearly amortization breakdown", () => {
            const result = calculateMortgage({
                propertyPrice: 300000,
                downPayment: 50000,
                loanAmount: 250000,
                annualRate: 4,
                years: 30,
            });

            const firstYear = result.yearlyBreakdown[0];
            const lastYear = result.yearlyBreakdown.at(-1);

            expect(firstYear.year).toBe(1);
            expect(firstYear.interestPaid).toBeGreaterThan(firstYear.principalPaid);
            expect(lastYear.year).toBe(30);
            expect(lastYear.endBalance).toBe(0);
        });

        it("handles a shorter mortgage with lower total interest", () => {
            const thirtyYears = calculateMortgage({
                propertyPrice: 300000,
                downPayment: 50000,
                loanAmount: 250000,
                annualRate: 4,
                years: 30,
            });

            const twentyYears = calculateMortgage({
                propertyPrice: 300000,
                downPayment: 50000,
                loanAmount: 250000,
                annualRate: 4,
                years: 20,
            });

            expect(twentyYears.monthlyPayment).toBeGreaterThan(thirtyYears.monthlyPayment);
            expect(twentyYears.totalInterest).toBeLessThan(thirtyYears.totalInterest);
            expect(twentyYears.yearlyBreakdown).toHaveLength(20);
        });
    });

    describe("query params", () => {
        it("builds query params from input", () => {
            const query = buildMortgageQueryParams({
                propertyPrice: 350000,
                downPayment: 35000,
                loanAmount: 315000,
                annualRate: 4.5,
                years: 30,
            });

            expect(query).toContain("propertyPrice=350000");
            expect(query).toContain("downPayment=35000");
            expect(query).toContain("loanAmount=315000");
            expect(query).toContain("annualRate=4.5");
            expect(query).toContain("years=30");
        });

        it("parses query params", () => {
            const params = new URLSearchParams(
                "propertyPrice=300000&downPayment=50000&loanAmount=250000&annualRate=4&years=20",
            );

            const result = parseMortgageQueryParams(params);

            expect(result).toEqual({
                propertyPrice: 300000,
                downPayment: 50000,
                loanAmount: 250000,
                annualRate: 4,
                years: 20,
            });
        });
    });
});