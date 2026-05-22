

const iso8601ValidatorIt = {
    lang: "it",
    locale: "it-IT",
    title: "Validatore ISO8601",
    currentPath: "/it/validatore-iso8601",
    description:
        "Valida stringhe data e data/ora in formato ISO8601, controlla offset di fuso orario e converti valori validi in UTC e timestamp Unix.",
    labels: {
        input: "Input",
        valueLabel: "Valore ISO8601",
        valuePlaceholder: "Esempio: 2026-05-17T14:30:00+02:00",
        valueHelp:
            "Supporta date semplici, date/ora, secondi frazionari e offset di fuso come Z, +02:00 o +0200.",
        clear: "Pulisci",
        validResult: "Valore ISO8601 valido",
        invalidResult: "Valore ISO8601 non valido",
        validMessage: "Questo valore corrisponde a un formato ISO8601 supportato.",
        invalidMessage: "Questo valore non è valido.",
        normalized: "Valore normalizzato",
        timezone: "Offset fuso orario",
        noTimezone: "Nessun fuso esplicito",
        utc: "Valore UTC",
        notAvailable: "Non disponibile",
        unixSeconds: "Secondi Unix",
        unixMilliseconds: "Millisecondi Unix",
        error: "Errore",
        errors: {
            empty: "Inserisci una data o data/ora da validare.",
            format: "Usa un formato supportato come YYYY-MM-DD o YYYY-MM-DDTHH:mm:ssZ.",
            month: "Il mese deve essere compreso tra 01 e 12.",
            day: "Il giorno non è valido per il mese selezionato.",
            time: "Ora, minuti o secondi sono fuori dall’intervallo supportato.",
            timezone: "L’offset del fuso orario è fuori dall’intervallo supportato.",
        },
    },
    examples: [
        {
            title: "Validare un timestamp API",
            description:
                "Controlla se un timestamp restituito da una API è valido e visualizza la sua rappresentazione UTC.",
        },
        {
            title: "Controllare gli offset di fuso orario",
            description:
                "Confronta valori come Z, +02:00 e +0200 per capire come vengono convertiti in UTC.",
        },
        {
            title: "Debug di log e valori database",
            description:
                "Incolla timestamp da log o campi database e convertili in secondi e millisecondi Unix.",
        },
    ],
    contextualTools: [
        {
            href: "/it/convertitore-timestamp",
            title: "Convertitore timestamp",
            description:
                "Converti timestamp Unix in date leggibili e viceversa.",
        },
        {
            href: "/it/formatta-json",
            title: "Formattatore JSON",
            description:
                "Formatta e valida payload JSON che spesso contengono stringhe data ISO.",
        },
        {
            href: "/it/strumenti-sviluppatori",
            title: "Strumenti sviluppatori",
            description:
                "Esplora utility browser-based per il lavoro quotidiano di sviluppo web.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">
                Che cos’è ISO8601?
            </h3>
            <p>
                ISO8601 è uno standard per scrivere date e orari, molto usato in
                API, database, log e sistemi backend.
            </p>

            <h3 className="mt-4 font-semibold">
                Questo validatore invia i miei dati da qualche parte?
            </h3>
            <p>
                No. La validazione avviene nel browser, quindi i timestamp incollati
                non vengono inviati a un server esterno.
            </p>

            <h3 className="mt-4 font-semibold">
                Cosa succede se non indico un fuso orario?
            </h3>
            <p>
                Una data senza orario viene trattata come data di calendario. Una
                data/ora senza fuso esplicito viene accettata, ma la conversione UTC
                è basata sui valori numerici indicati, non su un fuso locale nominale.
            </p>
        </>
    ),
};

export default iso8601ValidatorIt;