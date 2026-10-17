import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, isMobile }) => {
  test.skip(Boolean(isMobile), 'Desktop baselines provide the stable visual regression surface.');
  await page.route('https://**/*', route => route.abort());
  await page.route('**/api/ready', route => route.fulfill({ status: 503, json: { ready: false } }));
  await page.route('**/api/ai-news', route => route.fulfill({ status: 503, json: { ok: false } }));
});

for (const theme of ['light', 'dark']) {
  test(`home hero visual baseline - ${theme}`, async ({ page }) => {
    await page.addInitScript(selectedTheme => {
      localStorage.setItem('sanzy_theme', selectedTheme);
      localStorage.setItem('sanzy_cookies', 'declined');
    }, theme);
    await page.goto('/');
    await expect(page.locator('#home')).toBeVisible();
    await expect(page.locator('#home')).toHaveScreenshot(`home-hero-${theme}.png`, {
      animations: 'disabled',
      caret: 'hide',
      threshold: 0.3,
      maxDiffPixelRatio: 0.08,
    });
  });
}
