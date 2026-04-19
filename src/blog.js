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

    holder.innerHTML = typeOrder.map((type) => `
        <button type="button" class="type-chip ${type === activeType ? 'active' : ''}" data-action="set-news-type" data-news-type="${escapeHtml(type)}">${escapeHtml(type)}</button>
    `).join('');
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

function getUrgencyBadge(level) {
    if (level === 'high') return '<span class="urgency high">High Impact</span>';
    if (level === 'medium') return '<span class="urgency medium">Watch</span>';
    return '<span class="urgency low">Normal</span>';
}

function renderNewsFeed() {
    const feed = document.getElementById('newsFeed');
    const count = document.getElementById('feedCount');
    if (!feed || !count) return;

    const items = getFilteredNews();
    const visibleItems = items.slice(0, visibleNewsCount);
    count.textContent = `Showing ${visibleItems.length} of ${items.length} stories`;

    if (!items.length) {
        feed.innerHTML = '<div class="empty-feed">No AI stories match this filter. Try another keyword or refresh.</div>';
        renderFeedPager(0, 0);
        return;
    }

    feed.innerHTML = visibleItems.map((item) => {
        const safeSourceUrl = sanitizeExternalUrl(item.sourceUrl);
        const sourceLink = safeSourceUrl ? `<a class="side-link" href="${escapeHtml(safeSourceUrl)}" target="_blank" rel="noopener noreferrer">Source: ${escapeHtml(urlDomain(safeSourceUrl) || item.source)} ↗</a>` : '';
        const watchKey = escapeHtml(item.storyKey);
        const isSaved = watchlist.has(item.storyKey);
        return `
            <article class="news-card" data-action="open-news" data-news-id="${item.id}" role="button" tabindex="0">
                <div class="news-top">
                    <div class="news-type">${escapeHtml(item.type)}</div>
                    ${getUrgencyBadge(item.urgency)}
                </div>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.summary)}</p>
                <div class="news-meta">
                    <span>🏢 ${escapeHtml(item.company || item.source)}</span>
                    <span>🕒 ${escapeHtml(item.timeAgo || 'recently')}</span>
                    <span>⚡ Impact ${Number(item.impact || 0)}</span>
                    <span>💡 Opp ${Number(item.opportunity || 0)}</span>
                    <span>📡 ${escapeHtml(labelForSourceType(item.sourceType))}</span>
                </div>
                ${sourceLink}
                <div class="news-actions">
                    <button type="button" data-action="toggle-watch" data-story-key="${watchKey}" class="watch-btn ${isSaved ? 'on' : ''}">${isSaved ? '★ Saved' : '☆ Save'}</button>
                    <button class="read-btn">Open Analysis →</button>
                </div>
            </article>
        `;
    }).join('');

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
    box.innerHTML = top.map((item, idx) => `
        <div class="time-item" data-action="open-news" data-news-id="${item.id}" role="button" tabindex="0">
            <span class="time-dot">${idx + 1}</span>
            <div>
                <strong>${escapeHtml(item.title)}</strong>
                <small>${escapeHtml(item.type)} • ${escapeHtml(item.timeAgo || 'recently')}</small>
            </div>
        </div>
    `).join('');
}

function renderTicker() {
    const ticker = document.getElementById('breakingTicker');
    if (!ticker) return;

    const high = allNewsItems.filter((i) => i.urgency === 'high').slice(0, 6);
    if (!high.length) {
        ticker.innerHTML = '<div class="ticker-track"><span>AI feed active. Waiting for high-impact stories...</span></div>';
        return;
    }

    const track = high.map((item) => `<span>⚠ ${escapeHtml(item.title)}</span>`).join('<span class="sep">•</span>');
    ticker.innerHTML = `
        <div class="ticker-track">
            ${track}
            <span class="sep">•</span>
            ${track}
        </div>
    `;
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

    box.innerHTML = items.map((item) => `
        <button type="button" class="watch-item" data-action="open-news" data-news-id="${item.id}">${escapeHtml(item.title)}</button>
    `).join('');
}

window.openNews = function(id) {
    const item = allNewsItems.find((n) => n.id === id);
    const modal = document.getElementById('newsModal');
    const card = document.getElementById('newsModalCard');
    if (!item || !modal || !card) return;

    const sourceType = labelForSourceType(item.sourceType);
    const safeSourceUrl = sanitizeExternalUrl(item.sourceUrl);
    const sourceDomain = urlDomain(safeSourceUrl);

    card.innerHTML = `
        <button type="button" class="modal-close" data-action="close-news-modal">✕</button>
        <div class="modal-type">${escapeHtml(item.type)}</div>
        <h2>${escapeHtml(item.title)}</h2>
        <div class="modal-meta">
            <span>Source: ${escapeHtml(item.source)}</span>
            <span>${escapeHtml(sourceType)}</span>
            <span>${escapeHtml(item.timeAgo || 'recently')}</span>
            <span>Impact ${Number(item.impact || 0)}</span>
            <span>Opportunity ${Number(item.opportunity || 0)}</span>
        </div>
        ${safeSourceUrl ? `<p class="modal-summary"><strong>Original Link:</strong> <a href="${escapeHtml(safeSourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(sourceDomain || safeSourceUrl)}</a></p>` : ''}
        <p class="modal-summary">${escapeHtml(item.summary)}</p>

        <div class="modal-block">
            <h3>Why This Matters</h3>
            <p>${escapeHtml(item.whyItMatters || item.summary)}</p>
        </div>

        <div class="modal-block">
            <h3>What To Do Next</h3>
            <ul>
                ${(item.actions || []).map((a) => `<li>${escapeHtml(a)}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-links">
            ${safeSourceUrl ? `<a href="${escapeHtml(safeSourceUrl)}" target="_blank" rel="noopener noreferrer">Open Original Source ↗</a>` : ''}
            <a href="/ai-tools">Find matching AI tools</a>
            <a href="/prompt-store">Get implementation prompts</a>
            <a href="/ai-services">Execute with AI services</a>
        </div>
    `;

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

    const safe = escapeHtml(message);
    let color = '';
    if (tone === 'good') color = ' style="color:#9ef0be;"';
    if (tone === 'warn') color = ' style="color:#ffd08b;"';
    if (tone === 'bad') color = ' style="color:#ffafaf;"';
    el.innerHTML = `<span${color}>${safe}</span>`;
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
        setSourceStatus('Live feed unavailable. Showing backup AI stories. Start bot proxy for real-time updates.', 'warn');
        showToast('Live feed unavailable, fallback loaded', '⚠️');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = 'Refresh';
        }
    }
};

function initNav() {
    const ham = document.getElementById('ham');
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
