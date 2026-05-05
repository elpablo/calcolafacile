

import Base64Tool from "./Base64Tool";

export const metadata = {
    title: "Base64 Encode e Decode online",
    description:
        "Codifica e decodifica Base64 online direttamente nel browser. Utile per API, token, payload e debugging senza inviare dati a server esterni.",
    alternates: {
        canonical: "https://calcolafacile.org/it/base64-tool",
        languages: {
            it: "https://calcolafacile.org/it/base64-tool",
            en: "https://calcolafacile.org/en/base64-tool",
        },
    },
};

export default function Base64ToolPage() {
    return <Base64Tool />;
}