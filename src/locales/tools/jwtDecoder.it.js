const jwtDecoderIt = {
    lang: "it",
    locale: "it-IT",
    title: "JWT Decoder Online - Decodifica JSON Web Token",
    currentPath: "/it/jwt-decoder",
    description:
        "Decodifica un JSON Web Token direttamente nel browser. Incolla un JWT per ispezionare header, payload, claims, scadenza e signature senza inviare il token a server esterni.",
    contextualTools: (tokenEstimatorHref) => [
        {
            href: tokenEstimatorHref,
            title: "Stima token e costo del payload",
            description:
                "per stimare dimensione e costo del payload prima di usarlo in un prompt AI o in un flusso LLM.",
        },
        {
            href: "/it/timestamp-converter",
            title: "Converti Unix timestamp",
            description: "per trasformare i claim exp, iat e nbf in date leggibili.",
        },
        {
            href: "/it/base64-tool",
            title: "Codifica e decodifica Base64",
            description: "per ispezionare payload codificati e stringhe collegate ai token.",
        },
    ],
    examples: [
        {
            title: "Decodifica un JWT restituito da una API di login",
            description:
                "Incolla l'access token o il refresh token restituito da un endpoint di autenticazione per ispezionare claim come sub, name, email, ruoli e permessi.",
            href: "/it/jwt-decoder?example=validToken",
        },
        {
            title: "Controlla la scadenza di un JWT",
            description:
                "Usa i campi exp, iat e nbf per capire quando un token è stato emesso, quando diventa valido e quando scade.",
            href: "/it/jwt-decoder?example=expiredToken",
        },
        {
            title: "Ispeziona il payload prima del debug o dei test",
            description:
                "Copia header e payload decodificati quando devi fare debug di autenticazione API, problemi di autorizzazione, flussi OAuth o fixture di test.",
            href: "/it/jwt-decoder?example=customClaimsToken",
        },
    ],
    faq: (
        <>
            <h3 className="font-semibold">Questo JWT decoder verifica la signature?</h3>
            <p>
                No. Questo strumento decodifica header e payload per permetterti di ispezionare il contenuto del token, ma non valida né verifica la signature del JWT.
            </p>

            <h3 className="mt-2 font-semibold">Il JWT viene inviato a un server?</h3>
            <p>
                No. La decodifica avviene localmente nel browser, quindi il token non viene inviato a server esterni.
            </p>

            <h3 className="mt-2 font-semibold">Quali campi JWT posso ispezionare?</h3>
            <p>
                Puoi ispezionare claim standard e personalizzati come sub, iss, aud, exp, iat, nbf, ruoli, permessi e qualunque altro campo incluso nel payload.
            </p>
        </>
    ),
    sampleToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmlvIFJvc3NpIiwiaWF0IjoxNzE0NTYwMDAwLCJleHAiOjQxMDI0NDQ4MDB9.signature",
    labels: {
        inputLabel: "Token JWT",
        placeholder: "Incolla qui il tuo JWT...",
        helperText:
            "La decodifica avviene localmente nel browser. Evita di incollare token reali di produzione se non ti fidi completamente del contesto.",
        useSample: "Usa esempio",
        clear: "Cancella",
        noSignature: "Nessuna signature presente",
        tokenEstimatorHref: "/it/token-estimator",
        errors: {
            missingParts:
                "Il token deve contenere almeno header e payload separati da un punto.",
            invalidToken: "Token JWT non valido.",
        },
        sections: {
            mainDates: "Date principali",
            header: "Header",
            payload: "Payload",
            signature: "Signature",
        },
        times: {
            exp: "Scadenza",
            iat: "Emesso il",
            nbf: "Valido da",
        },
        status: {
            valid: "Token valido",
            expired: "Token scaduto",
            unknown: "Scadenza sconosciuta",
            noExpiration:
                "Questo token non contiene il claim exp, quindi non è possibile determinare la scadenza.",
            expiredDescription:
                "Questo token risulta scaduto in base al claim exp.",
            expiresInMinutes: (minutes) =>
                `Questo token scade tra circa ${minutes} minut${minutes === 1 ? "o" : "i"}.`,
            expiresInHours: (hours) =>
                `Questo token scade tra circa ${hours} or${hours === 1 ? "a" : "e"}.`,
            expiresInDays: (days) =>
                `Questo token scade tra circa ${days} giorn${days === 1 ? "o" : "i"}.`,
        },
    },
};

export default jwtDecoderIt;
