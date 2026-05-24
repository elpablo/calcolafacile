const urlEncoderDecoderIt = {
    lang: "it",
    locale: "it-IT",
    title: "URL Encoder e Decoder online",
    currentPath: "/it/url-encoder-decoder",
    description:
        "Codifica e decodifica URL direttamente nel browser. Utile per query string, parametri API, redirect e callback OAuth senza inviare dati a server esterni.",
    contextualTools: [
        {
            href: "/it/base64-tool",
            title: "Base64 Encode/Decode",
            description: "Codifica payload, token o stringhe usate nelle API.",
        },
        {
            href: "/it/json-formatter",
            title: "JSON Formatter",
            description: "Leggi meglio payload e parametri JSON.",
        },
        {
            href: "/it/jwt-decoder",
            title: "JWT Decoder",
            description:
                "Utile se stai lavorando con token dentro URL o callback OAuth.",
        },
    ],
    examples: [
        {
            title: "Codificare parametri in una query string",
            description:
                "Se devi passare testo con spazi o caratteri speciali in una URL, usa Encode per ottenere una stringa valida da inserire nei parametri.",
        },
        {
            title: "Gestire redirect e callback OAuth",
            description:
                "Quando lavori con login OAuth o redirect URL, puoi codificare o decodificare i parametri per verificare che siano corretti.",
        },
        {
            title: "Debug di URL provenienti da API",
            description:
                "Se ricevi una URL encoded da una API, usa Decode per leggere rapidamente il contenuto e capire cosa contiene.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">
                I dati vengono inviati a un server?
            </h3>
            <p>
                No. La codifica e decodifica avvengono localmente nel browser.
            </p>

            <h3 className="mt-4 font-semibold">
                Quando serve codificare un URL?
            </h3>
            <p>
                Quando devi inserire testo, spazi, simboli o URL dentro query
                string, callback, redirect o parametri API.
            </p>
        </>
    ),
    sample: {
        text: "https://calcolafacile.org/it?query=ciao mondo&ref=dev tools",
        encoded:
            "https%3A%2F%2Fcalcolafacile.org%2Fit%3Fquery%3Dciao%20mondo%26ref%3Ddev%20tools",
    },
    labels: {
        labelEncodeMode: "Codifica",
        labelDecodeMode: "Decodifica",
        labelInputEncode: "Testo o URL",
        labelInputDecode: "URL codificato da decodificare",
        placeholderEncode: "Inserisci testo o URL da codificare...",
        placeholderDecode: "Inserisci stringa URL encoded da decodificare...",
        hint: "Operazione locale nel browser. Nessun dato viene inviato a server esterni.",
        useSample: "Usa esempio",
        clear: "Pulisci",
        errorEncode: "Errore durante la codifica URL.",
        errorDecode: "Stringa URL encoded non valida.",
    },
};

export default urlEncoderDecoderIt;
