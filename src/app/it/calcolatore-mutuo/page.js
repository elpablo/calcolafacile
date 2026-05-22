import MortgageCalculator from "./MortgageCalculator";

export const metadata = {
    title: "Calcolatore Mutuo | Rata, Interessi e Ammortamento",
    description:
        "Calcola rata mensile del mutuo, interessi totali, costo complessivo e piano di ammortamento annuale.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolatore-mutuo",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-mutuo",
            en: "https://calcolafacile.org/en/mortgage-calculator",
        },
    },
};

export default function Page() {
    return <MortgageCalculator />;
}