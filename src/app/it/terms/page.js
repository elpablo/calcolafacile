

import LegalPageLayout, {
    LegalList,
    LegalSection,
} from "@/components/LegalPageLayout";

export const metadata = {
    title: "Termini di utilizzo | CalcolaFacile",
    description:
        "Termini di utilizzo di CalcolaFacile: condizioni d'uso, limitazioni di responsabilità, uso consentito e disponibilità degli strumenti online.",
};

export default function TermsPage() {
    return (
        <LegalPageLayout
            title="Termini di utilizzo"
            lastUpdated="Ultimo aggiornamento: 9 Maggio 2026"
            intro="Questi Termini di utilizzo regolano l'accesso e l'uso di CalcolaFacile e degli strumenti online disponibili sul sito. Utilizzando il sito, l'utente accetta le condizioni indicate in questa pagina."
        >
            <LegalSection title="1. Informazioni sul servizio">
                <p>
                    CalcolaFacile è un sito che offre strumenti online per
                    calcoli, conversioni, formattazione di dati e altre utilità
                    tecniche o quotidiane.
                </p>
                <p>Il servizio è fornito da NERALAB Srl, Bologna (Italia).</p>
            </LegalSection>

            <LegalSection title="2. Uso degli strumenti">
                <p>
                    Gli strumenti disponibili su CalcolaFacile sono forniti per
                    finalità informative, pratiche e di supporto operativo.
                    L&apos;utente è responsabile della verifica dei risultati
                    prima di utilizzarli per decisioni professionali, tecniche,
                    economiche, fiscali o legali.
                </p>
                <p>
                    Sebbene venga posta attenzione all&apos;accuratezza dei
                    calcoli e delle conversioni, CalcolaFacile non garantisce
                    che i risultati siano sempre completi, aggiornati, privi di
                    errori o adatti a ogni specifico utilizzo.
                </p>
            </LegalSection>

            <LegalSection title="3. Nessuna consulenza professionale">
                <p>
                    Le informazioni e gli strumenti presenti sul sito non
                    costituiscono consulenza contabile, tecnica o professionale
                    di altro tipo.
                </p>
                <p>
                    Per decisioni che richiedono valutazioni specialistiche,
                    l&apos;utente deve rivolgersi a un professionista
                    qualificato.
                </p>
            </LegalSection>

            <LegalSection title="4. Elaborazione locale dei contenuti">
                <p>
                    Molti strumenti di CalcolaFacile funzionano direttamente nel
                    browser dell&apos;utente. Quando possibile, i dati inseriti
                    nei tool vengono elaborati localmente e non vengono
                    intenzionalmente salvati sui server del sito.
                </p>
                <p>
                    L&apos;utente è comunque invitato a non inserire dati
                    personali, sensibili, riservati o coperti da obblighi di
                    segretezza quando non strettamente necessario.
                </p>
            </LegalSection>

            <LegalSection title="5. Uso consentito">
                <p>
                    L&apos;utente si impegna a utilizzare CalcolaFacile in modo
                    lecito e corretto.
                </p>
                <LegalList>
                    <li>
                        non utilizzare il sito per attività illegali o
                        fraudolente;
                    </li>
                    <li>
                        non tentare di compromettere sicurezza, stabilità o
                        disponibilità del servizio;
                    </li>
                    <li>
                        non effettuare scraping massivo, richieste automatizzate
                        aggressive o utilizzi tali da sovraccaricare
                        l&apos;infrastruttura;
                    </li>
                    <li>
                        non tentare di accedere ad aree, sistemi o dati non
                        autorizzati;
                    </li>
                    <li>
                        non utilizzare il sito in modo tale da danneggiare altri
                        utenti, il titolare o terzi.
                    </li>
                </LegalList>
            </LegalSection>

            <LegalSection title="6. Disponibilità e modifiche del servizio">
                <p>
                    CalcolaFacile può essere modificato, aggiornato, sospeso o
                    interrotto in qualsiasi momento, anche senza preavviso, per
                    esigenze tecniche, organizzative, di sicurezza o di
                    evoluzione del prodotto.
                </p>
                <p>
                    Non viene garantita la disponibilità continua e ininterrotta
                    del sito o di specifici strumenti.
                </p>
            </LegalSection>

            <LegalSection title="7. Limitazione di responsabilità">
                <p>
                    Nei limiti consentiti dalla legge applicabile, NERALAB Srl
                    non potrà essere ritenuta responsabile per danni diretti o
                    indiretti, perdite economiche, errori, omissioni,
                    interruzioni del servizio o conseguenze derivanti
                    dall&apos;uso o dall&apos;impossibilità di usare
                    CalcolaFacile.
                </p>
                <p>
                    L&apos;utilizzo del sito e dei risultati prodotti dagli
                    strumenti avviene sotto la responsabilità dell&apos;utente.
                </p>
            </LegalSection>

            <LegalSection title="8. Proprietà intellettuale">
                <p>
                    Il sito, il codice, il design, i testi, la struttura e gli
                    elementi grafici di CalcolaFacile sono protetti dalle
                    normative applicabili in materia di proprietà intellettuale,
                    salvo diverso accordo o diversa indicazione.
                </p>
                <p>
                    È vietata la riproduzione non autorizzata del sito o di sue
                    parti sostanziali, salvo gli usi consentiti dalla legge.
                </p>
            </LegalSection>

            <LegalSection title="9. Link a siti o servizi di terzi">
                <p>
                    CalcolaFacile può contenere link verso siti, servizi o
                    risorse di terzi. NERALAB Srl non controlla tali contenuti e
                    non è responsabile per disponibilità, correttezza, sicurezza
                    o pratiche privacy di siti esterni.
                </p>
            </LegalSection>

            <LegalSection title="10. Privacy e cookie">
                <p>
                    Il trattamento dei dati personali e l&apos;uso di cookie o
                    tecnologie simili sono descritti nella Privacy Policy e
                    nella Cookie Policy di CalcolaFacile.
                </p>
            </LegalSection>

            <LegalSection title="11. Legge applicabile">
                <p>
                    I presenti Termini di utilizzo sono regolati dalla legge
                    italiana, salvo eventuali norme inderogabili applicabili a
                    tutela del consumatore o dell&apos;utente.
                </p>
            </LegalSection>

            <LegalSection title="12. Modifiche ai Termini">
                <p>
                    NERALAB Srl può aggiornare questi Termini di utilizzo nel
                    tempo per riflettere modifiche normative, tecniche,
                    funzionali o organizzative. La versione più recente è sempre
                    pubblicata su questa pagina.
                </p>
            </LegalSection>
        </LegalPageLayout>
    );
}