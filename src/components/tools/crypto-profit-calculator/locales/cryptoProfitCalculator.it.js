const cryptoProfitCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    title: "Calcolatore profitto crypto",
    currentPath: "/it/calcolatore-profitto-crypto",
    description:
        "Calcola profitto, perdita e ROI di una crypto partendo da prezzo di acquisto, prezzo di vendita, quantità e commissioni.",
    labels: {
        cryptoSymbol: "Simbolo crypto",
        cryptoSymbolHelp: "Esempio: BTC, ETH, SOL o qualsiasi altro ticker crypto.",
        quantity: "Quantità",
        quantityHelp: "Quante unità della crypto hai comprato o venduto.",
        buyPrice: "Prezzo di acquisto",
        buyPriceHelp: "Prezzo pagato per una unità al momento dell’acquisto.",
        sellPrice: "Prezzo di vendita",
        sellPriceHelp: "Prezzo attuale o previsto per una unità al momento della vendita.",
        buyFee: "Commissione acquisto",
        buyFeeHelp: "Commissione opzionale pagata in fase di acquisto.",
        sellFee: "Commissione vendita",
        sellFeeHelp: "Commissione opzionale pagata in fase di vendita.",
        currencySuffix: "€",
        reset: "Ripristina",
        resultTitle: "Risultato profitto crypto",
        profit: "Profitto / perdita",
        roi: "ROI",
        totalCost: "Costo totale",
        totalProceeds: "Ricavo totale",
        priceChange: "Variazione prezzo",
        breakEvenSellPrice: "Prezzo di pareggio",
        profitPerUnit: "Profitto per unità",
        grossCost: "Costo lordo",
        grossProceeds: "Ricavo lordo",
        profitMessage: "Profitto stimato",
        lossMessage: "Perdita stimata",
        breakEvenMessage: "Risultato in pareggio",
        whatIfTitle: "Scenari what-if",
        whatIfDescription:
            "Confronta come cambia il risultato se il prezzo di vendita scende o sale rispetto al valore inserito.",
        scenarioBearish: "Ribassista",
        scenarioCurrent: "Attuale",
        scenarioBullish: "Rialzista",
        disclaimer:
            "Questo calcolatore ha solo finalità educative. I mercati crypto sono volatili e il risultato non rappresenta consulenza finanziaria né performance garantite.",
    },
    examples: [
        {
            title: "Scenario profitto Bitcoin",
            description:
                "Calcola il profitto acquistando 0,1 BTC a 30.000 € e vendendoli a 65.000 €.",
            href: "/it/calcolatore-profitto-crypto?cryptoSymbol=BTC&buyPrice=30000&sellPrice=65000&quantity=0.1&buyFee=0&sellFee=0",
        },
        {
            title: "Ethereum con commissioni",
            description:
                "Stima il risultato netto acquistando 2 ETH a 1.800 € e vendendoli a 3.200 €, includendo le commissioni.",
            href: "/it/calcolatore-profitto-crypto?cryptoSymbol=ETH&buyPrice=1800&sellPrice=3200&quantity=2&buyFee=12&sellFee=18",
        },
        {
            title: "Scenario crypto in perdita",
            description:
                "Guarda come commissioni e prezzo di vendita più basso incidono sul risultato finale.",
            href: "/it/calcolatore-profitto-crypto?cryptoSymbol=SOL&buyPrice=180&sellPrice=120&quantity=10&buyFee=5&sellFee=5",
        },
    ],
    contextualTools: [
        {
            href: "/it/interesse-composto-calcolatore",
            title: "Calcolatore interesse composto",
            description:
                "Simula la crescita di un investimento con rendimento annuo e versamenti mensili.",
        },
        {
            href: "/it/calcolatore-roi",
            title: "Calcolatore ROI",
            description:
                "Calcola il ritorno sull’investimento partendo da costo, ricavo e profitto.",
        },
        {
            href: "/it/calcolo-percentuale",
            title: "Calcolo percentuale",
            description:
                "Calcola aumenti, diminuzioni, sconti e valori proporzionali.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">
                Come si calcola il profitto crypto?
            </h3>
            <p>
                Il profitto crypto si calcola sottraendo il costo totale di acquisto
                dal ricavo netto della vendita. Il calcolatore include anche eventuali
                commissioni di acquisto e vendita.
            </p>

            <h3 className="mt-4 font-semibold">
                Che cos’è il ROI in un investimento crypto?
            </h3>
            <p>
                ROI significa ritorno sull’investimento. Indica profitto o perdita
                come percentuale del capitale investito, includendo la commissione di
                acquisto.
            </p>

            <h3 className="mt-4 font-semibold">
                Posso usarlo per Bitcoin ed Ethereum?
            </h3>
            <p>
                Sì. Puoi inserire manualmente BTC, ETH, SOL o qualsiasi altro ticker
                crypto. Il calcolo usa prezzi e quantità che inserisci tu.
            </p>

            <h3 className="mt-4 font-semibold">
                Questo calcolatore usa prezzi crypto in tempo reale?
            </h3>
            <p>
                No. Questo strumento non scarica prezzi di mercato in tempo reale.
                Inserisci tu prezzo di acquisto e prezzo di vendita da confrontare.
            </p>

            <h3 className="mt-4 font-semibold">
                Questo calcolatore invia i miei dati da qualche parte?
            </h3>
            <p>
                No. Il calcolo avviene nel browser. I valori possono essere salvati
                localmente sul tuo dispositivo per ripristinare l’ultimo scenario, ma
                non vengono inviati a un server esterno.
            </p>
        </>
    ),
};

export default cryptoProfitCalculatorIt;