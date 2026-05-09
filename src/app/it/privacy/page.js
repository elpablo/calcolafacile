

import LegalPageLayout, {
    LegalList,
    LegalSection,
} from "@/components/LegalPageLayout";

export const metadata = {
    title: "Privacy Policy | CalcolaFacile",
    description:
        "Informativa privacy di CalcolaFacile ai sensi del Regolamento UE 2016/679 (GDPR).",
};

export default function PrivacyPolicyPage() {
    return (
        <LegalPageLayout
            title="Privacy Policy"
            lastUpdated="Ultimo aggiornamento: 9 Maggio 2026"
            intro="CalcolaFacile è progettato per offrire strumenti rapidi e semplici direttamente nel browser, limitando al minimo la raccolta di dati personali e privilegiando un approccio privacy-friendly."
        >
            <LegalSection title="Titolare del trattamento">
                <p>
                    Il titolare del trattamento dei dati personali è NERALAB
                    Srl, Bologna (Italia).
                </p>
                <p>
                    Per richieste relative alla privacy o all&apos;esercizio dei
                    diritti previsti dal GDPR è possibile contattare il titolare
                    all&apos;indirizzo email info@neralab.it.
                </p>
            </LegalSection>

            <LegalSection title="Tipologie di dati trattati">
                <p>
                    CalcolaFacile non richiede la creazione di account utente e
                    non raccoglie intenzionalmente dati personali identificativi
                    tramite gli strumenti disponibili sul sito.
                </p>

                <p>
                    CalcolaFacile segue un approccio privacy-first e di
                    minimizzazione dei dati, cercando di limitare il trattamento
                    delle informazioni personali allo stretto necessario per il
                    funzionamento tecnico del servizio.
                </p>

                <LegalList>
                    <li>
                        dati tecnici necessari al funzionamento del sito e dei
                        server (ad esempio indirizzo IP, user-agent, timestamp
                        delle richieste);
                    </li>
                    <li>
                        eventuali preferenze locali salvate nel browser tramite
                        localStorage o tecnologie equivalenti;
                    </li>
                    <li>
                        dati statistici aggregati e anonimi relativi
                        all&apos;utilizzo del sito, se disponibili tramite strumenti
                        analytics.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection title="Dati elaborati dagli strumenti online">
                <p>
                    La maggior parte degli strumenti presenti su CalcolaFacile
                    elabora i dati direttamente nel browser dell&apos;utente.
                </p>

                <p>
                    I contenuti inseriti nei tool (ad esempio JSON, JWT,
                    timestamp, conversioni o altri dati tecnici) non vengono
                    salvati nei server del sito salvo quanto strettamente
                    necessario per motivi tecnici, sicurezza o manutenzione.
                </p>
            </LegalSection>

            <LegalSection title="Finalità e base giuridica del trattamento">
                <p>
                    I dati eventualmente trattati vengono utilizzati
                    esclusivamente per:
                </p>

                <LegalList>
                    <li>
                        erogare correttamente i servizi e gli strumenti online;
                    </li>
                    <li>
                        garantire sicurezza, stabilità e manutenzione del sito;
                    </li>
                    <li>
                        migliorare l&apos;esperienza utente e la qualità degli
                        strumenti;
                    </li>
                    <li>adempiere ad eventuali obblighi normativi.</li>
                </LegalList>

                <p>
                    La base giuridica del trattamento è il legittimo interesse
                    del titolare ai sensi dell&apos;art. 6, par. 1, lett. f del
                    GDPR e, ove necessario, l&apos;adempimento di obblighi
                    legali.
                </p>
            </LegalSection>

            <LegalSection title="Conservazione dei dati">
                <p>
                    I dati tecnici e i log di sistema vengono conservati per il
                    tempo strettamente necessario a garantire sicurezza,
                    monitoraggio e continuità operativa del servizio.
                </p>

                <p>
                    Le preferenze salvate localmente tramite localStorage
                    rimangono memorizzate esclusivamente nel browser
                    dell&apos;utente fino alla loro cancellazione manuale o
                    automatica.
                </p>
            </LegalSection>

            <LegalSection title="Comunicazione e trasferimento dei dati">
                <p>
                    I dati non vengono venduti né utilizzati per attività di
                    profilazione pubblicitaria.
                </p>

                <p>
                    Alcuni dati tecnici possono essere trattati da fornitori di
                    servizi infrastrutturali, hosting, CDN o analytics
                    utilizzati per il funzionamento del sito.
                </p>
            </LegalSection>

            <LegalSection title="Diritti dell'interessato">
                <p>
                    Gli utenti possono esercitare i diritti previsti dagli
                    articoli 15-22 del GDPR, inclusi:
                </p>

                <LegalList>
                    <li>accesso ai dati personali;</li>
                    <li>rettifica o cancellazione dei dati;</li>
                    <li>limitazione del trattamento;</li>
                    <li>opposizione al trattamento;</li>
                    <li>
                        presentazione di reclamo all&apos;autorità competente.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection title="Modifiche alla presente informativa">
                <p>
                    La presente Privacy Policy può essere aggiornata nel tempo
                    per riflettere modifiche normative, tecniche o funzionali
                    del sito.
                </p>
            </LegalSection>
        </LegalPageLayout>
    );
}