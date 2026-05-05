import SalaryCalculator from "./SalaryCalculator";

export const metadata = {
    title: "Net Salary Calculator Online - Estimate Monthly Take-Home Pay",
    description:
        "Estimate your net salary from gross annual income. Simple tool to calculate monthly and annual take-home pay.",
    alternates: {
        canonical: "https://calcolafacile.org/en/salary-calculator",
        languages: {
            it: "https://calcolafacile.org/it/calcolo-stipendio-netto",
            en: "https://calcolafacile.org/en/salary-calculator",
        },
    },
};

export default function SalaryCalculatorPage() {
    return <SalaryCalculator />;
}
