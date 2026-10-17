import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
function walk(dir) {
  let res = [];
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', 'dist', '.git', '.gemini', 'playwright-report', 'test-results'].includes(item)) continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      res = res.concat(walk(full));
    } else if (item.endsWith('.html')) {
      res.push(full);
    }
  }
  return res;
}

const files = walk(root);
const results = {};

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const rel = path.relative(root, file);
  lines.forEach((line, idx) => {
    // Match empty spans or divs that look like stripped icons
    const matches = line.matchAll(/<(span|div)\s+([^>]*?)?>\s*<\/\1>/gi);
    for (const match of matches) {
      const fullTag = match[0];
      const attrs = match[2] || '';
      
      // Ignore hamburger spans
      if (line.includes('hamburger') || attrs.includes('hamburger')) continue;
      // Ignore skeletons, overlays, dots, pulse, spinners
      if (attrs.includes('ui-skeleton') || attrs.includes('card-overlay') || attrs.includes('badge-dot') || attrs.includes('badge-pulse') || attrs.includes('spinner') || attrs.includes('line-divider') || attrs.includes('stat-divider')) continue;
      // Ignore dynamic containers meant to be filled by JS
      if (attrs.includes('id="logoGrid"') || attrs.includes('id="modalPreview"') || attrs.includes('id="scriptsGrid"') || attrs.includes('id="couponGrid"') || attrs.includes('id="featuredProducts"') || attrs.includes('id="promptGrid"') || attrs.includes('id="toastIcon"') || attrs.includes('id="availStatus"') || attrs.includes('id="modalContent"') || attrs.includes('id="modalBody"')) continue;
      
      // Ignore clean SVG internal elements
      if (fullTag.includes('polyline') || fullTag.includes('path') || fullTag.includes('circle')) continue;

      if (!results[rel]) results[rel] = [];
      results[rel].push({ line: idx + 1, tag: fullTag, text: line.trim() });
    }
  });
}

let total = 0;
for (const [f, matches] of Object.entries(results)) {
  total += matches.length;
  console.log(`\n=== ${f} (${matches.length}) ===`);
  matches.forEach(m => console.log(`  L${m.line}: ${m.tag}`));
}
console.log(`\nTotal stripped/empty icon elements: ${total}`);

