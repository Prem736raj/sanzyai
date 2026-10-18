## 2026-10-17T15:00:08Z
You are Worker M4 (Learn Free Syllabus Redesign).
Your Working Directory: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\worker_m4
Authoritative User Request: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\ORIGINAL_REQUEST.md
Project Blueprint: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\orchestrator_1\PROJECT.md
Survey & Specification Report: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\explorer_survey_3\report.md
Skill Instructions: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\skills\gravitas\SKILL.md
Project Root: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main
Repository Instructions: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\AGENTS.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope & Write Ownership:
You EXCLUSIVELY own:
- `learn-free.html`
- `src/learn-free.css`
- `src/learn-free.js`
DO NOT modify any other files in `src/` or any other `.html` files.

Mission:
Execute Milestone 4 — Redesign the Learn Free page into an authentic, structured digital curriculum / syllabus with editorial typography, clear phase milestones, clean collapsible modules, legible reading line-length, and an uncluttered sprint builder per `explorer_survey_3/report.md`:

1. **Fix Critical CI Blocker (Schema.org JSON-LD)**:
   Add a valid Schema.org `Course` JSON-LD block in the `<head>` of `learn-free.html` matching canonical URL `https://sanzyai.com/learn-free` and including all required fields (`name`, `description`, `provider`, `url`). Verify with `npm run validate:structured-data`.

2. **Aesthetic De-Slop & Design System Conformance**:
   - In `learn-free.html` and `src/learn-free.css`, remove body radial gradient blobs (`radial-gradient(1000px 500px... rgba(20, 199, 255, 0.2))`), 999px floating pills, glowing cyan/purple box-shadows (`box-shadow: 0 0 15px...`), and bouncy keyframes (`badgePop`, `stageCardIn`).
   - Remove duplicated CSS in `src/learn-free.css` (lines 207-251 duplicated at lines 453-550).
   - Enforce max 8px border-radius on cards, panels, and containers, 6px on controls/inputs/buttons, 4px on badges/chips.
   - Strict 1px solid `var(--color-border)` borders with clean Slate/Zinc surfaces (`var(--color-canvas)`, `var(--color-surface)`).
   - Strictly NO inline event handlers (`onclick`, `onchange`, etc.)! Maintain script-src-attr CSP compliance.

3. **Curated Human Editorial Reframe**:
   - Title: `Web Building & Development Curriculum — Step-by-Step Production Syllabus | SanzyAI`
   - Hero `<h1>`: `Build and Deploy a Production Web Project`
   - Hero description: `Comprehensive zero-cost and managed web architecture curriculum. Inspect validated niches, configure edge infrastructure, deploy production code, and scale organic acquisition.`
   - Reframe vanity badge titles and replace guru clichés ("Zero to Hero", "Value Bombs", "Passive income machine") per `explorer_survey_3/report.md § 6`.

4. **DOM Invariants & Playwright Test Contracts**:
   - Quiz buttons exact text: `'Learning & Hobby'`, `'$0 (Zero)'`, `'3-5 Hours'` (`tests/phase1.spec.js:127`).
   - Path switch group: `div.path-switch[role="group"][aria-label="Learning mode"]` with buttons `#freePathBtn` ('Start Free Path') with `aria-pressed="true"` and `#paidPathBtn` ('Start Paid Path') with `aria-pressed="false"` (`tests/phase3.spec.js:34`, `tests/journeys.spec.js:52`).
   - Sprint generator: `#nicheInput`, `#hoursInput`, `#channelInput`, `#generateSprintBtn`, `#growthOutput` (must contain `'Week 4'`), `#savePlanPdfBtn` (downloading `'sprint-plan.pdf'`).
   - Budget simulator: `#projectType`, `#trafficRange`, `#trafficOut`, `#aiUsage`, `#freeEstimate`, `#freeYearly`, `#paidEstimate`, `#paidYearly`.
   - Progress ring & metrics: `#learnRing`, `#learnProgressPct`, `#streakDays`, `#tasksDone`, `#stagesSeen`, `#badgeList`.
   - Roadmap & detail panel: `#roadmapTrack`, `.stage-card`, `#stagePanel`, `#stageTitle`, `#stageSummary`, `#stageMeta`, `#stageTasks`, `#stageDomainLink`, `#stageStepList`.
   - Checklist: `#checkGrid`, `#checkProgressBar`, `#checkProgressText`.
   - Preserve all 16 phases (8 Free + 8 Paid) in `src/learn-free.js`.
   - Dynamic PDF loading: `jspdf` must remain dynamically imported so initial uncompressed JS bundle remains well under the 65,000 bytes budget.
   - All `<img>` tags must have numeric `width`, `height`, `decoding="async"`, and `loading` attribute.

5. **Verification Requirements**:
   - `npm run check:inline-handlers` (0 inline handlers)
   - `npm run validate:structured-data` (0 errors)
   - `npm run check:routes` (604 links valid)
   - `npm run build` (clean Vite build)
   - `npm run test:performance` (bundle < 65KB, all images compliant)
   - `npm run validate:html` (clean HTML validation)
   - `npm run test:api` (21/21 passed)
   - `npx playwright test tests/journeys.spec.js:52` (learning journey passes)
   - `npx playwright test tests/phase1.spec.js:120` (quiz journey passes)
   - `npx playwright test tests/phase2.spec.js:132` (PDF download passes)
   - `npx playwright test tests/phase3.spec.js:30` (learning mode toggle passes)
   - Accessibility audit on `/learn-free`:
     `npx start-server-and-test "vite preview --host 127.0.0.1 --port 4173" http://127.0.0.1:4173 "node scripts/audit-accessibility.mjs"`
     (Verify `/learn-free` passes WCAG AA in both light and dark modes).

6. Write your handoff report to:
   `c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\worker_m4\handoff.md`
7. Send a message to the orchestrator (`1a4b2012-a7ae-4b11-adaa-48708eba8bda`) when complete with all verification outputs.

## 2026-10-17T15:07:00Z
From: User
Content: do for learnfree, prompt store and ai services same as we do previously
Scope: Redesign learn-free, prompt-store, and ai-services with the same modern SaaS aesthetic, neutral Slate/Zinc palette, max 8px radius, 0 visual slop, de-hyped human editorial voice, preserving 100% interactive functionality, DOM IDs, test invariants, zero inline event handlers, valid Schema.org structured data, and WCAG 2.1 AA accessibility.


## 2026-10-17T15:10:20Z
**Context**: Milestone 4 Scope Boundary Confirmation
**Content**: Please note that your EXCLUSIVE write ownership is strictly:
- `learn-free.html`
- `src/learn-free.css`
- `src/learn-free.js`
Do NOT modify `prompt-store.html`, `ai-services.html`, or any other pages. The project redesign scope is strictly the 3 target pages (`/learn-free`, `/ai-tools`, `/domain-finder`). Once you complete `learn-free.html`, `src/learn-free.css`, and `src/learn-free.js` and verify all tests, proceed directly to write your handoff report.
**Action**: Confine all edits exclusively to `learn-free.html`, `src/learn-free.css`, and `src/learn-free.js`.
