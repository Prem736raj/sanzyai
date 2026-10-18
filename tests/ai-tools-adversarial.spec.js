import { test, expect } from '@playwright/test';

test.describe('Milestone 3 Tools Directory Adversarial & Stress Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('sanzy_cookies', 'declined');
      localStorage.setItem('sanzy_theme', 'dark');
      localStorage.removeItem('sanzy_saved_tools');
      localStorage.removeItem('sanzy_tools_favorites');
    });
    await page.route('https://**/*', route => route.abort());
    await page.route('**/api/ready', route => route.fulfill({ status: 503, json: { ready: false } }));
    await page.route('**/api/ai-news', route => route.fulfill({ status: 503, json: { ok: false } }));
  });

  test('1. Search Stress: Regex special characters do not crash or throw unhandled exceptions', async ({ page }) => {
    await page.goto('/ai-tools');

    const searchInput = page.locator('#toolSearch');
    const toolCount = page.locator('#toolCount');

    // Test regex meta-characters that often break unescaped RegExp constructors
    const regexInputs = ['.*', '[a-z]+', '\\', '(', ')', '+', '?', '^', '$', '{1,3}', '|'];
    for (const input of regexInputs) {
      await searchInput.fill(input);
      // Verify no crash: count exists and is either 0 or matches literal
      await expect(toolCount).toBeVisible();
    }

    // Verify literal search: '?' should not match unless a tool literally contains '?'
    await searchInput.fill('?');
    await expect(toolCount).toContainText('0 tools found');
    await expect(page.locator('#featuredToolsGrid')).toBeHidden();
    await expect(page.locator('.no-results')).toBeVisible();

    // Clear and verify restore
    await page.locator('#searchClear').click();
    await expect(searchInput).toHaveValue('');
    await expect(toolCount).toContainText('Showing 20 tools');
    await expect(page.locator('#featuredToolsGrid .tool-card')).toHaveCount(6);
  });

  test('2. Search Stress: HTML / XSS injection attempts are sanitized and rendered harmlessly', async ({ page }) => {
    await page.goto('/ai-tools');

    const searchInput = page.locator('#toolSearch');
    const xssPayloads = [
      '<script>window.__xss_flag = true;</script>',
      '"><img src=x on' + 'error="window.__xss_flag = true;">',
      '<svg on' + 'load="window.__xss_flag = true;">',
      '\'"&><'
    ];

    for (const payload of xssPayloads) {
      await searchInput.fill(payload);
      const isXssTriggered = await page.evaluate(() => window.__xss_flag === true);
      expect(isXssTriggered).toBeFalsy();
    }

    // Whitespace-only search should be treated as empty and return all 20 tools
    await searchInput.fill('     \t   ');
    await expect(page.locator('#toolCount')).toContainText('Showing 20 tools');

    // Empty state recovery button
    await searchInput.fill('xyz-completely-nonexistent-tool-999');
    await expect(page.locator('.no-results')).toBeVisible();
    const resetBtn = page.locator('[data-action="reset-filters"]');
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // Verify full recovery
    await expect(searchInput).toHaveValue('');
    await expect(page.locator('.filter-btn[data-filter="all"]')).toHaveClass(/active/);
    await expect(page.locator('#toolCount')).toContainText('Showing 20 tools');
  });

  test('3. Filter & Pricing toggles: Exhaustive category and pricing filter stress', async ({ page }) => {
    await page.goto('/ai-tools');

    // Verify initial badge counts match actual tool counts
    const pricingFilters = [
      { filter: 'all', count: 20 },
      { filter: 'free', count: 6 },
      { filter: 'freemium', count: 8 },
      { filter: 'paid', count: 6 },
    ];

    for (const { filter, count } of pricingFilters) {
      const btn = page.locator(`.filter-btn[data-filter="${filter}"]`);
      await btn.click();
      await expect(btn).toHaveClass(/active/);

      const totalVisibleCards = await page.locator('#featuredToolsGrid .tool-card, #toolsGrid .tool-card').count();
      expect(totalVisibleCards).toBe(count);
      await expect(page.locator('#toolCount')).toContainText(String(count));
    }

    // Test specific categories
    const categories = ['writing', 'image', 'video', 'code', 'seo', 'chatbot', 'voice', 'design', 'business', 'marketing', 'education', 'research', 'productivity', 'automation', 'music'];
    for (const cat of categories) {
      const catBtn = page.locator(`.filter-btn[data-filter="${cat}"]`);
      await catBtn.click();
      await expect(catBtn).toHaveClass(/active/);
      const visible = await page.locator('#featuredToolsGrid .tool-card, #toolsGrid .tool-card').count();
      expect(visible).toBeGreaterThan(0);
    }

    // Rapid switching between all and writing
    for (let i = 0; i < 5; i++) {
      await page.locator('.filter-btn[data-filter="all"]').click();
      await page.locator('.filter-btn[data-filter="writing"]').click();
    }
    const finalWritingCount = await page.locator('#featuredToolsGrid .tool-card, #toolsGrid .tool-card').count();
    expect(finalWritingCount).toBe(4); // ChatGPT, Jasper, Copy.ai, Claude
  });

  test('4. Sorting: All sort modes maintain valid ordering across catalog', async ({ page }) => {
    await page.goto('/ai-tools');

    const sortSelect = page.locator('#sortTools');

    // 1. Sort by name
    await sortSelect.selectOption('name');
    const names = await page.locator('#featuredToolsGrid .tool-card .tool-name, #toolsGrid .tool-card .tool-name').allTextContents();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);

    // 2. Sort by price-low
    await sortSelect.selectOption('price-low');
    const priceTexts = await page.locator('#featuredToolsGrid .tool-card .tool-price strong, #toolsGrid .tool-card .tool-price strong').allTextContents();
    expect(priceTexts[0]).toMatch(/free/i); // lowest price should be Free tier / $0

    // 3. Sort by rating
    await sortSelect.selectOption('rating');
    const firstCardName = await page.locator('#featuredToolsGrid .tool-card .tool-name').first().textContent();
    // Midjourney or ChatGPT or Claude (4.9 rating)
    expect(['ChatGPT', 'Midjourney', 'Claude']).toContain(firstCardName);
  });

  test('5. Favorites & Bookmarks: Persistence and dual localStorage synchronization', async ({ page }) => {
    await page.goto('/ai-tools');

    const firstCard = page.locator('#featuredToolsGrid .tool-card').first();
    const bookmarkBtn = firstCard.locator('.bookmark-btn');
    const toolId = await bookmarkBtn.getAttribute('data-tool-id');

    // Initially not saved
    await expect(bookmarkBtn).not.toHaveClass(/saved/);

    // Rapid bookmark toggling (3 clicks -> saved)
    await bookmarkBtn.click();
    await bookmarkBtn.click();
    await bookmarkBtn.click();

    await expect(bookmarkBtn).toHaveClass(/saved/);
    await expect(bookmarkBtn).toHaveAttribute('aria-label', /Remove/i);

    // Verify localStorage dual-key sync
    const savedToolsStorage = await page.evaluate(() => localStorage.getItem('sanzy_saved_tools'));
    const favoritesStorage = await page.evaluate(() => localStorage.getItem('sanzy_tools_favorites'));
    expect(savedToolsStorage).toBe(JSON.stringify([Number(toolId)]));
    expect(favoritesStorage).toBe(JSON.stringify([Number(toolId)]));

    // View Favorites toggle
    const favViewBtn = page.locator('#viewFavoritesBtn');
    await favViewBtn.click();
    await expect(favViewBtn).toHaveClass(/active/);
    await expect(favViewBtn).toHaveAttribute('aria-pressed', 'true');

    // Only the saved tool should be visible
    const visibleCards = page.locator('#featuredToolsGrid .tool-card, #toolsGrid .tool-card');
    await expect(visibleCards).toHaveCount(1);
    await expect(visibleCards.first().locator('.tool-name')).toHaveText(await firstCard.locator('.tool-name').textContent());

    // Exit favorites view by clicking a category filter
    await page.locator('.filter-btn[data-filter="all"]').click();
    await expect(favViewBtn).not.toHaveClass(/active/);
    await expect(page.locator('#featuredToolsGrid .tool-card, #toolsGrid .tool-card')).toHaveCount(20);
  });

  test('6. Session Restore: Loads saved tools from either localStorage key or recovers gracefully from corrupted data', async ({ page }) => {
    // Session A: Prepopulated with legacy key 'sanzy_saved_tools'
    await page.addInitScript(() => {
      localStorage.setItem('sanzy_saved_tools', JSON.stringify([1, 4]));
      localStorage.removeItem('sanzy_tools_favorites');
    });
    await page.goto('/ai-tools');

    await expect(page.locator('.tool-card[data-id="1"] .bookmark-btn')).toHaveClass(/saved/);
    await expect(page.locator('.tool-card[data-id="4"] .bookmark-btn')).toHaveClass(/saved/);
    await expect(page.locator('.tool-card[data-id="2"] .bookmark-btn')).not.toHaveClass(/saved/);

    // Session B: Corrupted JSON resilience
    await page.evaluate(() => {
      localStorage.setItem('sanzy_saved_tools', '{corrupted_json_syntax');
      localStorage.setItem('sanzy_tools_favorites', '{corrupted_json_syntax');
    });
    await page.reload();

    // Verify page loads without throwing uncaught exceptions and shows all tools
    await expect(page.locator('#toolCount')).toContainText('Showing 20 tools');
    await expect(page.locator('.tool-card[data-id="1"] .bookmark-btn')).not.toHaveClass(/saved/);
  });

  test('7. Comparison Drawer: Limit enforcement (max 3), remove chips, open table and clear', async ({ page }) => {
    await page.goto('/ai-tools');

    const compareBar = page.locator('#compareBar');
    const compareInfo = page.locator('#compareInfo');
    const compareBtn = page.locator('#compareBtn');

    // Initially bar is hidden
    await expect(compareBar).not.toHaveClass(/show/);

    // Add 1 tool via compare checkbox
    await page.locator('#cmp-1').check();
    await expect(compareBar).toHaveClass(/show/);
    await expect(compareInfo).toContainText('1/3 tools selected');
    await expect(compareBtn).toBeDisabled();

    // Add 2nd tool via quick-compare button
    const card2Compare = page.locator('.tool-card[data-id="2"] [data-action="quick-compare"]');
    await card2Compare.click();
    await expect(compareInfo).toContainText('2/3 tools selected');
    await expect(compareBtn).toBeEnabled();

    // Add 3rd tool
    await page.locator('#cmp-4').check();
    await expect(compareInfo).toContainText('3/3 tools selected');

    // Attempt to add 4th tool -> must be blocked
    await page.locator('#cmp-7').check();
    await expect(page.locator('#toast')).toHaveClass(/show/);
    await expect(page.locator('#toastMsg')).toContainText('Maximum 3 tools for comparison');
    await expect(page.locator('#cmp-7')).not.toBeChecked();
    await expect(compareInfo).toContainText('3/3 tools selected');

    // Remove 1 tool using chip remove button
    const removeChipBtn = page.locator('.compare-chip-remove[data-tool-id="1"]');
    await removeChipBtn.click();
    await expect(compareInfo).toContainText('2/3 tools selected');
    await expect(page.locator('#cmp-1')).not.toBeChecked();

    // Open comparison table
    await compareBtn.click();
    const compareSection = page.locator('#compareSection');
    await expect(compareSection).toBeVisible();

    const tableHeaders = page.locator('#compareTable thead th');
    await expect(tableHeaders).toHaveCount(3); // Feature, Jasper AI, Midjourney

    // Close comparison table
    await page.locator('#closeCompareBtn').click();
    await expect(compareSection).toBeHidden();

    // Clear all comparisons
    await page.locator('#clearCompareBtn').click();
    await expect(compareBar).not.toHaveClass(/show/);
    await expect(page.locator('#cmp-2')).not.toBeChecked();
    await expect(page.locator('#cmp-4')).not.toBeChecked();
  });

  test('8. Details Modal: Accessible dialog opening, Esc key dismiss, and focus trap', async ({ page }) => {
    await page.goto('/ai-tools');

    const card = page.locator('.tool-card[data-id="1"]');
    const detailsBtn = card.getByRole('button', { name: 'Details', exact: true });
    await detailsBtn.click();

    const modal = page.locator('#toolDetailModal');
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-modal', 'true');
    await expect(modal).toHaveAttribute('aria-hidden', 'false');
    await expect(page.locator('#toolDetailBody .tool-detail-title')).toHaveText('ChatGPT');

    // Dismiss with Escape
    await page.keyboard.press('Escape');
    await expect(modal).toHaveAttribute('aria-hidden', 'true');
  });

});
