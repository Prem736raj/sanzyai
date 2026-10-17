# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase2.spec.js >> news can retry failure and retain stories after a failed refresh
- Location: tests\phase2.spec.js:68:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#newsFeed')
Expected substring: "Verified test release"
Received string:    "Loading AI news..."
Timeout: 8000ms

Call log:
  - Expect "toContainText" with timeout 8000ms
  - waiting for locator('#newsFeed')
    8 × locator resolved to <div id="newsFeed" aria-busy="true" data-state="loading" class="news-feed data-grid">…</div>
      - unexpected value "Loading AI news..."

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - navigation "Primary" [ref=e3]:
    - generic [ref=e5]:
      - link "SanzyAI Logo SanzyAI" [ref=e6] [cursor=pointer]:
        - /url: /
        - img "SanzyAI Logo" [ref=e8]
        - generic [ref=e9]: SanzyAI
      - list [ref=e10]:
        - listitem [ref=e11]:
          - link "Home" [ref=e12] [cursor=pointer]:
            - /url: /
        - listitem [ref=e13]:
          - link "Domain Finder" [ref=e14] [cursor=pointer]:
            - /url: /domain-finder
        - listitem [ref=e15]:
          - link "AI Tools" [ref=e16] [cursor=pointer]:
            - /url: /ai-tools
        - listitem [ref=e17]:
          - link "Prompt Store" [ref=e18] [cursor=pointer]:
            - /url: /prompt-store
        - listitem [ref=e19]:
          - link "AI Services" [ref=e20] [cursor=pointer]:
            - /url: /ai-services
        - listitem [ref=e21]:
          - link "Learn Free" [ref=e22] [cursor=pointer]:
            - /url: /learn-free
        - listitem [ref=e23]:
          - link "AI News" [ref=e24] [cursor=pointer]:
            - /url: /blog
      - generic [ref=e26]:
        - button "View Saved Items" [ref=e27] [cursor=pointer]:
          - img [ref=e28]
        - button "Change language" [ref=e30] [cursor=pointer]:
          - img [ref=e31]
        - text: ✓
        - button "Switch to dark mode" [ref=e34] [cursor=pointer]:
          - img [ref=e35]
  - main [ref=e41]:
    - generic [ref=e43]:
      - generic [ref=e44]:
        - text: AI NEWS ·
        - generic [ref=e46]: OCTOBER 2026
      - generic [ref=e47]:
        - generic [ref=e48]:
          - heading "What changed in AI October 2026." [level=1] [ref=e49]
          - paragraph [ref=e50]: A clean month-to-date briefing of launches, research, policy, funding and product moves. Fresh stories first, direct source links, no filler.
        - generic [ref=e51]:
          - generic [ref=e52]: MONTH-TO-DATE COVERAGE
          - strong [ref=e53]: October 2026 · month to date
          - generic [ref=e54]: Updated continuously from official and independent sources.
      - generic "Newsroom coverage summary" [ref=e55]:
        - generic [ref=e56]:
          - strong [ref=e57]: "0"
          - generic [ref=e58]: Stories this month
        - generic [ref=e59]:
          - strong [ref=e60]: "0"
          - generic [ref=e61]: Official updates
        - generic [ref=e62]:
          - strong [ref=e63]: —
          - generic [ref=e64]: Sources tracked
        - generic [ref=e65]:
          - strong [ref=e66]: "8"
          - generic [ref=e67]: Coverage lanes
    - region "Top AI stories" [ref=e68]:
      - generic [ref=e70]:
        - article [ref=e71]:
          - paragraph [ref=e72]: Live coverage is temporarily unavailable.
        - generic [ref=e74]:
          - generic [ref=e75]: Latest
          - generic [ref=e76]: Live feed
    - region "AI news filters" [ref=e77]:
      - generic [ref=e79]:
        - generic [ref=e80]:
          - button "All" [ref=e81] [cursor=pointer]
          - button "Model Release" [ref=e82] [cursor=pointer]
          - button "Product Launch" [ref=e83] [cursor=pointer]
          - button "Policy" [ref=e84] [cursor=pointer]
          - button "Research" [ref=e85] [cursor=pointer]
          - button "Funding" [ref=e86] [cursor=pointer]
          - button "Creator Economy" [ref=e87] [cursor=pointer]
          - button "AI Update" [ref=e88] [cursor=pointer]
        - generic [ref=e89]:
          - generic [ref=e90]:
            - generic [ref=e91]: Search
            - searchbox "Search AI news" [ref=e92]
          - combobox "Sort AI news" [ref=e93]:
            - option "Newest first" [selected]
            - option "Top stories"
            - option "Official sources first"
          - button "Refresh feed" [ref=e94] [cursor=pointer]
        - status [ref=e95]: Live news is temporarily unavailable. Please try again later.
    - generic [ref=e98]:
      - generic [ref=e99]:
        - generic [ref=e100]:
          - generic [ref=e101]:
            - generic [ref=e102]: All coverage
            - heading "Latest stories" [level=2] [ref=e103]
          - generic [ref=e104]: Feed unavailable
        - status [ref=e106]:
          - paragraph [ref=e107]: Live news is temporarily unavailable. Please try again later.
          - button "Try again" [ref=e108] [cursor=pointer]
        - generic [ref=e109]:
          - generic [ref=e110]: Showing 0 of 0 stories
          - button "Load more stories" [ref=e111] [cursor=pointer]
      - complementary "Newsroom sidebar" [ref=e112]:
        - generic [ref=e113]:
          - generic [ref=e114]:
            - generic [ref=e115]: In focus
            - heading "Stories to know" [level=3] [ref=e116]
          - generic [ref=e117]: Top stories will appear here when the live feed is available.
        - generic [ref=e118]:
          - generic [ref=e119]:
            - generic [ref=e120]: Saved
            - heading "Your reading list" [level=3] [ref=e121]
          - paragraph [ref=e122]: Save anything you want to revisit later.
          - generic [ref=e123]: No saved stories yet.
        - generic [ref=e124]:
          - generic [ref=e125]: Coverage standard
          - paragraph [ref=e126]: Stories are limited to the current calendar month, deduplicated, and linked back to their original publisher or feed source.
  - contentinfo [ref=e127]:
    - generic [ref=e128]:
      - link "SanzyAI Logo SanzyAI" [ref=e129] [cursor=pointer]:
        - /url: /
        - img "SanzyAI Logo" [ref=e131]
        - generic [ref=e132]: SanzyAI
      - list [ref=e133]:
        - listitem [ref=e134]:
          - link "About" [ref=e135] [cursor=pointer]:
            - /url: /about
        - listitem [ref=e136]:
          - link "Contact" [ref=e137] [cursor=pointer]:
            - /url: /contact
        - listitem [ref=e138]:
          - link "Privacy" [ref=e139] [cursor=pointer]:
            - /url: /privacy-policy
        - listitem [ref=e140]:
          - link "Terms" [ref=e141] [cursor=pointer]:
            - /url: /terms-of-service
        - listitem [ref=e142]:
          - link "Refunds" [ref=e143] [cursor=pointer]:
            - /url: /refund-policy
      - paragraph [ref=e144]: © 2026 SanzyAI
  - generic:
    - generic: Live news unavailable
  - dialog [ref=e146]:
    - generic [ref=e147]:
      - heading [level=3] [ref=e148]: Saved Items
      - button [ref=e149] [cursor=pointer]: ✕
    - generic [ref=e151]:
      - img [ref=e153]
      - paragraph [ref=e155]: Your saved items list is empty
      - link [ref=e156] [cursor=pointer]:
        - /url: /prompt-store
        - text: Browse Prompts
    - link [ref=e158] [cursor=pointer]:
      - /url: /prompt-store
      - text: Go to Prompt Store →
  - button "Open Sanzy Guide" [ref=e160] [cursor=pointer]:
    - img [ref=e161]
    - generic [ref=e163]: "1"
  - dialog "Sanzy Guide":
    - generic:
      - generic:
        - img
      - generic:
        - generic: Sanzy Guide
        - generic:
          - generic: Site guide · AI unavailable
      - generic:
        - button "↺"
        - button "✕"
    - generic:
      - generic:
        - img
      - generic: Looking for a specific topic? Ask here or browse categories in the sidebar.
    - generic:
      - generic:
        - textbox "Ask Sanzy anything..."
        - button "➤"
      - generic:
        - generic: Powered by SanzyAI
        - button "↺ New chat"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const chatChunk = /\/assets\/chat-(?!loader)[^/]+\.js$/;
  4   | const story = { title: 'Verified test release', summary: 'A source-linked update used for the loading regression.',
  5   |     source: 'Example newsroom', sourceUrl: 'https://example.com/release', type: 'Product Launch', impact: 80 };
  6   | const payload = { ok: true, items: [story], sources: ['example'], updatedAt: '2026-10-17T00:00:00Z' };
  7   | 
  8   | test.beforeEach(async ({ page }) => {
  9   |     await page.addInitScript(() => { localStorage.setItem('sanzy_cookies', 'declined'); });
  10  |     await page.route('https://**/*', route => route.abort());
  11  |     await page.route('**/api/ready', route => route.fulfill({ status: 503, json: { ready: false } }));
  12  | });
  13  | 
  14  | test('first chat click survives a slow optional chunk', async ({ page }) => {
  15  |     let release;
  16  |     const gate = new Promise(resolve => { release = resolve; });
  17  |     await page.route(chatChunk, async route => { await gate; await route.continue(); });
  18  |     await page.goto('/');
  19  |     try {
  20  |         await page.locator('#sanzyFloatBtn').click();
  21  |         await expect(page.locator('#sanzyFloatBtn')).toHaveAttribute('aria-busy', 'true');
  22  |         await expect(page.locator('#sanzyWindow')).toHaveCount(0);
  23  |     } finally { release(); }
  24  |     await expect(page.locator('#sanzyWindow')).toHaveClass(/open/);
  25  |     await expect(page.locator('#sanzyStatusText')).toContainText('AI unavailable');
  26  |     await page.keyboard.press('Escape');
  27  |     await page.locator('#sanzyFloatBtn').click();
  28  |     await expect(page.locator('#sanzyWindow')).toHaveClass(/open/);
  29  | });
  30  | 
  31  | test('chat chunk failure exposes a usable retry', async ({ page }) => {
  32  |     let requests = 0;
  33  |     await page.route(chatChunk, route => ++requests === 1 ? route.abort() : route.continue());
  34  |     await page.goto('/');
  35  |     await page.locator('#sanzyFloatBtn').click();
  36  |     await expect(page.locator('#sanzyLoadStatus')).toContainText('could not load');
  37  |     await Promise.all([
  38  |         page.waitForEvent('domcontentloaded'),
  39  |         page.getByRole('button', { name: 'Reload page to retry guide', exact: true }).click(),
  40  |     ]);
  41  |     await page.locator('#sanzyFloatBtn').click();
  42  |     await expect(page.locator('#sanzyWindow')).toHaveClass(/open/);
  43  | });
  44  | 
  45  | test('slow news reserves space, then analysis opens without moving the header', async ({ page }) => {
  46  |     let release;
  47  |     const gate = new Promise(resolve => { release = resolve; });
  48  |     await page.route('**/api/ai-news', async route => { await gate; await route.fulfill({ json: payload }); });
  49  |     await page.goto('/blog');
  50  |     const feed = page.locator('#newsFeed');
  51  |     try {
  52  |         await expect(feed).toHaveAttribute('aria-busy', 'true');
  53  |         await expect(feed.locator('.ui-skeleton')).toHaveCount(3);
  54  |         expect((await feed.boundingBox()).height).toBeGreaterThanOrEqual(360);
  55  |     } finally { release(); }
  56  |     await expect(feed).toHaveAttribute('aria-busy', 'false');
  57  |     await expect(feed).toContainText(story.title);
  58  |     const logo = page.locator('.navbar .logo-text');
  59  |     const before = await logo.boundingBox();
  60  |     await page.getByRole('button', { name: 'Open Analysis →', exact: true }).click();
  61  |     await expect(page.locator('#newsModal')).toHaveClass(/open/);
  62  |     const after = await logo.boundingBox();
  63  |     expect(Math.abs(after.x - before.x)).toBeLessThanOrEqual(1);
  64  |     await page.keyboard.press('Escape');
  65  |     await expect(page.locator('#newsModal')).not.toHaveClass(/open/);
  66  | });
  67  | 
  68  | test('news can retry failure and retain stories after a failed refresh', async ({ page }) => {
  69  |     let attempt = 0;
  70  |     await page.route('**/api/ai-news', route => {
  71  |         attempt++;
  72  |         return attempt === 2 ? route.fulfill({ json: payload }) : route.fulfill({ status: 503, json: { ok: false } });
  73  |     });
  74  |     await page.goto('/blog');
  75  |     await expect(page.locator('#newsFeed')).toHaveAttribute('data-state', 'error');
  76  |     await page.getByRole('button', { name: 'Try again', exact: true }).click();
> 77  |     await expect(page.locator('#newsFeed')).toContainText(story.title);
      |                                             ^ Error: expect(locator).toContainText(expected) failed
  78  |     await page.locator('#refreshNewsBtn').click();
  79  |     await expect(page.locator('#newsSourceStatus')).toContainText('previously loaded stories');
  80  |     await expect(page.locator('#newsFeed .news-card')).toHaveCount(1);
  81  |     await page.locator('#newsSearch').fill('no-such-story-xyz');
  82  |     await expect(page.locator('#newsFeed')).toHaveAttribute('data-state', 'empty');
  83  |     await page.locator('#newsSearch').fill('');
  84  |     await expect(page.locator('#newsFeed .news-card')).toHaveCount(1);
  85  | });
  86  | 
  87  | for (const path of ['/', '/ai-tools', '/learn-free']) {
  88  |     test(`navigation survives a short screen and desktop resize: ${path}`, async ({ page }) => {
  89  |         await page.addInitScript(() => localStorage.setItem('sanzy_theme', 'light'));
  90  |         await page.setViewportSize({ width: 820, height: 420 });
  91  |         await page.goto(path);
  92  |         const toggle = page.locator('#hamburger');
  93  |         await toggle.click();
  94  |         const menu = page.locator('[data-site-menu]');
  95  |         await expect(menu).toBeVisible();
  96  |         const primaryLink = menu.locator('a.btn-primary');
  97  |         if (await primaryLink.count()) await expect(primaryLink).toHaveCSS('color', 'rgb(255, 255, 255)');
  98  |         const finalLink = menu.getByRole('link', { name: 'AI News', exact: true });
  99  |         await finalLink.scrollIntoViewIfNeeded();
  100 |         await expect(finalLink).toBeInViewport();
  101 |         const bounds = await menu.boundingBox();
  102 |         expect(bounds.y + bounds.height).toBeLessThanOrEqual(421);
  103 |         await page.setViewportSize({ width: 1280, height: 800 });
  104 |         await expect(toggle).toBeHidden();
  105 |         await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  106 |         await expect(menu).toBeHidden();
  107 |         expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  108 |         await page.setViewportSize({ width: 360, height: 740 });
  109 |         await toggle.click();
  110 |         await page.keyboard.press('Escape');
  111 |         await expect(toggle).toBeFocused();
  112 |         expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  113 |     });
  114 | }
  115 | 
  116 | test('empty directory filters recover featured cards', async ({ page }) => {
  117 |     await page.goto('/ai-tools');
  118 |     await expect(page.locator('#featuredToolsGrid .tool-card').first()).toBeVisible();
  119 |     await page.locator('#toolSearch').fill('no-such-tool-xyz');
  120 |     await expect(page.locator('#toolsGrid')).toHaveAttribute('data-state', 'empty');
  121 |     await expect(page.locator('#featuredToolsGrid')).toBeHidden();
  122 |     await page.getByRole('button', { name: 'Show All Tools', exact: true }).click();
  123 |     await expect(page.locator('#featuredToolsGrid .tool-card').first()).toBeVisible();
  124 |     await page.goto('/prompt-store');
  125 |     await page.locator('#searchInput').fill('no-such-pack-xyz');
  126 |     await expect(page.locator('#promptGrid')).toHaveAttribute('data-state', 'empty');
  127 |     await page.getByRole('button', { name: 'Show All Packs', exact: true }).click();
  128 |     await expect(page.locator('#promptGrid .prod-card')).toHaveCount(7);
  129 |     await expect(page.locator('#promptGrid .prod-image').first()).toHaveAttribute('loading', 'lazy');
  130 | });
  131 | 
  132 | test('learning PDF stays unloaded until export and downloads the generated plan', async ({ page }) => {
  133 |     const pdfRequests = [];
  134 |     page.on('request', request => { if (request.url().includes('/assets/pdf-export-')) pdfRequests.push(request.url()); });
  135 |     await page.goto('/learn-free');
  136 |     await page.locator('#nicheInput').fill('A practical garden guide');
  137 |     await page.locator('#generateSprintBtn').click();
  138 |     await expect(page.locator('#growthOutput')).toContainText('Week 4');
  139 |     expect(pdfRequests).toHaveLength(0);
  140 |     const download = page.waitForEvent('download');
  141 |     await page.locator('#savePlanPdfBtn').click();
  142 |     expect((await download).suggestedFilename()).toBe('sprint-plan.pdf');
  143 |     expect(pdfRequests.length).toBeGreaterThan(0);
  144 |     await expect(page.locator('#savePlanPdfBtn')).toBeEnabled();
  145 | });
  146 | 
```