const timestampConverterIt = {
    lang: "it",
    locale: "it-IT",
    title: "Timestamp Converter online",
    currentPath: "/it/timestamp-converter",
    description:
        "Converti Unix timestamp in date leggibili e date in timestamp. Utile per API, log, database e campi JWT come exp, iat e nbf.",
    contextualTools: [
        {
            href: "/it/jwt-decoder",
            title: "Decodifica JWT",
            description: "per ispezionare i campi exp, iat e nbf dentro il payload di un token.",
        },
        {
            href: "/it/json-formatter",
            title: "Formatta JSON",
            description: "per leggere più facilmente risposte API, payload di log e campi timestamp.",
        },
        {
            href: "/it/url-encoder-decoder",
            title: "URL Encoder/Decoder",
            description: "per decodificare timestamp passati dentro query string o callback URL.",
        },
    ],
    examples: [
        {
            title: "Convertire valori JWT exp, iat e nbf",
            description:
                "Copia i claim timestamp da un payload JWT e convertili in date locali leggibili, tempo relativo e formato ISO.",
        },
        {
            title: "Leggere timestamp Unix da log e API",
            description:
                "Quando un log server o una risposta API contiene epoch time, puoi convertirlo rapidamente in una data leggibile nel tuo fuso orario locale.",
        },
        {
            title: "Convertire una data in Unix timestamp",
            description:
                "Inserisci una data nel formato gg/mm/aaaa hh:mm per ottenere i valori Unix timestamp in secondi e millisecondi.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Che cos&apos;è un Unix timestamp?</h3>
            <p>
                Un Unix timestamp, chiamato anche epoch time, è un numero che rappresenta il tempo trascorso dal 1 gennaio 1970 alle 00:00:00 UTC.
            </p>

            <h3 className="mt-2 font-semibold">Qual è la differenza tra secondi e millisecondi?</h3>
            <p>
                I timestamp Unix sono spesso salvati in secondi, mentre JavaScript e molte API usano i millisecondi. Questo strumento supporta entrambi i formati.
            </p>

            <h3 className="mt-2 font-semibold">La conversione viene inviata a un server?</h3>
            <p>
                No. La conversione dei timestamp avviene direttamente nel browser, senza inviare dati a server esterni.
            </p>
        </>
    ),
    sample: {
        timestamp: 1714560000,
        unit: "seconds",
        dateTime: "01/05/2024 12:00",
    },
    labels: {
        modes: {
            timestampToDate: "Timestamp → Data",
            dateToTimestamp: "Data → Timestamp",
        },
        timestamp: "Timestamp",
        timestampPlaceholder: "Es. 1714560000",
        timezone: "Fuso orario",
        unit: "Unità",
        units: {
            seconds: "Secondi",
            milliseconds: "Millisecondi",
            secondsFull: "Unix timestamp (secondi)",
            millisecondsFull: "Unix timestamp (millisecondi)",
        },
        localDateTime: "Data e ora locale",
        utcDateTime: "Data e ora UTC",
        datePlaceholder: "Es. 01/05/2024 12:00",
        dateHelper:
            "Usa il formato gg/mm/aaaa hh:mm. La data viene interpretata nel fuso orario locale del browser e convertita in Unix time.",
        relative: "Tempo relativo",
        useExample: "Usa esempio",
        useNow: "Ora",
        errors: {
            invalidTimestamp: "Inserisci un timestamp valido.",
            invalidDate: "Inserisci una data valida nel formato gg/mm/aaaa hh:mm.",
        },
    },
};

export default timestampConverterIt;
