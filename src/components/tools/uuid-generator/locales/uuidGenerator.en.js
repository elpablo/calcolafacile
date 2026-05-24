const uuidGeneratorEn = {
    lang: "en",
    locale: "en-US",
    title: "UUID v4 Generator Online for APIs, Databases and Testing",
    currentPath: "/en/uuid-generator",
    description:
        "Generate UUID v4 identifiers instantly in your browser for APIs, databases, distributed systems and testing. No data is sent to external servers.",
    contextualTools: [
        {
            href: "/en/json-formatter",
            title: "JSON Formatter",
            description:
                "Use UUIDs inside payloads, fixtures, and API responses.",
        },
        {
            href: "/en/base64-tool",
            title: "Base64 Encode/Decode",
            description: "Encode identifiers or payloads in tests.",
        },
        {
            href: "/en/url-encoder-decoder",
            title: "URL Encoder/Decoder",
            description: "Encode UUIDs for use in query strings or redirects.",
        },
    ],
    examples: [
        {
            title: "Generate unique IDs for databases",
            description:
                "Use UUIDs as primary keys or unique identifiers in relational or NoSQL databases.",
        },
        {
            title: "Create identifiers for APIs and distributed systems",
            description:
                "UUIDs are ideal for identifying resources, requests, or events with a very low collision risk.",
        },
        {
            title: "Generate data for testing and development",
            description:
                "You can quickly create UUID lists to use in fixtures, automated tests, or simulations.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">What is a UUID?</h3>
            <p>
                A UUID is a unique identifier commonly used in databases, APIs,
                distributed systems, and software testing.
            </p>

            <h3 className="mt-4 font-semibold">
                Are UUIDs generated on a server?
            </h3>
            <p>
                No. UUIDs are generated locally in your browser and are not
                sent to external servers.
            </p>

            <h3 className="mt-4 font-semibold">
                Which version does this tool generate?
            </h3>
            <p>
                This tool generates UUID v4 values, based on random numbers.
            </p>
        </>
    ),
    labels: {
        quantityLabel: "Quantity",
        generateButton: "Generate UUIDs",
        hint: "You can generate from 1 to 100 UUIDs at a time.",
        resultLabelSingular: "Generated UUID",
        resultLabelPlural: "Generated UUIDs",
        placeholder: "E.g. 5",
    },
};

export default uuidGeneratorEn;
