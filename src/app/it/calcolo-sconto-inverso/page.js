import ReverseDiscountCalculator from "./ReverseDiscountCalculator";

export const metadata = {
    title: "Calcolo Sconto Inverso Online - Gratis",
    description:
        "Calcola il prezzo originale partendo dal prezzo scontato e dalla percentuale di sconto.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolo-sconto-inverso",
        languages: {
            it: "https://calcolafacile.org/it/calcolo-sconto-inverso",
            en: "https://calcolafacile.org/en/inverse-discount-calculator",
        },
    },
};

export default function CalcoloScontoInversoPage() {
    return <ReverseDiscountCalculator />;
}
