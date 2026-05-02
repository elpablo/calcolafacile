"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

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

    const selectClass =
        "h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base font-medium leading-none text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-blue-400";

    const labelClass =
        "mb-1.5 block text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300";

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

            if (tipoVariazione === "riduzione" && variazioneNumber !== null && variazioneNumber > 100) {
                return {
                    title: "Valore non valido",
                    value: "-",
                    detail: "La riduzione non può essere superiore al 100%.",
                };
            }

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

        if (scontoNumber !== null && scontoNumber > 100) {
            return {
                title: "Sconto non valido",
                value: "-",
                detail: "Lo sconto non può essere superiore al 100%.",
            };
        }

        const risparmio = prezzoNumber === null || scontoNumber === null ? 0 : (prezzoNumber * scontoNumber) / 100;
        const prezzoFinale = prezzoNumber === null ? 0 : prezzoNumber - risparmio;

        return {
            title: "Prezzo scontato",
            value: `${formatNumber(prezzoFinale)} €`,
            detail: `Sconto: ${formatNumber(risparmio)} € su ${formatNumber(prezzoNumber || 0)} €`,
        };
    };

    const result = renderResult();

    return (
        <ToolLayout
            title="Calcolo percentuale online"
            currentPath="/it/calcolo-percentuale"
            description="Questo calcolatore percentuale ti permette di calcolare rapidamente percentuali, rapporti percentuali, aumenti, riduzioni e sconti. È utile per acquisti, lavoro, scuola, preventivi e calcoli quotidiani."
            examples={[
                {
                    title: "Calcolare il 20% di un importo",
                    description:
                        "Seleziona 'Quanto è X% di un numero', inserisci 20 come percentuale e 150 come numero di partenza per ottenere 30.",
                },
                {
                    title: "Calcolare uno sconto percentuale",
                    description:
                        "Usa la modalità prezzo scontato per sapere quanto paghi un prodotto dopo uno sconto, ad esempio 30% su 120 €.",
                },
                {
                    title: "Calcolare un aumento o una riduzione",
                    description:
                        "Puoi aumentare o ridurre un valore di una percentuale, ad esempio per stimare un rincaro del 10% o una riduzione del 15%.",
                },
            ]}
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
                <label className={labelClass}>Tipo di calcolo</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className={selectClass}
                >
                    <option value={modes.percentOf}>Quanto è X% di un numero</option>
                    <option value={modes.ratio}>Un numero è che percentuale del totale</option>
                    <option value={modes.change}>Aumenta o riduci un numero del X%</option>
                    <option value={modes.discount}>Calcola prezzo scontato</option>
                </select>
            </div>

            {mode === modes.percentOf && (
                <>
                    <ToolInput
                        label="Numero di partenza"
                        value={valore}
                        onChange={(e) => setValore(e.target.value)}
                        placeholder="Es. 100"
                    />

                    <ToolInput
                        label="Percentuale"
                        value={percentuale}
                        onChange={(e) => setPercentuale(e.target.value)}
                        suffix="%"
                        placeholder="Es. 22"
                    />
                </>
            )}

            {mode === modes.ratio && (
                <>
                    <ToolInput
                        label="Parte"
                        value={parte}
                        onChange={(e) => setParte(e.target.value)}
                        placeholder="Es. 25"
                    />

                    <ToolInput
                        label="Totale"
                        value={totale}
                        onChange={(e) => setTotale(e.target.value)}
                        placeholder="Es. 200"
                    />
                </>
            )}

            {mode === modes.change && (
                <>
                    <ToolInput
                        label="Numero di partenza"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder="Es. 100"
                    />

                    <ToolInput
                        label="Variazione"
                        value={variazione}
                        onChange={(e) => setVariazione(e.target.value)}
                        suffix="%"
                        placeholder="Es. 10"
                    />

                    <div className="mb-4">
                        <label className={labelClass}>Tipo variazione</label>
                        <select
                            value={tipoVariazione}
                            onChange={(e) => setTipoVariazione(e.target.value)}
                            className={selectClass}
                        >
                            <option value="aumento">Aumento</option>
                            <option value="riduzione">Riduzione</option>
                        </select>
                    </div>
                </>
            )}

            {mode === modes.discount && (
                <>
                    <ToolInput
                        label="Prezzo iniziale"
                        value={prezzo}
                        onChange={(e) => setPrezzo(e.target.value)}
                        suffix="€"
                        placeholder="Es. 120"
                    />

                    <ToolInput
                        label="Sconto"
                        value={sconto}
                        onChange={(e) => setSconto(e.target.value)}
                        suffix="%"
                        placeholder="Es. 30"
                    />
                </>
            )}

            <ResultBox copyText={`${result.title}: ${result.value}`}>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{result.title}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {result.value}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{result.detail}</p>
            </ResultBox>
        </ToolLayout>
    );
}
