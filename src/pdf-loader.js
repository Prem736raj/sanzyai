let pending;

// Share one dynamic import, and permit a retry when the network fails.
export function loadPdfLibrary() {
    if (!pending) pending = import('jspdf').catch(error => { pending = undefined; throw error; });
    return pending;
}
