import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.js')).map(f => path.join(srcDir, f));

let count = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  const rel = path.relative(root, f);
  lines.forEach((l, idx) => {
    if (/<(div|span|i|p)\s+class="[^"]*(icon|badge|visual|symbol|res|why|stat|thumb|emoji)[^"]*">\s*<\/(div|span|i|p)>/.test(l)) {
      if (l.includes('badge-dot') || l.includes('badge-pulse')) return;
      console.log(`${rel}:${idx + 1}: ${l.trim()}`);
      count++;
    }
  });
}
console.log(`Total empty elements in JS found: ${count}`);

