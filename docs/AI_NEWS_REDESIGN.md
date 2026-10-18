# AI Newsroom delivery — 17 October 2026

The `/blog` page uses a flat editorial layout: a month-to-date masthead, lead story, latest-headline rail, searchable story list, reading list, and source-linked briefing dialogs. Shared navigation, logo text, footer and the chat launcher receive page-scoped neutral styling. Desktop and mobile layouts support light and dark mode.

## Freshness and capacity

- The proxy combines official feeds, independent publishers, community feeds and eight Google News search lanes. Optional NewsAPI/GNews providers remain server-side.
- The default and example environment cap are 300 stories (`MAX_NEWS_ITEMS`, maximum 500). The displayed count depends on upstream availability; the application never fills gaps with invented headlines.
- Only dated stories in the current UTC calendar month are included. Results are deduplicated and ordered newest first. Cache keys include the month, and last month's stale coverage is discarded at rollover.
- The page refreshes every ten minutes and supports manual refresh. The server cache defaults to three minutes. A cold request has a 30-second client timeout, allowing the proxy to gather multiple feeds.
- The page renders 24 stories initially, then loads more from the retrieved collection. Search, topic and source-priority sorting work across that collection. Saved stories use browser local storage.

## Verification

- `npm run test:api`: 22 tests passed. The news integration test covers hundreds of records, invalid/old/future dates, duplicate removal, publisher attribution, ordering, same-month outage recovery and month rollover.
- Production build, HTML validation and performance checks passed. The performance check reported approximately 47.6 KB of initial JavaScript for the news page and passed the image audit.
- Live `/api/health`: HTTP 200. Live `/api/ai-news`: HTTP 200; the captured verification returned 300 October stories from 153 publishers. See [live endpoint evidence](../artifacts/news-live-check.json).
- Axe WCAG A/AA checks through 2.1 found zero violations at widths 1440 and 390 in both light and dark themes using a live news payload. See [accessibility evidence](../artifacts/news-a11y-final.json). Automated checks do not establish complete accessibility conformance.
- Browser interaction checks exercised pagination, search/empty state, saving, briefing open/Escape close, keyboard focus on filters, mobile navigation and chat opening in both themes and layouts.

The local `/api/ready` returns HTTP 503 because `GROQ_API_KEY` is missing. AI news works independently of that chat-provider key. Production deployment and live-host verification remain release work; this document does not claim the entire site's quality gate has passed.

## Isolated regression command

Other validation jobs used the same preview port and test report folder during verification. The page's isolated regression setup uses its own build directory, preview port and output folder:

```sh
npm run build -- --outDir artifacts/news-dist
npx playwright test tests/phase2.spec.js -g "slow news|news can retry" --config artifacts/news-playwright.config.mjs
```

For deployment and health checks, see [the operations runbook](OPS_RUNBOOK.md).
