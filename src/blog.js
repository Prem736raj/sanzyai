import { markGrid, showGridState } from './grid-state.js';
import { openDialog, closeDialog } from './dialog.js';

// Never present undated demo headlines as current news.
const fallbackNewsItems = [];

const typeOrder = ['All', 'Model Release', 'Product Launch', 'Policy', 'Research', 'Funding', 'Creator Economy', 'AI Update'];
const FEED_PAGE_SIZE = 24;

let activeType = 'All';
let visibleNewsCount = FEED_PAGE_SIZE;
let trackedSourceCount = 0;
let watchlist = new Set(
    JSON.parse(localStorage.getItem('ai_news_watchlist') || '[]')
        .map((value) => String(value || '').trim())
        .filter(Boolean)
);
let allNewsItems = [];
let newsState = 'loading';
let refreshing = false;

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

function showToast(msg, icon = '') {
    const toast = document.getElementById('toast');
    const tIcon = document.getElementById('toastIcon');
    const tMsg = document.getElementById('toastMsg');
    if (!toast || !tIcon || !tMsg) return;

    tIcon.textContent = icon;
    tIcon.style.display = icon ? 'inline-block' : 'none';
    tMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.__newsToast);
    window.__newsToast = setTimeout(() => toast.classList.remove('show'), 2600);
}

function labelForSourceType(type = '') {
    const normalized = String(type).toLowerCase();
    if (normalized === 'social') return 'Community';
    if (normalized === 'official') return 'Official';
    return 'News';
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
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';
        return parsed.href;
    } catch {
        return '';
    }
}

function newsTimestamp(item = {}) {
    const ts = Date.parse(item.publishedAt || '');
    return Number.isNaN(ts) ? 0 : ts;
}

function formatPublishedDate(value = '') {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function getFilteredNews() {
    const q = (document.getElementById('newsSearch')?.value || '').trim().toLowerCase();
    const sortMode = document.getElementById('impactSort')?.value || 'newest';

    const arr = allNewsItems.filter((item) => {
        const typeMatch = activeType === 'All' || item.type === activeType;
        const haystack = `${item.title} ${item.summary} ${item.company} ${item.type} ${item.source}`.toLowerCase();
        return typeMatch && (!q || haystack.includes(q));
    });

    if (sortMode === 'impact') {
        arr.sort((a, b) => (b.editorialScore || b.impact || 0) - (a.editorialScore || a.impact || 0));
    } else if (sortMode === 'official') {
        arr.sort((a, b) => {
            const officialDelta = Number(b.sourceType === 'official') - Number(a.sourceType === 'official');
            return officialDelta || newsTimestamp(b) - newsTimestamp(a);
        });
    } else {
        arr.sort((a, b) => newsTimestamp(b) - newsTimestamp(a));
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
        btn.setAttribute('aria-pressed', String(type === activeType));
        btn.textContent = type;
        holder.appendChild(btn);
    });
}

window.setNewsType = function(type) {
    const restoreFocus = document.activeElement?.dataset.action === 'set-news-type';
    activeType = type;
    visibleNewsCount = FEED_PAGE_SIZE;
    renderTypeFilters();
    if (restoreFocus) {
        [...document.querySelectorAll('#typeFilters button')]
            .find(button => button.dataset.newsType === type)?.focus({ preventScroll: true });
    }
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

function renderNewsFeed() {
    const feed = document.getElementById('newsFeed');
    const count = document.getElementById('feedCount');
    if (!feed || !count) return;
    if (newsState === 'loading') return;

    if (newsState === 'error') {
        count.textContent = 'Feed unavailable';
        showGridState(feed, 'error', 'Live news is temporarily unavailable. Please try again later.', true);
        renderFeedPager(0, 0);
        return;
    }

    const items = getFilteredNews();
    const visibleItems = items.slice(0, visibleNewsCount);
    count.textContent = `Showing ${visibleItems.length} of ${items.length} stories`;

    if (!items.length) {
        showGridState(feed, 'empty', 'No AI stories match this filter. Try another keyword or refresh.');
        renderFeedPager(0, 0);
        return;
    }

    feed.textContent = '';
    markGrid(feed, refreshing ? 'refreshing' : 'ready');

    visibleItems.forEach((item) => {
        const article = document.createElement('article');
        article.className = 'news-card ui-card';

        const newsTop = document.createElement('div');
        newsTop.className = 'news-top';

        const newsType = document.createElement('div');
        newsType.className = 'news-type';
        newsType.textContent = String(item.type || 'AI Update');
        newsTop.appendChild(newsType);

        const sourceKind = document.createElement('span');
        sourceKind.className = 'source-kind';
        sourceKind.textContent = labelForSourceType(item.sourceType);
        newsTop.appendChild(sourceKind);
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
            item.company || item.source || '',
            formatPublishedDate(item.publishedAt) || item.timeAgo || 'Recently',
            item.timeAgo || '',
        ].filter(Boolean).forEach((text) => {
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
            sourceLink.textContent = `Read source · ${urlDomain(safeSourceUrl) || item.source || 'Source'} ↗`;
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
        watchBtn.setAttribute('aria-pressed', String(isSaved));
        watchBtn.textContent = isSaved ? 'Saved' : 'Save';

        const readBtn = document.createElement('button');
        readBtn.className = 'read-btn ui-button';
        readBtn.dataset.action = 'open-news';
        readBtn.dataset.newsId = String(item.id);
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

function renderLeadCoverage() {
    const lead = document.getElementById('leadStory');
    const rail = document.getElementById('latestHeadlines');
    const railCount = document.getElementById('latestRailCount');
    if (!lead || !rail) return;

    const ordered = [...allNewsItems].sort((a, b) => newsTimestamp(b) - newsTimestamp(a));
    lead.textContent = '';
    rail.textContent = '';

    if (!ordered.length) {
        const empty = document.createElement('p');
        empty.className = 'lead-placeholder';
        empty.textContent = newsState === 'error'
            ? 'Live coverage is temporarily unavailable.'
            : 'Loading the latest AI story…';
        lead.appendChild(empty);
        if (railCount) railCount.textContent = 'Live feed';
        return;
    }

    const item = ordered[0];
    const label = document.createElement('span');
    label.className = 'section-label';
    label.textContent = 'Top story';
    lead.appendChild(label);

    const meta = document.createElement('div');
    meta.className = 'lead-meta';
    meta.textContent = `${item.type || 'AI Update'} · ${item.source || 'AI source'} · ${formatPublishedDate(item.publishedAt) || item.timeAgo || 'Recently'}`;
    lead.appendChild(meta);

    const title = document.createElement('h2');
    title.textContent = String(item.title || 'Untitled AI Update');
    lead.appendChild(title);

    const summary = document.createElement('p');
    summary.textContent = String(item.summary || '');
    lead.appendChild(summary);

    const actions = document.createElement('div');
    actions.className = 'lead-actions';

    const openBtn = document.createElement('button');
    openBtn.type = 'button';
    openBtn.className = 'lead-open';
    openBtn.dataset.action = 'open-news';
    openBtn.dataset.newsId = String(item.id);
    openBtn.textContent = 'Open briefing';
    actions.appendChild(openBtn);

    const safeUrl = sanitizeExternalUrl(item.sourceUrl);
    if (safeUrl) {
        const source = document.createElement('a');
        source.href = safeUrl;
        source.target = '_blank';
        source.rel = 'noopener noreferrer';
        source.textContent = 'Original source ↗';
        actions.appendChild(source);
    }
    lead.appendChild(actions);

    ordered.slice(1, 6).forEach((story, index) => {
        const row = document.createElement('button');
        row.type = 'button';
        row.className = 'headline-item';
        row.dataset.action = 'open-news';
        row.dataset.newsId = String(story.id);

        const number = document.createElement('span');
        number.className = 'headline-number';
        number.textContent = String(index + 1).padStart(2, '0');

        const copy = document.createElement('span');
        copy.className = 'headline-copy';
        const strong = document.createElement('strong');
        strong.textContent = String(story.title || 'Untitled AI Update');
        const small = document.createElement('small');
        small.textContent = `${story.source || 'AI source'} · ${story.timeAgo || formatPublishedDate(story.publishedAt) || 'Recently'}`;
        copy.appendChild(strong);
        copy.appendChild(small);

        row.appendChild(number);
        row.appendChild(copy);
        rail.appendChild(row);
    });

    if (railCount) railCount.textContent = `${Math.min(5, Math.max(0, ordered.length - 1))} recent headlines`;
}

function renderTimeline() {
    const box = document.getElementById('impactTimeline');
    if (!box) return;

    const top = [...allNewsItems]
        .sort((a, b) => (b.editorialScore || b.impact || 0) - (a.editorialScore || a.impact || 0))
        .slice(0, 6);

    box.textContent = '';
    if (!top.length) {
        box.textContent = 'Top stories will appear here when the live feed is available.';
        return;
    }

    top.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'time-item';
        row.dataset.action = 'open-news';
        row.dataset.newsId = String(item.id);
        row.setAttribute('role', 'button');
        row.setAttribute('tabindex', '0');

        const number = document.createElement('span');
        number.className = 'time-dot';
        number.textContent = String(idx + 1).padStart(2, '0');
        row.appendChild(number);

        const content = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = String(item.title || 'Untitled AI Update');
        const small = document.createElement('small');
        small.textContent = `${item.source || 'AI source'} · ${formatPublishedDate(item.publishedAt) || item.timeAgo || 'Recently'}`;
        content.appendChild(strong);
        content.appendChild(small);
        row.appendChild(content);
        box.appendChild(row);
    });
}

window.toggleWatch = function(storyKey) {
    const normalizedKey = String(storyKey || '').trim();
    if (!normalizedKey) return;

    if (watchlist.has(normalizedKey)) {
        watchlist.delete(normalizedKey);
        showToast('Removed from reading list');
    } else {
        watchlist.add(normalizedKey);
        showToast('Saved to reading list');
    }

    localStorage.setItem('ai_news_watchlist', JSON.stringify(Array.from(watchlist)));
    renderNewsFeed();
    renderWatchlist();
};

function renderWatchlist() {
    const box = document.getElementById('watchlistBox');
    if (!box) return;

    const items = allNewsItems.filter((item) => watchlist.has(item.storyKey));
    if (!items.length) {
        box.textContent = 'No saved stories yet.';
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
    const item = allNewsItems.find((newsItem) => newsItem.id === id);
    const modal = document.getElementById('newsModal');
    const card = document.getElementById('newsModalCard');
    if (!item || !modal || !card) return;

    const safeSourceUrl = sanitizeExternalUrl(item.sourceUrl);
    const sourceDomain = urlDomain(safeSourceUrl);

    card.textContent = '';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'modal-close';
    closeBtn.dataset.action = 'close-news-modal';
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', 'Close news analysis');
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
        item.source || 'Unknown Source',
        labelForSourceType(item.sourceType),
        formatPublishedDate(item.publishedAt) || item.timeAgo || 'Recently',
    ].forEach((text) => {
        const span = document.createElement('span');
        span.textContent = text;
        meta.appendChild(span);
    });
    card.appendChild(meta);

    const summary = document.createElement('p');
    summary.className = 'modal-summary';
    summary.textContent = String(item.summary || '');
    card.appendChild(summary);

    const briefing = document.createElement('div');
    briefing.className = 'modal-block';
    const briefingTitle = document.createElement('h3');
    briefingTitle.textContent = 'Briefing';
    const briefingCopy = document.createElement('p');
    briefingCopy.textContent = String(item.whyItMatters || item.summary || '');
    briefing.appendChild(briefingTitle);
    briefing.appendChild(briefingCopy);
    card.appendChild(briefing);

    const links = document.createElement('div');
    links.className = 'modal-links';
    if (safeSourceUrl) {
        const sourceA = document.createElement('a');
        sourceA.href = safeSourceUrl;
        sourceA.target = '_blank';
        sourceA.rel = 'noopener noreferrer';
        sourceA.textContent = `Read on ${sourceDomain || 'source'} ↗`;
        links.appendChild(sourceA);
    }
    card.appendChild(links);

    openDialog(modal, { label: item.title, onClose: window.closeNewsModal });
};

window.closeNewsModal = function(event) {
    const modal = document.getElementById('newsModal');
    if (!modal) return;

    if (!event || event.target === modal || event.currentTarget?.classList?.contains('modal-close')) {
        closeDialog(modal);
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
        if (event.target.id === 'newsModal') window.closeNewsModal(event);
    });

    document.addEventListener('click', (event) => {
        const actionEl = event.target.closest('[data-action]');
        if (!actionEl) return;

        const action = actionEl.dataset.action;
        if (action === 'retry-news') {
            void window.refreshAiNews();
            return;
        }

        if (action === 'set-news-type') {
            const newsType = actionEl.dataset.newsType;
            if (newsType) window.setNewsType(newsType);
            return;
        }

        if (action === 'toggle-watch') {
            event.stopPropagation();
            const storyKey = actionEl.dataset.storyKey;
            if (storyKey) window.toggleWatch(storyKey);
            return;
        }

        if (action === 'open-news') {
            if (event.target.closest('a, [data-action="toggle-watch"]')) return;
            const id = Number(actionEl.dataset.newsId || '0');
            if (id) window.openNews(id);
            return;
        }

        if (action === 'close-news-modal') window.closeNewsModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const card = event.target.closest('[data-action="open-news"]');
        if (!card || event.target !== card) return;
        event.preventDefault();
        const id = Number(card.dataset.newsId || '0');
        if (id) window.openNews(id);
    });
}

function updateHeroStats() {
    const statStories = document.getElementById('statStories');
    const statOfficial = document.getElementById('statCritical');
    const statSources = document.getElementById('statFunding');

    if (statStories) statStories.textContent = String(allNewsItems.length);
    if (statOfficial) statOfficial.textContent = String(allNewsItems.filter((item) => item.sourceType === 'official').length);
    if (statSources) statSources.textContent = trackedSourceCount ? String(trackedSourceCount) : '—';
}

function setSourceStatus(message, tone = 'normal') {
    const el = document.getElementById('newsSourceStatus');
    if (!el) return;
    el.textContent = String(message || '');
    el.dataset.tone = tone;
}

function updatePeriodUi(period = {}) {
    const fallback = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const label = String(period?.label || fallback);
    const monthLabel = document.getElementById('monthLabel');
    const monthTitle = document.getElementById('monthTitle');
    const coveragePeriod = document.getElementById('coveragePeriod');

    if (monthLabel) monthLabel.textContent = label.toUpperCase();
    if (monthTitle) monthTitle.textContent = label;
    if (coveragePeriod) coveragePeriod.textContent = `${label} · month to date`;
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
            publishedAt: item.publishedAt || '',
            timeAgo: item.timeAgo || 'recently',
            impact: Number(item.impact || 65),
            opportunity: Number(item.opportunity || 60),
            editorialScore: Number(item.editorialScore || item.impact || 65),
            company: item.company || item.source || 'AI Source',
            storyKey: storyKeyFromItem(item),
            summary: String(item.summary || '').slice(0, 460),
            whyItMatters: item.whyItMatters || item.summary || '',
        }))
        .filter((item) => item.title && item.summary);
}

async function fetchAiNews() {
    const response = await fetch('/api/ai-news', {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
        // A cold refresh collects several feeds before the proxy can answer.
        signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) throw new Error(`AI news request failed (${response.status})`);

    const data = await response.json();
    if (!data?.ok || !Array.isArray(data?.items)) throw new Error('AI news response malformed');
    return data;
}

function applyNewsData(newsPayload) {
    const remoteItems = hydrateNewsItems(shapeRemoteItems(newsPayload.items));
    allNewsItems = remoteItems.length ? remoteItems : hydrateNewsItems(fallbackNewsItems);
    visibleNewsCount = FEED_PAGE_SIZE;
    newsState = 'ready';

    trackedSourceCount = Array.isArray(newsPayload.sources) ? newsPayload.sources.length : 0;
    updatePeriodUi(newsPayload.period);

    const itemCount = allNewsItems.length;
    const updatedAt = newsPayload.updatedAt
        ? new Date(newsPayload.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'just now';
    const status = !remoteItems.length
        ? 'No live stories available. Please try again later.'
        : newsPayload.stale
            ? `Showing cached ${newsPayload.period?.label || 'current-month'} coverage. Live refresh is temporarily unavailable.`
            : `${itemCount} stories this month · ${trackedSourceCount} sources tracked · synced ${updatedAt}`;

    setSourceStatus(status, newsPayload.stale || !remoteItems.length ? 'warn' : 'good');
    renderTypeFilters();
    renderLeadCoverage();
    renderTimeline();
    renderNewsFeed();
    renderWatchlist();
    updateHeroStats();
}

window.refreshAiNews = async function() {
    if (refreshing) return;
    refreshing = true;

    const feed = document.getElementById('newsFeed');
    if (!allNewsItems.length) {
        newsState = 'loading';
        showGridState(feed, 'loading', 'Loading AI news...');
        const feedCount = document.getElementById('feedCount');
        if (feedCount) feedCount.textContent = 'Loading stories...';
    } else {
        markGrid(feed, 'refreshing');
    }

    const btn = document.getElementById('refreshNewsBtn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Refreshing…';
    }

    setSourceStatus('Refreshing this month’s AI coverage…', 'normal');

    try {
        const data = await fetchAiNews();
        applyNewsData(data);
        showToast('AI news refreshed');
    } catch {
        newsState = allNewsItems.length ? 'ready' : 'error';
        renderLeadCoverage();
        renderTimeline();
        renderNewsFeed();
        renderWatchlist();
        updateHeroStats();
        setSourceStatus(
            allNewsItems.length
                ? 'Showing previously loaded stories. Live refresh is temporarily unavailable.'
                : 'Live news is temporarily unavailable. Please try again later.',
            allNewsItems.length ? 'warn' : 'bad'
        );
        showToast('Live news unavailable');
    } finally {
        refreshing = false;
        if (feed?.dataset.state === 'refreshing') markGrid(feed, 'ready');
        if (btn) {
            btn.disabled = false;
            btn.textContent = 'Refresh feed';
        }
    }
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') window.closeNewsModal();
});

document.addEventListener('DOMContentLoaded', async () => {
    bindNewsControls();
    allNewsItems = hydrateNewsItems(fallbackNewsItems);
    renderTypeFilters();
    updatePeriodUi();
    renderLeadCoverage();
    renderTimeline();
    renderNewsFeed();
    renderWatchlist();
    updateHeroStats();
    setSourceStatus('Connecting to this month’s AI sources…', 'normal');

    await window.refreshAiNews();

    window.setInterval(() => {
        window.refreshAiNews();
    }, 10 * 60 * 1000);
});
