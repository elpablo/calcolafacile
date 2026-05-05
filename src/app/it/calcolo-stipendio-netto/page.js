import SalaryCalculator from "./SalaryCalculator";

export const metadata = {
    title: "Calcolo Stipendio Netto da Lordo (RAL) - Gratis",
    description:
        "Calcola lo stipendio netto partendo dalla RAL. Stima semplice e veloce del netto mensile e annuo.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolo-stipendio-netto",
        languages: {
            it: "https://calcolafacile.org/it/calcolo-stipendio-netto",
            en: "https://calcolafacile.org/en/salary-calculator",
        },
    },
};

export default function CalcoloStipendioNettoPage() {
    return <SalaryCalculator />;
}
