export function markGrid(grid, state) {
    if (!grid) return;
    grid.dataset.state = state;
    grid.setAttribute('aria-busy', String(state === 'loading' || state === 'refreshing'));
}

export function showGridState(grid, state, message, retry = false) {
    if (!grid) return;
    markGrid(grid, state);
    const status = document.createElement('div');
    status.className = 'grid-message';
    status.setAttribute('role', 'status');
    const text = document.createElement('p');
    text.textContent = message;
    status.append(text);
    if (retry) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'ui-button ui-button--primary';
        button.dataset.action = 'retry-news';
        button.textContent = 'Try again';
        status.append(button);
    }
    grid.replaceChildren(status);
    if (state === 'loading') {
        for (let i = 0; i < 3; i++) {
            const card = document.createElement('div');
            card.className = 'ui-skeleton';
            card.setAttribute('aria-hidden', 'true');
            grid.append(card);
        }
    }
}
