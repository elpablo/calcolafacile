

const publicIpCheckerEn = {
    lang: "en",
    locale: "en-US",
    title: "Public IP Checker",
    currentPath: "/en/public-ip-checker",
    description:
        "Check your public IP address, approximate location, timezone and network forwarding information directly from your browser. Useful for VPN checks, remote work, network debugging and privacy verification.",
    examples: [
        {
            title: "Check if your VPN is active",
            description:
                "Turn your VPN on, refresh the result and verify whether the public IP, country and city match the selected VPN exit location.",
        },
        {
            title: "Compare Wi-Fi and mobile network IPs",
            description:
                "Open the tool from different networks to see how your public IP and approximate geolocation change between home Wi-Fi, mobile data or a hotspot.",
        },
        {
            title: "Debug remote access and network routing",
            description:
                "Use the detected IP and forwarding headers when checking remote access, tunnels, proxies, firewalls or DNS-related issues.",
        },
    ],
    faq: (
        <>
            <h3 className="mt-4 font-semibold">Is the location exact?</h3>
            <p>
                No. IP geolocation is approximate and may refer to your ISP, VPN exit node,
                proxy or datacenter. It should not be interpreted as an exact physical address.
            </p>

            <h3 className="mt-4 font-semibold">Why does the location change when I use a VPN?</h3>
            <p>
                When a VPN is active, websites usually see the VPN exit node IP instead of
                your original connection. The displayed location should therefore match the
                VPN server area, not necessarily your real location.
            </p>

            <h3 className="mt-4 font-semibold">Is my IP stored by this tool?</h3>
            <p>
                The tool requests your public IP information from an internal CalcolaFacile API
                route and does not use localStorage for this data. Server and infrastructure logs
                may still contain technical request information as described in the Privacy Policy.
            </p>
        </>
    ),
    labels: {
        publicIp: "Public IP address",
        loading: "Loading...",
        refresh: "Refresh",
        copyIp: "Copy IP",
        copied: "Copied",
        notAvailable: "Not available",
        location: "Approximate location",
        timezone: "Timezone",
        coordinates: "Coordinates",
        postalCode: "Postal code",
        forwardedFor: "Forwarded for",
        realIp: "Real IP header",
        aboutThisResult: "About this result",
        approximationNote:
            "IP geolocation is approximate and may refer to an ISP, VPN exit node, proxy or datacenter, not an exact physical address.",
        vpnNote:
            "If you are using a VPN, this information usually describes the VPN exit node seen by websites, not your original network.",
        errors: {
            loadFailed:
                "Unable to load your public IP information. Please refresh the page or try again later.",
        },
    },
    contextualTools: [
        {
            href: "/en/url-encoder-decoder",
            title: "URL Encoder/Decoder",
            description:
                "Encode or decode URLs, query strings and redirect parameters.",
        },
        {
            href: "/en/base64-tool",
            title: "Base64 Encoder/Decoder",
            description:
                "Encode or decode payloads, tokens and technical strings.",
        },
        {
            href: "/en/jwt-decoder",
            title: "JWT Decoder and Inspector",
            description:
                "Inspect JWT payloads, expiration claims and authentication data.",
        },
    ],
};

export default publicIpCheckerEn;