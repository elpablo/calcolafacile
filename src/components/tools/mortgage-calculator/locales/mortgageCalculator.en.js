const mortgageCalculatorEn = {
    lang: "en",
    locale: "en-US",
    currency: "USD",
    title: "Mortgage Calculator",
    currentPath: "/en/mortgage-calculator",
    description:
        "Estimate monthly mortgage payments, total interest, total cost and yearly amortization from loan amount, interest rate and loan term.",
    labels: {
        propertyPrice: "Property price",
        propertyPriceHelp: "The total purchase price of the home or property.",
        downPayment: "Down payment",
        downPaymentHelp: "The amount paid upfront before taking the mortgage.",
        loanAmount: "Loan amount",
        loanAmountHelp: "The mortgage principal borrowed from the lender.",
        annualRate: "Annual interest rate",
        annualRateHelp: "Nominal annual mortgage interest rate.",
        years: "Years",
        yearsHelp: "Mortgage duration in years.",
        currencySuffix: "$",
        percentSuffix: "%",
        reset: "Reset",
        resultTitle: "Mortgage result",
        monthlyPayment: "Monthly payment",
        forMonths: "For {months} monthly payments",
        totalInterest: "Total interest",
        totalPaid: "Total paid",
        totalCost: "Total cost including down payment",
        loanToValue: "Loan-to-value",
        year: "Year",
        principalPaid: "Principal paid",
        interestPaid: "Interest paid",
        remainingBalance: "Remaining balance",
        disclaimer:
            "This calculator is for educational purposes only. It does not include taxes, insurance, closing costs, variable rates or lender fees.",
    },
    examples: [
        {
            title: "30-year mortgage",
            description:
                "Estimate a $250,000 mortgage over 30 years at a 4% annual interest rate.",
            href: "/en/mortgage-calculator?propertyPrice=300000&downPayment=50000&loanAmount=250000&annualRate=4&years=30",
        },
        {
            title: "20-year mortgage",
            description:
                "Compare a shorter 20-year mortgage and see how total interest changes.",
            href: "/en/mortgage-calculator?propertyPrice=300000&downPayment=50000&loanAmount=250000&annualRate=4&years=20",
        },
        {
            title: "Low down payment",
            description:
                "Estimate the payment with a smaller down payment and a higher loan-to-value ratio.",
            href: "/en/mortgage-calculator?propertyPrice=350000&downPayment=35000&loanAmount=315000&annualRate=4.5&years=30",
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
                "Calculate return on investment, net profit and annualized ROI.",
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
            <h2>How is the monthly mortgage payment calculated?</h2>
            <p>
                The monthly payment is calculated using the standard amortizing loan
                formula based on loan amount, annual interest rate and loan duration.
            </p>

            <h2>Does this calculator include taxes and insurance?</h2>
            <p>
                No. This calculator focuses on principal and interest. Property taxes,
                insurance, closing costs and lender fees are not included.
            </p>

            <h2>What is loan-to-value?</h2>
            <p>
                Loan-to-value, or LTV, compares the mortgage amount with the property
                price. A lower LTV usually means a larger down payment and lower lender
                risk.
            </p>

            <h2>What does the yearly amortization table show?</h2>
            <p>
                The yearly table shows how much principal and interest are paid each
                year and the remaining mortgage balance at the end of each year.
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

export default mortgageCalculatorEn;