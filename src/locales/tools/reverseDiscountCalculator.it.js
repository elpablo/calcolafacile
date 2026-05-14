const reverseDiscountCalculatorIt = {
    lang: "it",
    locale: "it-IT",
    currency: "EUR",
    currencyAffix: { suffix: "€" },
    title: "Calcolo sconto inverso online",
    currentPath: "/it/calcolo-sconto-inverso",
    description:
        "Questo calcolatore ti permette di trovare il prezzo originale partendo dal prezzo già scontato e dalla percentuale di sconto applicata.",
    contextualTools: [],
    examples: [
        {
            title: "Trovare il prezzo originale durante i saldi",
            description:
                "Se un prodotto costa 70 € dopo uno sconto del 30%, inserisci prezzo scontato e percentuale per risalire al prezzo iniziale.",
        },
        {
            title: "Verificare se lo sconto dichiarato è corretto",
            description:
                "Usa il calcolo inverso per controllare se il prezzo originale mostrato dal negozio è coerente con lo sconto applicato.",
        },
        {
            title: "Calcolare risparmio e prezzo di partenza",
            description:
                "Il tool mostra sia il prezzo originale sia il risparmio ottenuto, utile per confrontare offerte e promozioni.",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Come si calcola lo sconto inverso?</h3>
            <p>
                Dividi il prezzo scontato per 1 meno la percentuale di sconto divisa per 100.
            </p>

            <h3 className="mt-2 font-semibold">A cosa serve il calcolo dello sconto inverso?</h3>
            <p>
                Serve per risalire al prezzo iniziale quando conosci il prezzo finale e lo sconto
                applicato.
            </p>
        </>
    ),
    sample: {
        discountedPrice: "70",
        discount: "30",
    },
    labels: {
        discountedPriceLabel: "Prezzo scontato (€)",
        discountedPricePlaceholder: "Es. 70",
        discountedPriceHelp: "Inserisci il prezzo finale dopo lo sconto",
        discountLabel: "Sconto applicato (%)",
        discountPlaceholder: "Es. 30",
        originalPriceLabel: "Prezzo originale",
        savingsLabel: "Risparmio",
        invalid: "Inserisci un prezzo scontato valido e uno sconto compreso tra 0% e 99,99%.",
        detail: ({ discountedPrice, discount, originalPrice }) =>
            `Con un prezzo scontato di ${discountedPrice} e uno sconto del ${discount}%, il prezzo originale era ${originalPrice}.`,
    },
};

export default reverseDiscountCalculatorIt;
