

import Base64Tool from "./Base64Tool";

export const metadata = {
    title: "Base64 Encode and Decode Online",
    description:
        "Encode and decode Base64 online directly in your browser. Useful for APIs, tokens, payloads and debugging without sending data to external servers.",
    alternates: {
        canonical: "https://calcolafacile.org/en/base64-tool",
        languages: {
            it: "https://calcolafacile.org/it/base64-tool",
            en: "https://calcolafacile.org/en/base64-tool",
        },
    },
};

export default function Base64ToolPage() {
    return <Base64Tool />;
}