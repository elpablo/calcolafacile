const markupCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    currencyAffix: { suffix: "€" },
    title: "Calcolo markup online",
    currentPath: "/it/calcolo-markup",
    description:
        "Questo calcolatore markup ti permette di calcolare il ricarico percentuale partendo dal costo e dal prezzo di vendita, oppure di trovare il prezzo di vendita necessario per applicare un markup desiderato. È utile per ecommerce, negozi, freelance e piccole attività.",
    contextualTools: [],
    examples: [],
    faq: (
        <>
            <h3 className="font-semibold">Come si calcola il markup?</h3>
            <p>
                Il markup si calcola dividendo il profitto per il costo e moltiplicando il
                risultato per 100.
            </p>

            <h3 className="font-semibold mt-2">Qual è la differenza tra markup e margine?</h3>
            <p>
                Il markup misura il ricarico rispetto al costo, mentre il margine misura il
                profitto rispetto al prezzo di vendita.
            </p>

            <h3 className="font-semibold mt-2">
                Come calcolo il prezzo di vendita partendo dal markup desiderato?
            </h3>
            <p>
                Moltiplica il costo per 1 più il markup espresso in forma decimale. Ad esempio, con
                un costo di 60 € e un markup del 50%, il prezzo di vendita è 90 €.
            </p>
        </>
    ),
    sample: {
        mode: "fromPrice",
        cost: "60",
        sellingPrice: "100",
        targetMarkup: "50",
    },
    labels: {
        modeLabel: "Tipo di calcolo",
        modeFromPrice: "Calcola markup da costo e prezzo",
        modeTargetMarkup: "Calcola prezzo da markup desiderato",
           costLabel: "Costo (€)",
        costPlaceholder: "Es. 60",
        costHelp: "Inserisci il costo del prodotto",
           priceLabel: "Prezzo di vendita (€)",
        pricePlaceholder: "Es. 100",
        targetMarkupLabel: "Markup desiderato",
        targetMarkupPlaceholder: "Es. 50",
        profitLabel: "Profitto",
           markupLabel: "Markup (%)",
        invalidFromPrice: "Inserisci un costo maggiore di 0 e un prezzo di vendita valido (≥ 0).",
        invalidTargetMarkup: "Inserisci un costo maggiore di 0 e un markup desiderato valido (≥ 0%).",
        detailFromPrice: ({ cost, price, markup }) =>
            `Con un costo di ${cost} e un prezzo di vendita di ${price}, il markup è pari al ${markup}%.`,
        detailTargetMarkup: ({ cost, markup, price }) =>
            `Con un costo di ${cost} e un markup desiderato del ${markup}%, il prezzo di vendita dovrebbe essere ${price}.`,
    },
};

export default markupCalculatorIt;
