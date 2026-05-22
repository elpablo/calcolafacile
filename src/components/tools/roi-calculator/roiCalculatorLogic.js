const DEFAULT_OPTIONS = {
    initialInvestment: 10000,
    finalValue: 15000,
    additionalCosts: 0,
    years: 1,
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

function roundPercent(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

function roundMultiple(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function normalizeRoiInput(input = {}) {
    return {
        initialInvestment: Math.max(
            0,
            toFiniteNumber(input.initialInvestment, DEFAULT_OPTIONS.initialInvestment),
        ),
        finalValue: Math.max(
            0,
            toFiniteNumber(input.finalValue, DEFAULT_OPTIONS.finalValue),
        ),
        additionalCosts: Math.max(
            0,
            toFiniteNumber(input.additionalCosts, DEFAULT_OPTIONS.additionalCosts),
        ),
        years: clamp(
            toFiniteNumber(input.years, DEFAULT_OPTIONS.years),
            0,
            100,
        ),
    };
}

export function calculateRoi(input = {}) {
    const normalized = normalizeRoiInput(input);
    const { initialInvestment, finalValue, additionalCosts, years } = normalized;

    const totalInvestment = initialInvestment + additionalCosts;
    const netProfit = finalValue - totalInvestment;
    const roiPercent = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;
    const investmentMultiple = totalInvestment > 0 ? finalValue / totalInvestment : 0;
    const breakEvenFinalValue = totalInvestment;
    const annualizedRoiPercent =
        totalInvestment > 0 && finalValue > 0 && years > 0
            ? (Math.pow(finalValue / totalInvestment, 1 / years) - 1) * 100
            : 0;

    return {
        input: normalized,
        totalInvestment: roundMoney(totalInvestment),
        netProfit: roundMoney(netProfit),
        roiPercent: roundPercent(roiPercent),
        annualizedRoiPercent: roundPercent(annualizedRoiPercent),
        investmentMultiple: roundMultiple(investmentMultiple),
        breakEvenFinalValue: roundMoney(breakEvenFinalValue),
        isProfit: netProfit > 0,
        isLoss: netProfit < 0,
        isBreakEven: netProfit === 0,
    };
}

export function calculateRoiScenario(input = {}, finalValueMultiplier = 1) {
    const normalized = normalizeRoiInput(input);

    return calculateRoi({
        ...normalized,
        finalValue: roundMoney(normalized.finalValue * finalValueMultiplier),
    });
}

export function buildRoiQueryParams(input = {}) {
    const normalized = normalizeRoiInput(input);
    const params = new URLSearchParams();

    params.set("initialInvestment", String(normalized.initialInvestment));
    params.set("finalValue", String(normalized.finalValue));
    params.set("additionalCosts", String(normalized.additionalCosts));
    params.set("years", String(normalized.years));

    return params.toString();
}

export function parseRoiQueryParams(searchParams = {}) {
    const getValue = (key) => {
        if (typeof searchParams.get === "function") {
            return searchParams.get(key);
        }

        return searchParams[key];
    };

    return normalizeRoiInput({
        initialInvestment: getValue("initialInvestment"),
        finalValue: getValue("finalValue"),
        additionalCosts: getValue("additionalCosts"),
        years: getValue("years"),
    });
}

export { DEFAULT_OPTIONS, roundMoney, roundMultiple, roundPercent };
