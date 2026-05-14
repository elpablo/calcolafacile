

import { geolocation, ipAddress } from "@vercel/functions";
import { NextResponse } from "next/server";

/**
 * @file `/api/public-ip` — returns the caller's public IP and approximate
 * geolocation. Used by the "Public IP Checker" tool.
 *
 * Implementation notes:
 *   - Resolution order for the IP: `@vercel/functions` helper →
 *     `x-forwarded-for` (first hop) → `x-real-ip`.
 *   - Geolocation is best-effort and may point at the user's ISP / VPN exit
 *     node / datacentre rather than their physical location.
 *   - Response is uncacheable (`Cache-Control: no-store`) because each visit
 *     produces a user-specific payload.
 *   - In-memory token-bucket rate limit (30 req/min/IP). Acceptable for
 *     current traffic levels; migrate to Upstash / Vercel KV if the API
 *     scales beyond a single instance. TODO.
 */

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
/** @type {Map<string, { count: number, resetAt: number }>} */
const rateLimitStore = new Map();

/**
 * Returns `true` and consumes a token when the request is allowed.
 * Returns `false` when the client has exceeded the per-window allowance.
 */
function checkRateLimit(key) {
    const now = Date.now();
    const bucket = rateLimitStore.get(key);

    if (!bucket || bucket.resetAt <= now) {
        rateLimitStore.set(key, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW_MS,
        });

        // Opportunistic GC: clear stale buckets to avoid unbounded growth.
        if (rateLimitStore.size > 5_000) {
            for (const [k, v] of rateLimitStore) {
                if (v.resetAt <= now) rateLimitStore.delete(k);
            }
        }

        return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    }

    if (bucket.count >= RATE_LIMIT_MAX) {
        return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
    }

    bucket.count += 1;
    return {
        allowed: true,
        remaining: RATE_LIMIT_MAX - bucket.count,
        resetAt: bucket.resetAt,
    };
}

/**
 * Returns a request header value, or `null` when absent.
 * @param {Request} request
 * @param {string} name
 * @returns {string | null}
 */
function getHeader(request, name) {
    return request.headers.get(name) || null;
}

/**
 * Extracts the leftmost (original client) IP from `X-Forwarded-For`.
 * @param {Request} request
 * @returns {string | null}
 */
function getForwardedIp(request) {
    const forwardedFor = getHeader(request, "x-forwarded-for");

    if (!forwardedFor) {
        return null;
    }

    return forwardedFor.split(",")[0]?.trim() || null;
}

/**
 * Resolves the caller's IP using the most reliable signal available.
 * @param {Request} request
 * @returns {string | null}
 */
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

    const rateLimitKey = ip || "anonymous";
    const rate = checkRateLimit(rateLimitKey);
    if (!rate.allowed) {
        return NextResponse.json(
            { error: "Too many requests. Please try again shortly." },
            {
                status: 429,
                headers: {
                    "Cache-Control": "no-store, max-age=0",
                    "Retry-After": String(
                        Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))
                    ),
                    "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
                },
            }
        );
    }

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
            "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
            "X-RateLimit-Remaining": String(rate.remaining),
            "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
        },
    });
}