import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const files = fs.readdirSync(rootDir)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(rootDir, f));

const blogDir = path.join(rootDir, 'blog');
if (fs.existsSync(blogDir)) {
    files.push(...fs.readdirSync(blogDir).filter(f => f.endsWith('.html')).map(f => path.join(blogDir, f)));
}

let totalMatches = 0;

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const matches = [];

    lines.forEach((line, index) => {
        // Look for stray question marks that aren't genuine English questions:
        // 1. >? < or >?<
        // 2. >?\w or >? \w
        // 3. "? [A-Z]"
        // But exclude legitimate question marks like "Why choose us?", "Need help?", "What is...?"
        const relPath = path.relative(rootDir, file);
        if (/>\s*\?\s*</.test(line) || />\s*\?\s+[A-Za-z]/.test(line) || /["'>]\s*\?\s+[A-Za-z]/.test(line) || /class="[^"]*">\?/.test(line) || /^\s*\?\s+[A-Za-z]/.test(line)) {
            matches.push({ lineNum: index + 1, line: line.trim() });
        }
    });

    if (matches.length > 0) {
        console.log(`\n=== ${path.relative(rootDir, file)} (${matches.length}) ===`);
        for (const m of matches) {
            console.log(`  L${m.lineNum}: ${m.line}`);
        }
        totalMatches += matches.length;
    }
}

console.log(`\nTotal stray question mark matches: ${totalMatches}`);
