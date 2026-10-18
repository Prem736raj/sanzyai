import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';

const paths = ['/', '/domain-finder', '/ai-tools', '/prompt-store', '/learn-free', '/blog', '/contact'];
const channel = process.env.PLAYWRIGHT_CHANNEL || undefined;
const browser = await chromium.launch({ channel });
const reports = [];
try {
    for (const theme of ['light', 'dark']) {
        const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
        await context.addInitScript(theme => {
            localStorage.setItem('sanzy_theme', theme);
            localStorage.setItem('sanzy_cookies', 'declined');
        }, theme);
        await context.route('https://**/*', route => route.abort());
        await context.route('**/api/ready', route => route.fulfill({ status: 503, json: { ready: false } }));
        await context.route('**/api/ai-news', route => route.fulfill({ status: 503, json: { ok: false } }));
        const page = await context.newPage();
        for (const path of paths) {
            await page.goto('http://127.0.0.1:4173' + path);
            await page.locator('h1').first().waitFor();
            const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
            const violations = result.violations.map(({ id, impact, nodes }) => ({ id, impact,
                nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) }));
            reports.push({ path, theme, violations });
            console.log(`${theme} ${path}: ${violations.map(v => `${v.id}(${v.nodes.length})`).join(', ') || 'PASS'}`);
        }
        await context.close();
    }
} finally { await browser.close(); }
const failures = reports.reduce((sum, report) => sum + report.violations.length, 0);
writeFileSync(process.argv[2] || 'docs/phase3-a11y-latest.json', JSON.stringify({
    scope: 'Eight critical pages, desktop, light/dark; WCAG A/AA tags through 2.1; external media/providers mocked. Automated checks do not establish full accessibility conformance.',
    verdict: failures ? 'FAIL' : 'PASS', reports,
}, null, 2) + '\n');
console.log(`VERDICT: ${failures ? 'FAIL -- ' + failures + ' rule/page/theme findings' : 'PASS'}`);
if (failures) process.exitCode = 1;
