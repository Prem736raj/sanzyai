# Tools Directory Survey & Architectural Reframe Report
**Target Surface**: `ai-tools.html`, `src/ai-tools.css`, `src/ai-tools.js`  
**Author**: Explorer 2 (Tools Directory Survey)  
**Date**: 2026-10-17  
**Status**: Survey Complete — Implementation Ready  

---

## 1. Executive Summary & Problem Framing

The Tools Directory (`ai-tools.html`) is currently positioned as a buzzy, marketing-heavy "AI Directory" with stereotypical AI template patterns: fluorescent cyan-to-purple gradient text, glowing neon box shadows, 100px pill buttons, pulsing indicator dots, expanding animated top-border lines, fake star ratings/reviews, and boilerplate copy ("The world's most powerful AI chatbot", "superpowers", "unmatched intelligence").

To fulfill the requirements of `ORIGINAL_REQUEST.md` and repository standards in `AGENTS.md`, this page must be reframed from a generic "AI Directory" into a **Curated "Digital & Web Creator Tools" Catalog**. 

The redesign must accomplish three core objectives:
1. **Purge Visual Slop**: Completely remove neon gradients, pulsing dots, glowing box shadows, radial gradient background blobs, glassmorphic blur layers, 100px pill buttons, and expanding hover animations. Replace with a disciplined modern SaaS aesthetic using restrained neutral slate/zinc tones, precise borders (`1px solid var(--border)`), compact border radii (`4px–8px`), and a single controlled accent.
2. **Reframe Content into Human Editorial Voice**: Eliminate robotic hyperbole ("supercharge", "unleash next-gen intelligence") and fake star ratings. Provide grounded, high-signal descriptions focusing on practical web building, creative production workflows, pricing tiers, and developer utilities.
3. **Preserve 100% of Functional Behavior and Test Invariants**: Ensure zero regressions in real-time search, category/pricing filtering, sort ordering, bookmarking (`localStorage`), multi-tool side-by-side comparison (`#compareBar`, `#compareTable`), modal details (`openDialog`), and submission form (`/api/leads`). All changes must strictly pass `npm run quality:ci`, including zero inline event handlers (`check:inline-handlers`), performance budgets (`< 70,000` initial JS bytes), and accessibility standards (`audit-accessibility.mjs` WCAG 2.1 AA).

---

## 2. Catalog of Visual Gimmicks & Slop Styles to Purge

A line-by-line inspection of `ai-tools.html` and `src/ai-tools.css` revealed the following specific visual gimmicks that must be eradicated:

| Component / Selector | Current Implementation | Slop Pattern & Why It Must Be Removed |
|---|---|---|
| `.page-hero::before` (`src/ai-tools.css:87-93`) | `width: 900px; height: 600px; background: radial-gradient(ellipse, rgba(108,53,222,0.1), transparent 65%);` | **Decorative backdrop blob**: Oversized radial purple glow blob. Remove completely. |
| `.hero-label` (`src/ai-tools.css:94-106`) | `border-radius: 100px; background: rgba(108,53,222,0.12);` with `::before` pulsing green dot (`animation: pdot 2s infinite; background: var(--accent)`) | **Floating pill & pulsing neon indicator**: Gimmicky pulsating dot animation. Replace with crisp, static typography or neutral badge. |
| `.gradient-text` (`src/ai-tools.css:60-65`, `ai-tools.html:96, 195, 216, 255, 280`) | `background: linear-gradient(135deg, #6C35DE, #00D4FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;` | **Fluorescent gradient text**: High-saturation cyan/purple gradient text on `h1`, `h2` headings. Replace with solid, crisp typography (`var(--color-text)`). |
| `.search-bar` (`src/ai-tools.css:133-144`) | `border-radius: var(--r-lg)` (24px pill), `box-shadow: 0 8px 36px rgba(108,53,222,0.15);` and on focus: `0 8px 36px rgba(108,53,222,0.3), 0 0 0 3px rgba(108,53,222,0.1);` | **Neon search glow & pill curvature**: Replace with crisp rectangular search box (radius 6px–8px, 1px solid border, subtle neutral focus ring). |
| `.filter-bar` (`src/ai-tools.css:160-166`) | `backdrop-filter: blur(16px); background: rgba(10,10,15,0.96);` | **Heavy glassmorphism overlay**: Replace with clean solid/subtle border sticky bar. |
| `.filter-btn` (`src/ai-tools.css:182-200`) | `border-radius: 100px;` and `.filter-btn.active` has `background: #5b21b6; box-shadow: 0 3px 14px rgba(108,53,222,0.45);` | **Glowing pill filter buttons**: Replace with compact 6px radius segment buttons with subtle neutral active states. |
| `.sec-badge` (`src/ai-tools.css:312-317`) | `border-radius: 100px; background: rgba(255,184,0,0.12); border: 1px solid rgba(255,184,0,0.3); color: var(--yellow);` | **Neon badge pill**: Replace with crisp neutral badge or clean section heading. |
| `.tool-card` hover & pseudo (`src/ai-tools.css:341-361`) | `border-radius: var(--r-lg)` (24px), `box-shadow: 0 16px 48px rgba(108,53,222,0.18); transform: translateY(-6px);` plus animated top-border line `::after` with `background: var(--gradient); transform: scaleX(0);` | **Expanding rainbow border & buoyant hover lift**: Classic generic template animation. Replace with subtle 1px border shift (`var(--color-border)` to `var(--color-muted)`) and 6px–8px radius. |
| `.tool-logo` (`src/ai-tools.css:368-373`, `src/ai-tools.js:9, 24, etc.`) | Inline RGB colors (`rgba(16,163,127,0.15)`, `rgba(108,53,222,0.15)`, etc.) with oversized single letter | **Arbitrary pastel boxes**: Replace with clean, consistent slate/zinc tool glyphs or standardized logo presentation. |
| `.price-badge`, `.tag-badge` (`src/ai-tools.css:399-418`) | `border-radius: 100px;` with `.tag-badge.hot` (red glow), `.tag-badge.popular` (cyan glow) | **Pill tags with glowing colors**: Replace with 4px rectangular status chips in neutral muted tones. |
| Fake Rating Stars (`src/ai-tools.js:647-655`, `src/ai-tools.css:420-428`) | `renderStars(rating)`, `.star`, `.star.half`, `.rating-val`, fake "4.9 (125K)" | **Fabricated social proof**: Replace completely with verified capabilities metadata ("Verified Vendor", "API Available", "Self-Hosted / Open Weights"). |
| `.visit-btn` (`src/ai-tools.css:455-462`) | `background: linear-gradient(135deg, var(--primary), var(--primary-light)); box-shadow: 0 6px 18px rgba(108,53,222,0.5);` | **Glowing gradient CTA button**: Replace with solid, understated SaaS button. |
| `.submit-card` & button (`src/ai-tools.css:714-748`) | Floating card with fluorescent checkmarks (`--accent: #00FF88`), gradient button with purple drop-shadow | **Glow submit card**: Replace with disciplined SaaS contact/submit panel. |

---

## 3. Preserved Functional Architecture & DOM Invariants

The Tools Directory contains critical interactive logic and Playwright test assertions that **MUST NOT BE BROKEN**.

### 3.1 DOM Element IDs Requiring Strict Preservation
1. `#toolSearch` — Text input for tool search (`tests/journeys.spec.js:12, 14`, `tests/phase2.spec.js:119`).
2. `#searchClear` — Clear button to reset search input (`src/ai-tools.js:688, 696`).
3. `#filterScroll` — Container housing filter buttons (`src/ai-tools.js:998, 1020`).
4. `#fc-all`, `#fc-free`, `#fc-freemium`, `#fc-paid` — Counter badges for pricing filters (`src/ai-tools.js:984-993`).
5. `#featuredToolsGrid` — Grid container for featured tools (`tests/journeys.spec.js:13`, `tests/phase2.spec.js:118, 121, 123`, `tests/phase3.spec.js:50`, `src/components.css:36`).
6. `#toolsGrid` — Grid container for remaining tools (`tests/journeys.spec.js:13`, `tests/phase2.spec.js:120`, `tests/phase3.spec.js:50`, `src/components.css:36`).
7. `#toolCount` — Element displaying count string (`tests/journeys.spec.js:17`: expects text containing `'tool'`).
8. `#sortTools` — `<select>` dropdown for sorting tools (`src/ai-tools.js:706, 999`).
9. `#compareBar` — Sticky bar shown when tools are selected for comparison (`src/ai-tools.js:781, 1073`).
10. `#compareChips` — Container for selected tool chips in compare bar (`src/ai-tools.js:782, 798`).
11. `#compareInfo` — Selection summary text (e.g. "X/3 tools selected") (`src/ai-tools.js:783, 795`).
12. `#compareBtn` — Button enabling comparison table (`tests/journeys.spec.js:21-22`).
13. `#clearCompareBtn` — Button to clear all comparison selections (`src/ai-tools.js:1000, 1037`).
14. `#closeCompareBtn` — Button to close comparison table (`src/ai-tools.js:1002, 1049`).
15. `#compareSection` — Section wrapping the comparison table (`tests/journeys.spec.js:23`).
16. `#compareTable` — Table populated dynamically (`tests/journeys.spec.js:24`: expects `#compareTable thead th` count to equal `compareList.length + 1`).
17. `#submitToolForm` — Tool submission form (`src/ai-tools.js:1004, 1061`).
18. `#submitToolName`, `#submitToolUrl`, `#submitToolCategory`, `#submitToolPricing`, `#submitToolDescription`, `#submitToolEmail` — Input elements inside submit form.
19. `#toolDetailModal` — Dialog modal for tool overview (`tests/phase3.spec.js` style dialog management via `src/dialog.js`).
20. `#toolDetailBody` — Target container for modal details (`src/ai-tools.js:559, 564`).
21. `#toolDetailClose` — Close button for modal (`src/ai-tools.js:1005, 1067`).
22. `#toast`, `#toastMsg`, `#toastIcon` — Toast notification banner elements.
23. `#hamburger`, `#navMenu`, `#mobileMenu` — Mobile navigation controls (`tests/phase1.spec.js:46-64`, `tests/phase2.spec.js:88-113`).
24. `#navbar`, `#main-content` — Accessibility skip link and navigation structure.

### 3.2 CSS Classes, Roles & Accessibility Invariants
1. `.tool-card` — Each card element must have class `tool-card`.
2. **Strict Accessibility Requirement from `tests/phase3.spec.js:48-61`**:
   - `card` must NOT have `role="button"`!
   - `card` must NOT have `tabindex="0"`!
   - `card` must have nested controls:
     - Button named exactly `"Details"` (`card.getByRole('button', { name: 'Details', exact: true })`)
     - Link named exactly `"Visit Tool"` (`card.getByRole('link', { name: 'Visit Tool', exact: true })`)
     - When focused on `"Details"`, pressing Tab MUST focus `"Visit Tool"`!
3. `.filter-btn[data-filter="..."]` — Filter buttons must keep their `data-filter` attribute (e.g. `data-filter="writing"`, `data-filter="all"`, `data-filter="free"`, `data-filter="freemium"`, `data-filter="paid"`).
4. `[data-action="quick-compare"]` — Button in tool card triggering comparison (`tests/journeys.spec.js:18`).
5. `[data-action="open-tool"]` — Action on "Details" button and card background.
6. `[data-action="toggle-save"]` — Action on bookmark button.
7. `[data-action="visit-tool"]` — Action on "Visit Tool" link.
8. `[data-action="toggle-compare"]` — Action on compare checkbox.
9. `[data-action="reset-filters"]` — Action on empty state button named `"Show All Tools"` (`tests/phase2.spec.js:122`).
10. `markGrid(featuredGrid, 'ready')` and `markGrid(allGrid, filteredTools.length ? 'ready' : 'empty')` — Required for grid state management (`data-state="ready"` vs `data-state="empty"`).
11. `body[data-compare-bar-open="true"]` and CSS property `--ai-tools-compare-offset` — Offsets the global chat launcher widget when the comparison bar is visible.

### 3.3 Storage Keys
- `sanzy_saved_tools`: Persisted in `localStorage` as JSON array of tool IDs. Preserves user favorites across sessions.
- `sanzy_theme`: Persisted in `localStorage` (`"light"` | `"dark"`).
- `sanzy_cookies`: Persisted user cookie consent (`"declined"` | `"accepted"`).

### 3.4 Page Title & SEO Invariants
- `tests/smoke.spec.js:6` requires:
  `{ path: '/ai-tools', titlePart: 'AI Tools' }`
  `await expect(page).toHaveTitle(new RegExp(pageMeta.titlePart, 'i'));`
  **Constraint**: The `<title>` MUST contain the words `"AI Tools"` (case-insensitive) while presenting the new editorial framing.
  *Recommended Title*: `<title>Creator & AI Tools Directory — Curated Web Utilities | SanzyAI</title>`
- Structured Data: `ai-tools.html` contains an `ItemList` JSON-LD schema which must be preserved and kept valid for `npm run validate:structured-data`.

---

## 4. Content De-Hype & Editorial Reframe Catalog

All 20 tools currently embedded in `src/ai-tools.js` have been audited. The current copy uses generic marketing hyperbole ("world's most powerful", "10x speed", "AI superpowers", "the king of no-code", "unmatched quality").

Below is the complete editorial refactoring table converting all 20 tools into objective, utility-first creator catalog entries:

| ID | Tool Name | Current Buzzy Copy | Curated Human Editorial Copy | Curated Tags | Pricing Specification |
|---|---|---|---|---|---|
| 1 | **ChatGPT** | "The world's most powerful AI chatbot. Write, code, analyze, research — ChatGPT does it all with unmatched intelligence and versatility." | "Conversational language model and reasoning assistant for drafting content, debugging code, and synthesizing research across complex tasks." | `['LLM Reasoning', 'Multi-Modal']` | Free tier / $20/mo Plus |
| 2 | **Jasper AI** | "AI content writer built for marketing teams. Generate blog posts, ads, social content and brand copy at 10x speed with consistent brand voice." | "Marketing-focused writing platform equipped with brand voice templates, campaign workflows, and structured team collaboration." | `['Marketing Workflows', 'Brand Voice']` | $39/mo |
| 3 | **Copy.ai** | "AI copywriting tool that writes high-converting marketing copy in seconds. From emails to landing pages — Copy.ai has 90+ templates ready." | "Automated copywriting assistant with pre-built frameworks for email campaigns, ad copy, and landing page outlines." | `['Copywriting', 'Template Library']` | Free tier / $49/mo |
| 4 | **Midjourney** | "The gold standard of AI image generation. Create breathtaking, photorealistic and artistic images with simple text prompts. Unmatched quality." | "High-fidelity text-to-image synthesis engine optimized for detailed artistic composition, concept art, and visual prototyping." | `['Image Synthesis', 'Artistic Prototyping']` | $10/mo |
| 5 | **DALL-E 3** | "OpenAI's powerful image generator now integrated directly into ChatGPT. Create detailed, accurate images from text descriptions with ease." | "Prompt-adherent image generation engine by OpenAI, integrated into ChatGPT for contextual visual rendering." | `['Image Generation', 'ChatGPT Native']` | Included in Plus / Free API |
| 6 | **Stable Diffusion** | "Open-source AI image generation that runs locally on your machine. 100% free, unlimited generations, and full privacy — the developer's choice." | "Open-weights diffusion model architecture capable of local deployment, fine-tuning, and offline batch generation." | `['Open Weights', 'Local Execution']` | Free (Open Source) |
| 7 | **Canva AI** | "Design anything with AI superpowers. Magic Write, Text-to-Image, Background Remover and more — all inside Canva's intuitive drag-and-drop editor." | "Web-based graphic design suite integrating automated layout assistance, asset removal, and rapid social media template generation." | `['Graphic Design', 'Template Workflows']` | Free tier / $12.99/mo |
| 8 | **Runway ML** | "Next-generation AI video generation and editing. Generate videos from text, remove backgrounds, add effects — the future of creative video production." | "Creative video synthesis suite supporting text-to-video, motion brush control, and video-to-video stylized rendering." | `['Video Synthesis', 'Motion Editing']` | $15/mo |
| 9 | **Synthesia** | "Create professional AI avatar videos in 120+ languages without cameras or crews. Perfect for corporate training, marketing and explainer videos." | "Synthetic presenter platform generating multilingual avatar presentations for documentation, onboarding, and training modules." | `['Avatar Video', 'Multilingual']` | $22/mo |
| 10 | **Pictory** | "Turn any text, script or blog post into engaging videos automatically. Add AI voiceovers, stock footage and captions — no editing skills needed." | "Long-form to short-form video repurposing utility that extracts clips, generates subtitles, and pairs script segments with B-roll footage." | `['Video Repurposing', 'Subtitles & B-Roll']` | $19/mo |
| 11 | **GitHub Copilot** | "Your AI pair programmer. GitHub Copilot suggests entire functions, writes tests, and explains code in real-time directly inside your editor." | "IDE-integrated code completion and assistant that suggests syntactical blocks, unit tests, and inline function definitions." | `['Code Completion', 'IDE Integration']` | $10/mo |
| 12 | **Cursor AI** | "The AI-first code editor that actually understands your entire codebase. Chat with your code, fix bugs instantly, and generate features end-to-end." | "VS Code-based code editor built with multi-file codebase indexing, inline diff editing, and terminal assistance." | `['Codebase Indexing', 'Inline Editing']` | Free tier / $20/mo |
| 13 | **Surfer SEO** | "Data-driven AI SEO tool that analyzes top-ranking pages and tells you exactly what to write. Boost rankings with AI content optimization." | "Content optimization engine that benchmarks SERP competitor structures, keyword frequencies, and topical coverage density." | `['SERP Analysis', 'Content Optimization']` | $69/mo |
| 14 | **Semrush AI** | "All-in-one AI marketing suite with SEO, PPC, content marketing, competitor analysis and social media tools trusted by 10M+ marketers worldwide." | "Comprehensive digital marketing suite encompassing search volume tracking, backlink audits, competitor positioning, and editorial workflow tools." | `['Competitive Analysis', 'Search Audits']` | $129/mo |
| 15 | **ElevenLabs** | "The most realistic AI voice generator on the market. Clone any voice, generate ultra-natural speech in 29 languages, and create custom AI voices." | "High-accuracy neural text-to-speech platform with vocal inflection controls, voice cloning features, and multi-language support." | `['Voice Synthesis', 'Speech Cloning']` | Free tier / $5/mo |
| 16 | **Murf AI** | "Studio-quality AI voiceovers in minutes. Choose from 120+ voices in 20+ languages — perfect for videos, podcasts, presentations and e-learning." | "Voice synthesis workstation providing curated narrator timbres, pitch adjustments, and synced audio-video timelines for presentations." | `['Voiceovers', 'Narrator Library']` | Free tier / $19/mo |
| 17 | **Notion AI** | "AI writing and thinking partner built into Notion. Draft docs, summarize notes, create action items, translate content — all within your workspace." | "Workspace-embedded writing and synthesis tool for summarizing meeting notes, extracting action items, and drafting outlines." | `['Workspace Utility', 'Note Summarization']` | $10/mo add-on |
| 18 | **Zapier AI** | "Connect and automate 6,000+ apps with AI. Create intelligent workflows with natural language — no coding needed. The king of no-code automation." | "Cloud automation platform connecting disparate web APIs with natural language trigger setup and automated data routing." | `['API Orchestration', 'Workflow Triggers']` | Free tier / $19.99/mo |
| 19 | **Perplexity AI** | "AI-powered answer engine that searches the web in real-time. Get cited, up-to-date answers with sources — the smarter alternative to Google Search." | "Conversational answer engine with real-time web retrieval, bibliographic citations, and domain-scoped research filtering." | `['Cited Web Retrieval', 'Research Synthesis']` | Free tier / $20/mo |
| 20 | **Consensus AI** | "Search engine for scientific research powered by AI. Find evidence-based answers from 200M+ peer-reviewed papers — perfect for academics and researchers." | "Academic research search engine summarizing findings and consensus across peer-reviewed paper repositories." | `['Peer-Reviewed Citations', 'Academic Search']` | Free tier / $9.99/mo |

### 4.1 Page-Level Copy Refactoring
- **Hero Title**: `Curated Digital & Web Creator Tools`
- **Hero Subtitle**: `A vetted index of production utilities, generation engines, and workflow software for creators, engineers, and digital builders. Objective pricing tiers, core capability tags, and direct vendor access.`
- **Hero Stats Bar**:
  - `20` Listed Tools
  - `6` Free Tier Available
  - `8` Freemium Workflows
  - `6` Commercial / Pro
- **Section 1 Header (Featured)**: `Core Production Stack` (Badge: `Curated Benchmarks`)
- **Section 2 Header (All Tools)**: `Complete Creator Tools Catalog` (Badge: `Directory Index`)
- **Submit Form Section**:
  - Title: `Submit a Creator Tool for Indexing`
  - Subtitle: `Suggest a production utility, creative engine, or developer tool for editorial review and directory inclusion.`
  - Perks:
    - "Free editorial review process"
    - "Evaluated on workflow reliability & transparency"
    - "Direct canonical links included"
    - "Updated listing specifications"

---

## 5. Target UI Architecture & Design System Specification

### 5.1 Design System Tokens & Foundations
- **Foundations**: Restrained Neutral Slate/Zinc.
  - Background Canvas: `var(--color-canvas)` (`#090b14` dark / `#f6f7fc` light).
  - Surface Container: `var(--color-surface)` (`#121626` dark / `#ffffff` light).
  - Raised Surface: `var(--color-surface-raised)` (`#1a2033` dark / `#edf0fa` light).
  - Precision Borders: `1px solid var(--color-border)` (dark: `rgba(146, 158, 201, 0.24)`, light: `rgba(70, 85, 130, 0.22)`).
  - Controlled Accent: Single primary brand tone (`var(--color-brand)` `#6c35de`), with zero neon cyan or violet drop-shadows.
- **Border Radii Budget**:
  - Cards & Containers: `6px–8px` (replace current `18px-24px` oversized radii).
  - Controls, Buttons, Inputs: `6px`.
  - Tags, Chips, Badges: `4px` (replace `100px` pill badges).
- **Shadows & Effects**:
  - Eliminate all `box-shadow: 0 16px 48px rgba(108,53,222,...)`.
  - Use subtle elevation: `var(--shadow-card)` (`0 8px 28px rgba(0,0,0,0.2)` dark / `rgba(38,49,87,0.08)` light).
  - Zero backdrop blur (`backdrop-filter: none`).

### 5.2 Structured Card / Data Row Hybrid Component Architecture
Instead of generic, puffy floating cards, each tool in the directory will be rendered as a **compact, high-density structured card**:
1. **Header Row**:
   - Clean slate glyph container (36px × 36px, 6px radius, neutral background `var(--color-surface-raised)`, 1px border) with clean initial or monoline icon.
   - Tool Name (`font-size: 1rem`, `font-weight: 600`, crisp sans-serif).
   - Category Chip (`font-size: 0.72rem`, `4px radius`, subtle muted neutral).
   - Bookmark button (top-right, 28px × 28px, 4px radius, clean SVG outline/fill).
2. **Pricing & Capabilities Row**:
   - Pricing Badge: 4px radius, clear legible contrast (Free: subtle emerald, Freemium: subtle amber, Paid: subtle slate/blue).
   - Practical Feature Tags: 4px radius, subtle border, concise text ("LLM Reasoning", "API Available", "Open Weights").
3. **Editorial Summary**:
   - Concise 2-line clamped summary in `var(--color-muted)`, `font-size: 0.86rem`, line-height 1.5.
4. **Data Specifications Line**:
   - Starting price indicator: "Starting: **Free + $20/mo**".
   - Verified status indicator: "Verified Vendor Specs".
5. **Interactive Controls Footer**:
   - Nested button: `"Details"` (secondary compact button, `font-size: 0.8rem`, `padding: 6px 12px`, 6px radius).
   - Nested link: `"Visit Tool"` (primary neutral button, `font-size: 0.8rem`, `padding: 6px 14px`, 6px radius, external link indicator).
   - Sequential tab navigation preserved: Tab from "Details" goes immediately to "Visit Tool".
   - Compare toggle: Compact checkbox labeled "Compare".

### 5.3 Comparison Drawer & Table Architecture
- Docked sticky bottom drawer with `background: var(--color-surface)`, 1px solid top border.
- Selected chips: 4px–6px radius, neutral slate fill, crisp remove `✕` icon.
- Table: High-density data grid (`1px solid var(--color-border)`), clean alternating row backgrounds (`var(--color-surface)` and `var(--color-surface-raised)`), clear tabular column headers.

### 5.4 WCAG 2.1 AA Light & Dark Contrast Compliance
All status colors and text badges must be audited for color contrast:
- In dark mode (`#090b14` canvas):
  - Free text: `#22c55e` (contrast 6.2:1)
  - Warning/Freemium text: `#fbbf24` (contrast 8.5:1)
  - Paid/Commercial text: `#93c5fd` or `#f87171` (contrast > 5.5:1)
  - Neutral text: `#f2f4ff` on `#121626` (contrast 12.8:1)
  - Muted text: `#abb4cc` on `#121626` (contrast 6.4:1)
- In light mode (`#f6f7fc` canvas / `#ffffff` surface):
  - Free text: `#15803d` (dark emerald, contrast 5.1:1 on white)
  - Freemium text: `#b45309` (dark amber, contrast 5.2:1 on white)
  - Paid text: `#1d4ed8` or `#b91c1c` (contrast > 5.0:1 on white)
  - Text body: `#20283e` (contrast 13.5:1)
  - Muted text: `#475569` (contrast 5.8:1)

---

## 6. Quality Gate & Test Verification Matrix

Every change to `ai-tools.html`, `src/ai-tools.css`, and `src/ai-tools.js` must satisfy the repository quality gates:

| Verification Gate | Command | Key Invariant & Compliance Rule |
|---|---|---|
| **Zero Inline Handlers** | `npm run check:inline-handlers` | Absolutely NO `onclick`, `onchange`, `onsubmit` attributes in HTML or dynamically generated templates. Use event listeners and `data-action` delegations. |
| **Initial JS Performance Budget** | `npm run test:performance` | Initial JS graph for `ai-tools` must not exceed **70,000 bytes** (current: 62,074 bytes). No forbidden heavy modules (`pdf-export`, `html2canvas`, `sanitizer`). |
| **Strict HTML Standards** | `npm run validate:html` | `html-validate` must exit with code 0 across all pages. Valid semantic HTML5 markup, proper ARIA attributes, valid buttons. |
| **Structured Data** | `npm run validate:structured-data` | Preserve JSON-LD `ItemList` block in `ai-tools.html`. Must have valid `@context`, `@type`, `url`, `name`, `description`. |
| **Route Validation** | `npm run check:routes` | All navigation links, footer links, and canonical URLs must resolve to valid routes. |
| **Critical Journeys Test** | `npx playwright test tests/journeys.spec.js` | Journey test validates: search for "ChatGPT", filter by "writing", select 2 tools for comparison, assert `#compareBtn` enabled, click `#compareBtn`, assert `#compareSection` visible and `#compareTable thead th` has count 3. |
| **Empty State & Featured Recovery** | `npx playwright test tests/phase2.spec.js` | Search with invalid query transitions `#toolsGrid` to `data-state="empty"`, hides `#featuredToolsGrid`, clicking "Show All Tools" button restores featured cards. |
| **Card Keyboard Tab Navigation** | `npx playwright test tests/phase3.spec.js` | `.tool-card` must not have `role="button"` or `tabindex="0"`. `Details` button and `Visit Tool` link must be keyboard reachable in direct sequential order via Tab key. |
| **Automated Accessibility Audit** | `npm run test:a11y:ci` | `@axe-core/playwright` WCAG 2.1 AA evaluation in both light and dark themes must pass with 0 rule violations. |
| **Vite Production Build** | `npm run build` | All 31 pages must bundle cleanly with zero compile errors. |

---

## 7. Action Plan for Implementer Agent

When implementing the redesign:
1. **Update `ai-tools.html`**:
   - Refactor page `<title>`: `<title>Creator & AI Tools Directory — Curated Web Utilities | SanzyAI</title>`.
   - Update meta description, canonical, and JSON-LD schema with curated editorial framing.
   - Refactor Hero section: remove gradient text, remove pulsing dot, implement clean stat row with tabular numerals.
   - Replace filter bar pill styling with compact segment controls.
   - Refactor section titles: remove gradient text and glowing badges.
   - Update submission form card: remove neon icons, provide clean SaaS copy.
   - Confirm ZERO inline handlers (`onclick`, etc.).
2. **Update `src/ai-tools.css`**:
   - Strip all gradient text clipping, glowing box shadows (`rgba(108,53,222,0.35)`), radial backdrop blobs (`.page-hero::before`), expanding hover top-border lines (`.tool-card::after`), and 100px pill border-radii.
   - Apply disciplined design system: `1px solid var(--color-border)`, `border-radius: 6px-8px`, subtle surface colors, controlled primary accent.
   - Ensure light and dark mode WCAG AA color contrast on all badges and buttons.
3. **Update `src/ai-tools.js`**:
   - Update the 20 tool descriptions and tags with the curated human editorial catalog table.
   - Update card generation logic: ensure compact layout, remove pastel logo backgrounds, preserve `[data-action="open-tool"]`, `[data-action="quick-compare"]`, `[data-action="toggle-save"]`, `[data-action="visit-tool"]`.
   - Ensure the "Details" button and "Visit Tool" link remain adjacent focusable controls without `role="button"` or `tabindex="0"` on the parent `.tool-card`.
   - Preserve `localStorage.setItem('sanzy_saved_tools', ...)` logic.
   - Update modal generation to render clean, readable editorial sections without repetitive synthetic sentences.
4. **Run Validation Commands**:
   - `npm run check:inline-handlers`
   - `npm run validate:structured-data`
   - `npm run check:routes`
   - `npm run build`
   - `npm run test:performance`
   - `npm run validate:html`
