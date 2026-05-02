"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ToolLayout, { ResultBox } from "@/components/ToolLayout";

const models = {
    "gpt-4o-mini": {
        label: "GPT-4o mini",
        inputPricePerMillion: 0.15,
        outputPricePerMillion: 0.6,
    },
    "gpt-4o": {
        label: "GPT-4o",
        inputPricePerMillion: 5,
        outputPricePerMillion: 15,
    },
    "claude-3-5-sonnet": {
        label: "Claude 3.5 Sonnet",
        inputPricePerMillion: 3,
        outputPricePerMillion: 15,
    },
};

const sampleText = `Scrivi una breve descrizione di un'app che aiuta gli utenti a confrontare i prezzi dei prodotti nei supermercati vicini, usando un tono semplice e diretto.`;

const selectClass =
    "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

const labelClass =
    "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

function countWords(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function estimateTokens(text) {
    const characters = text.length;
    const words = countWords(text);

    const byCharacters = Math.ceil(characters / 4);
    const byWords = Math.ceil(words * 1.3);

    return Math.max(byCharacters, byWords);
}

function formatNumber(value) {
    return value.toLocaleString("it-IT");
}

function formatCurrency(value) {
    return value.toLocaleString("it-IT", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
    });
}

function decodeInitialText(value) {
    if (!value) {
        return "";
    }

    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

export default function TokenEstimator() {
    const searchParams = useSearchParams();
    const initialText = useMemo(
        () => decodeInitialText(searchParams.get("text")),
        [searchParams]
    );

    const [text, setText] = useState(initialText);
    const [modelKey, setModelKey] = useState("gpt-4o-mini");
    const [estimatedOutputTokens, setEstimatedOutputTokens] = useState(500);

    const stats = useMemo(() => {
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, "").length;
        const words = countWords(text);
        const inputTokens = estimateTokens(text);
        const outputTokens = Number.parseInt(estimatedOutputTokens, 10);
        const safeOutputTokens = Number.isNaN(outputTokens) || outputTokens < 0 ? 0 : outputTokens;
        const model = models[modelKey];

        const inputCost = (inputTokens / 1_000_000) * model.inputPricePerMillion;
        const outputCost = (safeOutputTokens / 1_000_000) * model.outputPricePerMillion;

        return {
            characters,
            charactersNoSpaces,
            words,
            inputTokens,
            outputTokens: safeOutputTokens,
            inputCost,
            outputCost,
            totalCost: inputCost + outputCost,
        };
    }, [text, modelKey, estimatedOutputTokens]);

    const selectedModel = models[modelKey];
    const copyText = `Token input stimati: ${formatNumber(stats.inputTokens)}\nToken output stimati: ${formatNumber(stats.outputTokens)}\nCosto stimato totale: ${formatCurrency(stats.totalCost)}`;

    return (
        <ToolLayout
            title="Stima token LLM online"
            currentPath="/it/token-estimator"
            description="Incolla un testo e ottieni una stima dei token usati da un modello LLM, insieme a un costo indicativo per input e output. La stima è approssimativa e avviene localmente nel browser."
            examples={[
                {
                    title: "Stimare il costo di un prompt prima di inviarlo",
                    description:
                        "Incolla prompt, istruzioni o documentazione per avere una stima dei token input e del costo indicativo sul modello selezionato.",
                },
                {
                    title: "Valutare una risposta LLM prevista",
                    description:
                        "Imposta il numero di token output che ti aspetti di ricevere per stimare il costo totale di una chiamata API.",
                },
                {
                    title: "Analizzare payload JSON o contenuti da API",
                    description:
                        "Puoi incollare JSON, payload o testi tecnici per capire se sono troppo lunghi per un flusso AI o un contesto LLM.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">La stima dei token è precisa?</h3>
                    <p>
                        No. Questa è una stima rapida basata su caratteri e parole. Il numero reale può cambiare in base al tokenizer usato dal modello.
                    </p>

                    <h3 className="mt-2 font-semibold">Il testo viene inviato a un server?</h3>
                    <p>
                        No. Il calcolo avviene nel browser e il testo non viene inviato a server esterni.
                    </p>

                    <h3 className="mt-2 font-semibold">I prezzi sono ufficiali?</h3>
                    <p>
                        I costi sono indicativi e possono cambiare. Per decisioni economiche importanti controlla sempre il pricing ufficiale del provider.
                    </p>
                </>
            }
        >
            <div className="mb-4">
                <label className={labelClass}>Testo da stimare</label>
                <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    className="min-h-48 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder="Incolla qui prompt, testo o contenuto da stimare..."
                    spellCheck={false}
                />
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    Stima locale nel browser. Nessun testo viene inviato a server esterni.
                </p>
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                    <label className={labelClass}>Modello</label>
                    <select
                        value={modelKey}
                        onChange={(event) => setModelKey(event.target.value)}
                        className={selectClass}
                    >
                        {Object.entries(models).map(([key, model]) => (
                            <option key={key} value={key}>
                                {model.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Output stimato</label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={estimatedOutputTokens}
                        onChange={(event) => setEstimatedOutputTokens(event.target.value)}
                        className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                        placeholder="Es. 500"
                    />
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        Token che prevedi di ricevere come risposta.
                    </p>
                </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setText(sampleText)}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    Usa esempio
                </button>
                <button
                    type="button"
                    onClick={() => setText("")}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                    Pulisci
                </button>
            </div>

            <ResultBox copyText={copyText}>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Token input stimati</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatNumber(stats.inputTokens)}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Caratteri</p>
                        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                            {formatNumber(stats.characters)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Parole</p>
                        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                            {formatNumber(stats.words)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Senza spazi</p>
                        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                            {formatNumber(stats.charactersNoSpaces)}
                        </p>
                    </div>
                </div>

                <div className="mt-4 rounded-lg border border-blue-200 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-zinc-900/60">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                        Costo stimato - {selectedModel.label}
                    </p>
                    <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                        <p>
                            <strong>Input:</strong> {formatCurrency(stats.inputCost)}
                        </p>
                        <p>
                            <strong>Output:</strong> {formatCurrency(stats.outputCost)}
                        </p>
                        <p>
                            <strong>Totale:</strong> {formatCurrency(stats.totalCost)}
                        </p>
                    </div>
                </div>
            </ResultBox>
        </ToolLayout>
    );
}