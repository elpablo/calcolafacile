

import TimestampConverter from "./TimestampConverter";

export const metadata = {
    title: "Timestamp Converter online - Unix timestamp e date",
    description:
        "Converti Unix timestamp in data leggibile e date in timestamp direttamente nel browser. Utile per API, log, database e JWT.",
    alternates: {
        canonical: "https://calcolafacile.org/it/timestamp-converter",
        languages: {
            it: "https://calcolafacile.org/it/timestamp-converter",
            en: "https://calcolafacile.org/en/timestamp-converter",
        },
    },
};

export default function TimestampConverterPage() {
    return <TimestampConverter />;
}