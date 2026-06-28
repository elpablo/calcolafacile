/**
 * Triggers a browser download of `content` as a local file.
 *
 * @param {string} filename
 * @param {string} content
 * @param {string} [mimeType]
 */
export function downloadFile(filename, content, mimeType = "application/json") {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
}
