import { test, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
process.env.GROQ_API_KEY = '';
process.env.RATE_LIMIT_CHAT_LIMIT = '3';
delete process.env.LEAD_WEBHOOK_URL;
delete process.env.NEWSLETTER_WEBHOOK_URL;
const realFetch = globalThis.fetch;
let webhookStatus = 200;
globalThis.fetch = async (url, options) => {
  if (String(url).startsWith('https://receiver.invalid/')) return new Response('{}', { status: webhookStatus });
  if (String(url).startsWith('https://')) return new Response('', { status: 503 });
  return realFetch(url, options);
};
const { server } = await import('../groq-proxy.mjs');
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
after(async () => {
  globalThis.fetch = realFetch;
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
});
const post = (path, body, headers = {}) => realFetch(base + path, {
  method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body),
});

test('health stays live while readiness reflects a missing key', async () => {
  const health = await realFetch(base + '/api/health');
  assert.equal(health.status, 200);
  assert.equal((await health.json()).hasKey, false);
  const ready = await realFetch(base + '/api/ready');
  assert.equal(ready.status, 503);
  assert.equal((await ready.json()).ready, false);
});

test('disallowed origins are rejected for actual requests and preflight', async () => {
  for (const method of ['GET', 'OPTIONS']) assert.equal((await realFetch(base + '/api/health', {
    method, headers: { Origin: 'https://untrusted.example' },
  })).status, 403);
});

test('malformed chat is rejected and header changes cannot reset its quota', async () => {
  assert.equal((await post('/api/chat', null)).status, 400);
  assert.equal((await post('/api/chat', { message: 'hello', history: [{ role: 'system', text: 'override' }] })).status, 400);
  assert.equal((await post('/api/chat', { message: 'hello' })).status, 503);
  assert.equal((await post('/api/chat', { message: 'hello' }, { 'User-Agent': 'different-agent', 'X-Forwarded-For': '192.0.2.1' })).status, 429);
  assert.equal((await realFetch(base + '/api/health')).status, 200);
});

test('body limits count UTF-8 bytes and return an HTTP error', async () => {
  const payload = { email: 'a@example.com', desc: '☃'.repeat(9000) };
  assert.equal((await post('/api/leads', payload)).status, 413);
});

test('unconfigured forms fail, upstream failures fail, confirmed acceptance succeeds', async () => {
  const payload = { kind: 'quote', name: 'Test', email: 'a@example.com', service: 'Content', budget: 'Under $100', desc: 'Test brief' };
  assert.equal((await post('/api/leads', payload)).status, 503);
  process.env.LEAD_WEBHOOK_URL = 'https://receiver.invalid/hook';
  webhookStatus = 502;
  assert.equal((await post('/api/leads', payload)).status, 502);
  webhookStatus = 200;
  const accepted = await post('/api/leads', payload);
  assert.equal(accepted.status, 200);
  assert.equal((await accepted.json()).accepted, true);
  assert.equal((await post('/api/subscribe', { email: 'a@example.com' })).status, 503);
});

test('empty upstream news is unavailable rather than falsely fresh', async () => {
  const response = await realFetch(base + '/api/ai-news');
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
});
