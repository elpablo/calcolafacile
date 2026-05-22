export const regexTesterExamples = [
    {
        key: "email",
        title: "Email addresses",
        description:
            "Find email-like addresses inside a block of text using a case-insensitive regex.",
        params: {
            pattern: "\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b",
            flags: "gi",
            testText:
                "Contact us at info@example.com or support@calcolafacile.org for more details.",
        },
    },
    {
        key: "url",
        title: "URLs",
        description:
            "Extract HTTP and HTTPS URLs from text, including paths and query strings.",
        params: {
            pattern: "https?:\\/\\/[^\\s]+",
            flags: "gi",
            testText:
                "Visit https://calcolafacile.org or read the docs at https://example.com/docs?ref=regex.",
        },
    },
    {
        key: "named-groups",
        title: "Named groups",
        description:
            "Use named capture groups to extract date parts from ISO-like date strings.",
        params: {
            pattern: "(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})",
            flags: "g",
            testText:
                "The first release was on 2026-05-22. The next milestone is planned for 2026-06-15.",
        },
    },
    {
        key: "ipv4",
        title: "IPv4 addresses",
        description:
            "Find IPv4-like addresses in logs or configuration snippets.",
        params: {
            pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
            flags: "g",
            testText:
                "Server started on 192.168.1.10, proxy forwarded from 10.0.0.25, invalid example 999.999.999.999.",
        },
    },
];