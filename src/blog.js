const fallbackNewsItems = [
    {
        id: 1,
        type: 'Model Release',
        urgency: 'high',
        title: 'OpenAI ships GPT-5 coding mode with stronger repository reasoning',
        source: 'OpenAI News',
        sourceType: 'official',
        sourceUrl: 'https://openai.com/news/',
        timeAgo: 'recently',
        impact: 95,
        opportunity: 88,
        company: 'OpenAI',
        summary: 'OpenAI introduced major coding-focused improvements designed for multi-file reasoning, test generation, and practical repository work. This update is especially relevant for teams building software products with AI copilots as part of their daily workflow.',
        whyItMatters: 'Developer productivity and AI coding competition will accelerate in agency and SaaS workflows.',
        actions: [
            'Benchmark your current coding assistant prompts against new capabilities.',
            'Update your internal coding SOPs for faster review loops.',
            'Re-test bugfix automation workflows this week.'
        ]
    },
    {
        id: 2,
        type: 'Policy',
        urgency: 'high',
        title: 'Regulators increase focus on AI-generated media labeling rules',
        source: 'Policy Watch',
        sourceType: 'news',
        sourceUrl: 'https://www.theverge.com/ai-artificial-intelligence',
        timeAgo: 'recently',
        impact: 83,
        opportunity: 59,
        company: 'Policy Trackers',
        summary: 'Draft frameworks around watermarking and disclosure are gaining momentum across multiple regions. Teams publishing AI-generated content should prepare transparent labeling workflows now to avoid compliance surprises later.',
        whyItMatters: 'Compliance-first content operations will become a practical advantage for agencies and brands.',
        actions: [
            'Create an internal AI disclosure checklist.',
            'Tag AI-generated assets in your publishing workflow.',
            'Review legal guidance for client campaigns.'
        ]
    }
];

const typeOrder = ['All', 'Model Release', 'Product Launch', 'Policy', 'Research', 'Funding', 'Creator Economy', 'AI Update'];
const FEED_PAGE_SIZE = 24;
let activeType = 'All';
let visibleNewsCount = FEED_PAGE_SIZE;
let watchlist = new Set(
    JSON.parse(localStorage.getItem('ai_news_watchlist') || '[]')
        .map((value) => String(value || '').trim())
        .filter(Boolean)
);
let allNewsItems = [];

function storyKeyFromItem(item = {}) {
    const byUrl = String(item.sourceUrl || '').trim().toLowerCase();
    if (byUrl) return byUrl;

    const title = String(item.title || '').toLowerCase().replace(/\s+/g, ' ').trim();
    const source = String(item.source || item.company || '').toLowerCase().replace(/\s+/g, ' ').trim();
    return `${title}|${source}`;
}

function hydrateNewsItems(items = []) {
    return items
        .map((item, idx) => ({
            ...item,
            id: idx + 1,
            storyKey: item.storyKey || storyKeyFromItem(item),
        }))
        .filter((item) => item.storyKey);
}

function escapeJsSingleQuote(value = '') {
    return String(value)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'");
}

function showToast(msg, icon = '✅') {
    const toast = document.getElementById('toast');
    const tIcon = document.getElementById('toastIcon');
    const tMsg = document.getElementById('toastMsg');
    if (!toast || !tIcon || !tMsg) return;

    tIcon.textContent = icon;
    tMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.__newsToast);
    window.__newsToast = setTimeout(() => toast.classList.remove('show'), 2600);
}

function escapeHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function labelForSourceType(type = '') {
    const t = String(type).toLowerCase();
    if (t === 'social') return 'Social Feed';
    if (t === 'official') return 'Official Source';
    return 'News Source';
}

function urlDomain(url) {
    try {
        return new URL(url).hostname.replace(/^www\./i, '');
    } catch {
        return '';
    }
}

function sanitizeExternalUrl(url = '') {
    const raw = String(url || '').trim();
    if (!raw) return '';

    try {
        const parsed = new URL(raw, window.location.origin);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return '';
        }
        return parsed.href;
    } catch {
        return '';
    }
}

function getFilteredNews() {
    const q = (document.getElementById('newsSearch')?.value || '').trim().toLowerCase();
    const sortMode = document.getElementById('impactSort')?.value || 'newest';

    let arr = allNewsItems.filter((item) => {
        const typeMatch = activeType === 'All' || item.type === activeType;
        const hay = `${item.title} ${item.summary} ${item.company} ${item.type} ${item.source}`.toLowerCase();
        const qMatch = !q || hay.includes(q);
        return typeMatch && qMatch;
    });

    if (sortMode === 'impact') {
        arr.sort((a, b) => b.impact - a.impact);
    } else if (sortMode === 'opportunity') {
        arr.sort((a, b) => b.opportunity - a.opportunity);
    }

    return arr;
}

function renderTypeFilters() {
    const holder = document.getElementById('typeFilters');
    if (!holder) return;

    holder.textContent = '';
    typeOrder.forEach((type) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `type-chip ${type === activeType ? 'active' : ''}`;
        btn.dataset.action = 'set-news-type';
        btn.dataset.newsType = type;
        btn.textContent = type;
        holder.appendChild(btn);
    });
}

window.setNewsType = function(type) {
    activeType = type;
    visibleNewsCount = FEED_PAGE_SIZE;
    renderTypeFilters();
    renderNewsFeed();
};

window.applyNewsFilters = function() {
    visibleNewsCount = FEED_PAGE_SIZE;
    renderNewsFeed();
};

window.loadMoreNews = function() {
    visibleNewsCount += FEED_PAGE_SIZE;
    renderNewsFeed();
};

function createUrgencyBadge(level) {
    const span = document.createElement('span');
    if (level === 'high') {
        span.className = 'urgency high';
        span.textContent = 'High Impact';
        return span;
    }
    if (level === 'medium') {
        span.className = 'urgency medium';
        span.textContent = 'Watch';
        return span;
    }
    span.className = 'urgency low';
    span.textContent = 'Normal';
    return span;
}

function renderNewsFeed() {
    const feed = document.getElementById('newsFeed');
    const count = document.getElementById('feedCount');
    if (!feed || !count) return;

    const items = getFilteredNews();
    const visibleItems = items.slice(0, visibleNewsCount);
    count.textContent = `Showing ${visibleItems.length} of ${items.length} stories`;

    if (!items.length) {
        feed.textContent = '';
        const empty = document.createElement('div');
        empty.className = 'empty-feed';
        empty.textContent = 'No AI stories match this filter. Try another keyword or refresh.';
        feed.appendChild(empty);
        renderFeedPager(0, 0);
        return;
    }

    feed.textContent = '';
    visibleItems.forEach((item) => {
        const article = document.createElement('article');
        article.className = 'news-card';
        article.dataset.action = 'open-news';
        article.dataset.newsId = String(item.id);
        article.setAttribute('role', 'button');
        article.setAttribute('tabindex', '0');

        const newsTop = document.createElement('div');
        newsTop.className = 'news-top';
        const newsType = document.createElement('div');
        newsType.className = 'news-type';
        newsType.textContent = String(item.type || 'AI Update');
        newsTop.appendChild(newsType);
        newsTop.appendChild(createUrgencyBadge(item.urgency));
        article.appendChild(newsTop);

        const h3 = document.createElement('h3');
        h3.textContent = String(item.title || 'Untitled AI Update');
        article.appendChild(h3);

        const summary = document.createElement('p');
        summary.textContent = String(item.summary || '');
        article.appendChild(summary);

        const meta = document.createElement('div');
        meta.className = 'news-meta';
        [
            `🏢 ${item.company || item.source || ''}`,
            `🕒 ${item.timeAgo || 'recently'}`,
            `⚡ Impact ${Number(item.impact || 0)}`,
            `💡 Opp ${Number(item.opportunity || 0)}`,
            `📡 ${labelForSourceType(item.sourceType)}`
        ].forEach((text) => {
            const span = document.createElement('span');
            span.textContent = text;
            meta.appendChild(span);
        });
        article.appendChild(meta);

        const safeSourceUrl = sanitizeExternalUrl(item.sourceUrl);
        if (safeSourceUrl) {
            const sourceLink = document.createElement('a');
            sourceLink.className = 'side-link';
            sourceLink.href = safeSourceUrl;
            sourceLink.target = '_blank';
            sourceLink.rel = 'noopener noreferrer';
            sourceLink.textContent = `Source: ${urlDomain(safeSourceUrl) || item.source || 'Source'} ↗`;
            article.appendChild(sourceLink);
        }

        const actions = document.createElement('div');
        actions.className = 'news-actions';
        const watchBtn = document.createElement('button');
        const isSaved = watchlist.has(item.storyKey);
        watchBtn.type = 'button';
        watchBtn.dataset.action = 'toggle-watch';
        watchBtn.dataset.storyKey = String(item.storyKey || '');
        watchBtn.className = `watch-btn ${isSaved ? 'on' : ''}`;
        watchBtn.textContent = isSaved ? '★ Saved' : '☆ Save';
        const readBtn = document.createElement('button');
        readBtn.className = 'read-btn';
        readBtn.textContent = 'Open Analysis →';
        actions.appendChild(watchBtn);
        actions.appendChild(readBtn);
        article.appendChild(actions);

        feed.appendChild(article);
    });

    renderFeedPager(items.length, visibleItems.length);
}

function renderFeedPager(totalCount, visibleCount) {
    const pager = document.getElementById('feedPager');
    const progress = document.getElementById('feedProgress');
    const loadMoreBtn = document.getElementById('loadMoreNewsBtn');
    if (!pager || !progress || !loadMoreBtn) return;

    if (totalCount <= FEED_PAGE_SIZE) {
        pager.hidden = true;
        return;
    }

    pager.hidden = false;
    progress.textContent = `Showing ${visibleCount} of ${totalCount} stories`;
    loadMoreBtn.hidden = visibleCount >= totalCount;
}

function renderTimeline() {
    const box = document.getElementById('impactTimeline');
    if (!box) return;

    const top = [...allNewsItems].sort((a, b) => b.impact - a.impact).slice(0, 6);
    box.textContent = '';
    top.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'time-item';
        row.dataset.action = 'open-news';
        row.dataset.newsId = String(item.id);
        row.setAttribute('role', 'button');
        row.setAttribute('tabindex', '0');

        const dot = document.createElement('span');
        dot.className = 'time-dot';
        dot.textContent = String(idx + 1);
        row.appendChild(dot);

        const content = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = String(item.title || 'Untitled AI Update');
        const small = document.createElement('small');
        small.textContent = `${item.type || 'AI Update'} • ${item.timeAgo || 'recently'}`;
        content.appendChild(strong);
        content.appendChild(small);
        row.appendChild(content);

        box.appendChild(row);
    });
}

function renderTicker() {
    const ticker = document.getElementById('breakingTicker');
    if (!ticker) return;

    const high = allNewsItems.filter((i) => i.urgency === 'high').slice(0, 6);
    if (!high.length) {
        ticker.textContent = '';
        const track = document.createElement('div');
        track.className = 'ticker-track';
        const span = document.createElement('span');
        span.textContent = 'AI feed active. Waiting for high-impact stories...';
        track.appendChild(span);
        ticker.appendChild(track);
        return;
    }

    ticker.textContent = '';
    const track = document.createElement('div');
    track.className = 'ticker-track';

    const appendTrackItems = () => {
        high.forEach((item, idx) => {
            const span = document.createElement('span');
            span.textContent = `⚠ ${item.title || 'AI update'}`;
            track.appendChild(span);
            if (idx < high.length - 1) {
                const sep = document.createElement('span');
                sep.className = 'sep';
                sep.textContent = '•';
                track.appendChild(sep);
            }
        });
    };

    appendTrackItems();
    const midSep = document.createElement('span');
    midSep.className = 'sep';
    midSep.textContent = '•';
    track.appendChild(midSep);
    appendTrackItems();
    ticker.appendChild(track);
}

window.toggleWatch = function(storyKey) {
    const normalizedKey = String(storyKey || '').trim();
    if (!normalizedKey) return;

    if (watchlist.has(normalizedKey)) {
        watchlist.delete(normalizedKey);
        showToast('Removed from watchlist', '🗑️');
    } else {
        watchlist.add(normalizedKey);
        showToast('Saved to watchlist', '⭐');
    }

    localStorage.setItem('ai_news_watchlist', JSON.stringify(Array.from(watchlist)));
    renderNewsFeed();
    renderWatchlist();
};

function renderWatchlist() {
    const box = document.getElementById('watchlistBox');
    if (!box) return;

    const items = allNewsItems.filter((n) => watchlist.has(n.storyKey));
    if (!items.length) {
        box.textContent = 'No saved items yet.';
        return;
    }

    box.textContent = '';
    items.forEach((item) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'watch-item';
        btn.dataset.action = 'open-news';
        btn.dataset.newsId = String(item.id);
        btn.textContent = String(item.title || 'Untitled AI Update');
        box.appendChild(btn);
    });
}

window.openNews = function(id) {
    const item = allNewsItems.find((n) => n.id === id);
    const modal = document.getElementById('newsModal');
    const card = document.getElementById('newsModalCard');
    if (!item || !modal || !card) return;

    const sourceType = labelForSourceType(item.sourceType);
    const safeSourceUrl = sanitizeExternalUrl(item.sourceUrl);
    const sourceDomain = urlDomain(safeSourceUrl);

    card.textContent = '';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'modal-close';
    closeBtn.dataset.action = 'close-news-modal';
    closeBtn.textContent = '✕';
    card.appendChild(closeBtn);

    const modalType = document.createElement('div');
    modalType.className = 'modal-type';
    modalType.textContent = String(item.type || 'AI Update');
    card.appendChild(modalType);

    const h2 = document.createElement('h2');
    h2.textContent = String(item.title || 'Untitled AI Update');
    card.appendChild(h2);

    const meta = document.createElement('div');
    meta.className = 'modal-meta';
    [
        `Source: ${item.source || 'Unknown Source'}`,
        sourceType,
        item.timeAgo || 'recently',
        `Impact ${Number(item.impact || 0)}`,
        `Opportunity ${Number(item.opportunity || 0)}`,
    ].forEach((text) => {
        const span = document.createElement('span');
        span.textContent = text;
        meta.appendChild(span);
    });
    card.appendChild(meta);

    if (safeSourceUrl) {
        const summaryLinkP = document.createElement('p');
        summaryLinkP.className = 'modal-summary';
        const strong = document.createElement('strong');
        strong.textContent = 'Original Link:';
        const link = document.createElement('a');
        link.href = safeSourceUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = sourceDomain || safeSourceUrl;
        summaryLinkP.appendChild(strong);
        summaryLinkP.appendChild(document.createTextNode(' '));
        summaryLinkP.appendChild(link);
        card.appendChild(summaryLinkP);
    }

    const summary = document.createElement('p');
    summary.className = 'modal-summary';
    summary.textContent = String(item.summary || '');
    card.appendChild(summary);

    const whyBlock = document.createElement('div');
    whyBlock.className = 'modal-block';
    const whyH3 = document.createElement('h3');
    whyH3.textContent = 'Why This Matters';
    const whyP = document.createElement('p');
    whyP.textContent = String(item.whyItMatters || item.summary || '');
    whyBlock.appendChild(whyH3);
    whyBlock.appendChild(whyP);
    card.appendChild(whyBlock);

    const nextBlock = document.createElement('div');
    nextBlock.className = 'modal-block';
    const nextH3 = document.createElement('h3');
    nextH3.textContent = 'What To Do Next';
    const ul = document.createElement('ul');
    (item.actions || []).forEach((actionText) => {
        const li = document.createElement('li');
        li.textContent = String(actionText);
        ul.appendChild(li);
    });
    nextBlock.appendChild(nextH3);
    nextBlock.appendChild(ul);
    card.appendChild(nextBlock);

    const links = document.createElement('div');
    links.className = 'modal-links';
    if (safeSourceUrl) {
        const sourceA = document.createElement('a');
        sourceA.href = safeSourceUrl;
        sourceA.target = '_blank';
        sourceA.rel = 'noopener noreferrer';
        sourceA.textContent = 'Open Original Source ↗';
        links.appendChild(sourceA);
    }
    const internalLinks = [
        { href: '/ai-tools', text: 'Find matching AI tools' },
        { href: '/prompt-store', text: 'Get implementation prompts' },
        { href: '/ai-services', text: 'Execute with AI services' },
    ];
    internalLinks.forEach((itemLink) => {
        const a = document.createElement('a');
        a.href = itemLink.href;
        a.textContent = itemLink.text;
        links.appendChild(a);
    });
    card.appendChild(links);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeNewsModal = function(e) {
    const modal = document.getElementById('newsModal');
    if (!modal) return;

    if (!e || e.target === modal || e.currentTarget?.classList?.contains('modal-close')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
};

function bindNewsControls() {
    document.getElementById('newsSearch')?.addEventListener('input', () => {
        window.applyNewsFilters();
    });

    document.getElementById('impactSort')?.addEventListener('change', () => {
        window.applyNewsFilters();
    });

    document.getElementById('refreshNewsBtn')?.addEventListener('click', () => {
        window.refreshAiNews();
    });

    document.getElementById('loadMoreNewsBtn')?.addEventListener('click', () => {
        window.loadMoreNews();
    });

    document.getElementById('newsModal')?.addEventListener('click', (event) => {
        if (event.target.id === 'newsModal') {
            window.closeNewsModal(event);
        }
    });

    document.addEventListener('click', (event) => {
        const actionEl = event.target.closest('[data-action]');
        if (!actionEl) return;

        const action = actionEl.dataset.action;
        if (action === 'set-news-type') {
            const newsType = actionEl.dataset.newsType;
            if (newsType) {
                window.setNewsType(newsType);
            }
            return;
        }

        if (action === 'toggle-watch') {
            event.stopPropagation();
            const storyKey = actionEl.dataset.storyKey;
            if (storyKey) {
                window.toggleWatch(storyKey);
            }
            return;
        }

        if (action === 'open-news') {
            if (event.target.closest('a,button')) return;
            const id = Number(actionEl.dataset.newsId || '0');
            if (id) {
                window.openNews(id);
            }
            return;
        }

        if (action === 'close-news-modal') {
            window.closeNewsModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const card = event.target.closest('[data-action="open-news"]');
        if (!card || event.target !== card) return;
        event.preventDefault();
        const id = Number(card.dataset.newsId || '0');
        if (id) {
            window.openNews(id);
        }
    });
}

function updateHeroStats() {
    const statStories = document.getElementById('statStories');
    const statCritical = document.getElementById('statCritical');
    const statFunding = document.getElementById('statFunding');

    if (statStories) statStories.textContent = String(allNewsItems.length);
    if (statCritical) statCritical.textContent = String(allNewsItems.filter((n) => n.urgency === 'high').length);
    if (statFunding) {
        const highImpact = allNewsItems.filter((n) => Number(n.impact) >= 80).length;
        statFunding.textContent = highImpact > 0 ? `${highImpact}+ major moves` : 'Live tracking';
    }
}

function setSourceStatus(message, tone = 'normal') {
    const el = document.getElementById('newsSourceStatus');
    if (!el) return;

    el.textContent = '';
    const span = document.createElement('span');
    if (tone === 'good') span.style.color = '#9ef0be';
    if (tone === 'warn') span.style.color = '#ffd08b';
    if (tone === 'bad') span.style.color = '#ffafaf';
    span.textContent = String(message || '');
    el.appendChild(span);
}

function shapeRemoteItems(items = []) {
    return items
        .map((item) => ({
            type: item.type || 'AI Update',
            urgency: item.urgency || 'medium',
            title: item.title || 'Untitled AI Update',
            source: item.source || 'Unknown Source',
            sourceType: item.sourceType || 'news',
            sourceUrl: item.sourceUrl || '',
            timeAgo: item.timeAgo || 'recently',
            impact: Number(item.impact || 65),
            opportunity: Number(item.opportunity || 60),
            company: item.company || item.source || 'AI Source',
            storyKey: storyKeyFromItem(item),
            // Slightly longer cards per request.
            summary: String(item.summary || '').slice(0, 460),
            whyItMatters: item.whyItMatters || item.summary || 'Track this update against your current AI workflow.',
            actions: Array.isArray(item.actions) && item.actions.length
                ? item.actions.slice(0, 4)
                : [
                    'Open source and verify key claims.',
                    'Map impact to your active AI workflows.',
                    'Schedule one quick implementation test this week.'
                ],
        }))
        .filter((item) => item.title && item.summary);
}

async function fetchAiNews() {
    const response = await fetch('/api/ai-news', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`AI news request failed (${response.status})`);
    }

    const data = await response.json();
    if (!data?.ok || !Array.isArray(data?.items)) {
        throw new Error('AI news response malformed');
    }

    return data;
}

function applyNewsData(newsPayload) {
    const remoteItems = hydrateNewsItems(shapeRemoteItems(newsPayload.items));
    if (remoteItems.length > 0) {
        allNewsItems = remoteItems;
    } else {
        allNewsItems = hydrateNewsItems(fallbackNewsItems);
    }

    visibleNewsCount = FEED_PAGE_SIZE;

    const sourceCount = Array.isArray(newsPayload.sources) ? newsPayload.sources.length : 0;
    const itemCount = allNewsItems.length;
    const updatedAt = newsPayload.updatedAt ? new Date(newsPayload.updatedAt).toLocaleTimeString() : 'just now';
    const providerCounts = newsPayload?.diagnostics?.providerCounts;
    const countSummary = providerCounts && typeof providerCounts === 'object'
        ? Object.entries(providerCounts)
            .map(([name, count]) => `${name}:${Number(count) || 0}`)
            .join(' | ')
        : '';
    const suffix = countSummary ? ` • ${countSummary}` : '';
    setSourceStatus(`Auto-updated from ${sourceCount} feeds • ${itemCount} AI stories • Last sync ${updatedAt}${suffix}`, 'good');

    renderTypeFilters();
    renderTicker();
    renderTimeline();
    renderNewsFeed();
    renderWatchlist();
    updateHeroStats();
}

window.refreshAiNews = async function() {
    const btn = document.getElementById('refreshNewsBtn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Refreshing...';
    }

    setSourceStatus('Refreshing live AI feeds...', 'normal');

    try {
        const data = await fetchAiNews();
        applyNewsData(data);
        showToast('AI news refreshed', '📰');
    } catch {
        allNewsItems = hydrateNewsItems(fallbackNewsItems);
        visibleNewsCount = FEED_PAGE_SIZE;
        renderTicker();
        renderTimeline();
        renderNewsFeed();
        renderWatchlist();
        updateHeroStats();
        setSourceStatus('Showing curated AI stories. Refresh for latest updates.', 'normal');
        showToast('Curated stories loaded', '📰');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = 'Refresh';
        }
    }
};

function initNav() {
    const ham = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!ham || !mobileNav) return;

    ham.addEventListener('click', () => {
        ham.classList.toggle('active');
        mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
            ham.classList.remove('active');
            mobileNav.classList.remove('open');
        });
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeNewsModal();
});

document.addEventListener('DOMContentLoaded', async () => {
    initNav();
    bindNewsControls();
    allNewsItems = hydrateNewsItems(fallbackNewsItems);
    renderTypeFilters();
    renderTicker();
    renderTimeline();
    renderNewsFeed();
    renderWatchlist();
    updateHeroStats();
    setSourceStatus('Connecting live AI feeds...', 'normal');

    await window.refreshAiNews();

    // Background refresh every 10 minutes.
    window.setInterval(() => {
        window.refreshAiNews();
    }, 10 * 60 * 1000);
});
