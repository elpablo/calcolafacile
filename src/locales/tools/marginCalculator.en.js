const marginCalculatorEn = {
    lang: "en",
    locale: "en-US",
    currency: "USD",
    currencyAffix: { prefix: "$" },
    title: "Margin Calculator online",
    currentPath: "/en/margin-calculation",
    description:
        "This margin calculator lets you calculate profit margin from cost and selling price, or find the selling price required to reach a target margin. Useful for freelancers, ecommerce stores and small businesses.",
    contextualTools: [],
    examples: [
        {
            title: "Calculate margin on an online product",
            description:
                "Enter the product cost and selling price to see how much profit you generate and what margin percentage you get.",
        },
        {
            title: "Find the selling price from a target margin",
            description:
                "If you want a 30% margin, enter the product cost and target margin to calculate the minimum selling price.",
        },
        {
            title: "Check margin and profit before publishing a price list",
            description:
                "Use the calculator to quickly verify whether a price covers costs and leaves a sustainable margin for your business.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">How do you calculate profit margin?</h3>
            <p>
                Profit margin is calculated by dividing profit by the selling price and multiplying
                the result by 100.
            </p>

            <h3 className="font-semibold mt-2">
                What is the difference between margin and markup?
            </h3>
            <p>
                Margin measures profit compared to the selling price, while markup measures the
                increase compared to cost.
            </p>

            <h3 className="font-semibold mt-2">
                How do I calculate selling price from a target margin?
            </h3>
            <p>
                Divide the cost by 1 minus the target margin expressed as a decimal. For example,
                with a cost of $70 and a 30% margin, the selling price is $100.
            </p>
        </>
    ),
    sample: {
        mode: "fromPrice",
        cost: "60",
        sellingPrice: "100",
        targetMargin: "30",
    },
    labels: {
        modeLabel: "Calculation type",
        modeFromPrice: "Calculate margin from cost and price",
        modeTargetMargin: "Calculate price from target margin",
        costLabel: "Cost",
        costPlaceholder: "Ex. 60",
        costHelp: "Enter the product cost",
        priceLabel: "Selling price",
        pricePlaceholder: "Ex. 100",
        targetMarginLabel: "Target margin",
        targetMarginPlaceholder: "Ex. 30",
        profitLabel: "Profit",
        marginLabel: "Margin",
        invalidFromPrice: "Enter a valid cost (≥ 0) and a selling price greater than 0.",
        invalidTargetMargin: "Enter a valid cost (≥ 0) and a target margin between 0% and 99.99%.",
        detailFromPrice: ({ cost, price, margin }) =>
            `With a cost of ${cost} and a selling price of ${price}, the margin is ${margin}%.`,
        detailTargetMargin: ({ cost, margin, price }) =>
            `With a cost of ${cost} and a target margin of ${margin}%, the selling price should be ${price}.`,
    },
};

export default marginCalculatorEn;
