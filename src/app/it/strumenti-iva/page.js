import StrumentiIvaHub from "./StrumentiIvaHub";

export const metadata = {
    title: "Strumenti IVA | Calcolatori IVA Gratuiti Online",
    description:
        "Toolkit gratuito di calcolatori IVA: aggiunta IVA, IVA inversa e rimozione IVA da importi lordi con aliquote Italia, UK e personalizzate.",
    alternates: {
        canonical: "https://calcolafacile.org/it/strumenti-iva",
        languages: {
            it: "https://calcolafacile.org/it/strumenti-iva",
            en: "https://calcolafacile.org/en/vat-tools",
        },
    },
};

export default function StrumentiIvaPage() {
    return <StrumentiIvaHub />;
}
