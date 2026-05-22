export const roiCalculatorExamples = [
    {
        key: "basic-investment",
        title: "Basic investment ROI",
        description:
            "Calculate the ROI of an investment that costs 10,000 and returns 15,000 after one year.",
        params: {
            initialInvestment: 10000,
            finalValue: 15000,
            additionalCosts: 0,
            years: 1,
        },
    },
    {
        key: "marketing-campaign",
        title: "Marketing campaign ROI",
        description:
            "Estimate ROI for a campaign with 5,000 of spend, 750 of extra costs and 9,000 of revenue.",
        params: {
            initialInvestment: 5000,
            finalValue: 9000,
            additionalCosts: 750,
            years: 0.25,
        },
    },
    {
        key: "multi-year-investment",
        title: "Multi-year investment",
        description:
            "Compare total ROI and annualized ROI for a 25,000 investment that becomes 40,000 after 5 years.",
        params: {
            initialInvestment: 25000,
            finalValue: 40000,
            additionalCosts: 0,
            years: 5,
        },
    },
];