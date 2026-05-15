export const AI_MODEL_PROVIDERS = {
    openai: {
        label: "OpenAI",
        models: {
            "gpt-5.5": {
                label: "GPT-5.5",
                inputCostPerMillion: 5,
                outputCostPerMillion: 30,
            },
            "gpt-5.4": {
                label: "GPT-5.4",
                inputCostPerMillion: 2.5,
                outputCostPerMillion: 15,
            },
            "gpt-5.4-mini": {
                label: "GPT-5.4 Mini",
                inputCostPerMillion: 0.25,
                outputCostPerMillion: 2,
            },
            "gpt-4.1": {
                label: "GPT-4.1",
                inputCostPerMillion: 2,
                outputCostPerMillion: 8,
            },
            "gpt-4o": {
                label: "GPT-4o",
                inputCostPerMillion: 2.5,
                outputCostPerMillion: 10,
            },
            "gpt-4o-mini": {
                label: "GPT-4o Mini",
                inputCostPerMillion: 0.15,
                outputCostPerMillion: 0.6,
            },
        },
    },
    anthropic: {
        label: "Anthropic",
        models: {
            "claude-opus-4.7": {
                label: "Claude Opus 4.7",
                inputCostPerMillion: 5,
                outputCostPerMillion: 25,
            },
            "claude-opus-4.6": {
                label: "Claude Opus 4.6",
                inputCostPerMillion: 5,
                outputCostPerMillion: 25,
            },
            "claude-sonnet-4.6": {
                label: "Claude Sonnet 4.6",
                inputCostPerMillion: 3,
                outputCostPerMillion: 15,
            },
            "claude-sonnet-4": {
                label: "Claude Sonnet 4",
                inputCostPerMillion: 3,
                outputCostPerMillion: 15,
            },
            "claude-haiku-4.5": {
                label: "Claude Haiku 4.5",
                inputCostPerMillion: 1,
                outputCostPerMillion: 5,
            },
        },
    },
    google: {
        label: "Google",
        models: {
            "gemini-2.5-pro": {
                label: "Gemini 2.5 Pro",
                inputCostPerMillion: 1.25,
                outputCostPerMillion: 10,
            },
        },
    },
};

export function getProviderKeys() {
    return Object.keys(AI_MODEL_PROVIDERS);
}

export function getProvider(providerKey) {
    return AI_MODEL_PROVIDERS[providerKey] ?? AI_MODEL_PROVIDERS.openai;
}

export function getProviderModelKeys(providerKey) {
    return Object.keys(getProvider(providerKey).models);
}

export function getFirstProviderKey() {
    return getProviderKeys()[0];
}

export function getFirstModelKey(providerKey) {
    return getProviderModelKeys(providerKey)[0];
}

export function getModel(providerKey, modelKey) {
    const provider = getProvider(providerKey);

    return provider.models[modelKey] ?? provider.models[getFirstModelKey(providerKey)];
}

export function getFlatModels() {
    return Object.entries(AI_MODEL_PROVIDERS).flatMap(([providerKey, provider]) =>
        Object.entries(provider.models).map(([modelKey, model]) => ({
            providerKey,
            providerLabel: provider.label,
            modelKey,
            ...model,
        })),
    );
}
