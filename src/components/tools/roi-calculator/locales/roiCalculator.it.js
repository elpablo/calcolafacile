const roiCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    title: "Calcolatore ROI",
    currentPath: "/it/calcolatore-roi",
    description:
        "Calcola ritorno sull’investimento, profitto netto, ROI annualizzato e multiplo investimento partendo da costo iniziale, valore finale e spese aggiuntive.",
    labels: {
        initialInvestment: "Investimento iniziale",
        initialInvestmentHelp: "L’importo principale investito o speso.",
        finalValue: "Valore finale",
        finalValueHelp: "Ricavo, valore finale o importo restituito dall’investimento.",
        additionalCosts: "Costi aggiuntivi",
        additionalCostsHelp: "Costi opzionali extra come commissioni, marketing o spese operative.",
        years: "Anni",
        yearsHelp: "Durata dell’investimento. Usa valori decimali per periodi più brevi, ad esempio 0,25 per 3 mesi.",
        currencySuffix: "€",
        reset: "Ripristina",
        resultTitle: "Risultato ROI",
        roi: "ROI",
        annualizedRoi: "ROI annualizzato",
        netProfit: "Profitto netto",
        totalInvestment: "Investimento totale",
        finalValueLabel: "Valore finale",
        investmentMultiple: "Multiplo investimento",
        breakEvenFinalValue: "Valore finale di pareggio",
        profitMessage: "Rendimento positivo",
        lossMessage: "Rendimento negativo",
        breakEvenMessage: "Rendimento in pareggio",
        scenarioTitle: "Scenari ROI",
        scenarioDescription:
            "Confronta come cambia il ROI se il valore finale è inferiore o superiore rispetto alle aspettative.",
        scenarioPessimistic: "Pessimistico",
        scenarioExpected: "Atteso",
        scenarioOptimistic: "Ottimistico",
        disclaimer:
            "Questo calcolatore ha solo finalità educative. I risultati dipendono dai valori inseriti e non rappresentano consulenza finanziaria né performance garantite.",
    },
    examples: [
        {
            title: "ROI investimento base",
            description:
                "Calcola il ROI di un investimento da 10.000 € che restituisce 15.000 € dopo un anno.",
            href: "/it/calcolatore-roi?initialInvestment=10000&finalValue=15000&additionalCosts=0&years=1",
        },
        {
            title: "ROI campagna marketing",
            description:
                "Stima il ROI di una campagna con 5.000 € di spesa, 750 € di costi extra e 9.000 € di ricavi.",
            href: "/it/calcolatore-roi?initialInvestment=5000&finalValue=9000&additionalCosts=750&years=0.25",
        },
        {
            title: "ROI annualizzato",
            description:
                "Confronta ROI totale e ROI annualizzato per un investimento da 25.000 € che diventa 40.000 € dopo 5 anni.",
            href: "/it/calcolatore-roi?initialInvestment=25000&finalValue=40000&additionalCosts=0&years=5",
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
            href: "/it/calcolatore-profitto-crypto",
            title: "Calcolatore profitto crypto",
            description:
                "Calcola guadagni, perdite e ROI per Bitcoin, Ethereum e altre crypto.",
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
            <h2>Che cos’è il ROI?</h2>
            <p>
                ROI significa ritorno sull’investimento. Misura profitto o perdita
                rispetto al capitale investito ed è normalmente espresso come percentuale.
            </p>

            <h2>Come si calcola il ROI?</h2>
            <p>
                Il ROI si calcola sottraendo l’investimento totale dal valore finale,
                quindi dividendo il risultato per l’investimento totale. Questo
                calcolatore include anche eventuali costi aggiuntivi.
            </p>

            <h2>Che cos’è il ROI annualizzato?</h2>
            <p>
                Il ROI annualizzato stima il rendimento medio annuo durante la durata
                dell’investimento. È utile per confrontare investimenti con orizzonti
                temporali differenti.
            </p>

            <h2>Posso usarlo per il ROI marketing?</h2>
            <p>
                Sì. Inserisci il costo della campagna come investimento iniziale,
                aggiungi eventuali costi extra e usa i ricavi della campagna come
                valore finale.
            </p>

            <h2>Questo calcolatore invia i miei dati da qualche parte?</h2>
            <p>
                No. Il calcolo avviene nel browser. I valori possono essere salvati
                localmente sul dispositivo per ripristinare l’ultimo scenario, ma non
                vengono inviati a server esterni.
            </p>
        </>
    ),
};

export default roiCalculatorIt;