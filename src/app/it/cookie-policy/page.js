

import LegalPageLayout, {
    LegalList,
    LegalSection,
} from "@/components/LegalPageLayout";

export const metadata = {
    title: "Cookie Policy | CalcolaFacile",
    description:
        "Cookie Policy di CalcolaFacile: cookie tecnici, localStorage, storage del browser e uso privacy-friendly degli strumenti online.",
};

export default function CookiePolicyPage() {
    return (
        <LegalPageLayout
            title="Cookie Policy"
            lastUpdated="Ultimo aggiornamento: 9 Maggio 2026"
            intro="Questa Cookie Policy spiega come CalcolaFacile utilizza cookie, localStorage e tecnologie simili del browser per offrire strumenti online rapidi e rispettosi della privacy."
        >
            <LegalSection title="Cosa sono cookie e tecnologie simili">
                <p>
                    I cookie sono piccoli file di testo salvati dal browser
                    quando un utente visita un sito web. Tecnologie simili
                    includono localStorage, sessionStorage e altri meccanismi di
                    salvataggio locale che possono memorizzare informazioni sul
                    dispositivo dell&apos;utente.
                </p>
            </LegalSection>

            <LegalSection title="Come CalcolaFacile usa queste tecnologie">
                <p>
                    CalcolaFacile può utilizzare cookie o tecnologie simili solo
                    quando sono utili al funzionamento, alla sicurezza o
                    all&apos;usabilità del sito e dei suoi strumenti.
                </p>

                <LegalList>
                    <li>
                        cookie tecnici o meccanismi equivalenti necessari al
                        corretto funzionamento del sito;
                    </li>
                    <li>
                        localStorage o sessionStorage per ricordare preferenze
                        dell&apos;interfaccia, impostazioni dei tool o stato locale
                        recente;
                    </li>
                    <li>
                        strumenti analytics aggregati o anonimi, se attivati,
                        per comprendere l&apos;utilizzo generale del sito e
                        migliorare il servizio.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection title="Elaborazione locale e storage del browser">
                <p>
                    Molti strumenti di CalcolaFacile funzionano direttamente nel
                    browser dell&apos;utente. I dati inseriti in strumenti come JSON
                    formatter, JWT decoder, convertitori di timestamp o
                    convertitori di unità vengono normalmente elaborati
                    localmente e non vengono inviati intenzionalmente ai server
                    di CalcolaFacile.
                </p>

                <p>
                    Lo storage del browser può essere usato per ricordare
                    preferenze locali non sensibili, ad esempio il tema
                    selezionato, le ultime unità scelte o altre impostazioni che
                    rendono gli strumenti più comodi da usare.
                </p>
            </LegalSection>

            <LegalSection title="Storage tecnico e funzionale">
                <p>
                    Lo storage tecnico e funzionale viene utilizzato per fornire
                    il servizio richiesto dall&apos;utente o per migliorare
                    l&apos;usabilità del sito senza profilare l&apos;utente per finalità
                    pubblicitarie.
                </p>

                <p>
                    Queste tecnologie generalmente non richiedono consenso
                    preventivo quando sono strettamente necessarie o funzionali
                    al servizio richiesto dall&apos;utente, secondo la normativa
                    europea e italiana applicabile in materia di cookie.
                </p>
            </LegalSection>

            <LegalSection title="Cookie pubblicitari e di profilazione">
                <p>
                    CalcolaFacile attualmente non utilizza cookie di
                    profilazione pubblicitaria per pubblicità comportamentale.
                </p>

                <p>
                    Se in futuro verranno introdotti strumenti pubblicitari,
                    remarketing o tecnologie di profilazione non essenziali,
                    questa Cookie Policy verrà aggiornata e, ove richiesto, agli
                    utenti sarà richiesto il consenso tramite un meccanismo
                    adeguato.
                </p>
            </LegalSection>

            <LegalSection title="Gestione di cookie e storage locale">
                <p>
                    Gli utenti possono gestire, bloccare o cancellare cookie e
                    storage locale del browser tramite le impostazioni del
                    proprio browser.
                </p>

                <LegalList>
                    <li>
                        la cancellazione dei cookie può ripristinare alcune
                        preferenze del sito;
                    </li>
                    <li>
                        la cancellazione del localStorage può rimuovere
                        impostazioni salvate dei tool o stato locale recente;
                    </li>
                    <li>
                        il blocco dello storage tecnico può impedire ad alcune
                        funzionalità di operare correttamente.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection title="Rapporto con la Privacy Policy">
                <p>
                    Per maggiori informazioni sul trattamento dei dati
                    personali, sulle finalità, sulle basi giuridiche, sui tempi
                    di conservazione e sui diritti dell&apos;utente, consulta la
                    Privacy Policy di CalcolaFacile.
                </p>
            </LegalSection>

            <LegalSection title="Modifiche alla presente Cookie Policy">
                <p>
                    Questa Cookie Policy può essere aggiornata nel tempo per
                    riflettere modifiche normative, tecniche o funzionali del
                    sito.
                </p>
            </LegalSection>
        </LegalPageLayout>
    );
}