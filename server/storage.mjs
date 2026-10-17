import { createRateLimiter } from './security.mjs';

/**
 * Storage and rate-limiting adapter supporting Redis-compatible REST stores
 * (for example Upstash) with automatic fallback to bounded in-memory storage.
 */
export function createSharedStore({
  redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL || '',
  redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_TOKEN || '',
  now = Date.now,
  fetcher = globalThis.fetch,
} = {}) {
  const redisEndpoint = redisUrl.startsWith('https://') ? redisUrl.replace(/\/+$/, '') : '';
  const isRedisConfigured = Boolean(redisEndpoint && typeof fetcher === 'function');

  // In-memory fallbacks
  const memLimiter = createRateLimiter({ maxEntries: 20_000, now });
  const memCache = new Map();

  return {
    isShared: isRedisConfigured,
    type: isRedisConfigured ? 'redis-rest' : 'memory',

    async checkRateLimit(key, { windowMs, limit }) {
      if (isRedisConfigured) {
        try {
          const results = await runRedisPipeline(redisEndpoint, redisToken, fetcher, [
            ['INCR', `rl:${key}`],
            ['PTTL', `rl:${key}`],
          ]);
          const count = Number(results[0] ?? 1);
          let pttl = Number(results[1] ?? -1);
          if (pttl < 0 || count === 1) {
            await runRedisPipeline(redisEndpoint, redisToken, fetcher, [
              ['PEXPIRE', `rl:${key}`, windowMs],
            ]);
            pttl = windowMs;
          }
          return {
            ok: count <= limit,
            remaining: Math.max(0, limit - count),
            resetAt: now() + Math.max(0, pttl),
          };
        } catch {
          // Fall back gracefully to local limiter on connection failure
        }
      }

      // Default safe bounded memory limiter
      return memLimiter.check(key, { windowMs, limit });
    },

    async getCache(key) {
      if (isRedisConfigured) {
        try {
          const [value] = await runRedisPipeline(redisEndpoint, redisToken, fetcher, [
            ['GET', `cache:${key}`],
          ]);
          if (value == null) return null;
          return JSON.parse(String(value));
        } catch {
          // Fall back gracefully to the local cache on connection or payload failure.
        }
      }

      const time = now();
      const entry = memCache.get(key);
      if (!entry) return null;
      if (entry.expiresAt <= time) {
        memCache.delete(key);
        return null;
      }
      return entry.payload;
    },

    async setCache(key, payload, ttlMs = 180_000) {
      if (isRedisConfigured) {
        try {
          await runRedisPipeline(redisEndpoint, redisToken, fetcher, [
            ['SET', `cache:${key}`, JSON.stringify(payload), 'PX', ttlMs],
          ]);
          return;
        } catch {
          // Fall back gracefully to the local cache when the shared store is unavailable.
        }
      }

      const time = now();
      memCache.set(key, {
        payload,
        expiresAt: time + ttlMs,
      });
      // Bounded prune if cache grows
      if (memCache.size > 2000) {
        for (const [k, v] of memCache) {
          if (v.expiresAt <= time) memCache.delete(k);
        }
      }
    },
  };
}

async function runRedisPipeline(endpoint, token, fetcher, commands) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetcher(`${endpoint}/pipeline`, {
    method: 'POST',
    headers,
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(1500),
  });
  if (!res.ok) throw new Error(`Shared store request failed with ${res.status}.`);

  const data = await res.json();
  if (!Array.isArray(data) || data.length !== commands.length) {
    throw new Error('Shared store returned an invalid pipeline response.');
  }
  return data.map((entry) => entry?.result ?? null);
}

