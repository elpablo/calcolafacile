import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const isDev = process.env.NODE_ENV !== "production";

// React/Next.js dev mode uses eval() for HMR and stack-frame reconstruction,
// so `'unsafe-eval'` is only allowed in development. Dev also opens a WS
// connection for HMR which needs to be in connect-src.
const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    isDev ? "'unsafe-eval'" : null,
    "https://va.vercel-scripts.com",
]
    .filter(Boolean)
    .join(" ");

const connectSrc = [
    "'self'",
    "https://vitals.vercel-insights.com",
    "https://va.vercel-scripts.com",
    isDev ? "ws:" : null,
    isDev ? "http://localhost:*" : null,
]
    .filter(Boolean)
    .join(" ");

const securityHeaders = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "DENY" },
    {
        key: "Permissions-Policy",
        value: "geolocation=(), camera=(), microphone=(), payment=(), usb=()",
    },
    {
        // CSP allows the inline theme-init script (no nonce yet — TODO),
        // Geist fonts from Google, Vercel Analytics + Speed Insights and
        // the site's own `/api/public-ip` endpoint.
        key: "Content-Security-Policy",
        value: [
            "default-src 'self'",
            `script-src ${scriptSrc}`,
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data: blob:",
            `connect-src ${connectSrc}`,
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ].join("; "),
    },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
        ];
    },
};

export default withBundleAnalyzer(nextConfig);
