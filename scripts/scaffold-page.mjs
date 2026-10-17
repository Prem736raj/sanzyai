import { writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const slug = process.argv[2];
const title = process.argv[3] || 'New Page | SanzyAI';
const description = process.argv[4] || 'New page description.';

if (!slug) {
  console.error('Usage: node scripts/scaffold-page.mjs <slug> [title] [description]');
  process.exit(1);
}

const fileName = `${slug}.html`;
const absPath = resolve(process.cwd(), fileName);

if (existsSync(absPath)) {
  console.error(`Page already exists: ${fileName}`);
  process.exit(1);
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="./src/globals.css">
</head>
<body>
  <main style="max-width:900px;margin:40px auto;padding:20px;line-height:1.7;">
    <h1>${title.replace(' | SanzyAI', '')}</h1>
    <p>Replace this content with your page details.</p>
  </main>

  <script type="module" src="./src/globals.js"></script>
  <script type="module" src="./src/chat.js"></script>
</body>
</html>
`;

writeFileSync(absPath, html, 'utf8');
console.log(`Created ${fileName}`);
