import CalcolatoreRimozioneIva from "./CalcolatoreRimozioneIva";

export const metadata = {
    title: "Calcolatore Rimozione IVA | Rimuovi IVA e Trova il Prezzo Senza IVA",
    description:
        "Rimuovi l'IVA da un prezzo IVA inclusa. Inserisci totale e aliquota per vedere subito il prezzo senza IVA e la quota di imposta rimossa.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolatore-rimozione-iva",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-rimozione-iva",
            en: "https://calcolafacile.org/en/vat-removal-calculator",
        },
    },
};

export default function CalcolatoreRimozioneIvaPage() {
    return <CalcolatoreRimozioneIva />;
}
