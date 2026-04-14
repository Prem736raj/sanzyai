import { createServer } from 'node:http';

const PORT = Number(process.env.PORT || 8787);
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 100_000) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function buildMessages(userMessage, history = []) {
  const compactHistory = Array.isArray(history)
    ? history.slice(-6).map((m) => ({ role: m.role, content: String(m.text || m.content || '').slice(0, 800) }))
    : [];

  return [
    {
      role: 'system',
      content:
        'You are SanzyAI assistant. Keep replies concise and practical. Target 100-200 tokens. Prefer bullets, no fluff. If uncertain, say so briefly and offer one clear next step.',
    },
    ...compactHistory,
    { role: 'user', content: String(userMessage || '').slice(0, 1500) },
  ];
}

async function handleChat(req, res) {
  if (!GROQ_API_KEY) {
    sendJson(res, 500, { error: 'Server missing GROQ_API_KEY.' });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (e) {
    sendJson(res, 400, { error: e.message || 'Invalid request body.' });
    return;
  }

  const message = String(body.message || '').trim();
  if (!message) {
    sendJson(res, 400, { error: 'Message is required.' });
    return;
  }

  try {
    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: buildMessages(message, body.history),
        temperature: 0.4,
        max_tokens: 180,
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!upstream.ok) {
      const errTxt = await upstream.text();
      sendJson(res, 502, { error: 'Upstream Groq error.', details: errTxt.slice(0, 400) });
      return;
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || 'I could not generate a response.';

    sendJson(res, 200, {
      reply,
      model: data.model || GROQ_MODEL,
      usage: data.usage || null,
    });
  } catch (e) {
    sendJson(res, 500, { error: 'Chat request failed.', details: String(e.message || e) });
  }
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  if (req.url === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, { ok: true, hasKey: Boolean(GROQ_API_KEY), model: GROQ_MODEL });
    return;
  }

  if (req.url === '/api/chat' && req.method === 'POST') {
    await handleChat(req, res);
    return;
  }

  sendJson(res, 404, { error: 'Not found.' });
});

server.listen(PORT, () => {
  console.log(`Sanzy Groq proxy listening on http://localhost:${PORT}`);
});
