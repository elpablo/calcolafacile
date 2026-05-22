const compoundInterestIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    title: "Calcolatore interesse composto",
    currentPath: "/it/interesse-composto",
    description:
        "Calcola l’interesse composto di un investimento, aggiungi versamenti mensili opzionali e visualizza la crescita del capitale anno dopo anno.",
    labels: {
        principal: "Capitale iniziale",
        principalHelp: "L’importo investito all’inizio.",
        monthlyContribution: "Versamento mensile",
        monthlyContributionHelp: "Importo opzionale aggiunto ogni mese.",
        annualRate: "Rendimento medio annuo",
        annualRateHelp: "Rendimento annuo medio atteso. Non è garantito.",
        years: "Anni",
        yearsHelp: "Durata dell’investimento da 1 a 100 anni.",
        yearsShort: "anni",
        compoundingFrequency: "Frequenza di capitalizzazione",
        compoundingFrequencyHelp:
            "La capitalizzazione mensile applica gli interessi ogni mese. Quella annuale li applica una volta all’anno.",
        monthlyCompounding: "Mensile",
        yearlyCompounding: "Annuale",
        currencySuffix: "€",
        percentSuffix: "%",
        reset: "Ripristina",
        resultTitle: "Risultato interesse composto",
        finalBalance: "Capitale finale",
        totalContributions: "Totale investito",
        totalInterest: "Interessi maturati",
        growthMultiple: "Moltiplicatore crescita",
        chartTitle: "Curva di crescita",
        chartDescription: "Capitale stimato alla fine di ogni anno.",
        year: "Anno",
        contributions: "Versamenti",
        interest: "Interessi",
        endBalance: "Saldo finale",
        disclaimer:
            "Questo calcolatore ha solo finalità educative. I rendimenti sono stime basate sui valori inseriti e non rappresentano consulenza finanziaria né performance garantite.",
    },
    examples: [
        {
            title: "Piano di investimento mensile",
            description:
                "Parti da 5.000 €, aggiungi 200 € al mese e stima il risultato dopo 20 anni con un rendimento medio annuo del 5%.",
            href: "/it/interesse-composto?principal=5000&monthlyContribution=200&annualRate=5&years=20&compoundingFrequency=monthly",
        },
        {
            title: "Investimento una tantum",
            description:
                "Stima quanto potrebbero diventare 10.000 € in 15 anni con un rendimento medio annuo del 4% e senza versamenti aggiuntivi.",
            href: "/it/interesse-composto?principal=10000&monthlyContribution=0&annualRate=4&years=15&compoundingFrequency=yearly",
        },
        {
            title: "Scenario di risparmio a lungo termine",
            description:
                "Confronta l’effetto del tempo simulando un piano di 30 anni con versamenti mensili regolari.",
            href: "/it/interesse-composto?principal=1000&monthlyContribution=150&annualRate=6&years=30&compoundingFrequency=monthly",
        },
    ],
    contextualTools: [
        {
            href: "/it/calcolo-percentuale",
            title: "Calcolo percentuale",
            description:
                "Calcola aumenti, diminuzioni, sconti e valori proporzionali.",
        },
        {
            href: "/it/calcolo-margine",
            title: "Calcolo margine",
            description:
                "Calcola il margine di profitto partendo da costo e prezzo di vendita.",
        },
        {
            href: "/it/calcolo-markup",
            title: "Calcolo markup",
            description:
                "Calcola markup e prezzo di vendita partendo dal costo e dal profitto desiderato.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">
                Che cos’è l’interesse composto?
            </h3>
            <p>
                L’interesse composto significa che gli interessi vengono calcolati non
                solo sul capitale iniziale, ma anche sugli interessi accumulati nel
                tempo. Per questo gli orizzonti lunghi possono avere un impatto molto
                forte sul risultato finale.
            </p>

            <h3 className="mt-4 font-semibold">
                Posso includere versamenti mensili?
            </h3>
            <p>
                Sì. Inserisci un versamento mensile per stimare quanto un investimento
                regolare può modificare il capitale finale rispetto a un investimento
                una tantum.
            </p>

            <h3 className="mt-4 font-semibold">
                Il rendimento annuo è garantito?
            </h3>
            <p>
                No. Il rendimento annuo è solo un’ipotesi usata per il calcolo. Gli
                investimenti reali possono salire o scendere, e i risultati passati non
                garantiscono quelli futuri.
            </p>

            <h3 className="mt-4 font-semibold">
                Questo calcolatore invia i miei dati da qualche parte?
            </h3>
            <p>
                No. Il calcolo avviene nel browser. I valori possono essere salvati
                localmente sul tuo dispositivo per ripristinare l’ultimo scenario, ma
                non vengono inviati a un server esterno.
            </p>
        </>
    ),
};

export default compoundInterestIt;