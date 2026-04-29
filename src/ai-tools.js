// =============================================
// DATA — 20 AI TOOLS
// =============================================
const tools = [
    {
        id: 1, name: 'ChatGPT', emoji: '🤖',
        logoBg: 'rgba(16,163,127,0.15)', logoColor: '#10A37F',
        category: 'Writing / Chat', categories: ['writing','chatbot'],
        pricing: 'freemium', priceLabel: 'Free + $20/mo',
        startingPrice: 0,
        rating: 4.9, reviews: '125K',
        desc: 'The world\'s most powerful AI chatbot. Write, code, analyze, research — ChatGPT does it all with unmatched intelligence and versatility.',
        tags: ['Most Popular', 'Versatile'],
        tagStyle: ['popular',''],
        special: 'Most Popular',
        link: 'https://chat.openai.com',
        featured: true,
        features: { freeplan: true, api: true, mobile: true, team: true, offline: false }
    },
    {
        id: 2, name: 'Jasper AI', emoji: '✍️',
        logoBg: 'rgba(108,53,222,0.15)', logoColor: '#6C35DE',
        category: 'Writing', categories: ['writing','marketing'],
        pricing: 'paid', priceLabel: '$39/month',
        startingPrice: 39,
        rating: 4.7, reviews: '18K',
        desc: 'AI content writer built for marketing teams. Generate blog posts, ads, social content and brand copy at 10x speed with consistent brand voice.',
        tags: ['Best for Marketing'],
        tagStyle: [''],
        special: 'Best for Marketing',
        link: 'https://jasper.ai',
        featured: true,
        features: { freeplan: false, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 3, name: 'Copy.ai', emoji: '📝',
        logoBg: 'rgba(0,212,255,0.12)', logoColor: '#00D4FF',
        category: 'Writing', categories: ['writing','marketing'],
        pricing: 'freemium', priceLabel: 'Free + $49/mo',
        startingPrice: 0,
        rating: 4.6, reviews: '22K',
        desc: 'AI copywriting tool that writes high-converting marketing copy in seconds. From emails to landing pages — Copy.ai has 90+ templates ready.',
        tags: ['Free Plan', 'Easy to Use'],
        tagStyle: ['free-tag',''],
        special: 'Free Plan',
        link: 'https://copy.ai',
        featured: false,
        features: { freeplan: true, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 4, name: 'Midjourney', emoji: '🎨',
        logoBg: 'rgba(255,140,0,0.12)', logoColor: '#FF8C00',
        category: 'Image Generation', categories: ['image'],
        pricing: 'paid', priceLabel: '$10/month',
        startingPrice: 10,
        rating: 4.9, reviews: '85K',
        desc: 'The gold standard of AI image generation. Create breathtaking, photorealistic and artistic images with simple text prompts. Unmatched quality.',
        tags: ['Best Quality', '🔥 Trending'],
        tagStyle: ['','hot'],
        special: 'Best Quality',
        link: 'https://midjourney.com',
        featured: true,
        features: { freeplan: false, api: false, mobile: false, team: true, offline: false }
    },
    {
        id: 5, name: 'DALL-E 3', emoji: '🖼️',
        logoBg: 'rgba(16,163,127,0.12)', logoColor: '#10A37F',
        category: 'Image Generation', categories: ['image'],
        pricing: 'freemium', priceLabel: 'Free w/ ChatGPT+',
        startingPrice: 0,
        rating: 4.7, reviews: '42K',
        desc: 'OpenAI\'s powerful image generator now integrated directly into ChatGPT. Create detailed, accurate images from text descriptions with ease.',
        tags: ['Free with ChatGPT'],
        tagStyle: ['free-tag'],
        special: 'Free with ChatGPT',
        link: 'https://openai.com/dall-e-3',
        featured: false,
        features: { freeplan: true, api: true, mobile: true, team: false, offline: false }
    },
    {
        id: 6, name: 'Stable Diffusion', emoji: '🌊',
        logoBg: 'rgba(0,200,81,0.12)', logoColor: '#00C851',
        category: 'Image Generation', categories: ['image'],
        pricing: 'free', priceLabel: 'Free (Open Source)',
        startingPrice: 0,
        rating: 4.5, reviews: '35K',
        desc: 'Open-source AI image generation that runs locally on your machine. 100% free, unlimited generations, and full privacy — the developer\'s choice.',
        tags: ['100% Free', 'Open Source'],
        tagStyle: ['free-tag',''],
        special: '100% Free',
        link: 'https://stability.ai',
        featured: false,
        features: { freeplan: true, api: true, mobile: false, team: false, offline: true }
    },
    {
        id: 7, name: 'Canva AI', emoji: '🖌️',
        logoBg: 'rgba(0,196,214,0.12)', logoColor: '#00C4D6',
        category: 'Design', categories: ['design','image'],
        pricing: 'freemium', priceLabel: 'Free + $12.99/mo',
        startingPrice: 0,
        rating: 4.8, reviews: '98K',
        desc: 'Design anything with AI superpowers. Magic Write, Text-to-Image, Background Remover and more — all inside Canva\'s intuitive drag-and-drop editor.',
        tags: ['Best for Beginners', 'All-in-One'],
        tagStyle: ['',''],
        special: 'Best for Beginners',
        link: 'https://canva.com',
        featured: true,
        features: { freeplan: true, api: false, mobile: true, team: true, offline: false }
    },
    {
        id: 8, name: 'Runway ML', emoji: '🎬',
        logoBg: 'rgba(255,68,68,0.12)', logoColor: '#FF4444',
        category: 'Video', categories: ['video'],
        pricing: 'paid', priceLabel: '$15/month',
        startingPrice: 15,
        rating: 4.7, reviews: '12K',
        desc: 'Next-generation AI video generation and editing. Generate videos from text, remove backgrounds, add effects — the future of creative video production.',
        tags: ['🔥 Trending', 'Gen-2 AI'],
        tagStyle: ['hot',''],
        special: 'Trending',
        link: 'https://runwayml.com',
        featured: false,
        features: { freeplan: false, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 9, name: 'Synthesia', emoji: '👤',
        logoBg: 'rgba(108,53,222,0.15)', logoColor: '#8B5CF6',
        category: 'Video', categories: ['video','business'],
        pricing: 'paid', priceLabel: '$22/month',
        startingPrice: 22,
        rating: 4.6, reviews: '9K',
        desc: 'Create professional AI avatar videos in 120+ languages without cameras or crews. Perfect for corporate training, marketing and explainer videos.',
        tags: ['Best for Business', '120+ Languages'],
        tagStyle: ['',''],
        special: 'Best for Business',
        link: 'https://synthesia.io',
        featured: false,
        features: { freeplan: false, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 10, name: 'Pictory', emoji: '🎥',
        logoBg: 'rgba(255,107,53,0.12)', logoColor: '#FF6B35',
        category: 'Video', categories: ['video','marketing'],
        pricing: 'paid', priceLabel: '$19/month',
        startingPrice: 19,
        rating: 4.5, reviews: '7K',
        desc: 'Turn any text, script or blog post into engaging videos automatically. Add AI voiceovers, stock footage and captions — no editing skills needed.',
        tags: ['Easy to Use', 'Text-to-Video'],
        tagStyle: ['',''],
        special: 'Easy to Use',
        link: 'https://pictory.ai',
        featured: false,
        features: { freeplan: false, api: false, mobile: false, team: false, offline: false }
    },
    {
        id: 11, name: 'GitHub Copilot', emoji: '💻',
        logoBg: 'rgba(30,30,30,0.8)', logoColor: '#ffffff',
        category: 'Code', categories: ['code'],
        pricing: 'paid', priceLabel: '$10/month',
        startingPrice: 10,
        rating: 4.8, reviews: '55K',
        desc: 'Your AI pair programmer. GitHub Copilot suggests entire functions, writes tests, and explains code in real-time directly inside your editor.',
        tags: ['Best for Developers', 'GitHub Native'],
        tagStyle: ['popular',''],
        special: 'Best for Developers',
        link: 'https://github.com/features/copilot',
        featured: true,
        features: { freeplan: false, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 12, name: 'Cursor AI', emoji: '⚡',
        logoBg: 'rgba(0,212,255,0.12)', logoColor: '#00D4FF',
        category: 'Code', categories: ['code'],
        pricing: 'freemium', priceLabel: 'Free + $20/mo',
        startingPrice: 0,
        rating: 4.7, reviews: '14K',
        desc: 'The AI-first code editor that actually understands your entire codebase. Chat with your code, fix bugs instantly, and generate features end-to-end.',
        tags: ['🆕 New & Hot', 'VS Code Based'],
        tagStyle: ['hot',''],
        special: 'New & Hot',
        link: 'https://cursor.sh',
        featured: false,
        features: { freeplan: true, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 13, name: 'Surfer SEO', emoji: '📈',
        logoBg: 'rgba(0,200,81,0.12)', logoColor: '#00C851',
        category: 'SEO', categories: ['seo'],
        pricing: 'paid', priceLabel: '$69/month',
        startingPrice: 69,
        rating: 4.7, reviews: '16K',
        desc: 'Data-driven AI SEO tool that analyzes top-ranking pages and tells you exactly what to write. Boost rankings with AI content optimization.',
        tags: ['Best SEO AI', 'Data-Driven'],
        tagStyle: ['',''],
        special: 'Best SEO AI',
        link: 'https://surferseo.com',
        featured: false,
        features: { freeplan: false, api: false, mobile: false, team: true, offline: false }
    },
    {
        id: 14, name: 'Semrush AI', emoji: '🔍',
        logoBg: 'rgba(255,106,0,0.12)', logoColor: '#FF6A00',
        category: 'SEO / Marketing', categories: ['seo','marketing'],
        pricing: 'paid', priceLabel: '$129/month',
        startingPrice: 129,
        rating: 4.8, reviews: '31K',
        desc: 'All-in-one AI marketing suite with SEO, PPC, content marketing, competitor analysis and social media tools trusted by 10M+ marketers worldwide.',
        tags: ['Enterprise', 'All-in-One'],
        tagStyle: ['',''],
        special: 'Enterprise',
        link: 'https://semrush.com',
        featured: false,
        features: { freeplan: false, api: true, mobile: true, team: true, offline: false }
    },
    {
        id: 15, name: 'ElevenLabs', emoji: '🎙️',
        logoBg: 'rgba(255,184,0,0.12)', logoColor: '#FFB800',
        category: 'Voice', categories: ['voice'],
        pricing: 'freemium', priceLabel: 'Free + $5/mo',
        startingPrice: 0,
        rating: 4.9, reviews: '28K',
        desc: 'The most realistic AI voice generator on the market. Clone any voice, generate ultra-natural speech in 29 languages, and create custom AI voices.',
        tags: ['Best Voice AI', 'Voice Cloning'],
        tagStyle: ['popular',''],
        special: 'Best Voice AI',
        link: 'https://elevenlabs.io',
        featured: true,
        features: { freeplan: true, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 16, name: 'Murf AI', emoji: '🎤',
        logoBg: 'rgba(108,53,222,0.15)', logoColor: '#6C35DE',
        category: 'Voice', categories: ['voice'],
        pricing: 'freemium', priceLabel: 'Free + $19/mo',
        startingPrice: 0,
        rating: 4.6, reviews: '11K',
        desc: 'Studio-quality AI voiceovers in minutes. Choose from 120+ voices in 20+ languages — perfect for videos, podcasts, presentations and e-learning.',
        tags: ['Free Plan', '120+ Voices'],
        tagStyle: ['free-tag',''],
        special: 'Free Plan',
        link: 'https://murf.ai',
        featured: false,
        features: { freeplan: true, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 17, name: 'Notion AI', emoji: '📒',
        logoBg: 'rgba(255,255,255,0.06)', logoColor: '#ffffff',
        category: 'Productivity', categories: ['productivity','business'],
        pricing: 'paid', priceLabel: '$10/mo add-on',
        startingPrice: 10,
        rating: 4.7, reviews: '44K',
        desc: 'AI writing and thinking partner built into Notion. Draft docs, summarize notes, create action items, translate content — all within your workspace.',
        tags: ['Best Productivity', 'Workspace AI'],
        tagStyle: ['popular',''],
        special: 'Best Productivity',
        link: 'https://notion.so/product/ai',
        featured: false,
        features: { freeplan: false, api: false, mobile: true, team: true, offline: false }
    },
    {
        id: 18, name: 'Zapier AI', emoji: '⚙️',
        logoBg: 'rgba(255,74,23,0.12)', logoColor: '#FF4A17',
        category: 'Automation', categories: ['automation','business','productivity'],
        pricing: 'freemium', priceLabel: 'Free + $19.99/mo',
        startingPrice: 0,
        rating: 4.6, reviews: '38K',
        desc: 'Connect and automate 6,000+ apps with AI. Create intelligent workflows with natural language — no coding needed. The king of no-code automation.',
        tags: ['Best Automation', '6000+ Apps'],
        tagStyle: ['',''],
        special: 'Best Automation',
        link: 'https://zapier.com',
        featured: false,
        features: { freeplan: true, api: true, mobile: true, team: true, offline: false }
    },
    {
        id: 19, name: 'Perplexity AI', emoji: '🔬',
        logoBg: 'rgba(0,212,255,0.12)', logoColor: '#00D4FF',
        category: 'Research', categories: ['research'],
        pricing: 'freemium', priceLabel: 'Free + $20/mo',
        startingPrice: 0,
        rating: 4.8, reviews: '19K',
        desc: 'AI-powered answer engine that searches the web in real-time. Get cited, up-to-date answers with sources — the smarter alternative to Google Search.',
        tags: ['Best Research AI', 'Real-time Web'],
        tagStyle: ['popular',''],
        special: 'Best Research AI',
        link: 'https://perplexity.ai',
        featured: true,
        features: { freeplan: true, api: true, mobile: true, team: false, offline: false }
    },
    {
        id: 20, name: 'Consensus AI', emoji: '📚',
        logoBg: 'rgba(0,200,81,0.12)', logoColor: '#00C851',
        category: 'Research', categories: ['research','education'],
        pricing: 'freemium', priceLabel: 'Free + $9.99/mo',
        startingPrice: 0,
        rating: 4.5, reviews: '6K',
        desc: 'Search engine for scientific research powered by AI. Find evidence-based answers from 200M+ peer-reviewed papers — perfect for academics and researchers.',
        tags: ['Academic Research', 'Peer-Reviewed'],
        tagStyle: ['',''],
        special: 'Academic Research',
        link: 'https://consensus.app',
        featured: false,
        features: { freeplan: true, api: false, mobile: false, team: false, offline: false }
    }
];


// =============================================
// STATE
// =============================================
let activeFilter = 'all';
let searchQuery = '';
let currentSort = 'rating';
let savedTools = new Set();
let compareList = [];
let filteredTools = [...tools];

function sanitizeExternalUrl(url = '') {
    try {
        const parsed = new URL(String(url || '').trim());
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';
        return parsed.href;
    } catch {
        return '';
    }
}

// =============================================
// RENDER TOOLS
// =============================================
function renderTools() {
    const featuredGrid = document.getElementById('featuredToolsGrid');
    const allGrid = document.getElementById('toolsGrid');
    if (!featuredGrid || !allGrid) return;

    featuredGrid.textContent = '';
    allGrid.textContent = '';

    if (filteredTools.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'no-results';
        empty.style.gridColumn = '1/-1';

        const icon = document.createElement('div');
        icon.className = 'no-results-icon';
        icon.textContent = '🔍';

        const title = document.createElement('h3');
        title.textContent = 'No tools found';

        const msg = document.createElement('p');
        msg.textContent = 'Try a different search term or filter category.';

        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.style.marginTop = '16px';
        btn.dataset.action = 'reset-filters';
        btn.textContent = 'Show All Tools';

        empty.appendChild(icon);
        empty.appendChild(title);
        empty.appendChild(msg);
        empty.appendChild(btn);
        allGrid.appendChild(empty);

        document.getElementById('toolCount').textContent = '0 tools found';
        return;
    }

    document.getElementById('toolCount').textContent = `Showing ${filteredTools.length} tool${filteredTools.length !== 1 ? 's' : ''}`;

    filteredTools.forEach((tool) => {
        const isCompared = compareList.find((t) => t.id === tool.id);
        const isSaved = savedTools.has(tool.id);

        const card = document.createElement('div');
        card.className = `tool-card ${tool.featured ? 'featured' : ''}`.trim();
        card.dataset.id = String(tool.id);
        card.dataset.action = 'open-tool';
        card.dataset.toolId = String(tool.id);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        const cardTop = document.createElement('div');
        cardTop.className = 'card-top';
        const cardLeft = document.createElement('div');
        cardLeft.className = 'card-left';
        const logo = document.createElement('div');
        logo.className = 'tool-logo';
        logo.style.background = tool.logoBg;
        logo.style.color = tool.logoColor;
        logo.textContent = tool.emoji;
        const nameWrap = document.createElement('div');
        nameWrap.className = 'tool-name-wrap';
        const name = document.createElement('span');
        name.className = 'tool-name';
        name.textContent = tool.name;
        const cat = document.createElement('span');
        cat.className = 'tool-cat';
        cat.textContent = tool.category;
        nameWrap.appendChild(name);
        nameWrap.appendChild(cat);
        cardLeft.appendChild(logo);
        cardLeft.appendChild(nameWrap);

        const actionsTop = document.createElement('div');
        actionsTop.className = 'card-actions-top';
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.type = 'button';
        bookmarkBtn.className = `bookmark-btn ${isSaved ? 'saved' : ''}`.trim();
        bookmarkBtn.dataset.action = 'toggle-save';
        bookmarkBtn.dataset.toolId = String(tool.id);
        bookmarkBtn.title = isSaved ? 'Remove from saved' : 'Save tool';
        bookmarkBtn.textContent = isSaved ? '❤️' : '🤍';
        actionsTop.appendChild(bookmarkBtn);

        cardTop.appendChild(cardLeft);
        cardTop.appendChild(actionsTop);
        card.appendChild(cardTop);

        const badges = document.createElement('div');
        badges.className = 'card-badges';
        const price = document.createElement('span');
        if (tool.pricing === 'free') {
            price.className = 'price-badge price-free';
            price.textContent = `🆓 ${tool.priceLabel}`;
        } else if (tool.pricing === 'freemium') {
            price.className = 'price-badge price-freemium';
            price.textContent = `✨ ${tool.priceLabel}`;
        } else {
            price.className = 'price-badge price-paid';
            price.textContent = `💳 ${tool.priceLabel}`;
        }
        badges.appendChild(price);
        tool.tags.forEach((tag, i) => {
            const tagEl = document.createElement('span');
            tagEl.className = `tag-badge ${tool.tagStyle[i] || ''}`.trim();
            tagEl.textContent = tag;
            badges.appendChild(tagEl);
        });
        card.appendChild(badges);

        const ratingRow = document.createElement('div');
        ratingRow.className = 'card-rating';
        const stars = document.createElement('div');
        stars.className = 'stars-row';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            if (i <= Math.floor(tool.rating)) star.className = 'star';
            else if (i - 0.5 <= tool.rating) star.className = 'star half';
            else star.className = 'star empty';
            star.textContent = '★';
            stars.appendChild(star);
        }
        const ratingVal = document.createElement('span');
        ratingVal.className = 'rating-val';
        ratingVal.textContent = String(tool.rating);
        ratingRow.appendChild(stars);
        ratingRow.appendChild(ratingVal);
        card.appendChild(ratingRow);

        const desc = document.createElement('p');
        desc.className = 'tool-desc';
        desc.textContent = tool.desc;
        card.appendChild(desc);

        const toolPrice = document.createElement('div');
        toolPrice.className = 'tool-price';
        toolPrice.appendChild(document.createTextNode('💰 Starting at: '));
        const strong = document.createElement('strong');
        strong.textContent = tool.priceLabel;
        toolPrice.appendChild(strong);
        card.appendChild(toolPrice);

        const btns = document.createElement('div');
        btns.className = 'card-btns';
        const visit = document.createElement('a');
        visit.className = 'visit-btn';
        visit.dataset.action = 'visit-tool';
        visit.dataset.toolName = tool.name;
        visit.target = '_blank';
        visit.rel = 'noopener sponsored';
        visit.href = sanitizeExternalUrl(tool.link) || '#';
        visit.textContent = '🔗 Visit Tool';
        const compareBtn = document.createElement('button');
        compareBtn.className = 'review-btn';
        compareBtn.type = 'button';
        compareBtn.dataset.action = 'quick-compare';
        compareBtn.dataset.toolId = String(tool.id);
        compareBtn.textContent = '⚖️ Compare';
        btns.appendChild(visit);
        btns.appendChild(compareBtn);
        card.appendChild(btns);

        const compareWrap = document.createElement('div');
        compareWrap.className = 'compare-wrap';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'compare-cb';
        cb.id = `cmp-${tool.id}`;
        cb.dataset.action = 'toggle-compare';
        cb.dataset.toolId = String(tool.id);
        cb.checked = Boolean(isCompared);
        const label = document.createElement('label');
        label.className = 'compare-label';
        label.setAttribute('for', `cmp-${tool.id}`);
        label.textContent = `⚖️ Add to Compare ${isCompared ? '(selected)' : ''}`;
        compareWrap.appendChild(cb);
        compareWrap.appendChild(label);
        card.appendChild(compareWrap);

        if (tool.featured) {
            featuredGrid.appendChild(card);
        } else {
            allGrid.appendChild(card);
        }
    });
    
    // Hide featured section entirely if no featured tools match current filters
    const featuredSection = featuredGrid.previousElementSibling;
    if (featuredGrid.children.length === 0) {
        featuredGrid.style.display = 'none';
        if (featuredSection) featuredSection.style.display = 'none';
    } else {
        featuredGrid.style.display = 'grid';
        if (featuredSection) featuredSection.style.display = 'flex';
    }
}


function renderToolDeepDescription(tool) {
    const categoryText = tool.category.toLowerCase();
    return [
        `${tool.name} is one of the strongest options in ${categoryText} right now, especially if you want dependable output quality and a fast onboarding path without heavy setup overhead.`,
        `Teams usually adopt ${tool.name} for three reasons: it shortens production time, gives more predictable output quality than manual workflows, and scales from solo users to production teams with fewer process bottlenecks.`,
        `If your goal is to ship faster while keeping quality high, this tool is a practical pick because it balances usability, feature depth, and clear day-to-day value.`
    ];
}

function renderFeaturePills(tool) {
    const flags = [
        { key: 'freeplan', label: 'Free Plan' },
        { key: 'api', label: 'API Access' },
        { key: 'mobile', label: 'Mobile App' },
        { key: 'team', label: 'Team Workspace' },
        { key: 'offline', label: 'Offline Mode' }
    ];

    return flags
        .filter((item) => tool.features[item.key])
        .map((item) => item.label);
}

window.openToolDetails = function(id) {
    const tool = tools.find((t) => t.id === id);
    const modal = document.getElementById('toolDetailModal');
    const content = document.getElementById('toolDetailBody');
    if (!tool || !modal || !content) return;

    const description = renderToolDeepDescription(tool);

    content.textContent = '';

    const hero = document.createElement('div');
    hero.className = 'tool-detail-hero';
    const logo = document.createElement('div');
    logo.className = 'tool-detail-logo';
    logo.style.background = tool.logoBg;
    logo.style.color = tool.logoColor;
    logo.textContent = tool.emoji;
    const heroRight = document.createElement('div');
    const title = document.createElement('h3');
    title.className = 'tool-detail-title';
    title.textContent = tool.name;
    const sub = document.createElement('p');
    sub.className = 'tool-detail-sub';
    sub.textContent = `${tool.category} • ${tool.priceLabel} • Rated ${tool.rating}/5`;
    heroRight.appendChild(title);
    heroRight.appendChild(sub);
    hero.appendChild(logo);
    hero.appendChild(heroRight);
    content.appendChild(hero);

    const pills = document.createElement('div');
    pills.className = 'tool-detail-pills';
    renderFeaturePills(tool).forEach((label) => {
        const pill = document.createElement('span');
        pill.className = 'tool-detail-pill';
        pill.textContent = label;
        pills.appendChild(pill);
    });
    content.appendChild(pills);

    const body = document.createElement('div');
    body.className = 'tool-detail-content';
    [description[0], description[1], description[2], tool.desc].forEach((paragraph) => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        body.appendChild(p);
    });
    content.appendChild(body);

    const actions = document.createElement('div');
    actions.className = 'tool-detail-actions';
    const visit = document.createElement('a');
    visit.className = 'btn btn-primary';
    visit.dataset.action = 'modal-visit';
    visit.dataset.toolName = tool.name;
    visit.target = '_blank';
    visit.rel = 'noopener sponsored';
    visit.href = sanitizeExternalUrl(tool.link) || '#';
    visit.textContent = `🔗 Visit ${tool.name}`;
    const compare = document.createElement('button');
    compare.type = 'button';
    compare.className = 'btn btn-outline';
    compare.dataset.action = 'modal-compare';
    compare.dataset.toolId = String(tool.id);
    compare.textContent = '⚖️ Add To Compare';
    actions.appendChild(visit);
    actions.appendChild(compare);
    content.appendChild(actions);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

window.closeToolDetails = function() {
    const modal = document.getElementById('toolDetailModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// =============================================
// PRICE BADGE
// =============================================
function getPriceBadge(pricing, label) {
    if (pricing === 'free') return `<span class="price-badge price-free">🆓 ${label}</span>`;
    if (pricing === 'freemium') return `<span class="price-badge price-freemium">✨ ${label}</span>`;
    return `<span class="price-badge price-paid">💳 ${label}</span>`;
}

// =============================================
// STARS
// =============================================
function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) html += `<span class="star">★</span>`;
        else if (i - 0.5 <= rating) html += `<span class="star half">★</span>`;
        else html += `<span class="star empty">★</span>`;
    }
    return html;
}

// =============================================
// FILTER
// =============================================
window.applyFilter = function(btn, filter) {
    activeFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    applyFiltersAndSearch();
}

function applyFiltersAndSearch() {
    filteredTools = tools.filter(tool => {
        const matchFilter = activeFilter === 'all' 
            || tool.pricing === activeFilter 
            || tool.categories.includes(activeFilter);
        const matchSearch = !searchQuery 
            || tool.name.toLowerCase().includes(searchQuery)
            || tool.desc.toLowerCase().includes(searchQuery)
            || tool.category.toLowerCase().includes(searchQuery)
            || tool.tags.some(t => t.toLowerCase().includes(searchQuery));
        return matchFilter && matchSearch;
    });
    sortToolsData();
    renderTools();
}

// =============================================
// SEARCH
// =============================================
window.handleSearch = function(val) {
    searchQuery = val.toLowerCase().trim();
    const clearBtn = document.getElementById('searchClear');
    if (clearBtn) clearBtn.classList.toggle('visible', val.length > 0);
    applyFiltersAndSearch();
}

window.clearSearch = function() {
    const input = document.getElementById('toolSearch');
    if (input) input.value = '';
    const clearBtn = document.getElementById('searchClear');
    if (clearBtn) clearBtn.classList.remove('visible');
    searchQuery = '';
    applyFiltersAndSearch();
}

// =============================================
// SORT
// =============================================
window.sortTools = function() {
    const sel = document.getElementById('sortTools');
    if (sel) currentSort = sel.value;
    sortToolsData();
    renderTools();
}

function sortToolsData() {
    filteredTools.sort((a, b) => {
        switch(currentSort) {
            case 'rating': return b.rating - a.rating;
            case 'name': return a.name.localeCompare(b.name);
            case 'price-low': return a.startingPrice - b.startingPrice;
            case 'price-high': return b.startingPrice - a.startingPrice;
            case 'newest': return b.id - a.id;
            default: return b.rating - a.rating;
        }
    });
}

// =============================================
// SAVE / BOOKMARK
// =============================================
window.toggleSave = function(id, btn) {
    if (savedTools.has(id)) {
        savedTools.delete(id);
        if (btn) {
            btn.textContent = '🤍';
            btn.classList.remove('saved');
        }
        showToast('Removed from saved', '💔');
    } else {
        savedTools.add(id);
        if (btn) {
            btn.textContent = '❤️';
            btn.classList.add('saved');
        }
        showToast('Tool saved! ❤️', '✅');
    }
}

// Persist saved tools to localStorage so favorites survive reloads
function persistSavedTools() {
    try {
        localStorage.setItem('sanzy_saved_tools', JSON.stringify(Array.from(savedTools)));
    } catch (e) {
        console.warn('Could not persist saved tools', e);
    }
}

// Wrap toggleSave to persist after changes
const _origToggleSave = window.toggleSave;
window.toggleSave = function(id, btn) {
    _origToggleSave(id, btn);
    persistSavedTools();
}

// =============================================
// COMPARE
// =============================================
window.toggleCompare = function(id, cb) {
    const tool = tools.find(t => t.id === id);
    if (cb.checked) {
        if (compareList.length >= 3) {
            cb.checked = false;
            showToast('Maximum 3 tools for comparison', '⚠️');
            return;
        }
        compareList.push(tool);
    } else {
        compareList = compareList.filter(t => t.id !== id);
    }
    updateCompareBar();
}

function updateCompareBar() {
    const bar = document.getElementById('compareBar');
    const chips = document.getElementById('compareChips');
    const info = document.getElementById('compareInfo');
    const btn = document.getElementById('compareBtn');

    if (!bar) return;

    if (compareList.length === 0) {
        bar.classList.remove('show');
        return;
    }

    bar.classList.add('show');
    if (info) info.textContent = `${compareList.length}/3 tools selected`;
    if (btn) btn.disabled = compareList.length < 2;

    if (chips) {
        chips.innerHTML = compareList.map(t => `
            <div class="compare-chip">
                <span>${t.emoji}</span>
                <span>${t.name}</span>
                <button type="button" class="compare-chip-remove" data-action="remove-compare" data-tool-id="${t.id}">✕</button>
            </div>
        `).join('');
    }
}

window.removeFromCompare = function(id) {
    compareList = compareList.filter(t => t.id !== id);
    const cb = document.getElementById(`cmp-${id}`);
    if (cb) cb.checked = false;
    updateCompareBar();
    if (compareList.length < 2) {
        const sec = document.getElementById('compareSection');
        if (sec) sec.style.display = 'none';
    }
}

window.clearCompare = function() {
    compareList.forEach(t => {
        const cb = document.getElementById(`cmp-${t.id}`);
        if (cb) cb.checked = false;
    });
    compareList = [];
    updateCompareBar();
    const bar = document.getElementById('compareBar');
    if (bar) bar.classList.remove('show');
    const sec = document.getElementById('compareSection');
    if (sec) sec.style.display = 'none';
}

window.openCompare = function() {
    if (compareList.length < 2) {
        showToast('Select at least 2 tools to compare', '⚠️');
        return;
    }
    buildCompareTable();
    const section = document.getElementById('compareSection');
    if (section) {
        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

window.quickCompare = function(id) {
    const cb = document.getElementById(`cmp-${id}`);
    if (!cb) return;
    if (!cb.checked) {
        cb.checked = true;
        window.toggleCompare(id, cb);
    }
    showToast('Added to compare', '⚖️');
}

window.closeCompare = function() {
    const sec = document.getElementById('compareSection');
    if (sec) sec.style.display = 'none';
}

function buildCompareTable() {
    const features = [
        { key: 'name', label: '🤖 Tool Name' },
        { key: 'category', label: '📁 Category' },
        { key: 'pricing', label: '💰 Pricing Model' },
        { key: 'priceLabel', label: '💵 Starting Price' },
        { key: 'rating', label: '⭐ Rating' },
        { key: 'freeplan', label: '🆓 Free Plan' },
        { key: 'api', label: '🔌 API Access' },
        { key: 'mobile', label: '📱 Mobile App' },
        { key: 'team', label: '👥 Team Plan' },
        { key: 'offline', label: '📴 Offline Use' },
    ];

    const table = document.getElementById('compareTable');
    if (!table) return;

    const colWidth = Math.floor(80 / compareList.length);

    table.innerHTML = `
        <thead>
            <tr>
                <th style="width:20%;">Feature</th>
                ${compareList.map(t => `<th style="width:${colWidth}%;">${t.emoji} ${t.name}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            ${features.map(f => `
                <tr>
                    <td class="compare-feature">${f.label}</td>
                    ${compareList.map(t => {
                        let val;
                        if (f.key === 'name') val = t.name;
                        else if (f.key === 'category') val = t.category;
                        else if (f.key === 'pricing') val = getPriceBadge(t.pricing, t.pricing);
                        else if (f.key === 'priceLabel') val = `<strong>${t.priceLabel}</strong>`;
                        else if (f.key === 'rating') val = `<span style="color:var(--yellow);font-weight:700;">${t.rating}/5 ⭐</span>`;
                        else {
                            const boolVal = t.features[f.key];
                            val = boolVal 
                                ? `<span class="check-yes">✅</span>` 
                                : `<span class="check-no">❌</span>`;
                        }
                        return `<td>${val}</td>`;
                    }).join('')}
                </tr>
            `).join('')}
            <tr>
                <td class="compare-feature">🔗 Visit Tool</td>
                ${compareList.map(t => `
                    <td>
                        <a href="${t.link}" target="_blank" rel="noopener" class="btn btn-primary btn-xs"
                           data-action="visit-external" data-tool-name="${t.name}">
                            Visit ↗
                        </a>
                    </td>
                `).join('')}
            </tr>
        </tbody>`;
}

// =============================================
// NEWSLETTER
// =============================================
window.handleNL = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const input = e.target.querySelector('input');
    if (btn) {
        btn.textContent = '✅ Subscribed!';
        btn.style.background = 'linear-gradient(135deg,#00C851,#00A844)';
    }
    if (input) {
        input.value = '';
        input.disabled = true;
    }
    showToast('Welcome to SanzyAI Newsletter! 🎉','📬');
    setTimeout(() => {
        if (btn) {
            btn.textContent = 'Subscribe 🚀';
            btn.style.background = '';
        }
        if (input) input.disabled = false;
    }, 3500);
}

// =============================================
// SUBMIT FORM
// =============================================
window.handleSubmit = function(e) {
    e.preventDefault();
    showToast('Tool submitted! We\'ll review it within 48 hours. 🚀','✅');
    e.target.reset();
}

// =============================================
// TOAST
// =============================================
let toastTimer;
window.showToast = function(msg, icon = '✅') {
    clearTimeout(toastTimer);
    const toast = document.getElementById('toast');
    const tMsg = document.getElementById('toastMsg');
    const tIcon = document.getElementById('toastIcon');
    
    if (tMsg) tMsg.textContent = msg;
    if (tIcon) tIcon.textContent = icon;
    if (toast) {
        toast.classList.add('show');
        toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

// =============================================
// FILTER COUNTS
// =============================================
function updateFilterCounts() {
    const fall = document.getElementById('fc-all');
    const ffree = document.getElementById('fc-free');
    const ffreemium = document.getElementById('fc-freemium');
    const fpaid = document.getElementById('fc-paid');

    if (fall) fall.textContent = tools.length;
    if (ffree) ffree.textContent = tools.filter(t => t.pricing === 'free').length;
    if (ffreemium) ffreemium.textContent = tools.filter(t => t.pricing === 'freemium').length;
    if (fpaid) fpaid.textContent = tools.filter(t => t.pricing === 'paid').length;
}

function bindStaticControls() {
    const searchInput = document.getElementById('toolSearch');
    const searchClear = document.getElementById('searchClear');
    const filterScroll = document.getElementById('filterScroll');
    const sortSelect = document.getElementById('sortTools');
    const clearCompareBtn = document.getElementById('clearCompareBtn');
    const compareBtn = document.getElementById('compareBtn');
    const closeCompareBtn = document.getElementById('closeCompareBtn');
    const nlForm = document.getElementById('nlForm');
    const submitToolForm = document.getElementById('submitToolForm');
    const toolDetailClose = document.getElementById('toolDetailClose');

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            window.handleSearch(event.target.value);
        });
    }

    if (searchClear) {
        searchClear.addEventListener('click', () => {
            window.clearSearch();
        });
    }

    if (filterScroll) {
        filterScroll.addEventListener('click', (event) => {
            const btn = event.target.closest('.filter-btn');
            if (!btn) return;
            const { filter } = btn.dataset;
            if (filter) {
                window.applyFilter(btn, filter);
            }
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            window.sortTools();
        });
    }

    if (clearCompareBtn) {
        clearCompareBtn.addEventListener('click', () => {
            window.clearCompare();
        });
    }

    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            window.openCompare();
        });
    }

    if (closeCompareBtn) {
        closeCompareBtn.addEventListener('click', () => {
            window.closeCompare();
        });
    }

    if (nlForm) {
        nlForm.addEventListener('submit', (event) => {
            window.handleNL(event);
        });
    }

    if (submitToolForm) {
        submitToolForm.addEventListener('submit', (event) => {
            window.handleSubmit(event);
        });
    }

    if (toolDetailClose) {
        toolDetailClose.addEventListener('click', () => {
            window.closeToolDetails();
        });
    }
}

function bindDynamicControls() {
    document.addEventListener('click', (event) => {
        const actionEl = event.target.closest('[data-action]');
        if (!actionEl) return;

        const { action, toolId, toolName } = actionEl.dataset;

        if (action !== 'open-tool') {
            event.stopPropagation();
        }

        switch (action) {
            case 'reset-filters': {
                window.clearSearch();
                const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
                window.applyFilter(allBtn, 'all');
                break;
            }
            case 'open-tool': {
                if (event.target.closest('a,button,input,label,select,textarea')) return;
                if (toolId) {
                    window.openToolDetails(Number(toolId));
                }
                break;
            }
            case 'toggle-save': {
                if (toolId) {
                    window.toggleSave(Number(toolId), actionEl);
                }
                break;
            }
            case 'visit-tool':
            case 'visit-external':
            case 'modal-visit': {
                if (toolName) {
                    window.showToast(`Opening ${toolName}...`, '🌐');
                }
                break;
            }
            case 'quick-compare': {
                if (toolId) {
                    window.quickCompare(Number(toolId));
                }
                break;
            }
            case 'modal-compare': {
                if (!toolId) return;
                window.closeToolDetails();
                window.quickCompare(Number(toolId));
                break;
            }
            case 'remove-compare': {
                if (toolId) {
                    window.removeFromCompare(Number(toolId));
                }
                break;
            }
            default:
                break;
        }
    });

    document.addEventListener('change', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) return;
        if (target.dataset.action !== 'toggle-compare') return;
        const toolId = Number(target.dataset.toolId || '0');
        if (!toolId) return;
        window.toggleCompare(toolId, target);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const card = event.target.closest('.tool-card[data-action="open-tool"]');
        if (!card) return;
        if (event.target !== card) return;
        event.preventDefault();
        const toolId = Number(card.dataset.toolId || '0');
        if (toolId) {
            window.openToolDetails(toolId);
        }
    });
}

// =============================================
// INIT
// =============================================
window.addEventListener('DOMContentLoaded', () => {
    // Load saved tools from localStorage
    try {
        const saved = localStorage.getItem('sanzy_saved_tools');
        if (saved) savedTools = new Set(JSON.parse(saved));
    } catch (e) { /* ignore */ }

    updateFilterCounts();
    sortToolsData();
    renderTools();
    bindStaticControls();
    bindDynamicControls();

    // Hamburger
    const ham = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileMenu');
    if (ham && mobileNav) {
        ham.addEventListener('click', () => {
            ham.classList.toggle('active');
            mobileNav.classList.toggle('open');
        });
        mobileNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => { 
                ham.classList.remove('active'); 
                mobileNav.classList.remove('open'); 
            });
        });
    }

    // Scroll Top
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('vis', window.scrollY > 400);
        });
    }

    const toolModal = document.getElementById('toolDetailModal');
    if (toolModal) {
        toolModal.addEventListener('click', (event) => {
            if (event.target === toolModal) {
                window.closeToolDetails();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            window.closeToolDetails();
        }
    });
});
