

const timestampConverterEn = {
    lang: "en",
    locale: "en-US",
    title: "Unix Timestamp Converter Online",
    currentPath: "/en/timestamp-converter",
    description:
        "Convert Unix timestamps and epoch time to readable dates, or convert dates back to Unix timestamps. Useful for APIs, logs, databases and JWT fields such as exp, iat and nbf.",
    contextualTools: [
        {
            href: "/en/jwt-decoder",
            title: "Decode JWT",
            description: "to inspect exp, iat and nbf fields inside token payloads.",
        },
        {
            href: "/en/json-formatter",
            title: "Format JSON",
            description: "to read API responses, log payloads and timestamp fields more easily.",
        },
        {
            href: "/en/url-encoder-decoder",
            title: "URL Encoder/Decoder",
            description: "to decode timestamps passed inside query strings or callback URLs.",
        },
    ],
    examples: [
        {
            title: "Convert JWT exp, iat and nbf values",
            description:
                "Copy timestamp claims from a JWT payload and convert them into readable local dates, relative time and ISO format.",
        },
        {
            title: "Read Unix timestamps from logs and APIs",
            description:
                "When a server log or API response contains epoch time, quickly convert it to a readable date in your local timezone.",
        },
        {
            title: "Convert a date to Unix timestamp",
            description:
                "Enter a date in MM/DD/YYYY HH:mm format to get Unix timestamp values in both seconds and milliseconds.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">What is a Unix timestamp?</h3>
            <p>
                A Unix timestamp, also called epoch time, is a number representing the time elapsed since January 1, 1970 at 00:00:00 UTC.
            </p>

            <h3 className="mt-2 font-semibold">What is the difference between seconds and milliseconds?</h3>
            <p>
                Unix timestamps are often stored in seconds, while JavaScript and many APIs use milliseconds. This tool supports both formats.
            </p>

            <h3 className="mt-2 font-semibold">Is the conversion sent to a server?</h3>
            <p>
                No. Timestamp conversion happens directly in your browser without sending data to external servers.
            </p>
        </>
    ),
    sample: {
        timestamp: 1714560000,
        unit: "seconds",
        dateTime: "05/01/2024 12:00",
    },
    labels: {
        modes: {
            timestampToDate: "Timestamp → Date",
            dateToTimestamp: "Date → Timestamp",
        },
        timestamp: "Timestamp",
        timestampPlaceholder: "Ex. 1714560000",
        timezone: "Timezone",
        unit: "Unit",
        units: {
            seconds: "Seconds",
            milliseconds: "Milliseconds",
            secondsFull: "Unix timestamp (seconds)",
            millisecondsFull: "Unix timestamp (milliseconds)",
        },
        localDateTime: "Local date and time",
        utcDateTime: "UTC date and time",
        datePlaceholder: "Ex. 05/01/2024 12:00",
        dateHelper:
            "Use the format MM/DD/YYYY HH:mm. The date is interpreted in your browser's local timezone and converted to Unix time.",
        relative: "Relative time",
        useExample: "Use sample",
        useNow: "Now",
        errors: {
            invalidTimestamp: "Enter a valid timestamp.",
            invalidDate: "Enter a valid date in the format MM/DD/YYYY HH:mm.",
        },
    },
};

export default timestampConverterEn;