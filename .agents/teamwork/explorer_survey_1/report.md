# Domain Finder Comprehensive Survey & Redesign Architecture Report

**Survey Target:** `domain-finder.html`, `src/domain-finder.css`, `src/domain-finder.js`  
**Project:** SanzyAI Modern SaaS Redesign  
**Date:** 2026-10-17  
**Explorer:** Explorer 1 (Domain Finder Survey)  
**Status:** Complete Read-Only Survey & Architectural Blueprint  

---

## Executive Summary

The Domain Finder tool on SanzyAI currently functions as an interactive domain registrar price comparison utility that evaluates real-time domain availability and compares first-year, renewal, and transfer rates across 10 ICANN-accredited registrars (`Cloudflare`, `Porkbun`, `Spaceship`, `Namecheap`, `Hostinger`, `Dynadot`, `GoDaddy`, `IONOS`, `Squarespace`, `Name.com`) for 14 top-level domains (`.com`, `.net`, `.org`, `.io`, `.co`, `.ai`, `.app`, `.xyz`, `.dev`, `.me`, `.tech`, `.online`, `.site`, `.store`).

While the underlying price calculation logic, registrar links, availability checking via Cloudflare Workers API, and coupon clipping work effectively, the visual interface suffers from pronounced "AI-slop" visual patterns:
1. Fluorescent purple/cyan gradients (`linear-gradient(135deg, #6C35DE, #00D4FF)`).
2. Neon drop shadows and glowing pulse animations (`--shadow-purple`, `glow-pulse`).
3. Decorative radial backdrop blobs (`page-hero::before` ellipse).
4. Excessive glassmorphism (`backdrop-filter: blur(12px)` on TLD matrix).
5. Oversized pill radii (20px cards, 100px pill buttons) and playful bouncing icons (`trophy-bounce`).
6. Hyperbolic marketing phrasing ("Find Cheapest Domain Price Instantly", "Best Deal Found!").

This survey catalogs all visual elements to purge, details 100% of functional requirements to preserve, provides a grounded human editorial copy rewrite, and lays out a complete modern SaaS UI design architecture based on restrained slate/zinc neutral tones, 1px solid borders, 4px–8px radii, and a single controlled accent.

---

## 1. Visual Gimmicks & AI-Slop Purge Catalog

The following table catalogs every visual slop pattern currently present in `domain-finder.html` and `src/domain-finder.css` that must be completely eliminated:

| # | Component / Selector | Current Style / Pattern | Issue & Purge Action |
|---|---|---|---|
| **1** | `.page-hero::before` (`src/domain-finder.css:224-232`) | `width: 800px; height: 600px; background: radial-gradient(ellipse, rgba(108, 53, 222, 0.12), transparent 65%);` | **Backdrop Radial Blob**: Stereotypical AI-generated glowing blob behind hero. Remove completely. |
| **2** | `.gradient-text` (`src/domain-finder.css:69-74`, `domain-finder.html:114, 303`) | `background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;` | **Fluorescent Gradient Headings**: Applied to "Cheapest Domain" and "Comparison Chart". Replace with solid high-contrast neutral slate/zinc typography (`var(--text)`). |
| **3** | `--gradient-primary` (`src/domain-finder.css:28`) | `linear-gradient(135deg, #6C35DE, #00D4FF)` | **Buzzy Cyberpunk Gradient**: Remove definition and all references. |
| **4** | `--shadow-purple` & `.btn-glow` (`src/domain-finder.css:29, 107-120`) | `box-shadow: 0 0 18px rgba(108, 53, 222, 0.55), 0 0 36px rgba(108, 53, 222, 0.25); animation: glow-pulse 2.5s ease-in-out infinite;` | **Neon Glow & Pulsing**: Distracting gamer/crypto visual noise. Remove all neon shadows and keyframes. |
| **5** | `.hero-label` & `pulse-dot` (`src/domain-finder.css:242-270`, `domain-finder.html:112`) | `border-radius: 100px;` with `::before` dot animating `pulse-dot 2s infinite` | **Pulsing Indicator Pill**: Replace with a clean, static, compact metadata tag (`4px` radius, subtle neutral border). |
| **6** | `.search-box` (`src/domain-finder.css:298-308`, `domain-finder.html:121`) | `border-radius: var(--radius-lg); box-shadow: 0 8px 40px rgba(108, 53, 222, 0.15);` | **Oversized Floating Pill**: 20px radius bubble with purple shadow. Replace with a sharp, high-density utility search input (`6px-8px` radius, subtle 1px border, zero colored glow). |
| **7** | `.tld-pill` (`src/domain-finder.css:393-417`, `domain-finder.html:140-148`) | `border-radius: 100px; padding: 6px 14px;` | **Floating Pill Badges**: Replace with compact rectangular segmented selector chips (`4px-6px` radius). |
| **8** | `.best-deal-banner` & `.best-deal-trophy` (`src/domain-finder.css:456-484`, `domain-finder.html:168-183`) | `border-radius: var(--radius-lg); background: linear-gradient(...); animation: trophy-bounce 2s ease-in-out infinite;` | **Gamified Casino Banner**: Bouncing trophy icon and green gradient card. Replace with a disciplined registrar recommendation card featuring clear cost metrics. |
| **9** | `.tld-table-wrap` (`src/domain-finder.css:1194-1202`) | `background: rgba(22, 22, 31, 0.4); backdrop-filter: blur(12px); box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);` | **Glassmorphism Layer**: Frosty blur layer. Replace with clean, solid data container with crisp `1px solid var(--border)`. |
| **10** | Table Head Gradients (`src/domain-finder.css:602, 1213`) | `.price-table thead` and `.tld-table thead` using `linear-gradient(135deg, rgba(108, 53, 222, 0.15), rgba(0, 212, 255, 0.05))` | **Gradient Table Headers**: Replace with a solid neutral surface tint (`var(--surface-raised)` or `#0F172A`/`#F8FAFC`). |
| **11** | `.registrar-card::after` (`src/domain-finder.css:833-848`) | Top border gradient sweep line on card hover | **Decorative Animated Accent Line**: Purge in favor of clean 1px border color transition (`border-color: var(--border-hover)`). |
| **12** | `.coupon-item` Ticket Cutouts (`src/domain-finder.css:1106-1125`) | Semicircle punch hole illusions using `::before` and `::after` with negative absolute positioning | **Novelty Ticket Gimmick**: Replace with a structured tabular code row or compact coupon tile. |
| **13** | Bubble Radii (`src/domain-finder.css:34`) | `--radius-lg: 20px;` used on tables, cards, notices, banners | **Excessive Curvature**: Enforce strict design system rule: Maximum `8px` radius on containers/cards, `6px` on controls, `4px` on badges. |

---

## 2. Functional Matrix: Preservation Catalog

All interactive capabilities, DOM node IDs, classes, event handlers, and data structures must remain 100% functional. Below is the complete preservation map:

### A. Critical DOM Element IDs & Attribute Contracts

| DOM ID | Element Type | Critical Attributes / Children | Functionality & Test Dependencies |
|---|---|---|---|
| `#domainInput` | `<input type="text">` | `id="domainInput"`, `placeholder`, `autocomplete="off"` | Core search input. Tested by `tests/journeys.spec.js`: `page.locator('#domainInput').fill('exampletest')` and assertion `toHaveValue('exampletest.com')`. Restores from `sessionStorage('sanzy_domain_last_search')`. |
| `#searchBtn` | `<button type="button">` | `id="searchBtn"`, children `.btn-text`, `.spinner` | Primary search trigger. Tested by `tests/journeys.spec.js`: `page.locator('#searchBtn').click()`. Receives `.loading` class during async DNS lookup. |
| `#searchBox` | `<div>` | `id="searchBox"` | Input container targeted by `shakeInput()` when the user attempts an empty search. |
| `#tldPills` | `<div>` | `id="tldPills"`, children `.tld-pill[data-tld]` | Quick TLD selector. Event delegation listens on `#tldPills` for click on `[data-tld]`, calls `window.selectTLD()`. Active pill retains `.active`. |
| `#loadingBar` | `<div>` | `id="loadingBar"`, child `.loading-bar-fill` | Visual progress indicator during availability API query. Toggled with `.active` class. |
| `#resultsSection` | `<section>` | `id="resultsSection"` | Results wrapper. Tested by `tests/journeys.spec.js`: `expect(page.locator('#resultsSection')).toBeVisible()`. Display toggled via `.visible` class. |
| `#bestDealBanner` | `<div>` | `id="bestDealBanner"` | Top recommendation highlight. Contains `#bestDealPrice`, `#bestDealName`, `#bestDealSub`, `#bestDealBtn`. Hidden when availability is `'taken'`. |
| `#bestDealPrice` | `<div>` | `id="bestDealPrice"` | Injected with `$X.XX<span>/year</span>`. |
| `#bestDealName` | `<div>` | `id="bestDealName"` | Injected with registrar name and TLD context: `${best.name} — Best for ${tld} domains`. |
| `#bestDealSub` | `<p>` | `id="bestDealSub"` | Injected with comparative savings text. |
| `#bestDealBtn` | `<a>` | `id="bestDealBtn"`, `target="_blank"`, `rel="noopener sponsored"` | Dynamic affiliate CTA linking to `getRegistrarSearchLink(best, domain)`. Clicks trigger `showToast('Opening registrar checkout...')`. |
| `#availStatus` | `<div>` | `id="availStatus"` | Real-time DNS status container. Receives classes: `.avail-status.available`, `.avail-status.taken`, `.avail-status.checking`, `.avail-status.unknown`. When taken, renders suggestion chips with `data-action="try-suggestion"`. |
| `#comparisonContainer` | `<div>` | `id="comparisonContainer"` | Wraps registrar comparison controls, table, cards, and affiliate notice. Hidden when domain is `'taken'`. |
| `#resultCount` | `<span>` | `id="resultCount"` | Injected with count of active registrars (e.g. `10`). |
| `#resultDomain` | `<span>` | `id="resultDomain"` | Tested by `tests/journeys.spec.js`: `expect(page.locator('#resultDomain')).toContainText('exampletest.com')`. |
| `#sortSelect` | `<select>` | `id="sortSelect"`, options `register`, `renewal`, `transfer`, `rating`, `name` | Dropdown sorting. Triggers `window.sortTable()`. |
| `#tableViewBtn` | `<button type="button">` | `id="tableViewBtn"` | Switches to table layout. Receives `.active`. |
| `#cardViewBtn` | `<button type="button">` | `id="cardViewBtn"` | Switches to grid card layout. Receives `.active`. |
| `#tableView` | `<div>` | `id="tableView"` | Container for table view. Toggled `display: block` / `none`. |
| `#priceTable` | `<table>` | `id="priceTable"`, thead headers with `.sortable[data-col]` | Main comparison table. Headers trigger `window.sortByCol(col)`. |
| `#priceTableBody` | `<tbody>` | `id="priceTableBody"` | Dynamic comparison rows. Tested by `tests/journeys.spec.js`: `expect(page.locator('#priceTableBody tr').first()).toBeVisible()`. |
| `#cardsView` | `<div>` | `id="cardsView"` | Container for card layout. Toggled via `.visible` class. |
| `#featuresSection` | `<section>` | `id="featuresSection"` | Houses coupon codes. Hidden during taken state; revealed when domain is available. |
| `#couponGrid` | `<div>` | `id="couponGrid"` | Populated by `renderCoupons()`. Items have `data-action="copy-code"` buttons. |
| `#tldTable` | `<table>` | `id="tldTable"` | Global TLD comparison table. Contains `#tldTableHead` and `#tldTableBody`. |
| `#tldTableHead` | `<tr>` | `id="tldTableHead"` | Populated with registrar column headers by `renderTLDTable()`. |
| `#tldTableBody` | `<tbody>` | `id="tldTableBody"` | Populated with 14 TLD price comparison rows by `renderTLDTable()`. |
| `#toast` | `<div>` | `id="toast"`, children `#toastIcon`, `#toastMsg` | Toast notification triggered by `window.showToast()`. |
| `#navbar` / `#hamburger` / `#mobileMenu` | `<nav>` / `<button>` / `<div>` | `id="navbar"`, `id="hamburger"`, `id="mobileMenu"` | Navigation & mobile menu. Required by global scripts and `tests/phase1.spec.js`. |
| `#main-content` | `<main>` | `id="main-content"`, `tabindex="-1"` | Target of `.skip-link` for WCAG keyboard accessibility. |

### B. JavaScript State & Data Integrity

The following variables in `src/domain-finder.js` drive all calculations:
- `registrars`: 10 objects (`cloudflare`, `porkbun`, `spaceship`, `namecheap`, `hostinger`, `dynadot`, `godaddy`, `ionos`, `squarespace`, `namedotcom`).
- `tldData`: 14 rows across 10 registrars with verified April 2026 baseline rates.
- `coupons`: 6 active coupon records.
- `currentDomain`, `currentTLD`, `currentSort`, `currentView`, `tableData`, `currentAvailStatus`.
- `sessionStorage` key: `sanzy_domain_last_search`.

### C. Logic Pipelines to Retain Verbatim
1. **TLD-Aware Pricing Engine (`getAdjustedRegistrars`)**:
   - Accurately adjusts prices when the user types different TLDs (e.g. `.ai` or `.io`), recalculates renewal and transfer rates proportionally, and suppresses `.com`-only promo notes on non-promotional extensions.
2. **Availability Check API (`checkDomainAvailability`)**:
   - Queries `https://domain-price-api.prem736raj.workers.dev/availability?domain=...` with a 6-second timeout.
   - Handles `available`, `taken`, and `unknown` responses gracefully.
3. **Alternative TLD Generator**:
   - When a domain is taken, automatically synthesizes 5 alternative extensions (`.net`, `.io`, `.co`, `.ai`, `.app`, `.xyz`) with interactive chips.
4. **Registrar Direct Search Links (`getRegistrarSearchLink`)**:
   - Deep links directly to each registrar's domain registration search URL with prefilled query parameters.
5. **Dynamic Column Sorting (`sortTableData` & `sortByCol`)**:
   - Supports bi-directional sorting across price columns, ratings, and alphabetical names.

---

## 3. Content De-Hype & Human Editorial Voice Catalog

All hyperbolic, generic, and marketing-heavy copy must be rewritten into direct, understated, practical engineering language:

| Location in DOM | Current Text | Proposed Human Editorial Copy | Editorial Rationale |
|---|---|---|---|
| `<title>` (line 8) | `Compare Domain Prices - Find Cheapest Registrar \| SanzyAI` | `Domain Registrar Price Comparison — Compare TLD Registration & Renewal Rates \| SanzyAI` | Replaces search-engine buzzwords with professional tool positioning. |
| `<meta name="description">` (line 9) | `Compare domain prices from 10+ registrars instantly. Find the cheapest .com, .io, .ai domains with SanzyAI's domain price comparison tool.` | `Compare first-year registration, renewal, and transfer rates across 10 ICANN-accredited domain registrars for .com, .io, .ai, and standard extensions.` | Specific, factual, highlights total cost of ownership. |
| Hero Badge (line 112) | `Domain Price Comparison Tool` | `Registrar Rate Intelligence` | Restrained metadata taxonomy. |
| Hero `<h1>` (line 114) | `Find <span class="gradient-text">Cheapest Domain</span> Price Instantly` | `<h1>Compare real domain registration and renewal costs</h1>` | Purges fluorescent gradient span and "instantly" marketing hype. |
| Hero Paragraph (line 116) | `Compare prices from 10+ registrars in seconds. Save money on your next domain registration, renewal, or transfer.` | `Transparent pricing across 10 major registrars. Compare upfront promotional discounts against standard renewal rates before registering.` | Addresses the real customer problem: first-year discounts concealing high renewal costs. |
| Hero Disclaimer (line 117) | `Prices are estimates and may change on registrar checkout pages.` | `Rates audited April 2026. Final checkout totals may vary with local taxes and ICANN fees.` | Authoritative timestamp and technical accuracy. |
| Search Button (line 132) | `Compare Prices` | `Check Rates` | Concise utility action. |
| Best Deal Header (line 172) | `Best Deal Found!` | `Lowest First-Year Registration` | Objective statement rather than excitement-inflected marketing exclamation. |
| Best Deal Subtitle (line 173) | `Cheapest registration price across all registrars` | `Lowest upfront cost for this extension across surveyed registrars` | Fact-based description. |
| Best Deal Button (line 180) | `Get This Deal →` | `Register at [Registrar] →` (dynamically set in JS) | Direct, honest outbound destination label. |
| Price Disclaimer (lines 193-196) | `Price Disclaimer: Prices shown are approximate and may vary. Always verify the final price on the registrar's website before purchasing...` | `Pricing Notice: Promotional pricing is frequently limited to the initial billing cycle. Verify multi-year renewals and ICANN registry fees at checkout.` | Clear educational notice. |
| Affiliate Notice (lines 257-261) | `Affiliate Disclosure: SanzyAI earns a commission when you purchase through our links. This does not affect our price comparison accuracy or editorial independence...` | `Editorial Disclosure: SanzyAI may receive referral compensation from select registrars. Comparison tables are populated objectively based on published registrar price schedules.` | Professional corporate compliance language. |
| Coupons Title (line 278) | `Working Coupon Codes` | `Verified Registrar Promo Codes` | Eliminates coupon-scraper aesthetic. |
| Coupons Subtitle (line 279) | `Click any code to copy it. Always verify on registrar site before using.` | `Active discount codes verified for new registrations and portfolio transfers.` | Clear utility scope. |
| TLD Table Title (line 302-304) | `TLD Price <span class="gradient-text">Comparison Chart</span>` | `<h2>Standard Annual TLD Rate Matrix</h2>` | Clean editorial header without gradient text. |
| TLD Table Subtitle (line 305) | `Compare registration prices across popular domain extensions from top registrars` | `Baseline annual registration costs across 14 extensions and 10 registrars.` | Direct data description. |

---

## 4. UI Architecture & Design System Specification

### A. Design Tokens & Color System

The redesigned interface will adopt a restrained neutral foundation adhering to modern SaaS best practices:

```css
/* Modern SaaS Utility Theme Tokens */
:root {
    /* Neutral Foundation (Slate / Zinc scale) */
    --df-canvas: #090D16;            /* Background canvas */
    --df-surface: #111827;           /* Main card / table surface */
    --df-surface-raised: #1F2937;    /* Secondary / hover surface */
    --df-surface-subtle: #172033;    /* Subtle striping */
    --df-border: #1E293B;            /* Strict 1px structural border */
    --df-border-subtle: #162032;     /* Divider border */
    --df-border-focus: #38BDF8;      /* Precise focus ring */
    
    /* Typography */
    --df-text-primary: #F8FAFC;      /* High-contrast headings & data */
    --df-text-muted: #94A3B8;        /* Body & descriptive notes */
    --df-text-dim: #64748B;          /* Metadata & table labels */
    
    /* Single Controlled Accent */
    --df-accent: #3B82F6;            /* Blue-500: used solely for active state & primary CTA */
    --df-accent-hover: #2563EB;      /* Blue-600 */
    --df-accent-subtle: rgba(59, 130, 246, 0.1);
    
    /* Functional Status (Restrained, Non-Neon) */
    --df-status-success-bg: rgba(16, 185, 129, 0.08);
    --df-status-success-border: rgba(16, 185, 129, 0.25);
    --df-status-success-text: #34D399; /* Calm Emerald */
    
    --df-status-danger-bg: rgba(239, 68, 68, 0.08);
    --df-status-danger-border: rgba(239, 68, 68, 0.25);
    --df-status-danger-text: #F87171;  /* Soft Rose */
    
    --df-status-warning-bg: rgba(245, 158, 11, 0.08);
    --df-status-warning-border: rgba(245, 158, 11, 0.25);
    --df-status-warning-text: #FBBF24; /* Amber */
    
    /* Geometry Constraints */
    --df-radius-sm: 4px;             /* Badges, tags, code chips */
    --df-radius-md: 6px;             /* Buttons, inputs, segmented controls */
    --df-radius-lg: 8px;             /* Card containers, tables (MAX 8px) */
    
    /* Elevation */
    --df-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px -1px rgba(0, 0, 0, 0.15);
}

/* Light Mode Overrides */
html.light-mode {
    --df-canvas: #F8FAFC;
    --df-surface: #FFFFFF;
    --df-surface-raised: #F1F5F9;
    --df-surface-subtle: #F8FAFC;
    --df-border: #E2E8F0;
    --df-border-subtle: #EDF2F7;
    --df-border-focus: #2563EB;
    
    --df-text-primary: #0F172A;
    --df-text-muted: #475569;
    --df-text-dim: #94A3B8;
    
    --df-accent: #2563EB;
    --df-accent-hover: #1D4ED8;
    --df-accent-subtle: rgba(37, 99, 235, 0.06);
    
    --df-status-success-bg: #ECFDF5;
    --df-status-success-border: #A7F3D0;
    --df-status-success-text: #059669;
    
    --df-status-danger-bg: #FEF2F2;
    --df-status-danger-border: #FECACA;
    --df-status-danger-text: #DC2626;
    
    --df-status-warning-bg: #FFFBEB;
    --df-status-warning-border: #FDE68A;
    --df-status-warning-text: #D97706;
}
```

### B. High-Density Utility Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│ NAVBAR: SanzyAI Logo | Domain Finder (active) | AI Tools | Store ...   │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ HERO / SEARCH CONSOLE                                                  │
│  [Badge: Registrar Rate Intelligence]                                 │
│  H1: Compare real domain registration and renewal costs               │
│  Sub: Transparent pricing across 10 major registrars.                  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ [Search Icon] [ domainInput: example.com ]     [ Check RatesBtn ]│  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  TLD Quick Select: [.com] [.net] [.org] [.io] [.co] [.ai] [.app]       │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ AVAILABILITY & RECOMMENDATION BAR (#availStatus & #bestDealBanner)     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Status: [● Available] exampletest.com                            │  │
│  │ Lowest initial rate: Spaceship ($10.28/yr) | Renews: $12.28/yr   │  │
│  │ [Register at Spaceship →]                                        │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ COMPARISON CONTROLS (#comparisonContainer)                             │
│  Showing 10 registrars for exampletest.com   [Sort: Register ▼] [≡][⊞] │
├────────────────────────────────────────────────────────────────────────┤
│ REGISTRAR COMPARISON MATRIX (#priceTable)                              │
│  Registrar    Register (1yr)    Renewal      Transfer   Rating  Action │
│  ────────────────────────────────────────────────────────────────────  │
│  Spaceship    $10.28 [Lowest]   $12.28       $10.28     4.4/5   [Buy →]│
│  Cloudflare   $10.44            $10.44       $10.44     4.7/5   [Buy →]│
│  Namecheap    $9.58 (promo)     $14.78       $9.58      4.5/5   [Buy →]│
│  Porkbun      $11.08            $11.08       $10.18     4.6/5   [Buy →]│
│  IONOS        $1.00 (1st yr)    $20.00       $10.00     4.0/5   [Buy →]│
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ VERIFIED REGISTRAR PROMO CODES (#featuresSection)                      │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐  │
│  │ GoDaddy: 30% OFF   │ │ Namecheap: 40% OFF │ │ Hostinger: 20% OFF │  │
│  │ [GDDY30] [Copy]    │ │ [NEWCOM] [Copy]    │ │ [HOSTIN20] [Copy]  │  │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ COMPREHENSIVE TLD PRICING MATRIX (#tldSection)                         │
│  Extension  Avg Price  Cloudflare  Porkbun  Spaceship  Namecheap ...   │
│  .com       $11.50     $10.44      $11.08   $10.28     $9.58           │
│  .io        $45.00     $45.00      $51.80   $39.88     $33.23          │
│  .ai        $80.00     $79.15      $69.00   $72.88     $69.98          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Quality Gate & Risk Analysis

The redesign must pass all verification scripts specified in `package.json`:

1. **`npm run check:inline-handlers`**:
   - **Requirement**: Zero occurrences of `/\son[a-z]+\s*=\s*["']/i`.
   - **Verification**: Verified clean. No inline event attributes (`onclick`, `onchange`, etc.) will be introduced into `domain-finder.html` or generated via template literals in `domain-finder.js`.

2. **`npm run validate:html`**:
   - **Requirement**: Full compliance with `.htmlvalidate.json`.
   - **Verification**: Verified passing. Strict compliance with tag closing, attribute formatting, and semantic nesting.

3. **`npm run validate:structured-data`**:
   - **Requirement**: Valid JSON-LD schema matching canonical URL.
   - **Verification**: The existing `<script type="application/ld+json">` block for `WebApplication` pointing to `https://sanzyai.com/domain-finder` is preserved.

4. **`npm run check:routes`**:
   - **Requirement**: All internal anchor tags resolve to existing HTML files.
   - **Verification**: All navigation links (`/`, `/domain-finder`, `/ai-tools`, `/prompt-store`, `/ai-services`, `/learn-free`, `/blog`, `/about`, `/contact`, `/privacy-policy`, `/terms-of-service`, `/refund-policy`, `/affiliate-disclosure`) are verified as valid routes.

5. **`npm run test:performance`**:
   - **Requirement**: Image tags must have `width`, `height`, `decoding="async"`, and `loading="(eager|lazy)"`. Initial JS graphs must not pull heavy optional modules (`pdf-export`, `html2canvas`, `chat`).
   - **Verification**: Logo images retain `width="28" height="28" decoding="async" loading="eager"`. No external heavy libraries are introduced.

6. **Playwright Journeys Test (`tests/journeys.spec.js:41-50`)**:
   - **Requirement**: 
     - Navigates to `/domain-finder`.
     - Fills `#domainInput` with `'exampletest'`.
     - Clicks `#searchBtn`.
     - Asserts `#domainInput` has value `'exampletest.com'`.
     - Asserts `#resultsSection` is visible.
     - Asserts `#resultDomain` contains `'exampletest.com'`.
     - Asserts `#priceTableBody tr` first child is visible.
   - **Verification**: All tested selectors, IDs, and classes are preserved verbatim in the new architecture.

7. **Phase 1 Test Suite (`tests/phase1.spec.js`)**:
   - **Requirement**: Critical page tests check `h1.first()` visibility, `#siteControls` presence, and `#hamburger` mobile menu expansion and dismissal via Escape key.
   - **Verification**: Preserved intact.

---

## 6. Implementation Action Plan for Phase 2

1. **HTML Refactor (`domain-finder.html`)**:
   - Clean up hero markup: replace gradient text and pulsing dot with high-contrast text and a clean metadata badge.
   - Restructure search box and quick select buttons with disciplined utility classes.
   - Modernize the Best Deal banner into an informative recommendation bar.
   - Maintain all existing DOM IDs and ARIA tags.
   - Zero inline event handlers.

2. **CSS Overhaul (`src/domain-finder.css`)**:
   - Replace neon color variables and purple glow shadows with slate/zinc theme tokens.
   - Remove backdrop radial gradients, glow pulse keyframes, and glassmorphic blurs.
   - Re-architect tables (`#priceTable` and `#tldTable`) with spreadsheet-grade density, 1px solid borders, and tabular figures.
   - Re-style coupon cards and view toggles with clean 6px–8px radii.
   - Maintain desktop and mobile responsiveness.

3. **JS Refinement (`src/domain-finder.js`)**:
   - Retain 100% of state logic, TLD adjustments, DNS availability checks, and clipboard helpers.
   - Ensure rendered HTML strings output clean modern markup with zero inline handlers.
