const states = new WeakMap();
const openDialogs = [];

function focusable(dialog) {
    return [...dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex]')]
        .filter(element => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length && !element.closest('[inert]'));
}

export function openDialog(dialog, options = {}) {
    if (!dialog || states.has(dialog)) return;
    const state = { trigger: options.trigger || document.activeElement, overflow: options.restoreOverflow ?? document.body.style.overflow,
        className: options.className || 'open', modal: options.modal !== false, onClose: options.onClose, inerted: [] };
    states.set(dialog, state);
    openDialogs.push(dialog);
    dialog.inert = false;
    dialog.classList.add(state.className);
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-hidden', 'false');
    dialog.setAttribute('aria-modal', String(state.modal));
    if (options.label) dialog.setAttribute('aria-label', options.label);
    dialog.tabIndex = -1;
    if (state.modal) {
        document.body.style.overflow = 'hidden';
        // Hide siblings at each ancestor level, including dialogs nested inside main.
        let branch = dialog;
        while (branch.parentElement && branch !== document.body) {
            for (const sibling of branch.parentElement.children) {
                if (sibling === branch || sibling.inert || /^(SCRIPT|STYLE|LINK)$/.test(sibling.tagName)) continue;
                sibling.inert = true; state.inerted.push(sibling);
            }
            branch = branch.parentElement;
        }
    }
    const target = options.focusSelector ? dialog.querySelector(options.focusSelector) : focusable(dialog)[0];
    (target || dialog).focus({ preventScroll: true });
}

export function closeDialog(dialog) {
    const state = states.get(dialog);
    if (!dialog || !state) return;
    dialog.classList.remove(state.className);
    dialog.setAttribute('aria-hidden', 'true');
    dialog.removeAttribute('aria-modal');
    dialog.inert = true;
    states.delete(dialog);
    openDialogs.splice(openDialogs.indexOf(dialog), 1);
    state.inerted.forEach(element => { element.inert = false; });
    if (state.modal) document.body.style.overflow = state.overflow;
    if (state.trigger?.isConnected && !state.trigger.closest('[inert]')) state.trigger.focus({ preventScroll: true });
}

document.addEventListener('keydown', event => {
    const dialog = openDialogs.at(-1);
    const state = states.get(dialog);
    if (!state) return;
    if (event.key === 'Escape') {
        event.preventDefault(); event.stopImmediatePropagation();
        if (state.onClose) state.onClose(); else closeDialog(dialog);
    } else if (event.key === 'Tab' && state.modal) {
        const elements = focusable(dialog);
        const first = elements[0] || dialog;
        const last = elements.at(-1) || dialog;
        if (!dialog.contains(document.activeElement) ||
            (event.shiftKey && document.activeElement === first) ||
            (!event.shiftKey && document.activeElement === last) || !elements.length) {
            event.preventDefault(); event.stopImmediatePropagation();
            (event.shiftKey ? last : first).focus();
        }
    }
}, true);
