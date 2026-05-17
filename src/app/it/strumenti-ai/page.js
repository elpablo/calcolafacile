import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Strumenti AI gratuiti per token, costi API e workflow LLM",
    description:
        "Strumenti AI gratuiti per stimare token, costi API e utilizzo di modelli LLM direttamente nel browser.",
    alternates: {
        canonical: "https://calcolafacile.org/it/strumenti-ai",
        languages: {
            it: "https://calcolafacile.org/it/strumenti-ai",
            en: "https://calcolafacile.org/en/ai-tools",
        },
    },
};

export default function AiToolsPage() {
    return (
        <CategoryPageLayout
            lang="it"
            category="ai"
            eyebrow="Strumenti AI"
            title="Strumenti AI gratuiti per token e costi API"
            description={
                <p>
                    Stima token, confronta costi API AI e pianifica workflow basati
                    su modelli LLM direttamente nel browser. Questi strumenti sono
                    utili per sviluppatori, startup e team che lavorano con OpenAI,
                    Anthropic, Gemini e altri modelli AI.
                </p>
            }
            toolsTitle="Strumenti AI disponibili"
            seoTitle="Perché stimare token e costi AI?"
            seoText={
                <p>
                    Le applicazioni basate su LLM possono diventare costose molto
                    rapidamente quando aumentano prompt, output e numero di richieste.
                    Stimare token e costi API prima di pubblicare una funzionalità
                    aiuta a scegliere il modello corretto, definire pricing più
                    realistici ed evitare sorprese in produzione.
                </p>
            }
        />
    );
}