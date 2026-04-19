# SanzyAI Top 25 Fix Roadmap

This roadmap prioritizes the highest-value improvements by impact and effort.

## Priority Legend
- Impact: High, Medium, Low
- Effort: S (<1 day), M (1-3 days), L (4+ days)

## Phase 1 - Critical Reliability and Security

1. Remove inline handlers on all pages (CSP-safe event binding)
- Impact: High
- Effort: M
- Areas: HTML pages + matching JS modules

2. Replace risky `innerHTML` paths with safe DOM builders for user-influenced content
- Impact: High
- Effort: L
- Areas: `src/blog.js`, `src/ai-tools.js`, `src/prompt-store.js`

3. Enforce strict Content Security Policy headers in production
- Impact: High
- Effort: M
- Areas: hosting config + `server/groq-proxy.mjs`

4. Move rate limiting and cache to shared store (Redis)
- Impact: High
- Effort: M
- Areas: `server/groq-proxy.mjs`

5. Replace regex XML parsing with robust parser for feeds
- Impact: High
- Effort: M
- Areas: `server/groq-proxy.mjs`

6. Add server-side schema validation for all API payloads
- Impact: High
- Effort: M
- Areas: `server/groq-proxy.mjs`

7. Add end-to-end error budget alerts for proxy failures
- Impact: High
- Effort: M
- Areas: runtime monitoring + docs

## Phase 2 - Performance and UX Stability

8. Split heavy client bundles and lazy-load non-critical modules
- Impact: High
- Effort: M
- Areas: `src/main.js`, `src/learn-free.js`, Vite config

9. Defer non-critical widgets (chat, social proof) until idle/interaction
- Impact: High
- Effort: S
- Areas: `src/globals.js`, `src/chat.js`

10. Add image sizing/lazy strategy audit for all pages
- Impact: Medium
- Effort: M
- Areas: HTML pages + asset pipeline

11. Introduce shared semantic design tokens across all CSS modules
- Impact: High
- Effort: M
- Areas: `src/globals.css`, page CSS files

12. Normalize navbar/breakpoint behavior across all templates
- Impact: Medium
- Effort: M
- Areas: page CSS + mobile nav JS

13. Build a reusable card/button component style layer
- Impact: Medium
- Effort: M
- Areas: all CSS modules

14. Add skeleton/loading states for dynamic grids
- Impact: Medium
- Effort: S
- Areas: `src/ai-tools.js`, `src/blog.js`, `src/prompt-store.js`

15. Reduce layout shift from dynamic sections and modals
- Impact: Medium
- Effort: S
- Areas: CSS/layout and JS mount order

## Phase 3 - Accessibility and Quality Gates

16. Add keyboard navigation regression tests
- Impact: High
- Effort: M
- Areas: `tests/` Playwright suite

17. Add contrast checks to CI
- Impact: High
- Effort: S
- Areas: CI workflow + tooling

18. Add semantic landmarks and aria-state consistency pass
- Impact: Medium
- Effort: M
- Areas: all major HTML pages

19. Expand smoke tests into critical-path journey tests
- Impact: High
- Effort: M
- Areas: `tests/smoke.spec.js` -> multi-spec suite

20. Add visual regression snapshots for light and dark mode
- Impact: High
- Effort: M
- Areas: Playwright snapshot tests

## Phase 4 - SEO, Content, and Growth Operations

21. Consolidate runtime and static metadata ownership rules
- Impact: Medium
- Effort: S
- Areas: `src/globals.js` + page `<head>` blocks

22. Add structured data validation in CI
- Impact: Medium
- Effort: S
- Areas: CI scripts/checks

23. Improve internal linking with topic clusters and breadcrumbs
- Impact: Medium
- Effort: M
- Areas: content pages and nav/footer templates

24. Add robust 404/redirect mapping and link rot monitoring
- Impact: Medium
- Effort: S
- Areas: deploy config + link checker config

25. Introduce release checklist with rollback + smoke verification
- Impact: High
- Effort: S
- Areas: `docs/OPS_RUNBOOK.md` + release scripts

## Suggested Execution Order (First 2 Weeks)
- Week 1: 1, 2, 8, 9, 16, 17
- Week 2: 3, 4, 5, 11, 19, 20
