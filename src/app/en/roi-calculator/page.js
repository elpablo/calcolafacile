import RoiCalculator from "./RoiCalculator";

export const metadata = {
    title: "ROI Calculator - Calculate Return on Investment and Annualized ROI",
    description:
        "Free ROI calculator to calculate return on investment, net profit, annualized ROI and investment multiple from cost and final value.",
    alternates: {
        canonical: "https://calcolafacile.org/en/roi-calculator",
        languages: {
            en: "https://calcolafacile.org/en/roi-calculator",
            it: "https://calcolafacile.org/it/calcolatore-roi",
        },
    },
    openGraph: {
        title: "ROI Calculator",
        description:
            "Calculate return on investment, net profit, annualized ROI and investment multiple.",
        url: "https://calcolafacile.org/en/roi-calculator",
        siteName: "CalcolaFacile",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ROI Calculator",
        description:
            "Calculate ROI, net profit and annualized return from investment cost and final value.",
    },
};

export default function Page() {
    return <RoiCalculator />;
}