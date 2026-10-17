/**
 * Error Budget and Reliability Alert Tracker for Proxy Services
 */
export function createErrorBudgetTracker({
  threshold = 5,
  windowMs = 60_000,
  cooldownMs = 300_000,
  webhookUrl = process.env.ALERT_WEBHOOK_URL || '',
  now = Date.now,
  fetcher = globalThis.fetch,
} = {}) {
  const errors = [];
  let lastAlertAt = 0;

  return {
    get count() {
      const cutoff = now() - windowMs;
      return errors.filter(ts => ts > cutoff).length;
    },

    async recordError(errMeta = {}) {
      const time = now();
      errors.push(time);

      // Prune old timestamps
      const cutoff = time - windowMs;
      while (errors.length > 0 && errors[0] <= cutoff) {
        errors.shift();
      }

      if (errors.length >= threshold && (lastAlertAt === 0 || (time - lastAlertAt) > cooldownMs)) {
        lastAlertAt = time;
        const payload = {
          event: 'error_budget_exceeded',
          service: 'sanzy-groq-proxy',
          errorCount: errors.length,
          windowSeconds: Math.round(windowMs / 1000),
          timestamp: new Date(time).toISOString(),
          lastError: String(errMeta.error || errMeta.message || 'Upstream service failure'),
          route: errMeta.route || 'unknown',
        };

        if (webhookUrl && typeof fetcher === 'function') {
          try {
            await fetcher(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
              signal: AbortSignal.timeout(3000),
            }).catch(() => {});
          } catch {
            // Ignore webhook delivery failures to avoid cascading issues
          }
        }

        return { triggered: true, payload };
      }

      return { triggered: false, count: errors.length };
    },
  };
}
