import { Fragment } from "react";

const faqItems = [
    {
        question: "Il JSON viene inviato a un server?",
        answer:
            "No. La formattazione, la validazione e la minimizzazione avvengono localmente nel tuo browser.",
    },
    {
        question:
            "Questo strumento può segnalare errori in un JSON non valido?",
        answer:
            "Sì. Se il JSON è malformato, lo strumento mostra un errore di parsing in modo da poter correggere rapidamente il problema.",
    },
    {
        question: "Posso minimizzare il JSON?",
        answer:
            "Sì. Usa la visualizzazione Minified per creare JSON compatto per payload API, file di configurazione o variabili d'ambiente.",
    },
];

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
            href: "/it/json-formatter?example=minifiedApi",
        },
        {
            title: "Valida JSON prima di usarlo nel codice",
            description:
                "Rileva errori comuni nel JSON, come virgole mancanti, parentesi non valide, stringhe non chiuse o oggetti malformati prima di utilizzare i dati nella tua app.",
            href: "/it/json-formatter?example=invalidJson",
        },
        {
            title: "Minimizza JSON per payload HTTP e file di configurazione",
            description:
                "Passa alla visualizzazione Minified quando hai bisogno di JSON compatto per richieste API, variabili d'ambiente, file di configurazione o fixture di test.",
            href: "/it/json-formatter?example=nestedConfig",
        },
    ],
    faq: (
        <>
            {faqItems.map((item, index) => (
                <Fragment key={item.question}>
                    <h3
                        className={
                            index === 0
                                ? "font-semibold"
                                : "mt-2 font-semibold"
                        }
                    >
                        {item.question}
                    </h3>
                    <p>{item.answer}</p>
                </Fragment>
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
    sampleJson: `{"nome":"Mario","eta":30,"citta":"Bologna","competenze":["JS","Node","AI"]}`,
    labels: {
        inputLabel: "JSON",
        placeholder: "Incolla JSON qui...",
        size: "Dimensione",
        useSample: "Usa esempio",
        clear: "Cancella",
        prettyView: "Vista leggibile",
        minifiedView: "Vista compatta",
        sortKeys: "Ordina chiavi oggetto",
        copyPretty: "Copia leggibile",
        copyMinified: "Copia compatta",
        download: "Scarica JSON",
        invalidJson: "JSON non valido",
        errorLocation: "Riga {line}, colonna {column}",
        goToError: "Vai all’errore",
        tryRepairJson: "Prova a correggere il JSON",
        repairAvailable: "Abbiamo trovato alcune correzioni sicure per questo JSON:",
        partialRepairAvailable:
            "Sono state applicate alcune correzioni sicure, ma il JSON richiede ancora una correzione manuale.",
        repairFailed:
            "Non è stato possibile correggere automaticamente questo JSON. Correggilo manualmente.",
        applyRepairedJson: "Applica il JSON corretto",
        applyPartialRepairJson: "Applica la correzione parziale",
        appliedFixes: "Correzioni applicate",
        format: "Formato",
        pretty: "Leggibile",
        minified: "Compatto",
        prettyHint: "Formattato per la leggibilità",
        minifiedHint: "Minimizzato per payload compatti",
        dropHint: "Trascina qui un file .json oppure incolla manualmente il JSON.",
        dropSingleFileError: "Trascina un solo file JSON alla volta.",
        dropInvalidFileError: "Trascina un file .json o un file di testo contenente JSON.",
        dropFileTooLargeError: "Il file selezionato è troppo grande. Usa un file inferiore a 2 MB.",
        dropReadError: "Impossibile leggere il file selezionato. Riprova oppure incolla manualmente il JSON.",
    },
    relatedLinks: null,
};

export default jsonFormatterIt;
