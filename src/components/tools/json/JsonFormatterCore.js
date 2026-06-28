"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
} from "react";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import JsonCodeBlock from "@/components/tools/json/JsonCodeBlock";
import { jsonFormatterExamples } from "@/components/tools/json/jsonFormatterExamples";
import {
    formatJson,
    getJsonSize,
    minifyJson,
    repairJson,
} from "@/components/tools/json/jsonFormatterLogic";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import { downloadFile } from "@/lib/downloadFile";

const STORAGE_KEY = "calcolafacile:json-formatter";
const MAX_DROPPED_FILE_SIZE = 2 * 1024 * 1024;
const DEFAULT_FORMATTER_STATE = {
    input: "",
    viewMode: "pretty",
};

function subscribeToHydration() {
    return () => {};
}

function getInitialFormatterState(currentExampleKey, shouldLoadSavedState) {
    const example = currentExampleKey
        ? jsonFormatterExamples[currentExampleKey]
        : null;

    if (example) {
        return {
            input: example.input,
            viewMode: example.viewMode ?? "pretty",
        };
    }

    if (!shouldLoadSavedState) {
        return DEFAULT_FORMATTER_STATE;
    }

    const storedState = loadLocalState(STORAGE_KEY, {});

    return {
        input: typeof storedState?.input === "string" ? storedState.input : "",
        viewMode: ["pretty", "minified"].includes(storedState?.viewMode)
            ? storedState.viewMode
            : "pretty",
    };
}

export default function JsonFormatterCore({ content }) {
    const searchParams = useSearchParams();
    const currentExampleKey = searchParams.get("example");
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    return (
        <JsonFormatterCoreContent
            key={`${currentExampleKey ?? "saved-state"}:${hasHydrated ? "hydrated" : "ssr"}`}
            content={content}
            currentExampleKey={currentExampleKey}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function JsonFormatterCoreContent({
    content,
    currentExampleKey,
    shouldLoadSavedState,
}) {
    const {
        lang,
        title,
        currentPath,
        contextualTools,
        description,
        examples,
        faq,
        faqSchema,
        labels,
        sampleJson,
        relatedLinks,
    } = content;

    const [formatterState, setFormatterState] = useState(() => {
        return getInitialFormatterState(
            currentExampleKey,
            shouldLoadSavedState,
        );
    });
    const [dropError, setDropError] = useState(null);
    const [repairResult, setRepairResult] = useState(null);
    const { input, viewMode } = formatterState;
    const textareaRef = useRef(null);

    useEffect(() => {
        if (!shouldLoadSavedState) {
            return;
        }

        if (currentExampleKey) {
            return;
        }

        saveLocalState(STORAGE_KEY, {
            input,
            viewMode,
        });
    }, [currentExampleKey, input, shouldLoadSavedState, viewMode]);

    const setInput = (nextInput) => {
        setRepairResult(null);
        setFormatterState((currentState) => ({
            ...currentState,
            input:
                typeof nextInput === "function"
                    ? nextInput(currentState.input)
                    : nextInput,
        }));
    };

    const setViewMode = (nextViewMode) => {
        setFormatterState((currentState) => ({
            ...currentState,
            viewMode:
                typeof nextViewMode === "function"
                    ? nextViewMode(currentState.viewMode)
                    : nextViewMode,
        }));
    };

    const isAcceptedJsonFile = (file) => {
        if (!file) {
            return false;
        }

        const fileName = file.name?.toLowerCase() || "";
        const fileType = file.type || "";

        return (
            fileName.endsWith(".json") ||
            fileType === "application/json" ||
            fileType === "text/plain"
        );
    };

    const handleDroppedFiles = async (files) => {
        setDropError(null);

        const fileList = Array.from(files || []);

        if (fileList.length !== 1) {
            setDropError(labels.dropSingleFileError);
            return;
        }

        const file = fileList[0];

        if (!isAcceptedJsonFile(file)) {
            setDropError(labels.dropInvalidFileError);
            return;
        }

        if (file.size > MAX_DROPPED_FILE_SIZE) {
            setDropError(labels.dropFileTooLargeError);
            return;
        }

        try {
            const text = await file.text();
            setInput(text);
            setViewMode("pretty");
        } catch {
            setDropError(labels.dropReadError);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event) => {
        event.preventDefault();
        handleDroppedFiles(event.dataTransfer.files);
    };

    const result = useMemo(() => formatJson(input), [input]);

    const handleGoToError = () => {
        const textarea = textareaRef.current;
        const position = result.error?.position;
        if (!textarea || position === null || position === undefined) {
            return;
        }

        const clampedPosition = Math.max(0, Math.min(position, input.length));
        textarea.focus();
        textarea.setSelectionRange(clampedPosition, clampedPosition);

        const lineHeight =
            parseFloat(window.getComputedStyle(textarea).lineHeight) || 20;
        const line = result.error.line ?? 1;
        textarea.scrollTop = Math.max(
            0,
            (line - 1) * lineHeight - textarea.clientHeight / 2,
        );
    };

    const handleTryRepair = () => {
        setRepairResult(repairJson(input));
    };

    const handleApplyRepaired = () => {
        if (!repairResult?.repaired) {
            return;
        }
        setInput(repairResult.repaired);
        setViewMode("pretty");
        setRepairResult(null);
    };

    const handleApplyPartialRepair = () => {
        if (!repairResult?.partialRepaired) {
            return;
        }
        // setInput clears repairResult; the (still invalid) error flow
        // re-activates naturally once formatJson re-runs on the new input.
        setInput(repairResult.partialRepaired);
        setViewMode("pretty");
    };

    const displayedOutput = useMemo(() => {
        if (!result.formatted) return null;
        if (viewMode === "minified") {
            return minifyJson(input);
        }
        return result.formatted;
    }, [result, viewMode, input]);

    const jsonSize = useMemo(() => getJsonSize(input), [input]);

    return (
        <>
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}
            <ToolLayout
                title={title}
                lang={lang}
                currentPath={currentPath}
                contextualTools={contextualTools}
                description={description}
                examples={examples}
                faq={faq}
            >
                <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                        {labels.inputLabel}
                    </label>
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                        placeholder={labels.placeholder}
                    />
                    <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                        {labels.dropHint}
                    </p>
                    {dropError && (
                        <p className="mt-2 rounded-lg border border-[#ffcaca] bg-[#fef2f2] p-2 text-xs text-[#bf000f] dark:border-[#82181a99] dark:bg-[#4608094c] dark:text-[#ffcaca]">
                            {dropError}
                        </p>
                    )}
                </div>

                <div className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {jsonSize && (
                        <>
                            {labels.size}: {jsonSize}
                        </>
                    )}
                </div>

                <div className="mb-4 flex gap-2 flex-wrap">
                    <button
                        onClick={() => {
                            setInput(sampleJson);
                            setViewMode("pretty");
                        }}
                        className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        {labels.useSample}
                    </button>
                    <button
                        onClick={() => {
                            setInput("");
                            setViewMode("pretty");
                        }}
                        className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        {labels.clear}
                    </button>
                    <button
                        onClick={() => setViewMode("pretty")}
                        className={`rounded-lg border px-3 py-2 text-sm ${viewMode === "pretty" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                    >
                        {labels.prettyView}
                    </button>
                    <button
                        onClick={() => setViewMode("minified")}
                        className={`rounded-lg border px-3 py-2 text-sm ${viewMode === "minified" ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                    >
                        {labels.minifiedView}
                    </button>
                </div>

                {/* Native JSON.parse error text varies by JS engine (SSR is always V8), so this stays client-only to avoid hydration mismatches on Safari/Firefox. */}
                {shouldLoadSavedState && result.error && (
                    <div className="rounded-xl border border-[#ffcaca] bg-[#fef2f2] p-4 text-sm text-[#bf000f] dark:border-[#82181a99] dark:bg-[#46080966] dark:text-[#ffa3a3]">
                        <p>
                            <strong>{labels.invalidJson}:</strong>{" "}
                            {result.error.message}
                        </p>
                        {result.error.line !== null &&
                            result.error.column !== null && (
                                <p className="mt-1 text-xs text-[#e40014] dark:text-[#ff6568]">
                                    {labels.errorLocation
                                        .replace("{line}", result.error.line)
                                        .replace("{column}", result.error.column)}
                                </p>
                            )}
                        {result.error.context.length > 0 && (
                            <pre className="mt-3 overflow-x-auto rounded-lg bg-[#ffe2e2b2] p-3 font-mono text-xs leading-5 text-[#82181a] dark:bg-[#46080999] dark:text-[#ffcaca]">
                                {result.error.context.map((contextLine) => (
                                    <div key={contextLine.lineNumber}>
                                        <div
                                            className={
                                                contextLine.isErrorLine
                                                    ? "font-semibold"
                                                    : "opacity-70"
                                            }
                                        >
                                            {String(
                                                contextLine.lineNumber,
                                            ).padStart(4, " ")}{" "}
                                            | {contextLine.text}
                                        </div>
                                        {contextLine.isErrorLine &&
                                            result.error.pointerColumn && (
                                                <div className="text-[#e40014] dark:text-[#ff6568]">
                                                    {"     | " +
                                                        " ".repeat(
                                                            Math.max(
                                                                0,
                                                                result.error
                                                                    .pointerColumn -
                                                                    1,
                                                            ),
                                                        ) +
                                                        "^"}
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </pre>
                        )}
                        <div className="mt-3 flex flex-wrap gap-2">
                            {result.error.position !== null && (
                                <button
                                    onClick={handleGoToError}
                                    className="appearance-none rounded-lg border border-[#ffa3a3] bg-white px-3 py-1.5 text-xs font-medium text-[#bf000f] hover:bg-[#ffe2e2] dark:border-[#9f0712] dark:bg-[#46080966] dark:text-[#ffcaca] dark:hover:bg-[#82181a66]"
                                >
                                    {labels.goToError}
                                </button>
                            )}
                            <button
                                onClick={handleTryRepair}
                                className="appearance-none rounded-lg border border-[#ffa3a3] bg-white px-3 py-1.5 text-xs font-medium text-[#bf000f] hover:bg-[#ffe2e2] dark:border-[#9f0712] dark:bg-[#46080966] dark:text-[#ffcaca] dark:hover:bg-[#82181a66]"
                            >
                                {labels.tryRepairJson}
                            </button>
                        </div>
                        {repairResult &&
                            (repairResult.isFullyValid ? (
                                <div className="mt-3 rounded-lg border border-[#b9f8cf] bg-[#f0fdf4] p-3 text-xs text-[#016630] dark:border-[#0d542b99] dark:bg-[#032e1566] dark:text-[#7bf1a8]">
                                    <p className="font-semibold">
                                        {labels.repairAvailable}
                                    </p>
                                    <p className="mt-1">
                                        {labels.appliedFixes}:
                                    </p>
                                    <ul className="mt-1 list-disc pl-4">
                                        {repairResult.appliedFixes.map((fix) => (
                                            <li key={fix}>{fix}</li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={handleApplyRepaired}
                                        className="mt-2 appearance-none rounded-lg border border-[#7bf1a8] bg-white px-3 py-1.5 text-xs font-medium text-[#008138] hover:bg-[#dcfce7] dark:border-[#008138] dark:bg-[#032e1566] dark:text-[#7bf1a8] dark:hover:bg-[#0d542b66]"
                                    >
                                        {labels.applyRepairedJson}
                                    </button>
                                </div>
                            ) : repairResult.partialRepaired !== null ? (
                                <div className="mt-3 rounded-lg border border-[#bedbff] bg-[#eff6ff] p-3 text-xs text-[#193cb8] dark:border-[#1c398e99] dark:bg-[#16245666] dark:text-[#bedbff]">
                                    <p className="font-semibold">
                                        {labels.partialRepairAvailable}
                                    </p>
                                    <p className="mt-1">
                                        {labels.appliedFixes}:
                                    </p>
                                    <ul className="mt-1 list-disc pl-4">
                                        {repairResult.appliedFixes.map((fix) => (
                                            <li key={fix}>{fix}</li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={handleApplyPartialRepair}
                                        className="mt-2 appearance-none rounded-lg border border-[#90c5ff] bg-white px-3 py-1.5 text-xs font-medium text-[#1447e6] hover:bg-[#dbeafe] dark:border-[#1447e6] dark:bg-[#16245666] dark:text-[#bedbff] dark:hover:bg-[#1c398e66]"
                                    >
                                        {labels.applyPartialRepairJson}
                                    </button>
                                </div>
                            ) : (
                                <p className="mt-3 rounded-lg border border-[#bedbff] bg-[#eff6ff] p-3 text-xs text-[#193cb8] dark:border-[#1c398e99] dark:bg-[#16245666] dark:text-[#bedbff]">
                                    {labels.repairFailed}
                                </p>
                            ))}
                    </div>
                )}

                {displayedOutput && (
                    <>
                        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                            {labels.format}:{" "}
                            {viewMode === "pretty"
                                ? labels.pretty
                                : labels.minified}
                        </p>
                        <ResultBox
                            copyText={displayedOutput}
                            lang={lang}
                            testId="json-formatter-result"
                        >
                            <div className="max-h-[min(70vh,520px)] overflow-auto rounded-lg">
                                <JsonCodeBlock value={displayedOutput} />
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        downloadFile(
                                            viewMode === "minified"
                                                ? "minified.json"
                                                : "formatted.json",
                                            displayedOutput,
                                            "application/json",
                                        )
                                    }
                                    className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                                    data-testid="json-formatter-download"
                                >
                                    {labels.download}
                                </button>
                            </div>
                        </ResultBox>
                    </>
                )}
                <div className="mt-2 text-xs text-zinc-500">
                    {viewMode === "minified"
                        ? labels.minifiedHint
                        : labels.prettyHint}
                </div>
                {relatedLinks && (
                    <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
                        {relatedLinks.beforeFirstLink}{" "}
                        <Link
                            href={relatedLinks.first.href}
                            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            {relatedLinks.first.label}
                        </Link>{" "}
                        {relatedLinks.betweenLinks}{" "}
                        <Link
                            href={relatedLinks.second.href}
                            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            {relatedLinks.second.label}
                        </Link>
                        {relatedLinks.afterSecondLink}
                    </div>
                )}
            </ToolLayout>
        </>
    );
}
