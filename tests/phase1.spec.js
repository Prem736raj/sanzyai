import { test, expect } from '@playwright/test';

const criticalPages = ['/', '/domain-finder', '/ai-tools', '/prompt-store', '/learn-free', '/blog', '/contact'];
const supportingPages = ['404', 'submit-tool', 'affiliate-disclosure', 'refund-policy',
  'terms-of-service', 'about', 'privacy-policy',
  'blog/best-chatgpt-prompts-business', 'blog/how-to-write-ai-prompts', 'blog/midjourney-product-photography'];

test.beforeEach(async ({ page }) => {
  // External images and fonts are not part of these functional regressions.
  await page.route('https://**/*', route => route.abort());
  await page.route('**/api/ready', route => route.fulfill({ status: 503, json: { ready: false } }));
  await page.route('**/api/ai-news', route => route.fulfill({ status: 503, json: { ok: false, error: 'Unavailable' } }));
});

for (const path of supportingPages) {
  test(`production supporting page: ${path}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(`/${path}.html`, { waitUntil: 'domcontentloaded' });
    expect(response.ok()).toBeTruthy();
    await expect(page.locator('h1').first()).toBeVisible();
    if (path === '404') {
      await expect(page.locator('h1')).toContainText('Page Not Found');
      await expect(page.locator('.error-code')).toContainText('404');
      await expect(page.locator('a[href="/"]').first()).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}

for (const path of criticalPages) {
  test(`healthy scripts and reachable mobile menu: ${path}`, async ({ page, isMobile }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toBeVisible();
    if (isMobile) {
      const toggle = page.getByRole('button', { name: 'Toggle menu', exact: true });
      await expect(toggle).toBeVisible();
      const bounds = await toggle.boundingBox();
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize().width);
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#mobileMenu, #mobileNav').first()).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    }
    expect(errors).toEqual([]);
  });
}

test('store excludes paused bundle and offers working previews and free download', async ({ page }) => {
  await page.goto('/prompt-store');
  await expect(page.locator('#promptGrid .prod-card')).toHaveCount(7);
  await expect(page.locator('a[href*="gumroad.com/l/"]')).toHaveCount(0);
  await expect(page.locator('#bundleDeal')).toContainText('paused');
  await page.locator('[data-action="open-preview"]').first().click();
  await expect(page.locator('#previewModal')).toBeVisible();
  await expect(page.locator('#previewBody')).toContainText('Sample 1');
  await page.locator('#previewCloseBtn').click();
  const download = page.waitForEvent('download');
  await page.locator('[data-action="download-free-pack"]').first().click();
  expect((await download).suggestedFilename()).toMatch(/\.pdf$/);
});

test('newsletter failure preserves address and does not store it locally', async ({ page }) => {
  await page.route('**/api/subscribe', route => route.fulfill({ status: 503, json: { error: 'Subscriptions are temporarily unavailable.' } }));
  await page.goto('/');
  const form = page.locator('#newsletterForm');
  await form.locator('input').fill('test@example.com');
  await form.locator('button').click();
  await expect(form.locator('[data-submit-status]')).toContainText('temporarily unavailable');
  await expect(form.locator('input')).toHaveValue('test@example.com');
  expect(await page.evaluate(() => localStorage.getItem('sanzyai_subscribers'))).toBeNull();
});

test('learning quiz works and user input remains text', async ({ page }) => {
  await page.goto('/learn-free');
  await page.getByRole('button', { name: 'Learning & Hobby', exact: true }).click();
  await page.getByRole('button', { name: '$0 (Zero)', exact: true }).click();
  await page.getByRole('button', { name: '3-5 Hours', exact: true }).click();
  await expect(page.locator('#quizResult')).toBeVisible();
  await page.locator('#nicheInput').fill('<img src=x onerror=alert(1)>');
  await page.locator('#generateSprintBtn').click();
  await expect(page.locator('#growthOutput')).toContainText('<img src=x onerror=alert(1)>');
  await expect(page.locator('#growthOutput img')).toHaveCount(0);
});

test('chat readiness and news failure are represented honestly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#sanzyStatusText')).toContainText('AI unavailable');
  await page.goto('/blog');
  await expect(page.locator('body')).toContainText('Live news is temporarily unavailable');
  await expect(page.locator('body')).not.toContainText('OpenAI ships GPT-5');
});

test('production documents send a hash-based CSP with no inline event permission', async ({ page }) => {
  const response = await page.goto('/');
  const policy = response.headers()['content-security-policy'];
  expect(policy).toContain("script-src-attr 'none'");
  expect(policy).toContain("'sha256-");
  expect(policy.split('script-src ')[1].split(';')[0]).not.toContain("'unsafe-inline'");
});
