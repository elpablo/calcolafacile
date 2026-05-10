

function canUseBrowserStorage() {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

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