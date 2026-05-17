

import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Strumenti data e ora gratuiti per timestamp Unix e conversioni temporali",
    description:
        "Strumenti gratuiti per convertire timestamp Unix in date leggibili e trasformare date in timestamp direttamente nel browser.",
    alternates: {
        canonical: "https://calcolafacile.org/it/data-e-ora",
        languages: {
            it: "https://calcolafacile.org/it/data-e-ora",
            en: "https://calcolafacile.org/en/date-time-tools",
        },
    },
};

export default function DateTimeToolsPage() {
    return (
        <CategoryPageLayout
            lang="it"
            category="dateTime"
            eyebrow="Data e ora"
            title="Strumenti gratuiti per date, orari e timestamp"
            description={
                <p>
                    Converti timestamp Unix in date leggibili e trasforma date in
                    timestamp direttamente nel browser. Sono strumenti utili per
                    controllare log, API, database ed eventi programmati.
                </p>
            }
            toolsTitle="Strumenti data e ora disponibili"
            seoTitle="Capire i timestamp senza fare ginnastica mentale"
            seoText={
                <p>
                    I timestamp Unix sono comuni in API, database, log e sistemi
                    backend, ma non sono esattamente piacevoli da leggere a colpo
                    d’occhio. CalcolaFacile aiuta a tradurre rapidamente timestamp
                    in date leggibili e a verificare valori temporali prima di usarli
                    nel codice o nella documentazione.
                </p>
            }
        />
    );
}