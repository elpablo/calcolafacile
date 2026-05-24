import IvaCalculator from "./IvaCalculator";

export const metadata = {
    title: "VAT Calculator | Add or Remove VAT with Custom Rates",
    description:
        "Free online VAT calculator to add or remove VAT with UK, Italy and custom rates. Calculate net amount, VAT amount and total instantly. Looking for US sales tax? A dedicated calculator is coming soon.",
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
