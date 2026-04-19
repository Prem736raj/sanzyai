# Operations Runbook

## Environments
- Development: Vite + local proxy
- Staging: mirror of production with separate API keys and CORS allowlist
- Production: locked CORS, rate limits, monitoring enabled

## Health Endpoints
- /api/health: basic liveness and model/key visibility
- /api/ready: readiness check (returns 503 if GROQ key missing)

## Required Monitoring
- Uptime checks every 1 minute for /api/health and /api/ready
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
