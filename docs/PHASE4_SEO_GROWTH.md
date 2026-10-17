# Phase 4 SEO, Content, and Growth Operations

Implementation record: 17 October 2026.

## Scope delivered

- Item 21: static HTML now owns crawl-critical titles, descriptions, canonicals, social metadata, and page JSON-LD where present. `src/globals.js` only fills missing metadata at runtime, so client JavaScript no longer overwrites authoritative static tags.
- Item 22: `scripts/validate-structured-data.mjs` parses every static JSON-LD block, validates required Schema.org fields for the types used by SanzyAI, checks article/page URLs against canonicals, and requires schemas on the homepage, newsroom, Learn Free, Prompt Store, and the three long-form guides. The command is wired into `quality:ci` and GitHub Actions as `npm run validate:structured-data`.
- Item 23: the three long-form guides now expose visible breadcrumb navigation, `BreadcrumbList` + `BlogPosting` JSON-LD, and contextual related-guide/tool clusters. Shared styling lives in `src/globals.css`.
- Item 24: the existing custom `404.html` is explicitly `noindex,follow`; `public/_redirects` canonicalizes legacy `.html` MPA URLs to clean routes; `scripts/check-routes.mjs` validates internal anchor destinations plus redirect sources/targets; CI retains the external Lychee link checker.
- Item 25: `docs/OPS_RUNBOOK.md` now contains a concrete pre-release gate, production configuration gate, post-deploy smoke verification, and rollback procedure. `npm run release:check` runs the complete local quality gate.

## Metadata ownership rule

Static page `<head>` content is the SEO source of truth because crawlers can consume it without waiting for application JavaScript. Runtime metadata in `src/globals.js` exists only as a compatibility fallback for missing tags on older/secondary pages. New or materially changed public pages should add static title, description, canonical, Open Graph/Twitter tags, and relevant JSON-LD directly in the HTML entry.

## Release-time checks that remain external

- Confirm the production host actually applies the generated/copied `_headers` and `_redirects` files, or translate those rules into the provider's equivalent configuration.
- Configure the hosting provider so unknown routes return `404.html` with HTTP 404 rather than a successful SPA fallback.
- Provision the supported Redis REST store and verify `/api/health` reports `redis-rest` when multi-replica shared quotas/cache are required.
- Provision `ALERT_WEBHOOK_URL` and verify a real staging/provider alert delivery.
- Run the live-host smoke, response-header, device, and real-user performance checks after deployment.

These are release-environment checks rather than missing local implementation.

## Final local validation

The complete `npm run quality:ci` gate exited 0 on 17 October 2026 after the final Phase 4 changes and browser-runner fix. Observed results:

- inline-handler guard passed;
- 14 JSON-LD blocks across 31 HTML files passed structured-data validation;
- 607 internal links, 31 HTML routes and redirect targets passed route validation;
- 21 API tests passed;
- production build, performance budgets and HTML validation passed;
- Playwright completed with 124 passed and 2 intentionally skipped tests across mobile and desktop Chromium;
- the accessibility audit passed all 16 critical page/theme combinations.

This establishes local completion for roadmap items 21–25. Host-specific redirect/404 behavior, live response headers, production monitoring/provisioning and real-user measurements still require deployment evidence.
