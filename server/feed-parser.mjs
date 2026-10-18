import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
  parseTagValue: false,
  processEntities: true,
  cdataPropName: '__cdata',
});

export function sanitizeText(val = '') {
  if (val == null) return '';
  let str = typeof val === 'object' ? (val['#text'] || val['__cdata'] || '') : String(val);
  str = str.replace(/<script[\s\S]*?<\/script>/gi, '')
           .replace(/<style[\s\S]*?<\/style>/gi, '')
           .replace(/<[^>]+>/g, ' ')
           .replace(/&amp;/g, '&')
           .replace(/&lt;/g, '<')
           .replace(/&gt;/g, '>')
           .replace(/&quot;/g, '"')
           .replace(/&#39;/g, "'")
           .replace(/&nbsp;/g, ' ')
           .replace(/&hellip;/g, '…')
           .replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (entity, value) => {
             const code = value[0].toLowerCase() === 'x' ? parseInt(value.slice(1), 16) : Number(value);
             return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff)
               ? String.fromCodePoint(code) : entity;
           })
           .replace(/\s+/g, ' ')
           .trim();
  return str;
}

function resolveText(node) {
  if (!node) return '';
  if (typeof node === 'string') return sanitizeText(node);
  if (typeof node === 'object') {
    if (node['__cdata']) return sanitizeText(node['__cdata']);
    if (node['#text']) return sanitizeText(node['#text']);
    if (typeof node === 'object') {
      const keys = Object.keys(node);
      for (const k of keys) {
        if (!k.startsWith('@_')) {
          const inner = resolveText(node[k]);
          if (inner) return inner;
        }
      }
    }
  }
  return '';
}

function resolveLink(node) {
  if (!node) return '';
  if (typeof node === 'string') return node.trim();
  if (typeof node === 'object') {
    if (node['@_href']) return String(node['@_href']).trim();
    if (node['#text']) return String(node['#text']).trim();
    if (Array.isArray(node)) {
      for (const item of node) {
        const l = resolveLink(item);
        if (l) return l;
      }
    }
  }
  return '';
}

function toArray(val) {
  if (val == null) return [];
  return Array.isArray(val) ? val : [val];
}

export function parseFeed(xml = '', sourceMeta = {}) {
  if (!xml || typeof xml !== 'string' || !xml.trim()) return [];

  let parsed;
  try {
    parsed = parser.parse(xml);
  } catch {
    return [];
  }

  if (!parsed || typeof parsed !== 'object') return [];

  const items = [];

  // Check RSS (rss.channel.item or rdf:RDF.item)
  const channel = parsed.rss?.channel || parsed['rdf:RDF']?.channel || parsed.rdf?.channel;
  const rawRssItems = parsed.rss?.channel?.item ||
                      parsed['rdf:RDF']?.item ||
                      parsed.rdf?.item ||
                      channel?.item;

  if (rawRssItems) {
    const list = toArray(rawRssItems);
    for (const item of list) {
      if (!item || typeof item !== 'object') continue;
      const title = resolveText(item.title);
      const link = resolveLink(item.link);
      if (!title || !link) continue;

      const pubDate = resolveText(item.pubDate || item.date || item['dc:date']);
      const category = resolveText(item.category);
      const description = resolveText(item.description || item['content:encoded'] || item.content);
      const itemSourceName = resolveText(item.source);

      items.push({
        title,
        link,
        pubDate,
        category,
        description,
        sourceName: itemSourceName || sourceMeta.name || 'AI Source',
        sourceType: sourceMeta.type || 'news',
        sourceTrust: Number(sourceMeta.trust || 0.7),
      });
    }
    return items;
  }

  // Check Atom (feed.entry)
  const rawAtomEntries = parsed.feed?.entry;
  if (rawAtomEntries) {
    const list = toArray(rawAtomEntries);
    for (const entry of list) {
      if (!entry || typeof entry !== 'object') continue;
      const title = resolveText(entry.title);
      const link = resolveLink(entry.link);
      if (!title || !link) continue;

      const pubDate = resolveText(entry.updated || entry.published || entry.issued);
      const category = resolveText(entry.category?.['@_term'] || entry.category);
      const description = resolveText(entry.summary || entry.content);

      items.push({
        title,
        link,
        pubDate,
        category,
        description,
        sourceName: sourceMeta.name || 'AI Source',
        sourceType: sourceMeta.type || 'news',
        sourceTrust: Number(sourceMeta.trust || 0.7),
      });
    }
    return items;
  }

  return items;
}
