"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

export default function MarkupCalculator() {
    const [mode, setMode] = useState("fromPrice");
    const [costo, setCosto] = useState(60);
    const [prezzoVendita, setPrezzoVendita] = useState(100);
    const [markupTarget, setMarkupTarget] = useState(50);

    const costoNumber = parseFloat(costo);
    const prezzoNumber = parseFloat(prezzoVendita);
    const markupTargetNumber = parseFloat(markupTarget);

    const isFromPriceValid =
        !isNaN(costoNumber) &&
        !isNaN(prezzoNumber) &&
        costoNumber > 0 &&
        prezzoNumber >= 0;

    const isTargetMarkupValid =
        !isNaN(costoNumber) &&
        !isNaN(markupTargetNumber) &&
        costoNumber > 0 &&
        markupTargetNumber >= 0;

    const isValid = mode === "fromPrice" ? isFromPriceValid : isTargetMarkupValid;

    const profitto = isFromPriceValid ? prezzoNumber - costoNumber : 0;
    const markup = isFromPriceValid ? (profitto / costoNumber) * 100 : 0;

    const prezzoDaMarkup = isTargetMarkupValid
        ? costoNumber * (1 + markupTargetNumber / 100)
        : 0;
    const profittoDaMarkup = isTargetMarkupValid ? prezzoDaMarkup - costoNumber : 0;

    const formatEuro = (value) =>
        value.toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const formatPercent = (value) =>
        value.toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const selectClass =
        "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

    return (
        <ToolLayout
            title="Calcolo markup online"
            currentPath="/it/calcolo-markup"
            description="Questo calcolatore markup ti permette di calcolare il ricarico percentuale partendo dal costo e dal prezzo di vendita, oppure di trovare il prezzo di vendita necessario per applicare un markup desiderato. È utile per ecommerce, negozi, freelance e piccole attività."
            faq={
                <>
                    <h3 className="font-semibold">Come si calcola il markup?</h3>
                    <p>
                        Il markup si calcola dividendo il profitto per il costo e moltiplicando il risultato per 100.
                    </p>

                    <h3 className="font-semibold mt-2">Qual è la differenza tra markup e margine?</h3>
                    <p>
                        Il markup misura il ricarico rispetto al costo, mentre il margine misura il profitto rispetto al prezzo di vendita.
                    </p>

                    <h3 className="font-semibold mt-2">Come calcolo il prezzo di vendita partendo dal markup desiderato?</h3>
                    <p>
                        Moltiplica il costo per 1 più il markup espresso in forma decimale. Ad esempio, con un costo di 60 € e un markup del 50%, il prezzo di vendita è 90 €.
                    </p>
                </>
            }
        >
            <div className="mb-6">
                <label className={labelClass}>Tipo di calcolo</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className={selectClass}
                >
                    <option value="fromPrice">Calcola markup da costo e prezzo</option>
                    <option value="targetMarkup">Calcola prezzo da markup desiderato</option>
                </select>
            </div>

            <ToolInput
                label="Costo"
                value={costo}
                onChange={(e) => setCosto(e.target.value)}
                suffix="€"
                placeholder="Es. 60"
                helpText="Inserisci il costo del prodotto"
            />

            {mode === "fromPrice" && (
                <ToolInput
                    label="Prezzo di vendita"
                    value={prezzoVendita}
                    onChange={(e) => setPrezzoVendita(e.target.value)}
                    suffix="€"
                    placeholder="Es. 100"
                />
            )}

            {mode === "targetMarkup" && (
                <ToolInput
                    label="Markup desiderato"
                    value={markupTarget}
                    onChange={(e) => setMarkupTarget(e.target.value)}
                    suffix="%"
                    placeholder="Es. 50"
                />
            )}

            <ResultBox>
                {mode === "fromPrice" ? (
                    <>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Profitto</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {formatEuro(profitto)} €
                        </p>

                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Markup</p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatPercent(markup)}%
                        </p>

                        {!isValid ? (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Inserisci un costo maggiore di 0 e un prezzo di vendita valido (≥ 0).
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Con un costo di {formatEuro(costoNumber)} € e un prezzo di vendita di {formatEuro(prezzoNumber)} €, il markup è pari al {formatPercent(markup)}%.
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Prezzo di vendita</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {formatEuro(prezzoDaMarkup)} €
                        </p>

                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Profitto</p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatEuro(profittoDaMarkup)} €
                        </p>

                        {!isValid ? (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Inserisci un costo maggiore di 0 e un markup desiderato valido (≥ 0%).
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Con un costo di {formatEuro(costoNumber)} € e un markup desiderato del {formatPercent(markupTargetNumber)}%, il prezzo di vendita dovrebbe essere {formatEuro(prezzoDaMarkup)} €.
                            </p>
                        )}
                    </>
                )}
            </ResultBox>
        </ToolLayout>
    );
}