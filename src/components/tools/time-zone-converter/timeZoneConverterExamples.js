export const timeZoneConverterExamples = [
    {
        key: "rome-to-global",
        title: {
            it: "Da Roma a New York e Tokyo",
            en: "Rome to New York and Tokyo",
        },
        description: {
            it: "Confronta una riunione alle 14:00 a Roma con Londra, New York e Tokyo.",
            en: "Compare a 2 PM meeting in Rome with London, New York and Tokyo.",
        },
        params: {
            date: "2026-05-24",
            time: "14:00",
            sourceTimeZone: "Europe/Rome",
            targetTimeZones: [
                "UTC",
                "Europe/London",
                "America/New_York",
                "Asia/Tokyo",
            ],
        },
    },
    {
        key: "utc-to-us",
        title: {
            it: "Da UTC ai fusi orari USA",
            en: "UTC to US time zones",
        },
        description: {
            it: "Converti un orario di deploy UTC negli orari di New York, Chicago e Los Angeles.",
            en: "Convert a UTC deployment time to New York, Chicago and Los Angeles.",
        },
        params: {
            date: "2026-05-24",
            time: "18:00",
            sourceTimeZone: "UTC",
            targetTimeZones: [
                "America/New_York",
                "America/Chicago",
                "America/Los_Angeles",
            ],
        },
    },
    {
        key: "tokyo-to-europe",
        title: {
            it: "Da Tokyo all'Europa",
            en: "Tokyo to Europe",
        },
        description: {
            it: "Verifica se una call serale a Tokyo cade dentro gli orari lavorativi europei.",
            en: "Check whether a Tokyo evening call lands during European business hours.",
        },
        params: {
            date: "2026-05-24",
            time: "21:00",
            sourceTimeZone: "Asia/Tokyo",
            targetTimeZones: ["Europe/Rome", "Europe/London", "UTC"],
        },
    },
    {
        key: "la-to-sydney",
        title: {
            it: "Da Los Angeles a Sydney",
            en: "Los Angeles to Sydney",
        },
        description: {
            it: "Controlla il cambio giorno tra California e Australia per call o viaggi.",
            en: "Check day changes between California and Australia for calls or travel.",
        },
        params: {
            date: "2026-05-24",
            time: "16:30",
            sourceTimeZone: "America/Los_Angeles",
            targetTimeZones: ["Australia/Sydney", "Asia/Tokyo", "Europe/London"],
        },
    },
];

export function localizeTimeZoneConverterExamples(lang, basePath) {
    return timeZoneConverterExamples.map((example) => ({
        title: example.title[lang],
        description: example.description[lang],
        href: `${basePath}?${new URLSearchParams({
            date: example.params.date,
            time: example.params.time,
            sourceTimeZone: example.params.sourceTimeZone,
            targetTimeZones: example.params.targetTimeZones.join(","),
        }).toString()}`,
    }));
}