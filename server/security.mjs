import { isIP } from 'node:net';

export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export function positiveInt(value, fallback, maximum = 1_000_000) {
  if (value === undefined || value === '') return fallback;
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 1 || number > maximum) throw new Error('Invalid server limit configuration.');
  return number;
}

const normalizeIp = (ip = '') => ip.startsWith('::ffff:') ? ip.slice(7) : ip;
export function clientIp(req, trustedProxies = new Set()) {
  const remote = normalizeIp(req.socket?.remoteAddress || 'unknown');
  if (!trustedProxies.has(remote)) return remote;
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',').map(ip => normalizeIp(ip.trim()));
  if (forwarded.length > 32 || forwarded.some(ip => !isIP(ip))) return remote;
  const chain = [...forwarded, remote];
  for (let i = chain.length - 1; i >= 0; i--) if (!trustedProxies.has(chain[i])) return chain[i];
  return remote;
}

export function createRateLimiter({ maxEntries = 10_000, now = Date.now } = {}) {
  const counters = new Map();
  function prune() {
    const time = now();
    for (const [key, value] of counters) if (value.resetAt <= time) counters.delete(key);
  }
  return {
    prune,
    get size() { return counters.size; },
    check(key, { windowMs, limit }) {
      const time = now();
      let current = counters.get(key);
      if (!current || current.resetAt <= time) {
        if (counters.size >= maxEntries) prune();
        if (!counters.has(key) && counters.size >= maxEntries) return { ok: false, remaining: 0, resetAt: time + windowMs };
        current = { count: 0, resetAt: time + windowMs };
        counters.set(key, current);
      }
      current.count = Math.min(current.count + 1, limit + 1);
      return { ok: current.count <= limit, remaining: Math.max(0, limit - current.count), resetAt: current.resetAt };
    },
  };
}

export function validateChatBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new HttpError(400, 'Expected a JSON object.');
  if (typeof body.message !== 'string' || !body.message.trim() || body.message.length > 1500) throw new HttpError(400, 'Message must contain 1–1500 characters.');
  const history = body.history ?? [];
  if (!Array.isArray(history) || history.length > 6) throw new HttpError(400, 'History must contain at most six messages.');
  for (const entry of history) {
    if (!entry || typeof entry !== 'object' || !['user', 'assistant'].includes(entry.role)) throw new HttpError(400, 'Invalid history role.');
    const text = entry.text ?? entry.content;
    if (typeof text !== 'string' || text.length > 800) throw new HttpError(400, 'Invalid history message.');
  }
  return { message: body.message.trim(), history };
}

export function validateLeadBody(body, subscription = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new HttpError(400, 'Expected a JSON object.');
  const allowed = subscription ? ['email'] : ['kind', 'name', 'email', 'phone', 'service', 'budget', 'source', 'desc', 'url', 'category'];
  const clean = {};
  for (const field of allowed) {
    if (body[field] === undefined) continue;
    if (typeof body[field] !== 'string' || body[field].length > (field === 'desc' ? 4000 : 250)) throw new HttpError(400, 'Invalid form field.');
    clean[field] = body[field].trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email || '')) throw new HttpError(400, 'A valid email address is required.');
  if (!subscription) {
    if (!['quote', 'tool', 'affiliate'].includes(clean.kind) || !clean.name) throw new HttpError(400, 'Name and request type are required.');
    if (clean.kind === 'quote' && (!clean.service || !clean.desc || !clean.budget)) throw new HttpError(400, 'Service, budget and project brief are required.');
    if (clean.kind === 'tool') {
      try { if (!['https:', 'http:'].includes(new URL(clean.url).protocol)) throw new Error(); }
      catch { throw new HttpError(400, 'A valid tool URL is required.'); }
    }
  }
  return clean;
}

export async function readJsonBody(req, maxBytes = 12_000) {
  if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) throw new HttpError(415, 'Use application/json.');
  return new Promise((resolve, reject) => {
    const chunks = [];
    let length = 0;
    let failed = false;
    const timer = setTimeout(() => { failed = true; reject(new HttpError(408, 'Request body timed out.')); req.destroy(); }, 10_000);
    req.on('data', chunk => {
      if (failed) return;
      length += chunk.length;
      if (length > maxBytes) {
        failed = true;
        clearTimeout(timer);
        reject(new HttpError(413, 'Payload too large.'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      clearTimeout(timer);
      if (failed) return;
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch { reject(new HttpError(400, 'Invalid JSON.')); }
    });
    req.on('error', () => { clearTimeout(timer); reject(new HttpError(400, 'Request could not be read.')); });
    req.on('aborted', () => { clearTimeout(timer); reject(new HttpError(400, 'Request aborted.')); });
  });
}
