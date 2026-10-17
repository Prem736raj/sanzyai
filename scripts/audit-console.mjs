import { chromium } from '@playwright/test';

async function audit() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  const pages = [
    'http://localhost:5173/',
    'http://localhost:5173/domain-finder',
    'http://localhost:5173/ai-tools',
    'http://localhost:5173/prompt-store',
    'http://localhost:5173/ai-services',
    'http://localhost:5173/learn-free',
    'http://localhost:5173/blog',
  ];

  for (const url of pages) {
    console.log(`\n=== Auditing ${url} ===`);
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => {
      errors.push(`PageError: ${err.message}`);
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(1000);
      if (errors.length > 0) {
        console.log(`Errors found (${errors.length}):`);
        errors.forEach(e => console.log('  -', e));
      } else {
        console.log('No console errors detected.');
      }
    } catch (e) {
      console.log('Navigation failed:', e.message);
    }
    page.removeAllListeners('console');
    page.removeAllListeners('pageerror');
  }

  await browser.close();
}

audit();

