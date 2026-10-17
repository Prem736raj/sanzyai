import { test, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
process.env.GROQ_API_KEY = 'local-test-placeholder';
process.env.CHAT_DAILY_REQUEST_LIMIT = '2';
process.env.CHAT_MAX_CONCURRENT = '1';
process.env.RATE_LIMIT_CHAT_LIMIT = '20';
const realFetch = globalThis.fetch;
let release;
let started;
let calls = 0;
const pending = new Promise(resolve => { started = resolve; });
globalThis.fetch = async (url, options) => {
  if (!String(url).startsWith('https://api.groq.com/')) return realFetch(url, options);
  calls++;
  if (calls === 1) { started(); await new Promise(resolve => { release = resolve; }); }
  return new Response('PRIVATE PROVIDER DETAILS', { status: 500 });
};
const { server } = await import('../groq-proxy.mjs');
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
after(async () => {
  globalThis.fetch = realFetch;
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
});
const post = () => realFetch(base + '/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'hello' }) });

test('concurrency and daily quotas bound upstream calls without leaking provider errors', async () => {
  assert.equal((await realFetch(base + '/api/ready')).status, 200);
  const first = post();
  await pending;
  assert.equal((await post()).status, 503);
  release();
  const failed = await first;
  assert.equal(failed.status, 502);
  assert.doesNotMatch(await failed.text(), /PRIVATE|DETAILS/);
  assert.equal((await post()).status, 502);
  assert.equal((await post()).status, 429);
  assert.equal(calls, 2);
});
