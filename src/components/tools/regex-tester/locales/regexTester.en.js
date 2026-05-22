const regexTesterEn = {
    lang: "en",
    locale: "en-US",
    title: "Regex Tester",
    currentPath: "/en/regex-tester",
    description:
        "Test regular expressions online with live matches, flags, groups and detailed match positions.",
    labels: {
        pattern: "Regex pattern",
        patternHelp:
            "Enter a JavaScript-compatible regular expression pattern.",
        patternPlaceholder: "Example: \\b\\w+@\\w+\\.\\w+\\b",
        flags: "Flags",
        testText: "Test text",
        testTextHelp:
            "Paste or type the text you want to test against the regular expression.",
        testTextPlaceholder: "Paste text here to test your regex pattern.",
        reset: "Reset",
        expand: "Expand",
        collapse: "Collapse",
        patternLibraryTitle: "Pattern library",
        patternLibraryDescription:
            "Pick a ready-to-use regex pattern and load it with sample text.",
        patternCategories: {
            common: "Common",
            developer: "Developer",
            network: "Network",
            date: "Date and time",
            web: "Web",
            security: "Security",
            other: "Other",
        },
        highlightedPreviewTitle: "Highlighted preview",
        highlightedPreviewDescription:
            "Matched text is highlighted so you can immediately see what the regex extracts.",
        resultTitle: "Regex result",
        invalidRegex: "Invalid regular expression",
        matchesFound: "Matches found",
        noMatches: "No matches",
        activeFlags: "Active flags",
        match: "Match",
        position: "Position",
        groups: "Groups",
        line: "Line",
        column: "Column",
        none: "None",
        flagDescriptions: {
            g: "global",
            i: "ignore case",
            m: "multiline",
            s: "dotall",
            u: "unicode",
            y: "sticky",
        },
        disclaimer:
            "This tool uses the JavaScript RegExp engine available in your browser. Results may differ from other regex engines.",
    },
    examples: [
        {
            title: "Email addresses",
            description:
                "Extract email-like addresses from text using a case-insensitive regex.",
            href: "/en/regex-tester?pattern=%5C%5Cb%5BA-Z0-9._%25%2B-%5D%2B%40%5BA-Z0-9.-%5D%2B%5C%5C.%5BA-Z%5D%7B2%2C%7D%5C%5Cb&flags=gi&testText=Contact%20us%20at%20info%40example.com%20or%20support%40calcolafacile.org",
        },
        {
            title: "URLs",
            description:
                "Find HTTP and HTTPS URLs inside logs or text documents.",
            href: "/en/regex-tester?pattern=https%3F%3A%5C%5C%2F%5C%5C%2F%5B%5E%5C%5Cs%5D%2B&flags=gi&testText=Visit%20https%3A%2F%2Fcalcolafacile.org%20or%20https%3A%2F%2Fexample.com%2Fdocs",
        },
        {
            title: "Named groups",
            description:
                "Extract dates using named capture groups.",
            href: "/en/regex-tester?pattern=%28%3F%3Cyear%3E%5C%5Cd%7B4%7D%29-%28%3F%3Cmonth%3E%5C%5Cd%7B2%7D%29-%28%3F%3Cday%3E%5C%5Cd%7B2%7D%29&flags=g&testText=Release%20dates%3A%202026-05-22%20and%202026-06-15",
        },
    ],
    contextualTools: [
        {
            href: "/en/json-formatter",
            title: "JSON Formatter",
            description:
                "Format, validate and beautify JSON directly in your browser.",
        },
        {
            href: "/en/iso8601-validator",
            title: "ISO8601 Validator",
            description:
                "Validate ISO8601 dates and timestamps with detailed feedback.",
        },
        {
            href: "/en/jwt-decoder",
            title: "JWT Decoder",
            description:
                "Decode and inspect JWT tokens locally in your browser.",
        },
    ],
    faq: (
        <>
            <h2>What is a regex tester?</h2>
            <p>
                A regex tester lets you test regular expressions against sample text
                and inspect matches, groups and positions in real time.
            </p>

            <h2>Which regex engine does this tool use?</h2>
            <p>
                This tool uses the JavaScript RegExp engine built into your browser.
                Some advanced features may behave differently compared with PCRE,
                Python or .NET regex engines.
            </p>

            <h2>What do regex flags mean?</h2>
            <p>
                Flags modify how the regular expression works. For example, the
                <code>i</code> flag enables case-insensitive matching, while
                <code>g</code> enables global matching.
            </p>

            <h2>Does this regex tester support named groups?</h2>
            <p>
                Yes. Named capture groups supported by JavaScript regular expressions
                are displayed in the match details section.
            </p>

            <h2>Does this tool send my text anywhere?</h2>
            <p>
                No. Regex matching runs locally in your browser. Text and patterns are
                not sent to an external server.
            </p>
        </>
    ),
};

export default regexTesterEn;