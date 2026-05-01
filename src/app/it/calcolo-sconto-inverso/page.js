import ReverseDiscountCalculator from "./ReverseDiscountCalculator";

export const metadata = {
    title: "Calcolo Sconto Inverso Online - Gratis",
    description:
        "Calcola il prezzo originale partendo dal prezzo scontato e dalla percentuale di sconto.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolo-sconto-inverso",
    },
};

export default function CalcoloScontoInversoPage() {
    return <ReverseDiscountCalculator />;
}
