const salaryCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    currencyAffix: { suffix: "€" },
    title: "Calcolo stipendio netto da lordo",
    currentPath: "/it/calcolo-stipendio-netto",
    description:
        "Questo calcolatore ti permette di stimare lo stipendio netto partendo dalla RAL (reddito annuo lordo). Il risultato è una stima media utile per avere un'idea del netto mensile.",
    contextualTools: [],
    examples: [
        {
            title: "Calcolare lo stipendio netto da una RAL di 30.000 €",
            description:
                "Inserisci 30000 come RAL per ottenere una stima del netto mensile e annuale.",
        },
        {
            title: "Confrontare offerte di lavoro",
            description:
                "Puoi inserire diverse RAL per capire quanto cambia il netto tra due proposte di lavoro.",
        },
        {
            title: "Stimare il netto prima di accettare un contratto",
            description:
                "Usa il calcolatore per avere un'idea del netto mensile prima di firmare un nuovo contratto.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Come si calcola il netto dalla RAL?</h3>
            <p>
                Il netto dipende da imposte e detrazioni. Questo strumento usa una stima media per
                fornire un risultato rapido.
            </p>

            <h3 className="font-semibold mt-2">Il risultato è preciso?</h3>
            <p>
                No, è una stima. Il netto reale dipende da molti fattori come residenza, contratto
                e detrazioni.
            </p>
        </>
    ),
    sample: {
        grossAnnualIncome: "30000",
    },
    labels: {
        grossLabel: "RAL lordo annuo (€)",
        grossPlaceholder: "Es. 30000",
        grossHelp: "Inserisci la retribuzione annua lorda",
        monthlyLabel: "Netto mensile stimato",
        annualLabel: "Netto annuo stimato",
        invalid: "Inserisci una RAL valida maggiore di 0.",
        copyText: (monthly) => `${monthly} al mese`,
        detail: ({ gross, monthly }) =>
            `Con una RAL di ${gross}, il netto stimato è di ${monthly} al mese.`,
    },
};

export default salaryCalculatorIt;
