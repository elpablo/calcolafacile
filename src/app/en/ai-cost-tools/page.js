import AiCostToolsHub from "./AiCostToolsHub";

export const metadata = {
    title: "AI Cost Tools | Free LLM API Cost Calculators & Token Estimators",
    description:
        "Free AI cost tools to estimate LLM API spend, count tokens and compare pricing across OpenAI, Anthropic and Google models. Plan your AI budget before shipping to production.",
    alternates: {
        canonical: "https://calcolafacile.org/en/ai-cost-tools",
        languages: {
            en: "https://calcolafacile.org/en/ai-cost-tools",
            it: "https://calcolafacile.org/it/strumenti-costi-ai",
        },
    },
};

export default function AiCostToolsPage() {
    return <AiCostToolsHub />;
}
