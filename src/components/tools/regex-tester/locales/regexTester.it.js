const regexTesterIt = {
    lang: "it",
    locale: "it-IT",
    title: "Test Regex",
    currentPath: "/it/test-regex",
    description:
        "Testa espressioni regolari online con match live, flags, gruppi e posizioni dettagliate dei risultati.",
    labels: {
        pattern: "Pattern regex",
        patternHelp:
            "Inserisci un’espressione regolare compatibile con JavaScript.",
        patternPlaceholder: "Esempio: \\b\\w+@\\w+\\.\\w+\\b",
        flags: "Flags",
        testText: "Testo di prova",
        testTextHelp:
            "Incolla o scrivi il testo che vuoi verificare con la regex.",
        testTextPlaceholder:
            "Incolla qui il testo da analizzare con l’espressione regolare.",
        reset: "Ripristina",
        expand: "Espandi",
        collapse: "Comprimi",
        patternLibraryTitle: "Libreria pattern",
        patternLibraryDescription:
            "Scegli una regex pronta all’uso e caricala insieme a un testo di esempio.",
        patternCategories: {
            common: "Comuni",
            developer: "Developer",
            network: "Network",
            date: "Date e orari",
            web: "Web",
            security: "Sicurezza",
            other: "Altro",
        },
        highlightedPreviewTitle: "Anteprima evidenziata",
        highlightedPreviewDescription:
            "I match trovati vengono evidenziati direttamente nel testo per vedere subito cosa estrae la regex.",
        resultTitle: "Risultato regex",
        invalidRegex: "Espressione regolare non valida",
        matchesFound: "Match trovati",
        noMatches: "Nessun match",
        activeFlags: "Flags attive",
        match: "Match",
        position: "Posizione",
        groups: "Gruppi",
        line: "Riga",
        column: "Colonna",
        none: "Nessuno",
        flagDescriptions: {
            g: "globale",
            i: "ignora maiuscole/minuscole",
            m: "multilinea",
            s: "dotall",
            u: "unicode",
            y: "sticky",
        },
        disclaimer:
            "Questo tool utilizza il motore RegExp JavaScript disponibile nel browser. I risultati potrebbero differire rispetto ad altri engine regex.",
    },
    examples: [
        {
            title: "Indirizzi email",
            description:
                "Estrai indirizzi email da un testo usando una regex case-insensitive.",
            href: "/it/test-regex?pattern=%5C%5Cb%5BA-Z0-9._%25%2B-%5D%2B%40%5BA-Z0-9.-%5D%2B%5C%5C.%5BA-Z%5D%7B2%2C%7D%5C%5Cb&flags=gi&testText=Contattaci%20su%20info%40example.com%20oppure%20support%40calcolafacile.org",
        },
        {
            title: "URL web",
            description:
                "Trova URL HTTP e HTTPS all’interno di log o documenti di testo.",
            href: "/it/test-regex?pattern=https%3F%3A%5C%5C%2F%5C%5C%2F%5B%5E%5C%5Cs%5D%2B&flags=gi&testText=Visita%20https%3A%2F%2Fcalcolafacile.org%20oppure%20https%3A%2F%2Fexample.com%2Fdocs",
        },
        {
            title: "Named groups",
            description:
                "Estrai date utilizzando gruppi nominati.",
            href: "/it/test-regex?pattern=%28%3F%3Cyear%3E%5C%5Cd%7B4%7D%29-%28%3F%3Cmonth%3E%5C%5Cd%7B2%7D%29-%28%3F%3Cday%3E%5C%5Cd%7B2%7D%29&flags=g&testText=Date%20rilascio%3A%202026-05-22%20e%202026-06-15",
        },
    ],
    contextualTools: [
        {
            href: "/it/json-formatter",
            title: "JSON Formatter",
            description:
                "Formatta, valida e migliora la leggibilità del JSON direttamente nel browser.",
        },
        {
            href: "/it/validatore-iso8601",
            title: "Validatore ISO8601",
            description:
                "Valida date e timestamp ISO8601 con feedback dettagliato.",
        },
        {
            href: "/it/jwt-decoder",
            title: "JWT Decoder",
            description:
                "Decodifica e ispeziona token JWT localmente nel browser.",
        },
    ],
    faq: (
        <>
            <h2>Che cos’è un regex tester?</h2>
            <p>
                Un regex tester permette di verificare espressioni regolari su testo
                reale e visualizzare match, gruppi e posizioni in tempo reale.
            </p>

            <h2>Quale motore regex usa questo tool?</h2>
            <p>
                Questo strumento usa il motore RegExp JavaScript integrato nel browser.
                Alcune funzionalità avanzate possono comportarsi diversamente rispetto
                ai motori PCRE, Python o .NET.
            </p>

            <h2>A cosa servono le flags regex?</h2>
            <p>
                Le flags modificano il comportamento della regex. Ad esempio la flag
                <code>i</code> abilita la ricerca case-insensitive, mentre
                <code>g</code> abilita la ricerca globale.
            </p>

            <h2>Questo regex tester supporta i named groups?</h2>
            <p>
                Sì. I gruppi nominati supportati dalle regex JavaScript vengono
                visualizzati nei dettagli dei match.
            </p>

            <h2>Questo tool invia il mio testo a un server?</h2>
            <p>
                No. Il matching regex viene eseguito localmente nel browser. Testo e
                pattern non vengono inviati a server esterni.
            </p>
        </>
    ),
};

export default regexTesterIt;