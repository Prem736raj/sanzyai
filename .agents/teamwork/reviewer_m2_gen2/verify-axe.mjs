import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const browser = await chromium.launch();
let totalViolations = 0;

try {
  for (const status of ['available', 'taken', 'unknown']) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
      await context.addInitScript(t => localStorage.setItem('sanzy_theme', t), theme);
      await context.route('**/availability?domain=*', route => route.fulfill({ json: { domain: 'audit.com', status } }));
      const page = await context.newPage();
      await page.goto('http://127.0.0.1:4173/domain-finder');
      await page.locator('#domainInput').fill('audit.com');
      await page.locator('#searchBtn').click();
      await page.locator('#resultsSection').waitFor({ state: 'visible' });
      const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      console.log(`[${status}] ${theme} violations: ${res.violations.length}`);
      totalViolations += res.violations.length;
      for (const v of res.violations) {
        console.log(`  - ${v.id}: ${v.nodes.map(n => n.target).join(', ')}`);
        for (const node of v.nodes) {
          console.log(`    failureSummary: ${node.failureSummary}`);
        }
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
}

console.log(`TOTAL AXE VIOLATIONS: ${totalViolations}`);
if (totalViolations > 0) {
  process.exitCode = 1;
}
