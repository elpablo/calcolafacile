import MarkupCalculator from "./MarkupCalculator";

export const metadata = {
    title: "Markup Calculator Online - Free Markup Tool",
    description:
        "Calculate markup from cost and selling price, or find the selling price needed to reach a target markup. Free tool for ecommerce, freelancers and small businesses.",
    alternates: {
        canonical: "https://calcolafacile.org/en/markup-calculation",
        languages: {
            it: "https://calcolafacile.org/it/calcolo-markup",
            en: "https://calcolafacile.org/en/markup-calculation",
        },
    },
};

export default function MarkupCalculationPage() {
    return <MarkupCalculator />;
}
