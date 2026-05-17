

import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Free Network and Security Tools for Public IP, VPN and Web Checks",
    description:
        "Free browser-based network and security tools to check your public IP, VPN status and connection information.",
    alternates: {
        canonical: "https://calcolafacile.org/en/network-security",
        languages: {
            it: "https://calcolafacile.org/it/rete-e-sicurezza",
            en: "https://calcolafacile.org/en/network-security",
        },
    },
};

export default function NetworkSecurityPage() {
    return (
        <CategoryPageLayout
            lang="en"
            category="network"
            eyebrow="Network & Security"
            title="Free network and security tools"
            description={
                <p>
                    Check your public IP address, review basic connection details
                    and understand whether your browsing traffic appears to come
                    from a VPN or proxy. These tools are designed for quick privacy,
                    networking and troubleshooting checks.
                </p>
            }
            toolsTitle="Available network and security tools"
            seoTitle="Quick checks for IP, VPN and connection visibility"
            seoText={
                <p>
                    Knowing what information your connection exposes is useful when
                    working remotely, testing VPNs, debugging network issues or
                    checking how a website sees your browser. CalcolaFacile keeps
                    these checks simple and easy to run directly from the browser.
                </p>
            }
        />
    );
}