const unitConverterEn = {
    lang: "en",
    locale: "en-US",
    title: "Unit Converter Online",
    currentPath: "/en/unit-converter",
    description:
        "Convert length, mass, temperature, volume, area, speed and pressure quickly. Choose a category, select units and get instant results directly in your browser.",
    examples: [
        {
            title: "Convert centimeters to inches",
            description:
                "Select Length, choose centimeters as the input unit and inches as the output unit to convert measurements for screens, objects or product dimensions.",
        },
        {
            title: "Convert ounces to grams",
            description:
                "Use the Mass category to convert ounces, pounds, grams and kilograms when working with recipes, shipping weights or product data.",
        },
        {
            title: "Convert speed and pressure units",
            description:
                "Quickly convert km/h to mph, m/s to km/h, bar to psi and other technical units used in vehicles, sensors and engineering contexts.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">What units can I convert?</h3>
            <p>
                You can convert length, mass, temperature, volume, area, speed and pressure. More categories may be added over time.
            </p>

            <h3 className="mt-2 font-semibold">Can I convert ounces to grams?</h3>
            <p>
                Yes. Select the Mass category, choose ounces as the input unit and grams as the output unit.
            </p>

            <h3 className="mt-2 font-semibold">Can I convert centimeters to inches?</h3>
            <p>
                Yes. Select the Length category, choose centimeters as the input unit and inches as the output unit.
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
        },
    },
};

export default unitConverterEn;
