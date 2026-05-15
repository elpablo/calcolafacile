

import AiCostCalculator from "./AiCostCalculator";

export const metadata = {
    title: "AI Cost Calculator | CalcolaFacile",
    description:
        "Estimate LLM API costs for OpenAI, Anthropic and Google models based on input tokens, output tokens and daily usage.",
    alternates: {
        canonical: "https://calcolafacile.org/en/ai-cost-calculator",
        languages: {
            en: "https://calcolafacile.org/en/ai-cost-calculator",
            it: "https://calcolafacile.org/it/calcolatore-costi-ai",
        },
    },
};

export default function Page() {
    return <AiCostCalculator />;
}