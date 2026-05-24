import { localizeAngleConverterExamples } from "../angleConverterExamples";

const angleConverterEn = {
    lang: "en",
    locale: "en-US",
    currentPath: "/en/angle-converter",
    toolKey: "angleConverter",
    metadata: {
        title: "Angle Converter",
        description:
            "Convert degrees, radians, gradians and turns with a visual angle preview on a circle.",
        intro:
            "Enter an angle and choose the source unit. The converter shows equivalent values and a visual preview on the unit circle.",
    },
    description:
        "Convert angles between degrees, radians, gradians and turns. Use the visual preview to understand where the angle sits on the circle.",
    sample: {
        value: 45,
        unit: "degrees",
    },
    labels: {
        valueLabel: "Angle value",
        valuePlaceholder: "Ex. 45",
        unitLabel: "Input unit",
        units: {
            degrees: "Degrees (°)",
            radians: "Radians (rad)",
            gradians: "Gradians (gon)",
            turns: "Turns",
        },
        degreesLabel: "Degrees",
        radiansLabel: "Radians",
        gradiansLabel: "Gradians",
        turnsLabel: "Turns",
        preview: {
            previewTitle: "Angle preview",
            previewDescription: "Visual position of the normalized angle on a circle.",
            previewAriaLabel: "Visual preview of the converted angle on a circle",
            quadrant1: "Quadrant I",
            quadrant2: "Quadrant II",
            quadrant3: "Quadrant III",
            quadrant4: "Quadrant IV",
            axisPositiveX: "Positive X axis",
            axisPositiveY: "Positive Y axis",
            axisNegativeX: "Negative X axis",
            axisNegativeY: "Negative Y axis",
        },
    },
    examples: localizeAngleConverterExamples("en", "/en/angle-converter"),
    contextualTools: [],
    faq: (
        <>
            <h3 className="mt-4 font-semibold">How do I convert degrees to radians?</h3>
            <p>
                Multiply degrees by π and divide by 180. For example, 45° equals
                π/4 radians, about 0.785398.
            </p>

            <h3 className="mt-4 font-semibold">What is a turn?</h3>
            <p>
                A turn represents a full rotation. 1 turn equals 360 degrees,
                2π radians and 400 gradians.
            </p>

            <h3 className="mt-4 font-semibold">Why is the preview normalized?</h3>
            <p>
                The visual preview maps the angle inside a single 0°–360° circle,
                so values like 450° are displayed at the same position as 90°.
            </p>
        </>
    ),
};

export default angleConverterEn;