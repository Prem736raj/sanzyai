# Project: SanzyAI Modern SaaS Redesign & Aesthetic De-Slop

## Architecture
- **Framework**: Vite Multi-Page Application (MPA). Root `*.html` files are page entry points.
- **Frontend Core**:
  - Global styles & tokens: `src/tokens.css`, `src/globals.css`, `src/components.css`.
  - Shared runtime scripts: `src/globals.js`, `src/chat.js`, `src/dialog.js`.
  - Page-specific pairings:
    - Domain Finder: `domain-finder.html` + `src/domain-finder.css` + `src/domain-finder.js`
    - Tools Directory: `ai-tools.html` + `src/ai-tools.css` + `src/ai-tools.js`
    - Learn Free: `learn-free.html` + `src/learn-free.css` + `src/learn-free.js`
- **Backend API**: `server/groq-proxy.mjs` (tested by `server/tests/*.test.mjs`).
- **Target Aesthetic**:
  - Modern SaaS utility aesthetic using restrained neutral slate/zinc tones.
  - Strict 1px solid borders (`var(--color-border)`).
  - Compact border-radii: 4px for badges/tags, 6px for controls/buttons/inputs, 8px maximum for cards/panels.
  - Single controlled accent color (Indigo/Blue, non-neon).
  - Zero AI-slop visual patterns: purge neon glow, fluorescent cyan/purple gradients, glassmorphism, floating pills, sparkle icons, random backdrop blobs, and oversized pill-shaped cards.
  - Page-specific composition: Domain Finder is a high-density utility spreadsheet matrix; Tools Directory is a curated creator tools catalog; Learn Free is a structured two-column digital syllabus.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---|---|---|---|
| 1 | Slate/Zinc Design Tokens | Neutral foundation, 1px borders, max 8px radii, single controlled accent | M1 | Survey (Explorer 3) |
| 2 | Purge Global Slop Styles | Eliminate neon shadows, `--gradient-primary`, backdrop glow blobs | M1 | Survey (Explorer 3) |
| 3 | Domain Finder Aesthetic Overhaul | Crisp, high-density utility tool styling, clean search bar, 1px borders | M2 | Survey (Explorer 1) |
| 4 | Registrar Price Comparison Matrix | High-density comparison table with 10 registrars, renewal rates, and sorting | M2 | Survey (Explorer 1) |
| 5 | Domain Finder Logic Preservation | Preserve availability API, 26 DOM IDs, TLD selector, coupon copy, test assertions | M2 | Survey (Explorer 1) |
| 6 | Domain Finder Copy De-Hype | Replace marketing hype with practical cost-of-ownership and renewal copy | M2 | Survey (Explorer 1) |
| 7 | Tools Directory Reframe | Reframe from "AI Directory" to curated "Digital & Web Creator Tools" catalog | M3 | Survey (Explorer 2) |
| 8 | Tools Directory Aesthetic Overhaul | Structured compact cards/rows, 6-8px radii, clean slate glyphs, no glow/pills | M3 | Survey (Explorer 2) |
| 9 | Tools Directory Logic Preservation | Preserve search, category filters, compare drawer, bookmarking, tab navigation | M3 | Survey (Explorer 2) |
| 10 | Tools Directory Copy De-Hype | Rewrite all 20 tools with objective descriptions and realistic capability tags | M3 | Survey (Explorer 2) |
| 11 | Learn Free Syllabus Redesign | Transform into authentic structured digital curriculum with editorial typography | M4 | Survey (Explorer 3) |
| 12 | Learn Free Aesthetic Overhaul | Remove body radial gradients, 999px pills, bouncy keyframes, duplicated CSS | M4 | Survey (Explorer 3) |
| 13 | Learn Free Logic Preservation | Preserve quiz, 16 phase modules, path switcher (`Start Free`/`Start Paid Path`), sprint builder, PDF export | M4 | Survey (Explorer 3) |
| 14 | Learn Free Structured Data Fix | Add Schema.org `Course` JSON-LD block to resolve CI blocker | M4 | Survey (Explorer 3) |
| 15 | Learn Free Copy De-Hype | Replace guru clichés ("Zero to Hero", "Value Bombs") with practical technical copy | M4 | Survey (Explorer 3) |
| 16 | Full Quality CI Verification | Pass `check:inline-handlers`, `validate:structured-data`, `check:routes`, `test:api`, `build`, `test:performance`, `validate:html`, `test:smoke`, `test:a11y:ci` | M5 | Survey (Explorer 3) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| M1 | Design System & Shared Tokens | `src/tokens.css`, `src/globals.css`, `src/components.css` | none | DONE |
| M2 | Domain Finder Redesign | `domain-finder.html`, `src/domain-finder.css`, `src/domain-finder.js` | M1 | DONE |
| M3 | Tools Directory Redesign | `ai-tools.html`, `src/ai-tools.css`, `src/ai-tools.js` | M1 | IN_PROGRESS |
| M4 | Learn Free Syllabus Redesign | `learn-free.html`, `src/learn-free.css`, `src/learn-free.js` | M1 | IN_PROGRESS |
| M5 | Quality CI Verification & Final Audit | All 3 pages, Playwright E2E suites, Axe A11y, full `npm run quality:ci` | M2, M3, M4 | PLANNED |

## Interface Contracts
### Design Tokens ↔ Page CSS
- Variables exposed:
  - `--color-canvas`: canvas background (`#0b0f19` dark / `#f8fafc` light)
  - `--color-surface`: surface background (`#111827` dark / `#ffffff` light)
  - `--color-surface-raised`: secondary/raised surface (`#1f2937` dark / `#f1f5f9` light)
  - `--color-border`: 1px solid structural border (`#334155` dark / `#e2e8f0` light)
  - `--color-border-subtle`: divider border (`#1e293b` dark / `#f1f5f9` light)
  - `--color-text`: high-contrast primary text (`#f8fafc` dark / `#0f172a` light)
  - `--color-muted`: secondary readable text (`#94a3b8` dark / `#64748b` light)
  - `--color-brand`: primary accent (`#4f46e5` dark / `#4338ca` light)
  - `--radius-control`: 6px
  - `--radius-card`: 8px
  - `--radius-panel`: 8px
  - `--shadow-card`: subtle non-neon elevation

### Domain Finder ↔ Playwright Tests
- Inputs & Triggers:
  - `#domainInput`: search input, auto-appends `.com` if no TLD entered.
  - `#searchBtn`: search submit button.
  - `#resultsSection`: reveals with `.visible` class.
  - `#resultDomain`: displays queried domain.
  - `#priceTableBody`: contains populated `tr` rows.
  - Event listeners: registered via JS (`addEventListener`), zero inline `on*` attributes.

### Tools Directory ↔ Playwright Tests
- Invariants:
  - Page `<title>` matches `/AI Tools/i` (`<title>Creator & AI Tools Directory — Curated Web Utilities | SanzyAI</title>`).
  - `.tool-card` must NOT have `role="button"` or `tabindex="0"`.
  - Nested button `"Details"` and link `"Visit Tool"` are sequential focus stops.
  - `#compareBtn`, `#compareSection`, `#compareTable` functional.
  - `#toolSearch`, `#toolCount`, `#featuredToolsGrid`, `#toolsGrid` functional.

### Learn Free ↔ Playwright Tests
- Invariants:
  - Quiz options: exact text `'Learning & Hobby'`, `'$0 (Zero)'`, `'3-5 Hours'`.
  - Path switch group: `div[role="group"][aria-label="Learning mode"]`.
  - Path buttons: `#freePathBtn` ('Start Free Path') with `aria-pressed="true"`, `#paidPathBtn` ('Start Paid Path') with `aria-pressed="false"`.
  - Sprint generator: `#nicheInput`, `#generateSprintBtn`, `#growthOutput` (containing `'Week 4'`), dynamic PDF `#savePlanPdfBtn` downloading `'sprint-plan.pdf'`.
  - Schema: Valid Schema.org `Course` JSON-LD block with canonical URL `https://sanzyai.com/learn-free`.

## Code Layout
- `src/tokens.css`: Token definitions (dark & light-mode).
- `src/globals.css`: Base typography, resets, utility classes.
- `domain-finder.html`: Domain Finder markup.
- `src/domain-finder.css`: Domain Finder specific styles.
- `src/domain-finder.js`: Domain Finder state, DNS lookup, TLD calculation.
- `ai-tools.html`: Tools Directory markup.
- `src/ai-tools.css`: Tools Directory specific styles.
- `src/ai-tools.js`: Tools Directory catalog data (20 tools) and filtering logic.
- `learn-free.html`: Learn Free markup + JSON-LD course schema.
- `src/learn-free.css`: Learn Free specific styles.
- `src/learn-free.js`: Learn Free syllabus phases, quiz, sprint builder, budget simulator.
