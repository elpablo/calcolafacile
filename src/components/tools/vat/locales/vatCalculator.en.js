const vatCalculatorEn = {
    lang: "en",
    locale: "en-IE",
    currency: "USD",
    currencyAffix: { prefix: "$" },
    title: "VAT Calculator online (add or remove VAT)",
    currentPath: "/en/vat-calculator",
    description:
        "Calculate VAT easily at 22%, 10% or 4%. Add VAT to a net amount or remove VAT from a gross total.",
    contextualTools: [],
    examples: [
        {
            title: "Add 22% VAT to a net amount",
            description:
                "Enter a net amount, select 22% and choose 'Add VAT' to get VAT and gross total.",
        },
        {
            title: "Remove VAT from a gross price",
            description:
                "If you have a total including VAT, select 'Remove VAT' to calculate net amount and tax.",
        },
        {
            title: "Calculate reduced VAT rates",
            description:
                "Use 10% or 4% rates to compare net, VAT and total for reduced taxation scenarios.",
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
        amount: "",
        rate: 22,
        mode: "add",
    },
    labels: {
        amountLabel: "Amount",
        amountPlaceholder: "Ex. 100",
        amountHelp: "Enter the amount to calculate VAT",
        rateLabel: "VAT rate",
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
