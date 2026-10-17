# Operations Runbook

## Environments
- Development: Vite + local proxy
- Staging: mirror of production with separate API keys and CORS allowlist
- Production: locked CORS, rate limits, monitoring enabled

## Health Endpoints
- /api/health: basic liveness and model/key visibility
- /api/ready: readiness check (returns 503 if GROQ key missing)

Readiness checks configuration presence, not a paid upstream completion. The chat UI uses readiness rather than liveness when showing AI availability.

## Form Delivery

- Configure server-only HTTPS `LEAD_WEBHOOK_URL` for quote/tool requests and `NEWSLETTER_WEBHOOK_URL` for subscriptions.
- The receivers must accept JSON and respond with 2xx only after accepting the submission. The lead payload includes `kind`, permitted form fields and `submittedAt`; the subscription payload includes `email` and `submittedAt`.
- Missing receivers return 503; failed receivers return an error. Forms retain the entered information. A successful receiver response is acceptance, not proof of email delivery or confirmed newsletter opt-in.
- Use a provider with appropriate confirmation, unsubscribe, access and deletion workflows. Test one real delivery and confirmation before release; mocked tests do not verify a connected account.
- Never place webhook credentials or API keys in `VITE_*` variables or client JavaScript. `VITE_GA_ID` is an optional public analytics identifier.

## API Abuse Controls

- `TRUSTED_PROXY_IPS` accepts exact connection IPs. Leave empty unless the deployment has a trusted reverse proxy. Untrusted clients cannot set their identity through `X-Forwarded-For`.
- Default chat quotas are 15 requests per client per minute, four concurrent upstream calls, and 500 upstream attempts per 24-hour process window. Failed upstream attempts count toward the allowance.
- `server/storage.mjs` uses a Redis-compatible HTTPS REST endpoint for shared rate-limit counters and AI-news cache entries. Configure `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`, or an HTTPS `REDIS_URL` + `REDIS_TOKEN`. If the shared store is missing or unreachable, the proxy falls back to bounded in-memory controls.
- Raw `redis://` / `rediss://` URLs are not treated as shared because this project does not ship a TCP Redis client. `/api/health` reports `sharedStore: "redis-rest"` only when the supported shared adapter is configured; `memory` means quotas/cache are replica-local.
- Keep an account/provider spending cap and edge abuse controls in addition to application quotas. The repository does not provision Redis or a cloud WAF.
- Set `HOST=0.0.0.0` when required by the production container, and expose the service through the intended reverse proxy. Development binds to loopback by default.
- Set infrastructure log retention/access controls. The application does not manage log retention. Do not add request bodies, webhook credentials or provider error payloads to logs.

## Document Security Headers

- Builds generate `dist/_headers`, including a CSP with hashes for the emitted inline scripts, `script-src-attr 'none'`, frame restrictions and HTTPS transport headers.
- Vite preview applies this file so browser regression tests exercise the document policy. Development uses basic response headers to support HMR.
- Deploy the file with a host that supports `_headers` (or translate it into the host's equivalent configuration). Verify the actual document response after deployment; the API CSP alone does not protect the pages.
- Regenerate headers with every build. Verify optional Google Translate/analytics integrations against the production policy when enabling them.
- Route `/api/*` to this proxy in production. Vite's development proxy is not a production hosting configuration.

## Required Monitoring
- Uptime checks every 1 minute for /api/health and /api/ready
- Configure server-only `ALERT_WEBHOOK_URL` to deliver application error-budget alerts. Verify delivery against the staging receiver before production release.
- Alert on:
  - >= 3 consecutive failures
  - p95 latency > 2.5s for 10 minutes
  - 5xx ratio > 2% for 10 minutes

## Logging
- Proxy emits structured JSON logs with ts, level, event, route, durationMs, and env.
- Send logs to your central sink (Datadog, CloudWatch, ELK, etc).

## Incident Response (Quick)
1. Check /api/ready and logs for missing/expired key.
2. Validate CORS_ALLOW_ORIGINS and recent deploy changes.
3. Check upstream Groq status and latency.
4. If rate-limit spike: review source IP/UA patterns and tighten limits.
5. Roll back latest deploy if regression is confirmed.

## Release Checklist

### Local pre-release gate

1. Install the locked dependency set with `npm ci`.
2. Run `npm run release:check`. This is the full local quality gate and includes inline-handler/CSP checks, JSON-LD validation, internal route + redirect validation, API tests, build, performance budgets, HTML validation, Playwright journeys/visual regressions, and the accessibility/contrast audit.
3. Confirm the generated `dist/_headers` and copied `dist/_redirects` are present in the build output.
4. Record the release commit/build identifier and the previous known-good release identifier before deployment.

### Production configuration gate

- `GROQ_API_KEY` is present server-side and `/api/ready` is expected to return 200.
- `CORS_ALLOW_ORIGINS` contains only intended production origins.
- Shared quotas/cache are configured through the supported Redis REST variables. If multiple proxy replicas are used, `/api/health` must report `sharedStore: "redis-rest"` before release.
- `ALERT_WEBHOOK_URL` is configured and a staging/provider test confirms the receiver accepts the alert payload.
- Lead/newsletter webhooks are configured when those forms are enabled and their receivers have been tested.
- The hosting platform applies `_headers` and `_redirects`, or equivalent provider-native rules. Configure the provider's unknown-route fallback to serve `404.html` with HTTP 404.

### Post-deploy smoke verification

1. Load `/`, `/domain-finder`, `/ai-tools`, `/prompt-store`, `/learn-free`, `/blog`, and one `/blog/...` guide in desktop and mobile layouts.
2. Verify `GET /api/health` returns 200 and the expected `sharedStore` mode.
3. Verify `GET /api/ready` returns 200 with `ready: true`.
4. Inspect the live document response headers and confirm the production CSP includes `script-src-attr 'none'`, frame restrictions, and the intended HTTPS transport policy.
5. Verify a legacy URL such as `/ai-tools.html` redirects to `/ai-tools` and an unknown URL returns the custom 404 page with HTTP 404.
6. Exercise the critical user paths: domain comparison, AI tools search/compare, prompt sample preview, Learn Free sprint generation, and chat readiness where enabled.
7. Check monitoring/log ingestion and confirm no new 5xx spike, CSP violation pattern, or broken asset/route appears after deployment.

### Rollback procedure

1. Stop further rollout and capture the failing route, response status, logs, and release identifier.
2. Redeploy the recorded previous known-good build/configuration. Do not reuse the failed artifact with only runtime toggles unless the failure is conclusively configuration-only.
3. Repeat `/api/health`, `/api/ready`, CSP header, redirect/404, and critical-path smoke checks against the rollback.
4. Keep the failed release out of production until the regression is reproduced locally/staging and `npm run release:check` is green after the fix.
