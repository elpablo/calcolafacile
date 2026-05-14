const marginCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    currencyAffix: { suffix: "€" },
    title: "Calcolo margine online",
    currentPath: "/it/calcolo-margine",
    description:
        "Questo calcolatore margine ti permette di calcolare il margine di profitto partendo dal costo e dal prezzo di vendita, oppure di trovare il prezzo di vendita necessario per ottenere un margine desiderato. È utile per freelance, ecommerce, negozi e piccole attività.",
    contextualTools: [],
    examples: [
        {
            title: "Calcolare il margine su un prodotto venduto online",
            description:
                "Inserisci il costo di acquisto e il prezzo di vendita per sapere quanto profitto generi e quale margine percentuale ottieni.",
        },
        {
            title: "Trovare il prezzo di vendita partendo da un margine desiderato",
            description:
                "Se vuoi ottenere un margine del 30%, inserisci il costo del prodotto e il margine target per calcolare il prezzo minimo di vendita.",
        },
        {
            title: "Confrontare margine e profitto prima di pubblicare un listino",
            description:
                "Usa il calcolatore per verificare rapidamente se un prezzo copre i costi e lascia un margine sostenibile per la tua attività.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Come si calcola il margine?</h3>
            <p>
                Il margine si calcola dividendo il profitto per il prezzo di vendita e
                moltiplicando il risultato per 100.
            </p>

            <h3 className="font-semibold mt-2">Qual è la differenza tra margine e markup?</h3>
            <p>
                Il margine misura il profitto rispetto al prezzo di vendita, mentre il markup
                misura il ricarico rispetto al costo.
            </p>

            <h3 className="font-semibold mt-2">
                Come calcolo il prezzo di vendita partendo dal margine desiderato?
            </h3>
            <p>
                Dividi il costo per 1 meno il margine desiderato espresso in forma decimale. Ad
                esempio, con un costo di 70 € e un margine del 30%, il prezzo di vendita è 100 €.
            </p>
        </>
    ),
    sample: {
        mode: "fromPrice",
        cost: "60",
        sellingPrice: "100",
        targetMargin: "30",
    },
    labels: {
        modeLabel: "Tipo di calcolo",
        modeFromPrice: "Calcola margine da costo e prezzo",
        modeTargetMargin: "Calcola prezzo da margine desiderato",
        costLabel: "Costo (€)",
        costPlaceholder: "Es. 60",
        costHelp: "Inserisci il costo del prodotto",
        priceLabel: "Prezzo di vendita (€)",
        pricePlaceholder: "Es. 100",
        targetMarginLabel: "Margine desiderato (%)",
        targetMarginPlaceholder: "Es. 30",
        profitLabel: "Profitto",
        marginLabel: "Margine",
        invalidFromPrice: "Inserisci un costo valido (≥ 0) e un prezzo di vendita maggiore di 0.",
        invalidTargetMargin:
            "Inserisci un costo valido (≥ 0) e un margine desiderato compreso tra 0% e 99,99%.",
        detailFromPrice: ({ cost, price, margin }) =>
            `Con un costo di ${cost} e un prezzo di vendita di ${price}, il margine è pari al ${margin}%.`,
        detailTargetMargin: ({ cost, margin, price }) =>
            `Con un costo di ${cost} e un margine desiderato del ${margin}%, il prezzo di vendita dovrebbe essere ${price}.`,
    },
};

export default marginCalculatorIt;
