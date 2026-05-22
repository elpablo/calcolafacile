"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";
import { loadLocalState, saveLocalState } from "@/lib/browserStorage";
import { getRegexPatternLibrary } from "./regexPatternLibrary";
import {
    DEFAULT_OPTIONS,
    normalizeRegexTesterInput,
    parseRegexTesterQueryParams,
    SUPPORTED_FLAGS,
    testRegex,
} from "./regexTesterLogic";

const STORAGE_KEY = "calcolafacile:regex-tester";

function subscribeToHydration() {
    return () => {};
}

function hasRegexQueryParams(searchParams) {
    return [...searchParams.keys()].some((key) =>
        ["pattern", "flags", "testText"].includes(key),
    );
}

function getInitialState(shouldLoadSavedState, searchParams) {
    const queryState = parseRegexTesterQueryParams(searchParams);

    if (hasRegexQueryParams(searchParams)) {
        return queryState;
    }

    if (!shouldLoadSavedState) {
        return DEFAULT_OPTIONS;
    }

    const stored = loadLocalState(STORAGE_KEY, {});
    return normalizeRegexTesterInput({ ...DEFAULT_OPTIONS, ...stored });
}


function Field({ id, label, help, value, placeholder, onChange }) {
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
                name={id}
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                spellCheck={false}
                className="min-h-[50px] w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
            />
            {help ? (
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {help}
                </p>
            ) : null}
        </div>
    );
}

function TextArea({ id, label, help, value, placeholder, onChange }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
            >
                {label}
            </label>
            <textarea
                id={id}
                name={id}
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                spellCheck={false}
                rows={10}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
            />
            {help ? (
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {help}
                </p>
            ) : null}
        </div>
    );
}

function HighlightedTextPreview({ labels, result }) {
    const text = result.input.testText;

    if (!result.isValid) {
        return null;
    }

    if (!text) {
        return null;
    }

    const nonEmptyMatches = result.matches.filter((match) => match.end > match.start);
    const segments = [];
    let cursor = 0;

    nonEmptyMatches.forEach((match) => {
        if (match.start < cursor) {
            return;
        }

        if (match.start > cursor) {
            segments.push({
                key: `text-${cursor}-${match.start}`,
                type: "text",
                value: text.slice(cursor, match.start),
            });
        }

        segments.push({
            key: `match-${match.index}-${match.start}-${match.end}`,
            type: "match",
            value: text.slice(match.start, match.end),
            index: match.index,
        });

        cursor = match.end;
    });

    if (cursor < text.length) {
        segments.push({
            key: `text-${cursor}-${text.length}`,
            type: "text",
            value: text.slice(cursor),
        });
    }

    return (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="mb-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {labels.highlightedPreviewTitle ?? "Highlighted preview"}
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {labels.highlightedPreviewDescription ?? "Matched text is highlighted below."}
                </p>
            </div>

            <div className="max-h-[260px] overflow-auto whitespace-pre-wrap rounded-lg border border-zinc-200 bg-white p-3 font-mono text-sm leading-7 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100">
                {segments.length === 0 ? (
                    <span>{text}</span>
                ) : (
                    segments.map((segment) =>
                        segment.type === "match" ? (
                            <mark
                                key={segment.key}
                                title={`${labels.match} #${segment.index}`}
                                className="rounded bg-yellow-200 px-1 py-0.5 text-zinc-950 dark:bg-yellow-400/80 dark:text-zinc-950"
                            >
                                {segment.value}
                            </mark>
                        ) : (
                            <span key={segment.key}>{segment.value}</span>
                        ),
                    )
                )}
            </div>
        </div>
    );
}

function FlagToggle({ flag, enabled, label, onToggle }) {
    return (
        <button
            type="button"
            onClick={() => onToggle(flag)}
            className={
                enabled
                    ? "rounded-lg border border-blue-500 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                    : "rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            }
        >
            {flag} · {label}
        </button>
    );
}

function PatternLibrary({ labels, patterns, isOpen, onApply, onToggle }) {
    const groupedPatterns = patterns.reduce((groups, pattern) => {
        const category = pattern.category || "other";
        return {
            ...groups,
            [category]: [...(groups[category] || []), pattern],
        };
    }, {});

    return (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/40">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
            >
                <span>
                    <span className="block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                        {labels.patternLibraryTitle}
                    </span>
                    <span className="mt-1 block text-sm text-zinc-500 dark:text-zinc-400">
                        {labels.patternLibraryDescription}
                    </span>
                </span>
                <span className="shrink-0 rounded-full border border-zinc-300 px-2 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                    {isOpen ? labels.collapse : labels.expand}
                </span>
            </button>

            {isOpen ? (
                <div className="space-y-4 border-t border-zinc-200 p-4 dark:border-zinc-800">
                    {Object.entries(groupedPatterns).map(([category, items]) => (
                        <div key={category}>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                {labels.patternCategories?.[category] ?? category}
                            </p>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {items.map((pattern) => (
                                    <button
                                        key={pattern.key}
                                        type="button"
                                        onClick={() => onApply(pattern)}
                                        className="rounded-lg border border-zinc-200 bg-white p-3 text-left shadow-sm transition hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                                    >
                                        <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                            {pattern.title}
                                        </span>
                                        <span className="mt-1 block text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                                            {pattern.description}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default function RegexTesterCore({ content }) {
    const hasHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const searchParams = useSearchParams();
    const searchParamsString = searchParams.toString();

    return (
        <RegexTesterCoreContent
            key={`${hasHydrated ? "hydrated" : "ssr"}:${searchParamsString}`}
            content={content}
            searchParams={searchParams}
            shouldLoadSavedState={hasHydrated}
        />
    );
}

function RegexTesterCoreContent({ content, searchParams, shouldLoadSavedState }) {
    const { lang, title, currentPath, description, examples, faq, contextualTools, labels } = content;

    const initialState = getInitialState(shouldLoadSavedState, searchParams);
    const [formState, setFormState] = useState(initialState);
    const [isPatternLibraryOpen, setIsPatternLibraryOpen] = useState(false);

    useEffect(() => {
        if (!shouldLoadSavedState) return;
        saveLocalState(STORAGE_KEY, formState);
    }, [shouldLoadSavedState, formState]);

    const normalizedInput = useMemo(
        () => normalizeRegexTesterInput(formState),
        [formState],
    );

    const result = useMemo(() => testRegex(normalizedInput), [normalizedInput]);

    const patternLibrary = useMemo(
        () => getRegexPatternLibrary(lang),
        [lang],
    );


    const setValue = (key, value) => {
        setFormState((current) => ({ ...current, [key]: value }));
    };

    const toggleFlag = (flag) => {
        setFormState((current) => {
            const currentFlags = current.flags || "";

            if (currentFlags.includes(flag)) {
                return {
                    ...current,
                    flags: currentFlags.replace(flag, ""),
                };
            }

            return {
                ...current,
                flags: `${currentFlags}${flag}`,
            };
        });
    };


    const applyPattern = (pattern) => {
        setFormState(
            normalizeRegexTesterInput({
                pattern: pattern.pattern,
                flags: pattern.flags,
                testText: pattern.testText,
            }),
        );
    };

    const copyText = result.matches
        .map((match) => `${match.index}. ${match.value}`)
        .join("\n");

    return (
        <ToolLayout
            title={title}
            description={description}
            examples={examples}
            faq={faq}
            currentPath={currentPath}
            contextualTools={contextualTools}
            lang={lang}
        >
            <div className="space-y-5">
                <Field
                    id="regex-pattern"
                    label={labels.pattern}
                    help={labels.patternHelp}
                    value={formState.pattern}
                    placeholder={labels.patternPlaceholder}
                    onChange={(value) => setValue("pattern", value)}
                />

                <div>
                    <p className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                        {labels.flags}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {SUPPORTED_FLAGS.map((flag) => (
                            <FlagToggle
                                key={flag}
                                flag={flag}
                                enabled={formState.flags.includes(flag)}
                                label={labels.flagDescriptions[flag]}
                                onToggle={toggleFlag}
                            />
                        ))}
                    </div>
                </div>

                <TextArea
                    id="regex-test-text"
                    label={labels.testText}
                    help={labels.testTextHelp}
                    value={formState.testText}
                    placeholder={labels.testTextPlaceholder}
                    onChange={(value) => setValue("testText", value)}
                />

                <HighlightedTextPreview labels={labels} result={result} />

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setFormState(DEFAULT_OPTIONS)}
                        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                        {labels.reset}
                    </button>
                </div>

                <PatternLibrary
                    labels={labels}
                    patterns={patternLibrary}
                    isOpen={isPatternLibraryOpen}
                    onApply={applyPattern}
                    onToggle={() => setIsPatternLibraryOpen((current) => !current)}
                />
            </div>

            <ResultBox
                copyText={copyText}
                label={labels.resultTitle}
                lang={lang}
                testId="regex-result"
            >
                <div className="space-y-5">
                    {!result.isValid ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                            <p className="text-sm font-semibold uppercase tracking-wide">
                                {labels.invalidRegex}
                            </p>
                            <p className="mt-1 font-mono text-sm">
                                {result.errorMessage}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div
                                className={
                                    result.hasMatches
                                        ? "rounded-lg border border-green-200 bg-green-50 p-3 text-green-800 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300"
                                        : "rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
                                }
                            >
                                <p className="text-sm font-semibold uppercase tracking-wide">
                                    {result.hasMatches
                                        ? labels.matchesFound
                                        : labels.noMatches}
                                </p>
                                <p className="mt-1 text-3xl font-bold">
                                    {result.matchCount}
                                </p>
                                <p className="mt-1 text-sm">
                                    {labels.activeFlags}: {result.input.flags || labels.none}
                                </p>
                            </div>

                            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                                <div className="max-h-[420px] overflow-auto">
                                    <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
                                        <thead className="bg-zinc-50 dark:bg-zinc-900/60">
                                            <tr>
                                                <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                                    #
                                                </th>
                                                <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                                    {labels.match}
                                                </th>
                                                <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                                    {labels.position}
                                                </th>
                                                <th className="px-3 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-200">
                                                    {labels.groups}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-100 bg-white/70 dark:divide-zinc-800 dark:bg-zinc-950/40">
                                            {result.matches.map((match) => (
                                                <tr key={`${match.index}-${match.start}`}>
                                                    <td className="px-3 py-2 align-top text-zinc-500 dark:text-zinc-400">
                                                        {match.index}
                                                    </td>
                                                    <td className="px-3 py-2 align-top font-mono text-zinc-900 dark:text-zinc-100">
                                                        {match.value}
                                                    </td>
                                                    <td className="px-3 py-2 align-top text-zinc-700 dark:text-zinc-300">
                                                        {labels.line} {match.line}, {labels.column} {match.column}
                                                    </td>
                                                    <td className="px-3 py-2 align-top text-zinc-700 dark:text-zinc-300">
                                                        {match.groups.length === 0 &&
                                                        Object.keys(match.namedGroups).length === 0 ? (
                                                            <span className="text-zinc-500 dark:text-zinc-400">
                                                                {labels.none}
                                                            </span>
                                                        ) : (
                                                            <div className="space-y-1 font-mono text-xs">
                                                                {match.groups.map((group) => (
                                                                    <div key={group.index}>
                                                                        ${group.index}: {String(group.value)}
                                                                    </div>
                                                                ))}
                                                                {Object.entries(match.namedGroups).map(
                                                                    ([key, value]) => (
                                                                        <div key={key}>
                                                                            {key}: {String(value)}
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </ResultBox>
        </ToolLayout>
    );
}