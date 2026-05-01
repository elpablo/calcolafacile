"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function MarkupCalculator() {
    const [costo, setCosto] = useState(60);
    const [prezzoVendita, setPrezzoVendita] = useState(100);

    const costoNumber = parseFloat(costo);
    const prezzoNumber = parseFloat(prezzoVendita);

    const isValid =
        !isNaN(costoNumber) &&
        !isNaN(prezzoNumber) &&
        costoNumber > 0;

    const profitto = isValid ? prezzoNumber - costoNumber : 0;
    const markup = isValid ? (profitto / costoNumber) * 100 : 0;

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
    const fieldClass =
        "w-full rounded border border-zinc-300 bg-white p-2 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400";

    return (
        <ToolLayout
            title="Calcolo markup online"
            currentPath="/it/calcolo-markup"
            description="Questo calcolatore markup ti permette di calcolare il ricarico percentuale partendo dal costo e dal prezzo di vendita. È utile per ecommerce, negozi, freelance e piccole attività che vogliono capire quanto ricarico applicano sui propri prodotti o servizi."
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
                </>
            }
        >
            <div className="mb-4">
                <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Costo</label>
                <input
                    type="number"
                    step="0.01"
                    value={costo}
                    onChange={(e) => setCosto(e.target.value)}
                    className={fieldClass}
                    placeholder="Inserisci il costo (es. 60)"
                />
            </div>

            <div className="mb-4">
                <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Prezzo di vendita</label>
                <input
                    type="number"
                    step="0.01"
                    value={prezzoVendita}
                    onChange={(e) => setPrezzoVendita(e.target.value)}
                    className={fieldClass}
                    placeholder="Inserisci il prezzo di vendita (es. 100)"
                />
            </div>

            <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/40">
                <p className="text-lg text-zinc-800 dark:text-zinc-100">
                    Profitto: <strong className="text-blue-700 dark:text-blue-300">{formatEuro(profitto)} €</strong>
                </p>
                <p className="text-lg text-zinc-800 dark:text-zinc-100">
                    Markup: <strong className="text-blue-700 dark:text-blue-300">{formatPercent(markup)}%</strong>
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    Con un costo di {formatEuro(isNaN(costoNumber) ? 0 : costoNumber)} € e un prezzo di vendita di{" "}
                    {formatEuro(isNaN(prezzoNumber) ? 0 : prezzoNumber)} €, il markup è pari al {formatPercent(markup)}%.
                </p>
            </div>
        </ToolLayout>
    );
}