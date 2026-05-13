

const jwtDecoderEn = {
    lang: "en",
    locale: "en-US",
    title: "JWT Decoder Online - Decode JSON Web Tokens",
    currentPath: "/en/jwt-decoder",
    description:
        "Decode a JSON Web Token directly in your browser. Paste a JWT to inspect its header, payload, claims, expiration time and signature without sending the token to external servers.",
    contextualTools: (tokenEstimatorHref) => [
        {
            href: tokenEstimatorHref,
            title: "Estimate payload tokens and cost",
            description:
                "to estimate payload size and cost before using it in an AI prompt or LLM workflow.",
        },
        {
            href: "/en/timestamp-converter",
            title: "Convert Unix timestamps",
            description: "to convert exp, iat and nbf claims into readable dates.",
        },
        {
            href: "/en/base64-tool",
            title: "Encode and decode Base64",
            description: "to inspect encoded payloads and token-related strings.",
        },
    ],
    examples: [
        {
            title: "Decode a JWT returned by a login API",
            description:
                "Paste the access token or refresh token returned by an authentication endpoint to inspect claims such as sub, name, email, roles and permissions.",
            href: "/en/jwt-decoder?example=validToken",
        },
        {
            title: "Check JWT expiration time",
            description:
                "Use the exp, iat and nbf fields to understand when a token was issued, when it becomes valid and when it expires.",
            href: "/en/jwt-decoder?example=expiredToken",
        },
        {
            title: "Inspect JWT payload before debugging or testing",
            description:
                "Copy the decoded header and payload when debugging API authentication, authorization issues, OAuth flows or test fixtures.",
            href: "/en/jwt-decoder?example=customClaimsToken",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Does this JWT decoder verify the signature?</h3>
            <p>
                No. This tool decodes the header and payload so you can inspect the token content, but it does not validate or verify the JWT signature.
            </p>

            <h3 className="mt-2 font-semibold">Is the JWT sent to a server?</h3>
            <p>
                No. Decoding happens locally in your browser, so the token is not sent to external servers.
            </p>

            <h3 className="mt-2 font-semibold">What JWT fields can I inspect?</h3>
            <p>
                You can inspect standard and custom claims such as sub, iss, aud, exp, iat, nbf, roles, permissions and any other payload field included in the token.
            </p>
        </>
    ),
    sampleToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gU21pdGgiLCJpYXQiOjE3MTQ1NjAwMDAsImV4cCI6NDEwMjQ0NDgwMH0.signature",
    labels: {
        modes: {
            decode: "Decode JWT",
            encode: "Encode JWT",
        },
        inputLabel: "JWT token",
        placeholder: "Paste your JWT here...",
        helperText:
            "Decoding runs locally in your browser. Avoid pasting real production tokens unless you fully trust the context.",
        useSample: "Use sample",
        clear: "Clear",
        encoder: {
            payloadLabel: "Payload JSON",
            payloadPlaceholder: '{\n  "sub": "user_123",\n  "role": "admin"\n}',
            secretLabel: "Secret",
            secretPlaceholder: "Enter an HS256 secret for testing",
            secretHelper:
                "The secret is used only in your browser and is not saved.",
            expirationLabel: "Expiration",
            customExpirationLabel: "Custom expiration in seconds",
            expirationOptions: [
                { value: "15m", label: "15 minutes" },
                { value: "30m", label: "30 minutes" },
                { value: "1h", label: "1 hour" },
                { value: "1d", label: "1 day" },
                { value: "7d", label: "7 days" },
                { value: "custom", label: "Custom" },
            ],
            includeIssuedAt: "Include iat claim",
            includeExpiration: "Include exp claim",
            generate: "Generate JWT",
            generating: "Generating...",
            generatedTokenLabel: "Generated JWT",
            generatedTokenHelper:
                "The generated token has also been loaded in the Decode tab so you can inspect its header, payload and expiration.",
            inspectGeneratedToken: "Inspect generated token",
            safetyTitle: "For testing and development only",
            safetyText:
                "JWT generation runs locally in your browser using HS256. Do not use production secrets or real authentication tokens in this tool.",
            errors: {
                missingSecret: "Enter a secret before generating the JWT.",
                invalidExpiration:
                    "Enter a valid custom expiration greater than zero seconds.",
                invalidPayload: "The payload must be valid JSON.",
                payloadMustBeObject:
                    "The payload must be a JSON object, not an array or primitive value.",
                generationFailed:
                    "Unable to generate the JWT. Please check the payload and secret.",
            },
        },
        noSignature: "No signature present",
        tokenEstimatorHref: "/en/token-estimator",
        errors: {
            missingParts:
                "The token must contain at least a header and a payload separated by a dot.",
            invalidToken: "Invalid JWT token.",
        },
        sections: {
            mainDates: "Main dates",
            header: "Header",
            payload: "Payload",
            signature: "Signature",
        },
        times: {
            exp: "Expires",
            iat: "Issued at",
            nbf: "Valid from",
        },
        status: {
            valid: "Token valid",
            expired: "Token expired",
            unknown: "Expiration unknown",
            noExpiration:
                "This token does not contain an exp claim, so the expiration time cannot be determined.",
            expiredDescription:
                "This token is expired according to its exp claim.",
            expiresInMinutes: (minutes) =>
                `This token expires in about ${minutes} minute${minutes === 1 ? "" : "s"}.`,
            expiresInHours: (hours) =>
                `This token expires in about ${hours} hour${hours === 1 ? "" : "s"}.`,
            expiresInDays: (days) =>
                `This token expires in about ${days} day${days === 1 ? "" : "s"}.`,
        },
    },
};

export default jwtDecoderEn;