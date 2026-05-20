import CompoundInterest from "./CompoundInterest";

export const metadata = {
    title: "Compound Interest Calculator - Investment Growth Simulator",
    description:
        "Calculate compound interest, simulate monthly contributions and visualize investment growth over time with interactive charts and yearly breakdowns.",
    alternates: {
        canonical: "https://calcolafacile.org/en/compound-interest",
        languages: {
            it: "https://calcolafacile.org/it/interesse-composto",
            en: "https://calcolafacile.org/en/compound-interest",
        },
    },
};

export default function Page() {
    return <CompoundInterest />;
}