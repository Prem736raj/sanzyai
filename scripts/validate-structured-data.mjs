import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.cwd();
const requiredSchemaFiles = new Set([
  'index.html',
  'blog.html',
  'learn-free.html',
  'prompt-store.html',
  'blog/best-chatgpt-prompts-business.html',
  'blog/how-to-write-ai-prompts.html',
  'blog/midjourney-product-photography.html',
]);

const htmlFiles = await collectHtmlFiles();
const errors = [];
let schemaCount = 0;

for (const file of htmlFiles) {
  const fileName = relative(root, file).replaceAll('\\', '/');
  const html = await readFile(file, 'utf8');
  const canonical = extractCanonical(html);
  const blocks = [...html.matchAll(/<script\b[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

  if (requiredSchemaFiles.has(fileName) && blocks.length === 0) {
    errors.push(`${fileName}: expected at least one JSON-LD block.`);
  }

  blocks.forEach((match, index) => {
    schemaCount += 1;
    const label = `${fileName} JSON-LD #${index + 1}`;
    let value;
    try {
      value = JSON.parse(match[1].trim());
    } catch (error) {
      errors.push(`${label}: invalid JSON (${error.message}).`);
      return;
    }

    validateDocument(value, label, canonical);
  });
}

if (errors.length) {
  console.error(`Structured-data validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Structured-data validation passed: ${schemaCount} JSON-LD block(s) across ${htmlFiles.length} HTML file(s).`);
}

async function collectHtmlFiles() {
  const rootEntries = await readdir(root, { withFileTypes: true });
  const files = rootEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => join(root, entry.name));

  const blogDir = join(root, 'blog');
  const blogEntries = await readdir(blogDir, { withFileTypes: true });
  files.push(...blogEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => join(blogDir, entry.name)));
  return files.sort();
}

function extractCanonical(html) {
  const match = html.match(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/i)
    || html.match(/<link\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*\brel\s*=\s*["']canonical["'][^>]*>/i);
  return match?.[1] || '';
}

function validateDocument(value, label, canonical) {
  const nodes = Array.isArray(value) ? value : [value];
  if (!nodes.length) {
    errors.push(`${label}: schema document is empty.`);
    return;
  }

  nodes.forEach((node, index) => validateNode(node, nodes.length > 1 ? `${label}[${index}]` : label, canonical));
}

function validateNode(node, label, canonical) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    errors.push(`${label}: top-level schema value must be an object.`);
    return;
  }

  if (!isSchemaContext(node['@context'])) {
    errors.push(`${label}: @context must reference https://schema.org.`);
  }

  if (Array.isArray(node['@graph'])) {
    if (!node['@graph'].length) errors.push(`${label}: @graph must not be empty.`);
    for (const [index, child] of node['@graph'].entries()) {
      validateTypedNode(child, `${label}.@graph[${index}]`, canonical);
    }
    return;
  }

  validateTypedNode(node, label, canonical);
}

function validateTypedNode(node, label, canonical) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    errors.push(`${label}: schema node must be an object.`);
    return;
  }

  const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
  if (!types[0] || types.some((type) => typeof type !== 'string')) {
    errors.push(`${label}: @type is required.`);
    return;
  }

  for (const type of types) validateRequiredFields(node, type, label);

  if (canonical) {
    const entityUrl = typeUrl(node, types);
    if (entityUrl && normalizeUrl(entityUrl) !== normalizeUrl(canonical)) {
      errors.push(`${label}: schema URL ${entityUrl} does not match canonical ${canonical}.`);
    }
  }
}

function validateRequiredFields(node, type, label) {
  const requiredByType = {
    WebSite: ['name', 'url'],
    Organization: ['name', 'url'],
    Course: ['name', 'description', 'provider', 'url'],
    Blog: ['name', 'url', 'publisher'],
    CollectionPage: ['name', 'url', 'description'],
    BlogPosting: ['headline', 'description', 'mainEntityOfPage', 'author', 'publisher'],
    BreadcrumbList: ['itemListElement'],
  };

  for (const field of requiredByType[type] || []) {
    if (node[field] == null || node[field] === '' || (Array.isArray(node[field]) && node[field].length === 0)) {
      errors.push(`${label}: ${type} is missing required field ${field}.`);
    }
  }

  if (type === 'BreadcrumbList' && Array.isArray(node.itemListElement)) {
    node.itemListElement.forEach((item, index) => {
      if (item?.['@type'] !== 'ListItem' || !Number.isInteger(item?.position) || !item?.name) {
        errors.push(`${label}: breadcrumb item ${index + 1} must be a ListItem with integer position and name.`);
      }
    });
  }
}

function typeUrl(node, types) {
  if (types.includes('BlogPosting')) {
    return typeof node.mainEntityOfPage === 'string' ? node.mainEntityOfPage : node.mainEntityOfPage?.['@id'] || '';
  }
  if (types.some((type) => ['WebSite', 'Organization', 'Course', 'Blog', 'CollectionPage'].includes(type))) {
    return node.url || '';
  }
  return '';
}

function isSchemaContext(value) {
  if (typeof value === 'string') return normalizeUrl(value) === 'https://schema.org';
  if (Array.isArray(value)) return value.some(isSchemaContext);
  return false;
}

function normalizeUrl(value) {
  try {
    const url = new URL(value);
    const pathname = url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '');
    return `${url.origin}${pathname}`;
  } catch {
    return String(value).replace(/\/$/, '');
  }
}
