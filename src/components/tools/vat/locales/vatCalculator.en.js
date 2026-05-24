const vatCalculatorEn = {
    lang: "en",
    locale: "en-IE",
    currency: "USD",
    currencyAffix: { prefix: "$" },
    toolKey: "vat",
    title: "VAT Calculator",
    currentPath: "/en/vat-calculator",
    description:
        "Add or remove VAT instantly with UK, Italy and custom rates. Enter an amount to calculate net, VAT and total values.",
    contextualTools: [],
    examples: [
        {
            title: "Add 20% UK VAT",
            description:
                "Enter a net amount, select 20% and choose Add VAT to get VAT and gross total.",
            href: "/en/vat-calculator?amount=100&rate=20&mode=add",
        },
        {
            title: "Remove VAT from a gross price",
            description:
                "Start from a VAT-inclusive total and choose Remove VAT to calculate net amount and tax.",
            href: "/en/vat-calculator?amount=120&rate=20&mode=remove",
        },
        {
            title: "Use a custom VAT rate",
            description:
                "Enter any VAT percentage, such as 17.5%, 8.25% or 5%, for international scenarios.",
            href: "/en/vat-calculator?amount=250&rate=17.5&mode=add",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">How do you calculate VAT?</h3>
            <p>
                Multiply the net amount by the VAT rate and add it to the total.
            </p>

            <h3 className="font-semibold mt-2">How do you remove VAT?</h3>
            <p>
                Divide the gross amount by 1 plus the VAT rate (e.g. 1.22 for
                22%).
            </p>
        </>
    ),
    sample: {
        amount: 100,
        rate: 20,
        mode: "add",
    },
    labels: {
        amountLabel: "Amount",
        amountPlaceholder: "Ex. 100",
        amountHelp: "Enter the amount to calculate VAT",
        rateLabel: "VAT rate",
        rateHelp: "Use a UK or Italy preset, or enter a custom VAT percentage.",
        ukRatesLabel: "UK rates",
        italyRatesLabel: "Italy rates",
        salesTaxNote:
            "Looking for US sales tax? The USA generally uses sales tax rather than VAT, so calculations may differ.",
        modeLabel: "Calculation type",
        modeAdd: "Add VAT",
        modeRemove: "Remove VAT",
        totalLabel: "Total",
        netLabel: "Net",
        vatLabel: "VAT",
        invalidAmount: "Enter a valid amount greater than or equal to 0.",
    },
};

export default vatCalculatorEn;
