

export function normalizePositiveNumber(value) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue) || numericValue < 0) {
        return 0;
    }

    return numericValue;
}

export function calculateTokenCost(tokens, costPerMillion) {
    return (normalizePositiveNumber(tokens) / 1_000_000) * normalizePositiveNumber(costPerMillion);
}

export function calculateAiCosts({
    inputTokens,
    outputTokens,
    requestsPerDay,
    model,
}) {
    const safeModel = model ?? {};
    const normalizedRequestsPerDay = normalizePositiveNumber(requestsPerDay);

    const inputCost = calculateTokenCost(
        inputTokens,
        safeModel.inputCostPerMillion,
    );

    const outputCost = calculateTokenCost(
        outputTokens,
        safeModel.outputCostPerMillion,
    );

    const requestCost = inputCost + outputCost;
    const dailyCost = requestCost * normalizedRequestsPerDay;
    const monthlyCost = dailyCost * 30;

    return {
        inputCost,
        outputCost,
        requestCost,
        dailyCost,
        monthlyCost,
    };
}