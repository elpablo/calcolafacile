

import AiCostCalculator from "./AiCostCalculator";

export const metadata = {
    title: "Calcolatore costi AI | CalcolaFacile",
    description:
        "Stima i costi API dei modelli AI di OpenAI, Anthropic e Google in base a token di input, token di output e richieste giornaliere.",
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