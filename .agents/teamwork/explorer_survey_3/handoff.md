# 5-Component Handoff Report: Learn Free, Design System & CI Survey

**Agent**: Explorer 3 (Learn Free, Design System & CI Survey)  
**Recipient**: Orchestrator (Conversation ID: `1a4b2012-a7ae-4b11-adaa-48708eba8bda`)  
**Date**: 2026-10-17  
**Working Directory**: `c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main\.agents\teamwork\explorer_survey_3`  
**Full Investigation Report**: `.agents/teamwork/explorer_survey_3/report.md`

---

## 1. Observation

1. **Structured Data Validation Failure**:
   Running `npm run validate:structured-data` resulted in:
   ```
   > sanzy_ai_website@0.0.0 validate:structured-data
   > node scripts/validate-structured-data.mjs

   Structured-data validation failed with 1 issue(s):
   - learn-free.html: expected at least one JSON-LD block.
   ```
   In `scripts/validate-structured-data.mjs:5-13`, `learn-free.html` is explicitly included in `requiredSchemaFiles`. In `learn-free.html`, lines 1–424, there is zero `<script type="application/ld+json">` block.

2. **Visual Gimmicks on `/learn-free`**:
   - `src/learn-free.css:146-150`: Body background has dual radial neon glow gradients:
     `background: radial-gradient(1000px 500px at 80% -10%, rgba(20, 199, 255, 0.2)...), radial-gradient(900px 500px at 10% 0%, rgba(79, 121, 255, 0.2)...), var(--bg);`
   - `src/learn-free.css:32, 99, 179, 335, 340, 625, 681, 877`: `border-radius: 999px` used for `.hero-badge`, `.badges-container`, `.path-switch`, `.path-btn`, `.btn-mentor`, `.stage-type`, `.pill`, and `#checkProgressBar`.
   - `src/learn-free.css:15, 54, 352`: Heavy drop shadows and glows: `box-shadow: 0 0 15px rgba(79, 121, 255, 0.4);` on unlocked badges and `box-shadow: 0 8px 18px rgba(79, 121, 255, 0.38);` on active path buttons.
   - `src/learn-free.css:192, 351, 820, 884`: Fluorescent gradients: `linear-gradient(135deg, var(--brand), var(--brand-2))` across `.hero .grad`, `.path-btn.active`, and `.btn-main`.
   - `src/learn-free.css:453-550`: Completely duplicated CSS rules repeating lines 207–309 verbatim.

3. **Global Design Tokens**:
   - In `src/tokens.css:18-20`: `--radius-control: 10px;`, `--radius-card: 18px;`, `--radius-panel: 24px;`.
   - In `src/globals.css:41`: `--gradient-primary: linear-gradient(135deg, #6C35DE, #00D4FF);` and `--shadow-purple: 0 4px 24px rgba(108, 53, 222, 0.35);`.

4. **CI Quality Gate Constraints & Results**:
   - `npm run check:inline-handlers`: Passed cleanly. Enforces zero inline `on*="..."` handlers across all HTML and JS files via regex `/\son[a-z]+\s*=\s*["']/i`.
   - `npm run check:routes`: Passed cleanly (604 internal links verified across 31 routes).
   - `npm run test:api`: Passed cleanly (21/21 tests passed).
   - `npm run build`: Passed cleanly in 2.65s (31 HTML entry files built).
   - `npm run test:performance`:
     - Initial JS bytes: `learn-free` bundle is 56,772 bytes against a budget limit of 65,000 bytes (only 8,228 bytes headroom).
     - Static image audit: 77 images audited. Every `<img>` tag must have numeric `width` and `height`, `decoding="async"`, and `loading="eager"` or `loading="lazy"`.
   - `npm run validate:html`: Passed cleanly.

5. **Test Dependencies on `/learn-free`**:
   - `tests/phase1.spec.js:127-137`: Button texts `'Learning & Hobby'`, `'$0 (Zero)'`, `'3-5 Hours'`; elements `#quizResult`, `#nicheInput`, `#generateSprintBtn`, and text rendering inside `#growthOutput`.
   - `tests/phase2.spec.js:87-114, 132-145`: Header `#hamburger` / `[data-site-menu]`; `#nicheInput`, `#generateSprintBtn`, `#growthOutput` containing `'Week 4'`; dynamic download of `sprint-plan.pdf` via `#savePlanPdfBtn` without upfront bundle loading of `pdf-export`.
   - `tests/phase3.spec.js:34-46`: Group `[role="group"][aria-label="Learning mode"]` with `'Start Free Path'` (`aria-pressed="true"`) and `'Start Paid Path'` (`aria-pressed="false"`).
   - `tests/journeys.spec.js:52-60`: Path switching and sprint generation.
   - `scripts/audit-accessibility.mjs:5, 22-23`: Requires `h1` element and WCAG 2.1 A & AA compliance in both Light and Dark themes.

---

## 2. Logic Chain

1. **From Observation 1**: Because `scripts/validate-structured-data.mjs` runs as step 2 of `npm run quality:ci`, and `learn-free.html` currently lacks a JSON-LD block, `npm run quality:ci` currently fails on `learn-free.html`. Therefore, implementing a valid Schema.org `Course` JSON-LD block in `learn-free.html` is an essential requirement for verification to succeed.
2. **From Observation 2 & 3**: Because `ORIGINAL_REQUEST.md` (R1) mandates removing neon glows, fluorescent cyan/purple gradients, 999px pills, and backdrop blobs, and establishing a neutral slate/zinc foundation with 1px borders and 4px–8px radii, the design tokens in `src/tokens.css` must be adjusted to 6px/8px radii with slate/zinc neutral colors (`#0b0f19` dark / `#f8fafc` light), and `src/learn-free.css` must be purged of radial gradients, 999px radii, duplicated rules, and glowing box-shadows.
3. **From Observation 4**: Because `scripts/check-performance.mjs` enforces a 65,000 byte uncompressed bundle limit on `learn-free` and forbids initial graph imports of heavy modules, the redesign cannot import `jspdf` or other libraries upfront; it must keep `loadPdfLibrary()` dynamic in `src/learn-free.js`. Additionally, all `<img>` tags on `learn-free.html` must retain explicit `width`, `height`, `decoding="async"`, and `loading="eager"` or `loading="lazy"` attributes.
4. **From Observation 4 & 5**: Because `tests/phase1.spec.js`, `tests/phase2.spec.js`, and `tests/phase3.spec.js` assert specific button text, element IDs, and accessibility roles (`aria-label="Learning mode"`, `aria-pressed`, `#quizResult`, `#nicheInput`, `#generateSprintBtn`, `#savePlanPdfBtn`, `#growthOutput`), any structural or styling changes to `learn-free.html` must retain these exact IDs, texts, attributes, and event wiring.

---

## 3. Caveats

- **Scope Boundary**: This investigation examined `learn-free.html`, `src/learn-free.css`, `src/learn-free.js`, `src/tokens.css`, `src/globals.css`, and repository CI scripts. It did not alter source files (strict read-only investigation).
- **Playwright Test Runner**: Running full `playwright test` requires starting the preview server via `vite preview --host 127.0.0.1 --port 4173`, as configured in `package.json` (`test:smoke`).
- **No Other Caveats**: All selectors, IDs, schemas, and CSS rules have been verified against the current repository state.

---

## 4. Conclusion

The Learn Free page and global design tokens are primed for an authentic SaaS redesign:
1. `learn-free.html` must receive a Schema.org `Course` JSON-LD script block to fix the pre-existing CI structured-data failure.
2. `src/tokens.css` can be seamlessly upgraded to a slate/zinc foundation (`#0b0f19` dark / `#f8fafc` light, 1px solid `#334155`/`#e2e8f0` borders, 6px/8px radii, controlled indigo/blue accent) to establish a uniform system across `/learn-free`, `/ai-tools`, and `/domain-finder`.
3. `learn-free.html` and `src/learn-free.css` can be refactored into a clean, editorial curriculum/syllabus layout (prose line-length 65ch, two-column syllabus matrix, structured sprint builder, and zero pills/blobs/glows) while preserving 100% of the interactive quiz, path toggling, progress tracking, budget simulation, and PDF generation logic.

---

## 5. Verification Method

To verify the findings and any future implementation:
1. **Structured Data Check**:
   ```powershell
   npm run validate:structured-data
   ```
   *Expected Output*: Structured-data validation passed: JSON-LD block found and valid on `learn-free.html`.
2. **Inline Handlers Check**:
   ```powershell
   npm run check:inline-handlers
   ```
   *Expected Output*: Inline handler check passed (exit code 0).
3. **Route Check**:
   ```powershell
   npm run check:routes
   ```
   *Expected Output*: Route validation passed: 604 internal links valid.
4. **Vite Build**:
   ```powershell
   npm run build
   ```
   *Expected Output*: Vite v8.3.4 builds all 31 HTML entries in `dist/`.
5. **Performance & Image Audit**:
   ```powershell
   npm run test:performance
   ```
   *Expected Output*: `learn-free` under 65,000 initial JS bytes; static image audit passes with 0 failures; VERDICT: PASS.
6. **HTML Standards Validation**:
   ```powershell
   npm run validate:html
   ```
   *Expected Output*: Zero html-validate errors.
7. **Accessibility Suite**:
   ```powershell
   npm run test:a11y:ci
   ```
   *Expected Output*: Zero Axe violations across light and dark themes on `/learn-free` and other critical pages.
8. **Smoke & Journey Tests**:
   ```powershell
   npm run test:smoke
   ```
   *Expected Output*: All tests in `tests/smoke.spec.js`, `tests/phase1.spec.js`, `tests/phase2.spec.js`, `tests/phase3.spec.js`, and `tests/journeys.spec.js` pass.
9. **Full CI Quality Gate**:
   ```powershell
   npm run quality:ci
   ```
   *Expected Output*: All 9 quality gates pass with exit code 0.
