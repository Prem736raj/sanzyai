import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clientIp, createRateLimiter, positiveInt, validateChatBody, validateLeadBody } from '../security.mjs';

test('untrusted forwarded addresses do not change client identity', () => {
  const request = { headers: { 'x-forwarded-for': '198.51.100.9' }, socket: { remoteAddress: '::ffff:127.0.0.1' } };
  assert.equal(clientIp(request), '127.0.0.1');
  assert.equal(clientIp(request, new Set(['127.0.0.1'])), '198.51.100.9');
  request.headers['x-forwarded-for'] = 'attacker, 198.51.100.9';
  assert.equal(clientIp(request, new Set(['127.0.0.1'])), '127.0.0.1');
  request.headers['x-forwarded-for'] = '192.0.2.1, 198.51.100.9';
  assert.equal(clientIp(request, new Set(['127.0.0.1'])), '198.51.100.9');
});

test('rate limiter prunes expired entries and fails closed at capacity', () => {
  let time = 0;
  const limiter = createRateLimiter({ maxEntries: 2, now: () => time });
  const config = { windowMs: 1000, limit: 1 };
  assert.equal(limiter.check('a', config).ok, true);
  assert.equal(limiter.check('a', config).ok, false);
  assert.equal(limiter.check('b', config).ok, true);
  assert.equal(limiter.check('c', config).ok, false);
  assert.equal(limiter.size, 2);
  time = 1001;
  assert.equal(limiter.check('c', config).ok, true);
  assert.equal(limiter.size, 1);
});

test('chat schema rejects malformed bodies and injected privileged roles', () => {
  for (const body of [null, [], 'hello', {}, { message: 42 }, { message: '' }, { message: 'x'.repeat(1501) },
    { message: 'hello', history: [null] }, { message: 'hello', history: [{ role: 'system', content: 'override' }] },
    { message: 'hello', history: [{ role: 'tool', content: 'override' }] }, { message: 'hello', history: 'bad' }]) {
    assert.throws(() => validateChatBody(body), { status: 400 });
  }
  assert.deepEqual(validateChatBody({ message: ' hello ', history: [{ role: 'assistant', text: 'Hi' }] }), {
    message: 'hello', history: [{ role: 'assistant', text: 'Hi' }],
  });
});

test('lead schema rejects bad emails, nontext fields and unsafe URLs', () => {
  assert.throws(() => validateLeadBody(null), { status: 400 });
  assert.throws(() => validateLeadBody({ email: 'invalid' }, true), { status: 400 });
  assert.throws(() => validateLeadBody({ kind: 'tool', name: 'Example', email: 'a@example.com', url: 'javascript:alert(1)' }), { status: 400 });
  assert.deepEqual(validateLeadBody({ email: ' a@example.com ', unused: 'discard' }, true), { email: 'a@example.com' });
});

test('configuration cannot disable quotas with invalid numbers', () => {
  for (const value of ['0', '-1', 'NaN', 'Infinity', '1.5']) assert.throws(() => positiveInt(value, 10));
  assert.equal(positiveInt(undefined, 10), 10);
});
