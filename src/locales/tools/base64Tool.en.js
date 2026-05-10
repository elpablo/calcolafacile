import Link from "next/link";

const base64ToolEn = {
    lang: "en",
    locale: "en-US",
    title: "Base64 Encoder and Decoder Online",
    currentPath: "/en/base64-tool",
    description:
        "Encode text to Base64 or decode Base64 strings directly in your browser. Useful for API payloads, tokens, credentials, debugging and encoded data without sending anything to external servers.",
    contextualTools: [
        {
            href: "/en/jwt-decoder",
            title: "Decode JWT",
            description:
                "to inspect JSON Web Tokens made of header, payload and signature.",
        },
        {
            href: "/en/json-formatter",
            title: "Format JSON",
            description:
                "to format decoded payloads, API responses and JSON strings.",
        },
        {
            href: "/en/token-estimator",
            title: "Estimate LLM tokens",
            description:
                "to estimate token usage and cost before sending decoded text to an LLM.",
        },
    ],
    examples: [
        {
            title: "Decode Base64 from an API payload",
            description:
                "Paste a Base64 string returned by an API to inspect the readable text, JSON payload or encoded content.",
        },
        {
            title: "Encode text for HTTP requests or credentials",
            description:
                "Convert plain text to Base64 when an API, authentication flow or integration requires encoded values.",
        },
        {
            title: "Encode and decode UTF-8 text safely",
            description:
                "The tool supports UTF-8, so it works with accents, emoji and non-ASCII characters when encoding or decoding Base64.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Is Base64 encoding secure?</h3>
            <p>
                No. Base64 is an encoding format, not encryption. Anyone can
                decode a Base64 string back to readable text.
            </p>

            <h3 className="mt-2 font-semibold">Is data sent to a server?</h3>
            <p>
                No. Base64 encoding and decoding happen locally in your browser.
            </p>

            <h3 className="mt-2 font-semibold">
                Does this Base64 tool support UTF-8?
            </h3>
            <p>
                Yes. The tool correctly handles accents, emoji and non-ASCII
                characters.
            </p>
        </>
    ),
    sample: {
        text: "Hello world! This is an example.",
        base64: "SGVsbG8gd29ybGQhIFRoaXMgaXMgYW4gZXhhbXBsZS4=",
    },
    labels: {
        encodeBtn: "Encode",
        decodeBtn: "Decode",
        inputLabelEncode: "Text to encode",
        inputLabelDecode: "Base64 to decode",
        placeholderEncode: "Enter text to encode as Base64...",
        placeholderDecode: "Enter Base64 string to decode...",
        useSample: "Use sample",
        clear: "Clear",
        errorEncode: "Error while encoding Base64.",
        errorDecode: "Invalid Base64 string.",
        footerNote: (
            <>
                If you are working with API payloads or encoded data, you may
                also want to try our{" "}
                <Link
                    href="/en/json-tools"
                    className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    JSON tools
                </Link>{" "}
                or our{" "}
                <Link
                    href="/en/encoding-tools"
                    className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    encoding tools
                </Link>
                .
            </>
        ),
    },
};

export default base64ToolEn;
