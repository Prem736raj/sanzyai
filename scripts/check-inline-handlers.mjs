import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'coverage', 'test-results']);
const TARGET_EXT = new Set(['.html', '.js']);
const INLINE_HANDLER_RE = /\s(onclick|onchange|oninput|onsubmit|onkeydown)\s*=\s*["']/i;

async function walk(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        await walk(full, out);
      }
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (TARGET_EXT.has(ext)) {
      out.push(full);
    }
  }
  return out;
}

function toRel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join('/');
}

async function main() {
  const files = await walk(ROOT);
  const violations = [];

  for (const file of files) {
    const text = await readFile(file, 'utf8');
    const lines = text.split(/\r?\n/);

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (INLINE_HANDLER_RE.test(line)) {
        violations.push({
          file: toRel(file),
          line: i + 1,
          text: line.trim().slice(0, 180),
        });
      }
    }
  }

  if (violations.length > 0) {
    console.error('Inline handler check failed. Remove inline event attributes to keep CSP compatibility.');
    for (const hit of violations) {
      console.error(`- ${hit.file}:${hit.line} ${hit.text}`);
    }
    process.exit(1);
  }

  console.log('Inline handler check passed.');
}

main().catch((err) => {
  console.error('Inline handler check error:', err);
  process.exit(1);
});
