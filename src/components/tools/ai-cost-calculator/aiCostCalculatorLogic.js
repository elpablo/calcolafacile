import { calculateAiCosts as calculateAiCostsBase } from "@/lib/aiCostCalculator";
import {
    getFirstModelKey,
    getFirstProviderKey,
    getProvider,
    getProviderKeys,
    getProviderModelKeys,
} from "@/config/aiModels";

export const AI_COST_USE_CASE_PRESETS = [
    {
        key: "support-chatbot",
        label: {
            it: "Chatbot supporto clienti",
            en: "Customer support chatbot",
        },
        description: {
            it: "Conversazioni brevi, risposta rapida e volume medio.",
            en: "Short conversations, fast replies and medium volume.",
        },
        inputTokens: "3000",
        outputTokens: "1200",
        requestsPerDay: "500",
    },
    {
        key: "rag-search",
        label: {
            it: "RAG / ricerca documentale",
            en: "RAG search system",
        },
        description: {
            it: "Contesto ampio da documenti e risposta sintetica.",
            en: "Large retrieved context with concise answers.",
        },
        inputTokens: "12000",
        outputTokens: "1800",
        requestsPerDay: "250",
    },
    {
        key: "coding-assistant",
        label: {
            it: "Assistente coding AI",
            en: "AI coding assistant",
        },
        description: {
            it: "Prompt lunghi, codice in output e uso frequente.",
            en: "Long prompts, code output and frequent usage.",
        },
        inputTokens: "10000",
        outputTokens: "5000",
        requestsPerDay: "150",
    },
    {
        key: "agentic-workflow",
        label: {
            it: "Agente AI / workflow agentico",
            en: "AI agent workflow",
        },
        description: {
            it: "Più step per task, tool calling e contesto ricorrente.",
            en: "Multiple task steps, tool calling and recurring context.",
        },
        inputTokens: "25000",
        outputTokens: "9000",
        requestsPerDay: "300",
    },
    {
        key: "content-generation",
        label: {
            it: "Generazione contenuti",
            en: "Content generation",
        },
        description: {
            it: "Output più lunghi per articoli, email e testi marketing.",
            en: "Longer outputs for articles, emails and marketing copy.",
        },
        inputTokens: "2500",
        outputTokens: "3500",
        requestsPerDay: "200",
    },
];

export function getDefaultAiCostInput() {
    const providerKey = getFirstProviderKey();
    const modelKey = getFirstModelKey(providerKey);

    return {
        providerKey,
        modelKey,
        inputTokens: "10000",
        outputTokens: "5000",
        requestsPerDay: "100",
        activePresetKey: null,
    };
}

export function normalizeAiCostInput(input = {}) {
    const fallback = getDefaultAiCostInput();
    const providerKeys = getProviderKeys();
    const providerKey = providerKeys.includes(input.providerKey)
        ? input.providerKey
        : fallback.providerKey;
    const providerModelKeys = getProviderModelKeys(providerKey);
    const modelKey = providerModelKeys.includes(input.modelKey)
        ? input.modelKey
        : getFirstModelKey(providerKey);

    return {
        providerKey,
        modelKey,
        inputTokens: String(input.inputTokens ?? fallback.inputTokens),
        outputTokens: String(input.outputTokens ?? fallback.outputTokens),
        requestsPerDay: String(input.requestsPerDay ?? fallback.requestsPerDay),
        activePresetKey: input.activePresetKey ?? null,
    };
}

export function getAiCostPreset(presetKey) {
    return AI_COST_USE_CASE_PRESETS.find((preset) => preset.key === presetKey);
}

export function applyAiCostPreset(input = {}, presetKey) {
    const preset = getAiCostPreset(presetKey);

    if (!preset) {
        return normalizeAiCostInput(input);
    }

    return normalizeAiCostInput({
        ...input,
        inputTokens: preset.inputTokens,
        outputTokens: preset.outputTokens,
        requestsPerDay: preset.requestsPerDay,
        activePresetKey: preset.key,
    });
}

export function calculateAiCostEstimate(input = {}) {
    const normalized = normalizeAiCostInput(input);
    const provider = getProvider(normalized.providerKey);
    const model = provider.models[normalized.modelKey];
    const calculations = calculateAiCostsBase({
        inputTokens: normalized.inputTokens,
        outputTokens: normalized.outputTokens,
        requestsPerDay: normalized.requestsPerDay,
        model,
    });

    return {
        input: normalized,
        provider,
        model,
        calculations: {
            ...calculations,
            annualCost: calculations.monthlyCost * 12,
        },
    };
}