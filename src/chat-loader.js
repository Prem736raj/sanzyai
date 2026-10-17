// Keep the guide reachable while its code, sanitizer and stylesheet load on demand.
let loading;
let idleTimer;
let failed = false;

export async function loadChat(open = false) {
    const launcher = document.getElementById('sanzyFloatBtn');
    if (!loading) {
        launcher?.setAttribute('aria-busy', 'true');
        loading = import('./chat.js').then(({ initializeChat }) => initializeChat()).catch(() => {
            loading = undefined;
            failed = true;
            const status = document.getElementById('sanzyLoadStatus');
            if (status) {
                status.textContent = 'Guide could not load. Reload this page to try again, or ';
                const contact = document.createElement('a');
                contact.href = '/contact'; contact.textContent = 'contact us'; status.append(contact);
            }
            launcher?.setAttribute('aria-label', 'Reload page to retry guide');
            if (launcher) launcher.textContent = '↻';
            return null;
        }).finally(() => launcher?.removeAttribute('aria-busy'));
    }
    const bot = await loading;
    if (open && bot) bot.open();
    return bot;
}

function installLauncher() {
    if (document.body.classList.contains('no-float-widgets')) return;
    const wrap = document.createElement('div');
    wrap.id = 'sanzyLauncherWrap';
    wrap.className = 'chat-launcher';
    const button = document.createElement('button');
    button.id = 'sanzyFloatBtn';
    button.type = 'button';
    button.setAttribute('aria-label', 'Open Sanzy Guide');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    const status = document.createElement('span');
    status.id = 'sanzyLoadStatus';
    status.setAttribute('role', 'status');
    wrap.append(button, status);
    document.body.append(wrap);
    button.addEventListener('click', () => {
        clearTimeout(idleTimer);
        // Browsers can cache failed module imports until the document reloads.
        if (failed) { window.location.reload(); return; }
        void loadChat(true);
    });

    // Wait past the first render; idle preloading never opens the dialog.
    idleTimer = window.setTimeout(() => {
        if (document.visibilityState === 'hidden' || navigator.connection?.saveData) return;
        if ('requestIdleCallback' in window) window.requestIdleCallback(() => void loadChat(), { timeout: 1500 });
        else void loadChat();
    }, 2500);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installLauncher, { once: true });
else installLauncher();
