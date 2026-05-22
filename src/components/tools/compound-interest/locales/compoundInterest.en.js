const compoundInterestEn = {
    lang: "en",
    locale: "en-US",
    currency: "USD",
    title: "Compound Interest Calculator",
    currentPath: "/en/compound-interest",
    description:
        "Calculate compound interest on an investment, add optional monthly contributions and visualize how your capital may grow year by year.",
    labels: {
        principal: "Initial capital",
        principalHelp: "The amount you invest at the beginning.",
        monthlyContribution: "Monthly contribution",
        monthlyContributionHelp: "Optional amount added every month.",
        annualRate: "Average annual return",
        annualRateHelp: "Expected average yearly return. It is not guaranteed.",
        years: "Years",
        yearsHelp: "Investment duration from 1 to 100 years.",
        yearsShort: "years",
        compoundingFrequency: "Compounding frequency",
        compoundingFrequencyHelp:
            "Monthly compounding applies interest every month. Yearly compounding applies it once per year.",
        monthlyCompounding: "Monthly",
        yearlyCompounding: "Yearly",
        currencySuffix: "$",
        percentSuffix: "%",
        reset: "Reset",
        resultTitle: "Compound interest result",
        finalBalance: "Final balance",
        totalContributions: "Total invested",
        totalInterest: "Interest earned",
        growthMultiple: "Growth multiple",
        chartTitle: "Growth curve",
        chartDescription: "Estimated balance at the end of each year.",
        year: "Year",
        contributions: "Contributions",
        interest: "Interest",
        endBalance: "End balance",
        disclaimer:
            "This calculator is for educational purposes only. Returns are estimates based on the values entered and do not represent financial advice or guaranteed performance.",
    },
    examples: [
        {
            title: "Monthly investing plan",
            description:
                "Start with $5,000, add $200 per month and estimate the result after 20 years at an average annual return of 5%.",
            href: "/en/compound-interest?principal=5000&monthlyContribution=200&annualRate=5&years=20&compoundingFrequency=monthly",
        },
        {
            title: "One-time investment",
            description:
                "Estimate how $10,000 could grow over 15 years with a 4% average annual return and no extra contributions.",
            href: "/en/compound-interest?principal=10000&monthlyContribution=0&annualRate=4&years=15&compoundingFrequency=yearly",
        },
        {
            title: "Long-term savings scenario",
            description:
                "Compare the effect of time by simulating a 30-year plan with regular monthly contributions.",
            href: "/en/compound-interest?principal=1000&monthlyContribution=150&annualRate=6&years=30&compoundingFrequency=monthly",
        },
    ],
    contextualTools: [
        {
            href: "/en/percentage-calculator",
            title: "Percentage Calculator",
            description:
                "Calculate percentage increases, decreases, discounts and proportional values.",
        },
        {
            href: "/en/margin-calculator",
            title: "Margin Calculator",
            description:
                "Calculate profit margin from cost and selling price.",
        },
        {
            href: "/en/markup-calculator",
            title: "Markup Calculator",
            description:
                "Calculate markup and selling price from cost and desired profit.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">
                What is compound interest?
            </h3>
            <p>
                Compound interest means that interest is calculated not only on the
                initial capital, but also on the interest accumulated over time. This
                is why long time horizons can have a strong impact on the final result.
            </p>

            <h3 className="mt-4 font-semibold">
                Can I include monthly contributions?
            </h3>
            <p>
                Yes. Enter a monthly contribution to estimate how regular investing
                may change the final balance compared with a one-time investment.
            </p>

            <h3 className="mt-4 font-semibold">
                Is the annual return guaranteed?
            </h3>
            <p>
                No. The annual return is only an assumption used for the calculation.
                Real investments can go up or down, and past performance does not
                guarantee future results.
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

export default compoundInterestEn;