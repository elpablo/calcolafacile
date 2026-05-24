export const vatCalculatorExamples = [
    {
        key: "uk-standard-add",
        title: {
            en: "UK standard VAT",
            it: "IVA standard UK",
        },
        description: {
            en: "Add 20% VAT to a net amount of 100.",
            it: "Aggiungi il 20% di IVA a un importo netto di 100.",
        },
        params: {
            amount: 100,
            rate: 20,
            mode: "add",
        },
    },
    {
        key: "uk-remove-vat",
        title: {
            en: "Remove UK VAT",
            it: "Scorpora IVA UK",
        },
        description: {
            en: "Remove 20% VAT from a gross amount of 120.",
            it: "Scorpora il 20% di IVA da un importo lordo di 120.",
        },
        params: {
            amount: 120,
            rate: 20,
            mode: "remove",
        },
    },
    {
        key: "italy-standard-add",
        title: {
            en: "Italy standard VAT",
            it: "IVA ordinaria Italia",
        },
        description: {
            en: "Add 22% Italian VAT to a net amount of 100.",
            it: "Aggiungi il 22% di IVA italiana a un importo netto di 100.",
        },
        params: {
            amount: 100,
            rate: 22,
            mode: "add",
        },
    },
    {
        key: "custom-rate",
        title: {
            en: "Custom VAT rate",
            it: "Aliquota personalizzata",
        },
        description: {
            en: "Calculate VAT with a custom 17.5% rate.",
            it: "Calcola l’IVA con un’aliquota personalizzata del 17,5%.",
        },
        params: {
            amount: 250,
            rate: 17.5,
            mode: "add",
        },
    },
];