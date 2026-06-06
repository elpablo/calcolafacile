const vatRemovalCalculatorEn = {
    lang: "en",
    locale: "en-IE",
    currency: "USD",
    toolKey: "vatRemoval",
    title: "VAT Removal Calculator",
    currentPath: "/en/vat-removal-calculator",
    description:
        "Remove VAT from a price in seconds. Enter a VAT-inclusive amount and rate to see the price without VAT and the VAT removed from the total.",
    contextualTools: [
        {
            href: "/en/vat-calculator",
            title: "VAT Calculator",
            description: "Add VAT to a net amount or remove it from a gross price.",
        },
        {
            href: "/en/vat-reverse-calculator",
            title: "VAT Reverse Calculator",
            description: "Work backwards from a gross price to find the net amount.",
        },
        {
            href: "/en/vat-tools",
            title: "VAT Tools",
            description: "Browse the full VAT calculator toolkit.",
        },
    ],
    examples: [
        {
            title: "Remove VAT from 120 at 20%",
            description:
                "Use VAT-inclusive amount 120 and VAT rate 20% to get price without VAT 100 and VAT removed 20.",
            href: "/en/vat-removal-calculator?amount=120&rate=20",
        },
        {
            title: "Remove VAT from 244 at 22%",
            description:
                "Use VAT-inclusive amount 244 and VAT rate 22% to get price without VAT 200 and VAT removed 44.",
            href: "/en/vat-removal-calculator?amount=244&rate=22",
        },
        {
            title: "Remove VAT from 105 at 5%",
            description:
                "Use VAT-inclusive amount 105 and VAT rate 5% to get price without VAT 100 and VAT removed 5.",
            href: "/en/vat-removal-calculator?amount=105&rate=5",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">What does a VAT removal calculator do?</h3>
            <p>
                It removes VAT from a VAT-inclusive price and shows both the
                price without VAT and the amount of VAT stripped out of the
                total.
            </p>

            <h3 className="mt-4 font-semibold">How is VAT removed from a price?</h3>
            <p>
                Divide the gross amount by <code>1 + (rate / 100)</code> to get
                the net price. Subtract the net from the gross to get the VAT
                amount. For example, £120 at 20% VAT: net = £100, VAT = £20.
            </p>

            <h3 className="mt-4 font-semibold">
                When would I need to remove VAT from a price?
            </h3>
            <p>
                You need to remove VAT when a supplier quotes a VAT-inclusive
                price and you need to record only the net value in your accounts,
                when checking an invoice, or when comparing prices across
                different VAT jurisdictions.
            </p>

            <h3 className="mt-4 font-semibold">
                What VAT rates does this calculator support?
            </h3>
            <p>
                Preset buttons cover UK rates (20%, 5%, 0%) and Italian rates
                (22%, 10%, 4%). You can also type any custom VAT percentage for
                other countries or non-standard rates.
            </p>

            <h3 className="mt-4 font-semibold">
                Is VAT removal the same as reverse VAT calculation?
            </h3>
            <p>
                Yes, mathematically they are identical. Both operations recover
                the net price from a VAT-inclusive amount. The terminology
                differs but the formula &mdash; gross ÷ (1 + rate) &mdash; is
                the same.
            </p>
        </>
    ),
    faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "What does a VAT removal calculator do?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "It takes a VAT-inclusive price and a VAT rate and tells you how much VAT is embedded in that price and what the net price is once VAT is removed.",
                },
            },
            {
                "@type": "Question",
                name: "How is VAT removed from a price?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Divide the gross amount by 1 + (rate / 100) to get the net price. Subtract the net from the gross to get the VAT amount. For example, £120 at 20% VAT: net = £100, VAT = £20.",
                },
            },
            {
                "@type": "Question",
                name: "When would I need to remove VAT from a price?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "You need to remove VAT when a supplier quotes a VAT-inclusive price and you need to record only the net value in your accounts, when checking an invoice, or when comparing prices across different VAT jurisdictions.",
                },
            },
            {
                "@type": "Question",
                name: "What VAT rates does this calculator support?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Preset buttons cover UK rates (20%, 5%, 0%) and Italian rates (22%, 10%, 4%). You can also type any custom VAT percentage for other countries or non-standard rates.",
                },
            },
            {
                "@type": "Question",
                name: "Is VAT removal the same as reverse VAT calculation?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, mathematically they are identical. Both operations recover the net price from a VAT-inclusive amount. The formula — gross ÷ (1 + rate) — is the same.",
                },
            },
        ],
    },
    sample: { amount: 120, rate: 20 },
    labels: {
        amountLabel: "VAT-inclusive amount",
        amountPlaceholder: "e.g. 120",
        amountHelp: "Enter the price that includes VAT so you can subtract the tax.",
        rateLabel: "VAT rate",
        rateHelp: "Select a preset or enter a custom VAT percentage.",
        ukRatesLabel: "UK rates",
        italyRatesLabel: "Italy rates",
        netLabel: "Price without VAT",
        vatLabel: "VAT removed",
        invalidAmount: "Enter a valid amount greater than or equal to 0.",
        currencySymbol: "$",
        currencyNote:
            "Currency is illustrative. VAT math is the same for any currency.",
    },
};

export default vatRemovalCalculatorEn;