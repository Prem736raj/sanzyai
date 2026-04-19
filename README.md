# SanzyAI Website

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

- production build
- HTML validation
- Playwright smoke tests

CI workflow (`.github/workflows/quality-gates.yml`) also runs Lighthouse and broken-link checks.

## Page Scaffolding Helper

Use a shared page template to avoid repeating boilerplate:

```bash
npm run scaffold:page -- my-new-page "My New Page | SanzyAI" "Meta description here"
```
