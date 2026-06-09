

import AiCostCalculator from "./AiCostCalculator";

export const metadata = {
    title: "Calcolatore Costi AI | Stima Costi API per GPT, Claude e Gemini",
    description:
        "Calcolatore gratuito per stimare i costi API di OpenAI, Anthropic e Google. Calcola costo per richiesta, spesa giornaliera e mensile in base a token di input, output e volume di utilizzo.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolatore-costi-ai",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-costi-ai",
            en: "https://calcolafacile.org/en/ai-cost-calculator",
        },
    },
};

export default function Page() {
    return <AiCostCalculator />;
}