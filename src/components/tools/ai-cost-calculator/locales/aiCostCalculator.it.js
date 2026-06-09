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

const faqItems = [
    {
        question: "Come viene calcolato il costo AI?",
        answer:
            "Il calcolatore moltiplica i token di input per il prezzo di input del modello e i token di output per il prezzo di output, usando il costo pubblico per un milione di token. Il risultato viene poi moltiplicato per il numero di richieste giornaliere per stimare costo giornaliero e costo mensile.",
    },
    {
        question: "I prezzi sono sempre aggiornati?",
        answer:
            "No. I prezzi possono cambiare spesso e i provider possono applicare tariffe specifiche per token in cache, processi batch, contratti enterprise o fatturazione regionale. Considera il risultato come una stima e verifica sempre la pagina ufficiale dei prezzi prima di prendere decisioni.",
    },
    {
        question: "Perché input e output hanno prezzi diversi?",
        answer:
            "Molti provider LLM applicano prezzi diversi ai token inviati al modello (token di input/prompt) e ai token generati dal modello (token di output/completamento). I token di output sono spesso più costosi perché richiedono lavoro computazionale intensivo durante l'inferenza.",
    },
    {
        question: "Posso usarlo insieme al Token Estimator?",
        answer:
            "Sì. Prima usa il Token Estimator per contare quanti token usa la tua prompt o il tuo testo, poi inserisci quei valori qui per stimare il costo del workload su un modello AI come GPT-4, Claude o Gemini.",
    },
    {
        question: "Quanto costa usare le API di OpenAI?",
        answer:
            "I costi delle API OpenAI dipendono dal modello scelto e da quanti token elabori. Ad esempio, GPT-4o costa circa $2,50 per milione di token di input e $10 per milione di token di output. Usa questo calcolatore per stimare la spesa mensile in base al volume di utilizzo previsto.",
    },
    {
        question: "Qual è il modello AI più economico per la produzione?",
        answer:
            "Modelli economici come GPT-4o mini, Claude Haiku e Gemini Flash offrono i prezzi per token più bassi mantenendo ottime prestazioni per molti task. Seleziona un modello dal menu e regola l'utilizzo previsto per confrontare i costi.",
    },
    {
        question: "Come posso ridurre i costi delle API LLM?",
        answer:
            "Strategie comuni: scegliere un modello più piccolo o economico per task semplici, ridurre la lunghezza della prompt eliminando contesto non necessario, cachare le risposte frequenti, raggruppare le richieste in batch dove possibile e usare limiti sui token di output per controllare la generazione.",
    },
];

const aiCostCalculatorIt = {
    lang: "it",
    currentPath: "/it/calcolatore-costi-ai",
    toolKey: "aiCostCalculator",
    locale: "it-IT",
    currency: "USD",
    metadata: {
        title: "Calcolatore costi AI",
        description:
            "Calcolatore gratuito per stimare i costi API dei modelli AI di OpenAI, Anthropic e Google. Calcola costo per richiesta, spesa giornaliera e mensile in base ai token utilizzati.",
        intro:
            "Usa questo calcolatore gratuito dei costi AI per stimare quanto costano le tue chiamate API verso modelli OpenAI, Anthropic e Google. Inserisci token di input, token di output e richieste giornaliere previste per calcolare istantaneamente costo per richiesta, spesa giornaliera e costo mensile proiettato. Confronta i prezzi tra GPT-4, Claude, Gemini e altri modelli.",
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
            {faqItems.map((item) => (
                <div key={item.question}>
                    <h3 className="mt-4 font-semibold">{item.question}</h3>
                    <p>{item.answer}</p>
                </div>
            ))}
        </>
    ),
    faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    },
    contextualTools: [
        {
            href: "/it/token-estimator",
            title: "Token Estimator",
            description:
                "Stima quanti token può usare una prompt, un testo o un payload JSON.",
        },
        {
            href: "/it/strumenti-costi-ai",
            title: "Strumenti costi AI",
            description:
                "Panoramica di tutti gli strumenti per la stima dei costi AI e il conteggio token.",
        },
        {
            href: "/it/json-formatter",
            title: "JSON Formatter",
            description:
                "Formatta payload API e risposte dei modelli prima di stimare o fare debug delle chiamate AI.",
        },
    ],
};

export default aiCostCalculatorIt;