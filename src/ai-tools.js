import { submitForm } from './form-client.js';
import { markGrid } from './grid-state.js';
import { openDialog, closeDialog } from './dialog.js';

// =============================================
// DATA — 20 CURATED WEB & CREATOR TOOLS
// =============================================
const tools = [
    {
        id: 1,
        name: 'ChatGPT',
        category: 'Writing / Assistant',
        categories: ['writing', 'chatbot', 'productivity'],
        pricing: 'free',
        priceLabel: 'Free tier / $20/mo Plus',
        startingPrice: 0,
        rating: 4.9,
        desc: 'Conversational language model and reasoning assistant for drafting content, debugging code, and synthesizing research across complex tasks.',
        tags: ['LLM Reasoning', 'Multi-Modal'],
        special: 'LLM Reasoning',
        link: 'https://chat.openai.com',
        featured: true,
        features: { freeplan: true, api: true, mobile: true, team: true, offline: false }
    },
    {
        id: 2,
        name: 'Jasper AI',
        category: 'Writing',
        categories: ['writing', 'marketing'],
        pricing: 'paid',
        priceLabel: '$39/mo',
        startingPrice: 39,
        rating: 4.7,
        desc: 'Marketing-focused writing platform equipped with brand voice templates, campaign workflows, and structured team collaboration.',
        tags: ['Marketing Workflows', 'Brand Voice'],
        special: 'Marketing Workflows',
        link: 'https://jasper.ai',
        featured: true,
        features: { freeplan: false, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 3,
        name: 'Copy.ai',
        category: 'Writing',
        categories: ['writing', 'marketing'],
        pricing: 'freemium',
        priceLabel: 'Free tier / $49/mo',
        startingPrice: 0,
        rating: 4.6,
        desc: 'Automated copywriting assistant with pre-built frameworks for email campaigns, ad copy, and landing page outlines.',
        tags: ['Copywriting', 'Template Library'],
        special: 'Copywriting',
        link: 'https://copy.ai',
        featured: false,
        features: { freeplan: true, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 4,
        name: 'Midjourney',
        category: 'Image Generation',
        categories: ['image', 'design'],
        pricing: 'paid',
        priceLabel: '$10/mo',
        startingPrice: 10,
        rating: 4.9,
        desc: 'High-fidelity text-to-image synthesis engine optimized for detailed artistic composition, concept art, and visual prototyping.',
        tags: ['Image Synthesis', 'Artistic Prototyping'],
        special: 'Image Synthesis',
        link: 'https://midjourney.com',
        featured: true,
        features: { freeplan: false, api: false, mobile: false, team: true, offline: false }
    },
    {
        id: 5,
        name: 'DALL-E 3',
        category: 'Image Generation',
        categories: ['image', 'design'],
        pricing: 'free',
        priceLabel: 'Included in Plus / Free API',
        startingPrice: 0,
        rating: 4.7,
        desc: 'Prompt-adherent image generation engine by OpenAI, integrated into ChatGPT for contextual visual rendering.',
        tags: ['Image Generation', 'ChatGPT Native'],
        special: 'Image Generation',
        link: 'https://openai.com/dall-e-3',
        featured: false,
        features: { freeplan: true, api: true, mobile: true, team: false, offline: false }
    },
    {
        id: 6,
        name: 'Stable Diffusion',
        category: 'Image Generation',
        categories: ['image', 'code'],
        pricing: 'free',
        priceLabel: 'Free (Open Source)',
        startingPrice: 0,
        rating: 4.5,
        desc: 'Open-weights diffusion model architecture capable of local deployment, fine-tuning, and offline batch generation.',
        tags: ['Open Weights', 'Local Execution'],
        special: 'Open Weights',
        link: 'https://stability.ai',
        featured: false,
        features: { freeplan: true, api: true, mobile: false, team: false, offline: true }
    },
    {
        id: 7,
        name: 'Canva AI',
        category: 'Design',
        categories: ['design', 'image'],
        pricing: 'free',
        priceLabel: 'Free tier / $12.99/mo',
        startingPrice: 0,
        rating: 4.8,
        desc: 'Web-based graphic design suite integrating automated layout assistance, asset removal, and rapid social media template generation.',
        tags: ['Graphic Design', 'Template Workflows'],
        special: 'Graphic Design',
        link: 'https://canva.com',
        featured: true,
        features: { freeplan: true, api: false, mobile: true, team: true, offline: false }
    },
    {
        id: 8,
        name: 'Runway ML',
        category: 'Video',
        categories: ['video'],
        pricing: 'paid',
        priceLabel: '$15/mo',
        startingPrice: 15,
        rating: 4.7,
        desc: 'Creative video synthesis suite supporting text-to-video, motion brush control, and video-to-video stylized rendering.',
        tags: ['Video Synthesis', 'Motion Editing'],
        special: 'Video Synthesis',
        link: 'https://runwayml.com',
        featured: false,
        features: { freeplan: false, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 9,
        name: 'Synthesia',
        category: 'Video',
        categories: ['video', 'business'],
        pricing: 'paid',
        priceLabel: '$22/mo',
        startingPrice: 22,
        rating: 4.6,
        desc: 'Synthetic presenter platform generating multilingual avatar presentations for documentation, onboarding, and training modules.',
        tags: ['Avatar Video', 'Multilingual'],
        special: 'Avatar Video',
        link: 'https://synthesia.io',
        featured: false,
        features: { freeplan: false, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 10,
        name: 'Pictory',
        category: 'Video',
        categories: ['video', 'marketing'],
        pricing: 'paid',
        priceLabel: '$19/mo',
        startingPrice: 19,
        rating: 4.5,
        desc: 'Long-form to short-form video repurposing utility that extracts clips, generates subtitles, and pairs script segments with B-roll footage.',
        tags: ['Video Repurposing', 'Subtitles & B-Roll'],
        special: 'Video Repurposing',
        link: 'https://pictory.ai',
        featured: false,
        features: { freeplan: false, api: false, mobile: false, team: false, offline: false }
    },
    {
        id: 11,
        name: 'GitHub Copilot',
        category: 'Code',
        categories: ['code'],
        pricing: 'freemium',
        priceLabel: '$10/mo',
        startingPrice: 10,
        rating: 4.8,
        desc: 'IDE-integrated code completion and assistant that suggests syntactical blocks, unit tests, and inline function definitions.',
        tags: ['Code Completion', 'IDE Integration'],
        special: 'Code Completion',
        link: 'https://github.com/features/copilot',
        featured: true,
        features: { freeplan: false, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 12,
        name: 'Cursor AI',
        category: 'Code',
        categories: ['code'],
        pricing: 'freemium',
        priceLabel: 'Free tier / $20/mo',
        startingPrice: 0,
        rating: 4.7,
        desc: 'VS Code-based code editor built with multi-file codebase indexing, inline diff editing, and terminal assistance.',
        tags: ['Codebase Indexing', 'Inline Editing'],
        special: 'Codebase Indexing',
        link: 'https://cursor.sh',
        featured: false,
        features: { freeplan: true, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 13,
        name: 'Surfer SEO',
        category: 'SEO',
        categories: ['seo'],
        pricing: 'freemium',
        priceLabel: '$69/mo',
        startingPrice: 69,
        rating: 4.7,
        desc: 'Content optimization engine that benchmarks SERP competitor structures, keyword frequencies, and topical coverage density.',
        tags: ['SERP Analysis', 'Content Optimization'],
        special: 'SERP Analysis',
        link: 'https://surferseo.com',
        featured: false,
        features: { freeplan: false, api: false, mobile: false, team: true, offline: false }
    },
    {
        id: 14,
        name: 'Semrush AI',
        category: 'SEO / Marketing',
        categories: ['seo', 'marketing'],
        pricing: 'paid',
        priceLabel: '$129/mo',
        startingPrice: 129,
        rating: 4.8,
        desc: 'Comprehensive digital marketing suite encompassing search volume tracking, backlink audits, competitor positioning, and editorial workflow tools.',
        tags: ['Competitive Analysis', 'Search Audits'],
        special: 'Competitive Analysis',
        link: 'https://semrush.com',
        featured: false,
        features: { freeplan: false, api: true, mobile: true, team: true, offline: false }
    },
    {
        id: 15,
        name: 'ElevenLabs',
        category: 'Voice',
        categories: ['voice'],
        pricing: 'freemium',
        priceLabel: 'Free tier / $5/mo',
        startingPrice: 0,
        rating: 4.9,
        desc: 'High-accuracy neural text-to-speech platform with vocal inflection controls, voice cloning features, and multi-language support.',
        tags: ['Voice Synthesis', 'Speech Cloning'],
        special: 'Voice Synthesis',
        link: 'https://elevenlabs.io',
        featured: true,
        features: { freeplan: true, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 16,
        name: 'Murf AI',
        category: 'Voice',
        categories: ['voice', 'music'],
        pricing: 'freemium',
        priceLabel: 'Free tier / $19/mo',
        startingPrice: 0,
        rating: 4.6,
        desc: 'Voice synthesis workstation providing curated narrator timbres, pitch adjustments, and synced audio-video timelines for presentations.',
        tags: ['Voiceovers', 'Narrator Library'],
        special: 'Voiceovers',
        link: 'https://murf.ai',
        featured: false,
        features: { freeplan: true, api: true, mobile: false, team: true, offline: false }
    },
    {
        id: 17,
        name: 'Notion AI',
        category: 'Productivity',
        categories: ['productivity', 'business'],
        pricing: 'freemium',
        priceLabel: '$10/mo add-on',
        startingPrice: 10,
        rating: 4.7,
        desc: 'Workspace-embedded writing and synthesis tool for summarizing meeting notes, extracting action items, and drafting outlines.',
        tags: ['Workspace Utility', 'Note Summarization'],
        special: 'Workspace Utility',
        link: 'https://notion.so/product/ai',
        featured: false,
        features: { freeplan: false, api: false, mobile: true, team: true, offline: false }
    },
    {
        id: 18,
        name: 'Zapier AI',
        category: 'Automation',
        categories: ['automation', 'business', 'productivity'],
        pricing: 'freemium',
        priceLabel: 'Free tier / $19.99/mo',
        startingPrice: 0,
        rating: 4.6,
        desc: 'Cloud automation platform connecting disparate web APIs with natural language trigger setup and automated data routing.',
        tags: ['API Orchestration', 'Workflow Triggers'],
        special: 'API Orchestration',
        link: 'https://zapier.com',
        featured: false,
        features: { freeplan: true, api: true, mobile: true, team: true, offline: false }
    },
    {
        id: 19,
        name: 'Perplexity AI',
        category: 'Research',
        categories: ['research'],
        pricing: 'free',
        priceLabel: 'Free tier / $20/mo',
        startingPrice: 0,
        rating: 4.8,
        desc: 'Conversational answer engine with real-time web retrieval, bibliographic citations, and domain-scoped research filtering.',
        tags: ['Cited Web Retrieval', 'Research Synthesis'],
        special: 'Cited Web Retrieval',
        link: 'https://perplexity.ai',
        featured: false,
        features: { freeplan: true, api: true, mobile: true, team: false, offline: false }
    },
    {
        id: 20,
        name: 'Claude',
        category: 'Writing / Assistant',
        categories: ['writing', 'chatbot', 'productivity', 'research', 'education'],
        pricing: 'free',
        priceLabel: 'Free tier / $20/mo Pro',
        startingPrice: 0,
        rating: 4.9,
        desc: 'Anthropic reasoning and coding assistant capable of long-context analysis, technical writing, and reliable document processing.',
        tags: ['Long Context', 'Technical Writing'],
        special: 'Long Context',
        link: 'https://claude.ai',
        featured: false,
        features: { freeplan: true, api: true, mobile: true, team: true, offline: false }
    }
];

// =============================================
// STATE
// =============================================
let filteredTools = [...tools];
let activeFilter = 'all';
let searchQuery = '';
let currentSort = 'rating';
let compareList = [];
let savedTools = new Set();
let viewingFavorites = false;

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

    markGrid(featuredGrid, 'ready');
    markGrid(allGrid, filteredTools.length ? 'ready' : 'empty');
    featuredGrid.style.display = '';
    const featuredSecLeft = document.querySelector('.sec-header .sec-left');
    if (featuredSecLeft) featuredSecLeft.style.display = '';
    const allSecHeader = document.querySelector('.sec-header-all');
    if (allSecHeader) allSecHeader.style.display = '';

    featuredGrid.textContent = '';
    allGrid.textContent = '';

    if (filteredTools.length === 0) {
        featuredGrid.style.display = 'none';
        if (featuredSecLeft) featuredSecLeft.style.display = 'none';
        if (allSecHeader) allSecHeader.style.display = 'none';

        const empty = document.createElement('div');
        empty.className = 'no-results';
        empty.style.gridColumn = '1/-1';

        const icon = document.createElement('div');
        icon.className = 'no-results-icon';
        icon.innerHTML = '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';

        const title = document.createElement('h3');
        title.textContent = 'No tools found';

        const msg = document.createElement('p');
        msg.textContent = 'Try adjusting your search query or selecting a different category filter.';

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

        const countEl = document.getElementById('toolCount');
        if (countEl) countEl.textContent = '0 tools found';
        return;
    }

    const countEl = document.getElementById('toolCount');
    if (countEl) {
        countEl.textContent = `Showing ${filteredTools.length} tool${filteredTools.length !== 1 ? 's' : ''}`;
    }

    filteredTools.forEach((tool) => {
        const isCompared = compareList.find((t) => t.id === tool.id);
        const isSaved = savedTools.has(tool.id);

        const card = document.createElement('div');
        card.className = `tool-card ui-card ${tool.featured ? 'featured' : ''}`.trim();
        card.dataset.id = String(tool.id);
        card.dataset.action = 'open-tool';
        card.dataset.toolId = String(tool.id);

        // Header Top Row
        const cardTop = document.createElement('div');
        cardTop.className = 'card-top';

        const cardLeft = document.createElement('div');
        cardLeft.className = 'card-left';

        const logo = document.createElement('div');
        logo.className = 'tool-logo';
        logo.textContent = tool.name.charAt(0);

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
        bookmarkBtn.setAttribute('aria-label', isSaved ? `Remove ${tool.name} from saved` : `Save ${tool.name}`);
        bookmarkBtn.innerHTML = isSaved
            ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>'
            : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
        actionsTop.appendChild(bookmarkBtn);

        cardTop.appendChild(cardLeft);
        cardTop.appendChild(actionsTop);
        card.appendChild(cardTop);

        // Badges Row
        const badges = document.createElement('div');
        badges.className = 'card-badges';

        const price = document.createElement('span');
        if (tool.pricing === 'free') {
            price.className = 'price-badge price-free';
            price.textContent = 'Free Tier';
        } else if (tool.pricing === 'freemium') {
            price.className = 'price-badge price-freemium';
            price.textContent = 'Freemium';
        } else {
            price.className = 'price-badge price-paid';
            price.textContent = 'Commercial';
        }
        badges.appendChild(price);

        tool.tags.forEach((tag) => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag-badge';
            tagEl.textContent = tag;
            badges.appendChild(tagEl);
        });
        card.appendChild(badges);

        // Verification Status Line
        const reviewStatus = document.createElement('p');
        reviewStatus.className = 'card-rating';
        reviewStatus.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Verified vendor specifications';
        card.appendChild(reviewStatus);

        // Description
        const desc = document.createElement('p');
        desc.className = 'tool-desc';
        desc.textContent = tool.desc;
        card.appendChild(desc);

        // Price details
        const toolPrice = document.createElement('div');
        toolPrice.className = 'tool-price';
        toolPrice.appendChild(document.createTextNode('Pricing: '));
        const strong = document.createElement('strong');
        strong.textContent = tool.priceLabel;
        toolPrice.appendChild(strong);
        card.appendChild(toolPrice);

        // Controls footer: Details -> Visit Tool -> Compare button
        // Sequential keyboard navigation invariant: Details immediately tabs to Visit Tool
        const btns = document.createElement('div');
        btns.className = 'card-btns';

        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'review-btn ui-button';
        detailsBtn.type = 'button';
        detailsBtn.dataset.action = 'open-tool';
        detailsBtn.dataset.toolId = String(tool.id);
        detailsBtn.textContent = 'Details';

        const visit = document.createElement('a');
        visit.className = 'visit-btn ui-button';
        visit.dataset.action = 'visit-tool';
        visit.dataset.toolName = tool.name;
        visit.target = '_blank';
        visit.rel = 'noopener sponsored';
        visit.href = sanitizeExternalUrl(tool.link) || '#';
        visit.textContent = 'Visit Tool';

        const compareBtn = document.createElement('button');
        compareBtn.className = 'review-btn ui-button';
        compareBtn.type = 'button';
        compareBtn.dataset.action = 'quick-compare';
        compareBtn.dataset.toolId = String(tool.id);
        compareBtn.textContent = 'Compare';

        btns.appendChild(detailsBtn);
        btns.appendChild(visit);
        btns.appendChild(compareBtn);
        card.appendChild(btns);

        // Compare checkbox
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
        label.textContent = `Add to Compare ${isCompared ? '(selected)' : ''}`;

        compareWrap.appendChild(cb);
        compareWrap.appendChild(label);
        card.appendChild(compareWrap);

        if (currentSort === 'rating' && tool.featured) {
            featuredGrid.appendChild(card);
        } else {
            allGrid.appendChild(card);
        }
    });

    // Hide featured grid and featured heading if no featured tools match current filters
    if (featuredGrid.children.length === 0) {
        featuredGrid.style.display = 'none';
        if (featuredSecLeft) featuredSecLeft.style.display = 'none';
    } else {
        featuredGrid.style.display = 'grid';
        if (featuredSecLeft) featuredSecLeft.style.display = 'flex';
    }
}

function renderToolDeepDescription(tool) {
    const categoryText = tool.category.toLowerCase();
    return [
        `${tool.name} provides established capabilities for ${categoryText} workflows, delivering predictable production output and clean software integration.`,
        `Digital teams and creators adopt ${tool.name} for structured efficiency, documented API interfaces, and dependable operational stability across repetitive workflows.`,
        `Pricing begins at ${tool.priceLabel}. Refer directly to the vendor specifications for current enterprise seats, volume tiers, and API usage quotas.`
    ];
}

function renderFeaturePills(tool) {
    const flags = [
        { key: 'freeplan', label: 'Free Plan' },
        { key: 'api', label: 'API Available' },
        { key: 'mobile', label: 'Mobile App' },
        { key: 'team', label: 'Team Workspaces' },
        { key: 'offline', label: 'Local / Offline' }
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
    logo.textContent = tool.name.charAt(0);

    const heroRight = document.createElement('div');
    const title = document.createElement('h3');
    title.className = 'tool-detail-title';
    title.textContent = tool.name;

    const sub = document.createElement('p');
    sub.className = 'tool-detail-sub';
    sub.textContent = `${tool.category} • ${tool.priceLabel} • Verified Specifications`;

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
    [description[0], description[1], description[2]].forEach((paragraph) => {
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
    visit.textContent = `Visit ${tool.name}`;

    const compare = document.createElement('button');
    compare.type = 'button';
    compare.className = 'btn btn-outline';
    compare.dataset.action = 'modal-compare';
    compare.dataset.toolId = String(tool.id);
    compare.textContent = 'Add To Compare';

    actions.appendChild(visit);
    actions.appendChild(compare);
    content.appendChild(actions);

    openDialog(modal, { label: tool.name + ' details', onClose: window.closeToolDetails });
};

window.closeToolDetails = function() {
    const modal = document.getElementById('toolDetailModal');
    if (!modal) return;
    closeDialog(modal);
};

// =============================================
// PRICE BADGE HELPER
// =============================================
function getPriceBadge(pricing, label) {
    if (pricing === 'free') return `<span class="price-badge price-free">${label}</span>`;
    if (pricing === 'freemium') return `<span class="price-badge price-freemium">${label}</span>`;
    return `<span class="price-badge price-paid">${label}</span>`;
}

// Stub for any legacy callers
window.renderStars = function() {
    return '';
};

// =============================================
// FILTER & SEARCH
// =============================================
window.applyFilter = function(btn, filter) {
    viewingFavorites = false;
    const favBtn = document.getElementById('viewFavoritesBtn');
    if (favBtn) {
        favBtn.classList.remove('active');
        favBtn.setAttribute('aria-pressed', 'false');
    }

    activeFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    applyFiltersAndSearch();
};

function applyFiltersAndSearch() {
    filteredTools = tools.filter(tool => {
        if (viewingFavorites && !savedTools.has(tool.id)) {
            return false;
        }

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

window.handleSearch = function(val) {
    searchQuery = (val || '').toLowerCase().trim();
    const clearBtn = document.getElementById('searchClear');
    if (clearBtn) clearBtn.classList.toggle('visible', searchQuery.length > 0);
    applyFiltersAndSearch();
};

window.clearSearch = function() {
    const searchInput = document.getElementById('toolSearch');
    if (searchInput) searchInput.value = '';
    window.handleSearch('');
};

window.toggleFavoritesView = function() {
    viewingFavorites = !viewingFavorites;
    const favBtn = document.getElementById('viewFavoritesBtn');
    if (favBtn) {
        favBtn.classList.toggle('active', viewingFavorites);
        favBtn.setAttribute('aria-pressed', String(viewingFavorites));
    }
    applyFiltersAndSearch();
};

// =============================================
// SORT
// =============================================
window.sortTools = function() {
    const sel = document.getElementById('sortTools');
    if (sel) currentSort = sel.value;
    sortToolsData();
    renderTools();
};

function sortToolsData() {
    filteredTools.sort((a, b) => {
        switch (currentSort) {
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
    const tool = tools.find(t => t.id === id);
    const toolName = tool ? tool.name : 'tool';
    if (savedTools.has(id)) {
        savedTools.delete(id);
        if (btn) {
            btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
            btn.classList.remove('saved');
            btn.title = 'Save tool';
            btn.setAttribute('aria-label', `Save ${toolName}`);
        }
        showToast('Removed from saved');
    } else {
        savedTools.add(id);
        if (btn) {
            btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
            btn.classList.add('saved');
            btn.title = 'Remove from saved';
            btn.setAttribute('aria-label', `Remove ${toolName} from saved`);
        }
        showToast('Tool saved');
    }
    persistSavedTools();
    if (viewingFavorites) {
        applyFiltersAndSearch();
    }
};

function persistSavedTools() {
    try {
        const serialized = JSON.stringify(Array.from(savedTools));
        localStorage.setItem('sanzy_saved_tools', serialized);
        localStorage.setItem('sanzy_tools_favorites', serialized);
    } catch (e) {
        console.warn('Could not persist saved tools', e);
    }
}

// =============================================
// COMPARE
// =============================================
window.toggleCompare = function(id, cb) {
    const tool = tools.find(t => t.id === id);
    if (!tool) return;

    if (cb.checked) {
        if (compareList.length >= 3) {
            setTimeout(() => { cb.checked = false; }, 10);
            showToast('Maximum 3 tools for comparison');
            return;
        }
        compareList.push(tool);
    } else {
        compareList = compareList.filter(t => t.id !== id);
    }
    updateCompareBar();
};

function updateCompareBar() {
    const bar = document.getElementById('compareBar');
    const chips = document.getElementById('compareChips');
    const info = document.getElementById('compareInfo');
    const btn = document.getElementById('compareBtn');

    if (!bar) return;

    if (compareList.length === 0) {
        bar.classList.remove('show');
        syncCompareBarWidgetOffset(bar, false);
        return;
    }

    bar.classList.add('show');
    if (info) info.textContent = `${compareList.length}/3 tools selected`;
    if (btn) btn.disabled = compareList.length < 2;

    if (chips) {
        chips.innerHTML = compareList.map(t => `
            <div class="compare-chip">
                <span style="font-weight:700;">${t.name.charAt(0)}</span>
                <span>${t.name}</span>
                <button type="button" class="compare-chip-remove" data-action="remove-compare" data-tool-id="${t.id}" aria-label="Remove ${t.name}">✕</button>
            </div>
        `).join('');
    }

    syncCompareBarWidgetOffset(bar, true);
}

function syncCompareBarWidgetOffset(bar, visible = bar.classList.contains('show')) {
    if (!document.body) return;

    if (!visible) {
        delete document.body.dataset.compareBarOpen;
        document.body.style.removeProperty('--ai-tools-compare-offset');
        return;
    }

    document.body.dataset.compareBarOpen = 'true';
    window.requestAnimationFrame(() => {
        if (!bar.classList.contains('show')) return;
        document.body.style.setProperty('--ai-tools-compare-offset', `${Math.ceil(bar.getBoundingClientRect().height)}px`);
    });
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
};

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
};

window.openCompare = function() {
    if (compareList.length < 2) {
        showToast('Select at least 2 tools to compare');
        return;
    }
    buildCompareTable();
    const section = document.getElementById('compareSection');
    if (section) {
        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

window.quickCompare = function(id) {
    const cb = document.getElementById(`cmp-${id}`);
    if (!cb) return;
    if (!cb.checked) {
        cb.checked = true;
        window.toggleCompare(id, cb);
        if (cb.checked) {
            showToast('Added to compare');
        }
    }
};

window.closeCompare = function() {
    const sec = document.getElementById('compareSection');
    if (sec) sec.style.display = 'none';
};

function buildCompareTable() {
    const features = [
        { key: 'name', label: 'Tool Name' },
        { key: 'category', label: 'Category' },
        { key: 'pricing', label: 'Pricing Model' },
        { key: 'priceLabel', label: 'Starting Price' },
        { key: 'verified', label: 'Status' },
        { key: 'freeplan', label: 'Free Plan' },
        { key: 'api', label: 'API Access' },
        { key: 'mobile', label: 'Mobile App' },
        { key: 'team', label: 'Team Plan' },
        { key: 'offline', label: 'Offline Use' },
    ];

    const table = document.getElementById('compareTable');
    if (!table) return;

    const colWidth = Math.floor(80 / compareList.length);

    table.innerHTML = `
        <thead>
            <tr>
                <th style="width:20%;">Feature</th>
                ${compareList.map(t => `<th style="width:${colWidth}%;">${t.name}</th>`).join('')}
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
                        else if (f.key === 'verified') val = '<span style="color:#22c55e;font-weight:600;">Verified Spec</span>';
                        else {
                            const boolVal = t.features[f.key];
                            val = boolVal
                                ? `<span class="check-yes">Yes</span>`
                                : `<span class="check-no">No</span>`;
                        }
                        return `<td>${val}</td>`;
                    }).join('')}
                </tr>
            `).join('')}
            <tr>
                <td class="compare-feature">Visit Tool</td>
                ${compareList.map(t => `
                    <td>
                        <a href="${sanitizeExternalUrl(t.link) || '#'}" target="_blank" rel="noopener sponsored" class="btn btn-primary btn-xs"
                           data-action="visit-external" data-tool-name="${t.name}">
                            Visit
                        </a>
                    </td>
                `).join('')}
            </tr>
        </tbody>`;
}

// =============================================
// SUBMISSION FORM
// =============================================
window.handleSubmit = async function(event) {
    event.preventDefault();
    const form = event.target;
    if (!form.reportValidity()) return;
    await submitForm(form, '/api/leads', {
        kind: 'tool',
        name: form.querySelector('#submitToolName')?.value || '',
        email: form.querySelector('#submitToolEmail')?.value || '',
        url: form.querySelector('#submitToolUrl')?.value || '',
        category: form.querySelector('#submitToolCategory')?.value || '',
        desc: form.querySelector('#submitToolDescription')?.value || '',
    });
};

// =============================================
// TOAST NOTIFICATIONS
// =============================================
let toastTimer;
window.showToast = function(msg, icon = '') {
    clearTimeout(toastTimer);
    const toast = document.getElementById('toast');
    const tMsg = document.getElementById('toastMsg');
    const tIcon = document.getElementById('toastIcon');

    if (tMsg) tMsg.textContent = msg;
    if (tIcon) {
        if (icon) {
            tIcon.innerHTML = icon;
        } else {
            tIcon.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
        }
    }
    if (toast) {
        toast.classList.add('show');
        toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

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

// =============================================
// EVENT BINDINGS
// =============================================
function bindStaticControls() {
    const searchInput = document.getElementById('toolSearch');
    const searchClear = document.getElementById('searchClear');
    const filterScroll = document.getElementById('filterScroll');
    const sortSelect = document.getElementById('sortTools');
    const clearCompareBtn = document.getElementById('clearCompareBtn');
    const compareBtn = document.getElementById('compareBtn');
    const closeCompareBtn = document.getElementById('closeCompareBtn');
    const submitToolForm = document.getElementById('submitToolForm');
    const toolDetailClose = document.getElementById('toolDetailClose');
    const viewFavoritesBtn = document.getElementById('viewFavoritesBtn');
    const backToTopBtn = document.getElementById('backToTopBtn') || document.getElementById('scrollTop');

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

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    window.addEventListener('resize', () => {
        const compareBar = document.getElementById('compareBar');
        if (compareBar?.classList.contains('show')) {
            syncCompareBarWidgetOffset(compareBar, true);
        }
    }, { passive: true });
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
            case 'toggle-favorites-view': {
                window.toggleFavoritesView();
                break;
            }
            case 'open-tool': {
                if (event.target.closest('a:not([data-action="open-tool"]), button:not([data-action="open-tool"]), input, label, select, textarea')) return;
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
                    window.showToast(`Opening ${toolName}...`);
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
}

// =============================================
// INITIALIZATION
// =============================================
window.addEventListener('beforeunload', () => {
    try {
        const rawSaved = localStorage.getItem('sanzy_saved_tools');
        if (rawSaved) JSON.parse(rawSaved);
        const rawFav = localStorage.getItem('sanzy_tools_favorites');
        if (rawFav) JSON.parse(rawFav);
    } catch (e) {
        sessionStorage.setItem('sanzy_had_corrupt_storage', 'true');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    try {
        if (sessionStorage.getItem('sanzy_had_corrupt_storage') === 'true') {
            sessionStorage.removeItem('sanzy_had_corrupt_storage');
            savedTools = new Set();
        } else {
            let parsed = null;
            const favData = localStorage.getItem('sanzy_tools_favorites');
            if (favData) {
                try { parsed = JSON.parse(favData); } catch (e) {}
            }
            if (!parsed) {
                const savedData = localStorage.getItem('sanzy_saved_tools');
                if (savedData) {
                    try { parsed = JSON.parse(savedData); } catch (e) {}
                }
            }
            if (Array.isArray(parsed)) {
                savedTools = new Set(parsed);
            }
        }
    } catch (e) {
        savedTools = new Set();
    }

    updateFilterCounts();
    sortToolsData();
    renderTools();
    bindStaticControls();
    bindDynamicControls();

    // Hamburger navigation
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

    // Scroll-to-top visibility
    const backToTopBtn = document.getElementById('backToTopBtn') || document.getElementById('scrollTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('vis', window.scrollY > 400);
        }, { passive: true });
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
