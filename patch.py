import os
import re

html_files = [
    'index.html',
    'domain-finder.html',
    'ai-tools.html',
    'prompt-store.html',
    'ai-services.html',
    'learn-free.html',
    'blog.html',
    '404.html'
]

ga4_code = """
    <!-- Google Analytics (GA4) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
"""

# Nav mappings
nav_map = {
    'index.html': '/',
    'domain-finder.html': '/domain-finder',
    'ai-tools.html': '/ai-tools',
    'prompt-store.html': '/prompt-store',
    'ai-services.html': '/ai-services',
    'learn-free.html': '/learn-free',
    'blog.html': '/blog'
}

cwd = r"C:\Users\prem7\.gemini\antigravity\scratch\sanzy_ai_website"

for file in html_files:
    path = os.path.join(cwd, file)
    if not os.path.exists(path):
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Inject GA4 and globals.css into <head>
    if '<link rel="stylesheet" href="./src/globals.css">' not in content:
        content = content.replace('</head>', f'{ga4_code}\n    <link rel="stylesheet" href="./src/globals.css">\n</head>')

    # 2. Inject globals.js into <body> (before chat.js or closing body)
    if '<script src="./src/globals.js" defer></script>' not in content:
        # Check if chat.js is there
        if '<script src="./src/chat.js" defer></script>' in content:
            content = content.replace('<script src="./src/chat.js" defer></script>', '<script src="./src/globals.js" defer></script>\n<script src="./src/chat.js" defer></script>')
        else:
            content = content.replace('</body>', '<script src="./src/globals.js" defer></script>\n</body>')

    # 3. Add loading="lazy" to <img> tags without it
    # We use a regex: find <img ...> and ensure it has loading="lazy"
    def add_lazy(match):
        img_tag = match.group(0)
        if 'loading=' not in img_tag:
            return img_tag.replace('<img ', '<img loading="lazy" ')
        return img_tag

    content = re.sub(r'<img[^>]+>', add_lazy, content)

    # 4. Map navigation links
    for old_link, new_link in nav_map.items():
        # Match href="old_link"
        content = re.sub(rf'href="{old_link}"', f'href="{new_link}"', content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Patch applied.")
