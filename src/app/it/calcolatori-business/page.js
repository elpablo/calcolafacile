

import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Calcolatori business gratuiti per IVA, margini, markup, stipendio e sconti",
    description:
        "Calcolatori business gratuiti per IVA, percentuali, margini di profitto, markup, stima stipendio netto e sconto inverso.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolatori-business",
        languages: {
            it: "https://calcolafacile.org/it/calcolatori-business",
            en: "https://calcolafacile.org/en/business-calculators",
        },
    },
};

export default function BusinessCalculatorsPage() {
    return (
        <CategoryPageLayout
            lang="it"
            category="business"
            eyebrow="Business e finanza"
            title="Calcolatori gratuiti per prezzi, margini e finanza quotidiana"
            description={
                <p>
                    Calcola IVA, percentuali, sconti, margini, markup e stime di
                    stipendio netto con strumenti rapidi direttamente nel browser.
                    Questi calcolatori aiutano con prezzi, fatture, promozioni e
                    decisioni pratiche di business.
                </p>
            }
            toolsTitle="Calcolatori business disponibili"
            seoTitle="Calcolatori utili per prezzi, margini e decisioni finanziarie"
            seoText={
                <p>
                    I calcoli business devono spesso essere rapidi e ripetibili:
                    aggiungere o scorporare IVA, controllare margini di profitto,
                    confrontare markup, stimare sconti o capire valori legati allo
                    stipendio. CalcolaFacile rende queste operazioni quotidiane più
                    semplici, chiare e facili da riutilizzare.
                </p>
            }
        />
    );
}