"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

export default function CalcolatoreIVA() {
    const [importo, setImporto] = useState("");
    const [aliquota, setAliquota] = useState(22);
    const [tipo, setTipo] = useState("aggiungi");

    const calcola = () => {
        const value = parseFloat(importo);
        if (isNaN(value) || value < 0) return { netto: 0, iva: 0, lordo: 0 };

        if (tipo === "aggiungi") {
            const iva = value * (aliquota / 100);
            return {
                netto: value,
                iva,
                lordo: value + iva,
            };
        }

        const netto = value / (1 + aliquota / 100);
        const iva = value - netto;
        return {
            netto,
            iva,
            lordo: value,
        };
    };

    const result = calcola();

    const formatEuro = (value) =>
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
        title="Calcolatore IVA online (scorporo e aggiunta)"
        currentPath="/it/calcolatore-iva"
        description="Questo calcolatore IVA ti permette di calcolare facilmente l'IVA al 22%, 10% e 4% in Italia, sia per aggiungere l'imposta a un importo netto, sia per scorporarla da un totale lordo."
        faq={
          <>
            <h3 className="font-semibold">Come si calcola l&apos;IVA al 22%?</h3>
            <p>
              Basta moltiplicare l&apos;importo per 0.22 e sommarlo al totale.
            </p>

            <h3 className="font-semibold mt-2">Come si scorpora l&apos;IVA?</h3>
            <p>
              Dividi il totale per 1.22 (nel caso di IVA al 22%).
            </p>
          </>
        }
      >
        <ToolInput
          label="Importo"
          value={importo}
          onChange={(e) => setImporto(e.target.value)}
          suffix="€"
          placeholder="Es. 100"
          helpText="Inserisci l'importo su cui calcolare l'IVA"
        />

        <div className="mb-4">
          <label className={labelClass}>Aliquota IVA</label>
          <select
            value={aliquota}
            onChange={(e) => setAliquota(Number(e.target.value))}
            className={selectClass}
          >
            <option value={22}>22%</option>
            <option value={10}>10%</option>
            <option value={4}>4%</option>
          </select>
        </div>

        <div className="mb-4">
          <label className={labelClass}>Tipo calcolo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className={selectClass}
          >
            <option value="aggiungi">Aggiungi IVA</option>
            <option value="scorpora">Scorpora IVA</option>
          </select>
        </div>

        <ResultBox>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Totale</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
            {formatEuro(result.lordo)} €
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Netto</p>
              <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                {formatEuro(result.netto)} €
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">IVA</p>
              <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                {formatEuro(result.iva)} €
              </p>
            </div>
          </div>

          {parseFloat(importo) < 0 && (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Inserisci un importo valido maggiore o uguale a 0.
            </p>
          )}
        </ResultBox>
      </ToolLayout>
    );
}
