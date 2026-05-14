const percentageCalculatorEn = {
    lang: "en",
    locale: "en-US",
    currency: "USD",
    currencyAffix: { prefix: "$" },
    title: "Percentage Calculator online",
    currentPath: "/en/percentage-calculator",
    description:
        "This percentage calculator helps you quickly calculate percentages, percentage ratios, increases, reductions and discounts. Useful for shopping, work, school, estimates and everyday calculations.",
    contextualTools: [],
    examples: [
        {
            title: "Calculate 20% of an amount",
            description:
                "Select 'What is X% of a number', enter 20 as the percentage and 150 as the starting number to get 30.",
        },
        {
            title: "Calculate a percentage discount",
            description:
                "Use the discounted price mode to find out how much you pay after a discount, for example 30% off $120.",
        },
        {
            title: "Calculate an increase or decrease",
            description:
                "Increase or reduce a value by a percentage, for example to estimate a 10% price increase or a 15% reduction.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">How do you calculate 20% of a number?</h3>
            <p>Multiply the number by 20 and divide the result by 100.</p>

            <h3 className="font-semibold mt-2">
                How do I calculate what percentage one number is of another?
            </h3>
            <p>Divide the part by the total and multiply the result by 100.</p>

            <h3 className="font-semibold mt-2">How do you calculate a percentage discount?</h3>
            <p>
                Multiply the original price by the discount percentage and divide by 100. Then
                subtract the discount from the original price.
            </p>
        </>
    ),
    sample: {
        mode: "percentOf",
        value: "100",
        percentage: "22",
        part: "25",
        total: "200",
        base: "100",
        changePercent: "10",
        changeType: "increase",
        price: "120",
        discount: "30",
    },
    labels: {
        modeLabel: "Calculation type",
        modes: {
            percentOf: "What is X% of a number?",
            ratio: "What percentage is one number of a total?",
            change: "Increase or decrease a number by X%",
            discount: "Calculate discounted price",
        },
        percentOf: {
            valueLabel: "Starting number",
            valuePlaceholder: "Ex. 100",
            percentLabel: "Percentage",
            percentPlaceholder: "Ex. 22",
            resultTitle: "Result",
            detail: ({ percentage, value, result }) =>
                `${percentage}% of ${value} = ${result}`,
        },
        ratio: {
            partLabel: "Part",
            partPlaceholder: "Ex. 25",
            totalLabel: "Total",
            totalPlaceholder: "Ex. 200",
            resultTitle: "Percentage",
            detail: ({ part, total, result }) => `${part} is ${result}% of ${total}`,
        },
        change: {
            baseLabel: "Starting number",
            basePlaceholder: "Ex. 100",
            percentLabel: "Change",
            percentPlaceholder: "Ex. 10",
            typeLabel: "Change type",
            increase: "Increase",
            decrease: "Decrease",
            resultTitleIncrease: "Increased value",
            resultTitleDecrease: "Reduced value",
            invalidTitle: "Invalid value",
            invalidDetail: "The decrease cannot be greater than 100%.",
            detail: ({ base, sign, percent, result }) => `${base} ${sign} ${percent}% = ${result}`,
        },
        discount: {
            priceLabel: "Original price",
            pricePlaceholder: "Ex. 120",
            discountLabel: "Discount",
            discountPlaceholder: "Ex. 30",
            resultTitle: "Discounted price",
            invalidTitle: "Invalid discount",
            invalidDetail: "The discount cannot be greater than 100%.",
            detail: ({ savings, price }) => `Savings: ${savings} on ${price}`,
        },
    },
};

export default percentageCalculatorEn;
