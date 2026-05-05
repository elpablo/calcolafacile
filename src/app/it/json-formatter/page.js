import { Suspense } from "react";
import JsonFormatter from "./JsonFormatter";

export const metadata = {
    title: "JSON Formatter online",
    description:
        "Formatta e valida JSON online direttamente nel browser. Nessun dato viene inviato a server esterni.",
    alternates: {
        canonical: "https://calcolafacile.org/it/json-formatter",
        languages: {
            it: "https://calcolafacile.org/it/json-formatter",
            en: "https://calcolafacile.org/en/json-formatter",
        },
    },
};

export default function JsonFormatterPage() {
    return (
        <Suspense fallback={null}>
            <JsonFormatter />
        </Suspense>
    );
}
