"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

export default function SalaryCalculator() {
    const [ral, setRal] = useState(30000);

    const ralNumber = parseFloat(ral);
    const isValid = !isNaN(ralNumber) && ralNumber > 0;

    const nettoAnnuale = isValid ? ralNumber * 0.7 : 0;

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
            <ToolInput
                label="RAL (lordo annuo)"
                value={ral}
                onChange={(e) => setRal(e.target.value)}
                suffix="€"
                placeholder="Es. 30000"
                helpText="Inserisci la retribuzione annua lorda"
            />

            <ResultBox copyText={isValid ? `${formatEuro(nettoMensile)} € al mese` : ""}>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Netto mensile stimato</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatEuro(nettoMensile)} €
                </p>

                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Netto annuo stimato</p>
                <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                    {formatEuro(nettoAnnuale)} €
                </p>

                {!isValid ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Inserisci una RAL valida maggiore di 0.
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Con una RAL di {formatEuro(ralNumber)} €, il netto stimato è di {formatEuro(nettoMensile)} € al mese.
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}
