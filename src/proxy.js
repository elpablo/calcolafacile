import { NextResponse } from "next/server";

/**
 * Forwards the incoming request pathname as the `x-pathname` request header
 * so server components (notably the root layout) can read it via
 * `headers()` and derive the active locale for `<html lang>`.
 */
export function proxy(request) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", request.nextUrl.pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        // Run on all paths except Next.js internals and static assets.
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|xml|txt|json|webmanifest)$).*)",
    ],
};
