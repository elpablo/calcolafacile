const faqItems = [
    {
        question: "What is the difference between the three VAT calculators?",
        answer:
            "The VAT Calculator adds or removes VAT and shows all three values (net, VAT, gross). The VAT Reverse Calculator specifically finds the net price from a gross amount. The VAT Removal Calculator emphasises how much VAT is embedded in a VAT-inclusive price. All three are free and work instantly in your browser.",
    },
    {
        question: "Which UK VAT rates are supported?",
        answer:
            "All three calculators include presets for the three UK VAT rates: standard rate (20%), reduced rate (5%) and zero rate (0%). You can also enter any custom rate.",
    },
    {
        question: "Do these tools work for EU VAT rates?",
        answer:
            "Yes. Italy's standard (22%), reduced (10%) and super-reduced (4%) rates are available as presets. For other EU countries, type the rate directly — any percentage between 0 and 100 is accepted.",
    },
    {
        question: "Are these VAT calculators free?",
        answer:
            "Yes. All tools on CalcolaFacile are free, require no signup and run entirely in your browser. No data is sent to a server.",
    },
    {
        question: "Can I use these tools on mobile?",
        answer:
            "Yes. Every calculator is mobile-first and works on any screen size — smartphone, tablet or desktop.",
    },
];

const vatToolsHubEn = {
    eyebrow: "VAT tools",
    heading: "Free online VAT calculators for UK and EU rates",
    intro:
        "Add VAT to a net price, find the net amount inside a VAT-inclusive total, or see exactly how much VAT is embedded in a price. All tools are free, require no signup and run instantly in your browser.",
    toolkitTitle: "VAT calculator toolkit",
    toolkitDescription:
        "Choose the right tool depending on whether you are adding VAT to a net price or working backwards from a VAT-inclusive amount.",
    vatTools: [
        {
            href: "/en/vat-calculator",
            title: "VAT Calculator",
            badge: "Most popular",
            description:
                "Add VAT to a net amount or remove it from a gross price. Supports UK, Italy and custom VAT rates. Shows net amount, VAT charged and total in one click.",
        },
        {
            href: "/en/vat-reverse-calculator",
            title: "VAT Reverse Calculator",
            badge: null,
            description:
                "Work backwards from a VAT-inclusive price. Enter a gross amount and a VAT rate to instantly find the original net price and the VAT component.",
        },
        {
            href: "/en/vat-removal-calculator",
            title: "VAT Removal Calculator",
            badge: null,
            description:
                "See exactly how much VAT is embedded in a VAT-inclusive price. Enter the total and the rate to see the VAT stripped out and the net amount left behind.",
        },
    ],
    relatedTitle: "Related calculators",
    relatedTools: [
        {
            href: "/en/percentage-calculator",
            title: "Percentage Calculator",
            description:
                "Calculate percentages, discounts and markups alongside your VAT calculations.",
        },
        {
            href: "/en/margin-calculation",
            title: "Margin Calculator",
            description:
                "Calculate profit margin from cost and selling price — useful when working with VAT-exclusive prices.",
        },
        {
            href: "/en/markup-calculation",
            title: "Markup Calculator",
            description:
                "Find the markup percentage to apply before adding VAT when pricing products.",
        },
        {
            href: "/en/business-calculators",
            title: "Business Calculators",
            description:
                "Salary, ROI, compound interest and more business finance tools.",
        },
    ],
    useCasesTitle: "Common VAT use cases",
    useCases: [
        {
            title: "Check invoices and receipts",
            description:
                "Verify that the VAT amount on a supplier invoice is correct by entering the gross price and confirming the tax breakdown.",
        },
        {
            title: "Record net values in accounts",
            description:
                "When a VAT-registered business records purchases, only the net (ex-VAT) value goes into the accounts. Use the removal calculator to split the totals instantly.",
        },
        {
            title: "Price products including VAT",
            description:
                "Start from a net price, add the correct VAT rate and present a clean VAT-inclusive price to your customers.",
        },
        {
            title: "Compare prices across VAT jurisdictions",
            description:
                "Strip VAT from prices in different countries to compare true underlying costs when sourcing from UK, EU or other suppliers.",
        },
    ],
    rateReferenceTitle: "VAT rate reference",
    countries: [
        {
            title: "United Kingdom",
            rates: [
                { label: "Standard rate", value: "20%" },
                {
                    label: "Reduced rate (fuel, children's car seats)",
                    value: "5%",
                },
                {
                    label: "Zero rate (food, books, children's clothing)",
                    value: "0%",
                },
            ],
        },
        {
            title: "Italy (IVA)",
            rates: [
                { label: "Standard rate", value: "22%" },
                { label: "Reduced rate (food, transport)", value: "10%" },
                { label: "Super-reduced rate (essential food)", value: "4%" },
            ],
        },
    ],
    faqTitle: "Frequently asked questions",
    faqItems,
    faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    },
    privacyTitle: "Browser-based and privacy-friendly",
    privacyDescription:
        "All VAT calculations run locally in your browser. No amounts, rates or results are ever sent to a server. Your financial data stays on your device.",
};

export default vatToolsHubEn;