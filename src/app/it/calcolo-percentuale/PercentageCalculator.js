"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const modes = {
    percentOf: "percentOf",
    ratio: "ratio",
    change: "change",
    discount: "discount",
};

export default function PercentageCalculator() {
    const [mode, setMode] = useState(modes.percentOf);
    const [valore, setValore] = useState(100);
    const [percentuale, setPercentuale] = useState(22);
    const [parte, setParte] = useState(25);
    const [totale, setTotale] = useState(200);
    const [base, setBase] = useState(100);
    const [variazione, setVariazione] = useState(10);
    const [tipoVariazione, setTipoVariazione] = useState("aumento");
    const [prezzo, setPrezzo] = useState(120);
    const [sconto, setSconto] = useState(30);

    const parseNumber = (value) => {
        const number = parseFloat(value);
        return isNaN(number) ? null : number;
    };

    const formatNumber = (value) =>
        value.toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const renderResult = () => {
        if (mode === modes.percentOf) {
            const numero = parseNumber(valore);
            const percentualeValue = parseNumber(percentuale);
            const risultato = numero === null || percentualeValue === null ? 0 : (numero * percentualeValue) / 100;

            return {
                title: "Risultato",
                value: formatNumber(risultato),
                detail: `${percentuale || 0}% di ${valore || 0} = ${formatNumber(risultato)}`,
            };
        }

        if (mode === modes.ratio) {
            const parteNumber = parseNumber(parte);
            const totaleNumber = parseNumber(totale);
            const risultato =
                parteNumber === null || totaleNumber === null || totaleNumber === 0
                    ? 0
                    : (parteNumber / totaleNumber) * 100;

            return {
                title: "Percentuale",
                value: `${formatNumber(risultato)}%`,
                detail: `${parte || 0} è il ${formatNumber(risultato)}% di ${totale || 0}`,
            };
        }

        if (mode === modes.change) {
            const baseNumber = parseNumber(base);
            const variazioneNumber = parseNumber(variazione);
            const multiplier = tipoVariazione === "aumento" ? 1 : -1;
            const delta = baseNumber === null || variazioneNumber === null ? 0 : (baseNumber * variazioneNumber) / 100;
            const risultato = baseNumber === null ? 0 : baseNumber + multiplier * delta;

            return {
                title: tipoVariazione === "aumento" ? "Valore aumentato" : "Valore ridotto",
                value: formatNumber(risultato),
                detail: `${base || 0} ${tipoVariazione === "aumento" ? "+" : "-"} ${variazione || 0}% = ${formatNumber(risultato)}`,
            };
        }

        const prezzoNumber = parseNumber(prezzo);
        const scontoNumber = parseNumber(sconto);
        const risparmio = prezzoNumber === null || scontoNumber === null ? 0 : (prezzoNumber * scontoNumber) / 100;
        const prezzoFinale = prezzoNumber === null ? 0 : prezzoNumber - risparmio;

        return {
            title: "Prezzo scontato",
            value: `${formatNumber(prezzoFinale)} €`,
            detail: `Sconto: ${formatNumber(risparmio)} € su ${formatNumber(prezzoNumber || 0)} €`,
        };
    };

    const result = renderResult();
    const fieldClass =
        "w-full rounded border border-zinc-300 bg-white p-2 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400";

    return (
        <ToolLayout
            title="Calcolo percentuale online"
            description="Questo calcolatore percentuale ti permette di calcolare rapidamente percentuali, rapporti percentuali, aumenti, riduzioni e sconti. È utile per acquisti, lavoro, scuola, preventivi e calcoli quotidiani."
            faq={
                <>
                    <h3 className="font-semibold">Come si calcola il 20% di un numero?</h3>
                    <p>
                        Per calcolare il 20% di un numero, moltiplica il numero per 20 e dividi il risultato per 100.
                    </p>

                    <h3 className="font-semibold mt-2">Come calcolo che percentuale è un numero rispetto a un totale?</h3>
                    <p>
                        Dividi la parte per il totale e moltiplica il risultato per 100.
                    </p>

                    <h3 className="font-semibold mt-2">Come si calcola uno sconto percentuale?</h3>
                    <p>
                        Moltiplica il prezzo iniziale per la percentuale di sconto e dividi per 100. Poi sottrai lo sconto dal prezzo iniziale.
                    </p>
                </>
            }
        >
            <div className="mb-6">
                <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Tipo di calcolo</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className={fieldClass}
                >
                    <option value={modes.percentOf}>Quanto è X% di un numero</option>
                    <option value={modes.ratio}>Un numero è che percentuale del totale</option>
                    <option value={modes.change}>Aumenta o riduci un numero del X%</option>
                    <option value={modes.discount}>Calcola prezzo scontato</option>
                </select>
            </div>

            {mode === modes.percentOf && (
                <>
                    <div className="mb-4">
                        <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Numero di partenza</label>
                        <input
                            type="number"
                            step="0.01"
                            value={valore}
                            onChange={(e) => setValore(e.target.value)}
                            className={fieldClass}
                            placeholder="Inserisci un numero (es. 100)"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Percentuale (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={percentuale}
                            onChange={(e) => setPercentuale(e.target.value)}
                            className={fieldClass}
                            placeholder="Inserisci la percentuale (es. 22)"
                        />
                    </div>
                </>
            )}

            {mode === modes.ratio && (
                <>
                    <div className="mb-4">
                        <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Parte</label>
                        <input
                            type="number"
                            step="0.01"
                            value={parte}
                            onChange={(e) => setParte(e.target.value)}
                            className={fieldClass}
                            placeholder="Inserisci la parte (es. 25)"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Totale</label>
                        <input
                            type="number"
                            step="0.01"
                            value={totale}
                            onChange={(e) => setTotale(e.target.value)}
                            className={fieldClass}
                            placeholder="Inserisci il totale (es. 200)"
                        />
                    </div>
                </>
            )}

            {mode === modes.change && (
                <>
                    <div className="mb-4">
                        <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Numero di partenza</label>
                        <input
                            type="number"
                            step="0.01"
                            value={base}
                            onChange={(e) => setBase(e.target.value)}
                            className={fieldClass}
                            placeholder="Inserisci un numero (es. 100)"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Variazione (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={variazione}
                            onChange={(e) => setVariazione(e.target.value)}
                            className={fieldClass}
                            placeholder="Inserisci la variazione (es. 10)"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Tipo variazione</label>
                        <select
                            value={tipoVariazione}
                            onChange={(e) => setTipoVariazione(e.target.value)}
                            className={fieldClass}
                        >
                            <option value="aumento">Aumento</option>
                            <option value="riduzione">Riduzione</option>
                        </select>
                    </div>
                </>
            )}

            {mode === modes.discount && (
                <>
                    <div className="mb-4">
                        <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Prezzo iniziale</label>
                        <input
                            type="number"
                            step="0.01"
                            value={prezzo}
                            onChange={(e) => setPrezzo(e.target.value)}
                            className={fieldClass}
                            placeholder="Inserisci il prezzo (es. 120)"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Sconto (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={sconto}
                            onChange={(e) => setSconto(e.target.value)}
                            className={fieldClass}
                            placeholder="Inserisci lo sconto (es. 30)"
                        />
                    </div>
                </>
            )}

            <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/40">
                <p className="text-lg text-zinc-800 dark:text-zinc-100">
                    {result.title}: <strong className="text-blue-700 dark:text-blue-300">{result.value}</strong>
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{result.detail}</p>
            </div>
        </ToolLayout>
    );
}
