const vatReverseCalculatorEn = {
    lang: "en",
    locale: "en-IE",
    currency: "USD",
    toolKey: "vatReverse",
    title: "VAT Reverse Calculator",
    currentPath: "/en/vat-reverse-calculator",
    description:
        "Calculate VAT backwards from a gross price. Enter a VAT-inclusive amount and VAT rate to convert gross to net and isolate the VAT amount.",
    contextualTools: [
        {
            href: "/en/vat-calculator",
            title: "VAT Calculator",
            description: "Add VAT to a net amount or remove it from a gross price.",
        },
        {
            href: "/en/vat-removal-calculator",
            title: "VAT Removal Calculator",
            description: "See how much VAT is embedded in a VAT-inclusive price.",
        },
        {
            href: "/en/vat-tools",
            title: "VAT Tools",
            description: "Browse the full VAT calculator toolkit.",
        },
    ],
    examples: [
        {
            title: "Reverse VAT from 120 at 20%",
            description:
                "Use gross amount 120 and VAT rate 20% to get net amount 100 and VAT amount 20.",
            href: "/en/vat-reverse-calculator?amount=120&rate=20",
        },
        {
            title: "Reverse VAT from 122 at 22%",
            description:
                "Use gross amount 122 and VAT rate 22% to recover net amount 100 and VAT amount 22.",
            href: "/en/vat-reverse-calculator?amount=122&rate=22",
        },
        {
            title: "Reverse VAT from 105 at 5%",
            description:
                "Use gross amount 105 and VAT rate 5% to recover net amount 100 and VAT amount 5.",
            href: "/en/vat-reverse-calculator?amount=105&rate=5",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">What is a VAT reverse calculation?</h3>
            <p>
                A VAT reverse calculation finds the net price and VAT amount when
                you start from a VAT-inclusive gross price. It is commonly used
                to calculate VAT backwards or convert gross to net.
            </p>

            <h3 className="mt-4 font-semibold">How do you reverse-calculate VAT?</h3>
            <p>
                Divide the gross amount by <code>1 + (VAT rate / 100)</code>.
                For example, for a £120 gross price at 20% VAT: net = 120 ÷
                1.20 = £100, VAT = £20.
            </p>

            <h3 className="mt-4 font-semibold">
                What is the difference between a VAT reverse calculator and a
                VAT removal calculator?
            </h3>
            <p>
                They perform the same arithmetic. The reverse calculator
                emphasises finding the original net price, while the removal
                calculator emphasises how much VAT is stripped out of a price.
                Both start from a gross amount.
            </p>

            <h3 className="mt-4 font-semibold">Can I use this for any VAT rate?</h3>
            <p>
                Yes. Use the preset buttons for common UK (20%, 5%, 0%) and
                Italy (22%, 10%, 4%) rates, or type any custom VAT percentage
                directly into the field.
            </p>

            <h3 className="mt-4 font-semibold">
                Is this the same as &ldquo;extracting VAT&rdquo;?
            </h3>
            <p>
                Yes. Extracting VAT, backing out VAT, removing VAT and reverse
                VAT all refer to the same operation: recovering the net amount
                from a VAT-inclusive price.
            </p>
        </>
    ),
    faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "What is a VAT reverse calculation?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "A VAT reverse calculation finds the net price and the VAT amount when you already have the gross (VAT-inclusive) price and the VAT rate. It is also called backing out VAT or extracting VAT.",
                },
            },
            {
                "@type": "Question",
                name: "How do you reverse-calculate VAT?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Divide the gross amount by 1 + (VAT rate / 100). For example, for a £120 gross price at 20% VAT: net = 120 ÷ 1.20 = £100, VAT = £20.",
                },
            },
            {
                "@type": "Question",
                name: "What is the difference between a VAT reverse calculator and a VAT removal calculator?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "They perform the same arithmetic. The reverse calculator emphasises finding the original net price, while the removal calculator emphasises how much VAT is stripped out. Both start from a gross amount.",
                },
            },
            {
                "@type": "Question",
                name: "Can I use this for any VAT rate?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Use the preset buttons for common UK (20%, 5%, 0%) and Italy (22%, 10%, 4%) rates, or type any custom VAT percentage directly into the field.",
                },
            },
            {
                "@type": "Question",
                name: "Is this the same as extracting VAT?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Extracting VAT, backing out VAT, removing VAT and reverse VAT all refer to the same operation: recovering the net amount from a VAT-inclusive price.",
                },
            },
        ],
    },
    sample: { amount: 120, rate: 20 },
    labels: {
        amountLabel: "Gross amount (VAT-inclusive)",
        amountPlaceholder: "e.g. 120",
        amountHelp: "Enter the gross price you want to convert from gross to net.",
        rateLabel: "VAT rate",
        rateHelp: "Select a preset or enter a custom VAT percentage.",
        ukRatesLabel: "UK rates",
        italyRatesLabel: "Italy rates",
        netLabel: "Net amount (gross to net)",
        vatLabel: "VAT amount",
        invalidAmount: "Enter a valid amount greater than or equal to 0.",
        currencySymbol: "$",
        currencyNote:
            "Currency is illustrative. VAT math is the same for any currency.",
    },
};

export default vatReverseCalculatorEn;