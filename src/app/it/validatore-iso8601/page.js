

import { Suspense } from "react";
import Iso8601Validator from "./Iso8601Validator";

export const metadata = {
    title: "Validatore ISO8601 gratuito online",
    description:
        "Valida date e datetime ISO8601, controlla offset di fuso orario e converti valori in UTC e timestamp Unix direttamente nel browser.",
    alternates: {
        canonical: "https://calcolafacile.org/it/validatore-iso8601",
        languages: {
            it: "https://calcolafacile.org/it/validatore-iso8601",
            en: "https://calcolafacile.org/en/iso8601-validator",
        },
    },
};

export default function Page() {
    return (
        <Suspense>
            <Iso8601Validator />
        </Suspense>
    );
}