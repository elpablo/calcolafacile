export const AI_MODEL_PROVIDERS = {
    openai: {
        label: "OpenAI",
        models: {
            "gpt-5.6-sol": {
                label: "GPT-5.6 Sol",
                inputCostPerMillion: 5,
                outputCostPerMillion: 30,
            },
            "gpt-5.6-terra": {
                label: "GPT-5.6 Terra",
                inputCostPerMillion: 2,
                outputCostPerMillion: 12,
            },
            "gpt-5.6-luna": {
                label: "GPT-5.6 Luna",
                inputCostPerMillion: 0.2,
                outputCostPerMillion: 1.2,
            },
            "gpt-5.5-pro": {
                label: "GPT-5.5 Pro",
                inputCostPerMillion: 30,
                outputCostPerMillion: 180,
            },
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
        },
    },
    anthropic: {
        label: "Anthropic",
        models: {
            "claude-fable-5": {
                label: "Claude Fable 5",
                inputCostPerMillion: 10,
                outputCostPerMillion: 50,
            },
            "claude-mythos-5": {
                label: "Claude Mythos 5",
                inputCostPerMillion: 10,
                outputCostPerMillion: 50,
            },
            "claude-opus-5": {
                label: "Claude Opus 5",
                inputCostPerMillion: 5,
                outputCostPerMillion: 25,
            },
            "claude-opus-4.8": {
                label: "Claude Opus 4.8",
                inputCostPerMillion: 5,
                outputCostPerMillion: 25,
            },
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
            "gemini-3.5-flash": {
                label: "Gemini 3.5 Flash",
                inputCostPerMillion: 0.75,
                outputCostPerMillion: 4.5,
            },
            "gemini-2.5-pro": {
                label: "Gemini 2.5 Pro",
                inputCostPerMillion: 1.25,
                outputCostPerMillion: 10,
            },
        },
    },
    xai: {
        label: "xAI",
        models: {
            "grok-4.5": {
                label: "Grok 4.5",
                inputCostPerMillion: 2.0,
                outputCostPerMillion: 6.0,
            },
            "grok-4.3": {
                label: "Grok 4.3",
                inputCostPerMillion: 1.25,
                outputCostPerMillion: 2.5,
            },
            "grok-build-0.1": {
                label: "Grok Build 0.1",
                inputCostPerMillion: 1,
                outputCostPerMillion: 2,
            },
        },
    },
    deepseek: {
        label: "DeepSeek",
        models: {
            "deepseek-v4-pro": {
                label: "DeepSeek V4 Pro",
                inputCostPerMillion: 0.435,
                outputCostPerMillion: 0.87,
            },
            "deepseek-v4-flash": {
                label: "DeepSeek V4 Flash",
                inputCostPerMillion: 0.14,
                outputCostPerMillion: 0.28,
            },
            "deepseek-v4": {
                label: "DeepSeek V4 Non-Reasoning",
                inputCostPerMillion: 0.09,
                outputCostPerMillion: 0.18,
            },
            "deepseek-v3.2": {
                label: "DeepSeek V3.2",
                inputCostPerMillion: 0.28,
                outputCostPerMillion: 0.42,
            },
            "deepseek-r1": {
                label: "DeepSeek R1",
                inputCostPerMillion: 0.55,
                outputCostPerMillion: 2.19,
            },
        },
    },
    mistral: {
        label: "Mistral",
        models: {
            "mistral-medium-3.5": {
                label: "Mistral Medium 3.5",
                inputCostPerMillion: 1.5,
                outputCostPerMillion: 7.5,
            },
            "mistral-small-2603": {
                label: "Mistral Small 2603",
                inputCostPerMillion: 0.15,
                outputCostPerMillion: 0.6,
            },
            "mistral-small-creative": {
                label: "Mistral Small Creative",
                inputCostPerMillion: 0.1,
                outputCostPerMillion: 0.3,
            },
            "mistral-large-3-2512": {
                label: "Mistral Large 3 2512",
                inputCostPerMillion: 0.5,
                outputCostPerMillion: 1.5,
            },
            "mistral-small-3.2-24b": {
                label: "Mistral Small 3.2 24B",
                inputCostPerMillion: 0.075,
                outputCostPerMillion: 0.2,
            },
            "codestral-2508": {
                label: "Codestral 2508",
                inputCostPerMillion: 0.3,
                outputCostPerMillion: 0.9,
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
