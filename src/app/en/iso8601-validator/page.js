import Iso8601Validator from "./Iso8601Validator";

export const metadata = {
    title: "ISO8601 Validator - Validate Dates, Timezones and Unix Timestamps",
    description:
        "Validate ISO8601 date and datetime strings, inspect timezone offsets and convert valid values to UTC and Unix timestamps.",
    alternates: {
        canonical: "https://calcolafacile.org/en/iso8601-validator",
        languages: {
            it: "https://calcolafacile.org/it/validatore-iso8601",
            en: "https://calcolafacile.org/en/iso8601-validator",
        },
    },
};

export default function Page() {
    return <Iso8601Validator />;
}
