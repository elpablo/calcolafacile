const vatCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    currencyAffix: { suffix: "€" },
    toolKey: "vat",
    title: "Calcolatore IVA",
    currentPath: "/it/calcolatore-iva",
    description:
        "Calcola IVA, scorporo e aggiunta con aliquote Italia, UK e percentuali personalizzate. Ottieni imponibile, IVA e totale in tempo reale.",
    contextualTools: [],
    examples: [
        {
            title: "Aggiungere IVA al 22%",
            description:
                "Inserisci un importo netto, scegli il 22% e seleziona 'Aggiungi IVA' per ottenere IVA e totale lordo.",
            href: "/it/calcolatore-iva?amount=100&rate=22&mode=add",
        },
        {
            title: "Scorporare IVA da un totale lordo",
            description:
                "Parti da un prezzo comprensivo di IVA e usa 'Scorpora IVA' per ottenere imponibile e imposta.",
            href: "/it/calcolatore-iva?amount=122&rate=22&mode=remove",
        },
        {
            title: "Usare un'aliquota personalizzata",
            description:
                "Inserisci qualsiasi percentuale IVA, come 17,5%, 5% o 8,25%, per scenari internazionali.",
            href: "/it/calcolatore-iva?amount=250&rate=17.5&mode=add",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Come si calcola l&apos;IVA al 22%?</h3>
            <p>Basta moltiplicare l&apos;importo per 0.22 e sommarlo al totale.</p>

            <h3 className="font-semibold mt-2">Come si scorpora l&apos;IVA?</h3>
            <p>Dividi il totale per 1.22 (nel caso di IVA al 22%).</p>
        </>
    ),
    sample: {
        amount: 100,
        rate: 22,
        mode: "add",
    },
    labels: {
        amountLabel: "Importo",
        amountPlaceholder: "Es. 100",
        amountHelp: "Inserisci l'importo su cui calcolare l'IVA",
        rateLabel: "Aliquota IVA",
        rateHelp:
            "Usa un preset Italia o UK oppure inserisci una percentuale IVA personalizzata.",
        ukRatesLabel: "Aliquote UK",
        italyRatesLabel: "Aliquote Italia",
        salesTaxNote:
            "Negli Stati Uniti viene generalmente utilizzata la sales tax invece dell'IVA, quindi i calcoli possono differire.",
        modeLabel: "Tipo calcolo",
        modeAdd: "Aggiungi IVA",
        modeRemove: "Scorpora IVA",
        totalLabel: "Totale",
        netLabel: "Netto",
        vatLabel: "IVA",
        invalidAmount: "Inserisci un importo valido maggiore o uguale a 0.",
    },
};

export default vatCalculatorIt;
