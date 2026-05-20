const DEFAULT_OPTIONS = {
    principal: 5000,
    monthlyContribution: 200,
    annualRate: 5,
    years: 20,
    compoundingFrequency: "monthly",
};

const COMPOUNDING_FREQUENCIES = {
    yearly: 1,
    monthly: 12,
};

function toFiniteNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function roundCurrency(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

function normalizeCompoundingFrequency(value) {
    return Object.hasOwn(COMPOUNDING_FREQUENCIES, value) ? value : "monthly";
}

export function normalizeCompoundInterestInput(input = {}) {
    const principal = Math.max(0, toFiniteNumber(input.principal, DEFAULT_OPTIONS.principal));
    const monthlyContribution = Math.max(
        0,
        toFiniteNumber(input.monthlyContribution, DEFAULT_OPTIONS.monthlyContribution),
    );
    const annualRate = clamp(
        toFiniteNumber(input.annualRate, DEFAULT_OPTIONS.annualRate),
        -100,
        100,
    );
    const years = clamp(
        Math.trunc(toFiniteNumber(input.years, DEFAULT_OPTIONS.years)),
        1,
        100,
    );
    const compoundingFrequency = normalizeCompoundingFrequency(
        input.compoundingFrequency ?? DEFAULT_OPTIONS.compoundingFrequency,
    );

    return {
        principal,
        monthlyContribution,
        annualRate,
        years,
        compoundingFrequency,
    };
}

export function calculateCompoundInterest(input = {}) {
    const normalized = normalizeCompoundInterestInput(input);
    const {
        principal,
        monthlyContribution,
        annualRate,
        years,
        compoundingFrequency,
    } = normalized;

    const compoundsPerYear = COMPOUNDING_FREQUENCIES[compoundingFrequency];
    const totalMonths = years * 12;
    const monthlyRate = annualRate / 100 / 12;

    let balance = principal;
    let totalContributions = principal;
    let totalInterest = 0;
    let yearStartBalance = principal;
    let yearContributions = 0;
    let yearInterest = 0;

    const yearlyBreakdown = [];

    for (let month = 1; month <= totalMonths; month += 1) {
        balance += monthlyContribution;
        totalContributions += monthlyContribution;
        yearContributions += monthlyContribution;

        const shouldCompoundThisMonth =
            compoundingFrequency === "monthly" || month % (12 / compoundsPerYear) === 0;

        if (shouldCompoundThisMonth) {
            const periodsInYearSoFar = compoundingFrequency === "monthly" ? 12 : compoundsPerYear;
            const periodRate = annualRate / 100 / periodsInYearSoFar;
            const interest = balance * periodRate;

            balance += interest;
            totalInterest += interest;
            yearInterest += interest;
        }

        if (month % 12 === 0) {
            const year = month / 12;

            yearlyBreakdown.push({
                year,
                startBalance: roundCurrency(yearStartBalance),
                contributions: roundCurrency(yearContributions),
                interest: roundCurrency(yearInterest),
                endBalance: roundCurrency(balance),
            });

            yearStartBalance = balance;
            yearContributions = 0;
            yearInterest = 0;
        }
    }

    const finalBalance = roundCurrency(balance);
    const roundedTotalContributions = roundCurrency(totalContributions);
    const roundedTotalInterest = roundCurrency(totalInterest);

    return {
        input: normalized,
        finalBalance,
        totalContributions: roundedTotalContributions,
        totalInterest: roundedTotalInterest,
        growthMultiple:
            roundedTotalContributions > 0
                ? roundCurrency(finalBalance / roundedTotalContributions)
                : 0,
        yearlyBreakdown,
    };
}

export function buildCompoundInterestQueryParams(input = {}) {
    const normalized = normalizeCompoundInterestInput(input);
    const params = new URLSearchParams();

    params.set("principal", String(normalized.principal));
    params.set("monthlyContribution", String(normalized.monthlyContribution));
    params.set("annualRate", String(normalized.annualRate));
    params.set("years", String(normalized.years));
    params.set("compoundingFrequency", normalized.compoundingFrequency);

    return params.toString();
}

export function parseCompoundInterestQueryParams(searchParams = {}) {
    const getValue = (key) => {
        if (typeof searchParams.get === "function") {
            return searchParams.get(key);
        }

        return searchParams[key];
    };

    return normalizeCompoundInterestInput({
        principal: getValue("principal"),
        monthlyContribution: getValue("monthlyContribution"),
        annualRate: getValue("annualRate"),
        years: getValue("years"),
        compoundingFrequency: getValue("compoundingFrequency"),
    });
}

export { COMPOUNDING_FREQUENCIES, DEFAULT_OPTIONS };