import { describe, expect, it } from "vitest";
import { getFlatModels, getModel, getProviderModelKeys } from "../aiModels";

describe("aiModels DeepSeek catalog", () => {
    it("includes DeepSeek V4 Flash with official cache-miss pricing", () => {
        const model = getModel("deepseek", "deepseek-v4-flash");
        expect(model).toEqual({
            label: "DeepSeek V4 Flash",
            inputCostPerMillion: 0.14,
            outputCostPerMillion: 0.28,
        });
    });

    it("includes DeepSeek V4 Pro with official cache-miss pricing", () => {
        const model = getModel("deepseek", "deepseek-v4-pro");
        expect(model).toEqual({
            label: "DeepSeek V4 Pro",
            inputCostPerMillion: 0.435,
            outputCostPerMillion: 0.87,
        });
    });

    it("exposes both new DeepSeek models in the flat catalog used for comparisons", () => {
        const flat = getFlatModels();
        const flashEntry = flat.find((entry) => entry.modelKey === "deepseek-v4-flash");
        const proEntry = flat.find((entry) => entry.modelKey === "deepseek-v4-pro");

        expect(flashEntry).toEqual(
            expect.objectContaining({ providerKey: "deepseek", providerLabel: "DeepSeek" }),
        );
        expect(proEntry).toEqual(
            expect.objectContaining({ providerKey: "deepseek", providerLabel: "DeepSeek" }),
        );
    });

    it("keeps pre-existing DeepSeek entries untouched (legacy variants, not aliases of the new models)", () => {
        const deepseekKeys = getProviderModelKeys("deepseek");
        expect(deepseekKeys).toEqual(
            expect.arrayContaining(["deepseek-v4-pro", "deepseek-v4-flash", "deepseek-v4", "deepseek-v3.2", "deepseek-r1"]),
        );
    });
});
