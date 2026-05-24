import IvaCalculator from "./IvaCalculator";

export const metadata = {
    title: "Calcolatore IVA | Scorporo, Aggiunta e Aliquota Personalizzata",
    description:
        "Calcola IVA, scorporo e aggiunta con aliquote 22%, 10%, 4%, preset UK e percentuale personalizzata. Risultato con imponibile, IVA e totale.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolatore-iva",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-iva",
            en: "https://calcolafacile.org/en/vat-calculator",
        },
    },
};

export default function CalcolatoreIVAPage() {
    return <IvaCalculator />;
}
