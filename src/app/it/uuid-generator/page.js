

import UuidGenerator from "./UuidGenerator";

export const metadata = {
    title: "UUID Generator online",
    description:
        "Genera UUID v4 online direttamente nel browser. Utile per sviluppo software, API, database, test e identificatori univoci senza inviare dati a server esterni.",
    alternates: {
        canonical: "https://calcolafacile.org/it/uuid-generator",
        languages: {
            it: "https://calcolafacile.org/it/uuid-generator",
            en: "https://calcolafacile.org/en/uuid-generator",
        },
    },
};

export default function UuidGeneratorPage() {
    return <UuidGenerator />;
}