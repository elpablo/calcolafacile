

import PublicIpChecker from "./PublicIpChecker";

export const metadata = {
    title: "Verifica IP pubblico | CalcolaFacile",
    description:
        "Controlla il tuo IP pubblico, la posizione approssimativa, il fuso orario e le informazioni della VPN direttamente dal browser.",
    alternates: {
        canonical: "https://calcolafacile.org/it/verifica-ip-pubblico",
        languages: {
            it: "https://calcolafacile.org/it/verifica-ip-pubblico",
            en: "https://calcolafacile.org/en/public-ip-checker",
        },
    },
};

export default function Page() {
    return <PublicIpChecker />;
}