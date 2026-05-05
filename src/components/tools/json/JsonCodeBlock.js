"use client";

import dynamic from "next/dynamic";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = dynamic(
    () => import("react-syntax-highlighter").then((mod) => mod.Prism),
    {
        ssr: false,
        loading: () => (
            <pre className="m-0 overflow-x-auto whitespace-pre-wrap wrap-break-word rounded-lg bg-white/80 p-3 font-mono text-sm text-zinc-900 dark:bg-zinc-950/40 dark:text-zinc-100" />
        ),
    }
);

export default function JsonCodeBlock({ value }) {
    return (
        <SyntaxHighlighter
            language="json"
            style={oneDark}
            wrapLongLines={true}
            customStyle={{
                margin: 0,
                background: "transparent",
                fontSize: "0.875rem",
            }}
            codeTagProps={{
                style: {
                    fontFamily: "var(--font-geist-mono), monospace",
                },
            }}
        >
            {value}
        </SyntaxHighlighter>
    );
}
