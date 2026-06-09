const faqItems = [
    {
        question: "Quanto costa usare le API AI?",
        answer:
            "I costi delle API AI dipendono dal modello, provider e volume di utilizzo. La maggior parte dei provider addebita per token elaborato — tipicamente tra $0,10 e $60 per milione di token a seconda del modello. Usa il Calcolatore Costi AI per stimare i costi specifici in base al consumo di token previsto e al volume giornaliero di richieste.",
    },
    {
        question: "Qual è il modello LLM più economico per la produzione?",
        answer:
            "Modelli economici come GPT-4o mini (~$0,15/M token input), Claude Haiku (~$0,25/M) e Gemini Flash (~$0,10/M) offrono i prezzi per token più bassi mantenendo ottime prestazioni per molti task di produzione. La scelta migliore dipende dai requisiti di qualità e dalla complessità del caso d'uso.",
    },
    {
        question: "Come vengono calcolati i costi delle API AI?",
        answer:
            "I costi delle API AI si calcolano moltiplicando il numero di token elaborati (token di input + token di output) per il prezzo per token del modello. I provider esprimono i prezzi per milione di token. Il costo totale è (token input × prezzo input) + (token output × prezzo output), moltiplicato per il numero di richieste.",
    },
    {
        question: "Qual è la differenza tra token di input e token di output?",
        answer:
            "I token di input sono i token nella tua prompt (il testo che invii al modello). I token di output sono i token che il modello genera nella risposta. I token di output sono tipicamente 2–6× più costosi perché richiedono lavoro computazionale intensivo durante l'inferenza.",
    },
    {
        question: "Come posso ridurre i costi delle API AI?",
        answer:
            "Strategie comuni: scegliere un modello più piccolo per task semplici, abbreviare le prompt rimuovendo contesto non necessario, cachare le risposte frequenti, raggruppare le richieste in batch, impostare limiti sui token di output e usare funzionalità specifiche del provider come prompt caching o API batch con tariffe scontate.",
    },
    {
        question: "Questi strumenti per i costi AI sono gratuiti?",
        answer:
            "Sì. Tutti gli strumenti su CalcolaFacile sono gratuiti, non richiedono registrazione e funzionano interamente nel browser. Nessun dato viene inviato a un server — le tue prompt e i calcoli restano privati sul tuo dispositivo.",
    },
];

const aiCostToolsHubIt = {
    lang: "it",
    backLabel: "← Torna a tutti gli strumenti",
    eyebrow: "Strumenti costi AI",
    heading: "Strumenti gratuiti per stimare i costi delle API AI",
    intro:
        "Stima i costi API, conta i token e pianifica il budget per applicazioni basate su AI. Confronta i prezzi tra modelli OpenAI, Anthropic e Google prima di andare in produzione. Tutti gli strumenti funzionano nel browser — nessuna registrazione o API key richiesta.",
    toolkitTitle: "Toolkit costi AI",
    toolkitDescription:
        "Scegli lo strumento giusto a seconda che tu debba stimare la spesa API totale o contare i token in un testo specifico.",
    tools: [
        {
            href: "/it/calcolatore-costi-ai",
            title: "Calcolatore Costi AI",
            badge: "Più usato",
            description:
                "Stima i costi API mensili per modelli OpenAI, Anthropic e Google. Inserisci token e richieste giornaliere per calcolare costo per richiesta, spesa giornaliera e mensile.",
        },
        {
            href: "/it/token-estimator",
            title: "Token Estimator",
            badge: null,
            description:
                "Conta quanti token usa una prompt, un testo o un payload JSON. Stima il costo approssimativo per GPT, Claude e altri modelli LLM direttamente nel browser.",
        },
    ],
    useCasesTitle: "Scenari comuni di pianificazione costi AI",
    useCases: [
        {
            title: "Budget per una nuova funzionalità AI",
            description:
                "Prima di sviluppare una funzionalità AI, stima quanti token userà ogni richiesta e moltiplica per il volume giornaliero previsto per proiettare la spesa API mensile.",
        },
        {
            title: "Confrontare prezzi tra modelli",
            description:
                "Passa tra GPT-4o, Claude Sonnet, Gemini Pro e modelli economici per trovare il miglior equilibrio costo-prestazioni per il tuo caso d'uso specifico.",
        },
        {
            title: "Ottimizzare i costi delle prompt",
            description:
                "Usa il Token Estimator per misurare la lunghezza della prompt, poi riduci il contesto non necessario per abbassare i costi dei token di input senza sacrificare la qualità dell'output.",
        },
        {
            title: "Prevedere i costi di scalabilità",
            description:
                "Modella come crescono i costi quando il tuo prodotto scala da 100 a 10.000 richieste giornaliere — utile per pianificare pricing e budget infrastrutturali.",
        },
    ],
    pricingOverviewTitle: "Panoramica prezzi modelli AI (indicativi)",
    pricingOverviewDescription:
        "I prezzi sotto sono tariffe pubbliche indicative per milione di token. I prezzi effettivi possono variare per sconti a volume, token in cache, API batch o fatturazione regionale. Verifica sempre sulla pagina ufficiale del provider.",
    providers: [
        {
            title: "OpenAI",
            models: [
                { label: "GPT-4o", value: "$2,50 / $10 per M" },
                { label: "GPT-4o mini", value: "$0,15 / $0,60 per M" },
                { label: "GPT-4.1", value: "$2,00 / $8,00 per M" },
            ],
        },
        {
            title: "Anthropic",
            models: [
                { label: "Claude Sonnet 4", value: "$3,00 / $15 per M" },
                { label: "Claude Haiku 3.5", value: "$0,80 / $4,00 per M" },
                { label: "Claude Opus 4", value: "$15 / $75 per M" },
            ],
        },
        {
            title: "Google",
            models: [
                { label: "Gemini 2.5 Pro", value: "$1,25 / $10 per M" },
                { label: "Gemini 2.5 Flash", value: "$0,15 / $0,60 per M" },
                { label: "Gemini 2.0 Flash", value: "$0,10 / $0,40 per M" },
            ],
        },
    ],
    faqTitle: "Domande frequenti",
    faqItems,
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
    relatedTitle: "Strumenti correlati",
    relatedTools: [
        {
            href: "/it/json-formatter",
            title: "JSON Formatter",
            description:
                "Formatta e valida payload API prima di inviarli ai modelli AI.",
        },
        {
            href: "/it/strumenti-ai",
            title: "Tutti gli strumenti AI",
            description:
                "Esplora la collezione completa di strumenti AI per sviluppatori.",
        },
        {
            href: "/it/calcolatore-roi",
            title: "Calcolatore ROI",
            description:
                "Calcola il ritorno sull'investimento per valutare la redditività delle funzionalità AI.",
        },
        {
            href: "/it/calcolatori-business",
            title: "Calcolatori Business",
            description:
                "Stipendio, ROI, interesse composto e altri strumenti finanziari.",
        },
    ],
    privacyTitle: "Basato su browser e rispettoso della privacy",
    privacyDescription:
        "Tutti i calcoli vengono eseguiti localmente nel tuo browser. Nessuna prompt, token o stima di costo viene mai inviata a un server. I tuoi dati restano sul tuo dispositivo.",
};

export default aiCostToolsHubIt;
