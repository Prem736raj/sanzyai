import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/prem7/.gemini/antigravity/brain/1e58beed-11ef-443e-bb0c-211357021c93/screenshots';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const pages = [
    { url: 'http://localhost:5173/', name: 'home.png' },
    { url: 'http://localhost:5173/domain-finder', name: 'domain-finder.png' },
    { url: 'http://localhost:5173/ai-tools', name: 'ai-tools.png' },
    { url: 'http://localhost:5173/prompt-store', name: 'prompt-store.png' },
    { url: 'http://localhost:5173/ai-services', name: 'ai-services.png' },
    { url: 'http://localhost:5173/learn-free', name: 'learn-free.png' },
    { url: 'http://localhost:5173/blog', name: 'blog.png' },
  ];

  for (const p of pages) {
    try {
      console.log(`Navigating to ${p.url}...`);
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1000);
      const filePath = path.join(outDir, p.name);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Saved screenshot: ${filePath}`);
    } catch (e) {
      console.error(`Error on ${p.url}:`, e.message);
    }
  }

  // Also take a mobile screenshot of home
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(outDir, 'home-mobile.png'), fullPage: true });

  await browser.close();
  console.log('All screenshots complete!');
}

run();

