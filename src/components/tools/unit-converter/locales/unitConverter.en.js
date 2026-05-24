const unitConverterEn = {
    lang: "en",
    locale: "en-US",
    title: "Unit Converter Online",
    currentPath: "/en/unit-converter",
    description:
        "Convert length, mass, temperature, volume, area, speed, pressure, energy and flow rate quickly. Choose a category, select units and get instant results directly in your browser.",
    examples: [
        {
            title: "Convert centimeters to inches",
            description:
                "Select Length, choose centimeters as the input unit and inches as the output unit to convert measurements for screens, objects or product dimensions.",
            href: "/en/cm-to-inches",
        },
        {
            title: "Convert ounces to grams",
            description:
                "Use the Mass category to convert ounces, pounds, grams and kilograms when working with recipes, shipping weights or product data.",
            href: "/en/oz-to-g",
        },
        {
            title: "Convert technical and Oil & Gas units",
            description:
                "Quickly convert bar to psi, bbl to cubic meters, BTU to kWh, and flow rates such as bbl/day, scf/day and MMscf/day.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">What units can I convert?</h3>
            <p>
                You can convert length, mass, temperature, volume, area, speed,
                pressure, energy and flow rate. More categories may be added
                over time.
            </p>

            <h3 className="mt-2 font-semibold">
                Can I convert ounces to grams?
            </h3>
            <p>
                Yes. Select the Mass category, choose ounces as the input unit
                and grams as the output unit.
            </p>

            <h3 className="mt-2 font-semibold">
                Can I convert centimeters to inches?
            </h3>
            <p>
                Yes. Select the Length category, choose centimeters as the input
                unit and inches as the output unit.
            </p>
        </>
    ),
    labels: {
        category: "Category",
        value: "Value",
        valuePlaceholder: "Ex. 10",
        valueHelper: "Enter the value to convert",
        from: "From",
        to: "To",
        swapUnits: "Swap units",
        result: "Result",
        searchUnitPlaceholder: "Search unit...",
        searchFromUnit: "Search source unit",
        searchToUnit: "Search target unit",
        noUnitsFound: "No units found",
        quickConversionsTitle: "Quick conversions",
        errors: {
            invalidNumber: "Enter a valid numeric value.",
        },
        categories: {
            length: "Length",
            mass: "Mass",
            temperature: "Temperature",
            volume: "Volume",
            area: "Area",
            speed: "Speed",
            pressure: "Pressure",
            energy: "Energy",
            flow: "Flow rate",
        },
        units: {
            length: {
                mm: "Millimeters (mm)",
                cm: "Centimeters (cm)",
                m: "Meters (m)",
                km: "Kilometers (km)",
                in: "Inches (in)",
                ft: "Feet (ft)",
                yd: "Yards (yd)",
                mi: "Miles (mi)",
                nmi: "Nautical miles (nmi)",
            },
            mass: {
                mg: "Milligrams (mg)",
                g: "Grams (g)",
                kg: "Kilograms (kg)",
                t: "Tonnes (t)",
                oz: "Ounces (oz)",
                lb: "Pounds (lb)",
                st: "Stone (st)",
            },
            temperature: {
                C: "Celsius (°C)",
                F: "Fahrenheit (°F)",
                K: "Kelvin (K)",
            },
            volume: {
                mL: "Milliliters (mL)",
                L: "Liters (L)",
                tsp: "US Teaspoons (tsp)",
                tbsp: "US Tablespoons (tbsp)",
                cup: "US Cups",
                floz: "US Fluid Ounces",
                pt: "US Pints (pt)",
                qt: "US Quarts (qt)",
                gal: "US Gallons",
                m3: "Cubic meters (m³)",
                bbl: "Oil barrels - 42 US gallons (bbl)",
                scf: "Standard cubic feet (scf)",
                Mscf: "Thousand standard cubic feet (Mscf)",
                MMscf: "Million standard cubic feet (MMscf)",
            },
            area: {
                mm2: "Square millimeters (mm²)",
                cm2: "Square centimeters (cm²)",
                m2: "Square meters (m²)",
                km2: "Square kilometers (km²)",
                ha: "Hectares (ha)",
                in2: "Square inches (in²)",
                ft2: "Square feet (ft²)",
                yd2: "Square yards (yd²)",
                acre: "Acres (acre)",
            },
            speed: {
                mps: "Meters per second (m/s)",
                kmh: "Kilometers per hour (km/h)",
                mph: "Miles per hour (mph)",
                kt: "Knots (kn)",
                fps: "Feet per second (ft/s)",
            },
            pressure: {
                Pa: "Pascal (Pa)",
                kPa: "Kilopascal (kPa)",
                MPa: "Megapascal (MPa)",
                bar: "Bar (bar)",
                atm: "Atmospheres (atm)",
                psi: "Pounds per square inch (psi)",
                mmHg: "Millimeters of mercury (mmHg)",
                Torr: "Torr",
            },
            energy: {
                J: "Joules (J)",
                kJ: "Kilojoules (kJ)",
                MJ: "Megajoules (MJ)",
                GJ: "Gigajoules (GJ)",
                Wh: "Watt-hours (Wh)",
                kWh: "Kilowatt-hours (kWh)",
                BTU: "British thermal units (BTU)",
                MMBtu: "Million British thermal units (MMBtu)",
            },
            flow: {
                Lmin: "Liters per minute (L/min)",
                Ls: "Liters per second (L/s)",
                m3h: "Cubic meters per hour (m³/h)",
                m3d: "Cubic meters per day (m³/day)",
                bpd: "Barrels per day (bbl/day)",
                scfd: "Standard cubic feet per day (scf/day)",
                Mscfd: "Thousand standard cubic feet per day (Mscf/day)",
                MMscfd: "Million standard cubic feet per day (MMscf/day)",
            },
        },
    },
};

export default unitConverterEn;
