import PercentageCalculator from "./PercentageCalculator";

export const metadata = {
    title: "Calcolo Percentuale Online: Sconti, Aumenti e Percentuali - Gratis",
    description:
        "Calcola percentuali online gratis: trova il X% di un numero, scopri che percentuale è un valore, applica aumenti, riduzioni e sconti.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolo-percentuale",
    },
};

export default function CalcoloPercentualePage() {
    return <PercentageCalculator />;
}
