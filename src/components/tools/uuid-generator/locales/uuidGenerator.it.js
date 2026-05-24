const uuidGeneratorIt = {
    lang: "it",
    locale: "it-IT",
    title: "UUID Generator online",
    currentPath: "/it/uuid-generator",
    description:
        "Genera uno o più UUID v4 direttamente nel browser. Utile per sviluppo software, API, database, test e identificatori univoci.",
    contextualTools: [
        {
            href: "/it/json-formatter",
            title: "JSON Formatter",
            description: "per usare UUID dentro payload, fixture e risposte API.",
        },
        {
            href: "/it/base64-tool",
            title: "Base64 Encode/Decode",
            description: "per codificare identificatori o payload nei test.",
        },
        {
            href: "/it/url-encoder-decoder",
            title: "URL Encoder/Decoder",
            description: "se devi passare UUID dentro query string o redirect.",
        },
    ],
    examples: [
        {
            title: "Generare ID univoci per database",
            description:
                "Usa gli UUID come chiavi primarie o identificatori unici in database relazionali o NoSQL.",
        },
        {
            title: "Creare identificatori per API e sistemi distribuiti",
            description:
                "Gli UUID sono ideali per identificare risorse, richieste o eventi senza rischio di collisioni.",
        },
        {
            title: "Generare dati per test e sviluppo",
            description:
                "Puoi creare rapidamente liste di UUID da usare in fixture, test automatici o simulazioni.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Che cos&apos;è un UUID?</h3>
            <p>
                Un UUID è un identificatore univoco usato spesso in database,
                API, sistemi distribuiti e test software.
            </p>

            <h3 className="mt-2 font-semibold">
                Gli UUID vengono generati su server?
            </h3>
            <p>
                No. Gli UUID vengono generati localmente nel browser e non
                vengono inviati a server esterni.
            </p>

            <h3 className="mt-2 font-semibold">
                Che versione genera questo tool?
            </h3>
            <p>
                Questo strumento genera UUID v4, basati su valori casuali.
            </p>
        </>
    ),
    labels: {
        quantityLabel: "Quantità",
        generateButton: "Genera UUID",
        hint: "Puoi generare da 1 a 100 UUID alla volta.",
        resultLabelSingular: "UUID generato",
        resultLabelPlural: "UUID generati",
        placeholder: "Es. 5",
    },
};

export default uuidGeneratorIt;
