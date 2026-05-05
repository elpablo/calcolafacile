

import UuidGenerator from "./UuidGenerator";

export const metadata = {
    title: "Online UUID Generator",
    description:
        "Generate UUID v4 online directly in the browser. Useful for software development, APIs, databases, testing, and unique identifiers without sending data to external servers.",
    alternates: {
        canonical: "https://calcolafacile.org/en/uuid-generator",
        languages: {
            it: "https://calcolafacile.org/it/uuid-generator",
            en: "https://calcolafacile.org/en/uuid-generator",
        },
    },
};

export default function UuidGeneratorPage() {
    return <UuidGenerator />;
}