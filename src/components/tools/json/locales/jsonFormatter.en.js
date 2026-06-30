import { Fragment } from "react";

const faqItems = [
    {
        question: "Is the JSON sent to a server?",
        answer:
            "No. Formatting, validation and minification happen locally in your browser.",
    },
    {
        question: "Can this tool validate invalid JSON?",
        answer:
            "Yes. If the JSON is malformed, the tool shows a parsing error so you can quickly fix the problem.",
    },
    {
        question: "Can I minify JSON?",
        answer:
            "Yes. Use the Minified view to create compact JSON for API payloads, configuration files or environment variables.",
    },
];

const jsonFormatterEn = {
    lang: "en",
    title: "JSON Formatter and Validator Online",
    currentPath: "/en/json-formatter",
    description:
        "Format, validate and minify JSON directly in your browser. Paste raw JSON, make it readable, catch parsing errors and copy the result without sending data to external servers.",
    contextualTools: [
        {
            href: "/en/token-estimator",
            title: "Estimate LLM tokens",
            description:
                "to estimate the size and cost of JSON used in prompts, payloads or AI workflows.",
        },
        {
            href: "/en/base64-tool",
            title: "Encode and decode Base64",
            description:
                "to encode or decode payloads and strings used in API integrations.",
        },
        {
            href: "/en/jwt-decoder",
            title: "Decode JWT",
            description:
                "to inspect header and payload when your JSON comes from a token.",
        },
        {
            href: "/en/uuid-generator",
            title: "Generate UUIDs",
            description:
                "to create unique identifiers for IDs used inside JSON fixtures and payloads.",
        },
        {
            href: "/en/regex-tester",
            title: "Test a regular expression",
            description:
                "to validate or extract string values found inside JSON fields.",
        },
    ],
    examples: [
        {
            title: "Format a JSON API response",
            description:
                "Paste raw JSON returned by an API to make it readable, inspect nested objects and arrays, and copy the formatted output.",
            href: "/en/json-formatter?example=minifiedApi",
        },
        {
            title: "Validate JSON before using it in code",
            description:
                "Catch common JSON errors such as missing commas, invalid brackets, unclosed strings or malformed objects before using the data in your app.",
            href: "/en/json-formatter?example=invalidJson",
        },
        {
            title: "Minify JSON for HTTP payloads and config files",
            description:
                "Switch to Minified view when you need compact JSON for API requests, environment variables, configuration files or test fixtures.",
            href: "/en/json-formatter?example=nestedConfig",
        },
    ],
    faq: (
        <>
            {faqItems.map((item, index) => (
                <Fragment key={item.question}>
                    <h3
                        className={
                            index === 0
                                ? "font-semibold"
                                : "mt-2 font-semibold"
                        }
                    >
                        {item.question}
                    </h3>
                    <p>{item.answer}</p>
                </Fragment>
            ))}
        </>
    ),
    faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    },
    sampleJson: `{"name":"John","age":30,"city":"New York","skills":["JS","Node","AI"]}`,
    labels: {
        inputLabel: "JSON",
        placeholder: "Paste JSON here...",
        size: "Size",
        useSample: "Use sample",
        clear: "Clear",
        prettyView: "Pretty view",
        minifiedView: "Minified view",
        sortKeys: "Sort object keys",
        copyPretty: "Copy pretty",
        copyMinified: "Copy minified",
        download: "Download JSON",
        invalidJson: "Invalid JSON",
        errorLocation: "Line {line}, column {column}",
        goToError: "Go to error",
        tryRepairJson: "Try to repair JSON",
        repairAvailable: "We found some safe fixes for this JSON:",
        partialRepairAvailable:
            "Some safe fixes were applied, but the JSON still needs manual correction.",
        repairFailed:
            "Automatic repair wasn't possible for this JSON. Please fix it manually.",
        applyRepairedJson: "Apply repaired JSON",
        applyPartialRepairJson: "Apply partial repair",
        appliedFixes: "Applied fixes",
        format: "Format",
        pretty: "Pretty",
        minified: "Minified",
        prettyHint: "Formatted for readability",
        minifiedHint: "Minified for compact payloads",
        dropHint: "Drag and drop a .json file here, or paste JSON manually.",
        dropSingleFileError: "Please drop one JSON file at a time.",
        dropInvalidFileError: "Please drop a .json or plain text JSON file.",
        dropFileTooLargeError: "The selected file is too large. Please use a file smaller than 2 MB.",
        dropReadError: "Unable to read the selected file. Please try again or paste the JSON manually.",
    },
    relatedLinks: {
        beforeFirstLink:
            "If you are working with API payloads or encoded data, you may also want to try our",
        first: {
            href: "/en/json-tools",
            label: "JSON tools",
        },
        betweenLinks: "or our",
        second: {
            href: "/en/encoding-tools",
            label: "encoding tools",
        },
        afterSecondLink: ".",
    },
};

export default jsonFormatterEn;