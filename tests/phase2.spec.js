import { test, expect } from '@playwright/test';

const chatChunk = /\/assets\/chat-(?!loader)[^/]+\.js$/;
const story = { title: 'Verified test release', summary: 'A source-linked update used for the loading regression.',
    source: 'Example newsroom', sourceUrl: 'https://example.com/release', type: 'Product Launch', impact: 80 };
const payload = { ok: true, items: [story], sources: ['example'], updatedAt: '2026-10-17T00:00:00Z' };

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { localStorage.setItem('sanzy_cookies', 'declined'); });
    await page.route('https://**/*', route => route.abort());
    await page.route('**/api/ready', route => route.fulfill({ status: 503, json: { ready: false } }));
});

test('first chat click survives a slow optional chunk', async ({ page }) => {
    let release;
    const gate = new Promise(resolve => { release = resolve; });
    await page.route(chatChunk, async route => { await gate; await route.continue(); });
    await page.goto('/');
    try {
        await page.locator('#sanzyFloatBtn').click();
        await expect(page.locator('#sanzyFloatBtn')).toHaveAttribute('aria-busy', 'true');
        await expect(page.locator('#sanzyWindow')).toHaveCount(0);
    } finally { release(); }
    await expect(page.locator('#sanzyWindow')).toHaveClass(/open/);
    await expect(page.locator('#sanzyStatusText')).toContainText('AI unavailable');
    await page.keyboard.press('Escape');
    await page.locator('#sanzyFloatBtn').click();
    await expect(page.locator('#sanzyWindow')).toHaveClass(/open/);
});

test('chat chunk failure exposes a usable retry', async ({ page }) => {
    let requests = 0;
    await page.route(chatChunk, route => ++requests === 1 ? route.abort() : route.continue());
    await page.goto('/');
    await page.locator('#sanzyFloatBtn').click();
    await expect(page.locator('#sanzyLoadStatus')).toContainText('could not load');
    await Promise.all([
        page.waitForEvent('domcontentloaded'),
        page.getByRole('button', { name: 'Reload page to retry guide', exact: true }).click(),
    ]);
    await page.locator('#sanzyFloatBtn').click();
    await expect(page.locator('#sanzyWindow')).toHaveClass(/open/);
});

test('slow news reserves space, then analysis opens without moving the header', async ({ page }) => {
    let release;
    const gate = new Promise(resolve => { release = resolve; });
    await page.route('**/api/ai-news', async route => { await gate; await route.fulfill({ json: payload }); });
    // Check the loading state as soon as the document is ready, before optional assets finish.
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    const feed = page.locator('#newsFeed');
    try {
        await expect(feed).toHaveAttribute('aria-busy', 'true');
        await expect(feed.locator('.ui-skeleton')).toHaveCount(3);
        expect((await feed.boundingBox()).height).toBeGreaterThanOrEqual(360);
    } finally { release(); }
    await expect(feed).toHaveAttribute('aria-busy', 'false');
    await expect(feed).toContainText(story.title);
    const logo = page.locator('.navbar .logo-text');
    const before = await logo.boundingBox();
    await page.getByRole('button', { name: 'Open Analysis →', exact: true }).click();
    await expect(page.locator('#newsModal')).toHaveClass(/open/);
    const after = await logo.boundingBox();
    expect(Math.abs(after.x - before.x)).toBeLessThanOrEqual(1);
    await page.keyboard.press('Escape');
    await expect(page.locator('#newsModal')).not.toHaveClass(/open/);
});

test('news can retry failure and retain stories after a failed refresh', async ({ page }) => {
    let attempt = 0;
    await page.route('**/api/ai-news', route => {
        attempt++;
        return attempt === 2 ? route.fulfill({ json: payload }) : route.fulfill({ status: 503, json: { ok: false } });
    });
    await page.goto('/blog');
    await expect(page.locator('#newsFeed')).toHaveAttribute('data-state', 'error');
    await page.getByRole('button', { name: 'Try again', exact: true }).click();
    await expect(page.locator('#newsFeed')).toContainText(story.title);
    await page.locator('#refreshNewsBtn').click();
    await expect(page.locator('#newsSourceStatus')).toContainText('previously loaded stories');
    await expect(page.locator('#newsFeed .news-card')).toHaveCount(1);
    await page.locator('#newsSearch').fill('no-such-story-xyz');
    await expect(page.locator('#newsFeed')).toHaveAttribute('data-state', 'empty');
    await page.locator('#newsSearch').fill('');
    await expect(page.locator('#newsFeed .news-card')).toHaveCount(1);
});

for (const path of ['/', '/ai-tools', '/learn-free']) {
    test(`navigation survives a short screen and desktop resize: ${path}`, async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('sanzy_theme', 'light'));
        await page.setViewportSize({ width: 820, height: 420 });
        await page.goto(path);
        const toggle = page.locator('#hamburger');
        await toggle.click();
        const menu = page.locator('[data-site-menu]');
        await expect(menu).toBeVisible();
        const primaryLink = menu.locator('a.btn-primary');
        if (await primaryLink.count()) await expect(primaryLink).toHaveCSS('color', 'rgb(255, 255, 255)');
        const finalLink = menu.getByRole('link', { name: 'AI News', exact: true });
        await finalLink.scrollIntoViewIfNeeded();
        await expect(finalLink).toBeInViewport();
        const bounds = await menu.boundingBox();
        expect(bounds.y + bounds.height).toBeLessThanOrEqual(421);
        await page.setViewportSize({ width: 1280, height: 800 });
        await expect(toggle).toBeHidden();
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
        await expect(menu).toBeHidden();
        expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
        await page.setViewportSize({ width: 360, height: 740 });
        await toggle.click();
        await page.keyboard.press('Escape');
        await expect(toggle).toBeFocused();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    });
}

test('empty directory filters recover featured cards', async ({ page }) => {
    await page.goto('/ai-tools');
    await expect(page.locator('#featuredToolsGrid .tool-card').first()).toBeVisible();
    await page.locator('#toolSearch').fill('no-such-tool-xyz');
    await expect(page.locator('#toolsGrid')).toHaveAttribute('data-state', 'empty');
    await expect(page.locator('#featuredToolsGrid')).toBeHidden();
    await page.getByRole('button', { name: 'Show All Tools', exact: true }).click();
    await expect(page.locator('#featuredToolsGrid .tool-card').first()).toBeVisible();
    await page.goto('/prompt-store');
    await page.locator('#searchInput').fill('no-such-pack-xyz');
    await expect(page.locator('#promptGrid')).toHaveAttribute('data-state', 'empty');
    await page.getByRole('button', { name: 'Show All Packs', exact: true }).click();
    await expect(page.locator('#promptGrid .prod-card')).toHaveCount(7);
    await expect(page.locator('#promptGrid .prod-image').first()).toHaveAttribute('loading', 'lazy');
});

test('learning PDF stays unloaded until export and downloads the generated plan', async ({ page }) => {
    const pdfRequests = [];
    page.on('request', request => { if (request.url().includes('/assets/pdf-export-')) pdfRequests.push(request.url()); });
    await page.goto('/learn-free');
    await page.locator('#nicheInput').fill('A practical garden guide');
    await page.locator('#generateSprintBtn').click();
    await expect(page.locator('#growthOutput')).toContainText('Week 4');
    expect(pdfRequests).toHaveLength(0);
    const download = page.waitForEvent('download');
    await page.locator('#savePlanPdfBtn').click();
    expect((await download).suggestedFilename()).toBe('sprint-plan.pdf');
    expect(pdfRequests.length).toBeGreaterThan(0);
    await expect(page.locator('#savePlanPdfBtn')).toBeEnabled();
});
