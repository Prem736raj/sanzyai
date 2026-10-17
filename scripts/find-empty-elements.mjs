import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = fs.readdirSync(root).filter(f => f.endsWith('.html')).map(f => path.join(root, f));
if (fs.existsSync(path.join(root, 'blog'))) {
  files.push(...fs.readdirSync(path.join(root, 'blog')).filter(f => f.endsWith('.html')).map(f => path.join(root, 'blog', f)));
}

let count = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  const rel = path.relative(root, f);
  lines.forEach((l, idx) => {
    if (/<(div|span|i|p)\s+class="[^"]*(icon|badge|visual|symbol|res|why|stat|thumb|emoji)[^"]*">\s*<\/(div|span|i|p)>/.test(l)) {
      // Exclude intentional decorative dots like badge-dot or badge-pulse if they are styled via CSS
      if (l.includes('badge-dot') || l.includes('badge-pulse')) return;
      console.log(`${rel}:${idx + 1}: ${l.trim()}`);
      count++;
    }
  });
}
console.log(`Total empty elements found: ${count}`);

