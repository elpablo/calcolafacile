export const mortgageCalculatorExamples = [
    {
        key: "standard-30-year",
        title: {
            en: "30-year mortgage",
            it: "Mutuo 30 anni",
        },
        description: {
            en: "Estimate the monthly payment for a 300,000 property with 50,000 down payment, 250,000 mortgage and 4% annual rate.",
            it: "Calcola la rata di un immobile da 300.000 con 50.000 di anticipo, mutuo da 250.000 e tasso annuo del 4%.",
        },
        params: {
            propertyPrice: 300000,
            downPayment: 50000,
            loanAmount: 250000,
            annualRate: 4,
            years: 30,
        },
    },
    {
        key: "shorter-20-year",
        title: {
            en: "20-year mortgage",
            it: "Mutuo 20 anni",
        },
        description: {
            en: "Compare a shorter 20-year mortgage with a higher monthly payment but lower total interest.",
            it: "Confronta un mutuo più breve da 20 anni con rata più alta ma interessi totali più bassi.",
        },
        params: {
            propertyPrice: 300000,
            downPayment: 50000,
            loanAmount: 250000,
            annualRate: 4,
            years: 20,
        },
    },
    {
        key: "low-down-payment",
        title: {
            en: "Low down payment",
            it: "Anticipo ridotto",
        },
        description: {
            en: "Estimate a mortgage with a smaller down payment and a higher loan-to-value ratio.",
            it: "Stima un mutuo con anticipo più basso e loan-to-value più elevato.",
        },
        params: {
            propertyPrice: 350000,
            downPayment: 35000,
            loanAmount: 315000,
            annualRate: 4.5,
            years: 30,
        },
    },
];