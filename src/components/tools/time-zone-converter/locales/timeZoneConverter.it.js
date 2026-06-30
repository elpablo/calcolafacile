import { localizeTimeZoneConverterExamples } from "../timeZoneConverterExamples";

const timeZoneConverterIt = {
    lang: "it",
    locale: "it-IT",
    currentPath: "/it/convertitore-fusi-orari",
    toolKey: "timeZoneConverter",
    metadata: {
        title: "Convertitore fusi orari",
        description:
            "Converti data e ora tra fusi orari con timeline visuale a 24 ore, offset UTC e indicatori di cambio giorno.",
        intro: "Scegli un fuso orario di partenza, aggiungi uno o più fusi di destinazione e confronta gli orari locali su una timeline semplice.",
    },
    description:
        "Converti meeting, log server e orari di viaggio tra UTC, Europa, Stati Uniti e Asia. La timeline visuale evidenzia orari lavorativi, giorno e notte.",
    sample: {
        date: "2026-05-24",
        time: "14:00",
        sourceTimeZone: "Europe/Rome",
        targetTimeZones: [
            "UTC",
            "Europe/London",
            "America/New_York",
            "Asia/Tokyo",
        ],
    },
    labels: {
        dateLabel: "Data",
        timeLabel: "Ora",
        sourceTimeZoneLabel: "Fuso orario di partenza",
        targetTimeZonesTitle: "Fusi orari di destinazione",
        targetTimeZonesDescription:
            "Confronta lo stesso istante in più località.",
        targetTimeZoneLabel: "Fuso orario",
        addTargetLabel: "Aggiungi fuso orario",
        removeTargetLabel: "Rimuovi fuso orario",
        sourceResultLabel: "Ora di partenza",
        timelineTitle: "Timeline 24 ore",
        timelineDescription:
            "Ogni indicatore mostra dove cade l'orario convertito nella giornata locale.",
        sameDay: "Stesso giorno",
        nextDay: "Giorno successivo",
        previousDay: "Giorno precedente",
        dayOffsetFuture: "+{days} giorni",
        dayOffsetPast: "-{days} giorni",
        businessHours: "Ore centrali",
        daytime: "Giorno",
        nighttime: "Notte",
        timeZoneNames: {
            UTC: "UTC",
            "Europe/Rome": "Roma / Milano",
            "Europe/London": "Londra",
            "Europe/Paris": "Parigi",
            "America/New_York": "New York",
            "America/Chicago": "Chicago",
            "America/Los_Angeles": "Los Angeles",
            "America/Sao_Paulo": "São Paulo",
            "Asia/Dubai": "Dubai",
            "Asia/Kolkata": "Mumbai / Delhi",
            "Asia/Singapore": "Singapore",
            "Asia/Tokyo": "Tokyo",
            "Australia/Sydney": "Sydney",
        },
    },
    examples: localizeTimeZoneConverterExamples("it", "/it/convertitore-fusi-orari"),
    contextualTools: [
        {
            href: "/it/timestamp-converter",
            title: "Convertitore timestamp",
            description:
                "Converti timestamp Unix in date leggibili, oppure ottieni un timestamp da una data e ora specifiche.",
        },
        {
            href: "/it/validatore-iso8601",
            title: "Validatore ISO8601",
            description:
                "Valida e converti stringhe data ISO8601 usate da API e database.",
        },
    ],
    faq: (
        <>
            <h3 className="mt-4 font-semibold">
                Come funziona il convertitore di fusi orari?
            </h3>
            <p>
                Lo strumento interpreta data e ora inserite nel fuso orario di
                partenza, converte quell&apos;istante in UTC e poi lo formatta
                in ogni fuso orario di destinazione selezionato.
            </p>

            <h3 className="mt-4 font-semibold">
                Tiene conto dell&apos;ora legale?
            </h3>
            <p>
                Sì. Le conversioni usano nomi IANA come Europe/Rome e
                America/New_York, quindi le regole di ora legale vengono
                applicate dal runtime del browser per la data selezionata.
            </p>

            <h3 className="mt-4 font-semibold">
                Cosa significano i colori della timeline?
            </h3>
            <p>
                Ore centrali indica l&apos;intervallo 9:00–18:00, giorno indica
                6:00–22:00 e notte indica le altre ore. È solo un riferimento
                visuale e potrebbe non corrispondere alle abitudini locali o agli
                orari di lavoro reali.
            </p>
        </>
    ),
};

export default timeZoneConverterIt;