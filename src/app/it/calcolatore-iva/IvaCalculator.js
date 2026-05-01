"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function CalcolatoreIVA() {
    const [importo, setImporto] = useState("");
    const [aliquota, setAliquota] = useState(22);
    const [tipo, setTipo] = useState("aggiungi");

    const calcola = () => {
        const value = parseFloat(importo);
        if (isNaN(value)) return { netto: 0, iva: 0, lordo: 0 };

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
    const fieldClass =
      "w-full rounded border border-zinc-300 bg-white p-2 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400";

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
        <div className="mb-4">
          <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Importo</label>
          <input
            type="number"
            step="0.01"
            value={importo}
            onChange={(e) => setImporto(e.target.value)}
            className={fieldClass}
            placeholder="Inserisci importo (es. 100)"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Aliquota IVA (%)</label>
          <select
            value={aliquota}
            onChange={(e) => setAliquota(Number(e.target.value))}
            className={fieldClass}
          >
            <option value={22}>22%</option>
            <option value={10}>10%</option>
            <option value={4}>4%</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-zinc-700 dark:text-zinc-300">Tipo calcolo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className={fieldClass}
          >
            <option value="aggiungi">Aggiungi IVA</option>
            <option value="scorpora">Scorpora IVA</option>
          </select>
        </div>

        <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/40">
          <p className="text-lg text-zinc-800 dark:text-zinc-100">
            Netto: <strong className="text-blue-700 dark:text-blue-300">
              {result.netto.toLocaleString("it-IT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} €
            </strong>
          </p>
          <p className="text-lg text-zinc-800 dark:text-zinc-100">
            IVA: <strong className="text-blue-700 dark:text-blue-300">
              {result.iva.toLocaleString("it-IT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} €
            </strong>
          </p>
          <p className="text-lg text-zinc-800 dark:text-zinc-100">
            Totale: <strong className="text-blue-700 dark:text-blue-300">
              {result.lordo.toLocaleString("it-IT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} €
            </strong>
          </p>
        </div>
      </ToolLayout>
    );
}
