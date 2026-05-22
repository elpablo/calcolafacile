import CryptoProfitCalculator from "./CryptoProfitCalculator";

export const metadata = {
    title: "Calcolatore profitto crypto - Calcola guadagni, perdite e ROI",
    description:
        "Calcolatore gratuito per stimare profitto, perdita e ROI di Bitcoin, Ethereum e altre crypto partendo da prezzo di acquisto, vendita e commissioni.",
    alternates: {
        canonical: "https://calcolafacile.org/it/calcolatore-profitto-crypto",
        languages: {
            it: "https://calcolafacile.org/it/calcolatore-profitto-crypto",
            en: "https://calcolafacile.org/en/crypto-profit-calculator",
        },
    },
    openGraph: {
        title: "Calcolatore profitto crypto",
        description:
            "Stima guadagni, perdite e ROI crypto da prezzo di acquisto, prezzo di vendita e commissioni.",
        url: "https://calcolafacile.org/it/calcolatore-profitto-crypto",
        siteName: "CalcolaFacile",
        locale: "it_IT",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Calcolatore profitto crypto",
        description:
            "Calcola profitto, perdita e ROI per Bitcoin, Ethereum e altre crypto.",
    },
};

export default function Page() {
    return <CryptoProfitCalculator />;
}
