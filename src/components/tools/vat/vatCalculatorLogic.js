export const VAT_MODES = ["add", "remove"];

export const VAT_RATE_GROUPS = [
    {
        key: "uk",
        rates: [20, 5, 0],
    },
    {
        key: "italy",
        rates: [22, 10, 4],
    },
];

export const DEFAULT_VAT_INPUT = {
    amount: 100,
    rate: 20,
    mode: "add",
};

function toFiniteNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function roundMoney(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function normalizeVatInput(input = {}) {
    const amount = Math.max(
        0,
        toFiniteNumber(input.amount, DEFAULT_VAT_INPUT.amount),
    );
    const rate = clamp(
        toFiniteNumber(input.rate, DEFAULT_VAT_INPUT.rate),
        0,
        100,
    );
    const mode = VAT_MODES.includes(input.mode) ? input.mode : DEFAULT_VAT_INPUT.mode;

    return {
        amount,
        rate,
        mode,
    };
}

export function calculateVat(input = {}) {
    const normalized = normalizeVatInput(input);
    const { amount, rate, mode } = normalized;
    const multiplier = 1 + rate / 100;

    if (mode === "remove") {
        const netAmount = multiplier === 0 ? amount : amount / multiplier;
        const vatAmount = amount - netAmount;

        return {
            input: normalized,
            netAmount: roundMoney(netAmount),
            vatAmount: roundMoney(vatAmount),
            grossAmount: roundMoney(amount),
        };
    }

    const vatAmount = amount * (rate / 100);
    const grossAmount = amount + vatAmount;

    return {
        input: normalized,
        netAmount: roundMoney(amount),
        vatAmount: roundMoney(vatAmount),
        grossAmount: roundMoney(grossAmount),
    };
}

export function buildVatQueryParams(input = {}) {
    const normalized = normalizeVatInput(input);
    const params = new URLSearchParams();

    params.set("amount", String(normalized.amount));
    params.set("rate", String(normalized.rate));
    params.set("mode", normalized.mode);

    return params.toString();
}

export function parseVatQueryParams(searchParams = {}) {
    const getValue = (key) => {
        if (typeof searchParams.get === "function") {
            return searchParams.get(key);
        }

        return searchParams[key];
    };

    return normalizeVatInput({
        amount: getValue("amount"),
        rate: getValue("rate"),
        mode: getValue("mode"),
    });
}