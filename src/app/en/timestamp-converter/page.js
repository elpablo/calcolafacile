

import TimestampConverter from "./TimestampConverter";

export const metadata = {
    title: "Timestamp Converter Online - Unix Timestamp to Date",
    description:
        "Convert Unix timestamps to readable dates and dates to timestamps directly in the browser. Useful for APIs, logs, databases, and JWTs.",
    alternates: {
        canonical: "https://calcolafacile.org/en/timestamp-converter",
        languages: {
            it: "https://calcolafacile.org/it/timestamp-converter",
            en: "https://calcolafacile.org/en/timestamp-converter",
        },
    },
};

export default function TimestampConverterPage() {
    return <TimestampConverter />;
}