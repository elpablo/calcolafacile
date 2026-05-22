const roiCalculatorEn = {
    lang: "en",
    locale: "en-US",
    currency: "USD",
    title: "ROI Calculator",
    currentPath: "/en/roi-calculator",
    description:
        "Calculate return on investment, net profit, annualized ROI and investment multiple from cost, final value and additional expenses.",
    labels: {
        initialInvestment: "Initial investment",
        initialInvestmentHelp: "The main amount invested or spent.",
        finalValue: "Final value",
        finalValueHelp: "The revenue, exit value or final amount returned by the investment.",
        additionalCosts: "Additional costs",
        additionalCostsHelp: "Optional extra costs such as fees, marketing expenses or operating costs.",
        years: "Years",
        yearsHelp: "Investment duration. Use decimals for shorter periods, for example 0.25 for 3 months.",
        currencySuffix: "$",
        reset: "Reset",
        resultTitle: "ROI result",
        roi: "ROI",
        annualizedRoi: "Annualized ROI",
        netProfit: "Net profit",
        totalInvestment: "Total investment",
        finalValueLabel: "Final value",
        investmentMultiple: "Investment multiple",
        breakEvenFinalValue: "Break-even final value",
        profitMessage: "Positive return",
        lossMessage: "Negative return",
        breakEvenMessage: "Break-even return",
        scenarioTitle: "ROI scenarios",
        scenarioDescription:
            "Compare how ROI changes if the final value is lower or higher than expected.",
        scenarioPessimistic: "Pessimistic",
        scenarioExpected: "Expected",
        scenarioOptimistic: "Optimistic",
        disclaimer:
            "This calculator is for educational purposes only. Results are based on the values entered and do not represent financial advice or guaranteed performance.",
    },
    examples: [
        {
            title: "Basic investment ROI",
            description:
                "Calculate ROI for a $10,000 investment that returns $15,000 after one year.",
            href: "/en/roi-calculator?initialInvestment=10000&finalValue=15000&additionalCosts=0&years=1",
        },
        {
            title: "Marketing campaign ROI",
            description:
                "Estimate campaign ROI with $5,000 of spend, $750 of extra costs and $9,000 of revenue.",
            href: "/en/roi-calculator?initialInvestment=5000&finalValue=9000&additionalCosts=750&years=0.25",
        },
        {
            title: "Annualized ROI",
            description:
                "Compare total ROI and annualized ROI for a $25,000 investment that becomes $40,000 after 5 years.",
            href: "/en/roi-calculator?initialInvestment=25000&finalValue=40000&additionalCosts=0&years=5",
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
            href: "/en/crypto-profit-calculator",
            title: "Crypto Profit Calculator",
            description:
                "Calculate crypto gains, losses and ROI for Bitcoin, Ethereum and other crypto assets.",
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
            <h3 className="font-semibold">
                What is ROI?
            </h3>
            <p>
                ROI means return on investment. It measures profit or loss compared
                with the total amount invested, usually expressed as a percentage.
            </p>

            <h3 className="mt-4 font-semibold">
                How is ROI calculated?
            </h3>
            <p>
                ROI is calculated by subtracting the total investment from the final
                value, then dividing the result by the total investment. This calculator
                also includes optional additional costs.
            </p>

            <h3 className="mt-4 font-semibold">
                What is annualized ROI?
            </h3>
            <p>
                Annualized ROI estimates the average yearly return over the duration
                of the investment. It is useful when comparing investments with
                different time horizons.
            </p>

            <h3 className="mt-4 font-semibold">
                Can I use this for marketing ROI?
            </h3>
            <p>
                Yes. Enter your campaign spend as the initial investment, add any
                extra costs, then use the campaign revenue as the final value.
            </p>

            <h3 className="mt-4 font-semibold">
                Does this calculator send my data anywhere?
            </h3>
            <p>
                No. The calculation runs in your browser. Values may be saved locally
                on your device to restore the last scenario, but they are not sent to
                an external server.
            </p>
        </>
    ),
};

export default roiCalculatorEn;