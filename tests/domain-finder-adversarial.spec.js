import { test, expect } from '@playwright/test';

test.describe('Milestone 2 Domain Finder Adversarial Verification', () => {

  test.beforeEach(async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('1. TLD Switching: pills update input and query extensions accurately', async ({ page }) => {
    // Mock available API
    await page.route('**/availability?domain=*', route => 
      route.fulfill({ json: { domain: 'alpha.com', status: 'available' } })
    );

    await page.goto('/domain-finder');

    // Initially .com is active
    const comPill = page.locator('.tld-pill[data-tld=".com"]');
    await expect(comPill).toHaveClass(/active/);

    // Type a base domain without TLD
    const domainInput = page.locator('#domainInput');
    await domainInput.fill('alphasoftware');

    // Click .io pill
    const ioPill = page.locator('.tld-pill[data-tld=".io"]');
    await ioPill.click();

    // Verify .io is active and input changed to alphasoftware.io
    await expect(ioPill).toHaveClass(/active/);
    await expect(comPill).not.toHaveClass(/active/);
    await expect(domainInput).toHaveValue('alphasoftware.io');

    // Click .ai pill
    const aiPill = page.locator('.tld-pill[data-tld=".ai"]');
    await aiPill.click();
    await expect(aiPill).toHaveClass(/active/);
    await expect(domainInput).toHaveValue('alphasoftware.ai');

    // Search alphasoftware.ai
    await page.route('**/availability?domain=alphasoftware.ai', route => 
      route.fulfill({ json: { domain: 'alphasoftware.ai', status: 'available' } })
    );
    await page.locator('#searchBtn').click();

    // Verify results section is displayed
    await expect(page.locator('#resultsSection')).toHaveClass(/visible/);
    await expect(page.locator('#resultDomain')).toContainText('alphasoftware.ai');

    // Verify .ai pricing calculations: Porkbun is $69.00 on .ai
    const tableRows = page.locator('#priceTableBody tr');
    await expect(tableRows).toHaveCount(10);
    const porkbunRow = tableRows.filter({ hasText: 'Porkbun' });
    await expect(porkbunRow).toContainText('$69.00');

    // Test unlisted TLD like .pizza
    await domainInput.fill('greatest.pizza');
    await page.route('**/availability?domain=greatest.pizza', route => 
      route.fulfill({ json: { domain: 'greatest.pizza', status: 'available' } })
    );
    await page.locator('#searchBtn').click();
    await expect(page.locator('#resultDomain')).toContainText('greatest.pizza');
    // Unlisted TLD falls back gracefully to base pricing
    await expect(tableRows).toHaveCount(10);
  });

  test('2. Table Rate Matrix: renders 10 registrars and 14 TLD rows', async ({ page }) => {
    await page.goto('/domain-finder');

    // TLD Table Header: 10 registrars + Extension column = 11 th
    const headerCols = page.locator('#tldTableHead th');
    await expect(headerCols).toHaveCount(11);

    // TLD Table Body: 14 TLD rows (.com, .net, .org, .io, .co, .ai, .app, .xyz, .dev, .me, .tech, .online, .site, .store)
    const tldRows = page.locator('#tldTableBody tr');
    await expect(tldRows).toHaveCount(14);

    // Check .xyz row has low/high classes
    const xyzRow = tldRows.filter({ hasText: '.xyz' });
    await expect(xyzRow).toBeVisible();
    await expect(xyzRow.locator('.tld-low')).toBeVisible();
  });

  test('3. Sorting: Select dropdown & column headers sort renewal, transfer, rating, and register', async ({ page }) => {
    await page.route('**/availability?domain=*', route => 
      route.fulfill({ json: { domain: 'speedtest.com', status: 'available' } })
    );

    await page.goto('/domain-finder');
    await page.locator('#domainInput').fill('speedtest.com');
    await page.locator('#searchBtn').click();
    await expect(page.locator('#resultsSection')).toHaveClass(/visible/);

    // 3A. Sort by Renewal via #sortSelect
    const sortSelect = page.locator('#sortSelect');
    await sortSelect.selectOption('renewal');

    const renewalCells = await page.locator('#priceTableBody tr td:nth-child(3)').allTextContents();
    const renewalPrices = renewalCells.map(text => parseFloat(text.replace('$', '')));
    for (let i = 0; i < renewalPrices.length - 1; i++) {
      expect(renewalPrices[i]).toBeLessThanOrEqual(renewalPrices[i + 1]);
    }

    // 3B. Sort by Transfer via #sortSelect
    await sortSelect.selectOption('transfer');
    const transferCells = await page.locator('#priceTableBody tr td:nth-child(4)').allTextContents();
    const transferPrices = transferCells.map(text => parseFloat(text.replace('$', '')));
    for (let i = 0; i < transferPrices.length - 1; i++) {
      expect(transferPrices[i]).toBeLessThanOrEqual(transferPrices[i + 1]);
    }

    // 3C. Sort by Rating via #sortSelect
    await sortSelect.selectOption('rating');
    const ratingCells = await page.locator('#priceTableBody tr .rating-num').allTextContents();
    const ratings = ratingCells.map(text => parseFloat(text));
    for (let i = 0; i < ratings.length - 1; i++) {
      expect(ratings[i]).toBeLessThanOrEqual(ratings[i + 1]);
    }

    // 3D. Header Click Sorting: clicking "Renewal" column header
    const renewalTh = page.locator('th.sortable[data-col="renewal"]');
    await renewalTh.click();
    await expect(renewalTh).toHaveClass(/sort-asc/);

    // Click again to toggle desc
    await renewalTh.click();
    await expect(renewalTh).toHaveClass(/sort-desc/);
    const renewalDescCells = await page.locator('#priceTableBody tr td:nth-child(3)').allTextContents();
    const renewalDescPrices = renewalDescCells.map(text => parseFloat(text.replace('$', '')));
    for (let i = 0; i < renewalDescPrices.length - 1; i++) {
      expect(renewalDescPrices[i]).toBeGreaterThanOrEqual(renewalDescPrices[i + 1]);
    }

    // 3E. Header Click Sorting: clicking "Register (1yr)" column header
    const registerTh = page.locator('th.sortable[data-col="register"]');
    await registerTh.click();
    await expect(registerTh).toHaveClass(/sort-asc/);
  });

  test('4. View Toggle: switches cleanly between Table View and Cards View', async ({ page }) => {
    await page.route('**/availability?domain=*', route => 
      route.fulfill({ json: { domain: 'toggleview.com', status: 'available' } })
    );

    await page.goto('/domain-finder');
    await page.locator('#domainInput').fill('toggleview.com');
    await page.locator('#searchBtn').click();
    await expect(page.locator('#resultsSection')).toHaveClass(/visible/);

    const tableView = page.locator('#tableView');
    const cardsView = page.locator('#cardsView');
    const tableBtn = page.locator('#tableViewBtn');
    const cardBtn = page.locator('#cardViewBtn');

    // Default is Table View
    await expect(tableBtn).toHaveClass(/active/);
    await expect(tableView).toBeVisible();
    await expect(cardsView).not.toHaveClass(/visible/);

    // Switch to Card View
    await cardBtn.click();
    await expect(cardBtn).toHaveClass(/active/);
    await expect(tableBtn).not.toHaveClass(/active/);
    await expect(cardsView).toHaveClass(/visible/);
    await expect(cardsView.locator('.registrar-card')).toHaveCount(10);

    // Switch back to Table View
    await tableBtn.click();
    await expect(tableBtn).toHaveClass(/active/);
    await expect(tableView).toBeVisible();
  });

  test('5. Coupon Clipboard Copy: triggers toast, visual feedback, and handles fallback', async ({ page }) => {
    // Run search first so #featuresSection (coupons) is revealed
    await page.route('**/availability?domain=*', route => 
      route.fulfill({ json: { domain: 'coupontest.com', status: 'available' } })
    );

    await page.goto('/domain-finder');
    await page.locator('#domainInput').fill('coupontest.com');
    await page.locator('#searchBtn').click();
    await expect(page.locator('#resultsSection')).toHaveClass(/visible/);
    await expect(page.locator('#featuresSection')).toBeVisible();

    // Test coupon card copy button in the Coupons section
    const copyBtns = page.locator('.coupon-code-display .copy-btn');
    await expect(copyBtns.first()).toBeVisible();

    // Click the first coupon copy button
    const firstCode = await page.locator('.coupon-code-text').first().textContent();
    await copyBtns.first().click();

    // Toast should show
    const toast = page.locator('#toast');
    await expect(toast).toHaveClass(/show/);
    await expect(page.locator('#toastMsg')).toContainText(`Copied: ${firstCode?.trim()}`);

    // Verify clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(firstCode?.trim());

    // Test coupon chip inside search results
    const chip = page.locator('.coupon-chip[data-code="NEWCOM"]').first();
    if (await chip.isVisible()) {
      await chip.click();
      await expect(chip).toHaveClass(/copied/);
      await expect(toast).toHaveClass(/show/);
      await expect(page.locator('#toastMsg')).toContainText('Copied: NEWCOM');
    }

    // Adversarial: Test clipboard rejection fallback
    await page.evaluate(() => {
      navigator.clipboard.writeText = () => Promise.reject(new Error('Permission denied'));
    });
    await copyBtns.first().click();
    await expect(toast).toHaveClass(/show/);
    await expect(page.locator('#toastMsg')).toContainText('Copy manually');
  });

  test('6. Error States & Edge Cases: empty input, API failures, and taken domain suggestions', async ({ page }) => {
    await page.goto('/domain-finder');

    // 6A. Empty input search triggers shake animation
    const searchBox = page.locator('#searchBox');
    const domainInput = page.locator('#domainInput');
    await domainInput.fill('');
    await page.locator('#searchBtn').click();
    await expect(searchBox).toHaveClass(/shake/);
    await expect(page.locator('#resultsSection')).not.toHaveClass(/visible/);

    // 6B. API 500 error: degrades gracefully to 'unknown' status
    await page.route('**/availability?domain=brokenapi.com', route => 
      route.fulfill({ status: 500, body: 'Internal Server Error' })
    );
    await domainInput.fill('brokenapi.com');
    await page.locator('#searchBtn').click();

    await expect(page.locator('#availStatus')).toHaveClass(/unknown/);
    await expect(page.locator('#availStatus')).toContainText('Could not verify availability for brokenapi.com');
    // Results section and table still visible with comparison data
    await expect(page.locator('#resultsSection')).toHaveClass(/visible/);
    await expect(page.locator('#priceTableBody tr')).toHaveCount(10);

    // 6C. Taken domain: shows taken banner and alternative suggestions
    await page.route('**/availability?domain=takenbrand.com', route => 
      route.fulfill({ json: { domain: 'takenbrand.com', status: 'taken' } })
    );
    await domainInput.fill('takenbrand.com');
    await page.locator('#searchBtn').click();

    await expect(page.locator('#availStatus')).toHaveClass(/taken/);
    await expect(page.locator('#availStatus')).toContainText('takenbrand.com is already registered');
    
    // Suggestions chips (.net, .io, .co, .ai, .app, etc.)
    const suggestionChips = page.locator('.avail-sug-chip');
    await expect(suggestionChips).toHaveCount(5);
    await expect(suggestionChips.first()).toContainText('takenbrand');

    // Capture suggestion text before clicking
    const sugText = (await suggestionChips.first().textContent())?.trim() || '';
    expect(sugText.length).toBeGreaterThan(0);

    // Setup mock for suggestion domain
    await page.route(`**/availability?domain=${encodeURIComponent(sugText)}`, route => 
      route.fulfill({ json: { domain: sugText, status: 'available' } })
    );
    await suggestionChips.first().click();
    await expect(domainInput).toHaveValue(sugText);
    await expect(page.locator('#availStatus')).toHaveClass(/available/);
  });

});
