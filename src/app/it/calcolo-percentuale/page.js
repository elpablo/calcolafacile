import PercentageCalculator from "./PercentageCalculator";

export const metadata = {
    title: "Calcolo Percentuale Online: Sconti, Aumenti e Percentuali - Gratis",
    description:
        "Calcola percentuali online gratis: trova il X% di un numero, scopri che percentuale è un valore, applica aumenti, riduzioni e sconti.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolo-percentuale",
        languages: {
            it: "https://calcolafacile.org/it/calcolo-percentuale",
            en: "https://calcolafacile.org/en/percentage-calculator",
        },
    },
};

export default function CalcoloPercentualePage() {
    return <PercentageCalculator />;
}
