

import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Conversioni di unità gratis: lunghezza, peso, temperatura e altro",
    description:
        "Strumenti gratuiti per convertire unità di lunghezza, peso, temperatura, volume, area, velocità e pressione.",
    alternates: {
        canonical: "https://calcolafacile.org/it/conversioni-unita",
        languages: {
            it: "https://calcolafacile.org/it/conversioni-unita",
            en: "https://calcolafacile.org/en/unit-conversion",
        },
    },
};

export default function UnitConversionPage() {
    return (
        <CategoryPageLayout
            lang="it"
            category="conversion"
            eyebrow="Conversioni"
            title="Strumenti gratuiti per convertire unità"
            description={
                <p>
                    Converti unità comuni di lunghezza, peso, temperatura, volume,
                    area, velocità e pressione direttamente nel browser. Puoi usare
                    il convertitore generale oppure le pagine dedicate per conversioni
                    frequenti come centimetri in pollici, once in grammi e grammi in once.
                </p>
            }
            toolsTitle="Strumenti di conversione disponibili"
            seoTitle="Conversioni rapide per uso quotidiano e tecnico"
            seoText={
                <p>
                    Le conversioni di unità sono utili nella vita quotidiana, in cucina,
                    nei viaggi, nello studio, nell’ingegneria e nel lavoro sui prodotti.
                    CalcolaFacile raccoglie conversioni comuni facili da raggiungere,
                    con input chiari, risultati immediati e pagine dedicate alle coppie
                    di conversione più cercate.
                </p>
            }
        />
    );
}