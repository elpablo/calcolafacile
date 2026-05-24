import AngleConverter from "./AngleConverter";

export const metadata = {
    title: "Convertitore angoli | Gradi, radianti, gradianti e giri",
    description:
        "Converti angoli tra gradi, radianti, gradianti e giri con anteprima visuale su un cerchio. Utile per matematica, geometria, ingegneria e cerchio unitario.",
    alternates: {
        canonical: "https://calcolafacile.org/it/convertitore-angoli",
        languages: {
            it: "https://calcolafacile.org/it/convertitore-angoli",
            en: "https://calcolafacile.org/en/angle-converter",
        },
    },
};

export default function Page() {
    return <AngleConverter />;
}