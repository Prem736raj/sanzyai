import { test, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
process.env.GROQ_API_KEY = '';
process.env.MAX_NEWS_ITEMS = '300';
delete process.env.NEWS_API_KEY;
delete process.env.NEWSAPI_KEY;
delete process.env.GNEWS_API_KEY;
delete process.env.REDIS_URL;
delete process.env.UPSTASH_REDIS_REST_URL;

const realFetch = globalThis.fetch;
let upstreamAvailable = true;
let feed = '';
globalThis.fetch = async (url, options) => {
    if (String(url).startsWith('https://')) {
        return new Response(upstreamAvailable ? feed : '', { status: upstreamAvailable ? 200 : 503 });
    }
    return realFetch(url, options);
};
let server;
after(async () => {
    globalThis.fetch = realFetch;
    if (server) {
        server.closeAllConnections();
        await new Promise(resolve => server.close(resolve));
    }
});

function story(id, date) {
    return `<item><title>AI research release ${id}</title><link>https://example.test/news/${id}</link>` +
        `<pubDate>${date}</pubDate><description>New AI research and model benchmarks.</description>` +
        '<source url="https://example.test">Example Publisher</source></item>';
}

test('news serves hundreds of dated current-month stories and never reuses last-month cache', async t => {
    t.mock.timers.enable({ apis: ['Date'], now: Date.UTC(2026, 9, 17, 12) });
    // Install the clock before the proxy captures Date.now for its shared cache.
    ({ server } = await import('../groq-proxy.mjs'));
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    const recentStories = Array.from({ length: 320 }, (_, i) =>
        story(i, new Date(Date.now() - (i + 1) * 60_000).toISOString()));
    feed = '<rss><channel>' + recentStories.join('') +
        story('previous-month', '2026-09-30T23:59:59Z') +
        story('undated', '') + story('invalid-date', 'not-a-date') +
        story('future', '2026-11-01T00:00:00Z') + recentStories[0] + '</channel></rss>';

    const response = await realFetch(base + '/api/ai-news');
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.equal(payload.count, 300);
    assert.equal(payload.diagnostics.totalBeforeLimit, 320);
    assert.equal(payload.period.start, '2026-10-01T00:00:00.000Z');
    assert.equal(new Set(payload.items.map(item => item.title)).size, 300);
    assert.equal(payload.items.every(item => item.source === 'Example Publisher'), true);
    assert.equal(payload.items.every(item => item.publishedAt.startsWith('2026-10-')), true);
    assert.equal(payload.items.every((item, i, items) =>
        !i || Date.parse(items[i - 1].publishedAt) >= Date.parse(item.publishedAt)), true);
    assert.equal((await (await realFetch(base + '/api/ai-news')).json()).cached, true);

    // Same-month outages retain useful coverage; the next month must start fresh.
    t.mock.timers.setTime(Date.UTC(2026, 9, 17, 13));
    upstreamAvailable = false;
    const stale = await (await realFetch(base + '/api/ai-news')).json();
    assert.equal(stale.stale, true);
    assert.equal(stale.count, 300);

    t.mock.timers.setTime(Date.UTC(2026, 10, 1, 1));
    const unavailable = await realFetch(base + '/api/ai-news');
    assert.equal(unavailable.status, 503);
    assert.equal((await unavailable.json()).ok, false);

    upstreamAvailable = true;
    feed = `<rss><channel>${story('november', '2026-11-01T00:30:00Z')}</channel></rss>`;
    const nextMonth = await (await realFetch(base + '/api/ai-news')).json();
    assert.equal(nextMonth.count, 1);
    assert.equal(nextMonth.period.start, '2026-11-01T00:00:00.000Z');
    assert.equal(nextMonth.items[0].title, 'AI research release november');
});
