export const roiCalculatorExamples = [
    {
        key: "basic-investment",
        title: {
            en: "Basic investment ROI",
            it: "ROI investimento base",
        },
        description: {
            en: "Calculate the ROI of an investment that costs 10,000 and returns 15,000 after one year.",
            it: "Calcola il ROI di un investimento che costa 10.000 e restituisce 15.000 dopo un anno.",
        },
        params: {
            initialInvestment: 10000,
            finalValue: 15000,
            additionalCosts: 0,
            years: 1,
        },
    },
    {
        key: "marketing-campaign",
        title: {
            en: "Marketing campaign ROI",
            it: "ROI campagna marketing",
        },
        description: {
            en: "Estimate ROI for a campaign with 5,000 of spend, 750 of extra costs and 9,000 of revenue.",
            it: "Stima il ROI di una campagna con 5.000 di spesa, 750 di costi extra e 9.000 di ricavi.",
        },
        params: {
            initialInvestment: 5000,
            finalValue: 9000,
            additionalCosts: 750,
            years: 0.25,
        },
    },
    {
        key: "multi-year-investment",
        title: {
            en: "Multi-year investment",
            it: "Investimento pluriennale",
        },
        description: {
            en: "Compare total ROI and annualized ROI for a 25,000 investment that becomes 40,000 after 5 years.",
            it: "Confronta ROI totale e ROI annualizzato per un investimento da 25.000 che diventa 40.000 dopo 5 anni.",
        },
        params: {
            initialInvestment: 25000,
            finalValue: 40000,
            additionalCosts: 0,
            years: 5,
        },
    },
];