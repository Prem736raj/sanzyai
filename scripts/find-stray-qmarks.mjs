import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.git', 'dist', '.agents', 'deliverables'].includes(file)) {
        results = results.concat(walk(full));
      }
    } else {
      if (file.endsWith('.html') || file.endsWith('.js')) {
        results.push(full);
      }
    }
  }
  return results;
}

const files = walk('.');
const byFile = {};
let count = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (/>\s*\?\s*</.test(line)) {
      count++;
      if (!byFile[f]) byFile[f] = [];
      byFile[f].push({ line: idx + 1, text: line.trim() });
    }
  });
}

console.log(`Found ${count} stray question marks across ${Object.keys(byFile).length} files:`);
for (const [f, items] of Object.entries(byFile)) {
  console.log(`\n=== ${f} (${items.length}) ===`);
  items.forEach(i => console.log(`  L${i.line}: ${i.text}`));
}
