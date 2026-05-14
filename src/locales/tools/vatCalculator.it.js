const vatCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    currencyAffix: { suffix: "€" },
    title: "Calcolatore IVA online (scorporo e aggiunta)",
    currentPath: "/it/calcolatore-iva",
    description:
        "Questo calcolatore IVA ti permette di calcolare facilmente l'IVA al 22%, 10% e 4% in Italia, sia per aggiungere l'imposta a un importo netto, sia per scorporarla da un totale lordo.",
    contextualTools: [],
    examples: [
        {
            title: "Aggiungere l'IVA al 22% a un importo netto",
            description:
                "Inserisci un importo netto, scegli l'aliquota 22% e seleziona 'Aggiungi IVA' per ottenere IVA e totale lordo.",
        },
        {
            title: "Scorporare l'IVA da un prezzo lordo",
            description:
                "Se hai un totale già comprensivo di IVA, seleziona 'Scorpora IVA' per calcolare imponibile netto e imposta inclusa.",
        },
        {
            title: "Calcolare IVA al 10% o al 4%",
            description:
                "Puoi usare le aliquote ridotte per prodotti o servizi soggetti a IVA agevolata, confrontando netto, IVA e totale.",
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
        amount: "",
        rate: 22,
        mode: "add",
    },
    labels: {
        amountLabel: "Importo (€)",
        amountPlaceholder: "Es. 100",
        amountHelp: "Inserisci l'importo su cui calcolare l'IVA",
        rateLabel: "Aliquota IVA",
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
