const cryptoProfitCalculatorEn = {
    lang: "en",
    locale: "en-US",
    currency: "USD",
    title: "Crypto Profit Calculator",
    currentPath: "/en/crypto-profit-calculator",
    description:
        "Calculate crypto profit, loss and ROI from buy price, sell price, quantity and trading fees.",
    labels: {
        cryptoSymbol: "Crypto symbol",
        cryptoSymbolHelp: "Example: BTC, ETH, SOL or any other crypto ticker.",
        quantity: "Quantity",
        quantityHelp: "How many units of the crypto asset you bought or sold.",
        buyPrice: "Buy price",
        buyPriceHelp: "Price paid for one unit when you bought the asset.",
        sellPrice: "Sell price",
        sellPriceHelp: "Current or expected selling price for one unit.",
        buyFee: "Buy fee",
        buyFeeHelp: "Optional fee paid when buying.",
        sellFee: "Sell fee",
        sellFeeHelp: "Optional fee paid when selling.",
        currencySuffix: "$",
        reset: "Reset",
        resultTitle: "Crypto profit result",
        profit: "Profit / loss",
        roi: "ROI",
        totalCost: "Total cost",
        totalProceeds: "Total proceeds",
        priceChange: "Price change",
        breakEvenSellPrice: "Break-even sell price",
        profitPerUnit: "Profit per unit",
        grossCost: "Gross cost",
        grossProceeds: "Gross proceeds",
        profitMessage: "Estimated profit",
        lossMessage: "Estimated loss",
        breakEvenMessage: "Break-even result",
        whatIfTitle: "What-if scenarios",
        whatIfDescription:
            "Compare how the result changes if the sell price moves below or above the current value.",
        scenarioBearish: "Bearish",
        scenarioCurrent: "Current",
        scenarioBullish: "Bullish",
        disclaimer:
            "This calculator is for educational purposes only. Crypto markets are volatile and the result does not represent financial advice or guaranteed performance.",
    },
    examples: [
        {
            title: "Bitcoin profit scenario",
            description:
                "Calculate the profit from buying 0.1 BTC at $30,000 and selling it at $65,000.",
            href: "/en/crypto-profit-calculator?cryptoSymbol=BTC&buyPrice=30000&sellPrice=65000&quantity=0.1&buyFee=0&sellFee=0",
        },
        {
            title: "Ethereum with trading fees",
            description:
                "Estimate the net result from buying 2 ETH at $1,800 and selling at $3,200, including fees.",
            href: "/en/crypto-profit-calculator?cryptoSymbol=ETH&buyPrice=1800&sellPrice=3200&quantity=2&buyFee=12&sellFee=18",
        },
        {
            title: "Crypto loss scenario",
            description:
                "See how fees and a lower selling price affect the final result.",
            href: "/en/crypto-profit-calculator?cryptoSymbol=SOL&buyPrice=180&sellPrice=120&quantity=10&buyFee=5&sellFee=5",
        },
    ],
    contextualTools: [
        {
            href: "/en/compound-interest-calculator",
            title: "Compound Interest Calculator",
            description:
                "Simulate investment growth with annual returns and monthly contributions.",
        },
        {
            href: "/en/roi-calculator",
            title: "ROI Calculator",
            description:
                "Calculate return on investment from cost, revenue and profit.",
        },
        {
            href: "/en/percentage-calculator",
            title: "Percentage Calculator",
            description:
                "Calculate percentage increases, decreases, discounts and proportional values.",
        },
    ],
    faq: (
        <>
            <h2>How is crypto profit calculated?</h2>
            <p>
                Crypto profit is calculated by subtracting the total cost of the
                purchase from the net proceeds of the sale. The calculator includes
                optional buy and sell fees in the result.
            </p>

            <h2>What is ROI in a crypto trade?</h2>
            <p>
                ROI means return on investment. It shows the profit or loss as a
                percentage of the total amount invested, including the buy fee.
            </p>

            <h2>Can I use this calculator for Bitcoin and Ethereum?</h2>
            <p>
                Yes. You can enter BTC, ETH, SOL or any other crypto ticker manually.
                The calculation uses the prices and quantity you provide.
            </p>

            <h2>Does this calculator use live crypto prices?</h2>
            <p>
                No. This tool does not fetch live market prices. Enter the buy and
                sell prices you want to compare.
            </p>

            <h2>Does this calculator send my data anywhere?</h2>
            <p>
                No. The calculation runs in your browser. Values may be saved locally
                on your device to restore the last scenario, but they are not sent to
                an external server.
            </p>
        </>
    ),
};

export default cryptoProfitCalculatorEn;
