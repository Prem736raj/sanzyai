// Keep the guide reachable while its code, sanitizer and stylesheet load on demand.
let loading;
let idleTimer;
let failed = false;

export async function loadChat(open = false) {
    const launcher = document.getElementById('sanzyFloatBtn');
    const trigger = document.getElementById('askLearningAssistantBtn');
    if (launcher) launcher.setAttribute('aria-busy', 'true');
    if (trigger) trigger.setAttribute('aria-busy', 'true');

    if (!loading) {
        loading = import('./chat.js').then(({ initializeChat }) => initializeChat()).catch(() => {
            loading = undefined;
            failed = true;
            const status = document.getElementById('sanzyLoadStatus');
            if (status) {
                status.textContent = 'Guide could not load. Reload this page to try again, or ';
                const contact = document.createElement('a');
                contact.href = '/contact';
                contact.textContent = 'contact us';
                status.append(contact);
            }
            const learnStatus = document.getElementById('learningAssistantStatus');
            if (learnStatus) {
                learnStatus.textContent = 'Learning assistant is currently unavailable. You can reach us via our contact page.';
            }
            if (launcher) {
                launcher.setAttribute('aria-label', 'Reload page to retry guide');
                launcher.textContent = '↻';
            }
            if (trigger) {
                trigger.textContent = 'Assistant unavailable';
                trigger.disabled = true;
            }
            return null;
        }).finally(() => {
            if (launcher) launcher.removeAttribute('aria-busy');
            if (trigger) trigger.removeAttribute('aria-busy');
        });
    }

    const bot = await loading;
    if (open && bot) bot.open();
    return bot;
}

function setupLearningAssistantTrigger() {
    const trigger = document.getElementById('askLearningAssistantBtn');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
        if (failed) return;
        void loadChat(true);
    });
}

function installLauncher() {
    setupLearningAssistantTrigger();

    if (document.body.classList.contains('no-float-widgets')) return;
    if (document.getElementById('sanzyFloatBtn')) return;

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
