import { notFound } from "next/navigation";
import UnitConverter from "../unit-converter/UnitConverter";
import { conversions } from "@/config/conversions";

// Genera tutte le pagine statiche delle conversioni definite in config
export async function generateStaticParams() {
    return conversions
        .filter((c) => c.slug?.en)
        .map((conversion) => ({
            conversion: conversion.slug.en,
        }));
}

function findConversion(slug) {
    return conversions.find((conversion) => conversion.slug?.en === slug);
}

// Metadata dinamico per ogni landing SEO
export async function generateMetadata({ params }) {
    const { conversion } = await params;
    const config = findConversion(conversion);

    if (!config) {
        return {
            title: "Conversion not found",
        };
    }

    return {
        title: `Convert ${config.labels.en.from} to ${config.labels.en.to} online`,
        description: `Convert ${config.labels.en.from} to ${config.labels.en.to} quickly and easily. Free online unit converter.`,
        alternates: {
            canonical: `https://calcolafacile.org/en/${config.slug.en}`,
            languages: {
                en: `https://calcolafacile.org/en/${config.slug.en}`,
                it: `https://calcolafacile.org/it/${config.slug.it}`,
            },
        },
    };
}

// Pagina dinamica della conversione
export default async function ConversionPage({ params }) {
    const { conversion } = await params;
    const config = findConversion(conversion);

    if (!config) {
        return notFound();
    }

    return (
        <UnitConverter
            initialCategory={config.category}
            initialFrom={config.from}
            initialTo={config.to}
            initialValue={1}
        />
    );
}
