const vatRemovalCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    toolKey: "vatRemoval",
    title: "Calcolatore Rimozione IVA",
    currentPath: "/it/calcolatore-rimozione-iva",
    description:
        "Rimuovi l'IVA da un prezzo IVA inclusa e ottieni subito il prezzo senza IVA insieme alla quota di imposta rimossa.",
    contextualTools: [
        {
            href: "/it/calcolatore-iva",
            title: "Calcolatore IVA",
            description: "Aggiungi IVA o scorpora IVA da qualsiasi importo.",
        },
        {
            href: "/it/calcolatore-iva-inverso",
            title: "Calcolatore IVA Inverso",
            description: "Risalire all'imponibile partendo da un totale lordo.",
        },
        {
            href: "/it/strumenti-iva",
            title: "Strumenti IVA",
            description: "Panoramica completa dei calcolatori IVA.",
        },
    ],
    examples: [
        {
            title: "Rimuovere IVA 22% da 244€",
            description:
                "Inserisci 244€ con aliquota 22% per vedere IVA 44€ e imponibile 200€.",
            href: "/it/calcolatore-rimozione-iva?amount=244&rate=22",
        },
        {
            title: "Rimuovere IVA 10% da 110€",
            description:
                "Inserisci 110€ con aliquota 10% per ottenere IVA 10€ e imponibile 100€.",
            href: "/it/calcolatore-rimozione-iva?amount=110&rate=10",
        },
        {
            title: "Rimuovere IVA ridotta al 4%",
            description:
                "Inserisci 104€ con aliquota 4% per vedere IVA 4€ e imponibile 100€.",
            href: "/it/calcolatore-rimozione-iva?amount=104&rate=4",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Cosa fa un calcolatore rimozione IVA?</h3>
            <p>
                Ti mostra quanta IVA è inclusa in un prezzo lordo e quale parte
                del totale rappresenta il prezzo senza IVA.
            </p>

            <h3 className="mt-4 font-semibold">Come si rimuove l&apos;IVA da un prezzo?</h3>
            <p>
                Dividi il lordo per <code>1 + (aliquota / 100)</code> per
                ottenere l&apos;imponibile, poi sottrai l&apos;imponibile dal lordo per
                ricavare la quota IVA.
            </p>

            <h3 className="mt-4 font-semibold">Quando è utile rimuovere l&apos;IVA?</h3>
            <p>
                È utile per contabilità, controllo fatture, confronto prezzi e
                analisi margini quando i fornitori comunicano importi IVA inclusa.
            </p>

            <h3 className="mt-4 font-semibold">Quali aliquote supporta?</h3>
            <p>
                Sono disponibili preset per Italia (22%, 10%, 4%), UK (20%, 5%,
                0%) e puoi inserire qualsiasi percentuale personalizzata.
            </p>

            <h3 className="mt-4 font-semibold">
                Rimozione IVA e IVA inversa sono la stessa cosa?
            </h3>
            <p>
                Sì, il calcolo è identico. Cambia solo la terminologia: in
                entrambi i casi si parte dal lordo e si ricavano imponibile e IVA.
            </p>
        </>
    ),
    faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Cosa fa un calcolatore rimozione IVA?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Mostra quanta IVA è inclusa in un prezzo lordo e quale parte del totale rappresenta l'imponibile.",
                },
            },
            {
                "@type": "Question",
                name: "Come si rimuove l'IVA da un prezzo?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Si divide il lordo per 1 + (aliquota / 100) per ottenere l'imponibile, poi si sottrae l'imponibile dal lordo per ricavare la quota IVA.",
                },
            },
            {
                "@type": "Question",
                name: "Quando è utile rimuovere l'IVA?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "È utile per contabilità, controllo fatture, confronto prezzi e analisi margini quando si parte da importi già IVA inclusa.",
                },
            },
            {
                "@type": "Question",
                name: "Quali aliquote supporta?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sono disponibili preset per Italia e UK e puoi inserire qualsiasi aliquota personalizzata tra 0 e 100.",
                },
            },
            {
                "@type": "Question",
                name: "Rimozione IVA e IVA inversa sono uguali?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sì, il calcolo matematico è identico: in entrambi i casi si parte dal lordo per ricavare imponibile e IVA.",
                },
            },
        ],
    },
    sample: { amount: 122, rate: 22 },
    labels: {
        amountLabel: "Importo IVA inclusa",
        amountPlaceholder: "Es. 122",
        amountHelp: "Inserisci il prezzo totale da cui vuoi sottrarre l'IVA.",
        rateLabel: "Aliquota IVA",
        rateHelp: "Scegli un preset o inserisci una percentuale personalizzata.",
        ukRatesLabel: "Aliquote UK",
        italyRatesLabel: "Aliquote Italia",
        netLabel: "Prezzo senza IVA",
        vatLabel: "IVA rimossa",
        invalidAmount: "Inserisci un importo valido maggiore o uguale a 0.",
        currencySymbol: "€",
        currencyNote:
            "La valuta mostrata è indicativa. Il calcolo IVA è identico per qualsiasi valuta.",
    },
};

export default vatRemovalCalculatorIt;