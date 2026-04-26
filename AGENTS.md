# AGENTS.md

Agent instructions for this repository. Keep changes minimal, verify with project commands, and link to docs instead of duplicating them.

## Scope and Architecture
- This is a Vite multi-page app (MPA), not an SPA. Root `*.html` files are entry pages.
- Shared frontend logic lives in `src/globals.js` and `src/chat.js`.
- Page-specific logic/styles live in paired files in `src/` (for example: `ai-tools.js` + `ai-tools.css`).
- Backend API proxy is `server/groq-proxy.mjs`.
- Prompt deliverables are in `deliverables/premium-prompt-packs/` and free assets in `public/`.

## Dev and Validation Commands
- Install deps: `npm install`
- Start site: `npm run dev`
- Start proxy: `npm run bot:proxy`
- Build: `npm run build`
- Smoke tests: `npm run test:smoke`
- Full quality gate: `npm run quality:ci`

If your task touches `/api/*`, chat, or AI news, run both `npm run bot:proxy` and the relevant validation command.

## Hard Rules
- Never expose secrets client-side. API keys must stay server-side in the proxy.
- Do not add inline event handlers in HTML (quality gate checks this).
- Preserve MPA structure and existing page import pattern.
- Prefer scaffold for new pages: `npm run scaffold:page -- <slug> "<title>" "<description>"`

## Gumroad Upload Automation Constraint
When asked to fully automate Gumroad product uploads/clicks in this environment:
- Do not claim end-to-end browser automation is complete.
- Explicitly report the blocker: browser chat tools are disabled because `workbench.browser.enableChatTools` is not enabled.
- Complete all automatable local work first (file generation, mapping, verification prep).
- Then provide a concise manual handoff using `docs/GUMROAD_UPLOAD_MAP.md`.

## Where To Look First
- Project setup and quality gates: [README.md](README.md)
- Gumroad product-to-file mapping: [docs/GUMROAD_UPLOAD_MAP.md](docs/GUMROAD_UPLOAD_MAP.md)
- Prompt quality standard: [docs/PREMIUM_PROMPT_QUALITY_STANDARD.md](docs/PREMIUM_PROMPT_QUALITY_STANDARD.md)
- Operations and health checks: [docs/OPS_RUNBOOK.md](docs/OPS_RUNBOOK.md)
- Prioritized roadmap: [docs/TOP_25_FIX_ROADMAP.md](docs/TOP_25_FIX_ROADMAP.md)
- Analytics plan: [docs/ANALYTICS_FUNNEL.md](docs/ANALYTICS_FUNNEL.md)

## Editing Guidelines
- Keep diffs focused and avoid unrelated refactors.
- Follow existing naming and file pairing conventions in `src/`.
- For frontend changes, verify affected pages in both desktop and mobile layouts.
- For backend changes, verify `/api/health` and `/api/ready` behavior.
