/**
 * @file Thin, SSR-safe wrapper around `window.localStorage`.
 *
 * All helpers degrade gracefully when:
 *   - running on the server (no `window`),
 *   - storage is disabled (private browsing, quota errors),
 *   - the stored payload is not valid JSON.
 *
 * Keys used across the app follow the convention `calcolafacile:<tool-name>`.
 */

/**
 * Detects whether `window.localStorage` is available in the current runtime.
 * @returns {boolean}
 */
function canUseBrowserStorage() {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/**
 * Reads a JSON-serialised value from localStorage.
 *
 * @template T
 * @param {string} key Storage key.
 * @param {T} [fallback=null] Value returned when storage is unavailable,
 *   the key is missing, or the payload is not valid JSON.
 * @returns {T} The parsed value, or `fallback`.
 */
export function loadLocalState(key, fallback = null) {
    if (!canUseBrowserStorage()) {
        return fallback;
    }

    try {
        const rawValue = window.localStorage.getItem(key);

        if (rawValue === null) {
            return fallback;
        }

        return JSON.parse(rawValue);
    } catch {
        return fallback;
    }
}

/**
 * Serialises `value` as JSON and writes it to localStorage.
 * Silently no-ops on the server and on storage errors (quota, private mode).
 *
 * @param {string} key Storage key.
 * @param {unknown} value Value to persist (must be JSON-serialisable).
 * @returns {void}
 */
export function saveLocalState(key, value) {
    if (!canUseBrowserStorage()) {
        return;
    }

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Ignore storage errors such as quota limits or private browsing restrictions.
    }
}

/**
 * Removes a key from localStorage. No-ops on the server and on errors.
 *
 * @param {string} key Storage key.
 * @returns {void}
 */
export function removeLocalState(key) {
    if (!canUseBrowserStorage()) {
        return;
    }

    try {
        window.localStorage.removeItem(key);
    } catch {
        // Ignore storage errors.
    }
}