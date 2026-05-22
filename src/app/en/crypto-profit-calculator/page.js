import CryptoProfitCalculator from "./CryptoProfitCalculator";

export const metadata = {
    title: "Crypto Profit Calculator - Calculate Crypto Gains, Losses and ROI",
    description:
        "Free crypto profit calculator to estimate gains, losses and ROI from Bitcoin, Ethereum and other crypto investments.",
    alternates: {
        canonical: "https://calcolafacile.org/en/crypto-profit-calculator",
        languages: {
            en: "https://calcolafacile.org/en/crypto-profit-calculator",
            it: "https://calcolafacile.org/it/calcolatore-profitto-crypto",
        },
    },
    openGraph: {
        title: "Crypto Profit Calculator",
        description:
            "Estimate crypto gains, losses and ROI from buy price, sell price and trading fees.",
        url: "https://calcolafacile.org/en/crypto-profit-calculator",
        siteName: "CalcolaFacile",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Crypto Profit Calculator",
        description:
            "Calculate crypto profit, losses and ROI for Bitcoin, Ethereum and other crypto assets.",
    },
};

export default function Page() {
    return <CryptoProfitCalculator />;
}
