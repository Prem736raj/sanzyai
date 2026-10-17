# Phase 2 — Performance and UX stability

Implemented 17 October 2026 against roadmap items 8–15. This phase preserves the 31-page Vite MPA and the Phase 1 checkout pause. It improves the existing interface; a full brand redesign and product redevelopment are separate work.

## Roadmap delivery

| Item | Change |
| --- | --- |
| 8. Split heavy bundles | PDF export, chat, sanitizer and shared preload helpers have separate import boundaries. Homepage summaries no longer import full prompt bodies. Decorative hero code is a separate idle-loaded module. |
| 9. Defer optional widgets | A small, keyboard-accessible guide launcher appears immediately. Guide code/CSS load on click or after a 2.5-second delay followed by idle time. Data-saving connections skip automatic guide loading. A slow first click opens after loading; a failed import offers an explicit reload and contact link. |
| 10. Image strategy | All 78 HTML image tags have explicit dimensions, async decoding and eager/lazy intent. Small brand images stay eager. Offscreen portfolio and store images use native lazy loading with reserved containers. Store backgrounds became actual image elements. |
| 11. Semantic tokens | `src/tokens.css` owns shared colors, spacing, typography, radii and motion values. Existing page variables alias these values while page-specific layout rules remain in their paired CSS files. Light/dark semantic values are provided. |
| 12. Navigation | A shared 1100px breakpoint controls the desktop/mobile switch. Mobile panels fit short viewports and scroll internally; resizing to desktop closes the panel and releases scroll locking. Escape restores focus to the toggle. |
| 13. Reusable components | `src/components.css` supplies `ui-card`, `ui-button`, loading placeholders and state-message styles used by homepage, tools, store and news cards/actions. |
| 14. Loading states | Static placeholders reserve space before scripts run. News has loading, refreshing, ready, empty and error states, with retry. Existing stories remain visible during a failed refresh. Tool/store filters recover from empty results. |
| 15. Layout stability | Sized images, reserved grid space, stable scrollbar gutters and tabular stat digits reduce avoidable shifts. Reduced-motion users receive final counter values directly. Decorative animation stops offscreen/in hidden tabs. Modal checks verify the header stays in place. |

## Bundle measurements

The baseline is saved in [phase2-baseline.json](phase2-baseline.json). The current repeatable result is [phase2-performance.json](phase2-performance.json).

| Page | Before (raw kB) | After (raw kB) | Reduction |
| --- | ---: | ---: | ---: |
| Homepage | 498.7 | 36.0 | 92.8% |
| Learning | 499.3 | 51.3 | 89.7% |
| Prompt samples | 515.3 | 68.5 | 86.7% |
| Tool directory | 503.3 | 55.8 | 88.9% |
| News | 489.3 | 42.2 | 91.4% |

The measurement counts a production entry's static JavaScript import graph, including shared dependencies and excluding dynamic imports. Baseline HTML script/modulepreload files represented the corresponding eager graph. Raw and gzip estimates are recorded. These are build measurements, not Lighthouse scores, real-user load times or Core Web Vitals. Chat and optional hero code load later; PDF code is requested only for export.

Run `npm run build` followed by `npm run test:performance`. The guard fails if a main page exceeds its byte budget, if chat/sanitizer/PDF code enters its initial graph, or if an HTML image loses sizing/loading attributes. It runs in the full local quality gate and the CI workflow.

## Additional UX corrections

- Restored visible search and platform controls for prompt samples. The `#free` link scrolls to the free download without incorrectly applying a free-product filter to the paused catalog.
- Removed a delayed upsell that still quoted a paid-pack price after the free download.
- Fixed the news card's explicit analysis button so it opens the analysis dialog.
- Learning PDF export now includes the generated sprint, with pagination, instead of only its title. Busy state prevents repeat clicks and failures restore the button. Free-pack download also prevents simultaneous duplicate generation.
- Corrected the mobile menu's primary-link text color in light mode.

## Verification

`npm run quality:ci` exited 0 for the implementation. See the [full log](phase2-quality-final.log). A final visual check then found that an older `!important` declaration still overrode the menu action's text color. That scoped CSS correction was rebuilt and verified with the six-case navigation matrix, HTML validation and bundle/image guard; [final navigation log](phase2-navigation-final.log).

| Check | Observed result |
| --- | --- |
| Inline-handler guard | Passed. |
| API regressions | 12 passed, 0 failed. |
| Production build | Passed; all 31 HTML pages emitted. |
| Bundle/image guard | Passed for all five main pages and all 78 HTML image tags. |
| HTML validation | Passed. |
| Browser matrix | 106 cases succeeded: 102 initially, four on retry; 2.6 minutes. All 18 new Phase 2 cases passed initially. |
| Final menu follow-up | Six navigation checks passed without retries after the last CSS correction, including computed white text in light mode, short-screen scrolling and desktop resizing. |
| Retry diagnosis | All four were Edge `browser.newContext` failures before a test page existed: mobile newsletter/home smoke, desktop quote/domain smoke. They were not assertion failures. |
| Security continuity | All 37 emitted inline-script occurrences matched CSP hashes. No known server-secret identifiers/key prefix matched in emitted JS; [scope and result](phase2-security-check.json). |
| Local proxy | Health 200 with no key; readiness 503 with `ready: false`, as expected for an unconfigured Groq account. |

The corrected recovery/filter/resize matrix also passed 10 targeted checks without retries before the full run. The full browser matrix covers first-click loading, failed-import recovery, PDF export, pending/error/empty news, refresh retention, analysis opening, modal width stability and navigation across short/phone/desktop viewports. The initial test iterations exposed a cached failed-import retry and a missing store search control; both were repaired before the final gate.

Browser tests mock AI/news responses and block remote images/fonts. Separate browser visual checks use the actual page. Playwright now uses its bundled Chromium by default on Windows and CI; `PLAYWRIGHT_CHANNEL` is an explicit opt-in for system-browser validation. Phone-size Chromium tests do not establish Safari compatibility.

Visual evidence: [desktop](phase2-desktop.png), [mobile](phase2-mobile.png), [mobile menu](phase2-mobile-menu.png), [sample card in light mode](phase2-store-mobile.png), [sample card in dark mode](phase2-store-dark.png). These show local pages; they do not prove a deployed host's behavior. Browser theme and viewport emulation were restored after inspection.

## Security and release continuity

The guide still imports DOMPurify before rendering responses. Grid-state text uses DOM text nodes. No new inline event handlers, secrets in client code or public form receivers were introduced. The build continues generating CSP hashes/security headers.

The [Phase 1 release requirements](PHASE1_RECOVERY.md) remain open where they depend on external systems: real provider configuration/delivery checks, external Gumroad correction, rebuilt paid content, production header/API routing verification, and provisioning the supported shared Redis REST store/alert destination when the deployment requires them. Shared-store support, feed parsing and the local security regressions are implemented. The downloaded workspace still has no Git repository.

A pre-change source backup is at `C:/Users/prem7/AppData/Local/Temp/sanzy-phase2-1792175814`. It excludes real environment files, dependencies, build output and delivery archives.
