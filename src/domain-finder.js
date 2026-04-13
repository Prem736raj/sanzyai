// ============================================
// DATA
// ============================================
const registrars = [
    {
        id: 'spaceship',
        name: 'Spaceship',
        tag: 'New & Rising',
        emoji: '🚀',
        color: '#6C35DE',
        bg: 'rgba(108,53,222,0.15)',
        register: 8.88,
        renewal: 10.88,
        transfer: 8.88,
        rating: 4.4,
        offer: 'No hidden fees',
        coupon: null,
        link: 'https://spaceship.com',
        isBest: true
    },
    {
        id: 'hostinger',
        name: 'Hostinger',
        tag: 'Budget Friendly',
        emoji: '⚡',
        color: '#FF6B35',
        bg: 'rgba(255,107,53,0.15)',
        register: 8.99,
        renewal: 14.99,
        transfer: 8.99,
        rating: 4.5,
        offer: 'Bundle with hosting',
        coupon: 'HOSTIN20',
        link: 'https://hostinger.com',
        isBest: false
    },
    {
        id: 'cloudflare',
        name: 'Cloudflare',
        tag: 'At-cost Pricing',
        emoji: '☁️',
        color: '#F6821F',
        bg: 'rgba(246,130,31,0.15)',
        register: 9.15,
        renewal: 9.15,
        transfer: 9.15,
        rating: 4.7,
        offer: 'Zero markup policy',
        coupon: null,
        link: 'https://cloudflare.com/products/registrar',
        isBest: false
    },
    {
        id: 'porkbun',
        name: 'Porkbun',
        tag: 'Privacy Included',
        emoji: '🐷',
        color: '#FF69B4',
        bg: 'rgba(255,105,180,0.15)',
        register: 9.73,
        renewal: 9.73,
        transfer: 8.98,
        rating: 4.6,
        offer: 'Free WHOIS privacy',
        coupon: null,
        link: 'https://porkbun.com',
        isBest: false
    },
    {
        id: 'namecheap',
        name: 'Namecheap',
        tag: 'Most Popular',
        emoji: '✂️',
        color: '#DE3723',
        bg: 'rgba(222,55,35,0.15)',
        register: 9.98,
        renewal: 13.98,
        transfer: 8.98,
        rating: 4.5,
        offer: 'Free privacy + email',
        coupon: 'CHEAP2025',
        link: 'https://namecheap.com',
        isBest: false
    },
    {
        id: 'dynadot',
        name: 'Dynadot',
        tag: 'Feature Rich',
        emoji: '🎯',
        color: '#00A651',
        bg: 'rgba(0,166,81,0.15)',
        register: 10.99,
        renewal: 12.99,
        transfer: 9.99,
        rating: 4.3,
        offer: 'Free email forwarding',
        coupon: null,
        link: 'https://dynadot.com',
        isBest: false
    },
    {
        id: 'ionos',
        name: 'IONOS',
        tag: '🔥 Promo Deal',
        emoji: '🔵',
        color: '#003D8F',
        bg: 'rgba(0,61,143,0.2)',
        register: 1.00,
        renewal: 15.00,
        transfer: 10.00,
        rating: 4.0,
        offer: '$1 first year promo',
        coupon: 'IONOS1',
        link: 'https://ionos.com',
        isBest: false,
        promoNote: '$1 first year only'
    },
    {
        id: 'google',
        name: 'Google Domains',
        tag: 'Simple & Clean',
        emoji: '🔍',
        color: '#4285F4',
        bg: 'rgba(66,133,244,0.15)',
        register: 12.00,
        renewal: 12.00,
        transfer: 12.00,
        rating: 4.4,
        offer: 'Google integration',
        coupon: null,
        link: 'https://domains.google',
        isBest: false
    },
    {
        id: 'godaddy',
        name: 'GoDaddy',
        tag: 'Market Leader',
        emoji: '🤠',
        color: '#00A4A6',
        bg: 'rgba(0,164,166,0.15)',
        register: 12.99,
        renewal: 22.99,
        transfer: 10.99,
        rating: 4.1,
        offer: 'Bundle discounts',
        coupon: 'GDDY30',
        link: 'https://godaddy.com',
        isBest: false
    },
    {
        id: 'namedotcom',
        name: 'Name.com',
        tag: 'Established',
        emoji: '📝',
        color: '#2D7DD2',
        bg: 'rgba(45,125,210,0.15)',
        register: 13.99,
        renewal: 16.99,
        transfer: 9.99,
        rating: 4.2,
        offer: 'Free privacy & email',
        coupon: null,
        link: 'https://name.com',
        isBest: false
    }
];

const coupons = [
    { reg: 'GoDaddy', code: 'GDDY30', discount: '30% OFF', desc: 'Valid on new registrations. Minimum cart value may apply.' },
    { reg: 'Namecheap', code: 'CHEAP2025', discount: '20% OFF', desc: 'Applies to .com domains. Single use per account.' },
    { reg: 'Hostinger', code: 'HOSTIN20', discount: '20% OFF', desc: 'Works on domain + hosting bundles. Great savings!' },
    { reg: 'IONOS', code: 'IONOS1', discount: '$1 Deal', desc: '$1 first year on select TLDs. Renews at standard rate.' },
    { reg: 'Porkbun', code: 'PORKFREE', discount: 'Free Privacy', desc: 'Free WHOIS privacy on all domains. No code needed at checkout.' },
    { reg: 'Dynadot', code: 'DYNA10', discount: '10% OFF', desc: 'Valid on new registrations over $5. Limited time offer.' },
];

const tldData = [
    { ext: '.com', avg: '$10.50', namecheap: 9.98, godaddy: 12.99, porkbun: 9.73, hostinger: 8.99, cloudflare: 9.15, spaceship: 8.88, ionos: 1.00, google: 12.00 },
    { ext: '.net', avg: '$11.20', namecheap: 10.98, godaddy: 13.99, porkbun: 10.73, hostinger: 9.99, cloudflare: 9.77, spaceship: 9.88, ionos: 10.00, google: 12.00 },
    { ext: '.org', avg: '$10.80', namecheap: 11.98, godaddy: 11.99, porkbun: 10.73, hostinger: 9.99, cloudflare: 9.93, spaceship: 9.88, ionos: 10.00, google: 12.00 },
    { ext: '.io',  avg: '$32.50', namecheap: 32.98, godaddy: 39.99, porkbun: 28.98, hostinger: 29.99, cloudflare: 30.15, spaceship: 27.88, ionos: 35.00, google: 30.00 },
    { ext: '.co',  avg: '$9.80',  namecheap: 9.98, godaddy: 11.99, porkbun: 8.98, hostinger: 8.99, cloudflare: 9.15, spaceship: 8.88, ionos: 9.00, google: 10.00 },
    { ext: '.ai',  avg: '$69.00', namecheap: 69.98, godaddy: 79.99, porkbun: 64.98, hostinger: 65.99, cloudflare: 68.15, spaceship: 62.88, ionos: 70.00, google: 70.00 },
    { ext: '.app', avg: '$14.00', namecheap: 14.98, godaddy: 16.99, porkbun: 13.73, hostinger: 12.99, cloudflare: 14.00, spaceship: 12.88, ionos: 15.00, google: 14.00 },
    { ext: '.xyz', avg: '$2.20',  namecheap: 1.98, godaddy: 2.99, porkbun: 1.98, hostinger: 1.99, cloudflare: 2.15, spaceship: 1.98, ionos: 1.00, google: 3.00 },
];

const tldRegistrars = ['Namecheap','GoDaddy','Porkbun','Hostinger','Cloudflare','Spaceship','IONOS','Google'];

// ============================================
// STATE
// ============================================
let currentDomain = '';
let currentTLD = '.com';
let currentSort = { col: 'register', dir: 'asc' };
let currentView = 'table';
let tableData = [...registrars];

// ============================================
// INIT
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    initDomainFinder();
    
    // Auto-run a demo search
    setTimeout(() => {
        const input = document.getElementById('domainInput');
        if (input) {
            input.value = 'mybusiness.com';
            searchDomain();
        }
    }, 600);
});

function initDomainFinder() {
    renderCoupons();
    renderTLDTable();
    renderCalculator(1);

    // Allow Enter key search
    const domainInput = document.getElementById('domainInput');
    if (domainInput) {
        domainInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') searchDomain();
        });
    }

    // Scroll To Top
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        });
    }

    // Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        mobileMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }
}

// ============================================
// TLD PILL SELECT
// ============================================
window.selectTLD = function(el, tld) {
    currentTLD = tld;
    document.querySelectorAll('.tld-pill').forEach(p => p.classList.remove('active'));
    el.classList.add('active');

    const input = document.getElementById('domainInput');
    const val = input.value.trim();
    if (val) {
        const baseName = val.includes('.') ? val.split('.')[0] : val;
        input.value = baseName + tld;
    } else {
        input.value = 'mybusiness' + tld;
    }
}

// ============================================
// SEARCH
// ============================================
window.searchDomain = function() {
    const input = document.getElementById('domainInput');
    if (!input) return;
    
    let domain = input.value.trim();

    if (!domain) {
        shakeInput();
        return;
    }

    // Auto-append TLD if no dot
    if (!domain.includes('.')) {
        domain += currentTLD;
        input.value = domain;
    }

    currentDomain = domain;

    // Show loading
    const btn = document.getElementById('searchBtn');
    const loadingBar = document.getElementById('loadingBar');
    
    if (btn) btn.classList.add('loading');
    if (loadingBar) loadingBar.classList.add('active');

    // Show "checking" state immediately
    showAvailStatus('checking', domain);

    // Check availability + show results in parallel
    checkDomainAvailability(domain).then(status => {
        if (btn) btn.classList.remove('loading');
        if (loadingBar) loadingBar.classList.remove('active');
        
        showAvailStatus(status, domain);
        showResults(domain, status);
    });
}

// ============================================
// DOMAIN AVAILABILITY CHECK (via Google DNS)
// ============================================
async function checkDomainAvailability(domain) {
    try {
        // Use Google's public DNS-over-HTTPS resolver
        // Status 0 = NOERROR (domain has DNS records → registered)
        // Status 3 = NXDOMAIN (domain doesn't exist → likely available)
        const response = await fetch(
            `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=NS`,
            { signal: AbortSignal.timeout(6000) }
        );
        
        if (!response.ok) return 'unknown';
        
        const data = await response.json();
        
        if (data.Status === 3) {
            // NXDOMAIN — domain does not exist in DNS
            return 'available';
        }
        
        if (data.Status === 0) {
            // NOERROR — domain has DNS records, it's registered
            return 'taken';
        }
        
        return 'unknown';
    } catch (error) {
        console.warn('DNS check failed:', error);
        return 'unknown';
    }
}

// ============================================
// AVAILABILITY STATUS UI
// ============================================
function showAvailStatus(status, domain) {
    const el = document.getElementById('availStatus');
    if (!el) return;

    el.style.display = 'flex';
    el.className = 'avail-status ' + status;

    const baseName = domain.includes('.') ? domain.split('.')[0] : domain;

    if (status === 'checking') {
        el.innerHTML = `
            <div class="avail-icon">🔄</div>
            <div class="avail-body">
                <div class="avail-title">Checking availability for ${domain}...</div>
                <div class="avail-desc">Querying DNS records to verify if this domain is registered.</div>
            </div>
        `;
        return;
    }

    if (status === 'available') {
        el.innerHTML = `
            <div class="avail-icon">✅</div>
            <div class="avail-body">
                <div class="avail-title">${domain} appears to be available!</div>
                <div class="avail-desc">Great news! This domain doesn't have DNS records, which means it's likely available for registration. Compare prices below and grab it before someone else does!</div>
            </div>
        `;
        return;
    }

    if (status === 'taken') {
        // Generate alternative suggestions
        const alts = ['.net', '.io', '.co', '.ai', '.app', '.xyz']
            .filter(ext => !domain.endsWith(ext))
            .slice(0, 5)
            .map(ext => baseName + ext);

        el.innerHTML = `
            <div class="avail-icon">❌</div>
            <div class="avail-body">
                <div class="avail-title">${domain} is already taken</div>
                <div class="avail-desc">This domain is already registered by someone else. You can try to purchase it on the aftermarket, or register one of these alternatives:</div>
                <div class="avail-suggestions">
                    ${alts.map(alt => `<span class="avail-sug-chip" onclick="trySuggestion('${alt}')">${alt}</span>`).join('')}
                </div>
            </div>
        `;
        return;
    }

    // Unknown
    el.innerHTML = `
        <div class="avail-icon">⚠️</div>
        <div class="avail-body">
            <div class="avail-title">Couldn't verify availability for ${domain}</div>
            <div class="avail-desc">We were unable to check this domain's DNS records. Please verify availability directly on the registrar's website before purchasing.</div>
        </div>
    `;
}

// Click a suggestion chip to search that domain
window.trySuggestion = function(domain) {
    const input = document.getElementById('domainInput');
    if (input) {
        input.value = domain;
        searchDomain();
    }
}

function shakeInput() {
    const box = document.getElementById('searchBox');
    if (!box) return;
    box.style.animation = 'shake 0.4s ease';
    box.style.borderColor = 'var(--red)';
    setTimeout(() => {
        box.style.animation = '';
        box.style.borderColor = '';
    }, 500);
}

// Add shake keyframe dynamically
if (!document.getElementById('shake-keyframes')) {
    const shakeStyle = document.createElement('style');
    shakeStyle.id = 'shake-keyframes';
    shakeStyle.textContent = `@keyframes shake {
        0%,100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-6px); }
        80% { transform: translateX(6px); }
    }`;
    document.head.appendChild(shakeStyle);
}

// ============================================
// TLD-AWARE PRICE ADJUSTMENT
// ============================================
function getAdjustedRegistrars(domain) {
    // Extract the TLD from the domain
    const dotIndex = domain.lastIndexOf('.');
    const tld = dotIndex !== -1 ? domain.substring(dotIndex) : '.com';
    
    // Find matching TLD data
    const tld_info = tldData.find(t => t.ext === tld);
    
    if (!tld_info) {
        // TLD not in our data — return base registrars unchanged
        return registrars.map(r => ({ ...r }));
    }
    
    // Map registrar IDs to their tldData keys
    const tldKeyMap = {
        'namecheap': 'namecheap',
        'godaddy': 'godaddy',
        'porkbun': 'porkbun',
        'hostinger': 'hostinger',
        'cloudflare': 'cloudflare',
        'spaceship': 'spaceship',
        'ionos': 'ionos',
        'google': 'google'
    };
    
    // .com base prices from tldData (used to calculate proportional prices for unlisted registrars)
    const comData = tldData.find(t => t.ext === '.com');
    const avgComPrice = comData ? parseFloat(comData.avg.replace('$', '')) : 10.50;
    const avgTldPrice = parseFloat(tld_info.avg.replace('$', ''));
    const priceMultiplier = avgTldPrice / avgComPrice;
    
    return registrars.map(r => {
        const adjusted = { ...r };
        const tldKey = tldKeyMap[r.id];
        
        if (tldKey && tld_info[tldKey] !== undefined) {
            // Use exact TLD-specific price from our data
            adjusted.register = tld_info[tldKey];
            // Scale renewal and transfer proportionally
            const ratio = tld_info[tldKey] / (comData && comData[tldKey] ? comData[tldKey] : r.register);
            adjusted.renewal = Math.round(r.renewal * ratio * 100) / 100;
            adjusted.transfer = Math.round(r.transfer * ratio * 100) / 100;
        } else {
            // Registrar not in tldData — use proportional multiplier
            adjusted.register = Math.round(r.register * priceMultiplier * 100) / 100;
            adjusted.renewal = Math.round(r.renewal * priceMultiplier * 100) / 100;
            adjusted.transfer = Math.round(r.transfer * priceMultiplier * 100) / 100;
        }
        
        // Clear promo notes for non-.com TLDs since promos are usually .com-only
        if (tld !== '.com' && tld !== '.xyz') {
            adjusted.promoNote = null;
            if (r.id === 'ionos') {
                adjusted.tag = 'Global Provider';
            }
        }
        
        // Update isBest dynamically
        adjusted.isBest = false;
        
        return adjusted;
    });
}

// ============================================
// SHOW RESULTS
// ============================================
function showResults(domain, availStatus) {
    // Update info
    const resDomain = document.getElementById('resultDomain');
    const resCount = document.getElementById('resultCount');
    if (resDomain) resDomain.textContent = domain;

    // Get TLD-adjusted prices
    const adjustedRegistrars = getAdjustedRegistrars(domain);
    
    // Mark the cheapest one as best
    const sorted = [...adjustedRegistrars].sort((a, b) => a.register - b.register);
    if (sorted.length > 0) sorted[0].isBest = true;
    // Apply isBest back
    adjustedRegistrars.forEach(r => {
        r.isBest = r.id === sorted[0]?.id;
    });

    if (resCount) resCount.textContent = adjustedRegistrars.length;

    // Update best deal banner
    const best = sorted[0];
    const bestPrice = document.getElementById('bestDealPrice');
    const bestName = document.getElementById('bestDealName');
    const bestSub = document.getElementById('bestDealSub');
    const bestBtn = document.getElementById('bestDealBtn');
    const bestBanner = document.getElementById('bestDealBanner');

    // Extract TLD for context
    const dotIdx = domain.lastIndexOf('.');
    const tld = dotIdx !== -1 ? domain.substring(dotIdx) : '.com';
    const tld_info = tldData.find(t => t.ext === tld);
    const avgPrice = tld_info ? tld_info.avg : '$10.50';

    if (availStatus === 'taken') {
        if (bestBanner) bestBanner.style.opacity = '0.6';
        if (bestPrice) bestPrice.innerHTML = `$${best.register.toFixed(2)}<span>/year</span>`;
        if (bestName) bestName.textContent = `${best.name} — Registration price (domain is taken)`;
        if (bestSub) bestSub.textContent = `This domain is already registered. Prices shown are for new ${tld} registrations.`;
        if (bestBtn) bestBtn.textContent = `Visit ${best.name} →`;
    } else {
        if (bestBanner) bestBanner.style.opacity = '1';
        if (bestPrice) bestPrice.innerHTML = `$${best.register.toFixed(2)}<span>/year</span>`;
        if (bestName) bestName.textContent = `${best.name} — Best for ${tld} domains`;
        if (bestSub) bestSub.textContent = `Save vs. average ${tld} price of ${avgPrice}/year`;
        if (bestBtn) bestBtn.textContent = `Get This Deal at ${best.name} →`;
    }

    tableData = [...adjustedRegistrars];
    sortTableData();
    renderTableRows();
    renderCards();
    renderCalculator(parseInt(document.getElementById('yearsSlider').value) || 1);

    const resultsSection = document.getElementById('resultsSection');
    const featuresSection = document.getElementById('featuresSection');
    
    if (resultsSection) resultsSection.classList.add('visible');
    if (featuresSection) featuresSection.style.display = 'block';

    // Smooth scroll to results
    setTimeout(() => {
        if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ============================================
// RENDER TABLE
// ============================================
function renderTableRows() {
    const body = document.getElementById('priceTableBody');
    if (!body) return;
    
    const prices = tableData.map(r => r.register);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    body.innerHTML = tableData.map(r => {
        const regClass = getPriceClass(r.register, minPrice, maxPrice);
        const renClass = getPriceClass(r.renewal, 
            Math.min(...tableData.map(x => x.renewal)), 
            Math.max(...tableData.map(x => x.renewal))
        );
        const traClass = getPriceClass(r.transfer,
            Math.min(...tableData.map(x => x.transfer)),
            Math.max(...tableData.map(x => x.transfer))
        );

        const regBarW = getPriceBarWidth(r.register, minPrice, maxPrice);
        const regBarColor = getBarColor(r.register, minPrice, maxPrice);

        const stars = renderStars(r.rating);

        return `
        <tr class="${r.isBest ? 'best-row' : ''}">
            <td>
                <div class="reg-cell">
                    <div class="reg-logo" style="background:${r.bg};color:${r.color};">
                        ${r.emoji}
                    </div>
                    <div class="reg-info">
                        <span class="reg-name">
                            ${r.name}
                            ${r.isBest ? '<span class="best-badge">★ Best</span>' : ''}
                        </span>
                        <span class="reg-tag">${r.tag}</span>
                    </div>
                </div>
            </td>
            <td>
                <div class="price-cell ${regClass}">
                    $${r.register.toFixed(2)}
                    ${r.promoNote ? `<span class="price-note">${r.promoNote}</span>` : ''}
                </div>
                <div class="price-bar" style="background:${regBarColor};width:${regBarW}%;opacity:0.6;"></div>
            </td>
            <td class="price-cell ${renClass}">$${r.renewal.toFixed(2)}</td>
            <td class="price-cell ${traClass}">$${r.transfer.toFixed(2)}</td>
            <td>
                <div class="stars">${stars}
                    <span class="rating-num">${r.rating}</span>
                </div>
            </td>
            <td>
                ${r.coupon
                    ? `<div class="coupon-chip" onclick="copyCode('${r.coupon}', this)">
                            🎫 ${r.coupon}
                       </div>`
                    : `<span style="color:var(--text-dim);font-size:0.82rem;">${r.offer}</span>`
                }
            </td>
            <td>
                <a href="${r.link}" target="_blank" rel="noopener" 
                   class="buy-btn ${r.isBest ? 'best' : ''}"
                   onclick="showToast('Redirecting to ${r.name}...','🌐')">
                    ${r.isBest ? '★ ' : ''}Buy Now ↗
                </a>
            </td>
        </tr>`;
    }).join('');
}

// ============================================
// RENDER CARDS
// ============================================
function renderCards() {
    const container = document.getElementById('cardsView');
    if (!container) return;
    
    const prices = tableData.map(r => r.register);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    container.innerHTML = tableData.map(r => {
        const regClass = getPriceClass(r.register, minPrice, maxPrice);
        return `
        <div class="registrar-card ${r.isBest ? 'best' : ''}">
            <div class="card-header">
                <div class="reg-cell">
                    <div class="reg-logo" style="background:${r.bg};color:${r.color};">
                        ${r.emoji}
                    </div>
                    <div class="reg-info">
                        <span class="reg-name">${r.name} ${r.isBest ? '<span class="best-badge">Best</span>' : ''}</span>
                        <span class="reg-tag">${r.tag}</span>
                    </div>
                </div>
                <div class="stars" style="flex-shrink:0;">${renderStars(r.rating)}</div>
            </div>
            <div class="card-prices">
                <div class="card-price-item">
                    <span class="card-price-label">Register</span>
                    <span class="card-price-val ${regClass}">$${r.register.toFixed(2)}</span>
                </div>
                <div class="card-price-item">
                    <span class="card-price-label">Renewal</span>
                    <span class="card-price-val">$${r.renewal.toFixed(2)}</span>
                </div>
                <div class="card-price-item">
                    <span class="card-price-label">Transfer</span>
                    <span class="card-price-val">$${r.transfer.toFixed(2)}</span>
                </div>
            </div>
            ${r.coupon
                ? `<div class="coupon-chip" style="width:100%;justify-content:center;margin-bottom:12px;" onclick="copyCode('${r.coupon}', this)">
                        🎫 Coupon: ${r.coupon}
                   </div>`
                : `<div style="color:var(--text-dim);font-size:0.8rem;margin-bottom:12px;text-align:center;">${r.offer}</div>`
            }
            <a href="${r.link}" target="_blank" rel="noopener"
               class="buy-btn ${r.isBest ? 'best' : ''}" 
               style="width:100%;justify-content:center;"
               onclick="showToast('Opening ${r.name}...','🌐')">
                Buy at ${r.name} ↗
            </a>
        </div>`;
    }).join('');
}

// ============================================
// SORTING
// ============================================
window.sortTable = function() {
    const selector = document.getElementById('sortSelect');
    if (!selector) return;
    const val = selector.value;
    currentSort.col = val;
    currentSort.dir = 'asc';
    sortTableData();
    renderTableRows();
    renderCards();
}

window.sortByCol = function(col) {
    if (currentSort.col === col) {
        currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.col = col;
        currentSort.dir = 'asc';
    }

    // Update header classes
    document.querySelectorAll('.price-table thead th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });

    const activeHeader = document.querySelector(`[data-col="${col}"]`);
    if (activeHeader) {
        activeHeader.classList.add(currentSort.dir === 'asc' ? 'sort-asc' : 'sort-desc');
    }

    sortTableData();
    renderTableRows();
}

function sortTableData() {
    const col = currentSort.col;
    const dir = currentSort.dir;

    tableData.sort((a, b) => {
        let valA = col === 'name' ? a.name : 
                   col === 'rating' ? a.rating : a[col];
        let valB = col === 'name' ? b.name : 
                   col === 'rating' ? b.rating : b[col];

        if (typeof valA === 'string') {
            return dir === 'asc' 
                ? valA.localeCompare(valB) 
                : valB.localeCompare(valA);
        }
        return dir === 'asc' ? valA - valB : valB - valA;
    });
}

// ============================================
// VIEW TOGGLE
// ============================================
window.switchView = function(view) {
    currentView = view;
    const tableView = document.getElementById('tableView');
    const cardsView = document.getElementById('cardsView');
    const tableBtn = document.getElementById('tableViewBtn');
    const cardBtn = document.getElementById('cardViewBtn');

    if (view === 'table') {
        if (tableView) tableView.style.display = 'block';
        if (cardsView) cardsView.classList.remove('visible');
        if (tableBtn) tableBtn.classList.add('active');
        if (cardBtn) cardBtn.classList.remove('active');
    } else {
        if (tableView) tableView.style.display = 'none';
        if (cardsView) cardsView.classList.add('visible');
        if (cardBtn) cardBtn.classList.add('active');
        if (tableBtn) tableBtn.classList.remove('active');
    }
}

// ============================================
// CALCULATOR
// ============================================
window.updateCalculator = function() {
    const slider = document.getElementById('yearsSlider');
    if (!slider) return;
    
    const years = parseInt(slider.value);
    const display = document.getElementById('yearsDisplay');
    if (display) display.textContent = years === 1 ? '1 yr' : `${years} yrs`;

    // Update slider fill
    const pct = ((years - 1) / 9) * 100;
    slider.style.background = `linear-gradient(90deg, var(--primary) ${pct}%, rgba(108,53,222,0.2) ${pct}%)`;

    renderCalculator(years);
}

function renderCalculator(years) {
    const container = document.getElementById('calcResults');
    if (!container) return;

    // Calculate totals: year 1 = register, subsequent = renewal
    const withTotals = registrars.map(r => {
        const total = years === 1 
            ? r.register 
            : r.register + (r.renewal * (years - 1));
        return { ...r, total };
    }).sort((a, b) => a.total - b.total);

    const minTotal = withTotals[0].total;
    const maxTotal = withTotals[withTotals.length - 1].total;

    container.innerHTML = withTotals.map((r, i) => {
        const savings = maxTotal - r.total;
        const barW = ((r.total - minTotal) / (maxTotal - minTotal + 0.01)) * 100;
        const barColor = i === 0 ? 'var(--green)' 
                       : i <= 2 ? '#9BDE7E' 
                       : i >= withTotals.length - 2 ? 'var(--red)' 
                       : 'var(--primary-light)';

        return `
        <div class="calc-row ${i === 0 ? 'best' : ''}">
            <div style="font-size:1rem;flex-shrink:0;">${r.emoji}</div>
            <div class="calc-reg-name">${r.name} ${i === 0 ? '🏆' : ''}</div>
            <div class="calc-bar-wrap">
                <div class="calc-bar-fill" style="width:${barW}%;background:${barColor};"></div>
            </div>
            <div class="calc-total" style="color:${i === 0 ? 'var(--green)' : i >= withTotals.length - 2 ? 'var(--red)' : 'var(--text)'};">
                $${r.total.toFixed(2)}
            </div>
            ${savings > 0.5 ? `<div class="calc-savings">Save $${savings.toFixed(0)}</div>` : ''}
        </div>`;
    }).join('');
}

// ============================================
// COUPONS
// ============================================
function renderCoupons() {
    const grid = document.getElementById('couponGrid');
    if (!grid) return;
    grid.innerHTML = coupons.map(c => `
        <div class="coupon-item">
            <div class="coupon-top">
                <span class="coupon-reg">${c.reg}</span>
                <span class="coupon-disc">${c.discount}</span>
            </div>
            <div class="coupon-code-display">
                <span class="coupon-code-text" id="code-${c.code}">${c.code}</span>
                <button class="copy-btn" onclick="copyCode('${c.code}', this)" title="Copy code">📋</button>
            </div>
            <div class="coupon-desc">⚠️ ${c.desc}</div>
        </div>
    `).join('');
}

window.copyCode = function(code, el) {
    navigator.clipboard.writeText(code).then(() => {
        showToast(`Copied: ${code}`, '📋');
        if (el && el.classList.contains('coupon-chip')) {
            el.classList.add('copied');
            const orig = el.innerHTML;
            el.innerHTML = `✅ Copied!`;
            setTimeout(() => { el.classList.remove('copied'); el.innerHTML = orig; }, 2000);
        } else if (el) {
            const orig = el.innerHTML;
            el.innerHTML = '✅';
            setTimeout(() => { el.innerHTML = orig; }, 2000);
        }
    }).catch(() => {
        showToast(`Code: ${code} — Copy manually`, '📋');
    });
}

// ============================================
// TLD TABLE
// ============================================
function renderTLDTable() {
    // Header
    const head = document.getElementById('tldTableHead');
    if (head) {
        head.innerHTML = `
            <th>Extension</th>
            ${tldRegistrars.map(r => `<th>${r}</th>`).join('')}
        `;
    }

    // Body
    const body = document.getElementById('tldTableBody');
    if (!body) return;
    body.innerHTML = tldData.map(row => {
        const realPrices = [row.namecheap, row.godaddy, row.porkbun, row.hostinger, row.cloudflare, row.spaceship, row.ionos, row.google];
        const minP = Math.min(...realPrices);
        const maxP = Math.max(...realPrices);

        const cells = [
            row.namecheap, row.godaddy, row.porkbun, row.hostinger,
            row.cloudflare, row.spaceship, row.ionos, row.google
        ].map(p => {
            let cls = 'tld-mid';
            if (p === minP) cls = 'tld-low';
            else if (p === maxP) cls = 'tld-high';
            return `<td><span class="tld-price ${cls}">$${p.toFixed(2)}</span></td>`;
        }).join('');

        return `
        <tr>
            <td>
                <div class="tld-ext">${row.ext}</div>
                <div class="tld-avg">Avg: ${row.avg}</div>
            </td>
            ${cells}
        </tr>`;
    }).join('');
}

// ============================================
// HELPERS
// ============================================
function getPriceClass(price, min, max) {
    const range = max - min;
    if (range === 0) return 'price-mid';
    const pct = (price - min) / range;
    if (pct <= 0.3) return 'price-lowest';
    if (pct >= 0.7) return 'price-high';
    return 'price-mid';
}

function getPriceBarWidth(price, min, max) {
    if (max === min) return 50;
    return Math.round(((price - min) / (max - min)) * 100);
}

function getBarColor(price, min, max) {
    const pct = (price - min) / (max - min + 0.01);
    if (pct <= 0.3) return 'var(--green)';
    if (pct >= 0.7) return 'var(--red)';
    return 'var(--primary-light)';
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= Math.round(rating) ? '' : 'empty'}">★</span>`;
    }
    return stars;
}

// ============================================
// TOAST
// ============================================
let toastTimer;
window.showToast = function(msg, icon = '✅') {
    clearTimeout(toastTimer);
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = document.getElementById('toastIcon');
    
    if (toastMsg) toastMsg.textContent = msg;
    if (toastIcon) toastIcon.textContent = icon;
    if (toast) {
        toast.classList.add('show');
        toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }
}
