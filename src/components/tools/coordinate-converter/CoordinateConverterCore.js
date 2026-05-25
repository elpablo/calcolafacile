"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import {
    DEFAULT_COORDINATE_INPUT,
    buildCoordinateSummary,
    buildGeoJsonFeatureCollection,
    buildGeoJsonLineString,
    calculatePathStats,
    normalizeCoordinateInput,
    parseCoordinateFileContent,
    parseDms,
} from "./coordinateConverterLogic";

const STORAGE_KEY = "calcolafacile:coordinate-converter";

const TABS = ["single", "path", "importExport"];
const SINGLE_INPUT_MODES = ["decimal", "dms"];

function subscribeToHydration() {
    return () => {};
}

function getInitialState(shouldLoadSavedState, sample, searchParams) {
    const fallback = {
        point: normalizeCoordinateInput(sample ?? DEFAULT_COORDINATE_INPUT),
        pathPoints: normalizePathPointsForEditor([
            DEFAULT_COORDINATE_INPUT,
            { latitude: "44.5075", longitude: "11.3514" },
        ]),
        importText: "",
        importedPathPoints: [],
        singleInputMode: SINGLE_INPUT_MODES[0],
        latitudeDms: "44° 29' 41.64\" N",
        longitudeDms: "11° 20' 33.36\" E",
        activeTab: TABS[0],
    };

    const queryTab = searchParams?.get("tab");
    const queryLatitude = searchParams?.get("latitude");
    const queryLongitude = searchParams?.get("longitude");

    if (queryLatitude || queryLongitude || TABS.includes(queryTab)) {
        return {
            ...fallback,
            point: normalizeCoordinateInput({
                latitude: queryLatitude ?? fallback.point.latitude,
                longitude: queryLongitude ?? fallback.point.longitude,
            }),
            activeTab: TABS.includes(queryTab) ? queryTab : fallback.activeTab,
        };
    }

    if (!shouldLoadSavedState) {
        return fallback;
    }

    const stored = loadLocalState(STORAGE_KEY, {});

    return {
        point: normalizeCoordinateInput(stored.point ?? fallback.point),
        pathPoints: normalizePathPointsForEditor(
            stored.pathPoints ?? fallback.pathPoints,
        ),
        importText:
            typeof stored.importText === "string" ? stored.importText : "",
        importedPathPoints: Array.isArray(stored.importedPathPoints)
            ? normalizePathPointsForEditor(stored.importedPathPoints)
            : fallback.importedPathPoints,
        singleInputMode: SINGLE_INPUT_MODES.includes(stored.singleInputMode)
            ? stored.singleInputMode
            : fallback.singleInputMode,
        latitudeDms:
            typeof stored.latitudeDms === "string"
                ? stored.latitudeDms
                : fallback.latitudeDms,
        longitudeDms:
            typeof stored.longitudeDms === "string"
                ? stored.longitudeDms
                : fallback.longitudeDms,
        activeTab: TABS.includes(stored.activeTab)
            ? stored.activeTab
            : fallback.activeTab,
    };
}

function formatNumber(value, locale, maximumFractionDigits = 6) {
    return new Intl.NumberFormat(locale, {
        maximumFractionDigits,
    }).format(value);
}

function downloadTextFile(filename, content, mimeType = "application/json") {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
}

function MiniPathPreview({ points, labels }) {
    const normalizedPoints = normalizePathPointsForEditor(points);
    const stats = calculatePathStats(normalizedPoints, { dedupe: false });

    if (normalizedPoints.length === 0 || !stats.bounds) {
        return (
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                {labels.emptyPreview}
            </div>
        );
    }

    const width = 320;
    const height = 140;
    const padding = 24;
    const latSpan = stats.bounds.maxLatitude - stats.bounds.minLatitude || 1;
    const lonSpan = stats.bounds.maxLongitude - stats.bounds.minLongitude || 1;
    const svgPoints = normalizedPoints.map((point) => {
        const x =
            padding +
            ((point.longitude - stats.bounds.minLongitude) / lonSpan) *
                (width - padding * 2);
        const y =
            height -
            padding -
            ((point.latitude - stats.bounds.minLatitude) / latSpan) *
                (height - padding * 2);

        return { x, y };
    });
    const polyline = svgPoints
        .map((point) => `${point.x},${point.y}`)
        .join(" ");

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        {labels.previewTitle}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {labels.previewDescription}
                    </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    {stats.pointsCount} {labels.pointsShortLabel}
                </span>
            </div>

            <svg
                viewBox={`0 0 ${width} ${height}`}
                role="img"
                aria-label={labels.previewAriaLabel}
                className="block h-auto w-full overflow-hidden"
            >
                <rect
                    x="1"
                    y="1"
                    width={width - 2}
                    height={height - 2}
                    rx="18"
                    fill="rgba(255, 255, 255, 0.72)"
                    stroke="#bfdbfe"
                />
                <polyline
                    points={polyline}
                    fill="none"
                    stroke="rgba(37, 99, 235, 0.85)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {svgPoints.map((point, index) => (
                    <g key={`${point.x}-${point.y}-${index}`}>
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="3.5"
                            fill="rgba(37, 99, 235, 0.95)"
                            stroke="white"
                            strokeWidth="1"
                        />
                        <text
                            x={point.x + 6}
                            y={point.y - 6}
                            fill="#475569"
                            fontSize="9"
                            fontWeight="700"
                        >
                            {index + 1}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}

function CoordinateInput({ id, label, value, onChange, placeholder }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
            >
                {label}
            </label>
            <input
                id={id}
                type="number"
                value={value}
                step="any"
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
            />
        </div>
    );
}

function TextCoordinateInput({ id, label, value, onChange, placeholder }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
            >
                {label}
            </label>
            <input
                id={id}
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
            />
        </div>
    );
}

function PathPointEditor({
    point,
    index,
    labels,
    onChange,
    onRemove,
    canRemove,
}) {
    const [isCompactLayout, setIsCompactLayout] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 639px)");
        const updateLayout = () => setIsCompactLayout(mediaQuery.matches);

        updateLayout();
        mediaQuery.addEventListener("change", updateLayout);

        return () => mediaQuery.removeEventListener("change", updateLayout);
    }, []);

    const removeButton = (
        <button
            type="button"
            onClick={() => onRemove(index)}
            disabled={!canRemove}
            className="h-12 rounded-lg border border-red-200 bg-red-50 px-2.5 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-100 disabled:cursor-not-allowed disabled:border-zinc-300 disabled:bg-zinc-50 disabled:text-zinc-400 disabled:opacity-60 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70 dark:disabled:border-zinc-700 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-500"
        >
            🗑 {labels.removePointLabel}
        </button>
    );

    if (isCompactLayout) {
        return (
            <div className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                        #{index + 1}
                    </div>
                    {removeButton}
                </div>

                <div className="grid gap-3">
                    <CoordinateInput
                        id={`path-latitude-${index}`}
                        label={labels.latitudeLabel}
                        value={point.latitude}
                        onChange={(latitude) =>
                            onChange(index, { ...point, latitude })
                        }
                        placeholder="44.4949"
                    />
                    <CoordinateInput
                        id={`path-longitude-${index}`}
                        label={labels.longitudeLabel}
                        value={point.longitude}
                        onChange={(longitude) =>
                            onChange(index, { ...point, longitude })
                        }
                        placeholder="11.3426"
                    />
                </div>
            </div>
        );
    }

    return (
        <div
            className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
            style={{
                gridTemplateColumns:
                    "max-content minmax(0, 1fr) minmax(0, 1fr) max-content",
                alignItems: "end",
            }}
        >
            <div className="pb-3 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                #{index + 1}
            </div>
            <CoordinateInput
                id={`path-latitude-${index}`}
                label={labels.latitudeLabel}
                value={point.latitude}
                onChange={(latitude) =>
                    onChange(index, { ...point, latitude })
                }
                placeholder="44.4949"
            />
            <CoordinateInput
                id={`path-longitude-${index}`}
                label={labels.longitudeLabel}
                value={point.longitude}
                onChange={(longitude) =>
                    onChange(index, { ...point, longitude })
                }
                placeholder="11.3426"
            />
            {removeButton}
        </div>
    );
}

function TabButton({ active, children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                    ? "bg-blue-600 text-white shadow-sm dark:bg-blue-500"
                    : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
            }`}
        >
            {children}
        </button>
    );
}

function normalizePathPointsForEditor(points = []) {
    return points.map((point) => {
        if (Array.isArray(point)) {
            return normalizeCoordinateInput({
                longitude: point[0],
                latitude: point[1],
            });
        }

        return normalizeCoordinateInput({
            latitude: point.latitude ?? point.lat,
            longitude: point.longitude ?? point.lon ?? point.lng,
        });
    });
}

export default function CoordinateConverterCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <CoordinateConverterCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function CoordinateConverterCoreContent({
    content,
    searchParams,
    shouldLoadSavedState,
}) {
    const {
        lang,
        locale,
        metadata,
        currentPath,
        description,
        intro,
        examples,
        faq,
        contextualTools,
        labels,
        sample,
    } = content;

    const initialState = getInitialState(
        shouldLoadSavedState,
        sample,
        searchParams,
    );
    const [latitude, setLatitude] = useState(
        String(initialState.point.latitude),
    );
    const [longitude, setLongitude] = useState(
        String(initialState.point.longitude),
    );
    const [pathPoints, setPathPoints] = useState(initialState.pathPoints);
    const [importText, setImportText] = useState(initialState.importText);
    const [importMessage, setImportMessage] = useState("");
    const [importedPathPoints, setImportedPathPoints] = useState(
        initialState.importedPathPoints,
    );
    const [activeTab, setActiveTab] = useState(initialState.activeTab);
    const [singleInputMode, setSingleInputMode] = useState(
        initialState.singleInputMode,
    );
    const [latitudeDms, setLatitudeDms] = useState(initialState.latitudeDms);
    const [longitudeDms, setLongitudeDms] = useState(initialState.longitudeDms);

    const point = useMemo(() => {
        if (singleInputMode === "dms") {
            const parsedLatitude = parseDms(latitudeDms);
            const parsedLongitude = parseDms(longitudeDms);

            return normalizeCoordinateInput({
                latitude: parsedLatitude ?? latitude,
                longitude: parsedLongitude ?? longitude,
            });
        }

        return normalizeCoordinateInput({ latitude, longitude });
    }, [latitude, longitude, latitudeDms, longitudeDms, singleInputMode]);
    const summary = useMemo(() => buildCoordinateSummary(point), [point]);
    const normalizedPathPoints = useMemo(
        () => normalizePathPointsForEditor(pathPoints),
        [pathPoints],
    );
    const pathStats = useMemo(
        () => calculatePathStats(normalizedPathPoints, { dedupe: false }),
        [normalizedPathPoints],
    );
    const lineString = useMemo(
        () =>
            buildGeoJsonLineString(
                normalizedPathPoints,
                { name: "Path" },
                { dedupe: false },
            ),
        [normalizedPathPoints],
    );
    const featureCollection = useMemo(
        () =>
            buildGeoJsonFeatureCollection([
                buildCoordinateSummary(point).geoJsonPoint,
                lineString,
            ]),
        [point, lineString],
    );
    const normalizedImportedPathPoints = useMemo(
        () => normalizePathPointsForEditor(importedPathPoints),
        [importedPathPoints],
    );

    const importedLineString = useMemo(
        () =>
            buildGeoJsonLineString(
                normalizedImportedPathPoints,
                { name: "Imported path" },
                { dedupe: false },
            ),
        [normalizedImportedPathPoints],
    );

    const importResultText = normalizedImportedPathPoints.length
        ? JSON.stringify(importedLineString, null, 2)
        : "";

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, {
            point,
            pathPoints: normalizedPathPoints,
            importText,
            importedPathPoints: normalizedImportedPathPoints,
            singleInputMode,
            latitudeDms,
            longitudeDms,
            activeTab,
        });
    }, [
        shouldLoadSavedState,
        point,
        normalizedPathPoints,
        importText,
        normalizedImportedPathPoints,
        singleInputMode,
        latitudeDms,
        longitudeDms,
        activeTab,
    ]);

    const updatePathPoint = (index, nextPoint) => {
        setPathPoints((currentPoints) =>
            currentPoints.map((item, itemIndex) =>
                itemIndex === index ? nextPoint : item,
            ),
        );
    };

    const addPathPoint = () => {
        setPathPoints((currentPoints) => {
            const lastPoint = currentPoints.at(-1) ?? DEFAULT_COORDINATE_INPUT;
            return [...currentPoints, { ...lastPoint }];
        });
    };

    const removePathPoint = (index) => {
        setPathPoints((currentPoints) =>
            currentPoints.length <= 1
                ? currentPoints
                : currentPoints.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const importCoordinates = (text) => {
        const parsedPoints = parseCoordinateFileContent(text);

        if (parsedPoints.length === 0) {
            setImportMessage(labels.importError);
            return;
        }

        setImportedPathPoints(normalizePathPointsForEditor(parsedPoints));
        setImportMessage(
            labels.importSuccess.replace(
                "{count}",
                String(parsedPoints.length),
            ),
        );
    };

    const handleFile = async (file) => {
        if (!file) return;
        const text = await file.text();
        setImportText(text);
        importCoordinates(text);
    };

    const pointGeoJsonText = JSON.stringify(summary.geoJsonPoint, null, 2);
    const lineStringGeoJsonText = JSON.stringify(lineString, null, 2);
    const featureCollectionText = JSON.stringify(featureCollection, null, 2);

    return (
        <ToolLayout
            title={metadata.title}
            lang={lang}
            currentPath={currentPath}
            description={description ?? metadata.description}
            intro={intro}
            faq={faq}
            contextualTools={contextualTools}
            examples={examples}
        >
            <div>
                <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-700 dark:bg-zinc-950/40">
                    <TabButton
                        active={activeTab === "single"}
                        onClick={() => setActiveTab("single")}
                    >
                        {labels.tabs.single}
                    </TabButton>
                    <TabButton
                        active={activeTab === "path"}
                        onClick={() => setActiveTab("path")}
                    >
                        {labels.tabs.path}
                    </TabButton>
                    <TabButton
                        active={activeTab === "importExport"}
                        onClick={() => setActiveTab("importExport")}
                    >
                        {labels.tabs.importExport}
                    </TabButton>
                </div>

                {activeTab === "single" ? (
                    <section>
                        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            {labels.singlePointTitle}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            {labels.singlePointDescription}
                        </p>

                        <div className="mt-4">
                            <label
                                htmlFor="coordinate-input-mode"
                                className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
                            >
                                {labels.inputModeLabel}
                            </label>
                            <div className="relative max-w-sm">
                                <select
                                    id="coordinate-input-mode"
                                    value={singleInputMode}
                                    onChange={(event) =>
                                        setSingleInputMode(event.target.value)
                                    }
                                    className="h-12 w-full appearance-none rounded-lg border border-zinc-300 bg-white px-3 pr-9 text-base text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
                                >
                                    <option value="decimal">
                                        {labels.inputModes.decimal}
                                    </option>
                                    <option value="dms">
                                        {labels.inputModes.dms}
                                    </option>
                                </select>
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                                    ▾
                                </span>
                            </div>
                        </div>

                        {singleInputMode === "decimal" ? (
                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                <CoordinateInput
                                    id="coordinate-latitude"
                                    label={labels.latitudeLabel}
                                    value={latitude}
                                    onChange={setLatitude}
                                    placeholder="44.4949"
                                />
                                <CoordinateInput
                                    id="coordinate-longitude"
                                    label={labels.longitudeLabel}
                                    value={longitude}
                                    onChange={setLongitude}
                                    placeholder="11.3426"
                                />
                            </div>
                        ) : (
                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                <TextCoordinateInput
                                    id="coordinate-latitude-dms"
                                    label={labels.latitudeDmsInputLabel}
                                    value={latitudeDms}
                                    onChange={setLatitudeDms}
                                    placeholder={"44° 29' 41.64\" N"}
                                />
                                <TextCoordinateInput
                                    id="coordinate-longitude-dms"
                                    label={labels.longitudeDmsInputLabel}
                                    value={longitudeDms}
                                    onChange={setLongitudeDms}
                                    placeholder={"11° 20' 33.36\" E"}
                                />
                            </div>
                        )}

                        <ResultBox
                            lang={lang}
                            testId="coordinate-converter-result"
                            copyText={pointGeoJsonText}
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        {labels.decimalLabel}
                                    </p>
                                    <p className="text-xl font-bold text-blue-600 dark:text-blue-300">
                                        {summary.decimal}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        {labels.dmsLabel}
                                    </p>
                                    <p className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-300">
                                        {summary.latitudeDms}
                                        <br />
                                        {summary.longitudeDms}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap justify-end gap-2">
                                <a
                                    href={summary.links.googleMaps}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                                >
                                    {labels.openGoogleMapsLabel}
                                </a>
                                <a
                                    href={summary.links.openStreetMap}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                                >
                                    {labels.openStreetMapLabel}
                                </a>
                            </div>
                        </ResultBox>
                    </section>
                ) : null}

                {activeTab === "path" ? (
                    <section>
                        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                    {labels.pathBuilderTitle}
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                    {labels.pathBuilderDescription}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addPathPoint}
                                className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70"
                            >
                                + {labels.addPointLabel}
                            </button>
                        </div>

                        <div className="space-y-3">
                            {pathPoints.map((pathPoint, index) => (
                                <PathPointEditor
                                    key={`${index}-${pathPoint.latitude}-${pathPoint.longitude}`}
                                    point={pathPoint}
                                    index={index}
                                    labels={labels}
                                    onChange={updatePathPoint}
                                    onRemove={removePathPoint}
                                    canRemove={pathPoints.length > 1}
                                />
                            ))}
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.pointsCountLabel}
                                </p>
                                <p className="mt-1 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
                                    {pathStats.pointsCount}
                                </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.distanceLabel}
                                </p>
                                <p className="mt-1 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
                                    {formatNumber(
                                        pathStats.totalDistanceKm,
                                        locale,
                                        3,
                                    )}{" "}
                                    km
                                </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {labels.centerLabel}
                                </p>
                                <p className="mt-1 text-xl font-bold leading-7 text-zinc-950 dark:text-zinc-50 sm:text-2xl">
                                    {pathStats.center
                                        ? `${pathStats.center.latitude}, ${pathStats.center.longitude}`
                                        : "—"}
                                </p>
                            </div>
                        </div>

                        <ResultBox
                            lang={lang}
                            testId="coordinate-path-result"
                            copyText={lineStringGeoJsonText}
                        >
                            <MiniPathPreview
                                points={normalizedPathPoints}
                                labels={labels.preview}
                            />

                            <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        downloadTextFile(
                                            "path.geojson",
                                            lineStringGeoJsonText,
                                        )
                                    }
                                    className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                                >
                                    {labels.exportPathLabel}
                                </button>
                            </div>
                        </ResultBox>
                    </section>
                ) : null}

                {activeTab === "importExport" ? (
                    <section>
                        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            {labels.importExportTitle}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            {labels.importExportDescription}
                        </p>

                        <textarea
                            value={importText}
                            onChange={(event) =>
                                setImportText(event.target.value)
                            }
                            onDrop={(event) => {
                                event.preventDefault();
                                handleFile(event.dataTransfer.files?.[0]);
                            }}
                            onDragOver={(event) => event.preventDefault()}
                            placeholder={labels.importPlaceholder}
                            className="mt-4 min-h-40 w-full rounded-xl border border-zinc-300 bg-white p-3 font-mono text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400"
                        />

                        <div className="mt-3 flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => importCoordinates(importText)}
                                className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300"
                            >
                                {labels.importButtonLabel}
                            </button>
                            <label className="cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                                {labels.pickFileLabel}
                                <input
                                    type="file"
                                    accept=".json,.geojson,.csv,.txt,application/json"
                                    className="sr-only"
                                    onChange={(event) =>
                                        handleFile(event.target.files?.[0])
                                    }
                                />
                            </label>
                            <button
                                type="button"
                                onClick={() =>
                                    downloadTextFile(
                                        "coordinates.geojson",
                                        importResultText,
                                    )
                                }
                                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                            >
                                {labels.exportFeatureCollectionLabel}
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    downloadTextFile(
                                        "path.geojson",
                                        importResultText,
                                    )
                                }
                                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                            >
                                {labels.exportPathLabel}
                            </button>
                        </div>

                        {importMessage ? (
                            <p className="mt-3 text-sm font-semibold text-blue-700 dark:text-blue-300">
                                {importMessage}
                            </p>
                        ) : null}

                        <ResultBox
                            lang={lang}
                            testId="coordinate-geojson-result"
                            copyText={importResultText}
                        >
                            {importResultText ? (
                                <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-zinc-950 p-3 text-xs leading-5 text-zinc-100">
                                    {importResultText}
                                </pre>
                            ) : (
                                <div className="rounded-lg border border-dashed border-blue-200 bg-white/70 p-4 text-sm text-zinc-500 dark:border-blue-900/60 dark:bg-zinc-900/60 dark:text-zinc-400">
                                    {labels.emptyImportResult}
                                </div>
                            )}
                        </ResultBox>
                    </section>
                ) : null}
            </div>
        </ToolLayout>
    );
}