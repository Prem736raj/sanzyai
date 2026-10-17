# SanzyAI Website

Requires Node.js 24 or newer. Phase 1 changes and release requirements are tracked in [Phase 1 recovery](docs/PHASE1_RECOVERY.md).

Phase 2 implementation and bundle measurements are tracked in [Performance and UX stability](docs/PHASE2_PERFORMANCE_UX.md). After a build, `npm run test:performance` checks the main pages' initial JavaScript budgets and HTML image attributes.

## Secure Groq Chat Architecture

Critical rule: never put API keys in frontend JavaScript, HTML, or client-visible files.

This repo uses a backend proxy at `server/groq-proxy.mjs` so `GROQ_API_KEY` stays server-side only.

### 1) Rotate exposed key first
If a key was shared in chat/history, revoke it in Groq dashboard and create a new one.

### 2) Configure environment
Create a local `.env` (not committed) based on `.env.example`:

- `GROQ_API_KEY=...`
- `GROQ_MODEL=llama-3.1-8b-instant` (optional)
- `PORT=8787` (optional)

### 3) Run locally
```bash
npm run bot:proxy
npm run dev
```

The frontend calls `/api/chat` (proxied by Vite to the backend).

### 4) Cost optimization defaults
The proxy enforces concise responses:

- system instruction targets short practical answers
- `max_tokens: 180`
- limited history (last 6 messages)

This is designed to keep replies around 100-200 tokens when possible.

## Build
```bash
npm run build
```

Vite is configured as multi-page (`appType: mpa`) so all site HTML pages are emitted in `dist/`.

## Security Hardening Added

- Chat HTML output is sanitized on the client before rendering.
- Backend CORS uses an allowlist (`CORS_ALLOW_ORIGINS`) instead of wildcard.
- Per-route rate limiting for `/api/chat` and `/api/ai-news`.
- Request body size limits for API endpoints.
- AI news endpoint now uses cache + trust scoring to reduce abuse and improve content quality.
- Security response headers are added to proxy responses.

## Quality Gates

Run these locally before deploy:

```bash
npm run quality:ci
```

This runs:

- API security regression tests (with mocked external providers)
- production build
- bundle and image performance guard
- HTML validation
- Playwright smoke tests

The proxy loads a local `.env` on startup. Form receivers, trusted proxies, chat limits and the optional public analytics ID are documented in [.env.example](.env.example) and the [operations runbook](docs/OPS_RUNBOOK.md).

CI workflow (`.github/workflows/quality-gates.yml`) also runs Lighthouse and broken-link checks.

## Page Scaffolding Helper

Use a shared page template to avoid repeating boilerplate:

```bash
npm run scaffold:page -- my-new-page "My New Page | SanzyAI" "Meta description here"
```
