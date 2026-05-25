import TimeZoneConverter from "./TimeZoneConverter";

export const metadata = {
    title: "Time Zone Converter | UTC, World Clock and Meeting Times",
    description:
        "Convert dates and times between time zones with a visual 24-hour timeline, UTC offsets, day-change indicators and business-hour highlights.",
    alternates: {
        canonical: "https://calcolafacile.org/en/time-zone-converter",
        languages: {
            it: "https://calcolafacile.org/it/convertitore-fusi-orari",
            en: "https://calcolafacile.org/en/time-zone-converter",
        },
    },
};

export default function Page() {
    return <TimeZoneConverter />;
}