

import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Strumenti rete e sicurezza gratuiti per IP pubblico, VPN e connessione",
    description:
        "Strumenti gratuiti per controllare IP pubblico, stato VPN e informazioni di connessione direttamente nel browser.",
    alternates: {
        canonical: "https://calcolafacile.org/it/rete-e-sicurezza",
        languages: {
            it: "https://calcolafacile.org/it/rete-e-sicurezza",
            en: "https://calcolafacile.org/en/network-security",
        },
    },
};

export default function NetworkSecurityPage() {
    return (
        <CategoryPageLayout
            lang="it"
            category="network"
            eyebrow="Rete e sicurezza"
            title="Strumenti gratuiti per rete e sicurezza"
            description={
                <p>
                    Controlla il tuo indirizzo IP pubblico, verifica alcune informazioni
                    di connessione e capisci se il traffico sembra provenire da una VPN
                    o da un proxy. Sono strumenti pensati per controlli rapidi di privacy,
                    rete e troubleshooting.
                </p>
            }
            toolsTitle="Strumenti rete e sicurezza disponibili"
            seoTitle="Controlli rapidi per IP, VPN e visibilità della connessione"
            seoText={
                <p>
                    Sapere quali informazioni espone la propria connessione è utile
                    quando si lavora da remoto, si testano VPN, si risolvono problemi
                    di rete o si controlla come un sito vede il browser. CalcolaFacile
                    rende questi controlli semplici e immediati direttamente dal browser.
                </p>
            }
        />
    );
}