import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFeed, sanitizeText } from '../feed-parser.mjs';

test('feed-parser parses standard RSS 2.0 with CDATA and HTML', () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Test Channel</title>
      <item>
        <title><![CDATA[OpenAI Announces GPT-5]]></title>
        <link>https://openai.com/news/gpt-5</link>
        <pubDate>Fri, 17 Oct 2026 08:00:00 GMT</pubDate>
        <description><![CDATA[<p>A major <strong>breakthrough</strong> in intelligence.</p><script>alert(1)</script>]]></description>
        <category>AI Models</category>
        <source url="https://example.com">Example Publisher</source>
      </item>
    </channel>
  </rss>`;

  const items = parseFeed(xml, { name: 'OpenAI News', type: 'official', trust: 0.98 });
  assert.equal(items.length, 1);
  assert.equal(items[0].title, 'OpenAI Announces GPT-5');
  assert.equal(items[0].link, 'https://openai.com/news/gpt-5');
  assert.equal(items[0].sourceName, 'Example Publisher');
  assert.equal(items[0].sourceTrust, 0.98);
  assert.equal(items[0].category, 'AI Models');
  assert.doesNotMatch(items[0].description, /<script|alert/);
  assert.match(items[0].description, /breakthrough/);
});

test('feed-parser parses Atom feeds with link attributes and summaries', () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Anthropic News</title>
    <entry>
      <title>Claude 4 Technical Report</title>
      <link rel="alternate" type="text/html" href="https://anthropic.com/news/claude-4" />
      <updated>2026-10-17T07:30:00Z</updated>
      <summary>New alignment and reasoning benchmarks.</summary>
      <category term="Research" />
    </entry>
  </feed>`;

  const items = parseFeed(xml, { name: 'Anthropic', type: 'official', trust: 0.95 });
  assert.equal(items.length, 1);
  assert.equal(items[0].title, 'Claude 4 Technical Report');
  assert.equal(items[0].link, 'https://anthropic.com/news/claude-4');
  assert.equal(items[0].category, 'Research');
  assert.equal(items[0].pubDate, '2026-10-17T07:30:00Z');
});

test('feed-parser safely handles malformed XML and non-feed input without throwing', () => {
  assert.deepEqual(parseFeed(''), []);
  assert.deepEqual(parseFeed(null), []);
  assert.deepEqual(parseFeed('<random>Not a feed</random>'), []);
  assert.deepEqual(parseFeed('<<<broken xml >>'), []);
});

test('sanitizeText strips dangerous tags cleanly', () => {
  assert.equal(sanitizeText('Hello <script>bad()</script>world'), 'Hello world');
  assert.equal(sanitizeText('Hello <style>body{}</style>world'), 'Hello world');
  assert.equal(sanitizeText('<b>Bold</b> &amp; Clean'), 'Bold & Clean');
});

