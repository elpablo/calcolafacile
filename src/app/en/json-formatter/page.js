import { Suspense } from "react";
import JsonFormatter from "./JsonFormatter";

export const metadata = {
    title: "JSON Formatter Online - Format and Validate JSON",
    description:
        "Format and validate JSON online directly in your browser. No data is sent to external servers.",
    alternates: {
        canonical: "https://calcolafacile.org/en/json-formatter",
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
