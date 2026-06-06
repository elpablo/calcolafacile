import VatRemovalCalculator from "./VatRemovalCalculator";

export const metadata = {
    title: "VAT Removal Calculator | Remove VAT and Find the Price Without VAT",
    description:
        "Remove VAT from any VAT-inclusive price. Enter the total and VAT rate to see the price without VAT and the amount of VAT removed in seconds.",
    alternates: {
        canonical: "https://calcolafacile.org/en/vat-removal-calculator",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-rimozione-iva",
            en: "https://calcolafacile.org/en/vat-removal-calculator",
        },
    },
};

export default function VatRemovalCalculatorPage() {
    return <VatRemovalCalculator />;
}
