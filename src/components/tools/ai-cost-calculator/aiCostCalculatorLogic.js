import { calculateAiCosts as calculateAiCostsBase } from "@/lib/aiCostCalculator";
import {
    getFirstModelKey,
    getFirstProviderKey,
    getFlatModels,
    getProvider,
    getProviderKeys,
    getProviderModelKeys,
} from "@/config/aiModels";

// Only en-US and it-IT are used by this tool's locale files today. USD is
// the only currency ever passed in, so the symbol is fixed per locale
// rather than derived from the currency code.
const CURRENCY_FORMAT_BY_LOCALE = {
    "en-US": { thousands: ",", decimal: ".", symbol: "$", symbolPosition: "prefix" },
    "it-IT": { thousands: ".", decimal: ",", symbol: "USD", symbolPosition: "suffix" },
};

const NUMBER_FORMAT_BY_LOCALE = {
    "en-US": { thousands: "," },
    "it-IT": { thousands: "." },
};

function groupThousands(digits, separator) {
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * Deterministic currency formatter for en-US/it-IT USD values, shared by
 * server and client rendering.
 *
 * Intl.NumberFormat's thousands-grouping rules for a given locale come from
 * the runtime's bundled ICU data, and that data is not guaranteed to match
 * between Node.js (SSR) and a browser's JS engine (CSR). Observed example:
 * for it-IT/USD, Node (ICU 77) formats 7200 as "7200,00 USD" (no grouping
 * separator) while Safari/WebKit formats the same input as "7.200,00 USD"
 * (with one). Server- and client-rendered markup then disagree, which React
 * reports as a hydration mismatch. This formatter builds the string by hand
 * — fixed decimal digits, then manual thousands grouping — instead of
 * delegating to Intl, so the output is identical on every engine.
 */
export function formatCurrencyDeterministic(value, locale, currency = "USD") {
    const numericValue = Number.isFinite(value) ? value : 0;
    const format = CURRENCY_FORMAT_BY_LOCALE[locale] ?? CURRENCY_FORMAT_BY_LOCALE["en-US"];
    // Matches the tool's existing convention of showing extra precision for
    // sub-cent amounts (e.g. per-token costs) instead of rounding to $0.00.
    const fractionDigits = numericValue < 0.01 ? 4 : 2;
    const isNegative = numericValue < 0;
    const [integerPart, fractionPart] = Math.abs(numericValue).toFixed(fractionDigits).split(".");
    const numberString = `${groupThousands(integerPart, format.thousands)}${format.decimal}${fractionPart}`;
    const sign = isNegative ? "-" : "";
    const symbol = currency === "USD" ? format.symbol : currency;

    return format.symbolPosition === "prefix"
        ? `${sign}${symbol}${numberString}`
        : `${sign}${numberString} ${symbol}`;
}

/**
 * Deterministic integer/grouped-number formatter, for the same
 * cross-engine-ICU reason as formatCurrencyDeterministic above.
 */
export function formatNumberDeterministic(value, locale) {
    const numericValue = Number.isFinite(value) ? value : 0;
    const format = NUMBER_FORMAT_BY_LOCALE[locale] ?? NUMBER_FORMAT_BY_LOCALE["en-US"];
    const isNegative = numericValue < 0;
    const integerPart = Math.round(Math.abs(numericValue)).toString();
    const sign = isNegative ? "-" : "";

    return `${sign}${groupThousands(integerPart, format.thousands)}`;
}

// Explicit, currently-supported defaults per provider. These intentionally
// match the catalog's current first entry so the golden-path UX is
// unchanged, but they no longer depend on Object.keys/registry ordering:
// if a provider is reordered or these exact keys are ever removed from the
// catalog, getDefaultModelKeyForProvider() degrades to the first remaining
// model for that provider instead of crashing or silently misselecting.
const DEFAULT_PROVIDER_KEY = "openai";

const PROVIDER_DEFAULT_MODEL_KEYS = {
    openai: "gpt-5.6-sol",
    anthropic: "claude-fable-5",
    google: "gemini-3.5-flash",
    xai: "grok-4.5",
    deepseek: "deepseek-v4-pro",
    mistral: "mistral-medium-3.5",
};

export function getDefaultProviderKey() {
    return getProviderKeys().includes(DEFAULT_PROVIDER_KEY)
        ? DEFAULT_PROVIDER_KEY
        : getFirstProviderKey();
}

export function getDefaultModelKeyForProvider(providerKey) {
    const explicitDefault = PROVIDER_DEFAULT_MODEL_KEYS[providerKey];
    const providerModelKeys = getProviderModelKeys(providerKey);

    return providerModelKeys.includes(explicitDefault)
        ? explicitDefault
        : getFirstModelKey(providerKey);
}

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
    const providerKey = getDefaultProviderKey();
    const modelKey = getDefaultModelKeyForProvider(providerKey);

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
    // A modelKey persisted under a previous provider, or removed from the
    // catalog entirely, will not appear in this provider's own model list,
    // so it correctly falls through to this provider's explicit default.
    const modelKey =
        typeof input.modelKey === "string" && providerModelKeys.includes(input.modelKey)
            ? input.modelKey
            : getDefaultModelKeyForProvider(providerKey);

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

// A model is only included in the cross-model comparison when both prices
// are present, finite, non-negative numbers. Models with missing or
// malformed pricing are excluded from the comparison entirely rather than
// treated as free (0) or shown as a misleading "N/A" row, since either
// would distort the cheapest/most-expensive ranking.
export function isComparableModel(model) {
    return Boolean(
        model &&
            Number.isFinite(model.inputCostPerMillion) &&
            model.inputCostPerMillion >= 0 &&
            Number.isFinite(model.outputCostPerMillion) &&
            model.outputCostPerMillion >= 0,
    );
}

// Deterministic ordering: primarily by monthly cost, then by provider label
// and model label as tie-breakers. This keeps equal-cost models (including
// the all-zero-cost case, e.g. before the user enters any usage) in a
// stable, reproducible order instead of relying on catalog/object iteration
// order.
function compareComparisonEntries(a, b) {
    if (a.monthlyCost !== b.monthlyCost) {
        return a.monthlyCost - b.monthlyCost;
    }
    if (a.providerLabel !== b.providerLabel) {
        return a.providerLabel.localeCompare(b.providerLabel);
    }
    return a.label.localeCompare(b.label);
}

/**
 * Pure comparison builder over an arbitrary list of flat model entries
 * (same shape as getFlatModels()). Kept separate from getModelCostComparison
 * so tests can exercise sorting/ties/incomplete-pricing behavior with
 * synthetic catalogs, without depending on the real AI model registry.
 */
export function buildModelCostComparison(models, normalizedInput) {
    const entries = (models ?? [])
        .filter(isComparableModel)
        .map((model) => {
            const calculations = calculateAiCostsBase({
                inputTokens: normalizedInput.inputTokens,
                outputTokens: normalizedInput.outputTokens,
                requestsPerDay: normalizedInput.requestsPerDay,
                model,
            });

            return {
                providerKey: model.providerKey,
                providerLabel: model.providerLabel,
                modelKey: model.modelKey,
                label: model.label,
                isSelected:
                    model.providerKey === normalizedInput.providerKey &&
                    model.modelKey === normalizedInput.modelKey,
                ...calculations,
            };
        })
        .sort(compareComparisonEntries);

    if (entries.length === 0) {
        return {
            entries: [],
            cheapest: null,
            cheapestTieCount: 0,
            mostExpensive: null,
            mostExpensiveTieCount: 0,
            maxMonthlyCost: 0,
            allEqual: false,
            selected: null,
            selectedRank: null,
            selectedCostDeltaFromCheapest: null,
            totalCount: 0,
        };
    }

    const cheapest = entries[0];
    const mostExpensive = entries[entries.length - 1];
    // entries is already deterministically sorted/tie-broken, so the index
    // found here (and thus the rank derived from it) is deterministic too.
    const selectedIndex = entries.findIndex((entry) => entry.isSelected);
    const selected = selectedIndex === -1 ? null : entries[selectedIndex];

    return {
        entries,
        cheapest,
        cheapestTieCount: entries.filter((entry) => entry.monthlyCost === cheapest.monthlyCost)
            .length,
        mostExpensive,
        mostExpensiveTieCount: entries.filter(
            (entry) => entry.monthlyCost === mostExpensive.monthlyCost,
        ).length,
        maxMonthlyCost: mostExpensive.monthlyCost,
        allEqual: cheapest.monthlyCost === mostExpensive.monthlyCost,
        selected,
        selectedRank: selected ? selectedIndex + 1 : null,
        selectedCostDeltaFromCheapest: selected ? selected.monthlyCost - cheapest.monthlyCost : null,
        totalCount: entries.length,
    };
}

export function getModelCostComparison(input = {}) {
    const normalized = normalizeAiCostInput(input);

    return {
        input: normalized,
        ...buildModelCostComparison(getFlatModels(), normalized),
    };
}