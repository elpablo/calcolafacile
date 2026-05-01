"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function ReverseDiscountCalculator() {
    const [prezzoScontato, setPrezzoScontato] = useState(70);
    const [sconto, setSconto] = useState(30);

    const prezzoNumber = parseFloat(prezzoScontato);
    const scontoNumber = parseFloat(sconto);

    const isValid =
        !isNaN(prezzoNumber) &&
        !isNaN(scontoNumber) &&
        scontoNumber >= 0 &&
        scontoNumber < 100;

    const prezzoOriginale = isValid
        ? prezzoNumber / (1 - scontoNumber / 100)
        : 0;

    const risparmio = isValid ? prezzoOriginale - prezzoNumber : 0;

    const formatEuro = (value) =>
        value.toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <ToolLayout
            title="Calcolo sconto inverso online"
            currentPath="/it/calcolo-sconto-inverso"
            description="Questo calcolatore ti permette di trovare il prezzo originale partendo dal prezzo già scontato e dalla percentuale di sconto applicata."
            faq={
                <>
                    <h3 className="font-semibold">
                        Come si calcola lo sconto inverso?
                    </h3>
                    <p>
                        Dividi il prezzo scontato per 1 meno la percentuale di
                        sconto divisa per 100.
                    </p>

                    <h3 className="mt-2 font-semibold">
                        A cosa serve il calcolo dello sconto inverso?
                    </h3>
                    <p>
                        Serve per risalire al prezzo iniziale quando conosci il
                        prezzo finale e lo sconto applicato.
                    </p>
                </>
            }
        >
            <div className="mb-4">
                <label className="mb-1 block">Prezzo scontato</label>
                <input
                    type="number"
                    step="0.01"
                    value={prezzoScontato}
                    onChange={(e) => setPrezzoScontato(e.target.value)}
                    className="w-full rounded border p-2"
                    placeholder="Es. 70"
                />
            </div>

            <div className="mb-4">
                <label className="mb-1 block">Sconto applicato (%)</label>
                <input
                    type="number"
                    step="0.01"
                    value={sconto}
                    onChange={(e) => setSconto(e.target.value)}
                    className="w-full rounded border p-2"
                    placeholder="Es. 30"
                />
            </div>

            <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/40">
                <p className="text-lg">
                    Prezzo originale:{" "}
                    <strong className="text-blue-700 dark:text-blue-300">
                        {formatEuro(prezzoOriginale)} €
                    </strong>
                </p>
                <p className="text-lg">
                    Risparmio:{" "}
                    <strong className="text-blue-700 dark:text-blue-300">
                        {formatEuro(risparmio)} €
                    </strong>
                </p>
            </div>
        </ToolLayout>
    );
}
