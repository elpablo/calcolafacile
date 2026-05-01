"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function SalaryCalculator() {
    const [ral, setRal] = useState(30000);

    const ralNumber = parseFloat(ral);

    const nettoAnnuale = isNaN(ralNumber) ? 0 : ralNumber * 0.7;

    const nettoMensile = nettoAnnuale / 12;

    const formatEuro = (value) =>
        value.toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <ToolLayout
            title="Calcolo stipendio netto da lordo"
            currentPath="/it/calcolo-stipendio-netto"
            description="Questo calcolatore ti permette di stimare lo stipendio netto partendo dalla RAL (reddito annuo lordo). Il risultato è una stima media utile per avere un'idea del netto mensile."
            faq={
                <>
                    <h3 className="font-semibold">
                        Come si calcola il netto dalla RAL?
                    </h3>
                    <p>
                        Il netto dipende da imposte e detrazioni. Questo
                        strumento usa una stima media per fornire un risultato
                        rapido.
                    </p>

                    <h3 className="font-semibold mt-2">
                        Il risultato è preciso?
                    </h3>
                    <p>
                        No, è una stima. Il netto reale dipende da molti fattori
                        come residenza, contratto e detrazioni.
                    </p>
                </>
            }
        >
            <div className="mb-4">
                <label className="mb-1 block text-zinc-700 dark:text-zinc-300">RAL (lordo annuo)</label>
                <input
                    type="number"
                    value={ral}
                    onChange={(e) => setRal(e.target.value)}
                    className="w-full rounded border border-zinc-300 bg-white p-2 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
                    placeholder="Es. 30000"
                />
            </div>

            <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/40">
                <p className="text-lg text-zinc-800 dark:text-zinc-100">
                    Netto annuo:{" "}
                    <strong className="text-blue-700 dark:text-blue-300">
                        {formatEuro(nettoAnnuale)} €
                    </strong>
                </p>

                <p className="text-lg text-zinc-800 dark:text-zinc-100">
                    Netto mensile:{" "}
                    <strong className="text-blue-700 dark:text-blue-300">
                        {formatEuro(nettoMensile)} €
                    </strong>
                </p>
            </div>
        </ToolLayout>
    );
}
