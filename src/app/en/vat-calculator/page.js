import IvaCalculator from "./IvaCalculator";

export const metadata = {
    title: "VAT Calculator Online - Add or Remove VAT (22%, 10%, 4%)",
    description:
        "Calculate VAT quickly: add or remove VAT at 22%, 10% or 4%. Get net and gross amounts instantly.",
    alternates: {
        canonical: "https://calcolafacile.org/en/vat-calculator",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-iva",
            en: "https://calcolafacile.org/en/vat-calculator",
        },
    },
};

export default function VatCalculatorPage() {
    return <IvaCalculator />;
}
