const faqItems = [
    {
        question: "Qual è la differenza tra i tre calcolatori IVA?",
        answer:
            "Il Calcolatore IVA aggiunge o scorpora imposta e mostra netto, IVA e totale. Il Calcolatore IVA Inverso è focalizzato sul recupero dell'imponibile dal lordo. Il Calcolatore Rimozione IVA evidenzia la quota di imposta inclusa nel prezzo.",
    },
    {
        question: "Quali aliquote italiane sono disponibili?",
        answer:
            "Sono disponibili preset per le aliquote IVA italiane più usate: 22%, 10% e 4%. Puoi comunque inserire qualsiasi percentuale personalizzata.",
    },
    {
        question: "Posso usare questi strumenti anche per aliquote UK o estere?",
        answer:
            "Sì. Sono presenti anche preset UK (20%, 5%, 0%) e puoi inserire manualmente qualsiasi aliquota da 0 a 100 per scenari internazionali.",
    },
    {
        question: "I calcolatori IVA sono gratuiti?",
        answer:
            "Sì, tutti i calcolatori su CalcolaFacile sono gratuiti, senza registrazione e utilizzabili direttamente dal browser.",
    },
    {
        question: "Funzionano bene da smartphone?",
        answer:
            "Sì, le pagine sono ottimizzate mobile-first e funzionano correttamente su smartphone, tablet e desktop.",
    },
];

const vatToolsHubIt = {
    eyebrow: "Strumenti IVA",
    heading: "Calcolatori IVA gratuiti online per Italia, UK e aliquote personalizzate",
    intro:
        "Aggiungi IVA a un prezzo netto, scorpora IVA da un totale lordo o individua la quota imposta inclusa. Tutto in modo rapido, gratuito e direttamente nel browser.",
    toolkitTitle: "Ecosistema calcolatori IVA",
    toolkitDescription:
        "Scegli lo strumento giusto in base al tuo obiettivo: aggiunta IVA, scorporo inverso o rimozione dell'imposta da importi già IVA inclusa.",
    vatTools: [
        {
            href: "/it/calcolatore-iva",
            title: "Calcolatore IVA",
            badge: "Più usato",
            description:
                "Aggiungi o scorpora IVA da un importo netto o lordo con aliquote Italia, UK e personalizzate.",
        },
        {
            href: "/it/calcolatore-iva-inverso",
            title: "Calcolatore IVA Inverso",
            badge: null,
            description:
                "Parti da un importo lordo e trova imponibile e quota IVA in modo immediato.",
        },
        {
            href: "/it/calcolatore-rimozione-iva",
            title: "Calcolatore Rimozione IVA",
            badge: null,
            description:
                "Scopri quanta IVA è inclusa in un prezzo e quale importo resta al netto dell'imposta.",
        },
    ],
    relatedTitle: "Calcolatori correlati",
    relatedTools: [
        {
            href: "/it/calcolo-percentuale",
            title: "Calcolo percentuale",
            description: "Calcola percentuali, sconti e variazioni insieme ai conteggi IVA.",
        },
        {
            href: "/it/calcolo-margine",
            title: "Calcolo margine",
            description: "Misura il margine partendo da costi e prezzi netti o lordi.",
        },
        {
            href: "/it/calcolo-markup",
            title: "Calcolo markup",
            description: "Determina il ricarico da applicare prima dell'aggiunta IVA.",
        },
        {
            href: "/it/calcolatori-business",
            title: "Calcolatori business",
            description: "Stipendio, ROI, interesse composto e altri strumenti utili.",
        },
    ],
    useCasesTitle: "Casi d'uso frequenti",
    useCases: [
        {
            title: "Verificare fatture e ricevute",
            description:
                "Controlla rapidamente se imponibile e IVA riportati in fattura sono corretti rispetto al totale.",
        },
        {
            title: "Registrare valori netti in contabilità",
            description:
                "Partendo da prezzi IVA inclusa, separa imponibile e imposta per una registrazione corretta.",
        },
        {
            title: "Impostare prezzi al pubblico IVA inclusa",
            description:
                "Parti dal prezzo netto, aggiungi l'aliquota corretta e ottieni il totale finale per il cliente.",
        },
        {
            title: "Confrontare prezzi tra paesi con aliquote diverse",
            description:
                "Scorpora IVA da listini diversi per confrontare i costi reali su base netta.",
        },
    ],
    rateReferenceTitle: "Riferimento rapido aliquote IVA",
    countries: [
        {
            title: "Italia",
            rates: [
                { label: "Aliquota ordinaria", value: "22%" },
                { label: "Aliquota ridotta", value: "10%" },
                { label: "Aliquota super ridotta", value: "4%" },
            ],
        },
        {
            title: "Regno Unito",
            rates: [
                { label: "Standard", value: "20%" },
                { label: "Ridotta", value: "5%" },
                { label: "Zero", value: "0%" },
            ],
        },
    ],
    faqTitle: "Domande frequenti",
    faqItems,
    faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    },
    privacyTitle: "Privacy-first: tutto nel browser",
    privacyDescription:
        "I calcoli vengono eseguiti localmente nel browser: importi, aliquote e risultati non vengono inviati a server esterni.",
};

export default vatToolsHubIt;