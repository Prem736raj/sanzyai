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
