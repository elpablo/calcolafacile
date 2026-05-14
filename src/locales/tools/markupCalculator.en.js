const markupCalculatorEn = {
    lang: "en",
    locale: "en-US",
    currency: "USD",
    currencyAffix: { prefix: "$" },
    title: "Markup Calculator online",
    currentPath: "/en/markup-calculation",
    description:
        "This markup calculator lets you calculate percentage markup from cost and selling price, or find the selling price required to apply a target markup. Useful for ecommerce stores, freelancers and small businesses.",
    contextualTools: [],
    examples: [
        {
            title: "Calculate markup from cost and selling price",
            description:
                "Enter the product cost and selling price to see the profit and markup percentage.",
        },
        {
            title: "Find the selling price from a target markup",
            description:
                "If you want a 50% markup, enter the product cost and target markup to calculate the selling price.",
        },
        {
            title: "Compare markup and margin before pricing a product",
            description:
                "Use markup to understand the increase over cost, then compare it with margin to avoid pricing mistakes.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">How do you calculate markup?</h3>
            <p>
                Markup is calculated by dividing profit by cost and multiplying the result by 100.
            </p>

            <h3 className="font-semibold mt-2">
                What is the difference between markup and margin?
            </h3>
            <p>
                Markup measures the increase compared to cost, while margin measures profit
                compared to the selling price.
            </p>

            <h3 className="font-semibold mt-2">
                How do I calculate selling price from a target markup?
            </h3>
            <p>
                Multiply the cost by 1 plus the target markup expressed as a decimal. For example,
                with a cost of $60 and a 50% markup, the selling price is $90.
            </p>
        </>
    ),
    sample: {
        mode: "fromPrice",
        cost: "60",
        sellingPrice: "100",
        targetMarkup: "50",
    },
    labels: {
        modeLabel: "Calculation type",
        modeFromPrice: "Calculate markup from cost and price",
        modeTargetMarkup: "Calculate price from target markup",
        costLabel: "Cost",
        costPlaceholder: "Ex. 60",
        costHelp: "Enter the product cost",
        priceLabel: "Selling price",
        pricePlaceholder: "Ex. 100",
        targetMarkupLabel: "Target markup",
        targetMarkupPlaceholder: "Ex. 50",
        profitLabel: "Profit",
        markupLabel: "Markup",
        invalidFromPrice: "Enter a cost greater than 0 and a valid selling price (≥ 0).",
        invalidTargetMarkup: "Enter a cost greater than 0 and a valid target markup (≥ 0%).",
        detailFromPrice: ({ cost, price, markup }) =>
            `With a cost of ${cost} and a selling price of ${price}, the markup is ${markup}%.`,
        detailTargetMarkup: ({ cost, markup, price }) =>
            `With a cost of ${cost} and a target markup of ${markup}%, the selling price should be ${price}.`,
    },
};

export default markupCalculatorEn;
