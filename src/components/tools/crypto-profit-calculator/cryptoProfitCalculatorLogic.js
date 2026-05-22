

const DEFAULT_OPTIONS = {
    cryptoSymbol: "BTC",
    buyPrice: 30000,
    sellPrice: 65000,
    quantity: 0.1,
    buyFee: 0,
    sellFee: 0,
};

function toFiniteNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function roundMoney(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

function roundCrypto(value) {
    return Math.round((value + Number.EPSILON) * 100000000) / 100000000;
}

function roundPercent(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

function normalizeCryptoSymbol(value) {
    const symbol = String(value ?? DEFAULT_OPTIONS.cryptoSymbol)
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9-]/g, "");

    return symbol || DEFAULT_OPTIONS.cryptoSymbol;
}

export function normalizeCryptoProfitInput(input = {}) {
    return {
        cryptoSymbol: normalizeCryptoSymbol(input.cryptoSymbol),
        buyPrice: Math.max(0, toFiniteNumber(input.buyPrice, DEFAULT_OPTIONS.buyPrice)),
        sellPrice: Math.max(0, toFiniteNumber(input.sellPrice, DEFAULT_OPTIONS.sellPrice)),
        quantity: Math.max(0, toFiniteNumber(input.quantity, DEFAULT_OPTIONS.quantity)),
        buyFee: clamp(toFiniteNumber(input.buyFee, DEFAULT_OPTIONS.buyFee), 0, 1000000000),
        sellFee: clamp(toFiniteNumber(input.sellFee, DEFAULT_OPTIONS.sellFee), 0, 1000000000),
    };
}

export function calculateCryptoProfit(input = {}) {
    const normalized = normalizeCryptoProfitInput(input);
    const { buyPrice, sellPrice, quantity, buyFee, sellFee } = normalized;

    const grossCost = buyPrice * quantity;
    const totalCost = grossCost + buyFee;
    const grossProceeds = sellPrice * quantity;
    const totalProceeds = Math.max(0, grossProceeds - sellFee);
    const profit = totalProceeds - totalCost;
    const roiPercent = totalCost > 0 ? (profit / totalCost) * 100 : 0;
    const priceChangePercent = buyPrice > 0 ? ((sellPrice - buyPrice) / buyPrice) * 100 : 0;
    const breakEvenSellPrice = quantity > 0 ? (totalCost + sellFee) / quantity : 0;
    const profitPerUnit = quantity > 0 ? profit / quantity : 0;

    return {
        input: normalized,
        grossCost: roundMoney(grossCost),
        totalCost: roundMoney(totalCost),
        grossProceeds: roundMoney(grossProceeds),
        totalProceeds: roundMoney(totalProceeds),
        profit: roundMoney(profit),
        roiPercent: roundPercent(roiPercent),
        priceChangePercent: roundPercent(priceChangePercent),
        breakEvenSellPrice: roundMoney(breakEvenSellPrice),
        profitPerUnit: roundMoney(profitPerUnit),
        isProfit: profit > 0,
        isLoss: profit < 0,
        isBreakEven: profit === 0,
    };
}

export function calculateCryptoScenario(input = {}, sellPriceMultiplier = 1) {
    const normalized = normalizeCryptoProfitInput(input);
    return calculateCryptoProfit({
        ...normalized,
        sellPrice: roundMoney(normalized.sellPrice * sellPriceMultiplier),
    });
}

export function buildCryptoProfitQueryParams(input = {}) {
    const normalized = normalizeCryptoProfitInput(input);
    const params = new URLSearchParams();

    params.set("cryptoSymbol", normalized.cryptoSymbol);
    params.set("buyPrice", String(normalized.buyPrice));
    params.set("sellPrice", String(normalized.sellPrice));
    params.set("quantity", String(normalized.quantity));
    params.set("buyFee", String(normalized.buyFee));
    params.set("sellFee", String(normalized.sellFee));

    return params.toString();
}

export function parseCryptoProfitQueryParams(searchParams = {}) {
    const getValue = (key) => {
        if (typeof searchParams.get === "function") {
            return searchParams.get(key);
        }

        return searchParams[key];
    };

    return normalizeCryptoProfitInput({
        cryptoSymbol: getValue("cryptoSymbol"),
        buyPrice: getValue("buyPrice"),
        sellPrice: getValue("sellPrice"),
        quantity: getValue("quantity"),
        buyFee: getValue("buyFee"),
        sellFee: getValue("sellFee"),
    });
}

export { DEFAULT_OPTIONS, roundCrypto, roundMoney, roundPercent };