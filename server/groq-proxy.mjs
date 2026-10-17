import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';
import { clientIp, createRateLimiter, HttpError, positiveInt, readJsonBody, validateChatBody, validateLeadBody } from './security.mjs';
import { parseFeed } from './feed-parser.mjs';
import { createSharedStore } from './storage.mjs';
import { createErrorBudgetTracker } from './alerts.mjs';

if (process.env.NODE_ENV !== 'test') {
  try { process.loadEnvFile(); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PROD = NODE_ENV === 'production';
const PORT = positiveInt(process.env.PORT, 8787, 65535);
const HOST = process.env.HOST || (IS_PROD ? '0.0.0.0' : '127.0.0.1');
const TRUSTED_PROXIES = new Set((process.env.TRUSTED_PROXY_IPS || '').split(',').map(ip => ip.trim()).filter(Boolean));
const CHAT_DAILY_LIMIT = positiveInt(process.env.CHAT_DAILY_REQUEST_LIMIT, 500, 100000);
const CHAT_MAX_CONCURRENT = positiveInt(process.env.CHAT_MAX_CONCURRENT, 4, 100);
let activeChats = 0;

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

const NEWS_API_KEY = process.env.NEWS_API_KEY || process.env.NEWSAPI_KEY;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

const RAW_MAX_NEWS_ITEMS = positiveInt(process.env.MAX_NEWS_ITEMS, 300, 500);
const MAX_NEWS_ITEMS = Number.isFinite(RAW_MAX_NEWS_ITEMS) && RAW_MAX_NEWS_ITEMS > 0
  ? Math.floor(RAW_MAX_NEWS_ITEMS)
  : 0;

const AI_NEWS_CACHE_TTL_MS = positiveInt(process.env.AI_NEWS_CACHE_TTL_MS, 180000);
const AI_NEWS_CACHE_KEY = 'ai-news:v2';

const DEFAULT_PROD_ORIGINS = ['https://sanzyai.com', 'https://www.sanzyai.com'];
const DEFAULT_DEV_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

const ALLOWED_ORIGINS = new Set(
  (process.env.CORS_ALLOW_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .concat(IS_PROD ? DEFAULT_PROD_ORIGINS : DEFAULT_DEV_ORIGINS)
);

const GLOBAL_RATE_LIMIT = {
  windowMs: positiveInt(process.env.RATE_LIMIT_GLOBAL_WINDOW_MS, 60_000),
  limit: positiveInt(process.env.RATE_LIMIT_GLOBAL_LIMIT, 180),
};

const CHAT_RATE_LIMIT = {
  windowMs: positiveInt(process.env.RATE_LIMIT_CHAT_WINDOW_MS, 60_000),
  limit: positiveInt(process.env.RATE_LIMIT_CHAT_LIMIT, 15),
};

const NEWS_RATE_LIMIT = {
  windowMs: Number(process.env.RATE_LIMIT_NEWS_WINDOW_MS || 5 * 60_000),
  limit: positiveInt(process.env.RATE_LIMIT_NEWS_LIMIT, 40),
};

const MAX_BODY_BYTES = {
  chat: positiveInt(process.env.MAX_CHAT_BODY_BYTES, 12_000),
  fallback: positiveInt(process.env.MAX_DEFAULT_BODY_BYTES, 25_000),
};

const BASE_AI_NEWS_SOURCES = [
  { name: 'OpenAI News', type: 'official', url: 'https://openai.com/news/rss.xml', trust: 0.98 },
  { name: 'Anthropic News', type: 'official', url: 'https://www.anthropic.com/news/rss.xml', trust: 0.98 },
  { name: 'Google AI Blog', type: 'official', url: 'https://blog.google/technology/ai/rss/', trust: 0.97 },
  { name: 'Meta AI', type: 'official', url: 'https://ai.meta.com/blog/rss/', trust: 0.95 },
  { name: 'TechCrunch AI', type: 'news', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', trust: 0.84 },
  { name: 'VentureBeat AI', type: 'news', url: 'https://venturebeat.com/category/ai/feed/', trust: 0.82 },
  { name: 'The Verge AI', type: 'news', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', trust: 0.8 },
  { name: 'Reddit r/artificial', type: 'social', url: 'https://www.reddit.com/r/artificial/.rss', trust: 0.58 },
  { name: 'Reddit r/OpenAI', type: 'social', url: 'https://www.reddit.com/r/OpenAI/.rss', trust: 0.62 },
  { name: 'Reddit r/MachineLearning', type: 'social', url: 'https://www.reddit.com/r/MachineLearning/.rss', trust: 0.66 },
];

const GOOGLE_NEWS_QUERIES = [
  ['AI Headlines', '"artificial intelligence" OR AI OR "machine learning"'],
  ['OpenAI & ChatGPT', 'OpenAI OR ChatGPT OR GPT'],
  ['Anthropic & Claude', 'Anthropic OR Claude'],
  ['Gemini & DeepMind', 'Gemini OR DeepMind OR "Google AI"'],
  ['AI Agents', '"AI agents" OR "agentic AI" OR "computer use"'],
  ['AI Research', '"AI research" OR "machine learning research" OR benchmark'],
  ['AI Policy', '"AI policy" OR "AI regulation" OR "AI law"'],
  ['AI Business', '"AI funding" OR "AI startup" OR "AI acquisition"'],
];

const AI_KEYWORDS = [
  'ai',
  'artificial intelligence',
  'machine learning',
  'llm',
  'model',
  'gpt',
  'claude',
  'gemini',
  'openai',
  'anthropic',
  'midjourney',
  'stability ai',
  'perplexity',
  'agent',
  'generative',
  'inference',
  'alignment',
  'deep learning',
  'neural',
  'copilot',
];

const sharedStore = createSharedStore();
const errorTracker = createErrorBudgetTracker();
const limiter = createRateLimiter();
const pruneTimer = setInterval(() => limiter.prune(), 60_000);
pruneTimer.unref();
let aiNewsRefresh = null;
const aiNewsCache = {
  expiresAt: 0,
  payload: null,
};

function logEvent(level, event, fields = {}) {
  const rec = {
    ts: new Date().toISOString(),
    level,
    event,
    service: 'sanzy-groq-proxy',
    env: NODE_ENV,
    ...fields,
  };

  const line = JSON.stringify(rec);
  if (level === 'error') {
    console.error(line);
    return;
  }
  console.log(line);
}

function getCurrentMonthWindow(now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  return {
    start,
    end: now,
    startDate: start.toISOString().slice(0, 10),
    endDate: now.toISOString().slice(0, 10),
    label: start.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
  };
}

function buildGoogleNewsSources() {
  return GOOGLE_NEWS_QUERIES.map(([name, query]) => ({
    name: `Google News · ${name}`,
    type: 'news',
    trust: 0.78,
    url: `https://news.google.com/rss/search?q=${encodeURIComponent(`${query} when:30d`)}&hl=en-US&gl=US&ceid=US:en`,
  }));
}

function getAiNewsSources() {
  return [...BASE_AI_NEWS_SOURCES, ...buildGoogleNewsSources()];
}

function getApiNewsSources() {
  const sources = [];
  if (NEWS_API_KEY) {
    sources.push({
      name: 'NewsAPI.org',
      type: 'news',
      provider: 'newsapi',
      url: 'https://newsapi.org/v2/everything',
      trust: 0.83,
    });
  }
  if (GNEWS_API_KEY) {
    sources.push({
      name: 'GNews.io',
      type: 'news',
      provider: 'gnews',
      url: 'https://gnews.io/api/v4/search',
      trust: 0.79,
    });
  }
  return sources;
}

function getClientIp(req) { return clientIp(req, TRUSTED_PROXIES); }
async function checkRateLimit(key, config) {
  if (sharedStore.isShared) {
    return sharedStore.checkRateLimit(key, config);
  }
  return limiter.check(key, config);
}

async function enforceRateLimit(req, res, routeKey, config) {
  const ip = getClientIp(req);
  const ua = String(req.headers['user-agent'] || '').slice(0, 120);
  const result = await checkRateLimit(`${routeKey}:${ip}`, config);

  if (result.ok) return true;

  const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);
  sendJson(req, res, 429, {
    error: 'Rate limit exceeded.',
    retryAfterSeconds: Math.max(retryAfter, 1),
  }, {
    'Retry-After': String(Math.max(retryAfter, 1)),
  });

  logEvent('warn', 'rate_limit_blocked', {
    route: routeKey,
    ip,
    ua,
    retryAfterSeconds: Math.max(retryAfter, 1),
  });

  return false;
}

function resolveAllowedOrigin(req) {
  const origin = req.headers.origin;
  if (!origin || typeof origin !== 'string') return null;
  return ALLOWED_ORIGINS.has(origin) ? origin : '';
}

function buildSecurityHeaders(req, custom = {}) {
  const allowedOrigin = resolveAllowedOrigin(req);
  const base = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=() ',
    'Cross-Origin-Resource-Policy': 'same-site',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
    Vary: 'Origin',
  };

  if (allowedOrigin) {
    base['Access-Control-Allow-Origin'] = allowedOrigin;
  }

  return { ...base, ...custom };
}

function sendJson(req, res, status, payload, customHeaders = {}) {
  const body = JSON.stringify(payload);
  const headers = buildSecurityHeaders(req, customHeaders);
  res.writeHead(status, headers);
  res.end(body);
}

function stripHtml(html = '') {
  let text = String(html);
  for (let i = 0; i < 2; i += 1) {
    text = text
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&#x27;/gi, "'")
      .replace(/&#x2F;/gi, '/');
  }

  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function inferNewsType(text = '') {
  const t = text.toLowerCase();
  if (/policy|regulation|law|eu|compliance|government|act\b/.test(t)) return 'Policy';
  if (/raise|funding|series\s?[abcde]|valuation|venture|investment/.test(t)) return 'Funding';
  if (/research|paper|benchmark|study|arxiv|findings/.test(t)) return 'Research';
  if (/creator|youtube|content creation|marketing|design workflow/.test(t)) return 'Creator Economy';
  if (/launch|released|release|ships|rollout|introduces|announce/.test(t)) return 'Model Release';
  if (/product|feature|tool|platform|integration/.test(t)) return 'Product Launch';
  return 'AI Update';
}

function inferUrgency(text = '') {
  const t = text.toLowerCase();
  if (/breaking|major|critical|raises|regulation|ban|security/.test(t)) return 'high';
  if (/launch|update|new|model|release|feature/.test(t)) return 'medium';
  return 'low';
}

function toRelativeTime(dateStr) {
  if (!dateStr) return 'recently';
  const ts = Date.parse(dateStr);
  if (Number.isNaN(ts)) return 'recently';

  const diff = Date.now() - ts;
  const mins = Math.max(1, Math.floor(diff / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function isAiRelated(item) {
  const hay = `${item.title} ${item.description} ${item.category} ${item.sourceName}`.toLowerCase();
  return AI_KEYWORDS.some((kw) => hay.includes(kw));
}

function isCurrentMonthNews(item, now = new Date()) {
  const ts = Date.parse(item.pubDate || '');
  if (Number.isNaN(ts)) return false;
  const { start, end } = getCurrentMonthWindow(now);
  return ts >= start.getTime() && ts <= end.getTime() + 5 * 60_000;
}

function isImportantAiNews(item) {
  const title = String(item.title || '').toLowerCase();
  const desc = String(item.description || '').toLowerCase();
  const sourceType = String(item.sourceType || '').toLowerCase();

  const lowSignalPatterns = [
    /\b(help|anyone|why|how do i|my account|issue|bug|problem|question)\b/,
    /\b(rate my|prompt help|beginner question|homework|need advice)\b/,
    /\?/,
  ];

  const highSignalPatterns = [
    /\b(launch|released|release|ships|announces?|rollout|introduces?)\b/,
    /\b(funding|series\s?[abcde]|valuation|investment|raises?)\b/,
    /\b(policy|regulation|law|compliance|government|eu|act)\b/,
    /\b(research|paper|benchmark|study|arxiv|findings)\b/,
  ];

  const combined = `${title} ${desc}`;
  const hasHighSignal = highSignalPatterns.some((re) => re.test(combined));
  const isLowSignal = lowSignalPatterns.some((re) => re.test(title));

  if (sourceType === 'social') {
    return hasHighSignal && !isLowSignal;
  }

  return !isLowSignal;
}

function normalizeItem(item, idx) {
  const combined = `${item.title} ${item.description}`;
  const cleanDesc = stripHtml(item.description);
  const summary = cleanDesc.length > 460 ? `${cleanDesc.slice(0, 457)}...` : cleanDesc;
  const why = summary.length > 0
    ? summary
    : 'This AI update may impact tools, workflows, and business execution. Review source for complete context.';

  const pubTs = Date.parse(item.pubDate || 0);
  const recencyBoost = Number.isNaN(pubTs) ? 8 : Math.max(0, 18 - Math.floor((Date.now() - pubTs) / 3_600_000));
  const sourceBoost = item.sourceType === 'official' ? 18 : item.sourceType === 'news' ? 12 : 6;
  const signalBoost = /launch|release|funding|policy|research|benchmark|model/i.test(combined) ? 12 : 4;
  const trustBoost = Math.round(Math.max(0, Math.min(1, Number(item.sourceTrust || 0.7))) * 18);

  const impact = Math.min(99, 42 + recencyBoost + sourceBoost + signalBoost + trustBoost);
  const opportunity = Math.min(97, 40 + sourceBoost + trustBoost + (inferNewsType(combined) === 'Product Launch' ? 20 : 12));
  const editorialScore = impact + opportunity + trustBoost;

  return {
    id: idx + 1,
    type: inferNewsType(combined),
    urgency: inferUrgency(combined),
    title: item.title,
    source: item.sourceName,
    sourceType: item.sourceType,
    sourceUrl: item.link,
    publishedAt: Number.isNaN(pubTs) ? '' : new Date(pubTs).toISOString(),
    timeAgo: toRelativeTime(item.pubDate),
    impact,
    opportunity,
    trustScore: Math.round(Math.max(0, Math.min(1, Number(item.sourceTrust || 0.7))) * 100),
    editorialScore,
    company: item.sourceName,
    summary,
    whyItMatters: why,
    actions: [
      'Open the original source and verify details before acting.',
      'Map this update to your current AI stack and workflows.',
      'Prioritize one experiment this week based on this update.',
    ],
  };
}

async function fetchSourceItems(sourceMeta) {
  const res = await fetch(sourceMeta.url, {
    method: 'GET',
    headers: { 'User-Agent': 'SanzyAI-Newsroom/1.1 (+https://sanzyai.com)' },
    signal: AbortSignal.timeout(9000),
  });

  if (!res.ok) return [];
  const xml = await res.text();
  if (!xml || !xml.trim()) return [];

  return parseFeed(xml, sourceMeta);
}

function mapNewsApiArticleToItem(article, sourceMeta) {
  const sourceName = stripHtml(article?.source?.name || sourceMeta.name);
  const title = stripHtml(article?.title || '');
  const description = stripHtml(article?.description || article?.content || '');
  const link = stripHtml(article?.url || '');
  const pubDate = stripHtml(article?.publishedAt || '');
  const category = 'ai';

  if (!title || !link) return null;
  return {
    title,
    link,
    pubDate,
    category,
    description,
    sourceName,
    sourceType: sourceMeta.type,
    sourceTrust: sourceMeta.trust || 0.7,
  };
}

function mapGNewsArticleToItem(article, sourceMeta) {
  const sourceName = stripHtml(article?.source?.name || sourceMeta.name);
  const title = stripHtml(article?.title || '');
  const description = stripHtml(article?.description || article?.content || '');
  const link = stripHtml(article?.url || '');
  const pubDate = stripHtml(article?.publishedAt || '');
  const category = 'ai';

  if (!title || !link) return null;
  return {
    title,
    link,
    pubDate,
    category,
    description,
    sourceName,
    sourceType: sourceMeta.type,
    sourceTrust: sourceMeta.trust || 0.7,
  };
}

async function fetchApiNewsItems(sourceMeta) {
  const monthWindow = getCurrentMonthWindow();
  if (sourceMeta.provider === 'newsapi') {
    const pagesToFetch = 3;
    const pageSize = 100;
    const allItems = [];

    for (let page = 1; page <= pagesToFetch; page += 1) {
      const url = new URL(sourceMeta.url);
      url.searchParams.set('q', '(AI OR "artificial intelligence" OR "machine learning" OR LLM OR OpenAI OR Anthropic OR Gemini)');
      url.searchParams.set('language', 'en');
      url.searchParams.set('sortBy', 'publishedAt');
      url.searchParams.set('from', monthWindow.startDate);
      url.searchParams.set('to', monthWindow.endDate);
      url.searchParams.set('pageSize', String(pageSize));
      url.searchParams.set('page', String(page));
      url.searchParams.set('apiKey', NEWS_API_KEY);

      const res = await fetch(url, {
        method: 'GET',
        headers: { 'User-Agent': 'SanzyAI-Newsroom/1.1 (+https://sanzyai.com)' },
        signal: AbortSignal.timeout(9000),
      });
      if (!res.ok) break;

      const payload = await res.json();
      const articles = Array.isArray(payload?.articles) ? payload.articles : [];
      if (!articles.length) break;

      const mapped = articles.map((a) => mapNewsApiArticleToItem(a, sourceMeta)).filter(Boolean);
      allItems.push(...mapped);

      if (articles.length < pageSize) break;
    }

    return allItems;
  }

  if (sourceMeta.provider === 'gnews') {
    const pagesToFetch = 3;
    const pageSize = 100;
    const allItems = [];

    for (let page = 1; page <= pagesToFetch; page += 1) {
      const url = new URL(sourceMeta.url);
      url.searchParams.set('q', 'AI OR "artificial intelligence" OR "machine learning" OR LLM OR OpenAI OR Anthropic OR Gemini');
      url.searchParams.set('lang', 'en');
      url.searchParams.set('max', String(pageSize));
      url.searchParams.set('sortby', 'publishedAt');
      url.searchParams.set('from', monthWindow.start.toISOString());
      url.searchParams.set('to', monthWindow.end.toISOString());
      url.searchParams.set('page', String(page));
      url.searchParams.set('token', GNEWS_API_KEY);

      const res = await fetch(url, {
        method: 'GET',
        headers: { 'User-Agent': 'SanzyAI-Newsroom/1.1 (+https://sanzyai.com)' },
        signal: AbortSignal.timeout(9000),
      });
      if (!res.ok) break;

      const payload = await res.json();
      const articles = Array.isArray(payload?.articles) ? payload.articles : [];
      if (!articles.length) break;

      const mapped = articles.map((a) => mapGNewsArticleToItem(a, sourceMeta)).filter(Boolean);
      allItems.push(...mapped);

      if (articles.length < pageSize) break;
    }

    return allItems;
  }

  return [];
}

async function buildAiNewsPayload() {
  const rssSources = getAiNewsSources();
  const apiSources = getApiNewsSources();

  const rssFetches = Promise.allSettled(rssSources.map((s) => fetchSourceItems(s)));
  const apiFetches = Promise.allSettled(apiSources.map((s) => fetchApiNewsItems(s)));

  const [rssAll, apiAll] = await Promise.all([rssFetches, apiFetches]);

  const rssDiagnostics = rssSources.map((source, index) => {
    const result = rssAll[index];
    if (!result || result.status !== 'fulfilled') {
      return { source: source.name, provider: 'rss', ok: false, fetched: 0 };
    }
    return { source: source.name, provider: 'rss', ok: true, fetched: result.value.length };
  });

  const apiDiagnostics = apiSources.map((source, index) => {
    const result = apiAll[index];
    if (!result || result.status !== 'fulfilled') {
      return { source: source.name, provider: source.provider, ok: false, fetched: 0 };
    }
    return { source: source.name, provider: source.provider, ok: true, fetched: result.value.length };
  });

  const merged = [...rssAll, ...apiAll]
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .filter((item) => isCurrentMonthNews(item))
    .filter(isAiRelated)
    .filter(isImportantAiNews);

  const dedup = [];
  const seen = new Set();
  for (const item of merged) {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (seen.has(key)) continue;
    seen.add(key);
    dedup.push(item);
  }

  dedup.sort((a, b) => Date.parse(b.pubDate || 0) - Date.parse(a.pubDate || 0));

  const normalizedAll = dedup.map(normalizeItem)
    .sort((a, b) => Date.parse(b.publishedAt || 0) - Date.parse(a.publishedAt || 0) || b.editorialScore - a.editorialScore);

  const normalized = MAX_NEWS_ITEMS > 0 ? normalizedAll.slice(0, MAX_NEWS_ITEMS) : normalizedAll;

  const providerCounts = normalized.reduce((acc, item) => {
    const key = item.sourceType || 'unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return {
    ok: true,
    updatedAt: new Date().toISOString(),
    period: (() => {
      const window = getCurrentMonthWindow();
      return { label: window.label, start: window.start.toISOString(), end: window.end.toISOString() };
    })(),
    sources: [...rssSources, ...apiSources].map((s) => ({ name: s.name, type: s.type, url: s.url, trust: s.trust })),
    count: normalized.length,
    items: normalized,
    diagnostics: {
      fetchedBySource: [...rssDiagnostics, ...apiDiagnostics],
      providerCounts,
      appliedMaxNewsItems: MAX_NEWS_ITEMS > 0 ? MAX_NEWS_ITEMS : null,
      totalBeforeLimit: normalizedAll.length,
    },
  };
}

async function handleAiNews(req, res) {
  const now = Date.now();
  if (aiNewsCache.payload && aiNewsCache.expiresAt > now) {
    sendJson(req, res, 200, { ...aiNewsCache.payload, cached: true });
    return;
  }

  const sharedCached = await sharedStore.getCache(AI_NEWS_CACHE_KEY);
  if (sharedCached) {
    // Keep a local stale copy for upstream failure recovery without extending
    // the shared cache's TTL on this replica.
    aiNewsCache.payload = sharedCached;
    aiNewsCache.expiresAt = 0;
    sendJson(req, res, 200, { ...sharedCached, cached: true });
    return;
  }

  try {
    if (!aiNewsRefresh) {
      aiNewsRefresh = buildAiNewsPayload().then(payload => {
        if (!payload.items.length) throw new Error('No live news available.');
        return payload;
      }).finally(() => { aiNewsRefresh = null; });
    }
    const payload = await aiNewsRefresh;
    aiNewsCache.payload = payload;
    aiNewsCache.expiresAt = Date.now() + AI_NEWS_CACHE_TTL_MS;
    await sharedStore.setCache(AI_NEWS_CACHE_KEY, payload, AI_NEWS_CACHE_TTL_MS);

    sendJson(req, res, 200, { ...payload, cached: false });
  } catch (e) {
    logEvent('error', 'ai_news_failed', { error: e.name || 'Error' });

    if (aiNewsCache.payload) {
      sendJson(req, res, 200, {
        ...aiNewsCache.payload,
        cached: true,
        stale: true,
        staleReason: 'upstream_fetch_failure',
      });
      return;
    }

    sendJson(req, res, 503, { ok: false, error: 'Live news is temporarily unavailable.' });
  }
}

async function isProxyAlreadyRunning(port) {
  try {
    const probe = await fetch(`http://localhost:${port}/api/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(1200),
    });
    return probe.ok;
  } catch {
    return false;
  }
}

function buildMessages(userMessage, history = []) {
  const compactHistory = Array.isArray(history)
    ? history.slice(-6).map((m) => ({ role: m.role, content: String(m.text || m.content || '').slice(0, 800) }))
    : [];

  return [
    {
      role: 'system',
      content:
        'You are SanzyAI assistant. Keep replies concise and practical. Target 100-200 tokens. Prefer bullets, no fluff. If uncertain, say so briefly and offer one clear next step. Site facts: paid prompt checkout is paused during a content-quality review; /prompt-store offers editable samples and a free starter pack. Service prices, scope and delivery dates require team confirmation at /ai-services. /learn-free provides eight stages of guidance, with no certificate. Do not invent product prices, reviews, earnings, sales availability or response-time guarantees. Domain and third-party tool prices must be confirmed with the provider.',
    },
    ...compactHistory,
    { role: 'user', content: String(userMessage || '').slice(0, 1500) },
  ];
}

async function handleChat(req, res) {
  const { message, history } = validateChatBody(await readJsonBody(req, MAX_BODY_BYTES.chat));
  if (!GROQ_API_KEY) throw new HttpError(503, 'AI chat is temporarily unavailable.');
  if (activeChats >= CHAT_MAX_CONCURRENT) throw new HttpError(503, 'AI chat is busy. Please try again shortly.');
  if (!(await checkRateLimit('chat-daily-budget', { windowMs: 86_400_000, limit: CHAT_DAILY_LIMIT })).ok) throw new HttpError(429, 'AI chat has reached its daily allowance.');
  activeChats += 1;
  try {
    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: buildMessages(message, history),
        temperature: 0.4,
        max_tokens: 180,
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!upstream.ok) {
      logEvent('warn', 'chat_upstream_error', { status: upstream.status });
      await errorTracker.recordError({ route: '/api/chat', error: `upstream_${upstream.status}` });
      sendJson(req, res, 502, { error: 'AI service is temporarily unavailable.' });
      return;
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || 'I could not generate a response.';

    sendJson(req, res, 200, {
      reply,
      model: data.model || GROQ_MODEL,
      usage: data.usage || null,
    });
  } catch (e) {
    logEvent('error', 'chat_request_failed', { error: String(e?.message || e) });
    await errorTracker.recordError({ route: '/api/chat', error: String(e?.message || e) });
    sendJson(req, res, 502, { error: 'AI service is temporarily unavailable.' });
  } finally {
    activeChats -= 1;
  }
}

async function handleLead(req, res, subscription = false) {
  const payload = validateLeadBody(await readJsonBody(req, MAX_BODY_BYTES.fallback), subscription);
  const webhook = subscription ? process.env.NEWSLETTER_WEBHOOK_URL : process.env.LEAD_WEBHOOK_URL;
  if (!webhook) throw new HttpError(503, subscription ? 'Subscriptions are temporarily unavailable. Please try again later.' : 'Requests are temporarily unavailable. Email hello@sanzyai.com instead.');
  const url = new URL(webhook);
  if (url.protocol !== 'https:') throw new Error('Webhook must use HTTPS.');
  const result = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
    redirect: 'error', signal: AbortSignal.timeout(8000),
  });
  if (!result.ok) throw new HttpError(502, 'The request could not be accepted. Please try again.');
  sendJson(req, res, 200, { ok: true, accepted: true });
}

export const server = createServer(async (req, res) => {
  const start = Date.now();
  const route = String(req.url || '/').split('?')[0];
  const method = req.method || 'GET';
  const ip = getClientIp(req);

  try {
    const allowedOrigin = resolveAllowedOrigin(req);

    if (!await enforceRateLimit(req, res, 'global', GLOBAL_RATE_LIMIT)) return;
    if (req.headers.origin && allowedOrigin === '') throw new HttpError(403, 'Origin is not allowed.');

    if (method === 'OPTIONS') {
      if (req.headers.origin && allowedOrigin === '') {
        sendJson(req, res, 403, { error: 'Origin is not allowed.' });
        return;
      }

      sendJson(req, res, 204, {});
      return;
    }

    if (route === '/api/health' && method === 'GET') {
      sendJson(req, res, 200, { ok: true, env: NODE_ENV, hasKey: Boolean(GROQ_API_KEY), model: GROQ_MODEL, sharedStore: sharedStore.type });
      return;
    }

    if (route === '/api/ready' && method === 'GET') {
      const ready = Boolean(GROQ_API_KEY);
      sendJson(req, res, ready ? 200 : 503, {
        ok: ready,
        ready,
        checks: {
          groqApiKey: ready,
        },
      });
      return;
    }

    if (route === '/api/chat' && method === 'POST') {
      if (!await enforceRateLimit(req, res, 'chat', CHAT_RATE_LIMIT)) return;
      await handleChat(req, res);
      return;
    }

    if (route === '/api/ai-news' && method === 'GET') {
      if (!await enforceRateLimit(req, res, 'ai-news', NEWS_RATE_LIMIT)) return;
      await handleAiNews(req, res);
      return;
    }

    if (['/api/leads', '/api/subscribe'].includes(route) && method === 'POST') {
      if (!await enforceRateLimit(req, res, 'forms', { windowMs: 60_000, limit: 5 })) return;
      await handleLead(req, res, route === '/api/subscribe');
      return;
    }
    sendJson(req, res, 404, { error: 'Not found.' });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    if (status === 500) {
      logEvent('error', 'request_failed', { route, error: error.name });
      await errorTracker.recordError({ route, error: error.message || error.name });
    }
    if (!res.headersSent && !res.destroyed) sendJson(req, res, status, { error: error instanceof HttpError ? error.message : 'Request failed. Please try again.' });
  } finally {
    logEvent('info', 'request_complete', {
      method,
      route,
      ip,
      durationMs: Date.now() - start,
    });
  }
});

server.on('error', async (err) => {
  if (err?.code === 'EADDRINUSE') {
    const alreadyRunning = await isProxyAlreadyRunning(PORT);
    if (alreadyRunning) {
      logEvent('warn', 'proxy_already_running', { port: PORT });
      process.exit(0);
      return;
    }

    logEvent('error', 'port_in_use', { port: PORT });
    process.exit(1);
    return;
  }

  logEvent('error', 'proxy_startup_error', { error: err?.message || String(err) });
  process.exit(1);
});

server.requestTimeout = 15_000;
server.headersTimeout = 10_000;
server.maxHeadersCount = 50;

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) server.listen(PORT, HOST, () => {
  logEvent('info', 'proxy_started', {
    port: PORT,
    allowedOrigins: Array.from(ALLOWED_ORIGINS),
    model: GROQ_MODEL,
  });
});
