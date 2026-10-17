import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('sanzy_theme', 'light');
    localStorage.setItem('sanzy_cookies', 'declined');
  });
  await page.route('https://**/*', route => route.abort());
  await page.route('**/api/ready', route => route.fulfill({ status: 503, json: { ready: false } }));
  await page.route('**/api/ai-news', route => route.fulfill({ status: 503, json: { ok: false } }));
});

test('language selector exposes synchronized aria state and restores focus on Escape', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('#langToggleBtn');
  const panel = page.locator('#languagePanel');

  await expect(toggle).toHaveAttribute('aria-controls', 'languagePanel');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).toHaveAttribute('aria-hidden', 'false');
  await expect(panel).toBeVisible();

  await panel.locator('.lang-btn').first().focus();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toHaveAttribute('aria-hidden', 'true');
  await expect(panel).toBeHidden();
  await expect(toggle).toBeFocused();
});

test('learning path behaves as a pressed-button group', async ({ page }) => {
  await page.goto('/learn-free');
  const group = page.getByRole('group', { name: 'Learning mode' });
  const free = page.getByRole('button', { name: 'Start Free Path', exact: true });
  const paid = page.getByRole('button', { name: 'Start Paid Path', exact: true });

  await expect(group).toBeVisible();
  await expect(free).toHaveAttribute('aria-pressed', 'true');
  await expect(paid).toHaveAttribute('aria-pressed', 'false');
  await paid.click();
  await expect(free).toHaveAttribute('aria-pressed', 'false');
  await expect(paid).toHaveAttribute('aria-pressed', 'true');
});

test('AI tool cards keep nested controls keyboard reachable without fake button semantics', async ({ page }) => {
  await page.goto('/ai-tools');
  const card = page.locator('#featuredToolsGrid .tool-card, #toolsGrid .tool-card').first();
  await expect(card).toBeVisible();
  await expect(card).not.toHaveAttribute('role', 'button');
  await expect(card).not.toHaveAttribute('tabindex', '0');

  const details = card.getByRole('button', { name: 'Details', exact: true });
  const visit = card.getByRole('link', { name: 'Visit Tool', exact: true });
  await details.focus();
  await expect(details).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(visit).toBeFocused();
});

test('prompt preview traps modal state and returns focus after Escape', async ({ page }) => {
  await page.goto('/prompt-store');
  const opener = page.locator('[data-action="open-preview"]').first();
  const modal = page.locator('#previewModal');
  await opener.focus();
  await opener.click();
  await expect(modal).toHaveAttribute('role', 'dialog');
  await expect(modal).toHaveAttribute('aria-modal', 'true');
  await expect(modal).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('#previewCloseBtn')).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(modal).toHaveAttribute('aria-hidden', 'true');
  await expect(opener).toBeFocused();
});
