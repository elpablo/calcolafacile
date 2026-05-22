export const cryptoProfitCalculatorExamples = [
    {
        key: "bitcoin-profit",
        title: "Bitcoin profit scenario",
        description:
            "Calculate the profit from buying 0.1 BTC at 30,000 and selling it at 65,000, with no trading fees.",
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
        title: "Ethereum with fees",
        description:
            "Estimate the net result from buying 2 ETH at 1,800 and selling at 3,200, including buy and sell fees.",
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
        title: "Loss scenario",
        description:
            "See how the calculator handles a negative result when the sell price is lower than the buy price.",
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