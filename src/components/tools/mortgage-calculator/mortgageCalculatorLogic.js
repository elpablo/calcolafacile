const DEFAULT_OPTIONS = {
    loanAmount: 250000,
    annualRate: 4,
    years: 30,
    downPayment: 50000,
    propertyPrice: 300000,
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

export function normalizeMortgageInput(input = {}) {
    const propertyPrice = Math.max(
        0,
        toFiniteNumber(input.propertyPrice, DEFAULT_OPTIONS.propertyPrice),
    );
    const downPayment = Math.max(
        0,
        toFiniteNumber(input.downPayment, DEFAULT_OPTIONS.downPayment),
    );
    const fallbackLoanAmount = Math.max(0, propertyPrice - downPayment);

    return {
        propertyPrice,
        downPayment: Math.min(downPayment, propertyPrice || downPayment),
        loanAmount: Math.max(
            0,
            toFiniteNumber(input.loanAmount, fallbackLoanAmount || DEFAULT_OPTIONS.loanAmount),
        ),
        annualRate: clamp(
            toFiniteNumber(input.annualRate, DEFAULT_OPTIONS.annualRate),
            0,
            100,
        ),
        years: clamp(toFiniteNumber(input.years, DEFAULT_OPTIONS.years), 1, 100),
    };
}

function calculateMonthlyPayment(loanAmount, annualRate, months) {
    if (loanAmount <= 0 || months <= 0) {
        return 0;
    }

    const monthlyRate = annualRate / 100 / 12;

    if (monthlyRate === 0) {
        return loanAmount / months;
    }

    const growthFactor = Math.pow(1 + monthlyRate, months);
    return loanAmount * ((monthlyRate * growthFactor) / (growthFactor - 1));
}

export function calculateMortgage(input = {}) {
    const normalized = normalizeMortgageInput(input);
    const { loanAmount, annualRate, years, propertyPrice, downPayment } = normalized;
    const months = Math.round(years * 12);
    const monthlyPayment = calculateMonthlyPayment(loanAmount, annualRate, months);
    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - loanAmount;
    const loanToValuePercent = propertyPrice > 0 ? (loanAmount / propertyPrice) * 100 : 0;

    let balance = loanAmount;
    const monthlyRate = annualRate / 100 / 12;
    const yearlyBreakdown = [];

    for (let month = 1; month <= months; month += 1) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(
            balance,
            monthlyPayment - interestPayment,
        );

        balance = Math.max(0, balance - principalPayment);

        const yearIndex = Math.ceil(month / 12);
        const existingYear = yearlyBreakdown[yearIndex - 1] ?? {
            year: yearIndex,
            principalPaid: 0,
            interestPaid: 0,
            endBalance: balance,
        };

        existingYear.principalPaid += principalPayment;
        existingYear.interestPaid += interestPayment;
        existingYear.endBalance = balance;
        yearlyBreakdown[yearIndex - 1] = existingYear;
    }

    return {
        input: normalized,
        months,
        monthlyPayment: roundMoney(monthlyPayment),
        totalPaid: roundMoney(totalPaid),
        totalInterest: roundMoney(totalInterest),
        totalCost: roundMoney(totalPaid + downPayment),
        loanToValuePercent: roundPercent(loanToValuePercent),
        yearlyBreakdown: yearlyBreakdown.map((item) => ({
            year: item.year,
            principalPaid: roundMoney(item.principalPaid),
            interestPaid: roundMoney(item.interestPaid),
            endBalance: roundMoney(item.endBalance),
        })),
    };
}

export function buildMortgageQueryParams(input = {}) {
    const normalized = normalizeMortgageInput(input);
    const params = new URLSearchParams();

    params.set("propertyPrice", String(normalized.propertyPrice));
    params.set("downPayment", String(normalized.downPayment));
    params.set("loanAmount", String(normalized.loanAmount));
    params.set("annualRate", String(normalized.annualRate));
    params.set("years", String(normalized.years));

    return params.toString();
}

export function parseMortgageQueryParams(searchParams = {}) {
    const getValue = (key) => {
        if (typeof searchParams.get === "function") {
            return searchParams.get(key);
        }

        return searchParams[key];
    };

    return normalizeMortgageInput({
        propertyPrice: getValue("propertyPrice"),
        downPayment: getValue("downPayment"),
        loanAmount: getValue("loanAmount"),
        annualRate: getValue("annualRate"),
        years: getValue("years"),
    });
}

export { DEFAULT_OPTIONS, roundMoney, roundPercent };