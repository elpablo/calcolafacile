import MortgageCalculator from "./MortgageCalculator";

export const metadata = {
    title: "Mortgage Calculator | Monthly Payment & Amortization",
    description:
        "Calculate mortgage monthly payments, total interest, total repayment cost and yearly amortization schedule.",
    alternates: {
        canonical: "https://calcolafacile.org/en/mortgage-calculator",
        languages: {
            en: "https://calcolafacile.org/en/mortgage-calculator",
            it: "https://calcolafacile.org/it/calcolatore-mutuo",
        },
    },
};

export default function Page() {
    return <MortgageCalculator />;
}