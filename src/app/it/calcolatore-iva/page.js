import IvaCalculator from "./IvaCalculator";

export const metadata = {
    title: "Calcolatore IVA 22%, 10%, 4% (Scorporo e Aggiunta) - Gratis",
    description:
        "Calcola IVA facilmente: aggiungi o scorpora IVA 22%, 10% e 4% in pochi secondi.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolatore-iva",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-iva",
            en: "https://calcolafacile.org/en/vat-calculation",
        },
    },
};

export default function CalcolatoreIVAPage() {
    return <IvaCalculator />;
}
