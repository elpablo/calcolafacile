"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

export default function MarginCalculator() {
    const [mode, setMode] = useState("fromPrice");
    const [costo, setCosto] = useState(60);
    const [prezzoVendita, setPrezzoVendita] = useState(100);
    const [margineTarget, setMargineTarget] = useState(30);

    const costoNumber = parseFloat(costo);
    const prezzoNumber = parseFloat(prezzoVendita);
    const margineTargetNumber = parseFloat(margineTarget);

    const isFromPriceValid =
        !isNaN(costoNumber) &&
        !isNaN(prezzoNumber) &&
        costoNumber >= 0 &&
        prezzoNumber > 0;

    const isTargetMarginValid =
        !isNaN(costoNumber) &&
        !isNaN(margineTargetNumber) &&
        costoNumber >= 0 &&
        margineTargetNumber >= 0 &&
        margineTargetNumber < 100;

    const isValid = mode === "fromPrice" ? isFromPriceValid : isTargetMarginValid;

    const profitto = isFromPriceValid ? prezzoNumber - costoNumber : 0;
    const margine = isFromPriceValid ? (profitto / prezzoNumber) * 100 : 0;

    const prezzoDaMargine = isTargetMarginValid
        ? costoNumber / (1 - margineTargetNumber / 100)
        : 0;
    const profittoDaMargine = isTargetMarginValid ? prezzoDaMargine - costoNumber : 0;

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
            title="Calcolo margine online"
            currentPath="/it/calcolo-margine"
            description="Questo calcolatore margine ti permette di calcolare il margine di profitto partendo dal costo e dal prezzo di vendita, oppure di trovare il prezzo di vendita necessario per ottenere un margine desiderato. È utile per freelance, ecommerce, negozi e piccole attività."
            examples={[
                {
                    title: "Calcolare il margine su un prodotto venduto online",
                    description:
                        "Inserisci il costo di acquisto e il prezzo di vendita per sapere quanto profitto generi e quale margine percentuale ottieni.",
                },
                {
                    title: "Trovare il prezzo di vendita partendo da un margine desiderato",
                    description:
                        "Se vuoi ottenere un margine del 30%, inserisci il costo del prodotto e il margine target per calcolare il prezzo minimo di vendita.",
                },
                {
                    title: "Confrontare margine e profitto prima di pubblicare un listino",
                    description:
                        "Usa il calcolatore per verificare rapidamente se un prezzo copre i costi e lascia un margine sostenibile per la tua attività.",
                },
            ]}
            faq={
                <>
                    <h3 className="font-semibold">Come si calcola il margine?</h3>
                    <p>
                        Il margine si calcola dividendo il profitto per il prezzo di vendita e moltiplicando il risultato per 100.
                    </p>

                    <h3 className="font-semibold mt-2">Qual è la differenza tra margine e markup?</h3>
                    <p>
                        Il margine misura il profitto rispetto al prezzo di vendita, mentre il markup misura il ricarico rispetto al costo.
                    </p>

                    <h3 className="font-semibold mt-2">Come calcolo il prezzo di vendita partendo dal margine desiderato?</h3>
                    <p>
                        Dividi il costo per 1 meno il margine desiderato espresso in forma decimale. Ad esempio, con un costo di 70 € e un margine del 30%, il prezzo di vendita è 100 €.
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
                    <option value="fromPrice">Calcola margine da costo e prezzo</option>
                    <option value="targetMargin">Calcola prezzo da margine desiderato</option>
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

            {mode === "targetMargin" && (
                <ToolInput
                    label="Margine desiderato"
                    value={margineTarget}
                    onChange={(e) => setMargineTarget(e.target.value)}
                    suffix="%"
                    placeholder="Es. 30"
                />
            )}

            <ResultBox>
                {mode === "fromPrice" ? (
                    <>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Profitto</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {formatEuro(profitto)} €
                        </p>

                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Margine</p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatPercent(margine)}%
                        </p>

                        {!isValid ? (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Inserisci un costo valido (≥ 0) e un prezzo di vendita maggiore di 0.
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Con un costo di {formatEuro(costoNumber)} € e un prezzo di vendita di {formatEuro(prezzoNumber)} €, il margine è pari al {formatPercent(margine)}%.
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Prezzo di vendita</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {formatEuro(prezzoDaMargine)} €
                        </p>

                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Profitto</p>
                        <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                            {formatEuro(profittoDaMargine)} €
                        </p>

                        {!isValid ? (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Inserisci un costo valido (≥ 0) e un margine desiderato compreso tra 0% e 99,99%.
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Con un costo di {formatEuro(costoNumber)} € e un margine desiderato del {formatPercent(margineTargetNumber)}%, il prezzo di vendita dovrebbe essere {formatEuro(prezzoDaMargine)} €.
                            </p>
                        )}
                    </>
                )}
            </ResultBox>
        </ToolLayout>
    );
}
