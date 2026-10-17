# Phase 1 recovery — 16–17 October 2026

Scope: repair release blockers, mobile navigation, inaccurate storefront claims, failure handling and high-priority API weaknesses while preserving the Vite MPA. Product redevelopment and the broader design rebuild remain later phases.

## Changes

- Removed eight nonexistent build entries and added the existing pages previously omitted from production. Local scripts, including portfolio code, are bundled into page entries.
- Repaired malformed HTML, duplicate navigation IDs and malformed video portfolio data. Replaced inline handlers with declarative event bindings and strengthened the guard to include all event attributes.
- Repaired corrupted text, mobile navigation visibility, menu state and keyboard behavior. Escaped user input in the learning sprint output.
- Centralized product metadata/prices in `src/product-catalog.js`. Removed automatic permanent launch discounts and unverified storefront reviews/discount anchors. Homepage cards use the same catalog as the store.
- Paused paid checkout for all affected packs on this website; retained editable previews and preserved delivery files. The seven generated ZIPs each contain only 20 unique bodies; the YouTube file ends with an unfinished-content placeholder. The generator now rejects duplicate prompt bodies instead of silently creating inflated packs. All paid content needs quality review before checkout is restored.
- Removed the homepage's unverified testimonials and labeled portfolio demonstrations as concepts with illustrative metrics. Demo copy buttons now copy sample text rather than claiming downloads that did not occur.
- Added validated server-side form endpoints. Success requires acceptance by a configured receiver; failure retains user input. Newsletter addresses are no longer stored in localStorage or placed in a follow URL.
- Added stable connection-IP rate limits, explicit proxy trust, bounded counters, strict chat schemas, concurrency and daily upstream-attempt ceilings, sanitized API errors, request limits and origin rejection on actual requests.
- Chat availability follows `/api/ready`. News failures no longer show fabricated fallback headlines as current; concurrent refreshes share one upstream refresh.
- Removed the 404 page's premature chat timer and repaired a chat-open crash caused by accessing the notification after replacing its parent markup. Desktop/mobile regressions exercise opening, closing, reopening and the paused-pack reply. Offline guide replies and the server's AI instructions now reflect the paused storefront, quote confirmation and learning scope.
- Updated dependencies and CI runtime; added API and desktop/mobile journey regression tests. Builds emit document security headers for supported hosts.

## Verification

Final validation on 17 October 2026:

| Check | Observed result |
| --- | --- |
| `npm run quality:ci` | Exit 0 after the final code changes; [full log](phase1-quality-final.log). |
| Inline-handler guard and HTML validation | Passed. |
| API regression tests | 12 passed, 0 failed; mocked upstreams, no real provider messages or paid completions. |
| Production build | Passed; 31 HTML pages emitted. |
| Desktop/mobile browser matrix | 88 cases succeeded: 86 passed initially, 2 passed on retry; 4.1 minutes. Both retries were `browser.newContext` failures before the test page existed (mobile newsletter and desktop quote). The delayed 404/chat regression passed on both layouts. |
| `npm audit --audit-level=moderate` | Found 0 known vulnerabilities at the time of this check. |
| Emitted artifact check | 37 inline script occurrences matched CSP hashes. No known server-secret identifiers or Groq key prefix matched in emitted HTML/JS/JSON; [scan scope and result](phase1-artifact-check.json). This is not a general secret scan or penetration test. |
| Running local proxy | `/api/health` 200 with `hasKey: false`; `/api/ready` 503 with `ready: false`, as expected without a configured key. |
| Duplicate delivery guard | Generator refused repeated prompt bodies; delivery-file size/mtime snapshot stayed unchanged. |

External providers are mocked in regression tests. The matrix covers 31 production pages and critical journeys at desktop and phone sizes. Windows used installed Edge; Linux CI is configured for Playwright Chromium but was not run here. These phone-size tests do not establish Safari compatibility. Functional tests block external images/fonts; real browser layout checks were performed separately. See the [mobile navigation screenshot](phase1-mobile-menu.png).

Earlier validation exposed the 404 timer and notification-removal crashes; both were repaired before the final gate. One retry remains enabled for transient browser startup failures. Live accounts, production infrastructure, email delivery and real AI completion are not verified by this local result.

Current revalidation on 17 October 2026 after completing the later roadmap phases also passes the full `npm run quality:ci` gate. The API suite now has 21 passing tests, including shared Redis REST rate-limit/cache behavior, feed parsing, schema validation and error-budget alert coverage. The browser suite completed with 124 passed and 2 intentionally skipped tests without flaky retries or worker teardown failures. Playwright now uses its bundled Chromium by default; `PLAYWRIGHT_CHANNEL` remains available as an explicit system-browser override.

## Release requirements

1. Configure the real server-side Groq key and form receivers using [.env.example](../.env.example). Verify actual lead delivery, subscriber confirmation and a real chat response. Do not paste credentials into chat.
2. Verify all available products' final Gumroad prices, attached delivery files and refund/update terms. This local change does **not** unpublish the old external Gumroad listing. Pause or correct it there before promotion. See [Gumroad upload map](GUMROAD_UPLOAD_MAP.md).
3. Replace repeated paid content with distinct tested workflows using the [quality standard](PREMIUM_PROMPT_QUALITY_STANDARD.md). Existing ZIPs have been preserved for audit and customer support; generation is intentionally blocked when duplicates are detected.
4. Apply and verify document headers, HTTPS, `/api/*` routing, trusted-proxy configuration, provider spending caps and monitoring at the production host. Shared quotas are required before using multiple replicas. See [operations](OPS_RUNBOOK.md).
5. Record evidence/permission before restoring testimonials, customer ratings or case-study outcome claims. Review third-party tool prices and optional translation/analytics integrations before claiming freshness or enabling them in production.

## Remaining release work

The later [Top 25 roadmap](TOP_25_FIX_ROADMAP.md) work now covers shared Redis REST rate limits/cache, robust feed parsing, alert plumbing, performance/UX, accessibility/quality gates and SEO/growth operations locally. Production Redis/alert provisioning, live-host CSP/redirect/API verification, manual assistive-technology/device checks and real-user performance measurement remain deployment-time work. Paid-content quality and external Gumroad state also remain separate product/release work.

The downloaded workspace has no Git repository. A source backup was saved at `C:/Users/prem7/AppData/Local/Temp/sanzy-phase1-1792166168592` before editing. It excludes real environment files and existing delivery archives; archives were not changed.
