import fs from 'fs';
import path from 'path';

const emojiRegex = /[\p{Extended_Pictographic}--[\u00A9\u00AE\u2603]]/v;

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
      if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.mjs')) {
        results.push(full);
      }
    }
  }
  return results;
}

const files = walk('.');
let total = 0;
const byFile = {};
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Check if line contains emoji except copyright/trademark
    if (emojiRegex.test(line)) {
      total++;
      if (!byFile[f]) byFile[f] = [];
      byFile[f].push({ line: idx + 1, text: line.trim() });
    }
  });
}

console.log(`Found ${total} lines with emojis across ${Object.keys(byFile).length} files.`);
const targetFilter = process.argv[2];
for (const [f, matches] of Object.entries(byFile)) {
  if (!targetFilter || f.includes(targetFilter)) {
    console.log(`\n=== ${f} (${matches.length} matches) ===`);
    matches.forEach(m => console.log(`  L${m.line}: ${m.text}`));
  }
}



