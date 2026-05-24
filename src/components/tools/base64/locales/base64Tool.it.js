const base64ToolIt = {
    lang: "it",
    locale: "it-IT",
    title: "Base64 Encode e Decode online",
    currentPath: "/it/base64-tool",
    description:
        "Codifica e decodifica Base64 direttamente nel browser. Utile per token, payload API e debugging senza inviare dati a server esterni.",
    contextualTools: [
        {
            href: "/it/jwt-decoder",
            title: "Decodifica JWT",
            description:
                "Utile se stai lavorando con token composti da header, payload e signature.",
        },
        {
            href: "/it/json-formatter",
            title: "Formatta JSON",
            description: "Utile per leggere meglio payload e risposte API.",
        },
        {
            href: "/it/token-estimator",
            title: "Stima token LLM",
            description:
                "Utile se vuoi usare il contenuto decodificato in un prompt AI.",
        },
    ],
    examples: [
        {
            title: "Decodificare il payload di un token",
            description:
                "Se hai una stringa Base64 da JWT o API, puoi decodificarla per leggere il contenuto in chiaro.",
        },
        {
            title: "Codificare dati per richieste HTTP",
            description:
                "Alcune API richiedono dati in formato Base64 (ad esempio file o credenziali). Inserisci il testo e copia la versione codificata.",
        },
        {
            title: "Gestire stringhe con caratteri speciali",
            description:
                "Il tool supporta UTF-8, quindi puoi codificare e decodificare testi con accenti, emoji e caratteri non ASCII senza problemi.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">
                I dati vengono inviati a un server?
            </h3>
            <p>No. Tutto avviene localmente nel browser.</p>

            <h3 className="mt-2 font-semibold">Supporta caratteri UTF-8?</h3>
            <p>
                Sì, la codifica e decodifica gestiscono correttamente caratteri
                speciali.
            </p>
        </>
    ),
    sample: {
        text: "Hello world! Questo è un esempio.",
        base64: "SGVsbG8gd29ybGQhIFF1ZXN0byDDoCBlc2VtcGlvLg==",
    },
    labels: {
        encodeBtn: "Codifica",
        decodeBtn: "Decodifica",
        inputLabelEncode: "Testo",
        inputLabelDecode: "Base64",
        placeholderEncode: "Inserisci testo...",
        placeholderDecode: "Inserisci stringa Base64...",
        useSample: "Usa esempio",
        clear: "Pulisci",
        errorEncode: "Errore durante la codifica Base64.",
        errorDecode: "Stringa Base64 non valida.",
        footerNote: null,
    },
};

export default base64ToolIt;
