import SalaryCalculator from "./SalaryCalculator";

export const metadata = {
    title: "Calcolo Stipendio Netto da Lordo (RAL) - Gratis",
    description:
        "Calcola lo stipendio netto partendo dalla RAL. Stima semplice e veloce del netto mensile e annuo.",
};

export default function CalcoloStipendioNettoPage() {
    return <SalaryCalculator />;
}
