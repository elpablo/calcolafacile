import PublicIpChecker from "./PublicIpChecker";

export const metadata = {
    title: "Public IP Checker | CalcolaFacile",
    description:
        "Check your public IP address, approximate location, timezone and VPN exit node information directly from your browser.",
     alternates: {
        canonical: "https://calcolafacile.org/en/public-ip-checker",
        languages: {
            it: "https://calcolafacile.org/it/public-ip-checker",
            en: "https://calcolafacile.org/en/public-ip-checker",
        },
    },
};

export default function Page() {
    return <PublicIpChecker />;
}
