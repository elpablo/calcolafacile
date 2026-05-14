import { notFound } from "next/navigation";
import UnitConverter from "../convertitore-unita/UnitConverter";
import { conversions } from "@/config/conversions";

// Genera tutte le pagine statiche delle conversioni definite in config
export async function generateStaticParams() {
    return conversions
        .filter((conversion) => conversion.slug?.it)
        .map((conversion) => ({
            conversion: conversion.slug.it,
        }));
}

function findConversion(slug) {
    return conversions.find((conversion) => conversion.slug?.it === slug);
}

// Metadata dinamico per ogni landing SEO
export async function generateMetadata({ params }) {
    const { conversion } = await params;
    const config = findConversion(conversion);

    if (!config) {
        return {
            title: "Conversione non trovata",
        };
    }

    return {
        title: `Converti ${config.labels.it.from} in ${config.labels.it.to} online - Gratis`,
        description: `Converti ${config.labels.it.from} in ${config.labels.it.to} in modo semplice e veloce. Calcolo immediato e gratuito.`,
        alternates: {
            canonical: `https://calcolafacile.org/it/${config.slug.it}`,
            languages: {
                it: `https://calcolafacile.org/it/${config.slug.it}`,
                en: `https://calcolafacile.org/en/${config.slug.en}`,
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
