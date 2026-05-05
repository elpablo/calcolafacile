import MarkupCalculator from "./MarkupCalculator";

export const metadata = {
    title: "Calcolo Markup Online - Gratis",
    description:
        "Calcola facilmente il markup (ricarico) partendo dal costo. Scopri a quanto vendere per ottenere il ricarico desiderato.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolo-markup",
        languages: {
            it: "https://calcolafacile.org/it/calcolo-markup",
            en: "https://calcolafacile.org/en/markup-calculation",
        },
    },
};

export default function CalcoloMarkupPage() {
    return <MarkupCalculator />;
}
