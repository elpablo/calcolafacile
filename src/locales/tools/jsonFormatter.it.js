const jsonFormatterIt = {
    lang: "it",
    title: "JSON Formatter e Validatore JSON Online",
    currentPath: "/it/json-formatter",
    description:
        "Formatta, valida e minimizza JSON direttamente nel tuo browser. Incolla JSON grezzo, rendilo leggibile, rileva errori di parsing e copia il risultato senza inviare dati a server esterni.",
    contextualTools: [
        {
            href: "/it/token-estimator",
            title: "Stima i token LLM",
            description:
                "per stimare la dimensione e il costo del JSON utilizzato in prompt, payload o flussi di lavoro AI.",
        },
        {
            href: "/it/base64-tool",
            title: "Codifica e decodifica Base64",
            description:
                "per codificare o decodificare payload e stringhe utilizzate nelle integrazioni API.",
        },
        {
            href: "/it/jwt-decoder",
            title: "Decodifica JWT",
            description:
                "per ispezionare header e payload quando il tuo JSON proviene da un token.",
        },
    ],
    examples: [
        {
            title: "Formatta una risposta API in JSON",
            description:
                "Incolla JSON grezzo restituito da un'API per renderlo leggibile, ispezionare oggetti e array annidati e copiare l'output formattato.",
        },
        {
            title: "Valida JSON prima di usarlo nel codice",
            description:
                "Rileva errori comuni nel JSON, come virgole mancanti, parentesi non valide, stringhe non chiuse o oggetti malformati prima di utilizzare i dati nella tua app.",
        },
        {
            title: "Minimizza JSON per payload HTTP e file di configurazione",
            description:
                "Passa alla visualizzazione Minified quando hai bisogno di JSON compatto per richieste API, variabili d'ambiente, file di configurazione o fixture di test.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Il JSON viene inviato a un server?</h3>
            <p>
                No. La formattazione, la validazione e la minimizzazione avvengono localmente nel tuo browser.
            </p>

            <h3 className="mt-2 font-semibold">
                Questo strumento può segnalare errori in un JSON non valido?
            </h3>
            <p>
                Sì. Se il JSON è malformato, lo strumento mostra un errore di parsing in modo da poter correggere rapidamente il problema.
            </p>

            <h3 className="mt-2 font-semibold">Posso minimizzare il JSON?</h3>
            <p>
                Sì. Usa la visualizzazione Minified per creare JSON compatto per payload API, file di configurazione o variabili d&apos;ambiente.
            </p>
        </>
    ),
    sampleJson: `{"nome":"Mario","eta":30,"citta":"Bologna","competenze":["JS","Node","AI"]}`,
    labels: {
        inputLabel: "JSON",
        placeholder: "Incolla JSON qui...",
        size: "Dimensione",
        useSample: "Usa esempio",
        clear: "Cancella",
        prettyView: "Vista leggibile",
        minifiedView: "Vista compatta",
        copyPretty: "Copia leggibile",
        copyMinified: "Copia compatta",
        invalidJson: "JSON non valido",
        format: "Formato",
        pretty: "Leggibile",
        minified: "Compatto",
        prettyHint: "Formattato per la leggibilità",
        minifiedHint: "Minimizzato per payload compatti",
    },
    relatedLinks: null,
};

export default jsonFormatterIt;
