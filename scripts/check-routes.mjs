import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.cwd();
const siteOrigin = 'https://sanzyai.com';
const htmlFiles = await collectHtmlFiles();
const routeToFile = new Map(htmlFiles.map((file) => [routeForFile(file), file]));
const errors = [];
let checkedLinks = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const sourceRoute = routeForFile(file);
  const sourceName = relative(root, file).replaceAll('\\', '/');
  const anchorPattern = /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi;

  for (const match of html.matchAll(anchorPattern)) {
    const href = match[1].trim();
    if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) continue;

    let url;
    try {
      url = new URL(href, `${siteOrigin}${sourceRoute}`);
    } catch {
      errors.push(`${sourceName}: invalid href ${href}.`);
      continue;
    }
    if (url.origin !== siteOrigin) continue;

    checkedLinks += 1;
    const pathname = normalizePath(url.pathname);
    if (routeToFile.has(pathname)) continue;
    if (await staticTargetExists(pathname)) continue;
    errors.push(`${sourceName}: internal link ${href} resolves to missing route ${pathname}.`);
  }
}

await validateRedirectMap();

if (errors.length) {
  console.error(`Route validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Route validation passed: ${checkedLinks} internal link(s), ${routeToFile.size} HTML route(s), and redirect targets are valid.`);
}

async function collectHtmlFiles() {
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(join(root, entry.name));
  }
  const blogDir = join(root, 'blog');
  for (const entry of await readdir(blogDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(join(blogDir, entry.name));
  }
  return files.sort();
}

function routeForFile(file) {
  const name = relative(root, file).replaceAll('\\', '/').replace(/\.html$/i, '');
  if (name === 'index') return '/';
  return `/${name}`;
}

function normalizePath(pathname) {
  let path = decodeURIComponent(pathname || '/');
  if (path === '/index.html') return '/';
  if (path.endsWith('.html')) path = path.slice(0, -5);
  if (path.length > 1) path = path.replace(/\/$/, '');
  return path || '/';
}

async function staticTargetExists(pathname) {
  if (!/\.[a-z0-9]+$/i.test(pathname)) return false;
  const relativeTarget = pathname.replace(/^\//, '');
  for (const base of [root, join(root, 'public')]) {
    try {
      await access(join(base, relativeTarget));
      return true;
    } catch {
      // Try the next supported static root.
    }
  }
  return false;
}

async function validateRedirectMap() {
  const redirectFile = join(root, 'public', '_redirects');
  let text;
  try {
    text = await readFile(redirectFile, 'utf8');
  } catch {
    errors.push('public/_redirects: redirect map is missing.');
    return;
  }

  const sources = new Set();
  for (const [index, rawLine] of text.split(/\r?\n/).entries()) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const [source, target, status, ...extra] = line.split(/\s+/);
    if (!source || !target || !status || extra.length) {
      errors.push(`public/_redirects:${index + 1}: expected "source target 3xx".`);
      continue;
    }
    if (sources.has(source)) errors.push(`public/_redirects:${index + 1}: duplicate source ${source}.`);
    sources.add(source);
    if (!/^3\d\d$/.test(status)) errors.push(`public/_redirects:${index + 1}: status ${status} is not a redirect.`);
    if (target.startsWith('/') && !routeToFile.has(normalizePath(target))) {
      errors.push(`public/_redirects:${index + 1}: target ${target} does not resolve to an HTML route.`);
    }
  }
}
