

import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Strumenti per sviluppatori: JSON, JWT, Base64, URL Encoding e UUID",
    description:
        "Strumenti gratuiti per sviluppatori per formattare JSON, decodificare JWT, codificare Base64, preparare URL e generare UUID.",
    alternates: {
        canonical: "https://calcolafacile.org/it/strumenti-sviluppatori",
        languages: {
            it: "https://calcolafacile.org/it/strumenti-sviluppatori",
            en: "https://calcolafacile.org/en/developer-tools",
        },
    },
};

export default function DeveloperToolsPage() {
    return (
        <CategoryPageLayout
            lang="it"
            category="developer"
            eyebrow="Strumenti sviluppatori"
            title="Strumenti gratuiti per il lavoro quotidiano da sviluppatore"
            description={
                <p>
                    Formatta JSON, decodifica JWT, codifica e decodifica Base64,
                    genera UUID e prepara stringhe sicure per URL direttamente nel
                    browser. Sono strumenti pensati per controlli rapidi, debug e
                    attività quotidiane di sviluppo web.
                </p>
            }
            toolsTitle="Strumenti sviluppatori disponibili"
            seoTitle="Utility veloci e private per sviluppatori"
            seoText={
                <p>
                    Le piccole utility per sviluppatori sono davvero utili quando
                    sono rapide, private e facili da raggiungere. CalcolaFacile
                    raccoglie in un unico posto operazioni comuni come ispezionare
                    dati, trasformare stringhe e generare identificatori, senza
                    inviare informazioni non necessarie a servizi esterni.
                </p>
            }
        />
    );
}