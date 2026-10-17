export async function submitForm(form, endpoint, payload) {
    const button = form.querySelector('button[type="submit"], button:not([type])');
    let status = form.querySelector('[data-submit-status]');
    if (!status) {
        status = document.createElement('p');
        status.dataset.submitStatus = '';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        form.append(status);
    }
    if (button?.disabled) return false;
    if (button) button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending…';
    try {
        const response = await fetch(endpoint, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload), signal: AbortSignal.timeout(10_000),
        });
        const result = await response.json();
        if (!response.ok || result.accepted !== true) throw new Error(result.error || 'Could not accept your request. Please try again.');
        status.textContent = endpoint === '/api/subscribe' ? 'Subscription request accepted. Check your inbox for any confirmation step.' : 'Your request was accepted. We will reply by email.';
        window.trackEvent?.(endpoint === '/api/subscribe' ? 'newsletter_request_accepted' : 'lead_request_accepted', { kind: payload.kind || 'newsletter' });
        form.reset();
        return true;
    } catch (error) {
        status.textContent = error.name === 'TimeoutError' || error.name === 'TypeError'
            ? 'Could not connect. Your details are still here; retry or email hello@sanzyai.com.'
            : error.message;
        return false;
    } finally {
        if (button) button.disabled = false;
        form.removeAttribute('aria-busy');
    }
}
