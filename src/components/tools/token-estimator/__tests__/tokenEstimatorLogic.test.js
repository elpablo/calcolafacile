import { describe, expect, it } from "vitest";
import {
    MODELS,
    getDefaultModelKey,
    normalizeModelKey,
    normalizeTokenEstimatorState,
    resolveModel,
} from "../tokenEstimatorLogic";

const REMOVED_LEGACY_MODEL_KEY = "gpt-4o-mini";
const VALID_SAMPLE = { modelKey: "gpt-5.6-luna", estimatedOutputTokens: "500" };

describe("tokenEstimatorLogic", () => {
    describe("getDefaultModelKey", () => {
        it("returns a key that exists in the model catalog", () => {
            const defaultKey = getDefaultModelKey();
            expect(typeof defaultKey).toBe("string");
            expect(MODELS).toHaveProperty(defaultKey);
        });
    });

    describe("normalizeModelKey", () => {
        it("keeps a valid model key untouched", () => {
            expect(normalizeModelKey("claude-opus-5")).toBe("claude-opus-5");
        });

        it("falls back to the default key for a removed/unknown key", () => {
            expect(normalizeModelKey(REMOVED_LEGACY_MODEL_KEY)).toBe(getDefaultModelKey());
        });

        it("falls back to the default key for null, undefined and non-string values", () => {
            expect(normalizeModelKey(null)).toBe(getDefaultModelKey());
            expect(normalizeModelKey(undefined)).toBe(getDefaultModelKey());
            expect(normalizeModelKey(42)).toBe(getDefaultModelKey());
        });

        it("uses a supplied fallback key when the primary key is invalid", () => {
            expect(normalizeModelKey(REMOVED_LEGACY_MODEL_KEY, "claude-haiku-4.5")).toBe(
                "claude-haiku-4.5",
            );
        });
    });

    describe("resolveModel", () => {
        it("never returns undefined, even for a removed model key", () => {
            expect(resolveModel(REMOVED_LEGACY_MODEL_KEY)).toBeDefined();
            expect(resolveModel(REMOVED_LEGACY_MODEL_KEY)).toEqual(MODELS[getDefaultModelKey()]);
        });

        it("returns the matching model for a valid key", () => {
            expect(resolveModel("gpt-5.6-terra")).toEqual(MODELS["gpt-5.6-terra"]);
        });
    });

    describe("normalizeTokenEstimatorState", () => {
        it("keeps a valid persisted modelKey selected", () => {
            const state = normalizeTokenEstimatorState(
                { text: "hello", modelKey: "claude-opus-5", estimatedOutputTokens: "123" },
                VALID_SAMPLE,
            );
            expect(state).toEqual({
                text: "hello",
                modelKey: "claude-opus-5",
                estimatedOutputTokens: "123",
            });
        });

        it("falls back to the sample modelKey when the persisted key was removed from the catalog", () => {
            const state = normalizeTokenEstimatorState(
                { text: "hello", modelKey: REMOVED_LEGACY_MODEL_KEY, estimatedOutputTokens: "123" },
                VALID_SAMPLE,
            );
            expect(state.modelKey).toBe(VALID_SAMPLE.modelKey);
            expect(MODELS).toHaveProperty(state.modelKey);
        });

        it("never returns a modelKey outside of the catalog, even if the sample modelKey is also invalid", () => {
            const state = normalizeTokenEstimatorState(
                { modelKey: REMOVED_LEGACY_MODEL_KEY },
                { modelKey: REMOVED_LEGACY_MODEL_KEY, estimatedOutputTokens: "500" },
            );
            expect(MODELS).toHaveProperty(state.modelKey);
        });

        it("defaults text to an empty string and estimatedOutputTokens to the sample when nothing is stored", () => {
            const state = normalizeTokenEstimatorState({}, VALID_SAMPLE);
            expect(state).toEqual({
                text: "",
                modelKey: VALID_SAMPLE.modelKey,
                estimatedOutputTokens: VALID_SAMPLE.estimatedOutputTokens,
            });
        });

        it("tolerates a null/undefined stored value", () => {
            expect(normalizeTokenEstimatorState(null, VALID_SAMPLE).modelKey).toBe(
                VALID_SAMPLE.modelKey,
            );
            expect(normalizeTokenEstimatorState(undefined, VALID_SAMPLE).modelKey).toBe(
                VALID_SAMPLE.modelKey,
            );
        });
    });
});
