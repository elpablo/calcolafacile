"use client";

import { useState } from "react";
import ToolLayout, { ToolInput, ResultBox } from "@/components/ToolLayout";

export default function ReverseDiscountCalculator() {
    const [prezzoScontato, setPrezzoScontato] = useState(70);
    const [sconto, setSconto] = useState(30);

    const prezzoNumber = parseFloat(prezzoScontato);
    const scontoNumber = parseFloat(sconto);

    const isValid =
        !isNaN(prezzoNumber) &&
        !isNaN(scontoNumber) &&
        prezzoNumber >= 0 &&
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
            <ToolInput
                label="Prezzo scontato"
                value={prezzoScontato}
                onChange={(e) => setPrezzoScontato(e.target.value)}
                suffix="€"
                placeholder="Es. 70"
                helpText="Inserisci il prezzo finale dopo lo sconto"
            />

            <ToolInput
                label="Sconto applicato"
                value={sconto}
                onChange={(e) => setSconto(e.target.value)}
                suffix="%"
                placeholder="Es. 30"
            />

            <ResultBox copyText={isValid ? `${formatEuro(prezzoOriginale)} €` : ""}>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Prezzo originale</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                    {formatEuro(prezzoOriginale)} €
                </p>

                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Risparmio</p>
                <p className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                    {formatEuro(risparmio)} €
                </p>

                {!isValid ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Inserisci un prezzo scontato valido e uno sconto compreso tra 0% e 99,99%.
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Con un prezzo scontato di {formatEuro(prezzoNumber)} € e uno sconto del {scontoNumber.toLocaleString("it-IT")}%, il prezzo originale era {formatEuro(prezzoOriginale)} €.
                    </p>
                )}
            </ResultBox>
        </ToolLayout>
    );
}
