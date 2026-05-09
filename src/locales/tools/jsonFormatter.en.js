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
            <h3 className="font-semibold">Is the JSON sent to a server?</h3>
            <p>
                No. Formatting, validation and minification happen locally in your browser.
            </p>

            <h3 className="mt-2 font-semibold">Can this tool validate invalid JSON?</h3>
            <p>
                Yes. If the JSON is malformed, the tool shows a parsing error so you can quickly fix the problem.
            </p>

            <h3 className="mt-2 font-semibold">Can I minify JSON?</h3>
            <p>
                Yes. Use the Minified view to create compact JSON for API payloads, configuration files or environment variables.
            </p>
        </>
    ),
    sampleJson: `{"name":"John","age":30,"city":"New York","skills":["JS","Node","AI"]}`,
    labels: {
        inputLabel: "JSON",
        placeholder: "Paste JSON here...",
        size: "Size",
        useSample: "Use sample",
        clear: "Clear",
        prettyView: "Pretty view",
        minifiedView: "Minified view",
        copyPretty: "Copy pretty",
        copyMinified: "Copy minified",
        invalidJson: "Invalid JSON",
        format: "Format",
        pretty: "Pretty",
        minified: "Minified",
        prettyHint: "Formatted for readability",
        minifiedHint: "Minified for compact payloads",
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