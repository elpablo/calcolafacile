"use client";

import { useEffect, useState } from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

function formatLocation(location, labels) {
    if (!location) {
        return labels.notAvailable;
    }

    const parts = [location.city, location.countryRegion, location.country].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : labels.notAvailable;
}

function formatCoordinates(location, labels) {
    if (!location?.latitude || !location?.longitude) {
        return labels.notAvailable;
    }

    return `${location.latitude}, ${location.longitude}`;
}

function InfoRow({ label, value, mono = false }) {
    return (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-950/40">
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {label}
            </dt>
            <dd
                className={`mt-1 wrap-break-word text-base text-zinc-900 dark:text-zinc-100 ${
                    mono ? "font-mono" : "font-medium"
                }`}
            >
                {value || "—"}
            </dd>
        </div>
    );
}

export default function PublicIpCheckerCore({ content }) {
    const {
        lang,
        title,
        currentPath,
        description,
        examples,
        faq,
        contextualTools,
        labels,
    } = content;

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function fetchIp() {
            try {
                const response = await fetch("/api/public-ip", {
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const payload = await response.json();
                if (!cancelled) setData(payload);
            } catch {
                if (!cancelled) setError(labels.errors.loadFailed);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        fetchIp();
        return () => {
            cancelled = true;
        };
    }, [refreshKey, labels.errors.loadFailed]);

    const loadIpInfo = () => {
        setIsLoading(true);
        setError(null);
        setCopied(false);
        setRefreshKey((k) => k + 1);
    };

    const copyIp = async () => {
        if (!data?.ip) {
            return;
        }

        await navigator.clipboard.writeText(data.ip);
        setCopied(true);
    };

    const location = data?.location;
    const network = data?.network;

    return (
        <ToolLayout
            lang={lang}
            title={title}
            currentPath={currentPath}
            description={description}
            examples={examples}
            faq={faq}
            contextualTools={contextualTools}
        >
            <div className="space-y-6">
                <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                {labels.publicIp}
                            </p>
                            <p className="mt-2 break-all font-mono text-3xl font-bold text-blue-600 dark:text-blue-300">
                                {isLoading ? labels.loading : data?.ip || labels.notAvailable}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={copyIp}
                                disabled={!data?.ip || isLoading}
                                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                            >
                                {copied ? labels.copied : labels.copyIp}
                            </button>
                            <button
                                type="button"
                                onClick={loadIpInfo}
                                disabled={isLoading}
                                className="rounded-lg border border-blue-200 bg-blue-50/80 px-3 py-2 text-sm font-medium text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-100 dark:hover:border-blue-700 dark:hover:bg-blue-900/40"
                            >
                                {labels.refresh}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
                            {error}
                        </p>
                    )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <InfoRow label={labels.location} value={formatLocation(location, labels)} />
                    <InfoRow label={labels.timezone} value={location?.timezone || labels.notAvailable} />
                    <InfoRow label={labels.coordinates} value={formatCoordinates(location, labels)} mono />
                    <InfoRow label={labels.postalCode} value={location?.postalCode || labels.notAvailable} />
                    <InfoRow label={labels.forwardedFor} value={network?.forwardedFor || labels.notAvailable} mono />
                    <InfoRow label={labels.realIp} value={network?.realIp || labels.notAvailable} mono />
                </div>

                <ResultBox
                    title={labels.aboutThisResult}
                    {...(data?.ip ? { copyText: data.ip } : {})}
                >
                    <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                        {data?.note || labels.approximationNote}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                        {labels.vpnNote}
                    </p>
                </ResultBox>
            </div>
        </ToolLayout>
    );
}