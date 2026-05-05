

import MarginCalculator from "./MarginCalculator";

export const metadata = {
    title: "Margin Calculator Online - Profit Margin Tool",
    description:
        "Calculate profit margin easily from cost and selling price. Free tool for freelancers, ecommerce and small businesses.",
    alternates: {
        canonical: "https://calcolafacile.org/en/margin-calculation",
        languages: {
            it: "https://calcolafacile.org/it/calcolo-margine",
            en: "https://calcolafacile.org/en/margin-calculation",
        },
    },
};

export default function MarginCalculationPage() {
    return <MarginCalculator />;
}