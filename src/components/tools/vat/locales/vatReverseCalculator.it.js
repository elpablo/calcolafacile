const vatReverseCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    toolKey: "vatReverse",
    title: "Calcolatore IVA Inverso",
    currentPath: "/it/calcolatore-iva-inverso",
    description:
        "Calcola l'IVA a ritroso partendo da un importo lordo. Inserisci totale IVA inclusa e aliquota per passare da lordo a imponibile e isolare l'imposta.",
    contextualTools: [
        {
            href: "/it/calcolatore-iva",
            title: "Calcolatore IVA",
            description: "Aggiungi o scorpora IVA con aliquote predefinite o personalizzate.",
        },
        {
            href: "/it/calcolatore-rimozione-iva",
            title: "Calcolatore Rimozione IVA",
            description: "Vedi quanta IVA è inclusa in un importo lordo.",
        },
        {
            href: "/it/strumenti-iva",
            title: "Strumenti IVA",
            description: "Esplora l'ecosistema completo dei calcolatori IVA.",
        },
    ],
    examples: [
        {
            title: "Scorporo al 22% da 122€",
            description:
                "Inserisci 122€ con aliquota 22% per ottenere imponibile 100€ e IVA 22€.",
            href: "/it/calcolatore-iva-inverso?amount=122&rate=22",
        },
        {
            title: "Scorporo al 20% da 120£",
            description:
                "Inserisci 120 con aliquota 20% per risalire a imponibile 100 e IVA 20.",
            href: "/it/calcolatore-iva-inverso?amount=120&rate=20",
        },
        {
            title: "Scorporo con aliquota ridotta al 10%",
            description:
                "Inserisci 110 con aliquota 10% per ottenere imponibile 100 e IVA 10.",
            href: "/it/calcolatore-iva-inverso?amount=110&rate=10",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Cos&apos;è il calcolo IVA inverso?</h3>
            <p>
                Il calcolo IVA inverso serve a trovare imponibile e imposta a
                partire da un importo lordo già comprensivo di IVA. È il modo
                più diretto per passare da lordo a netto.
            </p>

            <h3 className="mt-4 font-semibold">Come si calcola l&apos;IVA inversa?</h3>
            <p>
                Si divide il lordo per <code>1 + (aliquota / 100)</code> per
                ottenere l&apos;imponibile. La differenza tra lordo e imponibile è
                la quota IVA.
            </p>

            <h3 className="mt-4 font-semibold">
                Qual è la differenza tra IVA inversa e rimozione IVA?
            </h3>
            <p>
                A livello matematico non cambia nulla: entrambi i metodi
                estraggono l&apos;IVA da un importo lordo. Cambia solo il modo in cui
                viene descritto il risultato.
            </p>

            <h3 className="mt-4 font-semibold">Posso usare qualsiasi aliquota?</h3>
            <p>
                Sì. Hai preset Italia (22%, 10%, 4%), UK (20%, 5%, 0%) e puoi
                inserire qualsiasi percentuale personalizzata.
            </p>

            <h3 className="mt-4 font-semibold">
                Il calcolatore è utile per controllare fatture?
            </h3>
            <p>
                Sì, è ideale per verificare rapidamente se imponibile e IVA in
                fattura sono coerenti con totale e aliquota indicata.
            </p>
        </>
    ),
    faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Cos'è il calcolo IVA inverso?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Il calcolo IVA inverso trova imponibile e imposta partendo da un importo lordo già comprensivo di IVA.",
                },
            },
            {
                "@type": "Question",
                name: "Come si calcola l'IVA inversa?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Si divide il lordo per 1 + (aliquota / 100) per ottenere l'imponibile. La differenza tra lordo e imponibile è la quota IVA.",
                },
            },
            {
                "@type": "Question",
                name: "Qual è la differenza tra IVA inversa e rimozione IVA?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "A livello matematico è lo stesso calcolo: entrambi estraggono l'IVA da un importo lordo. Cambia solo il modo in cui viene presentato il risultato.",
                },
            },
            {
                "@type": "Question",
                name: "Posso usare qualsiasi aliquota?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sì. Sono disponibili preset Italia e UK, ma puoi inserire qualsiasi aliquota personalizzata tra 0 e 100.",
                },
            },
            {
                "@type": "Question",
                name: "È utile per verificare una fattura?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sì, è utile per controllare velocemente se imponibile e IVA indicati in fattura sono coerenti con totale e aliquota.",
                },
            },
        ],
    },
    sample: { amount: 122, rate: 22 },
    labels: {
        amountLabel: "Importo lordo (IVA inclusa)",
        amountPlaceholder: "Es. 122",
        amountHelp: "Inserisci il totale lordo da convertire in imponibile e IVA.",
        rateLabel: "Aliquota IVA",
        rateHelp: "Scegli un preset o inserisci una percentuale personalizzata.",
        ukRatesLabel: "Aliquote UK",
        italyRatesLabel: "Aliquote Italia",
        netLabel: "Imponibile (lordo → netto)",
        vatLabel: "Quota IVA",
        invalidAmount: "Inserisci un importo valido maggiore o uguale a 0.",
        currencySymbol: "€",
        currencyNote:
            "La valuta mostrata è indicativa. Il calcolo IVA è identico per qualsiasi valuta.",
    },
};

export default vatReverseCalculatorIt;