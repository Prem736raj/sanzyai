import fs from 'node:fs';
import path from 'node:path';

const emojiRegex = /\p{Extended_Pictographic}/u;

function scanDir(dir, files = []) {
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', 'dist', '.git', '.gemini', 'playwright-report', 'test-results'].includes(item)) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath, files);
    } else if (/\.(html|js|css|json)$/.test(item)) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = scanDir(process.cwd());
const results = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  const fileMatches = [];
  lines.forEach((line, idx) => {
    if (emojiRegex.test(line)) {
      const emojis = line.match(/\p{Extended_Pictographic}/gu) || [];
      fileMatches.push({ lineNum: idx + 1, emojis: [...new Set(emojis)].join(' '), text: line.trim() });
    }
  });
  if (fileMatches.length > 0) {
    results.push({ file: path.relative(process.cwd(), file), count: fileMatches.length, matches: fileMatches });
  }
}

console.log(`Found ${results.length} files with emojis:`);
for (const r of results) {
  console.log(`\n--- ${r.file} (${r.count} lines) ---`);
  for (const m of r.matches.slice(0, 5)) {
    console.log(`  L${m.lineNum} [${m.emojis}]: ${m.text.slice(0, 80)}`);
  }
  if (r.matches.length > 5) {
    console.log(`  ... and ${r.matches.length - 5} more`);
  }
}
