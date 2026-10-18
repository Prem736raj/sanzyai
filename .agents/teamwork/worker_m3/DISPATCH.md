## 2026-10-17T14:47:19Z
You are Worker M3 (Tools Directory Redesign).
Your Working Directory: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\worker_m3
Authoritative User Request: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\ORIGINAL_REQUEST.md
Project Blueprint: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\orchestrator_1\PROJECT.md
Survey & Specification Report: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\explorer_survey_2\report.md
Project Root: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main
Repository Instructions: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\AGENTS.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope & Write Ownership:
You EXCLUSIVELY own:
- `ai-tools.html`
- `src/ai-tools.css`
- `src/ai-tools.js`
DO NOT modify any other files in `src/` or any other `.html` files.

Mission:
Execute Milestone 3 — Redesign the Tools Directory from a buzzy "AI Directory" into a clean, modern SaaS curated "Digital & Web Creator Tools" catalog with restrained neutral slate/zinc tones, compact structured cards, and transparent utility categorization per `explorer_survey_2/report.md`:

1. **Aesthetic De-Slop & Design System Conformance**:
   - Remove backdrop radial blobs, neon purple glow gradients (`#6C35DE`, `#00D4FF`), glassmorphic blur filters, floating pill badges, and fake star ratings.
   - Enforce max 8px border-radius on cards and panels, 6px on controls/inputs, 4px on category tags.
   - Strict 1px solid `var(--color-border)` borders with clean Slate/Zinc surfaces (`var(--color-canvas)`, `var(--color-surface)`).
   - NO inline event handlers (`onclick`, etc.)! Maintain script-src-attr CSP compliance.

2. **Curated Human Editorial Reframe**:
   - `<title>` MUST contain `/AI Tools/i` (required by `tests/smoke.spec.js:18`):
     Use `<title>Creator & AI Tools Directory — Curated Web Utilities | SanzyAI</title>`
   - Hero `<h1>`: `Curated tools for web creators and developers`
   - Hero description: `Objective directory of high-utility software, developer utilities, design systems, and productivity platforms. Filter by category, compare specifications, and inspect feature sets.`
   - Rewrite all 20 embedded tools in `src/ai-tools.js` using the objective descriptions and realistic tags from `explorer_survey_2/report.md § 6`.

3. **DOM Invariants & Playwright Test Contracts**:
   - Preserve all DOM IDs: `#toolSearch`, `#toolCount`, `#featuredToolsGrid`, `#toolsGrid`, `#compareBtn`, `#compareSection`, `#compareTable`, `#filterPills`, `#viewFavoritesBtn`, `#backToTopBtn`, `#toast`, `#toastMsg`, `#navbar`, `#hamburger`, `#mobileMenu`, `#main-content`.
   - CRITICAL Accessibility & Test Contract (`tests/phase3.spec.js:48-60`):
     `.tool-card` must NOT have `role="button"` or `tabindex="0"`.
     The card's nested button "Details" and link "Visit Tool" MUST be sequentially adjacent tab stops!
   - Preserve search filtering, category pill filtering, bookmarking (`localStorage` key `sanzy_tools_favorites`), and tool comparison drawer.

4. **Verification Requirements**:
   - `npm run check:inline-handlers` (0 inline handlers)
   - `npm run validate:html` (0 validation errors)
   - `npm run build` (clean Vite production build)
   - `npm run test:api` (21/21 passed)
   - `npx playwright test tests/journeys.spec.js` (all journey tests pass)
   - `npx playwright test tests/phase3.spec.js` (accessible card navigation passes)
   - Run accessibility audit on `/ai-tools`:
     `npx start-server-and-test "vite preview --host 127.0.0.1 --port 4173" http://127.0.0.1:4173 "node scripts/audit-accessibility.mjs"`
     (Verify `/ai-tools` passes WCAG AA in both light and dark modes).

5. Write your handoff report to:
   `c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\worker_m3\handoff.md`
6. Send a message to the orchestrator (`1a4b2012-a7ae-4b11-adaa-48708eba8bda`) when complete with all verification outputs.
