

import MarginCalculator from "./MarginCalculator";

export const metadata = {
    title: "Calcolo Margine Online - Gratis",
    description:
        "Calcola facilmente il margine di profitto partendo da costo e prezzo di vendita. Strumento gratuito per freelance, ecommerce e piccole attività.",
    alternates: {
        canonical: "https://calcolafacile-gamma.vercel.app/it/calcolo-margine",
    },
};

export default function CalcoloMarginePage() {
    return <MarginCalculator />;
}