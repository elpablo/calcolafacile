import { notFound } from "next/navigation";
import UnitConverter from "../convertitore-unita/UnitConverter";
import { conversions } from "@/config/conversions";

// Genera tutte le pagine statiche delle conversioni definite in config
export async function generateStaticParams() {
    return conversions.map((conversion) => ({
        conversion: conversion.slug,
    }));
}

function findConversion(slug) {
    return conversions.find((conversion) => conversion.slug === slug);
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
        title: `Converti ${config.fromLabel} in ${config.toLabel} online - Gratis`,
        description: `Converti ${config.fromLabel} in ${config.toLabel} in modo semplice e veloce. Calcolo immediato e gratuito.`,
        alternates: {
            canonical: `https://calcolafacile.org/it/${config.slug}`,
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
