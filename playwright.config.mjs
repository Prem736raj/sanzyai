import { defineConfig, devices } from '@playwright/test';

// Use Playwright's bundled Chromium by default. Set PLAYWRIGHT_CHANNEL explicitly
// when validating a system browser channel such as Edge.
const browserChannel = process.env.PLAYWRIGHT_CHANNEL || undefined;
export default defineConfig({
  testDir: './tests',
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
  timeout: 45_000,
  expect: {
    timeout: 8_000,
  },
  fullyParallel: true,
  workers: 2,
  retries: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    channel: browserChannel,
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'mobile', use: { ...devices['iPhone 13'], deviceScaleFactor: 1, defaultBrowserType: 'chromium' } },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
