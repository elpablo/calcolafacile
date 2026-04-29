import IvaCalculator from "./IvaCalculator";

export const metadata = {
    title: "Calcolatore IVA 22%, 10%, 4% (Scorporo e Aggiunta) - Gratis",
    description:
        "Calcola IVA facilmente: aggiungi o scorpora IVA 22%, 10% e 4% in pochi secondi.",
};

export default function CalcolatoreIVAPage() {
    return <IvaCalculator />;
}
