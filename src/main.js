import { previewProducts } from './catalog-summary.js';

document.querySelectorAll('[data-catalog-count]').forEach(el => { el.dataset.target = String(previewProducts.length); el.textContent = String(previewProducts.length); });
const featuredProducts = document.getElementById('featuredProducts');
if (featuredProducts) {
    featuredProducts.replaceChildren(...[1, 5, 2].map(id => {
        const product = previewProducts.find(item => item.id === id);
        const card = document.createElement('article');
        card.className = 'product-card ui-card';
        const title = document.createElement('h3'); title.className = 'product-name'; title.textContent = product.name;
        const description = document.createElement('p'); description.className = 'product-desc'; description.textContent = product.desc;
        const footer = document.createElement('div'); footer.className = 'product-footer';
        const price = document.createElement('span'); price.className = 'product-price'; price.textContent = 'Under review';
        const link = document.createElement('a'); link.className = 'btn btn-primary btn-sm ui-button'; link.href = '/prompt-store'; link.textContent = 'View samples';
        footer.append(price, link); card.append(title, description, footer); return card;
    }));
    featuredProducts.dataset.state = 'ready';
    featuredProducts.setAttribute('aria-busy', 'false');
}

// ============================================
// PARTICLE CANVAS ANIMATION
// ============================================
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmallScreen = window.innerWidth <= 768;
const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
const saveData = navigator.connection && navigator.connection.saveData;
const isLowPowerMode = Boolean(prefersReducedMotion || saveData || (isSmallScreen && (lowCpu || lowMemory)));
const DEBUG_MODE = new URLSearchParams(window.location.search).get('debug') === '1';

let debugPanelBody = null;

function initDebugPanel() {
    if (!DEBUG_MODE || document.getElementById('debugPanel')) return;

    const panel = document.createElement('aside');
    panel.id = 'debugPanel';
    panel.className = 'debug-panel';
    panel.innerHTML = `
        <div class="debug-panel-head">
            <strong>Debug Events</strong>
            <span>?debug=1</span>
        </div>
        <div class="debug-panel-body" id="debugPanelBody"></div>
    `;
    document.body.appendChild(panel);
    debugPanelBody = document.getElementById('debugPanelBody');
    debugLogEvent('debug_panel_ready', { page: 'home' });
}

function debugLogEvent(eventName, params = {}) {
    if (!DEBUG_MODE || !debugPanelBody) return;

    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const item = document.createElement('div');
    item.className = 'debug-item';

    const payload = Object.keys(params).length ? JSON.stringify(params) : '{}';
    item.innerHTML = `
        <div class="debug-item-top"><span>${eventName}</span><time>${ts}</time></div>
        <pre>${payload}</pre>
    `;

    debugPanelBody.prepend(item);

    const maxItems = 20;
    while (debugPanelBody.children.length > maxItems) {
        debugPanelBody.removeChild(debugPanelBody.lastChild);
    }
}

const trackEvent = (name, params) => window.trackEvent?.(name, params);

if (!isLowPowerMode) {
    const loadEffects = () => import('./home-effects.js').then(({ startHomeEffects }) => startHomeEffects()).catch(() => {});
    if ('requestIdleCallback' in window) window.requestIdleCallback(loadEffects, { timeout: 1500 });
    else setTimeout(loadEffects, 1000);
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SCROLL TO TOP
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// INTERSECTION OBSERVER - FADE ANIMATIONS
// ============================================
function initAnimations() {
    // Tag body so CSS can apply fade-up initial state
    document.body.classList.add('js-ready');

    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
    
    // Start counters immediately for hero stats
    initCounters();
}

// Also run on DOMContentLoaded as fallback
document.addEventListener('DOMContentLoaded', initAnimations);

// ============================================
// COUNTER ANIMATION
// ============================================
let countersStarted = false;

function animateCounter(el, target, suffix) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, 20);
}

function initCounters() {
    if (countersStarted) return;
    const stats = document.querySelectorAll('.hero-stat-number, .stat-number');
    if (stats.length === 0) return;
    countersStarted = true;
    
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.target) || 0;
        // Determine suffix from initial text
        const initialText = stat.textContent.trim();
        let suffix = '+';
        if (initialText.includes('K')) suffix = 'K+';
        
        // Immediately set a real value as fallback
        stat.textContent = target + suffix;
        
        // Then animate from 0
        if (!prefersReducedMotion) animateCounter(stat, target, suffix);
    });
}

// ============================================
// MINI LAUNCH SCORE METER
// ============================================
function initLaunchScoreMeter() {
    const checks = document.querySelectorAll('.launch-input[type="checkbox"]');
    const speed = document.getElementById('launchSpeedRange');
    const speedValue = document.getElementById('launchSpeedValue');
    const scoreValue = document.getElementById('launchScoreValue');
    const scoreCircle = document.getElementById('launchScoreCircle');
    const scoreStatus = document.getElementById('launchScoreStatus');
    const scoreTip = document.getElementById('launchScoreTip');

    if (!checks.length || !speed || !scoreValue || !scoreCircle || !scoreStatus || !scoreTip) {
        return;
    }

    let lastBucket = null;

    const compute = () => {
        let total = Number(speed.value || 0);
        let checkedCount = 0;
        checks.forEach((check) => {
            if (check.checked) {
                total += Number(check.dataset.points || 0);
                checkedCount += 1;
            }
        });

        total = Math.max(0, Math.min(100, total));
        scoreValue.textContent = String(total);
        scoreCircle.style.background = `conic-gradient(var(--primary-light) ${total * 3.6}deg, rgba(255,255,255,0.08) 0deg)`;
        if (speedValue) speedValue.textContent = `${speed.value} / 20`;

        if (total >= 85) {
            scoreStatus.textContent = 'Launch ready';
            scoreStatus.style.color = '#00FF88';
            scoreTip.textContent = 'Great job. Focus on distribution and conversion optimization now.';
        } else if (total >= 60) {
            scoreStatus.textContent = 'Almost there';
            scoreStatus.style.color = '#FFB800';
            scoreTip.textContent = 'Good base. Improve analytics, lead capture, and speed before launch.';
        } else {
            scoreStatus.textContent = 'Needs work';
            scoreStatus.style.color = '#FF6B6B';
            scoreTip.textContent = 'Start with mobile UX and analytics tracking for the fastest improvement.';
        }

        const bucket = total >= 85 ? 'ready' : total >= 60 ? 'almost_ready' : 'needs_work';

        // Always show live launch-score state in debug mode.
        debugLogEvent('homepage_launch_score_state', {
            score: total,
            bucket,
            checked_items: checkedCount,
            speed_score: Number(speed.value || 0)
        });

        if (bucket !== lastBucket) {
            lastBucket = bucket;
            trackEvent('homepage_launch_score_update', {
                score: total,
                bucket,
                speed_score: Number(speed.value || 0)
            });
        }
    };

    checks.forEach((check) => check.addEventListener('change', () => {
        trackEvent('homepage_launch_score_checkbox', {
            points: Number(check.dataset.points || 0),
            checked: check.checked
        });
        compute();
    }));
    speed.addEventListener('input', () => {
        compute();
    });
    compute();
}

// ============================================
// NEWSLETTER SUBMIT handling removed, moved to globals.js
// ============================================

// Run on load
initDebugPanel();
initLaunchScoreMeter();

// Promo bar dismiss
(function() {
    const promoBanner = document.getElementById('promoBanner');
    const promoClose = document.getElementById('promoClose');
    if (promoBanner && sessionStorage.getItem('promo_closed')) {
        promoBanner.classList.add('hidden');
    }
    if (promoClose) {
        promoClose.addEventListener('click', () => {
            promoBanner.classList.add('hidden');
            sessionStorage.setItem('promo_closed', '1');
        });
    }
})();

// ============================================
// FEATURE CARDS - MOUSE MOVE TILT EFFECT
// ============================================
const featureCards = document.querySelectorAll('.feature-card, .product-card');

if (!isLowPowerMode && window.matchMedia('(hover: hover)').matches) {
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.1s ease';
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// EXIT INTENT POPUP
// ============================================
(function() {
    let shown = false;
    function showPopup() {
        if (shown || sessionStorage.getItem('exit_popup_shown')) return;
        shown = true;
        sessionStorage.setItem('exit_popup_shown', '1');
        const popup = document.getElementById('exitPopup');
        if (popup) popup.classList.add('active');
    }
    function hidePopup() {
        const popup = document.getElementById('exitPopup');
        if (popup) popup.classList.remove('active');
    }
    document.addEventListener('mouseout', function(e) {
        if (!e.relatedTarget && e.clientY < 5) showPopup();
    });
    const closeBtn = document.getElementById('exitPopupClose');
    if (closeBtn) closeBtn.addEventListener('click', hidePopup);
    const skipBtn = document.getElementById('exitPopupSkip');
    if (skipBtn) skipBtn.addEventListener('click', hidePopup);
    const popupFrame = document.getElementById('exitPopup');
    if (popupFrame) {
        popupFrame.addEventListener('click', function(e) {
            if (e.target === this) hidePopup();
        });
    }
})();

