import PercentageCalculator from "./PercentageCalculator";

export const metadata = {
    title: "Percentage Calculator Online - Calculate Percentages, Discounts and Increases",
    description:
        "Calculate percentages online for free: find X% of a number, discover what percentage a value is, apply increases, reductions and discounts.",
    alternates: {
        canonical: "https://calcolafacile.org/en/percentage-calculator",
        languages: {
            it: "https://calcolafacile.org/it/calcolo-percentuale",
            en: "https://calcolafacile.org/en/percentage-calculator",
        },
    },
};

export default function PercentageCalculatorPage() {
    return <PercentageCalculator />;
}
