import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', titlePart: 'SanzyAI' },
  { path: '/domain-finder', titlePart: 'Domain' },
  { path: '/ai-tools', titlePart: 'AI Tools' },
  { path: '/prompt-store', titlePart: 'Prompt' },
  { path: '/ai-services', titlePart: 'AI Services' },
  { path: '/learn-free', titlePart: 'Learn' },
  { path: '/blog', titlePart: 'AI Newsroom' },
];

test.describe('critical pages smoke', () => {
  for (const pageMeta of pages) {
    test(`loads ${pageMeta.path}`, async ({ page }) => {
      const resp = await page.goto(pageMeta.path, { waitUntil: 'domcontentloaded' });
      expect(resp?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(new RegExp(pageMeta.titlePart, 'i'));
      await expect(page.locator('body')).toBeVisible();
    });
  }
});
