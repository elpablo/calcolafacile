export const cryptoProfitCalculatorExamples = [
    {
        key: "bitcoin-profit",
        title: {
            en: "Bitcoin profit scenario",
            it: "Scenario profitto Bitcoin",
        },
        description: {
            en: "Calculate the profit from buying 0.1 BTC at 30,000 and selling it at 65,000, with no trading fees.",
            it: "Calcola il profitto acquistando 0,1 BTC a 30.000 e vendendo a 65.000 senza commissioni di trading.",
        },
        params: {
            cryptoSymbol: "BTC",
            buyPrice: 30000,
            sellPrice: 65000,
            quantity: 0.1,
            buyFee: 0,
            sellFee: 0,
        },
    },
    {
        key: "ethereum-with-fees",
        title: {
            en: "Ethereum with fees",
            it: "Ethereum con commissioni",
        },
        description: {
            en: "Estimate the net result from buying 2 ETH at 1,800 and selling at 3,200, including buy and sell fees.",
            it: "Stima il risultato netto acquistando 2 ETH a 1.800 e vendendo a 3.200 includendo commissioni di acquisto e vendita.",
        },
        params: {
            cryptoSymbol: "ETH",
            buyPrice: 1800,
            sellPrice: 3200,
            quantity: 2,
            buyFee: 12,
            sellFee: 18,
        },
    },
    {
        key: "loss-scenario",
        title: {
            en: "Loss scenario",
            it: "Scenario in perdita",
        },
        description: {
            en: "See how the calculator handles a negative result when the sell price is lower than the buy price.",
            it: "Verifica come il calcolatore gestisce una perdita quando il prezzo di vendita è inferiore al prezzo di acquisto.",
        },
        params: {
            cryptoSymbol: "SOL",
            buyPrice: 180,
            sellPrice: 120,
            quantity: 10,
            buyFee: 5,
            sellFee: 5,
        },
    },
];