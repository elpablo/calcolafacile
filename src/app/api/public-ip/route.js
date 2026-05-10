

import { geolocation, ipAddress } from "@vercel/functions";
import { NextResponse } from "next/server";

function getHeader(request, name) {
    return request.headers.get(name) || null;
}

function getForwardedIp(request) {
    const forwardedFor = getHeader(request, "x-forwarded-for");

    if (!forwardedFor) {
        return null;
    }

    return forwardedFor.split(",")[0]?.trim() || null;
}

function getClientIp(request) {
    return (
        ipAddress(request) ||
        getForwardedIp(request) ||
        getHeader(request, "x-real-ip") ||
        null
    );
}

export async function GET(request) {
    const geo = geolocation(request);
    const ip = getClientIp(request);

    const payload = {
        ip,
        network: {
            forwardedFor: getHeader(request, "x-forwarded-for"),
            realIp: getHeader(request, "x-real-ip"),
        },
        location: {
            country: geo?.country || getHeader(request, "x-vercel-ip-country"),
            countryRegion:
                geo?.countryRegion || getHeader(request, "x-vercel-ip-country-region"),
            city: geo?.city || getHeader(request, "x-vercel-ip-city"),
            latitude: geo?.latitude || getHeader(request, "x-vercel-ip-latitude"),
            longitude: geo?.longitude || getHeader(request, "x-vercel-ip-longitude"),
            timezone: geo?.timezone || getHeader(request, "x-vercel-ip-timezone"),
            postalCode: geo?.postalCode || getHeader(request, "x-vercel-ip-postal-code"),
        },
        source: "vercel",
        note:
            "IP geolocation is approximate and may refer to an ISP, VPN exit node, proxy or datacenter, not an exact physical address.",
    };

    return NextResponse.json(payload, {
        headers: {
            "Cache-Control": "no-store, max-age=0",
        },
    });
}