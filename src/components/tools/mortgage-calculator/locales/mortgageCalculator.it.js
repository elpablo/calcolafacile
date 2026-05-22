const mortgageCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    title: "Calcolatore Mutuo",
    currentPath: "/it/calcolatore-mutuo",
    description:
        "Calcola rata mensile del mutuo, interessi totali, costo complessivo e piano di ammortamento annuale partendo da importo, tasso e durata.",
    labels: {
        propertyPrice: "Prezzo immobile",
        propertyPriceHelp: "Il prezzo totale della casa o dell’immobile.",
        downPayment: "Anticipo",
        downPaymentHelp: "La somma versata inizialmente prima del mutuo.",
        loanAmount: "Importo mutuo",
        loanAmountHelp: "Il capitale finanziato dalla banca.",
        annualRate: "Tasso annuale",
        annualRateHelp: "Il tasso di interesse nominale annuale del mutuo.",
        years: "Anni",
        yearsHelp: "Durata del mutuo in anni.",
        currencySuffix: "€",
        percentSuffix: "%",
        reset: "Ripristina",
        resultTitle: "Risultato mutuo",
        monthlyPayment: "Rata mensile",
        forMonths: "Per {months} rate mensili",
        totalInterest: "Interessi totali",
        totalPaid: "Totale pagato",
        totalCost: "Costo totale incluso anticipo",
        loanToValue: "Rapporto LTV",
        year: "Anno",
        principalPaid: "Capitale rimborsato",
        interestPaid: "Interessi pagati",
        remainingBalance: "Capitale residuo",
        disclaimer:
            "Questo calcolatore ha finalità informative e non include tasse, assicurazioni, costi notarili, spese bancarie o tassi variabili.",
    },
    examples: [
        {
            title: "Mutuo 30 anni",
            description:
                "Calcola la rata di un mutuo da 250.000 € su 30 anni con tasso annuo del 4%.",
            href: "/it/calcolatore-mutuo?propertyPrice=300000&downPayment=50000&loanAmount=250000&annualRate=4&years=30",
        },
        {
            title: "Mutuo 20 anni",
            description:
                "Confronta un mutuo più breve da 20 anni e osserva la differenza sugli interessi.",
            href: "/it/calcolatore-mutuo?propertyPrice=300000&downPayment=50000&loanAmount=250000&annualRate=4&years=20",
        },
        {
            title: "Anticipo ridotto",
            description:
                "Stima il mutuo con un anticipo più basso e un loan-to-value più elevato.",
            href: "/it/calcolatore-mutuo?propertyPrice=350000&downPayment=35000&loanAmount=315000&annualRate=4.5&years=30",
        },
    ],
    contextualTools: [
        {
            href: "/it/interesse-composto",
            title: "Calcolatore Interesse Composto",
            description:
                "Simula la crescita di investimenti con rendimento annuo e versamenti periodici.",
        },
        {
            href: "/it/calcolatore-roi",
            title: "Calcolatore ROI",
            description:
                "Calcola ritorno sull’investimento, profitto netto e ROI annualizzato.",
        },
        {
            href: "/it/calcolo-percentuale",
            title: "Calcolatore Percentuale",
            description:
                "Calcola aumenti, sconti, variazioni percentuali e proporzioni.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">
                Come viene calcolata la rata del mutuo?
            </h3>
            <p>
                La rata mensile viene calcolata usando la formula standard dei
                mutui ammortizzati in base all’importo finanziato, al tasso
                annuo e alla durata del mutuo.
            </p>

            <h3 className="mt-4 font-semibold">
                Questo calcolatore include tasse e assicurazioni?
            </h3>
            <p>
                No. Il calcolo considera solo capitale e interessi. Tasse,
                assicurazioni, costi notarili e spese bancarie non sono inclusi.
            </p>

            <h3 className="mt-4 font-semibold">
                Che cos’è il rapporto LTV?
            </h3>
            <p>
                Il rapporto LTV, o Loan-to-Value, confronta l’importo del
                mutuo con il prezzo dell’immobile. Un LTV più basso indica
                generalmente un anticipo più elevato e un rischio minore per
                la banca.
            </p>

            <h3 className="mt-4 font-semibold">
                Cosa mostra il piano di ammortamento annuale?
            </h3>
            <p>
                La tabella annuale mostra quanto capitale e interessi vengono
                pagati ogni anno e il capitale residuo alla fine di ciascun
                anno.
            </p>

            <h3 className="mt-4 font-semibold">
                I miei dati vengono inviati a un server?
            </h3>
            <p>
                No. I calcoli vengono eseguiti direttamente nel browser. I
                valori possono essere salvati localmente sul dispositivo per
                ripristinare l’ultima simulazione, ma non vengono inviati a
                server esterni.
            </p>
        </>
    ),
};

export default mortgageCalculatorIt;