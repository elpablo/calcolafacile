import { describe, expect, it } from "vitest";
import {
    DEFAULT_VAT_INPUT,
    VAT_MODES,
    VAT_RATE_GROUPS,
    buildVatQueryParams,
    calculateVat,
    normalizeVatInput,
    parseVatQueryParams,
    roundMoney,
} from "../vatCalculatorLogic";

describe("vatCalculatorLogic", () => {
    describe("roundMoney", () => {
        it("rounds monetary values to two decimals", () => {
            expect(roundMoney(10.005)).toBe(10.01);
            expect(roundMoney(10.004)).toBe(10);
        });
    });

    describe("normalizeVatInput", () => {
        it("normalizes valid input values", () => {
            expect(
                normalizeVatInput({
                    amount: "250.5",
                    rate: "17.5",
                    mode: "remove",
                }),
            ).toEqual({
                amount: 250.5,
                rate: 17.5,
                mode: "remove",
            });
        });

        it("falls back to defaults for invalid values", () => {
            expect(
                normalizeVatInput({
                    amount: "not-a-number",
                    rate: "not-a-number",
                    mode: "invalid",
                }),
            ).toEqual(DEFAULT_VAT_INPUT);
        });

        it("clamps negative amounts and out-of-range rates", () => {
            expect(
                normalizeVatInput({
                    amount: -100,
                    rate: 250,
                    mode: "add",
                }),
            ).toEqual({
                amount: 0,
                rate: 100,
                mode: "add",
            });
        });
    });

    describe("calculateVat", () => {
        it("adds VAT to a net amount", () => {
            expect(
                calculateVat({
                    amount: 100,
                    rate: 20,
                    mode: "add",
                }),
            ).toEqual({
                input: {
                    amount: 100,
                    rate: 20,
                    mode: "add",
                },
                netAmount: 100,
                vatAmount: 20,
                grossAmount: 120,
            });
        });

        it("removes VAT from a gross amount", () => {
            expect(
                calculateVat({
                    amount: 120,
                    rate: 20,
                    mode: "remove",
                }),
            ).toEqual({
                input: {
                    amount: 120,
                    rate: 20,
                    mode: "remove",
                },
                netAmount: 100,
                vatAmount: 20,
                grossAmount: 120,
            });
        });

        it("supports custom decimal VAT rates", () => {
            expect(
                calculateVat({
                    amount: 250,
                    rate: 17.5,
                    mode: "add",
                }),
            ).toEqual({
                input: {
                    amount: 250,
                    rate: 17.5,
                    mode: "add",
                },
                netAmount: 250,
                vatAmount: 43.75,
                grossAmount: 293.75,
            });
        });

        it("handles zero VAT rates", () => {
            expect(
                calculateVat({
                    amount: 100,
                    rate: 0,
                    mode: "add",
                }),
            ).toEqual({
                input: {
                    amount: 100,
                    rate: 0,
                    mode: "add",
                },
                netAmount: 100,
                vatAmount: 0,
                grossAmount: 100,
            });
        });
    });

    describe("query params", () => {
        it("builds query params from normalized input", () => {
            expect(
                buildVatQueryParams({
                    amount: "120",
                    rate: "20",
                    mode: "remove",
                }),
            ).toBe("amount=120&rate=20&mode=remove");
        });

        it("parses URLSearchParams", () => {
            const params = new URLSearchParams(
                "amount=250&rate=17.5&mode=add",
            );

            expect(parseVatQueryParams(params)).toEqual({
                amount: 250,
                rate: 17.5,
                mode: "add",
            });
        });

        it("parses plain objects", () => {
            expect(
                parseVatQueryParams({
                    amount: "120",
                    rate: "20",
                    mode: "remove",
                }),
            ).toEqual({
                amount: 120,
                rate: 20,
                mode: "remove",
            });
        });
    });

    describe("constants", () => {
        it("defines the supported VAT modes", () => {
            expect(VAT_MODES).toEqual(["add", "remove"]);
        });

        it("defines UK and Italy VAT rate groups", () => {
            expect(VAT_RATE_GROUPS).toEqual([
                {
                    key: "uk",
                    rates: [20, 5, 0],
                },
                {
                    key: "italy",
                    rates: [22, 10, 4],
                },
            ]);
        });
    });
});