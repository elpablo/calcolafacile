

import MarginCalculator from "./MarginCalculator";

export const metadata = {
    title: "Calcolo Margine Online - Gratis",
    description:
        "Calcola facilmente il margine di profitto partendo da costo e prezzo di vendita. Strumento gratuito per freelance, ecommerce e piccole attività.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolo-margine",
        languages: {
            it: "https://calcolafacile.org/it/calcolo-margine",
            en: "https://calcolafacile.org/en/margin-calculation",
        },
    },
};

export default function CalcoloMarginePage() {
    return <MarginCalculator />;
}