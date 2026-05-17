

import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Free Business Calculators for VAT, Margins, Markup, Salary and Discounts",
    description:
        "Free online business calculators for VAT, percentages, profit margins, markup, salary estimates and reverse discounts.",
    alternates: {
        canonical: "https://calcolafacile.org/en/business-calculators",
        languages: {
            it: "https://calcolafacile.org/it/calcolatori-business",
            en: "https://calcolafacile.org/en/business-calculators",
        },
    },
};

export default function BusinessCalculatorsPage() {
    return (
        <CategoryPageLayout
            lang="en"
            category="business"
            eyebrow="Business & Finance"
            title="Free business calculators for pricing and everyday finance"
            description={
                <p>
                    Calculate VAT, percentages, discounts, margins, markup and salary
                    estimates with fast browser-based tools. These calculators help
                    with product pricing, invoices, promotions and practical business
                    decisions.
                </p>
            }
            toolsTitle="Available business calculators"
            seoTitle="Useful calculators for pricing, margins and financial decisions"
            seoText={
                <p>
                    Business calculations often need to be quick and repeatable:
                    adding or removing VAT, checking profit margins, comparing markup,
                    estimating discounts or understanding salary figures. CalcolaFacile
                    keeps these everyday calculations simple, clear and easy to reuse.
                </p>
            }
        />
    );
}