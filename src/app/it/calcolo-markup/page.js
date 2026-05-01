import MarkupCalculator from "./MarkupCalculator";

export const metadata = {
    title: "Calcolo Markup Online - Gratis",
    description:
        "Calcola facilmente il markup (ricarico) partendo dal costo. Scopri a quanto vendere per ottenere il ricarico desiderato.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolo-markup",
    },
};

export default function CalcoloMarkupPage() {
    return <MarkupCalculator />;
}
