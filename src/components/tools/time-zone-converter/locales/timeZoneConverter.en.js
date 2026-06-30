import { localizeTimeZoneConverterExamples } from "../timeZoneConverterExamples";

const timeZoneConverterEn = {
    lang: "en",
    locale: "en-US",
    currentPath: "/en/time-zone-converter",
    toolKey: "timeZoneConverter",
    metadata: {
        title: "Time Zone Converter",
        description:
            "Convert a date and time between time zones with visual 24-hour timelines, UTC offsets and day-change indicators.",
        intro:
            "Choose a source time zone, add one or more target zones and compare local times on a simple timeline.",
    },
    description:
        "Convert meetings, server logs and travel times between UTC, Europe, US and Asia time zones. The visual timeline highlights central hours, daytime and night.",
    sample: {
        date: "2026-05-24",
        time: "14:00",
        sourceTimeZone: "Europe/Rome",
        targetTimeZones: ["UTC", "Europe/London", "America/New_York", "Asia/Tokyo"],
    },
    labels: {
        dateLabel: "Date",
        timeLabel: "Time",
        sourceTimeZoneLabel: "Source time zone",
        targetTimeZonesTitle: "Target time zones",
        targetTimeZonesDescription:
            "Compare the same instant across multiple places.",
        targetTimeZoneLabel: "Target time zone",
        addTargetLabel: "Add time zone",
        removeTargetLabel: "Remove time zone",
        sourceResultLabel: "Source time",
        timelineTitle: "24-hour timeline",
        timelineDescription:
            "Each marker shows where the converted time falls during the local day.",
        sameDay: "Same day",
        nextDay: "Next day",
        previousDay: "Previous day",
        dayOffsetFuture: "+{days} days",
        dayOffsetPast: "-{days} days",
        businessHours: "Central hours",
        daytime: "Daytime",
        nighttime: "Night",
        timeZoneNames: {
            UTC: "UTC",
            "Europe/Rome": "Rome / Milan",
            "Europe/London": "London",
            "Europe/Paris": "Paris",
            "America/New_York": "New York",
            "America/Chicago": "Chicago",
            "America/Los_Angeles": "Los Angeles",
            "America/Sao_Paulo": "São Paulo",
            "Asia/Dubai": "Dubai",
            "Asia/Kolkata": "Mumbai / Delhi",
            "Asia/Singapore": "Singapore",
            "Asia/Tokyo": "Tokyo",
            "Australia/Sydney": "Sydney",
        },
    },
    examples: localizeTimeZoneConverterExamples("en", "/en/time-zone-converter"),
    contextualTools: [
        {
            href: "/en/timestamp-converter",
            title: "Timestamp Converter",
            description:
                "Convert Unix timestamps to readable dates, or get a timestamp for a specific date and time.",
        },
        {
            href: "/en/iso8601-validator",
            title: "ISO8601 Validator",
            description:
                "Validate and convert ISO8601 date strings used by APIs and databases.",
        },
    ],
    faq: (
        <>
            <h3 className="mt-4 font-semibold">How does the time zone converter work?</h3>
            <p>
                The tool interprets the entered date and time in the source time
                zone, converts that instant to UTC, then formats the same instant
                in each selected target time zone.
            </p>

            <h3 className="mt-4 font-semibold">Does it handle daylight saving time?</h3>
            <p>
                Yes. Conversions use IANA time zone names such as Europe/Rome and
                America/New_York, so daylight saving rules are applied by the
                browser runtime for the selected date.
            </p>

            <h3 className="mt-4 font-semibold">What do the timeline colors mean?</h3>
            <p>
                Central hours marks the 9:00–18:00 interval, daytime marks
                6:00–22:00, and night marks the remaining hours. It is only a
                visual cue and may not match local habits or working schedules.
            </p>
        </>
    ),
};

export default timeZoneConverterEn;