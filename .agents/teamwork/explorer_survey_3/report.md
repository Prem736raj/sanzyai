# Comprehensive Survey & Architectural Specification: Learn Free, Design System & CI Gates

**Surveyor**: Explorer 3 (Learn Free, Design System & CI Survey)  
**Date**: 2026-10-17  
**Working Directory**: `.agents/teamwork/explorer_survey_3/`  
**Target Pages & Subsystems**: `learn-free.html`, `src/learn-free.css`, `src/learn-free.js`, `src/tokens.css`, `src/globals.css`, `src/globals.js`, CI Quality Gates (`package.json`)

---

## 1. Executive Summary & Key Findings

1. **Critical CI Blocker Discovered**:
   Running `npm run validate:structured-data` currently **FAILS** with:
   `- learn-free.html: expected at least one JSON-LD block.`
   `scripts/validate-structured-data.mjs` strictly requires `learn-free.html` to contain a valid Schema.org JSON-LD block (e.g. `Course` or `WebSite` / `CollectionPage`), but `learn-free.html` currently lacks any JSON-LD script tag. For `npm run quality:ci` to pass, `learn-free.html` **must** be populated with a valid JSON-LD schema matching canonical `https://sanzyai.com/learn-free` and including all required schema fields (`name`, `description`, `provider`, `url`).

2. **Learn Free Aesthetic Status**:
   `learn-free.html` and `src/learn-free.css` currently suffer from severe "AI-slop" visual patterns:
   - Full-bleed dual radial glow blobs (`radial-gradient(1000px 500px... rgba(20, 199, 255, 0.2))`) on `body` in both light and dark themes.
   - Pervasive 999px floating pills (`.hero-badge`, `.badges-container`, `.path-switch`, `.path-btn`, `.btn-mentor`, `.stage-type`, `.pill`).
   - Neon cyan/purple gradients and heavy glow box-shadows (`box-shadow: 0 0 15px rgba(79, 121, 255, 0.4)` on badges, active buttons, and quiz cards).
   - Gamified animations (`@keyframes badgePop`, `@keyframes stageCardIn`, confetti trigger).
   - Duplicated CSS rules (lines 207–251 duplicated verbatim at lines 453–550 in `src/learn-free.css`).

3. **Performance Budget Constraints**:
   - `scripts/check-performance.mjs` enforces an initial uncompressed JavaScript bundle budget of **65,000 bytes** for `learn-free.html`.
   - Current bundle sits at **56,772 bytes** (only **8,228 bytes** of headroom).
   - Heavy optional modules (`jspdf`, `pdf-export`, `html2canvas`) **must** stay dynamically imported via `src/pdf-loader.js` and never bundled into the initial graph.
   - Every single `<img>` tag in `learn-free.html` **must** have explicit positive integer `width` and `height`, `decoding="async"`, and `loading="eager"` or `loading="lazy"`. Lacking any attribute will immediately fail the static image audit.

4. **Preservation Invariants**:
   Strict Playwright smoke and journey tests depend directly on specific DOM IDs, accessible group roles, button names, and event contracts:
   - `tests/phase1.spec.js`: Quiz buttons `'Learning & Hobby'`, `'$0 (Zero)'`, `'3-5 Hours'`, `#quizResult`, `#nicheInput`, `#generateSprintBtn`, text escaping into `#growthOutput`.
   - `tests/phase2.spec.js`: Header mobile nav (`#hamburger`, `[data-site-menu]`), dynamic PDF export via `#savePlanPdfBtn` generating `sprint-plan.pdf` without upfront PDF bundle loading, `#growthOutput` containing `'Week 4'`.
   - `tests/phase3.spec.js`: Group role `[role="group"][aria-label="Learning mode"]` with `'Start Free Path'` (`aria-pressed="true"`) and `'Start Paid Path'` (`aria-pressed="false"`).
   - `tests/journeys.spec.js`: Learning journey path switching and sprint generation.
   - `scripts/audit-accessibility.mjs`: Strict WCAG 2.1 A & AA in both Light and Dark themes, requiring an `<h1>` heading and accessible contrast ratios.

---

## 2. Complete Inventory & Preservation Catalog for `/learn-free`

### A. DOM Hierarchy & Critical Selectors

| Component / Container | Selector / ID / Attribute | Purpose & Test Dependencies | Must Preserve? |
|---|---|---|---|
| Skip Navigation | `a.skip-link[href="#main-content"]` | A11y skip-link; tested by axe-core and keyboard nav. | Yes |
| Primary Navbar | `nav#navbar`, `ul#navMenu`, `.nav-right` | Main site navigation. Active class on `/learn-free`. | Yes |
| Mobile Navigation | `button#hamburger[aria-label="Toggle menu"]`, `div#mobileMenu[data-site-menu]` | Mobile drawer tested in `tests/phase2.spec.js` (Escape key, resize). | Yes |
| Main Landmark | `main#main-content[tabindex="-1"]` | Main landmark target. | Yes |
| Hero Heading | `h1` | Required by `scripts/audit-accessibility.mjs` (`page.locator('h1').first().waitFor()`). Must contain 'Learn' or title matching `/Learn/i`. | Yes |
| Path Quiz Container | `.path-quiz-section#pathQuiz`, `.quiz-card`, `.quiz-questions` | Quiz host container. | Yes |
| Quiz Question 1 | `.quiz-q[data-q="1"]` (initially `.active`) | Primary goal question. | Yes |
| Quiz Q1 Buttons | `button` with exact text: `'Learning & Hobby'` (`data-site-click="nextQuiz" data-site-arg-0="1" data-site-arg-1="free"`) and `'Professional Business'` (`data-site-click="nextQuiz" data-site-arg-0="1" data-site-arg-1="paid"`) | Targeted by exact name in `tests/phase1.spec.js:129`. | Yes (Exact text & attributes) |
| Quiz Question 2 | `.quiz-q[data-q="2"]` | Monthly budget question. | Yes |
| Quiz Q2 Buttons | `button` with exact text: `'$0 (Zero)'` (`data-site-click="nextQuiz" data-site-arg-0="2" data-site-arg-1="free"`) and `'$20 - $100+'` (`data-site-click="nextQuiz" data-site-arg-0="2" data-site-arg-1="paid"`) | Targeted by exact name in `tests/phase1.spec.js:130`. | Yes (Exact text & attributes) |
| Quiz Question 3 | `.quiz-q[data-q="3"]` | Weekly time commitment question. | Yes |
| Quiz Q3 Buttons | `button` with exact text: `'3-5 Hours'` (`data-site-click="finishQuiz" data-site-arg-0="free"`) and `'10+ Hours'` (`data-site-click="finishQuiz" data-site-arg-0="paid"`) | Targeted by exact name in `tests/phase1.spec.js:131`. | Yes (Exact text & attributes) |
| Quiz Result Card | `div#quizResult[hidden]` | Hidden container revealed on quiz finish (`tests/phase1.spec.js:132`). | Yes |
| Quiz Result Text | `p#quizResultMsg` | Dynamic recommendation text output. | Yes |
| Quiz Restart Button | `button[data-site-click="resetQuiz"]` | Triggers `window.resetQuiz()`. | Yes |
| Path Switcher Group | `div.path-switch[role="group"][aria-label="Learning mode"]` | Mode group container strictly verified by `tests/phase3.spec.js:36`. | Yes (Role & aria-label mandatory) |
| Free Path Toggle Button | `button#freePathBtn[aria-pressed="true"]` (Text: `'Start Free Path'`) | Strictly asserted by `phase3.spec.js:37,41`. | Yes (ID, text, aria-pressed mandatory) |
| Paid Path Toggle Button | `button#paidPathBtn[aria-pressed="false"]` (Text: `'Start Paid Path'`) | Strictly asserted by `phase3.spec.js:38,42` and `journeys.spec.js:54`. | Yes (ID, text, aria-pressed mandatory) |
| Progress Ring Circle | `circle#learnRing` | SVG circle with dynamic `strokeDashoffset`. | Yes |
| Progress Percentage | `strong#learnProgressPct` | Progress percentage text (e.g. `0%` to `100%`). | Yes |
| Activity Streak Item | `strong#streakDays` | Days streak counter. | Yes |
| Completed Tasks Metric | `strong#tasksDone` | Displays `X/16` completed checklist items. | Yes |
| Explored Stages Metric | `strong#stagesSeen` | Displays `X/8` explored curriculum stages. | Yes |
| Milestone Badges | `div#badgeList`, `#badge-niche`, `#badge-stack`, `#badge-content`, `#badge-hero` | Dynamic status classes (`locked` / `unlocked`). | Yes |
| Roadmap Track Container | `div#roadmapTrack` | Populated dynamically with `.stage-card` elements. | Yes |
| Stage Selector Cards | `.stage-card[data-action="select-stage"][data-stage-index="X"][role="button"][tabindex="0"]` | Interactive stage selection items. | Yes |
| Stage Detail Panel | `aside#stagePanel` | Detailed syllabus panel. | Yes |
| Stage Detail Heading | `h3#stageTitle` | Active phase title display. | Yes |
| Stage Summary Text | `p#stageSummary` | Active phase outcome description. | Yes |
| Stage Metadata Container | `div#stageMeta` | Holds path, timing, and tools meta pills. | Yes |
| Stage Tasks List | `ul#stageTasks` | Unordered list of phase tasks. | Yes |
| Domain Finder Cross-Link | `a#stageDomainLink[href="/domain-finder"]` | Verified by `scripts/check-routes.mjs`. | Yes |
| Stage Execution Steps | `div#stageStepList` | Hosts `.stage-step` sub-actions and `.mistake-box`. | Yes |
| Ask Mentor Button | `button.btn-mentor[data-action="ask-mentor"][data-stage-id="..."]` | Triggers chat guide contextual prompt. | Yes |
| Budget Project Select | `select#projectType` | Portfolio, Blog, Store, Micro SaaS options. | Yes |
| Budget Traffic Slider | `input[type="range"]#trafficRange` | Min 100, max 50000, step 100, value 2500. | Yes |
| Budget Traffic Output | `div#trafficOut` | Text representation of visitors. | Yes |
| Budget AI Intensity | `select#aiUsage` | Light, Medium, Heavy options. | Yes |
| Budget Free Estimates | `div#freeEstimate`, `div#freeYearly` | Monthly / annual calculated outputs. | Yes |
| Budget Paid Estimates | `div#paidEstimate`, `div#paidYearly` | Monthly / annual calculated outputs. | Yes |
| Sprint Niche Input | `input#nicheInput[type="text"]` | Targeted in `phase1.spec.js:133`, `phase2.spec.js:136`, `journeys.spec.js:56`. | Yes (ID mandatory) |
| Sprint Hours Select | `select#hoursInput` | Weekly hours (3, 8, 15). | Yes |
| Sprint Channel Select | `select#channelInput` | SEO, Social Media, Communities, Email. | Yes |
| Sprint Generate Button | `button#generateSprintBtn` | Targeted in `phase1.spec.js:134`, `phase2.spec.js:137`, `journeys.spec.js:57`. | Yes (ID mandatory) |
| Sprint PDF Export Button | `button#savePlanPdfBtn[disabled]` | Targeted in `phase2.spec.js:141,144`. Triggers download `sprint-plan.pdf`. | Yes (ID mandatory) |
| Sprint Output Container | `div#growthOutput` | Verified in `phase1.spec.js` (XSS text check) and `phase2.spec.js` (contains 'Week 4'). | Yes (ID mandatory) |
| Launch Checklist Grid | `div#checkGrid` | Checkbox container populated by `renderChecklist()`. | Yes |
| Checklist Checkboxes | `input[type="checkbox"][data-index="X"]` | Event delegation on `checkGrid` change. | Yes |
| Checklist Progress Bar | `div#checkProgressBar` | Progress bar fill width percentage. | Yes |
| Checklist Progress Label | `span#checkProgressText` | E.g. `X% complete (Y/16 tasks)`. | Yes |
| Downloadable Resources | `.res-card` links pointing to 6 files in `/learn-free-resources/` | Downloadable utility checklists and CSV sheets. | Yes |
| Toast Notification | `div#toast`, `span#toastIcon`, `span#toastMsg` | Feedback notification element. | Yes |

---

### B. Curriculum Data Matrix (2 Paths x 8 Stages = 16 Phases)

All 16 phase datasets in `src/learn-free.js` (`roadmapByPath` and `stageDetailMap`) must be preserved and rendered cleanly:

#### Free Path Curriculum:
1. **Phase 1: Zero-Cost Niche Selection** (`id: 'niche'`, Duration: Day 1-2)
   - *Tools*: Google Trends, Reddit, AnswerThePublic, Exploding Topics, Ubersuggest, Keyword Sheeter.
   - *Outcome*: A validated niche with zero upfront spend.
   - *Tasks*: Analyze 5 niche ideas; find 30 pain-point questions; identify 10 low-competition keywords; draft Minimum Viable Message (MVM).
   - *Detail Modules*: The 3-Circle Rule; Reddit Mining; Ubersuggest Free.
2. **Phase 2: Architecture & Planning** (`id: 'plan'`, Duration: Day 3)
   - *Tools*: Notion, Excalidraw, Miro Free, Draw.io, sitemap generators.
   - *Outcome*: Complete site structure and user flow.
   - *Tasks*: Draw site map (Home, 5 Pillars, Legal, Contact); plan user journey; define conversion goal.
   - *Detail Modules*: Draw.io Sitemap; User Pathing.
3. **Phase 3: The Free Tech Stack** (`id: 'stack'`, Duration: Day 4)
   - *Tools*: GitHub, Vercel, Cloudflare Pages, Netlify, InfinityFree, Surge.sh.
   - *Outcome*: Live site on global edge network for $0.
   - *Tasks*: Create GitHub repo connected to Vercel/Cloudflare; configure free subdomain; verify SSL/HTTPS.
   - *Detail Modules*: GitHub for Non-Coders; Vercel vs Netlify.
4. **Phase 4: Visuals & Brand (Free)** (`id: 'design'`, Duration: Day 5-7)
   - *Tools*: Canva, Figma Free, Color Hunt, Fontjoy, Pixlr, Unsplash, Google Fonts.
   - *Outcome*: Professional high-trust visual identity.
   - *Tasks*: Design logo & favicon; pick 2-color palette & 2-font system; select 10 curated images.
   - *Detail Modules*: Color Hunt Palettes; Fontjoy Pairings.
5. **Phase 5: Content Strategy for $0** (`id: 'content'`, Duration: Week 2)
   - *Tools*: ChatGPT Free, Claude Free, Hemingway, Grammarly Free, Quillbot.
   - *Outcome*: 5 SEO-optimized pillar articles.
   - *Tasks*: Draft 5 pillar guides; human edit for unique voice; add images with descriptive ALT tags.
   - *Detail Modules*: AI Brainstorming; Hemingway App readability.
6. **Phase 6: Performance & Tech SEO** (`id: 'seo-speed'`, Duration: Week 3)
   - *Tools*: PageSpeed Insights, Squoosh.app, Microsoft Clarity, Ahrefs Free SEO Toolbar, Screaming Frog Free.
   - *Outcome*: 90+ Lighthouse scores and indexed search pages.
   - *Tasks*: Compress images to <100KB with Squoosh; install Microsoft Clarity for heatmaps; submit sitemap to GSC.
   - *Detail Modules*: Squoosh Image Prep; Microsoft Clarity Free.
7. **Phase 7: Organic Growth (No Ads)** (`id: 'traffic'`, Duration: Week 4)
   - *Tools*: Reddit, LinkedIn, Twitter/X, Buffer Free, Mailchimp Free, ManyChat Free.
   - *Outcome*: First 500 organic visitors.
   - *Tasks*: Publish 3 comprehensive answers in niche subreddits; set up free email list; pitch 5 guest post opportunities.
   - *Detail Modules*: ManyChat Automation; Buffer Scheduling.
8. **Phase 8: First $1 (Free Tools)** (`id: 'monetize'`, Duration: Ongoing)
   - *Tools*: Gumroad, Amazon Associates, Ko-fi, BuyMeACoffee, Stripe Links.
   - *Outcome*: Initial direct revenue stream.
   - *Tasks*: Add relevant affiliate links; create a $0-5 digital download on Gumroad; add reader support link.
   - *Detail Modules*: Amazon Associates; Stripe Payment Links.

#### Paid Path Curriculum:
1. **Phase 1: High-Intent Market Analysis** (`id: 'market'`, Duration: Day 1-2)
   - *Tools*: Ahrefs, Semrush, SparkToro, Facebook Ad Library, SpyFu, SimilarWeb.
   - *Outcome*: Validated high-commercial-intent market entry strategy.
2. **Phase 2: Funnel Architecture** (`id: 'strategy'`, Duration: Day 3)
   - *Tools*: Funnelytics, LucidChart, ClickUp, Monday.com, Hotjar.
   - *Outcome*: Optimized multi-stage customer acquisition funnel blueprint.
3. **Phase 3: Premium Infrastructure** (`id: 'hosting'`, Duration: Day 4)
   - *Tools*: WP Engine, Kinsta, Cloudways, DigitalOcean, Cloudflare Pro.
   - *Outcome*: High-throughput, isolated hosting infrastructure with staging and WAF.
4. **Phase 4: High-Conversion Design** (`id: 'design'`, Duration: Day 5-7)
   - *Tools*: Webflow, Framer, Elementor Pro, Adobe CC, Figma Team.
   - *Outcome*: Custom responsive UI architecture with desktop and mobile design fidelity.
5. **Phase 5: Content Authority Scaling** (`id: 'content-scale'`, Duration: Week 2)
   - *Tools*: Claude Pro, SurferSEO, Jasper, MarketMuse, Frase.
   - *Outcome*: 20+ topic-cluster articles engineered for search authority.
6. **Phase 6: Enterprise Performance** (`id: 'perf-audit'`, Duration: Week 3)
   - *Tools*: GTmetrix Premium, Screaming Frog Paid, SEMrush Audit, WebPageTest.
   - *Outcome*: Sub-second load times, strict Core Web Vitals, and zero technical crawl errors.
7. **Phase 7: Paid Acquisition** (`id: 'ads'`, Duration: Week 4)
   - *Tools*: Google Ads, Meta Ads, TikTok Ads, AdEspresso.
   - *Outcome*: Profitable, measurable customer acquisition campaigns.
8. **Phase 8: Revenue Automation** (`id: 'automation'`, Duration: Ongoing)
   - *Tools*: ConvertKit, Zapier, Make.com, Stripe, ActiveCampaign, HubSpot.
   - *Outcome*: Automated onboarding, CRM lead routing, and recurring billing infrastructure.

---

### C. State & LocalStorage Schema

| Key | Type | Description | Default Fallback |
|---|---|---|---|
| `sanzy_theme` | `string` (`"light"` \| `"dark"`) | Global site theme preference. | `window.matchMedia("(prefers-color-scheme: light)")` |
| `learnfree_activity_days` | `string[]` (JSON array of dates) | Activity tracking dates. | `[]` |
| `learnfree_visited_stages` | `string[]` (JSON array of stage IDs) | Visited stages format: `["free:niche", "paid:market"]`. | `[]` |
| `learnfree_checklist` | `number[]` (JSON array of indices) | Indices of completed tasks (0–15). | `[]` |

---

## 3. Visual Gimmick & AI-Slop Audit on `/learn-free`

### Identified Visual Gimmicks & Flaws

1. **Dual Radial Neon Backdrop Blobs**:
   - `src/learn-free.css:146-150` applies two massive colored radial gradients directly to `body`:
     ```css
     background:
         radial-gradient(1000px 500px at 80% -10%, rgba(20, 199, 255, 0.2), transparent 60%),
         radial-gradient(900px 500px at 10% 0%, rgba(79, 121, 255, 0.2), transparent 55%),
         var(--bg);
     ```
   - Light mode also introduces heavy blue/cyan radial overlays (lines 1038–1041).
   - *Remedy*: Remove all radial body gradients. Use clean, solid, neutral canvas backgrounds (`#0b0f19` dark / `#f8fafc` light).

2. **Over-Rounded 999px Pills**:
   - `.hero-badge` (line 179): `border-radius: 999px;`
   - `.badges-container` (line 32): `border-radius: 999px;`
   - `.path-switch` (line 335): `border-radius: 999px;`
   - `.path-btn` (line 340): `border-radius: 999px;`
   - `.btn-mentor` (line 99): `border-radius: 999px;`
   - `.stage-type` (line 625): `border-radius: 999px;`
   - `.pill` (line 681): `border-radius: 999px;`
   - `#checkProgressBar` track (line 877): `border-radius: 999px;`
   - *Remedy*: Standardize on compact 4px–8px border-radii across controls, badges, chips, and progress bars. Zero 999px pills.

3. **Fluorescent Gradients & Neon Glows**:
   - Hero title gradient `.hero .grad`: `linear-gradient(135deg, var(--brand), var(--brand-2))` where brand is `#6c35de` and brand-2 is `#00d4ff`.
   - Active path button `.path-btn.active`: `linear-gradient(135deg, var(--brand), #6d6bff)` with `box-shadow: 0 8px 18px rgba(79, 121, 255, 0.38)`.
   - Sprint button `.btn-main`: `linear-gradient(135deg, var(--brand), var(--brand-2))`.
   - Checklist progress fill `#checkProgressBar`: `linear-gradient(90deg, var(--good), #3fe6a2)`.
   - Badges `.badge-item.unlocked`: `box-shadow: 0 0 15px rgba(79, 121, 255, 0.4)`.
   - *Remedy*: Replace fluorescent gradients with solid, understated colors or subtle 1-step tone shifts. Replace neon glow shadows with clean 1px borders and subtle elevation (`box-shadow: 0 1px 2px rgba(0,0,0,0.06)`).

4. **Translucent Glassmorphism Stacking**:
   - Every card uses `background: rgba(17, 21, 42, 0.84);` layered over secondary translucent surfaces (`rgba(22, 28, 54, 0.65)`), creating a muddy, low-contrast appearance.
   - *Remedy*: Opaque, solid surfaces using clear semantic tokens (`--color-surface: #111827`, `--color-surface-raised: #1f2937`) with high-contrast, crisp 1px borders.

5. **Gamified Keyframe Animations**:
   - `@keyframes badgePop`: Bouncy scale animation (0.5 → 1.2 → 1.0).
   - `@keyframes stageCardIn`: 8 staggered entrance animations.
   - *Remedy*: Remove bouncy game-like keyframes. Use standard smooth transitions (`150ms ease-out`).

---

### Architectural Transformation into an Authentic Digital Curriculum

```
+---------------------------------------------------------------------------------------------------+
|  COURSE SYLLABUS HEADER                                                                           |
|  Level: Zero-to-Production  |  Format: Text-Based & Practical Simulations  |  Est: 4-6 Weeks       |
|  Title: Web Development & Launch Curriculum                                                       |
|  Summary: Systematic engineering & launch curriculum for web builders.                            |
+---------------------------------------------------------------------------------------------------+
|  CURRICULUM MODE SEGMENTED CONTROL [4px border radius, 1px border]                                |
|  [ [Start Free Path] (Active) ]   [ [Start Paid Path] ]                                           |
+---------------------------------------------------------------------------------------------------+
|  SYLLABUS PROGRESS & VERIFICATION METRICS [Structured Data Row, 6px radius]                      |
|  Progress: 35% | Completed: 6/16 Tasks | Milestones Reached: 3/8 | Readiness: In Progress        |
+---------------------------------------------------------------------------------------------------+
|  TWO-COLUMN EDITORIAL SYLLABUS LAYOUT                                                             |
|  +--------------------------------------------+-------------------------------------------------+ |
|  |  LEFT: PHASE TIMELINE / MODULE DIRECTORY   |  RIGHT: DETAILED MODULE SPECIFICATION           | |
|  |  +---------------------------------------+ |  +--------------------------------------------+ | |
|  |  | 01  Niche & Domain Selection (Day 1-2)| |  | Phase 1: Zero-Cost Niche Selection         | | |
|  |  +---------------------------------------+ |  | Core Objectives: Validated niche data       | | |
|  |  | 02  Architecture & Wireframing (Day 3)| |  | Required Tools: Google Trends, Ubersuggest  | | |
|  |  +---------------------------------------+ |  |                                            | | |
|  |  | 03  Edge Deployment & Stack (Day 4)   | |  | Execution Checklist:                      | | |
|  |  +---------------------------------------+ |  | 1. Analyze trends data in 3 target niches. | | |
|  |  | 04  Typography & Design Tokens (Day 5)| |  | 2. Mine community discussions for problems.| | |
|  |  +---------------------------------------+ |  |                                            | | |
|  |  | 05  Pillar Content Architecture (Wk 2) | |  | Common Pitfall Warning:                   | | |
|  |  +---------------------------------------+ |  | Avoid choosing a topic solely for ads.     | | |
|  |  | ... [Phases 06 to 08]                  | |  +--------------------------------------------+ | |
|  +--------------------------------------------+-------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------+
|  PRACTICAL UTILITIES: 30-DAY LAUNCH SPRINT BUILDER & LAUNCH CHECKLIST                             |
|  Structured, high-density form fields | Clean tabular week-by-week output | Single "Export PDF"   |
+---------------------------------------------------------------------------------------------------+
```

Key aspects of this redesign:
- **Editorial Typography**: Heading font hierarchy with clear weights (600/700 for headings, 400/500 for body). Prose containers constrained to `max-width: 65ch` for readability.
- **Structured Data Rows**: Replaces bouncy ring widget with a clean, executive progress summary bar.
- **Disciplined Geometry**: 1px borders everywhere, 6px border radius on inputs/buttons, 8px on cards and panels.
- **High-Density Utility Grid**: Clear tabular presentation for comparing Free vs Paid stacks.

---

## 4. Global Design Tokens & Theme Architecture

### Current Token Structure vs Proposed Slate/Zinc Foundation

Global design tokens are defined in `src/tokens.css`, imported by `src/components.css`, and made available globally through `src/globals.css`.

#### Current System Flaws:
- Radii are too large: `--radius-control: 10px;`, `--radius-card: 18px;`, `--radius-panel: 24px;`.
- Canvas colors are tinted blue/purple (`#090b14`), not neutral slate/zinc.
- High-saturation brand accents: `--color-brand: #6c35de;` and `--color-secondary: #00d4ff;` create fluorescent cyan/purple clashes.
- `src/globals.css` defines `--gradient-primary: linear-gradient(135deg, #6C35DE, #00D4FF);` and `--border-radius-xl: 32px;`.

#### Proposed Neutral Slate/Zinc Foundation:

```css
/* src/tokens.css */
:root {
    color-scheme: dark;

    /* Neutral Slate/Zinc Foundations */
    --color-canvas: #0b0f19;         /* Slate-950 base */
    --color-surface: #111827;        /* Slate-900 surface */
    --color-surface-raised: #1f2937; /* Slate-800 raised card */
    --color-text: #f8fafc;           /* Slate-50 high-contrast text */
    --color-muted: #94a3b8;          /* Slate-400 secondary text */
    
    /* 1px Solid Neutral Borders */
    --color-border: #334155;         /* Slate-700 solid border */
    --color-border-subtle: #1e293b;  /* Slate-800 subtle divider */

    /* Single Controlled Accent (Subdued Indigo/Blue) */
    --color-brand: #4f46e5;          /* Indigo-600 */
    --color-brand-hover: #6366f1;    /* Indigo-500 */
    --color-brand-strong: #4338ca;   /* Indigo-700 */
    --color-secondary: #38bdf8;      /* Sky-400 (controlled utility accent) */

    /* Status Tokens */
    --color-success: #10b981;
    --color-warning: #f59e0b;
    --color-danger: #ef4444;

    /* Restrained Geometry (4px–8px max) */
    --radius-control: 6px;
    --radius-card: 8px;
    --radius-panel: 8px;

    /* Standard Spacing Scale */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-6: 24px;
    --space-8: 32px;

    /* Typography */
    --type-body: 'Inter', system-ui, -apple-system, sans-serif;
    --type-heading: 'Space Grotesk', 'Inter', system-ui, sans-serif;

    /* Subtle Elevation (No Glow) */
    --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.15);
    --motion-ui: 160ms cubic-bezier(0.4, 0, 0.2, 1);
}

html.light-mode {
    color-scheme: light;

    /* Neutral Slate Light Foundations */
    --color-canvas: #f8fafc;         /* Slate-50 light base */
    --color-surface: #ffffff;        /* Pure white card surface */
    --color-surface-raised: #f1f5f9; /* Slate-100 raised surface */
    --color-text: #0f172a;           /* Slate-900 high-contrast body */
    --color-muted: #64748b;          /* Slate-500 muted text */
    
    /* 1px Solid Neutral Borders */
    --color-border: #e2e8f0;         /* Slate-200 border */
    --color-border-subtle: #f1f5f9;  /* Slate-100 border */

    /* Controlled Accent in Light Mode */
    --color-brand: #4338ca;          /* Indigo-700 (accessible contrast > 4.5:1) */
    --color-brand-hover: #3730a3;    /* Indigo-800 */
    --color-brand-strong: #312e81;   /* Indigo-900 */
    --color-secondary: #0284c7;      /* Sky-600 */

    --shadow-card: 0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04);
}
```

### Theme Switcher Integration (`src/globals.js`)
- Handled via `window.toggleTheme()`: toggles class `light-mode` on both `document.documentElement` and `document.body`.
- Persisted to `localStorage.getItem('sanzy_theme')`.
- Head script in every HTML file evaluates prior to DOM painting, eliminating FOUC.
- Verified by `tests/visual.spec.js` and `scripts/audit-accessibility.mjs` across both Light and Dark themes.

---

## 5. CI Quality Gate Analysis & Redesign Pitfalls

The repository CI test suite (`npm run quality:ci`) chains 9 individual commands:
```
npm run check:inline-handlers &&
npm run validate:structured-data &&
npm run check:routes &&
npm run test:api &&
npm run build &&
npm run test:performance &&
npm run validate:html &&
npm run test:smoke &&
npm run test:a11y:ci
```

Here is the exhaustive analysis of each gate, its mechanism, and pitfalls for the redesign:

### Gate 1: `check:inline-handlers` (`scripts/check-inline-handlers.mjs`)
- **Mechanism**: Reads all `.html` and `.js` files (excluding dist, node_modules) and tests each line against regex `/\son[a-z]+\s*=\s*["']/i`.
- **Purpose**: Strict CSP compliance (`script-src-attr 'none'`).
- **Pitfall**: Any `onclick="..."`, `onchange="..."`, `onsubmit="..."` in HTML, or string templates in JS containing ` onclick="...`, causes the build to fail immediately.
- **Rule**: All event handling must use `addEventListener` or declarative attributes (`data-site-click`) registered in `src/globals.js` (`siteHandlers`).

### Gate 2: `validate:structured-data` (`scripts/validate-structured-data.mjs`)
- **Mechanism**: Inspects required HTML files for `<script type="application/ld+json">`.
- **Target Files**: `index.html`, `blog.html`, `learn-free.html`, `prompt-store.html`, and blog articles.
- **Current Bug Found**: `learn-free.html` currently lacks a JSON-LD script, failing this check.
- **Required Redesign Solution**: Insert the following valid Schema.org block into `learn-free.html`:
  ```html
  <script type="application/ld+json">
  {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Web Building & Launch Curriculum",
      "description": "Step-by-step curriculum for planning, building, deploying, and launching production websites.",
      "provider": {
          "@type": "Organization",
          "name": "SanzyAI",
          "url": "https://sanzyai.com"
      },
      "url": "https://sanzyai.com/learn-free"
  }
  </script>
  ```
  Note: `url` must strictly match canonical `https://sanzyai.com/learn-free` (validated by `normalizeUrl`).

### Gate 3: `check:routes` (`scripts/check-routes.mjs`)
- **Mechanism**: Extracts all `<a href="...">` internal links and checks if target route exists as an HTML page or in `public/`.
- **Pitfall**: No internal links can be broken. Any link to `/ai-tools`, `/learn-free`, `/domain-finder`, `/about`, `/contact` must match real routes. Stage link `#stageDomainLink` must link to `/domain-finder`.

### Gate 4: `test:api` (`server/tests/*.test.mjs`)
- **Mechanism**: Runs Node.js test runner on 21 backend proxy tests (health, readiness, rate-limiting, CORS, input sanitization).
- **Status**: 21/21 passed. Frontend changes must not alter `/api/*` contracts.

### Gate 5: `build` (`vite build`)
- **Mechanism**: Compiles 31 HTML entry files via Vite/Rollup into `dist/`.
- **Pitfall**: All module imports in `src/learn-free.js` and link tags in `learn-free.html` must resolve cleanly.

### Gate 6: `test:performance` (`scripts/check-performance.mjs`)
- **Mechanism**:
  1. Manifest static bundle inspection: checks `dist/.vite/manifest.json`.
  2. Budget limits:
     - `index`: 50,000 bytes
     - `learn-free`: **65,000 bytes**
     - `prompt-store`: 85,000 bytes
     - `ai-tools`: 70,000 bytes
     - `blog`: 55,000 bytes
  3. Forbidden modules in initial graph: `/pdf-export|html2canvas|sanitizer|\/chat-(?!loader)/`.
  4. Static image audit: Every `<img\b[^>]*>` tag in all HTML files is checked:
     - Must match `\bwidth="[1-9]\d*"`
     - Must match `\bheight="[1-9]\d*"`
     - Must match `\bdecoding="async"`
     - Must match `\bloading="(?:eager|lazy)"`
- **Pitfalls**:
  - `learn-free.js` currently compiles to 56,772 bytes (only 8.2KB headroom under 65KB). Do not add external libraries.
  - PDF generation (`jspdf`) must remain dynamically loaded via `src/pdf-loader.js`.
  - Any `<img>` tags on `learn-free.html` (e.g. logo, icons) lacking width, height, decoding, or loading strategy will immediately fail CI.

### Gate 7: `validate:html` (`html-validate "*.html" "blog/*.html"`)
- **Mechanism**: Runs html-validate against recommended rule profile.
- **Pitfalls**: Unclosed tags, invalid nesting, duplicate IDs, or illegal element attributes fail this check.

### Gate 8: `test:smoke` (`playwright test`)
- **Mechanism**: Runs Playwright end-to-end tests across Chromium and Mobile viewports.
- **Critical Assertions on `/learn-free`**:
  - Title matches `/Learn/i`.
  - Quiz buttons with exact text: `'Learning & Hobby'`, `'$0 (Zero)'`, `'3-5 Hours'`.
  - `#quizResult` visibility and safe text output in `#growthOutput` (XSS prevention test).
  - `#freePathBtn` ('Start Free Path') with `aria-pressed="true"`.
  - `#paidPathBtn` ('Start Paid Path') with `aria-pressed="false"`.
  - `div[role="group"][aria-label="Learning mode"]`.
  - Growth sprint output contains `'Week 4'`.
  - `#savePlanPdfBtn` triggers download with suggested filename `'sprint-plan.pdf'`.
  - Header hamburger `#hamburger` and `[data-site-menu]` keyboard escape handling.

### Gate 9: `test:a11y:ci` (`scripts/audit-accessibility.mjs`)
- **Mechanism**: Boots Chromium with Axe-core auditing 8 critical pages in both Light and Dark themes against WCAG 2.1 A & AA.
- **Pitfalls**:
  - Requires `page.locator('h1').first().waitFor()` on every page.
  - Zero contrast violations in both Light and Dark themes (minimum 4.5:1 ratio for normal text).
  - All form controls must have associated `<label for="...">`.
  - Buttons and links must have accessible text names.

---

## 6. Content De-Hype & Editorial Voice Matrix

| Current Copy on `/learn-free` | Tone / Buzzword Issue | Proposed Human, Technical, De-Hyped Replacement |
|---|---|---|
| "Build Your Website From Zero to Launch" | Startup course trope. | "Build and Deploy a Production Web Project" |
| "The Beginner's Guide: Zero to Hero" | Guru course cliché ("Zero to Hero"). | "Foundational Architecture: How Web Systems Work" |
| "Interactive Program — No Videos — Real Practice" | Clunky marketing badge. | "Structured Syllabus & Practical Milestones" |
| "Post 3 'Value Bombs' in subreddits without being 'spammy'" | Buzzword cringe ("Value Bombs"). | "Publish 3 comprehensive, high-utility answers to recurring technical or practical questions in niche communities." |
| "Passive income machine" (Paid Phase 8) | Get-rich-quick guru hype. | "Reliable recurring revenue operations and automated fulfillment workflows." |
| "Paid Acquisition (The Gas)" | Bro-marketing slang. | "Targeted Customer Acquisition & Campaign Optimization" |
| "Growth Sprint Generator: New feature to help your site grow fast after launch..." | Clunky marketing announcement phrasing. | "30-Day Launch Sprint Plan: A tactical week-by-week execution roadmap tailored to your available time and channel." |
| "Tip: start free, validate idea, then upgrade only where it saves time or increases conversions." | Casual tone. | "Recommendation: Begin with free edge infrastructure to validate market demand, then transition to dedicated or managed hosting as traffic demands." |
| "Tap each stage to reveal exact tasks, tools, outcomes and mistakes to avoid." | Mobile app game phrasing. | "Select any curriculum module below to inspect the objectives, toolchain, execution checklist, and common pitfalls." |
| "Ask Sanzy Guide about this stage" | Gimmicky assistant label. | "Consult Documentation & Implementation Guide" |
| "Niche Explorer", "Tech Architect", "Content King", "Website Hero" (Badge Titles) | Gamified vanity titles. | "Phase 1 Milestone: Niche Data Validated", "Phase 3 Milestone: Edge Infrastructure Configured", "Phase 5 Milestone: Pillar Architecture Published", "Production Launch Verification Complete" |

---

## 7. Actionable Implementation Recommendations for Downstream Agents

1. **Design System Token Refactor (`src/tokens.css` & `src/globals.css`)**:
   - Establish neutral slate/zinc base tokens (`--color-canvas: #0b0f19` dark / `#f8fafc` light).
   - Set border radius to max 8px: `--radius-control: 6px;`, `--radius-card: 8px;`, `--radius-panel: 8px;`.
   - Purge `--gradient-primary` and neon drop-shadows across `src/globals.css`.
   - Verify WCAG 2.1 AA text contrast across light and dark modes.

2. **Learn Free Redesign (`learn-free.html` & `src/learn-free.css`)**:
   - Add required Schema.org `Course` JSON-LD block to `<head>` to fix the failing `validate:structured-data` check.
   - Replace body radial gradients with clean neutral background.
   - Restyle hero section into an editorial curriculum syllabus header with clear level, timeline, and prerequisite metadata.
   - Implement clean segmented button group for Learning mode (`Start Free Path` / `Start Paid Path`) with 6px border radius, 1px border, and zero neon glow.
   - Clean up roadmap layout into a two-column editorial syllabus (left: curriculum index; right: module specification).
   - Clean up Budget Simulator and 30-Day Sprint Generator with aligned, structured inputs, 1px solid borders, and clear week-by-week cards.
   - Remove duplicated CSS blocks in `src/learn-free.css`.
   - Ensure all image tags have width, height, decoding="async", and loading strategy.

3. **Verification Steps Post-Implementation**:
   - Run `npm run check:inline-handlers`
   - Run `npm run validate:structured-data` (verify `learn-free.html` passes)
   - Run `npm run check:routes`
   - Run `npm run build`
   - Run `npm run test:performance` (verify bundle < 65KB and all images valid)
   - Run `npm run validate:html`
   - Run `npm run test:api`
   - Run `npx playwright test` (smoke, phase1, phase2, phase3, journeys)
   - Run `npm run test:a11y:ci` (Axe WCAG A/AA light & dark)
