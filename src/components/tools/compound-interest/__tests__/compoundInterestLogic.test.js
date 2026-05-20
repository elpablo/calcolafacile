import { describe, expect, it } from "vitest";

import {
    buildCompoundInterestQueryParams,
    calculateCompoundInterest,
    normalizeCompoundInterestInput,
    parseCompoundInterestQueryParams,
} from "../compoundInterestLogic";

describe("compoundInterestLogic", () => {
    describe("normalizeCompoundInterestInput", () => {
        it("normalizes numeric values", () => {
            const result = normalizeCompoundInterestInput({
                principal: "10000",
                monthlyContribution: "250",
                annualRate: "5.5",
                years: "20",
                compoundingFrequency: "monthly",
            });

            expect(result).toEqual({
                principal: 10000,
                monthlyContribution: 250,
                annualRate: 5.5,
                years: 20,
                compoundingFrequency: "monthly",
            });
        });

        it("clamps invalid values", () => {
            const result = normalizeCompoundInterestInput({
                principal: -100,
                monthlyContribution: -50,
                annualRate: 500,
                years: 1000,
                compoundingFrequency: "invalid",
            });

            expect(result).toEqual({
                principal: 0,
                monthlyContribution: 0,
                annualRate: 100,
                years: 100,
                compoundingFrequency: "monthly",
            });
        });
    });

    describe("calculateCompoundInterest", () => {
        it("calculates yearly compound interest without monthly contributions", () => {
            const result = calculateCompoundInterest({
                principal: 10000,
                monthlyContribution: 0,
                annualRate: 5,
                years: 10,
                compoundingFrequency: "yearly",
            });

            expect(result.finalBalance).toBeGreaterThan(16000);
            expect(result.totalInterest).toBeGreaterThan(6000);
            expect(result.yearlyBreakdown).toHaveLength(10);
        });

        it("calculates compound interest with monthly contributions", () => {
            const result = calculateCompoundInterest({
                principal: 5000,
                monthlyContribution: 200,
                annualRate: 5,
                years: 20,
                compoundingFrequency: "monthly",
            });

            expect(result.finalBalance).toBeGreaterThan(90000);
            expect(result.totalContributions).toBe(53000);
            expect(result.totalInterest).toBeGreaterThan(30000);
            expect(result.growthMultiple).toBeGreaterThan(1);
        });

        it("builds a yearly breakdown", () => {
            const result = calculateCompoundInterest({
                principal: 1000,
                monthlyContribution: 100,
                annualRate: 6,
                years: 5,
                compoundingFrequency: "monthly",
            });

            expect(result.yearlyBreakdown).toHaveLength(5);

            expect(result.yearlyBreakdown[0]).toMatchObject({
                year: 1,
            });

            expect(result.yearlyBreakdown[4].endBalance).toBeGreaterThan(
                result.yearlyBreakdown[0].endBalance,
            );
        });
    });

    describe("query params", () => {
        it("builds query params from input", () => {
            const query = buildCompoundInterestQueryParams({
                principal: 5000,
                monthlyContribution: 200,
                annualRate: 5,
                years: 20,
                compoundingFrequency: "monthly",
            });

            expect(query).toContain("principal=5000");
            expect(query).toContain("monthlyContribution=200");
            expect(query).toContain("annualRate=5");
            expect(query).toContain("years=20");
            expect(query).toContain("compoundingFrequency=monthly");
        });

        it("parses query params", () => {
            const params = new URLSearchParams(
                "principal=10000&monthlyContribution=300&annualRate=7&years=15&compoundingFrequency=yearly",
            );

            const result = parseCompoundInterestQueryParams(params);

            expect(result).toEqual({
                principal: 10000,
                monthlyContribution: 300,
                annualRate: 7,
                years: 15,
                compoundingFrequency: "yearly",
            });
        });
    });
});
