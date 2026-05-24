const urlEncoderDecoderEn = {
    lang: "en",
    locale: "en-US",
    title: "URL Encoder / Decoder Online",
    currentPath: "/en/url-encoder-decoder",
    description:
        "Encode and decode URLs directly in your browser. Useful for query strings, API parameters, redirects and OAuth callbacks without sending data to external servers.",
    contextualTools: [
        {
            href: "/en/base64-tool",
            title: "Base64 Encoder/Decoder",
            description: "Encode payloads, tokens or strings used in APIs.",
        },
        {
            href: "/en/json-formatter",
            title: "JSON Formatter and Validator",
            description: "Read and validate JSON payloads and URL parameters.",
        },
        {
            href: "/en/jwt-decoder",
            title: "JWT Decoder and Inspector",
            description:
                "Inspect tokens embedded in URLs, OAuth callbacks or redirect flows.",
        },
    ],
    examples: [
        {
            title: "Encode parameters in a query string",
            description:
                "If you need to pass text with spaces or special characters in a URL, use Encode to generate a valid string for query parameters.",
        },
        {
            title: "Handle OAuth redirects and callbacks",
            description:
                "When working with OAuth login or redirect URLs, encode or decode parameters to verify they are correct.",
        },
        {
            title: "Debug URLs from APIs",
            description:
                "If you receive a URL-encoded string from an API, use Decode to quickly inspect its content.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Is data sent to a server?</h3>
            <p>No. Encoding and decoding happen locally in your browser.</p>

            <h3 className="mt-4 font-semibold">When should I encode a URL?</h3>
            <p>
                When you need to include text, spaces, symbols or URLs inside
                query strings, redirects, callbacks or API parameters.
            </p>
        </>
    ),
    sample: {
        text: "https://calcolafacile.org/en?query=hello world&ref=dev tools",
        encoded:
            "https%3A%2F%2Fcalcolafacile.org%2Fen%3Fquery%3Dhello%20world%26ref%3Ddev%20tools",
    },
    labels: {
        labelEncodeMode: "Encode",
        labelDecodeMode: "Decode",
        labelInputEncode: "Text or URL",
        labelInputDecode: "URL-encoded string",
        placeholderEncode: "Enter text or URL to encode...",
        placeholderDecode: "Enter URL-encoded string to decode...",
        hint: "Local operation in your browser. No data is sent to external servers.",
        useSample: "Use sample",
        clear: "Clear",
        errorEncode: "Error during URL encoding.",
        errorDecode: "Invalid URL-encoded string.",
    },
    footerNote: null,
};

export default urlEncoderDecoderEn;
