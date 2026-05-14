const reverseDiscountCalculatorEn = {
    lang: "en",
    locale: "en-US",
    currency: "USD",
    currencyAffix: { prefix: "$" },
    title: "Inverse Discount Calculator online",
    currentPath: "/en/inverse-discount-calculation",
    description:
        "Use this inverse discount calculator to find the original price starting from the discounted price and the discount percentage.",
    contextualTools: [],
    examples: [
        {
            title: "Find the original price during a sale",
            description:
                "If a product costs $70 after a 30% discount, enter the discounted price and discount percentage to calculate the original price.",
        },
        {
            title: "Check if a listed discount is correct",
            description:
                "Use the inverse discount calculation to verify whether the original price shown by a store matches the applied discount.",
        },
        {
            title: "Calculate savings and starting price",
            description:
                "The tool shows both the original price and the amount saved, useful when comparing deals and promotions.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">
                How do you calculate the original price from a discount?
            </h3>
            <p>Divide the discounted price by 1 minus the discount percentage divided by 100.</p>

            <h3 className="mt-2 font-semibold">
                What is an inverse discount calculation useful for?
            </h3>
            <p>
                It helps you find the starting price when you know the final price and the discount
                that was applied.
            </p>
        </>
    ),
    sample: {
        discountedPrice: "70",
        discount: "30",
    },
    labels: {
        discountedPriceLabel: "Discounted price",
        discountedPricePlaceholder: "Ex. 70",
        discountedPriceHelp: "Enter the final price after the discount",
        discountLabel: "Applied discount",
        discountPlaceholder: "Ex. 30",
        originalPriceLabel: "Original price",
        savingsLabel: "Savings",
        invalid: "Enter a valid discounted price and a discount between 0% and 99.99%.",
        detail: ({ discountedPrice, discount, originalPrice }) =>
            `With a discounted price of ${discountedPrice} and a discount of ${discount}%, the original price was ${originalPrice}.`,
    },
};

export default reverseDiscountCalculatorEn;
