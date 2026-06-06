import CalcolatoreIvaInverso from "./CalcolatoreIvaInverso";

export const metadata = {
    title: "Calcolatore IVA Inverso | Calcola IVA a Ritroso da Lordo a Netto",
    description:
        "Calcola IVA a ritroso partendo da un importo lordo IVA inclusa. Inserisci totale e aliquota per ottenere imponibile e quota IVA in pochi secondi.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolatore-iva-inverso",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-iva-inverso",
            en: "https://calcolafacile.org/en/vat-reverse-calculator",
        },
    },
};

export default function CalcolatoreIvaInversoPage() {
    return <CalcolatoreIvaInverso />;
}
