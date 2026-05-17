/**
 * Example ISO8601 values used by the ISO8601 Validator UI and tests.
 */
export const iso8601ValidatorExamples = [
    {
        key: "date-only",
        value: "2026-05-17",
    },
    {
        key: "utc-datetime",
        value: "2026-05-17T14:30:00Z",
    },
    {
        key: "offset-datetime",
        value: "2026-05-17T14:30:00+02:00",
    },
    {
        key: "fractional-seconds",
        value: "2026-05-17T14:30:00.123Z",
    },
];

/**
 * Return just the example values, useful for quick sample buttons.
 */
export function getIso8601ExampleValues() {
    return iso8601ValidatorExamples.map((example) => example.value);
}