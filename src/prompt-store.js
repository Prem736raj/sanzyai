import { loadPdfLibrary } from './pdf-loader.js';
import { markGrid } from './grid-state.js';
// =============================================
// PROMPT PACKS DATA
// =============================================

import { previewProducts } from './product-catalog.js';
const packs = previewProducts.map(product => ({ ...product, samples: product.samples.map(sample => ({ ...sample })) }));
window.packs = packs;



function getPriceCategory(price) {
    if (price === 0) return 'free';
    if (price <= 5) return '1-5';
    if (price <= 15) return '5-15';
    if (price <= 30) return '15-30';
    return '30+';
}

function inferPromptProblem(label, text) {
    const hay = `${label} ${text}`.toLowerCase();
    if (hay.includes('email')) return 'Low reply rate due to unclear or weak messaging.';
    if (hay.includes('seo') || hay.includes('keyword')) return 'Content does not rank or attract qualified organic traffic.';
    if (hay.includes('proposal') || hay.includes('freelance')) return 'Losing deals because offer positioning and pricing are weak.';
    if (hay.includes('ad') || hay.includes('copy')) return 'Paid campaigns underperform due to weak angles and hooks.';
    if (hay.includes('youtube') || hay.includes('hook') || hay.includes('script')) return 'Viewers drop early because openings are not compelling enough.';
    if (hay.includes('image') || hay.includes('midjourney') || hay.includes('thumbnail')) return 'Inconsistent visual outputs and low creative conversion quality.';
    if (hay.includes('product')) return 'Product messaging fails to convert visitors into buyers.';
    return 'Unclear execution system causes inconsistent output quality and slower results.';
}

function inferPromptBestFor(pack) {
    const cat = String(pack.category || '').toLowerCase();
    if (cat.includes('freelanc')) return 'Freelancers, consultants, and service providers.';
    if (cat.includes('seo')) return 'SEO writers, affiliate publishers, and niche-site operators.';
    if (cat.includes('social')) return 'Creators, social media managers, and personal brands.';
    if (cat.includes('video')) return 'YouTubers, creators, and video marketers.';
    if (cat.includes('image') || cat.includes('art')) return 'Designers, ecommerce brands, and ad creatives.';
    if (cat.includes('coding') || cat.includes('claude')) return 'Developers, technical founders, and product teams.';
    if (cat.includes('business')) return 'Founders, marketers, and operators building revenue workflows.';
    return 'Creators and operators who need practical AI execution prompts.';
}

function enrichPromptSample(sample, pack) {
    const base = String(sample.text || '').trim();
    const alreadyStructured = /problem solved:|best for:|output format:/i.test(base);
    if (alreadyStructured) return sample;

    const problem = inferPromptProblem(sample.label || '', base);
    const bestFor = inferPromptBestFor(pack);

    return {
        ...sample,
        text: [
            `Problem solved: ${problem}`,
            `Best for: ${bestFor}`,
            'Use case: Run this prompt when you need practical output that can be deployed immediately.',
            'Prompt:',
            base,
            'Output format required:',
            '- Executive summary or strategy angle',
            '- Step-by-step execution plan',
            '- Final deliverable draft ready to use',
            '- Quality checklist and 3 optimization suggestions',
        ].join('\n')
    };
}

// Catalog prices are explicit, with no permanent launch-discount calculation.
packs.forEach(pack => {
    pack.samples = (pack.samples || []).map(sample => enrichPromptSample(sample, pack));
});

// =============================================
// STATE
// =============================================
let activePlatform = 'all';
let activePriceFilter = 'all';
let activeSort = 'popular';
let searchQuery = '';
let wishlist = new Set(window.getWishlist());
let filteredPacks = [...packs];
let activeModalEl = null;
let lastFocusedEl = null;

const FREE_PACK_TXT_PATH = '/free-starter-chatgpt-pack.txt';


function parseFreePackText(content = '') {
    const lines = String(content).split(/\r?\n/);
    const prompts = [];
    let current = null;

    for (const line of lines) {
        const trimmed = line.trim();
        const titleMatch = trimmed.match(/^(\d+)\)\s+(.+)$/);

        if (titleMatch) {
            if (current) prompts.push(current);
            current = { title: titleMatch[2], body: '' };
            continue;
        }

        if (!current) continue;
        if (!trimmed) continue;
        if (trimmed.toLowerCase().startsWith('download source:')) continue;

        current.body = current.body ? `${current.body}\n${trimmed}` : trimmed;
    }

    if (current) prompts.push(current);
    return prompts;
}

function drawRoundedRect(doc, x, y, w, h, r, style = 'S') {
    doc.roundedRect(x, y, w, h, r, r, style);
}

let downloadPending = false;
async function downloadFreePackPdf() {
    if (downloadPending) return;
    downloadPending = true;
    const buttons = [...document.querySelectorAll('[data-action="download-free-pack"], [data-action="close-preview-download-free-pack"], [data-action="close-modal-download-free-pack"]')];
    buttons.forEach(button => { button.disabled = true; button.setAttribute('aria-busy', 'true'); });
    showToast('Preparing your free prompt PDF...');

    try {
        const [txtResponse, { jsPDF }] = await Promise.all([
            fetch(FREE_PACK_TXT_PATH, { cache: 'no-store' }),
            loadPdfLibrary(),
        ]);

        if (!txtResponse.ok) {
            throw new Error('Could not load free starter pack content.');
        }

        const rawText = await txtResponse.text();
        const prompts = parseFreePackText(rawText);
        if (!prompts.length) {
            throw new Error('No prompts found in starter pack.');
        }

        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const marginX = 42;
        const contentWidth = pageWidth - marginX * 2;
        let y = 56;

        const addFooter = () => {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(99, 115, 129);
            doc.text('SanzyAI • Free Starter ChatGPT Pack', marginX, pageHeight - 24);
            doc.text(`${doc.getCurrentPageInfo().pageNumber}`, pageWidth - marginX, pageHeight - 24, { align: 'right' });
        };

        const ensureSpace = (neededHeight) => {
            if (y + neededHeight <= pageHeight - 56) return;
            addFooter();
            doc.addPage();
            y = 56;
        };

        // Cover / title block
        doc.setFillColor(20, 27, 45);
        drawRoundedRect(doc, marginX, y, contentWidth, 122, 16, 'F');
        doc.setFillColor(65, 124, 255);
        drawRoundedRect(doc, marginX + 18, y + 16, 172, 28, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('FREE DOWNLOAD', marginX + 28, y + 35);
        doc.setFontSize(24);
        doc.text('Starter ChatGPT Prompt Pack', marginX + 18, y + 72);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(214, 222, 255);
        doc.text('10 practical prompts designed for creators, marketers, and beginners.', marginX + 18, y + 96);
        y += 146;

        for (let i = 0; i < prompts.length; i += 1) {
            const p = prompts[i];
            const title = `${i + 1}. ${p.title}`;
            const bodyLines = doc.splitTextToSize(p.body, contentWidth - 30);
            const cardHeight = 52 + bodyLines.length * 15;

            ensureSpace(cardHeight + 12);

            doc.setFillColor(i % 2 === 0 ? 245 : 239, i % 2 === 0 ? 248 : 245, 255);
            doc.setDrawColor(213, 221, 255);
            drawRoundedRect(doc, marginX, y, contentWidth, cardHeight, 12, 'FD');

            doc.setFillColor(65, 124, 255);
            drawRoundedRect(doc, marginX + 12, y + 11, 24, 24, 8, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(255, 255, 255);
            doc.text(String(i + 1), marginX + 20, y + 28);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(20, 27, 45);
            doc.text(title, marginX + 44, y + 28);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10.5);
            doc.setTextColor(51, 65, 85);
            doc.text(bodyLines, marginX + 16, y + 50);

            y += cardHeight + 12;
        }

        ensureSpace(64);
        doc.setFillColor(235, 244, 255);
        drawRoundedRect(doc, marginX, y, contentWidth, 44, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(12, 74, 110);
        doc.text('Tip: Replace bracketed placeholders like [NICHE], [AUDIENCE], [TOPIC] with your real context.', marginX + 14, y + 27);

        addFooter();
        doc.save('sanzyai-free-starter-chatgpt-pack.pdf');
        showToast('Free starter pack downloaded as PDF');
    } catch (error) {
        showToast('Download failed. Please try again.');
    } finally {
        downloadPending = false;
        buttons.forEach(button => { button.disabled = false; button.removeAttribute('aria-busy'); });
    }
}

window.downloadFreePackPdf = downloadFreePackPdf;

function getModalFocusableElements(modalEl) {
    if (!modalEl) return [];
    return Array.from(modalEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter((el) => !el.hasAttribute('disabled'));
}

function openModalDialog(modalEl) {
    if (!modalEl) return;
    lastFocusedEl = document.activeElement;
    activeModalEl = modalEl;
    modalEl.inert = false;
    modalEl.removeAttribute('inert');
    modalEl.classList.add('open');
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-hidden', 'false');
    modalEl.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';

    const focusable = getModalFocusableElements(modalEl);
    if (focusable.length) {
        setTimeout(() => focusable[0].focus(), 0);
    }
}

function closeModalDialog(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.removeAttribute('aria-modal');
    modalEl.inert = true;
    modalEl.setAttribute('inert', '');
    document.body.style.overflow = '';
    if (activeModalEl === modalEl) {
        activeModalEl = null;
    }

    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
    }
}

// =============================================
// RENDER PACKS
// =============================================
function renderPacks() {
    document.querySelectorAll('[data-catalog-count]').forEach(el => { el.textContent = String(packs.length); });
    const grid = document.getElementById('promptGrid');
    markGrid(grid, filteredPacks.length ? 'ready' : 'empty');

    if (filteredPacks.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div style="display:flex;justify-content:center;margin-bottom:16px;">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.6;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <h3>No packs found</h3>
                <p>Try a different filter combination.</p>
                <button type="button" class="btn btn-primary" style="margin-top:16px;" data-action="reset-filters">Show All Packs</button>
            </div>`;
        document.getElementById('packCount').textContent = '0 packs found';
        return;
    }

    document.getElementById('packCount').textContent = `Showing ${filteredPacks.length} pack${filteredPacks.length !== 1 ? 's' : ''}`;

    grid.innerHTML = filteredPacks.map(pack => {
        const stars = renderStars(pack.rating);
        const isWished = wishlist.has(pack.id);
        const discount = pack.origPrice
            ? Math.round((1 - pack.price / pack.origPrice) * 100)
            : 0;

        return `
        <div class="prod-card ui-card ${pack.cardClass}" data-id="${pack.id}">
            <!-- Thumbnail -->
            <div class="prod-thumb" style="background:${pack.bgColor};">
                ${pack.image ? `<img class="prod-image" src="${pack.image}" alt="" width="600" height="360" loading="lazy" decoding="async">` : ''}
                ${pack.badge ? `
                <div class="thumb-badge">
                    <span class="pack-badge ${pack.badgeClass}">${pack.badge}</span>
                </div>` : ''}

                <button class="wish-btn ${isWished ? 'active' : ''}"
                    type="button" data-action="toggle-wish" data-pack-id="${pack.id}" title="Save to wishlist" aria-label="Save to wishlist">
                    ${isWished 
                        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' 
                        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>'}
                </button>

                <div class="prompt-count-badge">Editable samples</div>
            </div>

            <!-- Body -->
            <div class="card-body">
                <div class="card-cat-row">
                    ${pack.platforms.slice(0,2).map((p,i) => `
                        <span class="cat-chip ${i===0?'ai-chip':''}">${getPlatformLabel(p)}</span>
                    `).join('')}
                </div>

                <div class="card-title">${pack.name}</div>
                <div class="card-price-row">
                    <span class="price-main ${pack.price === 0 ? 'free' : ''}">
                        ${pack.status === 'paused' ? 'Under quality review' : ('USD ' + pack.price.toFixed(2))}
                    </span>
                    ${pack.origPrice ? `<span class="price-orig">$${pack.origPrice}</span>` : ''}
                    ${discount > 0 ? `<span class="price-save">${discount}% OFF</span>` : ''}
                </div>

                <!-- What's Included -->
                <div class="included-section">
                    <div class="included-title">What's Included</div>
                    <div class="included-list">
                        ${pack.included.slice(0,3).map(item => `
                            <div class="included-item">${item}</div>
                        `).join('')}
                        ${pack.included.length > 3 ? `
                            <div class="included-item included-more">+ ${pack.included.length - 3} more...</div>
                        ` : ''}
                    </div>
                </div>

                <!-- Actions -->
                <div class="card-actions">
                    <button type="button" class="preview-btn ui-button" data-action="open-preview" data-pack-id="${pack.id}">
                        Preview
                    </button>
                    ${pack.status === 'paused' ? `<button type="button" class="buy-btn" disabled>Purchases paused</button>` : pack.isFree
                        ? `<button type="button" class="buy-btn free-btn" data-action="download-free-pack">Get Free Pack</button>`
                        : `<a href="${pack.link}" target="_blank" rel="noopener sponsored" class="buy-btn">Buy Now — $${pack.price.toFixed(2)}</a>`
                    }
                </div>
            </div>
        </div>`;
    }).join('');
}

function getPlatformLabel(p) {
    const labels = {
        chatgpt:'ChatGPT', midjourney:'Midjourney',
        claude:'Claude', gemini:'Gemini',
        'stable-diffusion':'SD', runway:'Runway',
        business:'Business', seo:'SEO',
        social:'Social', art:'Art',
        freelance:'Freelance', video:'YouTube'
    };
    return labels[p] || p;
}


function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            html += `<span class="star-y">★</span>`;
        } else if (i - rating < 1 && i > Math.floor(rating)) {
            // Partial star using CSS clip
            const pct = Math.round((rating - Math.floor(rating)) * 100);
            html += `<span class="star-partial" style="--fill:${pct}%">★</span>`;
        } else {
            html += `<span class="star-e">★</span>`;
        }
    }
    return html;
}

// =============================================
// FILTERS
// =============================================
window.filterPlatform = function(btn, platform) {
    activePlatform = platform;
    document.querySelectorAll('[data-platform]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyAllFilters();
}

window.filterPrice = function(btn, range) {
    if (activePriceFilter === range) {
        activePriceFilter = 'all';
        document.querySelectorAll('[data-price]').forEach(b => {
            b.classList.remove('active','active-free','active-price');
        });
    } else {
        activePriceFilter = range;
        document.querySelectorAll('[data-price]').forEach(b => {
            b.classList.remove('active','active-free','active-price');
        });
        btn.classList.add(range === 'free' ? 'active-free' : 'active-price');
    }
    applyAllFilters();
}

function applyAllFilters() {
    filteredPacks = packs.filter(pack => {
        // Platform/category filter
        const matchPlatform = activePlatform === 'all' || pack.platforms.includes(activePlatform);

        // Price filter
        let matchPrice = true;
        if (activePriceFilter === 'free') matchPrice = pack.price === 0;
        else if (activePriceFilter === '1-5') matchPrice = pack.price >= 1 && pack.price <= 5;
        else if (activePriceFilter === '5-15') matchPrice = pack.price > 5 && pack.price <= 15;
        else if (activePriceFilter === '15-30') matchPrice = pack.price > 15 && pack.price <= 30;
        else if (activePriceFilter === '30+') matchPrice = pack.price > 30;

        const haystack = [
            pack.name,
            pack.category,
            pack.desc,
            ...(pack.included || []),
            ...(pack.platforms || [])
        ].join(' ').toLowerCase();
        const matchSearch = !searchQuery || haystack.includes(searchQuery);

        return matchPlatform && matchPrice && matchSearch;
    });
    sortPacksData();
    renderPacks();
}

window.sortPacks = function() {
    activeSort = document.getElementById('sortSel')?.value || 'popular';
    sortPacksData();
    renderPacks();
}

window.filterPlatformSelect = function() {
    activePlatform = document.getElementById('platformSel')?.value || 'all';
    applyAllFilters();
}

window.filterPriceSelect = function() {
    activePriceFilter = document.getElementById('priceSel')?.value || 'all';
    applyAllFilters();
}

window.filterSearchInput = function() {
    searchQuery = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
    applyAllFilters();
}

function sortPacksData() {
    filteredPacks.sort((a, b) => {
        switch(activeSort) {
            case 'popular': return b.reviews - a.reviews;
            case 'new': return b.id - a.id;
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'rating': return b.rating - a.rating;
            default: return b.reviews - a.reviews;
        }
    });
}

window.resetFilters = function() {
    activePlatform = 'all';
    activePriceFilter = 'all';
    searchQuery = '';
    const platformSel = document.getElementById('platformSel');
    const priceSel = document.getElementById('priceSel');
    const sortSel = document.getElementById('sortSel');
    const searchInput = document.getElementById('searchInput');

    if (platformSel) platformSel.value = 'all';
    if (priceSel) priceSel.value = 'all';
    if (sortSel) sortSel.value = 'popular';
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('[data-platform]').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('[data-platform="all"]');
    if (allBtn) allBtn.classList.add('active');
    document.querySelectorAll('[data-price]').forEach(b => {
        b.classList.remove('active','active-free','active-price');
    });
    filteredPacks = [...packs];
    sortPacksData();
    renderPacks();
}

// =============================================
// WISHLIST
// =============================================
window.toggleWish = function(id, btn) {
    const isAdded = window.toggleWishlistItem(id);
    const filledIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
    const outlineIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
    if (isAdded) {
        wishlist.add(id);
        btn.innerHTML = filledIcon;
        btn.classList.add('active');
    } else {
        wishlist.delete(id);
        btn.innerHTML = outlineIcon;
        btn.classList.remove('active');
    }
}

// Sync wishlist on global update
window.addEventListener('wishlistUpdated', (e) => {
    wishlist = new Set(e.detail);
    renderPacks();
});

// =============================================
// PRODUCT DETAIL MODAL
// =============================================
window.openProduct = function(id) {
    const pack = packs.find(p => p.id === id);
    if (!pack) return;

    const fbtPacks = pack.status === 'paused' ? [] : pack.fbt.map(fid => packs.find(p => p.id === fid)).filter(Boolean);
    const modal = document.getElementById('modalContent');
    const discount = pack.origPrice ? Math.round((1-pack.price/pack.origPrice)*100) : 0;

    modal.innerHTML = `
        <div class="modal-header">
            <span class="modal-title">${pack.name}</span>
            <button type="button" class="modal-close" data-action="close-modal">&times;</button>
        </div>

        <div class="modal-body">
            <div class="modal-left">
                <!-- Thumb -->
                <div class="modal-thumb" style="background:${pack.image ? `url('${pack.image}') center/cover` : pack.bgColor};">
                    <div style="position:absolute;bottom:10px;right:10px;background:#FFF;padding:6px 12px;border-radius:6px;font-family:var(--fh);font-size:0.76rem;font-weight:700;color:#1A1A24;box-shadow:0 4px 12px rgba(0,0,0,0.15);">Draft under review</div>
                </div>

                <!-- Badges -->
                <div class="modal-badges">
                    ${pack.badge ? `<span class="pack-badge ${pack.badgeClass}">${pack.badge}</span>` : ''}
                    ${pack.platforms.map(p => `<span class="cat-chip ai-chip">${getPlatformLabel(p)}</span>`).join('')}
                </div>

                <!-- Description -->
                <p class="modal-desc">${pack.desc}</p>

                <!-- Full included list -->
                <div class="included-section" style="margin-bottom:16px;">
                    <div class="included-title">Everything Included (${pack.included.length} items)</div>
                    <div class="included-list">
                        ${pack.included.map(item => `<div class="included-item">${item}</div>`).join('')}
                    </div>
                </div>

                <!-- Free Samples -->
                <div class="samples-section">
                    <div class="samples-title">${pack.samples.length} Free Sample Prompts <span style="font-size:0.75rem;color:var(--muted);font-weight:400;">(draft under review)</span></div>
                    ${pack.samples.map(s => `
                        <div class="sample-prompt">
                            <div class="sample-prompt-label">${s.label}</div>
                            <div class="sample-prompt-text">${s.text}</div>
                            <button type="button" class="sample-copy-btn" data-action="copy-prompt" data-prompt="${encodeURIComponent(s.text)}" title="Copy prompt"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                        </div>
                    `).join('')}
                </div>
                <p>Customer reviews will be shown once verified.</p>
            </div>

            <div class="modal-right">
                <!-- Price Box -->
                <div class="modal-price-box">
                    <div class="mprice ${pack.price === 0 ? 'mfree' : ''}">
                        ${pack.status === 'paused' ? 'Under quality review' : pack.price === 0 ? 'FREE' : `${pack.price}`} 
                        ${pack.origPrice ? `<span class="mprice-orig">$${pack.origPrice}</span>` : ''}
                        ${discount > 0 ? `<span class="price-save">${discount}% OFF</span>` : ''}
                    </div>
                    <p class="mprice-label">Draft templates · Purchases paused</p>

                    ${pack.status === 'paused' ? `<button type="button" class="buy-btn" disabled>Purchases paused</button>` : pack.isFree
                        ? `<button type="button" class="btn btn-green btn-lg modal-buy-btn" data-action="close-modal-download-free-pack">
                                Get Free Pack
                           </button>`
                        : `<a href="${pack.link}" target="_blank" rel="noopener sponsored" class="btn btn-primary btn-lg modal-buy-btn">
                                Buy Now — $${pack.price}
                           </a>`
                    }

                    <button type="button" class="btn btn-outline modal-preview-btn" data-action="close-modal-open-preview" data-pack-id="${pack.id}">
                        Preview Free Sample Prompts
                    </button>

                    <div class="modal-perks">
                        <div class="modal-perk"><span class="modal-perk-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span> Secure payment via Stripe / PayPal</div>
                        <div class="modal-perk"><span class="modal-perk-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span> Instant download after purchase</div>
                        <div class="modal-perk"><span class="modal-perk-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span> Review the sample before buying</div>
                        <div class="modal-perk"><span class="modal-perk-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span> Check product update terms at checkout</div>
                        <div class="modal-perk"><span class="modal-perk-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span> Customer support via email</div>
                    </div>
                </div>

                <!-- Trust badges -->
                <div class="modal-trust">
                    <div class="trust-chip">Secure SSL</div>
                    <div class="trust-chip">Instant Download</div>
                    <div class="trust-chip">Verified Quality</div>
                </div>
            </div>
        </div>

        <!-- Frequently Bought Together -->
        ${fbtPacks.length > 0 ? `
        <div class="fbt-section">
            <div class="fbt-title">Frequently Bought Together</div>
            <div class="fbt-row">
                <div class="fbt-item" data-action="fbt-open-product" data-pack-id="${pack.id}" role="button" tabindex="0">
                    <div class="fbt-info">
                        <div class="fbt-name">${pack.name.substring(0,28)}...</div>
                        <div class="fbt-price">${pack.price === 0 ? 'FREE' : '$'+pack.price}</div>
                    </div>
                </div>
                <span class="fbt-plus">+</span>
                ${fbtPacks.map(fp => `
                    <div class="fbt-item" data-action="fbt-open-product" data-pack-id="${fp.id}" data-delay="200" role="button" tabindex="0">
                        <div class="fbt-info">
                            <div class="fbt-name">${fp.name.substring(0,28)}...</div>
                            <div class="fbt-price">${fp.price === 0 ? 'FREE' : '$'+fp.price}</div>
                        </div>
                    </div>
                `).join('<span class="fbt-plus">+</span>')}
                <div style="flex-shrink:0;">
                    <div style="font-size:0.8rem;color:var(--muted);margin-bottom:6px;">Bundle price:</div>
                    <div style="font-family:var(--fh);font-weight:700;font-size:1.2rem;color:var(--accent);">
                        $${pack.price + fbtPacks.reduce((s,fp)=>s+fp.price,0)}
                    </div>
                </div>
            </div>
        </div>` : ''}
    `;


    openModalDialog(document.getElementById('prodModal'));
}

window.closeModal = function() {
    closeModalDialog(document.getElementById('prodModal'));
}

// =============================================
// PREVIEW MODAL
// =============================================
window.openPreview = function(id) {
    const pack = packs.find(p => p.id === id);
    if (!pack) return;

    document.getElementById('previewTitle').textContent = `Preview: ${pack.name}`;
    document.getElementById('previewBody').innerHTML = `
        <div class="preview-note">
            <span><strong>2 free sample prompts</strong> shown. This draft is under quality review; purchasing is paused. Samples are editable. Check the listed platform and test the output for your use case.</span>
        </div>
        ${pack.samples.slice(0,2).map((s,i) => `
            <div class="sample-prompt">
                <div class="sample-prompt-label">Sample ${i+1}: ${s.label}</div>
                <div class="sample-prompt-text">${s.text}</div>
                <button type="button" class="sample-copy-btn" data-action="copy-prompt" data-prompt="${encodeURIComponent(s.text)}" title="Copy"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
            </div>
        `).join('')}
        <div style="text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid var(--border-s);">
            <p style="color:var(--muted);font-size:0.86rem;margin-bottom:16px;">Purchases are paused while we verify distinct content and delivery files.</p>
            ${pack.status === 'paused' ? `<button type="button" class="buy-btn" disabled>Purchases paused</button>` : pack.isFree
                ? `<button type="button" class="btn btn-green btn-lg" data-action="close-preview-download-free-pack">Get Free Pack</button>`
                : `<a href="${pack.link}" target="_blank" rel="noopener"
                       class="btn btn-primary btn-lg"
                       data-action="open-checkout">
                       Buy Full Pack — $${pack.price}
                   </a>`
            }
        </div>`;

    openModalDialog(document.getElementById('previewModal'));
}

window.closePreview = function() {
    closeModalDialog(document.getElementById('previewModal'));
}

// =============================================
// COPY PROMPT
// =============================================
window.copyPrompt = function(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Prompt copied to clipboard!');
        const orig = btn.innerHTML;
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }).catch(() => {
        showToast('Copy manually from the text box');
    });
}


// =============================================
// EMAIL MODAL (Free Pack)
// =============================================
window.openEmailModal = function() {
    openModalDialog(document.getElementById('emailModal'));
}

window.closeEmailModal = function() {
    closeModalDialog(document.getElementById('emailModal'));
}

window.handleFreeDownload = async function(e) {
    e.preventDefault();
    await window.downloadFreePackPdf();
    window.closeEmailModal();
    const form = e.target;
    form.reset();
}

// =============================================
// SELL APPLY
// =============================================
window.handleSellApply = function(event) {
    event.preventDefault();
    showToast('Email hello@sanzyai.com to discuss selling a pack. Your application has not been sent.');
};

// =============================================
// HAMBURGER
// =============================================
const ham = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileMenu');
if (ham && mobileNav) {
    ham.addEventListener('click', () => {
        ham.classList.toggle('active');
        mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => { ham.classList.remove('active'); mobileNav.classList.remove('open'); });
    });
}

// =============================================
// SCROLL TOP
// =============================================
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('vis', window.scrollY > 400);
    });
}

// =============================================
// CLOSE MODALS ON OVERLAY CLICK
// =============================================
document.getElementById('prodModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});
document.getElementById('emailModal').addEventListener('click', function(e) {
    if (e.target === this) closeEmailModal();
});
document.getElementById('previewModal').addEventListener('click', function(e) {
    if (e.target === this) closePreview();
});

// Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Tab' && activeModalEl) {
        const focusable = getModalFocusableElements(activeModalEl);
        if (focusable.length) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;

            if (e.shiftKey && active === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    if (e.key === 'Escape') {
        closeModal();
        closePreview();
        closeEmailModal();
    }
});

// =============================================
// TOAST
// =============================================
let toastT;
function showToast(msg, icon = '') {
    clearTimeout(toastT);
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    const iconEl = document.getElementById('toastIcon');
    if (iconEl) {
        if (icon) {
            iconEl.innerHTML = icon;
        } else {
            iconEl.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
        }
    }
    t.classList.add('show');
    toastT = setTimeout(() => t.classList.remove('show'), 3200);
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput')?.addEventListener('input', () => window.filterSearchInput());
    document.getElementById('platformSel')?.addEventListener('change', () => window.filterPlatformSelect());
    document.getElementById('priceSel')?.addEventListener('change', () => window.filterPriceSelect());
    document.getElementById('sortSel')?.addEventListener('change', () => window.sortPacks());
    document.getElementById('emailModalCloseBtn')?.addEventListener('click', () => window.closeEmailModal());
    document.getElementById('previewCloseBtn')?.addEventListener('click', () => window.closePreview());
    document.getElementById('freeDownloadForm')?.addEventListener('submit', (event) => window.handleFreeDownload(event));

    sortPacksData();
    renderPacks();

    document.addEventListener('click', (event) => {
        const actionEl = event.target.closest('[data-action]');
        if (!actionEl) return;

        const action = actionEl.dataset.action;
        const packIdAttr = actionEl.dataset.packId;
        const packId = (packIdAttr !== undefined && packIdAttr !== null) ? Number(packIdAttr) : null;

        switch (action) {
            case 'reset-filters':
                window.resetFilters();
                break;
            case 'toggle-wish':
                if (packId !== null) window.toggleWish(packId, actionEl);
                break;
            case 'open-preview':
                if (packId !== null) window.openPreview(packId);
                break;
            case 'open-email-modal':
                window.downloadFreePackPdf();
                break;
            case 'download-free-pack':
                window.downloadFreePackPdf();
                break;
            case 'open-product':
                if (packId) window.openProduct(packId);
                break;
            case 'close-modal':
                window.closeModal();
                break;
            case 'close-modal-open-email':
                window.closeModal();
                window.downloadFreePackPdf();
                break;
            case 'close-modal-download-free-pack':
                window.closeModal();
                window.downloadFreePackPdf();
                break;
            case 'close-modal-open-preview':
                window.closeModal();
                if (packId) window.openPreview(packId);
                break;
            case 'close-preview-open-email':
                window.closePreview();
                window.downloadFreePackPdf();
                break;
            case 'close-preview-download-free-pack':
                window.closePreview();
                window.downloadFreePackPdf();
                break;
            case 'open-secure-checkout':
                showToast('Opening secure checkout...');
                break;
            case 'open-checkout':
                showToast('Opening checkout...');
                break;
            case 'copy-prompt': {
                const prompt = decodeURIComponent(actionEl.dataset.prompt || '');
                if (prompt) window.copyPrompt(prompt, actionEl);
                break;
            }
            case 'fbt-open-product': {
                if (!packId) break;
                window.closeModal();
                const delay = Number(actionEl.dataset.delay || '0');
                if (delay > 0) {
                    setTimeout(() => window.openProduct(packId), delay);
                } else {
                    window.openProduct(packId);
                }
                break;
            }
            default:
                break;
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const el = event.target.closest('[data-action="fbt-open-product"]');
        if (!el || event.target !== el) return;
        event.preventDefault();
        el.click();
    });



    // =============================================
    // HASH HANDLER — scroll to free pack
    // =============================================
    if (window.location.hash === '#free') {
        setTimeout(() => {
            const freeCard = document.getElementById('free');
            if (freeCard) freeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
});
