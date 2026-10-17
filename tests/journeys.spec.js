import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('sanzy_cookies', 'declined'));
  await page.route('https://**/*', route => route.abort());
  await page.route('**/api/ready', route => route.fulfill({ status: 503, json: { ready: false } }));
  await page.route('**/api/ai-news', route => route.fulfill({ status: 503, json: { ok: false } }));
});

test('AI tools search, filter and compare journey', async ({ page }) => {
  await page.goto('/ai-tools');
  await page.locator('#toolSearch').fill('ChatGPT');
  expect(await page.locator('#toolsGrid .tool-card, #featuredToolsGrid .tool-card').count()).toBeGreaterThan(0);
  await page.locator('#toolSearch').fill('');

  await page.locator('.filter-btn[data-filter="writing"]').click();
  await expect(page.locator('#toolCount')).toContainText('tool');
  const compareButtons = page.locator('.tool-card [data-action="quick-compare"]');
  await compareButtons.nth(0).click();
  await compareButtons.nth(1).click();
  await expect(page.locator('#compareBtn')).toBeEnabled();
  await page.locator('#compareBtn').click();
  await expect(page.locator('#compareSection')).toBeVisible();
  await expect(page.locator('#compareTable thead th')).toHaveCount(3);
});

test('prompt library search, platform filter and preview journey', async ({ page }) => {
  await page.goto('/prompt-store');
  await page.locator('#searchInput').fill('business');
  await expect(page.locator('#promptGrid .prod-card').first()).toBeVisible();
  await page.locator('#searchInput').fill('');
  await page.locator('#platformSel').selectOption('chatgpt');
  await expect(page.locator('#promptGrid .prod-card').first()).toBeVisible();
  await page.locator('[data-action="open-preview"]').first().click();
  await expect(page.locator('#previewModal')).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('#previewBody')).toContainText('Sample 1');
  await page.locator('#previewCloseBtn').click();
  await expect(page.locator('#previewModal')).toHaveAttribute('aria-hidden', 'true');
});

test('domain comparison journey reaches rendered registrar results', async ({ page }) => {
  await page.route('**/availability?domain=*', route => route.fulfill({ json: { domain: 'exampletest.com', status: 'available' } }));
  await page.goto('/domain-finder');
  await page.locator('#domainInput').fill('exampletest');
  await page.locator('#searchBtn').click();
  await expect(page.locator('#domainInput')).toHaveValue('exampletest.com');
  await expect(page.locator('#resultsSection')).toBeVisible();
  await expect(page.locator('#resultDomain')).toContainText('exampletest.com');
  await expect(page.locator('#priceTableBody tr').first()).toBeVisible();
});

test('learning journey switches path and generates a sprint plan', async ({ page }) => {
  await page.goto('/learn-free');
  await page.getByRole('button', { name: 'Start Paid Path', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Start Paid Path', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#nicheInput').fill('AI portfolio for a student developer');
  await page.locator('#generateSprintBtn').click();
  await expect(page.locator('#growthOutput')).toContainText('Week 4');
  await expect(page.locator('#growthOutput')).toContainText('AI portfolio for a student developer');
});
