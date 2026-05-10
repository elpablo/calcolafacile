

const publicIpCheckerIt = {
    lang: "it",
    locale: "it-IT",
    title: "Verifica IP pubblico",
    currentPath: "/it/verifica-ip-pubblico",
    description:
        "Controlla il tuo IP pubblico, la posizione approssimativa, il fuso orario e le informazioni di rete direttamente dal browser. Utile per verificare VPN, connessioni remote, configurazioni di rete e privacy online.",
    examples: [
        {
            title: "Verifica se la VPN è attiva",
            description:
                "Attiva la VPN, aggiorna il risultato e controlla se IP pubblico, città e paese corrispondono alla posizione del server VPN selezionato.",
        },
        {
            title: "Confronta Wi‑Fi e rete mobile",
            description:
                "Apri il tool da reti differenti per vedere come cambiano IP pubblico e geolocalizzazione approssimativa tra Wi‑Fi, hotspot o rete cellulare.",
        },
        {
            title: "Debug di accessi remoti e routing",
            description:
                "Usa IP e forwarding headers per verificare tunnel, proxy, firewall, DNS o configurazioni di accesso remoto.",
        },
    ],
    faq: (
        <>
            <h3 className="mt-4 font-semibold">
                La posizione mostrata è precisa?
            </h3>
            <p>
                No. La geolocalizzazione IP è approssimativa e può riferirsi al
                tuo ISP, al nodo di uscita della VPN, a un proxy o a un
                datacenter. Non deve essere interpretata come un indirizzo
                fisico esatto.
            </p>

            <h3 className="mt-4 font-semibold">
                Perché la posizione cambia quando uso una VPN?
            </h3>
            <p>
                Quando una VPN è attiva, i siti web vedono normalmente l&apos;IP
                del server VPN invece della tua connessione reale. La posizione
                mostrata corrisponde quindi alla zona del server VPN e non
                necessariamente alla tua posizione reale.
            </p>

            <h3 className="mt-4 font-semibold">Questo tool salva il mio IP?</h3>
            <p>
                Il tool recupera le informazioni sul tuo IP pubblico tramite una
                route API interna di CalcolaFacile e non utilizza localStorage
                per questi dati. I log tecnici del server o
                dell&apos;infrastruttura possono comunque contenere informazioni
                sulla richiesta come descritto nella Privacy Policy.
            </p>
        </>
    ),
    labels: {
        publicIp: "Indirizzo IP pubblico",
        loading: "Caricamento...",
        refresh: "Aggiorna",
        copyIp: "Copia IP",
        copied: "Copiato",
        notAvailable: "Non disponibile",
        location: "Posizione approssimativa",
        timezone: "Fuso orario",
        coordinates: "Coordinate",
        postalCode: "CAP",
        forwardedFor: "Forwarded for",
        realIp: "Header real IP",
        aboutThisResult: "Informazioni sul risultato",
        approximationNote:
            "La geolocalizzazione IP è approssimativa e può riferirsi a ISP, VPN, proxy o datacenter, non a un indirizzo fisico preciso.",
        vpnNote:
            "Se stai usando una VPN, queste informazioni descrivono normalmente il nodo di uscita della VPN visto dai siti web e non la tua rete reale.",
        errors: {
            loadFailed:
                "Impossibile recuperare le informazioni sul tuo IP pubblico. Aggiorna la pagina o riprova più tardi.",
        },
    },
    contextualTools: [
        {
            href: "/it/url-encoder-decoder",
            title: "URL Encoder/Decoder",
            description:
                "Codifica o decodifica URL, query string e parametri di redirect.",
        },
        {
            href: "/it/base64-tool",
            title: "Base64 Encode/Decode",
            description:
                "Codifica o decodifica payload, token e stringhe tecniche.",
        },
        {
            href: "/it/jwt-decoder",
            title: "JWT Decoder",
            description:
                "Analizza payload JWT, expiration claim e dati di autenticazione.",
        },
    ],
};

export default publicIpCheckerIt;