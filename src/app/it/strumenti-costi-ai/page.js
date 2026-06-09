import StrumentiCostiAiHub from "./StrumentiCostiAiHub";

export const metadata = {
    title: "Strumenti Costi AI | Calcolatori Gratuiti per Costi API LLM e Token",
    description:
        "Strumenti gratuiti per stimare i costi delle API AI, contare token e confrontare prezzi tra modelli OpenAI, Anthropic e Google. Pianifica il budget AI prima di andare in produzione.",
    alternates: {
        canonical: "https://calcolafacile.org/it/strumenti-costi-ai",
        languages: {
            it: "https://calcolafacile.org/it/strumenti-costi-ai",
            en: "https://calcolafacile.org/en/ai-cost-tools",
        },
    },
};

export default function StrumentiCostiAiPage() {
    return <StrumentiCostiAiHub />;
}
