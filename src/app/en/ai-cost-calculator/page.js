

import AiCostCalculator from "./AiCostCalculator";

export const metadata = {
    title: "AI Cost Calculator | Estimate LLM API Costs for GPT, Claude & Gemini",
    description:
        "Free AI cost calculator to estimate OpenAI, Anthropic and Google API costs. Calculate cost per request, daily and monthly spend based on input tokens, output tokens and usage volume.",
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