const tokenEstimatorIt = {
    lang: "it",
    locale: "it-IT",
    title: "Stima token LLM online",
    currentPath: "/it/token-estimator",
    description:
        "Incolla un testo e ottieni una stima dei token usati da un modello LLM, insieme a un costo indicativo per input e output. La stima è approssimativa e avviene localmente nel browser.",
    contextualTools: [],
    examples: [
        {
            title: "Stimare il costo di un prompt prima di inviarlo",
            description:
                "Incolla prompt, istruzioni o documentazione per avere una stima dei token input e del costo indicativo sul modello selezionato.",
        },
        {
            title: "Valutare una risposta LLM prevista",
            description:
                "Imposta il numero di token output che ti aspetti di ricevere per stimare il costo totale di una chiamata API.",
        },
        {
            title: "Analizzare payload JSON o contenuti da API",
            description:
                "Puoi incollare JSON, payload o testi tecnici per capire se sono troppo lunghi per un flusso AI o un contesto LLM.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">La stima dei token è precisa?</h3>
            <p>
                No. Questa è una stima rapida basata su caratteri e parole. Il numero reale può
                cambiare in base al tokenizer usato dal modello.
            </p>

            <h3 className="mt-2 font-semibold">Il testo viene inviato a un server?</h3>
            <p>
                No. Il calcolo avviene nel browser e il testo non viene inviato a server esterni.
            </p>

            <h3 className="mt-2 font-semibold">I prezzi sono ufficiali?</h3>
            <p>
                I costi sono indicativi e possono cambiare. Per decisioni economiche importanti
                controlla sempre il pricing ufficiale del provider.
            </p>
        </>
    ),
    sampleText: `Scrivi una breve descrizione di un'app che aiuta gli utenti a confrontare i prezzi dei prodotti nei supermercati vicini, usando un tono semplice e diretto.`,
    sample: {
        modelKey: "gpt-4o-mini",
        estimatedOutputTokens: "500",
    },
    labels: {
        textLabel: "Testo da stimare",
        textPlaceholder: "Incolla qui prompt, testo o contenuto da stimare...",
        textHelp: "Stima locale nel browser. Nessun testo viene inviato a server esterni.",
        modelLabel: "Modello",
        outputTokensLabel: "Output stimato",
        outputTokensPlaceholder: "Es. 500",
        outputTokensHelp: "Token che prevedi di ricevere come risposta.",
        useSample: "Usa esempio",
        clear: "Pulisci",
        inputTokensResult: "Token input stimati",
        characters: "Caratteri",
        words: "Parole",
        noSpaces: "Senza spazi",
        costTitle: "Costo stimato",
        costInput: "Input",
        costOutput: "Output",
        costTotal: "Totale",
        copyText: ({ inputTokens, outputTokens, totalCost }) =>
            `Token input stimati: ${inputTokens}\nToken output stimati: ${outputTokens}\nCosto stimato totale: ${totalCost}`,
    },
};

export default tokenEstimatorIt;
