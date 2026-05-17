

import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
    title: "Free Date and Time Tools for Unix Timestamps and Time Conversions",
    description:
        "Free browser-based date and time tools to convert Unix timestamps into readable dates and convert dates back to timestamps.",
    alternates: {
        canonical: "https://calcolafacile.org/en/date-time-tools",
        languages: {
            it: "https://calcolafacile.org/it/data-e-ora",
            en: "https://calcolafacile.org/en/date-time-tools",
        },
    },
};

export default function DateTimeToolsPage() {
    return (
        <CategoryPageLayout
            lang="en"
            category="dateTime"
            eyebrow="Date & Time"
            title="Free date and time tools"
            description={
                <p>
                    Convert Unix timestamps into readable dates and convert dates
                    back into timestamps directly in your browser. These tools are
                    useful for debugging logs, APIs, databases and scheduled events.
                </p>
            }
            toolsTitle="Available date and time tools"
            seoTitle="Understand timestamps without mental gymnastics"
            seoText={
                <p>
                    Unix timestamps are common in APIs, databases, logs and backend
                    systems, but they are not pleasant to read by eye. CalcolaFacile
                    helps you quickly translate timestamps into human-readable dates
                    and check date values before using them in code or documentation.
                </p>
            }
        />
    );
}