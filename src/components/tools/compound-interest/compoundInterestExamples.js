export const compoundInterestExamples = [
    {
        key: "monthly-investment",
        title: "Investimento mensile",
        description:
            "Capitale iniziale di 5.000 €, versamento mensile di 200 €, rendimento medio annuo del 5% per 20 anni.",
        params: {
            principal: 5000,
            monthlyContribution: 200,
            annualRate: 5,
            years: 20,
            compoundingFrequency: "monthly",
        },
    },
    {
        key: "lump-sum",
        title: "Solo capitale iniziale",
        description:
            "10.000 € investiti per 15 anni con rendimento medio annuo del 4%, senza versamenti aggiuntivi.",
        params: {
            principal: 10000,
            monthlyContribution: 0,
            annualRate: 4,
            years: 15,
            compoundingFrequency: "yearly",
        },
    },
];
