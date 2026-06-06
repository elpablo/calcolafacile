import VatToolsHub from "./VatToolsHub";

export const metadata = {
    title: "VAT Tools | Free Online VAT Calculators for UK and EU",
    description:
        "Free online VAT calculator toolkit. Add VAT to a net price, reverse-calculate VAT from a gross amount, or remove VAT from a VAT-inclusive price. Supports UK, EU and custom VAT rates.",
    alternates: {
        canonical: "https://calcolafacile.org/en/vat-tools",
        languages: {
            it: "https://calcolafacile.org/it/strumenti-iva",
            en: "https://calcolafacile.org/en/vat-tools",
        },
    },
};

export default function VatToolsPage() {
    return <VatToolsHub />;
}
