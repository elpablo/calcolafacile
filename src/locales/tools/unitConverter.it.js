const unitConverterIt = {
    lang: "it",
    locale: "it-IT",
    title: "Convertitore unità di misura online",
    currentPath: "/it/convertitore-unita",
    description:
        "Converti rapidamente lunghezza, massa, temperatura, volume, area, velocità, pressione, energia e portata. Scegli una categoria, seleziona le unità e ottieni subito il risultato direttamente nel browser.",
    examples: [
        {
            title: "Convertire centimetri in pollici",
            description:
                "Seleziona Lunghezza, scegli centimetri come unità di partenza e pollici come unità di destinazione per convertire misure di schermi, oggetti o dimensioni prodotto.",
        },
        {
            title: "Convertire once in grammi",
            description:
                "Usa la categoria Massa per convertire once, libbre, grammi e chilogrammi quando lavori con ricette, pesi di spedizione o dati prodotto.",
        },
        {
            title: "Convertire unità tecniche e Oil & Gas",
            description:
                "Converti rapidamente bar in psi, bbl in metri cubi, BTU in kWh e portate come bbl/giorno, scf/giorno e MMscf/giorno.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Quali unità posso convertire?</h3>
            <p>
                Puoi convertire unità di lunghezza, massa, temperatura, volume, area, velocità, pressione, energia e portata. Altre categorie potranno essere aggiunte nel tempo.
            </p>

            <h3 className="mt-2 font-semibold">Posso convertire once in grammi?</h3>
            <p>
                Sì. Seleziona la categoria Massa, scegli once come unità di partenza e grammi come unità di destinazione.
            </p>

            <h3 className="mt-2 font-semibold">Posso convertire centimetri in pollici?</h3>
            <p>
                Sì. Seleziona la categoria Lunghezza, scegli centimetri come unità di partenza e pollici come unità di destinazione.
            </p>
        </>
    ),
    labels: {
        category: "Categoria",
        value: "Valore",
        valuePlaceholder: "Es. 10",
        valueHelper: "Inserisci il valore da convertire",
        from: "Da",
        to: "A",
        swapUnits: "Inverti unità",
        result: "Risultato",
        errors: {
            invalidNumber: "Inserisci un valore numerico valido.",
        },
        categories: {
            length: "Lunghezza",
            mass: "Massa",
            temperature: "Temperatura",
            volume: "Volume",
            area: "Area",
            speed: "Velocità",
            pressure: "Pressione",
            energy: "Energia",
            flow: "Portata",
        },
        units: {
            length: {
                mm: "Millimetri (mm)",
                cm: "Centimetri (cm)",
                m: "Metri (m)",
                km: "Chilometri (km)",
                in: "Pollici (in)",
                ft: "Piedi (ft)",
                yd: "Iarde (yd)",
                mi: "Miglia (mi)",
                nmi: "Miglia nautiche (nmi)",
            },
            mass: {
                mg: "Milligrammi (mg)",
                g: "Grammi (g)",
                kg: "Chilogrammi (kg)",
                t: "Tonnellate (t)",
                oz: "Once (oz)",
                lb: "Libbre (lb)",
                st: "Stone (st)",
            },
            temperature: {
                C: "Celsius (°C)",
                F: "Fahrenheit (°F)",
                K: "Kelvin (K)",
            },
            volume: {
                mL: "Millilitri (mL)",
                L: "Litri (L)",
                tsp: "Cucchiaini USA (tsp)",
                tbsp: "Cucchiai USA (tbsp)",
                cup: "Cup USA",
                floz: "Once fluide USA",
                pt: "Pinte USA (pt)",
                qt: "Quarti USA (qt)",
                gal: "Galloni USA",
                m3: "Metri cubi (m³)",
                bbl: "Barili di petrolio (bbl)",
                scf: "Piedi cubi standard (scf)",
                Mscf: "Migliaia di piedi cubi standard (Mscf)",
                MMscf: "Milioni di piedi cubi standard (MMscf)",
            },
            area: {
                mm2: "Millimetri quadrati (mm²)",
                cm2: "Centimetri quadrati (cm²)",
                m2: "Metri quadrati (m²)",
                km2: "Chilometri quadrati (km²)",
                ha: "Ettari (ha)",
                in2: "Pollici quadrati (in²)",
                ft2: "Piedi quadrati (ft²)",
                yd2: "Iarde quadrate (yd²)",
                acre: "Acri (acre)",
            },
            speed: {
                mps: "Metri al secondo (m/s)",
                kmh: "Chilometri orari (km/h)",
                mph: "Miglia orarie (mph)",
                kt: "Nodi (kn)",
                fps: "Piedi al secondo (ft/s)",
            },
            pressure: {
                Pa: "Pascal (Pa)",
                kPa: "Kilopascal (kPa)",
                MPa: "Megapascal (MPa)",
                bar: "Bar (bar)",
                atm: "Atmosfere (atm)",
                psi: "Libbre per pollice quadrato (psi)",
                mmHg: "Millimetri di mercurio (mmHg)",
                Torr: "Torr",
            },
            energy: {
                J: "Joule (J)",
                kJ: "Kilojoule (kJ)",
                MJ: "Megajoule (MJ)",
                GJ: "Gigajoule (GJ)",
                Wh: "Wattora (Wh)",
                kWh: "Kilowattora (kWh)",
                BTU: "British thermal unit (BTU)",
                MMBtu: "Milioni di British thermal unit (MMBtu)",
            },
            flow: {
                Lmin: "Litri al minuto (L/min)",
                Ls: "Litri al secondo (L/s)",
                m3h: "Metri cubi all'ora (m³/h)",
                m3d: "Metri cubi al giorno (m³/giorno)",
                bpd: "Barili al giorno (bbl/giorno)",
                scfd: "Piedi cubi standard al giorno (scf/giorno)",
                Mscfd: "Migliaia di piedi cubi standard al giorno (Mscf/giorno)",
                MMscfd: "Milioni di piedi cubi standard al giorno (MMscf/giorno)",
            },
        },
    },
};

export default unitConverterIt;
