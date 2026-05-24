import { describe, expect, it } from "vitest";
import {
    AI_COST_USE_CASE_PRESETS,
    applyAiCostPreset,
    calculateAiCostEstimate,
    getAiCostPreset,
    getDefaultAiCostInput,
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
});