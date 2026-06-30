

const iso8601ValidatorEn = {
    lang: "en",
    locale: "en-US",
    title: "ISO8601 Validator",
    currentPath: "/en/iso8601-validator",
    description:
        "Validate ISO8601 date and datetime strings, inspect timezone offsets and convert valid values to UTC and Unix timestamps.",
    labels: {
        input: "Input",
        valueLabel: "ISO8601 value",
        valuePlaceholder: "Example: 2026-05-17T14:30:00+02:00",
        valueHelp:
            "Supports date-only values, datetimes, fractional seconds and timezone offsets such as Z, +02:00 or +0200.",
        clear: "Clear",
        validResult: "Valid ISO8601 value",
        invalidResult: "Invalid ISO8601 value",
        validMessage: "This value matches a supported ISO8601 format.",
        invalidMessage: "This value is not valid.",
        normalized: "Normalized value",
        timezone: "Timezone offset",
        noTimezone: "No explicit timezone",
        utc: "UTC value",
        notAvailable: "Not available",
        unixSeconds: "Unix seconds",
        unixMilliseconds: "Unix milliseconds",
        error: "Error",
        errors: {
            empty: "Enter a date or datetime value to validate.",
            format: "Use a supported format such as YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ.",
            month: "Month must be between 01 and 12.",
            day: "The day is not valid for the selected month.",
            time: "Hour, minute or second values are outside the supported range.",
            timezone: "The timezone offset is outside the supported range.",
        },
    },
    examples: [
        {
            title: "Validate an API timestamp",
            description:
                "Check whether a timestamp returned by an API is valid and see its UTC representation.",
        },
        {
            title: "Inspect timezone offsets",
            description:
                "Compare values such as Z, +02:00 and +0200 to understand how they map to UTC.",
        },
        {
            title: "Debug logs and database values",
            description:
                "Paste timestamps from logs or database fields and convert them to Unix seconds and milliseconds.",
        },
    ],
    contextualTools: [
        {
            href: "/en/timestamp-converter",
            title: "Timestamp Converter",
            description:
                "Convert Unix timestamps to readable dates and back.",
        },
        {
            href: "/en/json-formatter",
            title: "JSON Formatter",
            description:
                "Format and validate JSON payloads that often contain ISO date strings.",
        },
        {
            href: "/en/time-zone-converter",
            title: "Time Zone Converter",
            description:
                "Compare a validated date and time across multiple time zones.",
        },
        {
            href: "/en/developer-tools",
            title: "Developer Tools",
            description:
                "Browse browser-based utilities for everyday web development.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">
                What is ISO8601?
            </h3>
            <p>
                ISO8601 is a standard way to write dates and times, commonly used
                in APIs, databases, logs and backend systems.
            </p>

            <h3 className="mt-4 font-semibold">
                Does this validator send my data anywhere?
            </h3>
            <p>
                No. The validation runs in your browser, so pasted timestamps are
                not sent to an external server.
            </p>

            <h3 className="mt-4 font-semibold">
                What happens when no timezone is provided?
            </h3>
            <p>
                A date-only value is treated as a calendar date. A datetime without
                an explicit timezone is accepted, but the UTC conversion is based on
                the parsed numeric fields rather than a named local timezone.
            </p>
        </>
    ),
};

export default iso8601ValidatorEn;