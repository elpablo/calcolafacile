import { describe, expect, it } from "vitest";

import {
    buildCryptoProfitQueryParams,
    calculateCryptoProfit,
    calculateCryptoScenario,
    normalizeCryptoProfitInput,
    parseCryptoProfitQueryParams,
} from "../cryptoProfitCalculatorLogic";

describe("cryptoProfitCalculatorLogic", () => {
    describe("normalizeCryptoProfitInput", () => {
        it("normalizes numeric values and crypto symbols", () => {
            const result = normalizeCryptoProfitInput({
                cryptoSymbol: " btc ",
                buyPrice: "30000",
                sellPrice: "65000",
                quantity: "0.1",
                buyFee: "5",
                sellFee: "10",
            });

            expect(result).toEqual({
                cryptoSymbol: "BTC",
                buyPrice: 30000,
                sellPrice: 65000,
                quantity: 0.1,
                buyFee: 5,
                sellFee: 10,
            });
        });

        it("removes unsupported characters from crypto symbols", () => {
            const result = normalizeCryptoProfitInput({
                cryptoSymbol: " eth/usd 🚀 ",
            });

            expect(result.cryptoSymbol).toBe("ETHUSD");
        });

        it("clamps negative numeric values", () => {
            const result = normalizeCryptoProfitInput({
                buyPrice: -100,
                sellPrice: -200,
                quantity: -1,
                buyFee: -5,
                sellFee: -10,
            });

            expect(result.buyPrice).toBe(0);
            expect(result.sellPrice).toBe(0);
            expect(result.quantity).toBe(0);
            expect(result.buyFee).toBe(0);
            expect(result.sellFee).toBe(0);
        });
    });

    describe("calculateCryptoProfit", () => {
        it("calculates a profitable trade", () => {
            const result = calculateCryptoProfit({
                cryptoSymbol: "BTC",
                buyPrice: 30000,
                sellPrice: 65000,
                quantity: 0.1,
                buyFee: 0,
                sellFee: 0,
            });

            expect(result.totalCost).toBe(3000);
            expect(result.totalProceeds).toBe(6500);
            expect(result.profit).toBe(3500);
            expect(result.roiPercent).toBe(116.67);
            expect(result.priceChangePercent).toBe(116.67);
            expect(result.breakEvenSellPrice).toBe(30000);
            expect(result.profitPerUnit).toBe(35000);
            expect(result.isProfit).toBe(true);
            expect(result.isLoss).toBe(false);
            expect(result.isBreakEven).toBe(false);
        });

        it("calculates fees correctly", () => {
            const result = calculateCryptoProfit({
                cryptoSymbol: "ETH",
                buyPrice: 1800,
                sellPrice: 3200,
                quantity: 2,
                buyFee: 12,
                sellFee: 18,
            });

            expect(result.grossCost).toBe(3600);
            expect(result.totalCost).toBe(3612);
            expect(result.grossProceeds).toBe(6400);
            expect(result.totalProceeds).toBe(6382);
            expect(result.profit).toBe(2770);
            expect(result.roiPercent).toBe(76.69);
            expect(result.breakEvenSellPrice).toBe(1815);
        });

        it("calculates a loss", () => {
            const result = calculateCryptoProfit({
                cryptoSymbol: "SOL",
                buyPrice: 180,
                sellPrice: 120,
                quantity: 10,
                buyFee: 5,
                sellFee: 5,
            });

            expect(result.profit).toBe(-610);
            expect(result.roiPercent).toBe(-33.8);
            expect(result.isProfit).toBe(false);
            expect(result.isLoss).toBe(true);
            expect(result.isBreakEven).toBe(false);
        });

        it("handles break-even trades", () => {
            const result = calculateCryptoProfit({
                buyPrice: 100,
                sellPrice: 100,
                quantity: 3,
                buyFee: 0,
                sellFee: 0,
            });

            expect(result.profit).toBe(0);
            expect(result.roiPercent).toBe(0);
            expect(result.isProfit).toBe(false);
            expect(result.isLoss).toBe(false);
            expect(result.isBreakEven).toBe(true);
        });
    });

    describe("calculateCryptoScenario", () => {
        it("calculates a scenario with a sell price multiplier", () => {
            const result = calculateCryptoScenario(
                {
                    buyPrice: 100,
                    sellPrice: 200,
                    quantity: 1,
                    buyFee: 0,
                    sellFee: 0,
                },
                1.5,
            );

            expect(result.input.sellPrice).toBe(300);
            expect(result.profit).toBe(200);
            expect(result.roiPercent).toBe(200);
        });
    });

    describe("query params", () => {
        it("builds query params from input", () => {
            const query = buildCryptoProfitQueryParams({
                cryptoSymbol: "ETH",
                buyPrice: 1800,
                sellPrice: 3200,
                quantity: 2,
                buyFee: 12,
                sellFee: 18,
            });

            expect(query).toContain("cryptoSymbol=ETH");
            expect(query).toContain("buyPrice=1800");
            expect(query).toContain("sellPrice=3200");
            expect(query).toContain("quantity=2");
            expect(query).toContain("buyFee=12");
            expect(query).toContain("sellFee=18");
        });

        it("parses query params", () => {
            const params = new URLSearchParams(
                "cryptoSymbol=SOL&buyPrice=180&sellPrice=120&quantity=10&buyFee=5&sellFee=5",
            );

            const result = parseCryptoProfitQueryParams(params);

            expect(result).toEqual({
                cryptoSymbol: "SOL",
                buyPrice: 180,
                sellPrice: 120,
                quantity: 10,
                buyFee: 5,
                sellFee: 5,
            });
        });
    });
});
