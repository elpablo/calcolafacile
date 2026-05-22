import RoiCalculator from "./RoiCalculator";

export const metadata = {
    title: "Calcolatore ROI - Calcola ritorno sull’investimento e ROI annualizzato",
    description:
        "Calcolatore gratuito per stimare ritorno sull’investimento, profitto netto, ROI annualizzato e multiplo investimento partendo da costo e valore finale.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolatore-roi",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-roi",
            en: "https://calcolafacile.org/en/roi-calculator",
        },
    },
    openGraph: {
        title: "Calcolatore ROI",
        description:
            "Calcola ritorno sull’investimento, profitto netto, ROI annualizzato e multiplo investimento.",
        url: "https://calcolafacile.org/it/calcolatore-roi",
        siteName: "CalcolaFacile",
        locale: "it_IT",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Calcolatore ROI",
        description:
            "Calcola ROI, profitto netto e rendimento annualizzato da costo e valore finale.",
    },
};

export default function Page() {
    return <RoiCalculator />;
}