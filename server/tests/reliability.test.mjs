import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSharedStore } from '../storage.mjs';
import { createErrorBudgetTracker } from '../alerts.mjs';

test('shared store in-memory fallback prunes and enforces limits', async () => {
  let time = 1000;
  const store = createSharedStore({ now: () => time });
  assert.equal(store.isShared, false);
  assert.equal(store.type, 'memory');

  const config = { windowMs: 1000, limit: 2 };
  assert.equal((await store.checkRateLimit('client1', config)).ok, true);
  assert.equal((await store.checkRateLimit('client1', config)).ok, true);
  assert.equal((await store.checkRateLimit('client1', config)).ok, false);

  time = 2005;
  assert.equal((await store.checkRateLimit('client1', config)).ok, true);
});

test('shared store handles caching with TTL expiration', async () => {
  let time = 1000;
  const store = createSharedStore({ now: () => time });

  await store.setCache('news', { items: [1, 2, 3] }, 500);
  assert.deepEqual(await store.getCache('news'), { items: [1, 2, 3] });

  time = 1505;
  assert.equal(await store.getCache('news'), null);
});

test('shared Redis REST store persists rate limits and cache through pipeline commands', async () => {
  const calls = [];
  let cachedValue = null;
  const mockFetcher = async (url, opts) => {
    const commands = JSON.parse(opts.body);
    calls.push({ url, commands, authorization: opts.headers.Authorization });
    const results = commands.map(([command, key, value]) => {
      if (command === 'INCR') return { result: 1 };
      if (command === 'PTTL') return { result: -1 };
      if (command === 'PEXPIRE') return { result: 1 };
      if (command === 'SET') {
        cachedValue = value;
        return { result: 'OK' };
      }
      if (command === 'GET') return { result: cachedValue };
      throw new Error(`Unexpected command ${command} for ${key}`);
    });
    return Response.json(results);
  };

  const store = createSharedStore({
    redisUrl: 'https://redis.example.test',
    redisToken: 'secret-token',
    now: () => 5000,
    fetcher: mockFetcher,
  });

  assert.equal(store.isShared, true);
  assert.equal(store.type, 'redis-rest');
  const rate = await store.checkRateLimit('client1', { windowMs: 1000, limit: 2 });
  assert.deepEqual(rate, { ok: true, remaining: 1, resetAt: 6000 });

  await store.setCache('news', { items: [4, 5] }, 800);
  assert.deepEqual(await store.getCache('news'), { items: [4, 5] });
  assert.equal(calls.every((call) => call.url === 'https://redis.example.test/pipeline'), true);
  assert.equal(calls.every((call) => call.authorization === 'Bearer secret-token'), true);
  assert.equal(calls.some((call) => call.commands.some(([command]) => command === 'PEXPIRE')), true);
  assert.equal(calls.some((call) => call.commands.some(([command, key]) => command === 'SET' && key === 'cache:news')), true);
});

test('redis protocol URLs do not claim shared-store support without a TCP client', () => {
  const store = createSharedStore({ redisUrl: 'redis://localhost:6379' });
  assert.equal(store.isShared, false);
  assert.equal(store.type, 'memory');
});

test('error budget tracker fires alert when threshold is crossed', async () => {
  let time = 10_000;
  let webhookPayload = null;
  const mockFetcher = async (url, opts) => {
    webhookPayload = JSON.parse(opts.body);
    return new Response('ok', { status: 200 });
  };

  const tracker = createErrorBudgetTracker({
    threshold: 3,
    windowMs: 5000,
    cooldownMs: 60_000,
    webhookUrl: 'https://alerts.invalid/hook',
    now: () => time,
    fetcher: mockFetcher,
  });

  assert.equal((await tracker.recordError({ route: '/api/chat', error: 'Upstream 502' })).triggered, false);
  assert.equal((await tracker.recordError({ route: '/api/chat', error: 'Upstream 502' })).triggered, false);
  
  const result = await tracker.recordError({ route: '/api/chat', error: 'Upstream 502' });
  assert.equal(result.triggered, true);
  assert.equal(result.payload.errorCount, 3);
  assert.equal(webhookPayload.event, 'error_budget_exceeded');

  // Cooldown check - should not fire again within cooldown period
  time += 1000;
  const repeat = await tracker.recordError({ route: '/api/chat', error: 'Upstream 502' });
  assert.equal(repeat.triggered, false);
});

