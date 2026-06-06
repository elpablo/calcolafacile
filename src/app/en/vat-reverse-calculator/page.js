import VatReverseCalculator from "./VatReverseCalculator";

export const metadata = {
    title: "VAT Reverse Calculator | Calculate VAT Backwards from Gross to Net",
    description:
        "Calculate VAT backwards from any VAT-inclusive gross price. Enter the gross amount and VAT rate to convert gross to net and isolate the VAT amount instantly.",
    alternates: {
        canonical: "https://calcolafacile.org/en/vat-reverse-calculator",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-iva-inverso",
            en: "https://calcolafacile.org/en/vat-reverse-calculator",
        },
    },
};

export default function VatReverseCalculatorPage() {
    return <VatReverseCalculator />;
}
