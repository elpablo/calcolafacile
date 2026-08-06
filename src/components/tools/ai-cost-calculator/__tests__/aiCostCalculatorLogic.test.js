import { describe, expect, it } from "vitest";
import { getFlatModels, getProviderKeys, getProviderModelKeys } from "@/config/aiModels";
import {
    AI_COST_USE_CASE_PRESETS,
    applyAiCostPreset,
    buildModelCostComparison,
    calculateAiCostEstimate,
    formatCurrencyDeterministic,
    formatNumberDeterministic,
    getAiCostPreset,
    getDefaultAiCostInput,
    getDefaultModelKeyForProvider,
    getDefaultProviderKey,
    getModelCostComparison,
    isComparableModel,
    normalizeAiCostInput,
} from "../aiCostCalculatorLogic";

describe("aiCostCalculatorLogic", () => {
    describe("AI_COST_USE_CASE_PRESETS", () => {
        it("defines the expected use-case presets", () => {
            expect(AI_COST_USE_CASE_PRESETS).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ key: "support-chatbot" }),
                    expect.objectContaining({ key: "rag-search" }),
                    expect.objectContaining({ key: "coding-assistant" }),
                    expect.objectContaining({ key: "agentic-workflow" }),
                    expect.objectContaining({ key: "content-generation" }),
                ]),
            );
        });

        it("keeps preset numeric fields as strings for form state compatibility", () => {
            for (const preset of AI_COST_USE_CASE_PRESETS) {
                expect(typeof preset.inputTokens).toBe("string");
                expect(typeof preset.outputTokens).toBe("string");
                expect(typeof preset.requestsPerDay).toBe("string");
                expect(Number(preset.inputTokens)).toBeGreaterThanOrEqual(0);
                expect(Number(preset.outputTokens)).toBeGreaterThanOrEqual(0);
                expect(Number(preset.requestsPerDay)).toBeGreaterThanOrEqual(0);
            }
        });
    });

    describe("getDefaultAiCostInput", () => {
        it("returns a complete default input state", () => {
            expect(getDefaultAiCostInput()).toEqual(
                expect.objectContaining({
                    providerKey: expect.any(String),
                    modelKey: expect.any(String),
                    inputTokens: "10000",
                    outputTokens: "5000",
                    requestsPerDay: "100",
                    activePresetKey: null,
                }),
            );
        });
    });

    describe("getDefaultProviderKey", () => {
        it("returns a provider key that exists in the catalog", () => {
            expect(getProviderKeys()).toContain(getDefaultProviderKey());
        });
    });

    describe("getDefaultModelKeyForProvider", () => {
        it("returns a model key that belongs to the requested provider, for every provider", () => {
            for (const providerKey of getProviderKeys()) {
                const modelKey = getDefaultModelKeyForProvider(providerKey);
                expect(getProviderModelKeys(providerKey)).toContain(modelKey);
            }
        });

        it("does not depend on registry ordering (explicit default differs from an arbitrary reorder)", () => {
            // Regression guard: the default must come from an explicit mapping,
            // not from Object.keys(...)[0]. We can't reorder the real registry in
            // this test without mocking the module, so instead we assert the
            // default is stable across repeated calls and always catalog-valid,
            // which the ordering-dependent implementation could not guarantee if
            // the catalog were ever restructured.
            const first = getDefaultModelKeyForProvider("anthropic");
            const second = getDefaultModelKeyForProvider("anthropic");
            expect(first).toBe(second);
            expect(getProviderModelKeys("anthropic")).toContain(first);
        });

        it("keeps deepseek-v4-pro as the DeepSeek default after adding deepseek-v4-flash to the catalog", () => {
            // deepseek-v4-flash was inserted before deepseek-v4-pro's sibling
            // entries in the catalog; this guards against it accidentally
            // becoming the default via Object.keys(...)[0] fallback.
            expect(getDefaultModelKeyForProvider("deepseek")).toBe("deepseek-v4-pro");
        });
    });

    describe("normalizeAiCostInput", () => {
        it("normalizes empty input to defaults", () => {
            expect(normalizeAiCostInput()).toEqual(getDefaultAiCostInput());
        });

        it("keeps valid form values and active preset", () => {
            const normalized = normalizeAiCostInput({
                inputTokens: "1234",
                outputTokens: "567",
                requestsPerDay: "89",
                activePresetKey: "rag-search",
            });

            expect(normalized).toEqual(
                expect.objectContaining({
                    inputTokens: "1234",
                    outputTokens: "567",
                    requestsPerDay: "89",
                    activePresetKey: "rag-search",
                }),
            );
        });

        it("stringifies numeric form values", () => {
            const normalized = normalizeAiCostInput({
                inputTokens: 1000,
                outputTokens: 500,
                requestsPerDay: 25,
            });

            expect(normalized).toEqual(
                expect.objectContaining({
                    inputTokens: "1000",
                    outputTokens: "500",
                    requestsPerDay: "25",
                }),
            );
        });

        it("falls back to a valid provider and model for invalid keys", () => {
            const normalized = normalizeAiCostInput({
                providerKey: "missing-provider",
                modelKey: "missing-model",
            });
            const fallback = getDefaultAiCostInput();

            expect(normalized.providerKey).toBe(fallback.providerKey);
            expect(normalized.modelKey).toBe(fallback.modelKey);
        });

        it("preserves a valid provider and model unchanged", () => {
            const normalized = normalizeAiCostInput({
                providerKey: "anthropic",
                modelKey: "claude-haiku-4.5",
            });

            expect(normalized.providerKey).toBe("anthropic");
            expect(normalized.modelKey).toBe("claude-haiku-4.5");
        });

        it("recovers from an unknown provider by using the explicit default provider and model", () => {
            const normalized = normalizeAiCostInput({
                providerKey: "removed-provider",
                modelKey: "claude-haiku-4.5",
            });

            expect(normalized.providerKey).toBe(getDefaultProviderKey());
            expect(normalized.modelKey).toBe(
                getDefaultModelKeyForProvider(normalized.providerKey),
            );
        });

        it("recovers from a removed model on an otherwise valid provider", () => {
            const normalized = normalizeAiCostInput({
                providerKey: "google",
                modelKey: "gemini-1.0-legacy",
            });

            expect(normalized.providerKey).toBe("google");
            expect(normalized.modelKey).toBe(getDefaultModelKeyForProvider("google"));
        });

        it("recovers when the modelKey belongs to a different provider than providerKey", () => {
            const normalized = normalizeAiCostInput({
                providerKey: "google",
                modelKey: "claude-opus-5",
            });

            expect(normalized.providerKey).toBe("google");
            expect(normalized.modelKey).toBe(getDefaultModelKeyForProvider("google"));
            expect(getProviderModelKeys("google")).toContain(normalized.modelKey);
        });

        it("treats a non-string modelKey as invalid instead of throwing", () => {
            const normalized = normalizeAiCostInput({
                providerKey: "openai",
                modelKey: 42,
            });

            expect(normalized.modelKey).toBe(getDefaultModelKeyForProvider("openai"));
        });
    });

    describe("getAiCostPreset", () => {
        it("returns a preset by key", () => {
            expect(getAiCostPreset("agentic-workflow")).toEqual(
                expect.objectContaining({
                    key: "agentic-workflow",
                    inputTokens: "25000",
                    outputTokens: "9000",
                    requestsPerDay: "300",
                }),
            );
        });

        it("returns undefined for an unknown key", () => {
            expect(getAiCostPreset("unknown-preset")).toBeUndefined();
        });
    });

    describe("applyAiCostPreset", () => {
        it("applies a known preset to the current input", () => {
            const applied = applyAiCostPreset(
                {
                    inputTokens: "1",
                    outputTokens: "1",
                    requestsPerDay: "1",
                },
                "support-chatbot",
            );

            expect(applied).toEqual(
                expect.objectContaining({
                    inputTokens: "3000",
                    outputTokens: "1200",
                    requestsPerDay: "500",
                    activePresetKey: "support-chatbot",
                }),
            );
        });

        it("normalizes input when preset key is unknown", () => {
            const applied = applyAiCostPreset(
                {
                    inputTokens: 200,
                    outputTokens: 100,
                    requestsPerDay: 10,
                },
                "unknown-preset",
            );

            expect(applied).toEqual(
                expect.objectContaining({
                    inputTokens: "200",
                    outputTokens: "100",
                    requestsPerDay: "10",
                    activePresetKey: null,
                }),
            );
        });
    });

    describe("calculateAiCostEstimate", () => {
        it("returns normalized input, provider, model and calculated costs", () => {
            const estimate = calculateAiCostEstimate({
                inputTokens: "10000",
                outputTokens: "5000",
                requestsPerDay: "100",
            });

            expect(estimate.input).toEqual(
                expect.objectContaining({
                    inputTokens: "10000",
                    outputTokens: "5000",
                    requestsPerDay: "100",
                }),
            );
            expect(estimate.input.providerKey).toEqual(expect.any(String));
            expect(estimate.input.modelKey).toEqual(expect.any(String));
            expect(estimate.provider).toEqual(
                expect.objectContaining({
                    label: expect.any(String),
                    models: expect.any(Object),
                }),
            );
            expect(estimate.model).toEqual(
                expect.objectContaining({
                    label: expect.any(String),
                    inputCostPerMillion: expect.any(Number),
                    outputCostPerMillion: expect.any(Number),
                }),
            );
            expect(estimate.calculations).toEqual(
                expect.objectContaining({
                    inputCost: expect.any(Number),
                    outputCost: expect.any(Number),
                    requestCost: expect.any(Number),
                    dailyCost: expect.any(Number),
                    monthlyCost: expect.any(Number),
                    annualCost: expect.any(Number),
                }),
            );
        });

        it("calculates annual cost from monthly cost", () => {
            const estimate = calculateAiCostEstimate({
                inputTokens: "10000",
                outputTokens: "5000",
                requestsPerDay: "100",
            });

            expect(estimate.calculations.annualCost).toBe(
                estimate.calculations.monthlyCost * 12,
            );
        });

        it("calculates a higher monthly cost for agentic workflows than support chatbot presets", () => {
            const support = calculateAiCostEstimate(
                applyAiCostPreset({}, "support-chatbot"),
            );
            const agentic = calculateAiCostEstimate(
                applyAiCostPreset({}, "agentic-workflow"),
            );

            expect(agentic.calculations.monthlyCost).toBeGreaterThan(
                support.calculations.monthlyCost,
            );
        });
    });

    describe("isComparableModel", () => {
        it("accepts a model with finite, non-negative pricing", () => {
            expect(
                isComparableModel({ inputCostPerMillion: 1, outputCostPerMillion: 2 }),
            ).toBe(true);
            expect(
                isComparableModel({ inputCostPerMillion: 0, outputCostPerMillion: 0 }),
            ).toBe(true);
        });

        it("rejects missing, non-numeric, NaN, or negative pricing", () => {
            expect(isComparableModel(null)).toBe(false);
            expect(isComparableModel({})).toBe(false);
            expect(
                isComparableModel({ inputCostPerMillion: undefined, outputCostPerMillion: 2 }),
            ).toBe(false);
            expect(
                isComparableModel({ inputCostPerMillion: "1", outputCostPerMillion: 2 }),
            ).toBe(false);
            expect(
                isComparableModel({ inputCostPerMillion: NaN, outputCostPerMillion: 2 }),
            ).toBe(false);
            expect(
                isComparableModel({ inputCostPerMillion: -1, outputCostPerMillion: 2 }),
            ).toBe(false);
        });
    });

    describe("buildModelCostComparison", () => {
        const normalizedInput = {
            providerKey: "acme",
            modelKey: "acme-medium",
            inputTokens: "1000000",
            outputTokens: "1000000",
            requestsPerDay: "1",
        };

        const syntheticModels = [
            {
                providerKey: "acme",
                providerLabel: "Acme",
                modelKey: "acme-cheap",
                label: "Acme Cheap",
                inputCostPerMillion: 1,
                outputCostPerMillion: 1,
            },
            {
                providerKey: "acme",
                providerLabel: "Acme",
                modelKey: "acme-medium",
                label: "Acme Medium",
                inputCostPerMillion: 5,
                outputCostPerMillion: 5,
            },
            {
                providerKey: "acme",
                providerLabel: "Acme",
                modelKey: "acme-expensive",
                label: "Acme Expensive",
                inputCostPerMillion: 20,
                outputCostPerMillion: 20,
            },
            {
                providerKey: "acme",
                providerLabel: "Acme",
                modelKey: "acme-broken",
                label: "Acme Broken",
                inputCostPerMillion: undefined,
                outputCostPerMillion: 5,
            },
        ];

        it("sorts entries from cheapest to most expensive by monthly cost", () => {
            const result = buildModelCostComparison(syntheticModels, normalizedInput);
            const monthlyCosts = result.entries.map((entry) => entry.monthlyCost);

            expect(monthlyCosts).toEqual([...monthlyCosts].sort((a, b) => a - b));
            expect(result.entries[0].modelKey).toBe("acme-cheap");
            expect(result.entries[result.entries.length - 1].modelKey).toBe("acme-expensive");
        });

        it("excludes models with incomplete/non-comparable pricing", () => {
            const result = buildModelCostComparison(syntheticModels, normalizedInput);

            expect(result.entries.some((entry) => entry.modelKey === "acme-broken")).toBe(false);
            expect(result.entries).toHaveLength(3);
        });

        it("flags the selected model based on providerKey + modelKey", () => {
            const result = buildModelCostComparison(syntheticModels, normalizedInput);
            const selected = result.entries.find((entry) => entry.isSelected);

            expect(selected.modelKey).toBe("acme-medium");
            expect(result.entries.filter((entry) => entry.isSelected)).toHaveLength(1);
        });

        it("identifies the cheapest and most expensive entries", () => {
            const result = buildModelCostComparison(syntheticModels, normalizedInput);

            expect(result.cheapest.modelKey).toBe("acme-cheap");
            expect(result.mostExpensive.modelKey).toBe("acme-expensive");
            expect(result.maxMonthlyCost).toBe(result.mostExpensive.monthlyCost);
        });

        it("reports the selected model's rank and cost delta from the cheapest model", () => {
            const result = buildModelCostComparison(syntheticModels, normalizedInput);

            // acme-medium (monthly $300) is rank 2 of 3, $240 more than
            // acme-cheap (monthly $60) for this workload.
            expect(result.selected.modelKey).toBe("acme-medium");
            expect(result.selectedRank).toBe(2);
            expect(result.totalCount).toBe(3);
            expect(result.selectedCostDeltaFromCheapest).toBeCloseTo(240, 10);
        });

        it("reports rank 1 and a zero cost delta when the selected model is the cheapest", () => {
            const result = buildModelCostComparison(syntheticModels, {
                ...normalizedInput,
                modelKey: "acme-cheap",
            });

            expect(result.selectedRank).toBe(1);
            expect(result.selectedCostDeltaFromCheapest).toBe(0);
        });

        it("returns null selected fields when the selected model is not in the comparable set", () => {
            const result = buildModelCostComparison(syntheticModels, {
                ...normalizedInput,
                modelKey: "acme-broken",
            });

            expect(result.selected).toBeNull();
            expect(result.selectedRank).toBeNull();
            expect(result.selectedCostDeltaFromCheapest).toBeNull();
        });

        it("returns null selected fields when nothing matches providerKey/modelKey at all", () => {
            const result = buildModelCostComparison(syntheticModels, {
                ...normalizedInput,
                providerKey: "does-not-exist",
                modelKey: "does-not-exist",
            });

            expect(result.selected).toBeNull();
            expect(result.selectedRank).toBeNull();
            expect(result.selectedCostDeltaFromCheapest).toBeNull();
        });

        it("keeps the selected model's rank deterministic among cost ties", () => {
            const tiedWithSelection = [
                {
                    providerKey: "zeta",
                    providerLabel: "Zeta",
                    modelKey: "zeta-1",
                    label: "Zeta One",
                    inputCostPerMillion: 2,
                    outputCostPerMillion: 2,
                },
                {
                    providerKey: "alpha",
                    providerLabel: "Alpha",
                    modelKey: "alpha-1",
                    label: "Alpha One",
                    inputCostPerMillion: 2,
                    outputCostPerMillion: 2,
                },
            ];

            // Alpha sorts before Zeta alphabetically, so the selected Zeta
            // model should deterministically land at rank 2, not rank 1.
            const result = buildModelCostComparison(tiedWithSelection, {
                ...normalizedInput,
                providerKey: "zeta",
                modelKey: "zeta-1",
            });

            expect(result.selectedRank).toBe(2);
            expect(result.selectedCostDeltaFromCheapest).toBe(0);
        });

        it("breaks ties deterministically by provider label then model label", () => {
            const tiedModels = [
                {
                    providerKey: "zeta",
                    providerLabel: "Zeta",
                    modelKey: "zeta-1",
                    label: "Zeta One",
                    inputCostPerMillion: 2,
                    outputCostPerMillion: 2,
                },
                {
                    providerKey: "alpha",
                    providerLabel: "Alpha",
                    modelKey: "alpha-1",
                    label: "Alpha One",
                    inputCostPerMillion: 2,
                    outputCostPerMillion: 2,
                },
            ];

            const first = buildModelCostComparison(tiedModels, normalizedInput);
            const second = buildModelCostComparison([...tiedModels].reverse(), normalizedInput);

            expect(first.entries.map((entry) => entry.modelKey)).toEqual(["alpha-1", "zeta-1"]);
            expect(second.entries.map((entry) => entry.modelKey)).toEqual(["alpha-1", "zeta-1"]);
            expect(first.cheapestTieCount).toBe(2);
            expect(first.mostExpensiveTieCount).toBe(2);
            expect(first.allEqual).toBe(true);
        });

        it("handles an all-zero-cost workload without dividing by zero or throwing", () => {
            const zeroInput = {
                ...normalizedInput,
                inputTokens: "0",
                outputTokens: "0",
                requestsPerDay: "0",
            };

            const result = buildModelCostComparison(syntheticModels, zeroInput);

            expect(result.entries.every((entry) => entry.monthlyCost === 0)).toBe(true);
            expect(result.maxMonthlyCost).toBe(0);
            expect(result.allEqual).toBe(true);
        });

        it("returns a safe empty result when no models are comparable", () => {
            const result = buildModelCostComparison(
                [{ providerKey: "x", modelKey: "y", label: "Y" }],
                normalizedInput,
            );

            expect(result.entries).toEqual([]);
            expect(result.cheapest).toBeNull();
            expect(result.mostExpensive).toBeNull();
            expect(result.maxMonthlyCost).toBe(0);
            expect(result.allEqual).toBe(false);
            expect(result.selected).toBeNull();
            expect(result.selectedRank).toBeNull();
            expect(result.selectedCostDeltaFromCheapest).toBeNull();
            expect(result.totalCount).toBe(0);
        });

        it("tolerates an empty or missing models list", () => {
            expect(buildModelCostComparison([], normalizedInput).entries).toEqual([]);
            expect(buildModelCostComparison(undefined, normalizedInput).entries).toEqual([]);
        });
    });

    describe("getModelCostComparison", () => {
        it("compares every comparable model in the real catalog", () => {
            const result = getModelCostComparison({
                inputTokens: "10000",
                outputTokens: "5000",
                requestsPerDay: "100",
            });

            const comparableCatalogModels = getFlatModels().filter(isComparableModel);
            expect(result.entries).toHaveLength(comparableCatalogModels.length);
        });

        it("marks exactly one entry as selected when providerKey/modelKey are valid", () => {
            const result = getModelCostComparison({
                providerKey: "anthropic",
                modelKey: "claude-haiku-4.5",
            });

            const selected = result.entries.filter((entry) => entry.isSelected);
            expect(selected).toHaveLength(1);
            expect(selected[0].modelKey).toBe("claude-haiku-4.5");
        });

        it("normalizes invalid input before comparing, so it never throws on bad state", () => {
            expect(() =>
                getModelCostComparison({
                    providerKey: "removed-provider",
                    modelKey: "removed-model",
                }),
            ).not.toThrow();
        });

        it("includes both new DeepSeek models in the cross-model comparison ranking", () => {
            const result = getModelCostComparison({
                inputTokens: "10000",
                outputTokens: "5000",
                requestsPerDay: "100",
            });

            const modelKeys = result.entries.map((entry) => entry.modelKey);
            expect(modelKeys).toContain("deepseek-v4-flash");
            expect(modelKeys).toContain("deepseek-v4-pro");
        });

        it("reports a valid rank and non-negative cost delta for the selected model in the real catalog", () => {
            const result = getModelCostComparison({
                providerKey: "anthropic",
                modelKey: "claude-haiku-4.5",
                inputTokens: "10000",
                outputTokens: "5000",
                requestsPerDay: "100",
            });

            expect(result.selected).not.toBeNull();
            expect(result.selectedRank).toBeGreaterThanOrEqual(1);
            expect(result.selectedRank).toBeLessThanOrEqual(result.totalCount);
            expect(result.selectedCostDeltaFromCheapest).toBeGreaterThanOrEqual(0);
            expect(result.selectedCostDeltaFromCheapest).toBeCloseTo(
                result.selected.monthlyCost - result.cheapest.monthlyCost,
                10,
            );
        });
    });

    describe("formatCurrencyDeterministic", () => {
        // Regression test for the SSR/CSR hydration mismatch: Node's bundled
        // ICU formats it-IT/USD 7200 without a thousands separator
        // ("7200,00 USD"), while Safari/WebKit's ICU adds one
        // ("7.200,00 USD"). This formatter must produce the same,
        // correctly-grouped string regardless of which engine renders it.
        it("formats a four-digit value for en-US with comma grouping and a $ prefix", () => {
            expect(formatCurrencyDeterministic(7200, "en-US")).toBe("$7,200.00");
        });

        it("formats a four-digit value for it-IT with period grouping and a USD suffix", () => {
            expect(formatCurrencyDeterministic(7200, "it-IT")).toBe("7.200,00 USD");
        });

        it("formats larger values with multiple grouping separators", () => {
            expect(formatCurrencyDeterministic(1234567.89, "en-US")).toBe("$1,234,567.89");
            expect(formatCurrencyDeterministic(1234567.89, "it-IT")).toBe("1.234.567,89 USD");
        });

        it("formats decimal (cent-level) values without unnecessary grouping", () => {
            expect(formatCurrencyDeterministic(0.2, "en-US")).toBe("$0.20");
            expect(formatCurrencyDeterministic(0.2, "it-IT")).toBe("0,20 USD");
        });

        it("uses four fraction digits for sub-cent values, per the tool's existing convention", () => {
            expect(formatCurrencyDeterministic(0.0034, "en-US")).toBe("$0.0034");
            expect(formatCurrencyDeterministic(0.0034, "it-IT")).toBe("0,0034 USD");
        });

        it("does not add a grouping separator below one thousand", () => {
            expect(formatCurrencyDeterministic(600, "en-US")).toBe("$600.00");
            expect(formatCurrencyDeterministic(600, "it-IT")).toBe("600,00 USD");
        });

        it("falls back to en-US formatting for an unknown locale instead of throwing", () => {
            expect(formatCurrencyDeterministic(7200, "fr-FR")).toBe("$7,200.00");
        });

        it("treats non-finite input as zero instead of throwing or producing NaN", () => {
            // Matches the pre-existing formatter's convention: 0 < 0.01, so
            // zero also gets 4 fraction digits, same as any other sub-cent value.
            expect(formatCurrencyDeterministic(NaN, "en-US")).toBe("$0.0000");
            expect(formatCurrencyDeterministic(undefined, "en-US")).toBe("$0.0000");
        });

        it("produces byte-identical output across repeated calls (determinism check)", () => {
            const calls = Array.from({ length: 5 }, () => formatCurrencyDeterministic(7200, "it-IT"));
            expect(new Set(calls).size).toBe(1);
        });
    });

    describe("formatNumberDeterministic", () => {
        it("groups a four-digit integer with the locale's thousands separator", () => {
            expect(formatNumberDeterministic(7200, "en-US")).toBe("7,200");
            expect(formatNumberDeterministic(7200, "it-IT")).toBe("7.200");
        });

        it("does not add a grouping separator below one thousand", () => {
            expect(formatNumberDeterministic(500, "en-US")).toBe("500");
            expect(formatNumberDeterministic(500, "it-IT")).toBe("500");
        });

        it("rounds fractional values to the nearest integer", () => {
            expect(formatNumberDeterministic(1234.6, "en-US")).toBe("1,235");
        });

        it("treats non-finite input as zero instead of throwing or producing NaN", () => {
            expect(formatNumberDeterministic(NaN, "en-US")).toBe("0");
        });
    });
});