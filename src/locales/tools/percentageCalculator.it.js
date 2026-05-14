const percentageCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    currencyAffix: { suffix: "€" },
    title: "Calcolo percentuale online",
    currentPath: "/it/calcolo-percentuale",
    description:
        "Questo calcolatore percentuale ti permette di calcolare rapidamente percentuali, rapporti percentuali, aumenti, riduzioni e sconti. È utile per acquisti, lavoro, scuola, preventivi e calcoli quotidiani.",
    contextualTools: [],
    examples: [
        {
            title: "Calcolare il 20% di un importo",
            description:
                "Seleziona 'Quanto è X% di un numero', inserisci 20 come percentuale e 150 come numero di partenza per ottenere 30.",
        },
        {
            title: "Calcolare uno sconto percentuale",
            description:
                "Usa la modalità prezzo scontato per sapere quanto paghi un prodotto dopo uno sconto, ad esempio 30% su 120 €.",
        },
        {
            title: "Calcolare un aumento o una riduzione",
            description:
                "Puoi aumentare o ridurre un valore di una percentuale, ad esempio per stimare un rincaro del 10% o una riduzione del 15%.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Come si calcola il 20% di un numero?</h3>
            <p>
                Per calcolare il 20% di un numero, moltiplica il numero per 20 e dividi il
                risultato per 100.
            </p>

            <h3 className="font-semibold mt-2">
                Come calcolo che percentuale è un numero rispetto a un totale?
            </h3>
            <p>Dividi la parte per il totale e moltiplica il risultato per 100.</p>

            <h3 className="font-semibold mt-2">Come si calcola uno sconto percentuale?</h3>
            <p>
                Moltiplica il prezzo iniziale per la percentuale di sconto e dividi per 100. Poi
                sottrai lo sconto dal prezzo iniziale.
            </p>
        </>
    ),
    sample: {
        mode: "percentOf",
        value: "100",
        percentage: "22",
        part: "25",
        total: "200",
        base: "100",
        changePercent: "10",
        changeType: "increase",
        price: "120",
        discount: "30",
    },
    labels: {
        modeLabel: "Tipo di calcolo",
        modes: {
            percentOf: "Quanto è X% di un numero",
            ratio: "Un numero è che percentuale del totale",
            change: "Aumenta o riduci un numero del X%",
            discount: "Calcola prezzo scontato",
        },
        percentOf: {
            valueLabel: "Numero di partenza",
            valuePlaceholder: "Es. 100",
            percentLabel: "Percentuale",
            percentPlaceholder: "Es. 22",
            resultTitle: "Risultato",
            detail: ({ percentage, value, result }) => `${percentage}% di ${value} = ${result}`,
        },
        ratio: {
            partLabel: "Parte",
            partPlaceholder: "Es. 25",
            totalLabel: "Totale",
            totalPlaceholder: "Es. 200",
            resultTitle: "Percentuale",
            detail: ({ part, total, result }) => `${part} è il ${result}% di ${total}`,
        },
        change: {
            baseLabel: "Numero di partenza",
            basePlaceholder: "Es. 100",
            percentLabel: "Variazione",
            percentPlaceholder: "Es. 10",
            typeLabel: "Tipo variazione",
            increase: "Aumento",
            decrease: "Riduzione",
            resultTitleIncrease: "Valore aumentato",
            resultTitleDecrease: "Valore ridotto",
            invalidTitle: "Valore non valido",
            invalidDetail: "La riduzione non può essere superiore al 100%.",
            detail: ({ base, sign, percent, result }) => `${base} ${sign} ${percent}% = ${result}`,
        },
        discount: {
            priceLabel: "Prezzo iniziale",
            pricePlaceholder: "Es. 120",
            discountLabel: "Sconto",
            discountPlaceholder: "Es. 30",
            resultTitle: "Prezzo scontato",
            invalidTitle: "Sconto non valido",
            invalidDetail: "Lo sconto non può essere superiore al 100%.",
            detail: ({ savings, price }) => `Sconto: ${savings} su ${price}`,
        },
    },
};

export default percentageCalculatorIt;
