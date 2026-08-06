import { getFlatModels } from "@/config/aiModels";

export const MODEL_OPTIONS = getFlatModels();

export const MODELS = Object.fromEntries(
    MODEL_OPTIONS.map((model) => [
        model.modelKey,
        {
            label: model.label,
            providerLabel: model.providerLabel,
            inputPricePerMillion: model.inputCostPerMillion,
            outputPricePerMillion: model.outputCostPerMillion,
        },
    ]),
);

// Explicit, currently-supported default. This only falls back to the first
// catalog entry (whose ordering is not a guaranteed contract) if this exact
// key is ever removed from AI_MODEL_PROVIDERS.
const PREFERRED_DEFAULT_MODEL_KEY = "gpt-5.6-sol";

export function getDefaultModelKey() {
    return PREFERRED_DEFAULT_MODEL_KEY in MODELS
        ? PREFERRED_DEFAULT_MODEL_KEY
        : MODEL_OPTIONS[0]?.modelKey;
}

export function normalizeModelKey(modelKey, fallbackKey = getDefaultModelKey()) {
    return typeof modelKey === "string" && modelKey in MODELS ? modelKey : fallbackKey;
}

export function resolveModel(modelKey) {
    return MODELS[normalizeModelKey(modelKey)];
}

export function normalizeTokenEstimatorState(stored, sample) {
    const safeStored = stored && typeof stored === "object" ? stored : {};
    const safeSample = sample && typeof sample === "object" ? sample : {};
    const sampleModelKey = normalizeModelKey(safeSample.modelKey);

    return {
        text: typeof safeStored.text === "string" ? safeStored.text : "",
        modelKey: normalizeModelKey(safeStored.modelKey, sampleModelKey),
        estimatedOutputTokens:
            typeof safeStored.estimatedOutputTokens === "string"
                ? safeStored.estimatedOutputTokens
                : String(safeSample.estimatedOutputTokens ?? ""),
    };
}
