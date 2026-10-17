import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'dist/.vite/manifest.json'), 'utf8'));
const baseline = JSON.parse(readFileSync(resolve(root, 'docs/phase2-baseline.json'), 'utf8'));
const budgets = { index: 50_000, 'learn-free': 65_000, 'prompt-store': 85_000, 'ai-tools': 70_000, blog: 55_000 };
const pages = {};
const failures = [];
for (const [page, budget] of Object.entries(budgets)) {
    const files = new Set();
    function visit(key) {
        const chunk = manifest[key];
        if (!chunk || files.has(chunk.file)) return;
        files.add(chunk.file);
        for (const dependency of chunk.imports || []) visit(dependency);
    }
    visit(page + '.html');
    if (!files.size) failures.push(`Missing page entry: ${page}`);
    const blobs = [...files].map(file => readFileSync(resolve(root, 'dist', file)));
    const bytes = blobs.reduce((total, blob) => total + blob.length, 0);
    const gzipBytes = blobs.reduce((total, blob) => total + gzipSync(blob).length, 0);
    const forbidden = [...files].filter(file => /pdf-export|html2canvas|sanitizer|\/chat-(?!loader)/.test(file));
    if (forbidden.length) failures.push(`${page}: heavy optional modules in initial graph: ${forbidden.join(', ')}`);
    if (bytes > budget) failures.push(`${page}: ${bytes} initial JS bytes exceed ${budget}`);
    pages[page] = { initialJsBytes: bytes, initialJsGzipBytes: gzipBytes, budgetBytes: budget,
        baselineJsBytes: baseline.pages[page].initialJsBytes,
        reductionPercent: Number((100 * (1 - bytes / baseline.pages[page].initialJsBytes)).toFixed(1)), files: [...files].sort() };
}
let imageCount = 0;
for (const folder of ['', 'blog']) {
    for (const file of readdirSync(resolve(root, folder)).filter(file => file.endsWith('.html'))) {
        const source = readFileSync(resolve(root, folder, file), 'utf8');
        for (const [tag] of source.matchAll(/<img\b[^>]*>/gi)) {
            imageCount++;
            if (!/\bwidth="[1-9]\d*"/.test(tag) || !/\bheight="[1-9]\d*"/.test(tag)) failures.push(`${folder}/${file}: unsized image`);
            if (!/\bdecoding="async"/.test(tag) || !/\bloading="(?:eager|lazy)"/.test(tag)) failures.push(`${folder}/${file}: missing image loading strategy`);
        }
    }
}
const result = { method: 'Manifest static import graph; dynamic imports excluded. Transfer estimates do not measure real-user Core Web Vitals.',
    pages, staticImagesAudited: imageCount, verdict: failures.length ? 'FAIL' : 'PASS', failures };
writeFileSync(resolve(root, 'docs/phase2-performance.json'), JSON.stringify(result, null, 2) + '\n');
for (const [page, data] of Object.entries(pages)) console.log(`${page}: ${data.initialJsBytes} bytes (${data.reductionPercent}% less than baseline)`);
console.log(`Static image audit: ${imageCount} images`);
console.log(`VERDICT: ${result.verdict}${failures.length ? ' -- ' + failures.join('; ') : ''}`);
if (failures.length) process.exitCode = 1;
