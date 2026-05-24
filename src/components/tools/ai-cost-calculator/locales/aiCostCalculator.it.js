import { aiCostCalculatorExamples } from "../aiCostCalculatorExamples";

function localizeExamples(lang) {
    return aiCostCalculatorExamples.map((example) => ({
        title: example.title[lang],
        description: example.description[lang],
        href: `/it/calcolatore-costi-ai?${new URLSearchParams({
            inputTokens: String(example.params.inputTokens),
            outputTokens: String(example.params.outputTokens),
            requestsPerDay: String(example.params.requestsPerDay),
            preset: example.params.preset,
        }).toString()}`,
    }));
}

const aiCostCalculatorIt = {
    lang: "it",
    currentPath: "/it/calcolatore-costi-ai",
    toolKey: "aiCostCalculator",
    locale: "it-IT",
    currency: "USD",
    metadata: {
        title: "Calcolatore costi AI",
        description:
            "Stima i costi API dei modelli AI di OpenAI, Anthropic e Google in base a token di input, token di output e numero di richieste giornaliere.",
        intro:
            "Usa questo calcolatore dei costi AI per stimare quanto può costare una prompt, una chiamata API o un carico giornaliero di richieste verso modelli LLM. Inserisci token di input, token di output e richieste previste al giorno per calcolare costo per richiesta, costo giornaliero e costo mensile stimato.",
    },
    labels: {
        provider: "Provider",
        model: "Modello",
        inputTokens: "Token di input",
        outputTokens: "Token di output",
        requestsPerDay: "Richieste al giorno",
        results: {
            inputCost: "Costo input",
            outputCost: "Costo output",
            requestCost: "Costo per richiesta",
            dailyCost: "Costo giornaliero",
            monthlyCost: "Costo mensile",
        },
        pricingDisclaimerTitle: "Nota sui prezzi",
        pricingDisclaimer:
            "I prezzi sono indicativi e basati sui listini pubblici per milione di token. I provider AI possono modificare i prezzi, applicare sconti a volume o usare tariffe diverse per token in cache, API batch o fatturazione regionale. Verifica sempre i prezzi aggiornati sul sito ufficiale del provider prima di prendere decisioni di produzione.",
    },
    examples: localizeExamples("it"),
    faq: (
        <>
            <h3 className="mt-4 font-semibold">Come viene calcolato il costo AI?</h3>
            <p>
                Il calcolatore moltiplica i token di input per il prezzo di input del modello
                e i token di output per il prezzo di output, usando il costo per un milione di token.
                Il risultato viene poi moltiplicato per il numero di richieste giornaliere per stimare
                costo giornaliero e costo mensile.
            </p>

            <h3 className="mt-4 font-semibold">I prezzi sono sempre aggiornati?</h3>
            <p>
                No. I prezzi possono cambiare spesso e i provider possono applicare tariffe specifiche
                per token in cache, processi batch, contratti enterprise o fatturazione regionale.
                Considera il risultato come una stima e verifica sempre la pagina ufficiale dei prezzi.
            </p>

            <h3 className="mt-4 font-semibold">Perché input e output hanno prezzi diversi?</h3>
            <p>
                Molti provider LLM applicano prezzi diversi ai token inviati al modello e ai token
                generati dal modello. I token di output sono spesso più costosi perché richiedono lavoro
                di generazione durante l&apos;inferenza.
            </p>

            <h3 className="mt-4 font-semibold">Posso usarlo insieme al Token Estimator?</h3>
            <p>
                Sì. Prima stima quanti token usa una prompt o un testo, poi usa quei valori qui
                per stimare il costo del workload su un modello AI.
            </p>
        </>
    ),
    contextualTools: [
        {
            href: "/it/token-estimator",
            title: "Token Estimator",
            description:
                "Stima quanti token può usare una prompt, un testo o un payload JSON.",
        },
        {
            href: "/it/json-formatter",
            title: "JSON Formatter",
            description:
                "Formatta payload API e risposte dei modelli prima di stimare o fare debug delle chiamate AI.",
        },
        {
            href: "/it/jwt-decoder",
            title: "JWT Encoder / Decoder",
            description:
                "Decodifica o genera token JWT quando testi workflow AI e API autenticati.",
        },
    ],
};

export default aiCostCalculatorIt;