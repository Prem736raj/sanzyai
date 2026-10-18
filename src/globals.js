import { submitForm } from './form-client.js';
import { openDialog, closeDialog } from './dialog.js';
/**
 * globals.js - SanzyAI Global Elements Controller
 * Handles injection of universal UI (Loading, Popups, Bars) without duplicating HTML.
 */

(function() {
    'use strict';

    // Declarative bindings for portfolio and quiz controls; never evaluate HTML as code.
    const siteHandlers = new Set(['filterContent', 'loadMore', 'handleOverlayClick', 'closeModal',
        'openModal', 'filterScripts', 'filterLogos', 'searchLogos', 'searchContent', 'searchScripts',
        'copyModalPrompt', 'downloadCurrentLogo', 'nextQuiz', 'finishQuiz', 'resetQuiz']);
    for (const type of ['click', 'input', 'keyup']) {
        document.addEventListener(type, (event) => {
            if (!(event.target instanceof Element)) return;
            let el = event.target;
            while (el && !el.hasAttribute(`data-site-${type}`)) {
                if (type === 'click' && el.hasAttribute('data-stop-click')) return;
                el = el.parentElement;
            }
            if (!el) return;
            const name = el.getAttribute(`data-site-${type}`);
            // Old demo buttons reported downloads that did not happen. Copy the visible sample instead.
            if (name === 'showToast') {
                const sample = document.getElementById('modalExcerpt')?.textContent;
                if (!sample) return;
                navigator.clipboard.writeText(sample).then(() => window.showToast?.('Sample copied'))
                    .catch(() => window.showToast?.('Could not copy. Select the sample text manually.'));
                return;
            }
            if (!siteHandlers.has(name) || typeof window[name] !== 'function') return;
            const args = [];
            for (let i = 0; el.hasAttribute(`data-site-arg-${i}`); i++) {
                const value = el.getAttribute(`data-site-arg-${i}`);
                args.push(value === '@element' ? el : value === '@event' ? event :
                    value === '@value' ? el.value : /^\d+$/.test(value) ? Number(value) : value);
            }
            window[name](...args);
        });
    }
    document.addEventListener('keydown', (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[role="button"][data-site-click]')) {
            event.preventDefault();
            event.target.click();
        }
    });
    document.addEventListener('error', (event) => {
        const img = event.target;
        if (!(img instanceof HTMLImageElement) || !img.dataset.imageFallback) return;
        const fallback = img.dataset.imageFallback;
        delete img.dataset.imageFallback;
        img.src = fallback;
    }, true);

    const SITE_ORIGIN = 'https://sanzyai.com';
    localStorage.removeItem('sanzyai_subscribers');

    // GA4 Measurement ID — replace with your real ID from analytics.google.com
    window.SANZY_GA_ID = import.meta.env.VITE_GA_ID || '';

    // Conversion tracking helper
    window.trackConversion = function(eventName, params = {}) {
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, params);
        }
    };

    window.trackEvent = function(eventName, params = {}) {
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, params);
        }
    };

    window.handleNewsletterSubmit = async function(event) {
        event.preventDefault();
        const input = event.target.querySelector('input[type="email"]');
        if (!input || !event.target.reportValidity()) return;
        await submitForm(event.target, '/api/subscribe', { email: input.value.trim() });
    };

    // Wishlist logic
    const WISHLIST_KEY = 'sanzy_wishlist';
    window.getWishlist = () => {
        try {
            const stored = JSON.parse(localStorage.getItem(WISHLIST_KEY));
            return Array.isArray(stored) ? [...new Set(stored.filter(id => Number.isInteger(id) && id > 0 && id < 100))] : [];
        } catch (e) {
            return [];
        }
    };

    window.saveWishlist = (list) => {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(list.filter(id => Number.isInteger(id) && id > 0 && id < 100))); 
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: list }));
        updateWishlistUI();
    };

    window.toggleWishlistItem = (id) => {
        let list = window.getWishlist();
        const index = list.indexOf(id);
        if (index > -1) {
            list.splice(index, 1);
            showToast('Removed from saved items', '');
        } else {
            list.push(id);
            showToast('Added to saved items!', '');
        }
        window.saveWishlist(list);
        return index === -1; // true if added
    };

    window.isInWishlist = (id) => window.getWishlist().includes(id);

    function updateWishlistUI() {
        const list = window.getWishlist();
        const counts = document.querySelectorAll('.wishlist-count');
        counts.forEach(c => {
            c.textContent = list.length;
            c.style.display = list.length > 0 ? 'flex' : 'none';
        });

        const drawerList = document.getElementById('wishlistDrawerItems');
        if (drawerList) {
            if (list.length === 0) {
                drawerList.innerHTML = `
                    <div class="wishlist-empty">
                        <div class="wish-empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></div>
                        <p>Your saved items list is empty</p>
                        <a href="/prompt-store" class="btn btn-primary btn-sm">Browse Prompts</a>
                    </div>
                `;
            } else {
                // Try to get packs from window.packs (if on prompt-store)
                // or fallback to basic item info.
                const packs = window.packs || [];
                drawerList.innerHTML = list.map(id => {
                    const pack = packs.find(p => p.id === id);
                    const name = pack ? pack.name : `Prompt Pack #${id}`;
                    const price = pack ? (pack.status === 'paused' ? 'Under quality review' : pack.price > 0 ? ('USD ' + pack.price.toFixed(2)) : 'FREE') : 'View samples';
                    
                    return `
                        <div class="wishlist-item" data-id="${id}">
                            <div class="wi-info">
                                <div class="wi-name">${name}</div>
                                <div class="wi-price">${price}</div>
                            </div>
                            <div class="wi-actions">
                                <a href="/prompt-store" class="wi-btn wi-view" title="View Product"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                                <button class="wi-btn wi-remove" data-wish-id="${id}" title="Remove">✕</button>
                            </div>
                        </div>
                    `;
                }).join('');

                // Add listeners to remove buttons in drawer
                drawerList.querySelectorAll('.wi-remove').forEach(btn => {
                    btn.onclick = () => {
                        window.toggleWishlistItem(parseInt(btn.dataset.wishId));
                    };
                });
            }
        }
    }

    window.toggleWishlistDrawer = () => {
        const drawer = document.getElementById('wishlistDrawer');
        const overlay = document.getElementById('wishlistOverlay');
        if (!drawer) return;

        const isOpen = drawer.classList.contains('open');
        if (isOpen) {
            closeDialog(drawer);
            overlay.classList.remove('open');
            document.getElementById('wishlistBtn')?.setAttribute('aria-expanded', 'false');
        } else {
            updateWishlistUI();
            openDialog(drawer, { label: 'Wishlist', focusSelector: '#wishlistClose', onClose: window.toggleWishlistDrawer });
            overlay.classList.add('open');
            document.getElementById('wishlistBtn')?.setAttribute('aria-expanded', 'true');
        }
    };

    const seoByPath = {
        '/': {
            title: 'SanzyAI - Domain Prices, AI Tools, Prompts & Free Learning Hub',
            description: 'Compare domain prices, discover curated AI tools, preview prompt samples, explore AI services, and learn practical website growth workflows.',
            type: 'website',
            schema: {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'SanzyAI',
                url: `${SITE_ORIGIN}/`,
                description: 'AI and domain growth hub with tools, prompt samples, services, and free learning resources.',
            },
        },
        '/domain-finder': {
            title: 'Compare Domain Prices - Find Cheapest Registrar | SanzyAI',
            description: 'Compare domain registration and renewal prices across top registrars to find the best value quickly.',
            type: 'website',
        },
        '/ai-tools': {
            title: 'AI Tools Directory - Curated & Reviewed | SanzyAI',
            description: 'Explore curated AI tools for writing, code, images, video, voice, and marketing with practical recommendations.',
            type: 'website',
        },
        '/prompt-store': {
            title: 'AI Prompt Samples & Pack Updates | SanzyAI',
            description: 'Preview editable AI prompt samples and download the free starter pack. Paid checkout is paused during content-quality review.',
            type: 'product.group',
        },
        '/learn-free': {
            title: 'Build Your Website From Zero to Launch | Learn Free Lab',
            description: 'Interactive website growth lab with practical roadmaps, checklists, calculators, and sprint planning.',
            type: 'course',
            schema: {
                '@context': 'https://schema.org',
                '@type': 'Course',
                name: 'SanzyAI Learn Free Interactive Lab',
                provider: {
                    '@type': 'Organization',
                    name: 'SanzyAI',
                    url: SITE_ORIGIN,
                },
                description: 'Free practical learning experience to launch and grow websites with AI workflows.',
            },
        },
        '/blog': {
            title: 'AI Newsroom - Live AI Updates, Releases & Market Signals',
            description: 'Track model launches, policy changes, funding rounds, and practical AI opportunities in one newsroom.',
            type: 'blog',
            schema: {
                '@context': 'https://schema.org',
                '@type': 'Blog',
                name: 'SanzyAI AI Newsroom',
                url: `${SITE_ORIGIN}/blog`,
                publisher: {
                    '@type': 'Organization',
                    name: 'SanzyAI',
                    url: SITE_ORIGIN,
                },
            },
        },
        '/chatbot-demo': {
            title: 'Sanzy AI Chatbot Demo | SanzyAI',
            description: 'Try the Sanzy AI assistant demo and test prompts for growth, tools, domains, and services.',
            type: 'website',
        },
        '/about': {
            title: 'About SanzyAI - Mission, Vision, and Team',
            description: 'Learn why SanzyAI exists and how we help founders and creators launch faster with AI and domain insights.',
            type: 'profile',
        },
        '/contact': {
            title: 'Contact SanzyAI - Support and Partnerships',
            description: 'Reach SanzyAI for support, partnerships, and service inquiries.',
            type: 'website',
        },
        '/help-center': {
            title: 'Help Center | SanzyAI',
            description: 'Find answers to common SanzyAI questions about tools, prompts, services, and account help.',
            type: 'website',
        },
        '/careers': {
            title: 'Careers at SanzyAI',
            description: 'Explore open roles and collaboration opportunities at SanzyAI.',
            type: 'website',
        },
        '/partners': {
            title: 'Partners | SanzyAI',
            description: 'See partnership opportunities and ecosystem collaborations with SanzyAI.',
            type: 'website',
        },
        '/press-kit': {
            title: 'Press Kit | SanzyAI',
            description: 'Access official SanzyAI brand assets, logos, and media resources.',
            type: 'website',
        },
        '/status': {
            title: 'System Status | SanzyAI',
            description: 'Live system and service availability updates for SanzyAI.',
            type: 'website',
        },
        '/submit-tool': {
            title: 'Submit Your AI Tool | SanzyAI',
            description: 'Submit your AI product for review and potential listing in the SanzyAI tools directory.',
            type: 'website',
        },
        '/affiliate-program': {
            title: 'Affiliate Program | SanzyAI',
            description: 'Join the SanzyAI affiliate program and earn commissions by promoting AI products and resources.',
            type: 'website',
        },
        '/affiliate-disclosure': {
            title: 'Affiliate Disclosure | SanzyAI',
            description: 'Read SanzyAI affiliate disclosure and transparency commitments.',
            type: 'article',
        },
        '/privacy-policy': {
            title: 'Privacy Policy | SanzyAI',
            description: 'Understand how SanzyAI collects, processes, and protects personal data.',
            type: 'article',
        },
        '/terms-of-service': {
            title: 'Terms of Service | SanzyAI',
            description: 'Review the terms and conditions for using SanzyAI products and services.',
            type: 'article',
        },
        '/refund-policy': {
            title: 'Refund Policy | SanzyAI',
            description: 'See refund eligibility, timelines, and support process for SanzyAI products.',
            type: 'article',
        },
        '/cookie-policy': {
            title: 'Cookie Policy | SanzyAI',
            description: 'Learn how SanzyAI uses cookies, consent preferences, and tracking settings.',
            type: 'article',
        },
        '/404': {
            title: '404 - Page Not Found | SanzyAI',
            description: 'The page could not be found. Explore SanzyAI tools, domains, and learning resources instead.',
            type: 'website',
        },
    };

    const languageOptions = [
        { code: 'en', label: 'English', flag: '' },
        { code: 'hi', label: 'हिन्दी', flag: '' },
        { code: 'es', label: 'Español', flag: '' },
        { code: 'fr', label: 'Français', flag: '' },
        { code: 'de', label: 'Deutsch', flag: '' },
        { code: 'ar', label: 'العربية', flag: '' },
        { code: 'pt', label: 'Português', flag: '' },
        { code: 'ru', label: 'Русский', flag: '' },
        { code: 'ja', label: '日本語', flag: '' },
        { code: 'ko', label: '한국어', flag: '' },
        { code: 'zh-CN', label: '中文', flag: '' }
    ];

    function currentPath() {
        const path = window.location.pathname || '/';
        if (path === '/index.html') return '/';
        if (path.endsWith('.html')) return path.replace(/\.html$/i, '');
        return path;
    }

    function getMetaConfig() {
        const path = currentPath();
        return seoByPath[path] || {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content || 'Explore SanzyAI tools, samples, learning resources and services.',
            type: 'website',
        };
    }

    function setOrCreateMeta(attrName, attrValue, content) {
        if (!content) return;
        let node = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (node?.getAttribute('content')?.trim()) return;
        if (!node) {
            node = document.createElement('meta');
            node.setAttribute(attrName, attrValue);
            document.head.appendChild(node);
        }
        node.setAttribute('content', content);
    }

    function setCanonical(url) {
        let link = document.head.querySelector('link[rel="canonical"]');
        if (link?.getAttribute('href')?.trim()) return;
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }

    function normalizeUrlPath(path) {
        if (path === '/') return '/';
        return path.replace(/\.html$/i, '');
    }

    function applySeoMetadata() {
        const meta = getMetaConfig();
        const path = normalizeUrlPath(window.location.pathname || '/');
        const canonicalUrl = `${SITE_ORIGIN}${path === '/' ? '/' : path}`;

        // Static HTML owns crawl-critical metadata. Runtime code only fills gaps.
        if (!document.title.trim() && meta.title) document.title = meta.title;
        setOrCreateMeta('name', 'description', meta.description);
        setCanonical(canonicalUrl);

        setOrCreateMeta('property', 'og:type', meta.type || 'website');
        setOrCreateMeta('property', 'og:title', meta.title);
        setOrCreateMeta('property', 'og:description', meta.description);
        setOrCreateMeta('property', 'og:url', canonicalUrl);
        setOrCreateMeta('property', 'og:site_name', 'SanzyAI');

        setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
        setOrCreateMeta('name', 'twitter:title', meta.title);
        setOrCreateMeta('name', 'twitter:description', meta.description);

        if (meta.schema && !document.head.querySelector('script[type="application/ld+json"]')) {
            let schemaScript = document.getElementById('sanzyDynamicSchema');
            if (!schemaScript) {
                schemaScript = document.createElement('script');
                schemaScript.id = 'sanzyDynamicSchema';
                schemaScript.type = 'application/ld+json';
                document.head.appendChild(schemaScript);
            }
            schemaScript.textContent = JSON.stringify(meta.schema);
        }
    }

    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('sanzy_theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        return prefersLight ? 'light' : 'dark';
    }

    function trackGlobalEvent(eventName, params = {}) {
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, params);
        }
    }

    function setupEngagementTracking() {
        document.addEventListener('click', (event) => {
            const el = event.target.closest('a,button,[data-track-event]');
            if (!el) return;

            const explicitEvent = el.getAttribute('data-track-event');
            const href = el.getAttribute('href') || '';
            const text = (el.textContent || '').trim().slice(0, 80);
            const className = (el.className || '').toString().slice(0, 120);

            if (explicitEvent) {
                trackGlobalEvent(explicitEvent, { text, href, class_name: className, page: currentPath() });
                return;
            }

            const isCta = el.matches('.btn,.buy-btn,.modal-buy-btn,.bot-link-btn,.hero-buttons a,.cta,.cta-btn');
            if (isCta) {
                trackGlobalEvent('cta_click', {
                    text,
                    href,
                    class_name: className,
                    page: currentPath(),
                });
            }
        });

        document.addEventListener('submit', (event) => {
            const form = event.target;
            if (!(form instanceof HTMLFormElement)) return;

            const formId = form.id || form.getAttribute('name') || 'anonymous_form';
            trackGlobalEvent('form_submit_attempt', {
                form_id: String(formId).slice(0, 80),
                page: currentPath(),
            });
        });
    }

    function setupNavA11y() {
        let menu = document.getElementById('mobileMenu') || document.getElementById('mobileNav');
        if (!menu) {
            menu = document.createElement('div'); menu.id = 'mobileMenu'; menu.className = 'mobile-menu';
            const list = document.createElement('ul');
            for (const link of document.querySelectorAll('.nav-menu a')) {
                const item = document.createElement('li'); item.append(link.cloneNode(true)); list.append(item);
            }
            menu.append(list); document.body.append(menu);
        }
        const toggle = document.querySelector('.hamburger');
        if (!toggle) return;
        menu.dataset.siteMenu = '';
        const desktop = window.matchMedia('(min-width: 1101px)');
        const navbar = document.getElementById('navbar');
        let previousOverflow = '';
        const positionMenu = () => {
            const bottom = navbar?.getBoundingClientRect().bottom || 60;
            document.documentElement.style.setProperty('--site-nav-bottom', `${Math.max(48, bottom)}px`);
        };
        const setOpen = open => {
            const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
            if (open) { positionMenu(); if (!wasOpen) previousOverflow = document.body.style.overflow; }
            menu.classList.toggle('open', open); menu.classList.toggle('active', open);
            menu.hidden = !open; toggle.classList.toggle('active', open);
            toggle.setAttribute('aria-expanded', String(open));
            if (open) document.body.style.overflow = 'hidden';
            else if (wasOpen) document.body.style.overflow = previousOverflow;
        };
        toggle.setAttribute('aria-controls', menu.id); setOpen(false);
        // Capture owns the shared menu so legacy page listeners cannot toggle it twice.
        toggle.addEventListener('click', event => {
            event.stopImmediatePropagation(); setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        }, true);
        menu.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
        });
        desktop.addEventListener('change', () => { if (desktop.matches) setOpen(false); });
        document.addEventListener('click', event => {
            if (!menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
        });
        if (navbar && 'ResizeObserver' in window) new ResizeObserver(positionMenu).observe(navbar);
    }

    function injectSkipLink() {
        if (document.querySelector('a.skip-link[href^="#"]')) return;

        const skip = document.createElement('a');
        skip.className = 'skip-link';
        skip.href = '#main-content';
        skip.textContent = 'Skip to main content';
        document.body.insertAdjacentElement('afterbegin', skip);

        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main-content';
        }
    }

    function applyTheme(theme) {
        const useLight = theme === 'light';
        document.documentElement.classList.toggle('light-mode', useLight);
        document.body.classList.toggle('light-mode', useLight);

        const themeBtn = document.getElementById('themeToggleBtn');
        if (themeBtn) {
            themeBtn.innerHTML = useLight
                ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
                : '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
            themeBtn.setAttribute('title', useLight ? 'Switch to dark mode' : 'Switch to light mode');
            themeBtn.setAttribute('aria-label', useLight ? 'Switch to dark mode' : 'Switch to light mode');
        }
    }

    function setTranslateCookies(langCode) {
        const cookieValue = `/en/${langCode}`;
        document.cookie = `googtrans=${cookieValue}; path=/`;
        document.cookie = `googtrans=${cookieValue}; path=/; SameSite=Lax`;
    }

    function clearTranslateCookies() {
        document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    function loadGoogleTranslateScript() {
        return new Promise((resolve) => {
            if (document.getElementById('googleTranslateScript')) {
                resolve();
                return;
            }

            window.googleTranslateElementInit = function() {
                if (!window.google || !window.google.translate) { resolve(); return; }
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en', autoDisplay: false },
                    'google_translate_element'
                );
                resolve();
            };

            const script = document.createElement('script');
            script.id = 'googleTranslateScript';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            script.onerror = resolve;
            document.head.appendChild(script);
        });
    }

    window.toggleTheme = () => {
        const currentTheme = getPreferredTheme();
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('sanzy_theme', nextTheme);
        applyTheme(nextTheme);
    };

    function setLanguagePanelOpen(open) {
        const panel = document.getElementById('languagePanel');
        if (!panel) return;
        const toggle = document.getElementById('langToggleBtn');
        panel.classList.toggle('open', open);
        panel.hidden = !open;
        panel.toggleAttribute('inert', !open);
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        toggle?.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    window.toggleLangPanel = () => {
        const panel = document.getElementById('languagePanel');
        if (!panel) return;
        setLanguagePanelOpen(!panel.classList.contains('open'));
    };

    window.setSiteLanguage = async (langCode) => {
        localStorage.setItem('sanzy_lang', langCode);

        // Update active button state immediately
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === langCode);
        });

        if (langCode === 'en') {
            clearTranslateCookies();
            window.location.reload();
            return;
        }

        setTranslateCookies(langCode);
        await loadGoogleTranslateScript();

        // Wait a tick for the widget to initialize, then trigger translation
        setTimeout(() => {
            // Try to programmatically select the language in the Google Translate widget
            const selectEl = document.querySelector('.goog-te-combo');
            if (selectEl) {
                selectEl.value = langCode;
                selectEl.dispatchEvent(new Event('change'));
            } else {
                // Fallback: reload with cookie set
                window.location.reload();
            }
        }, 500);
    };

    // Build the markup for all global elements
    function injectGlobalElements() {
        const body = document.body;
        const savedLang = localStorage.getItem('sanzy_lang') || 'en';

        const langButtonsHtml = languageOptions
            .map((lang) => `<button class="lang-btn${lang.code === savedLang ? ' active' : ''}" data-lang="${lang.code}">${lang.label}</button>`)
            .join('');

        // Only show language controls when multiple languages are configured.
        const langControlHtml = (languageOptions && languageOptions.length > 1) ? `
                <button class="site-control-btn" id="langToggleBtn" aria-label="Change language" title="Change language" aria-controls="languagePanel" aria-expanded="false"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg></button>
                <div class="language-panel" id="languagePanel" aria-hidden="true" hidden inert>
                    <div class="language-panel-title">Choose Language</div>
                    <div class="language-list" id="languageList">
                        ${langButtonsHtml}
                    </div>
                </div>
            ` : '';

        const controlsHTML = `
            <div class="site-controls" id="siteControls">
                <button class="site-control-btn wishlist-toggle-btn" id="wishlistBtn" aria-label="View Saved Items" title="Saved Items" aria-controls="wishlistDrawer" aria-expanded="false">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:2px;"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span class="wishlist-count">0</span>
                </button>
                ${langControlHtml}
                <button class="site-control-btn" id="themeToggleBtn" aria-label="Toggle theme" title="Toggle theme">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                </button>
            </div>
            <div id="google_translate_element" class="translate-hidden" aria-hidden="true"></div>
            
            <div class="wishlist-overlay" id="wishlistOverlay"></div>
            <div class="wishlist-drawer" id="wishlistDrawer" role="dialog" aria-label="Saved Items" aria-hidden="true" inert>
                <div class="wish-drawer-header">
                    <h3>Saved Items <span class="wishlist-count">0</span></h3>
                    <button class="wish-drawer-close" id="wishlistClose" aria-label="Close saved items">✕</button>
                </div>
                <div class="wish-drawer-body" id="wishlistDrawerItems">
                    <!-- Wishlist items go here -->
                </div>
                <div class="wish-drawer-footer">
                    <a href="/prompt-store" class="btn btn-primary btn-block">Go to Prompt Store →</a>
                </div>
            </div>
        `;
        body.insertAdjacentHTML('beforeend', controlsHTML);

        const controls = document.getElementById('siteControls');
        
        const navControlHost =
            document.querySelector('.navbar .nav-right') ||
            document.querySelector('.navbar .nav-inner > div:last-child') ||
            document.querySelector('.navbar .navbar-inner > div:last-child');

        if (controls && navControlHost) {
            controls.classList.add('in-navbar');
            navControlHost.appendChild(controls);
        }

        // 1. Cookie Consent Banner
        if (!localStorage.getItem('sanzy_cookies')) {
            const cookieHTML = `
                <div class="cookie-banner" id="cookieBanner">
                    <div class="cookie-text">We use cookies to improve your browsing experience.</div>
                    <div class="cookie-btns">
                        <button class="cookie-btn accept" id="cookieAcceptBtn">Accept</button>
                        <button class="cookie-btn decline" id="cookieDeclineBtn">Decline</button>
                    </div>
                </div>
            `;
            body.insertAdjacentHTML('beforeend', cookieHTML);
            setTimeout(() => {
                const cb = document.getElementById('cookieBanner');
                if (cb) cb.classList.add('show');
            }, 3000);
        }

        document.getElementById('langToggleBtn')?.addEventListener('click', () => {
            window.toggleLangPanel();
        });

        document.getElementById('languagePanel')?.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            setLanguagePanelOpen(false);
            document.getElementById('langToggleBtn')?.focus();
        });

        // Handle language button clicks
        document.getElementById('languageList')?.addEventListener('click', (event) => {
            const btn = event.target.closest('.lang-btn');
            if (!btn) return;
            const langCode = btn.dataset.lang;
            if (langCode) {
                window.setSiteLanguage(langCode);
                // Close language panel
                setLanguagePanelOpen(false);
            }
        });

        document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
            window.toggleTheme();
        });

        document.getElementById('cookieAcceptBtn')?.addEventListener('click', () => {
            window.acceptCookies();
        });

        document.getElementById('cookieDeclineBtn')?.addEventListener('click', () => {
            window.declineCookies();
        });

        // Wishlist Drawer Events
        document.getElementById('wishlistBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.toggleWishlistDrawer();
        });

        document.getElementById('wishlistClose')?.addEventListener('click', () => {
            window.toggleWishlistDrawer();
        });

        document.getElementById('wishlistOverlay')?.addEventListener('click', () => {
            window.toggleWishlistDrawer();
        });

        // Replace any existing Browse Store button in navbar with Wishlist if needed
        // but our current injectGlobalElements might already be doing it via site-controls
        
        updateWishlistUI();

        // Social proof popup removed: static/fabricated notifications were removed to
        // avoid misleading repeat visitors and to improve trustworthiness.

        // Newsletter popup removed permanently to keep page experience clean.
    }

    // ============================================
    // LOGIC CONTROLLERS
    // ============================================

    // Cookie Functions
    window.acceptCookies = () => {
        localStorage.setItem('sanzy_cookies', 'accepted');
        document.getElementById('cookieBanner')?.classList.remove('show');
        // Load analytics only after explicit consent
        if (window.loadAnalytics) window.loadAnalytics();
    };
    window.declineCookies = () => {
        localStorage.setItem('sanzy_cookies', 'declined');
        document.getElementById('cookieBanner')?.classList.remove('show');
    };

    // Load analytics (Google Analytics / GA4) only after user consent.
    window.loadAnalytics = function() {
        const gaId = window.SANZY_GA_ID;
        if (!gaId) return; // no id configured
        if (document.getElementById('sanzyGAScript')) return;
        const script = document.createElement('script');
        script.id = 'sanzyGAScript';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){dataLayer.push(arguments);};
        window.gtag('js', new Date());
        window.gtag('config', gaId, { 'anonymize_ip': true });
    };

    // Kept as no-op handlers for backward compatibility with any legacy inline handlers.
    window.handleGlobalNL = (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
    };
    window.closeGlobalNL = () => {};

    // Social proof logic removed to avoid misleading or static notifications.

    function setActiveNav() {
        const path = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            // Exact match for home page
            if ((path === '/' || path === '/index.html' || path === '') && (href === '/' || href === '/index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else if (href !== '/' && href !== '/index.html' && path.includes(href)) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    
    // Core UI Injection (Run immediately to avoid flicker/delay)
    injectGlobalElements();
    injectSkipLink();
    applyTheme(getPreferredTheme());
    setActiveNav();

    document.addEventListener('DOMContentLoaded', () => {
        applySeoMetadata();

        setupNavA11y();
        setActiveNav();
        // Legacy galleries retain their existing open/close functions and class names.
        for (const element of document.querySelectorAll('#modalOverlay, #portfolioModal, #successOverlay')) {
            const sync = () => {
                const activeClass = element.classList.contains('active') ? 'active' : 'open';
                if (element.classList.contains(activeClass)) openDialog(element, {
                    className: activeClass, restoreOverflow: '',
                    label: element.querySelector('h1,h2,h3')?.textContent?.trim() || 'Project details',
                    onClose: () => element.classList.remove('active', 'open'),
                });
                else closeDialog(element);
            };
            element.querySelectorAll('.modal-close').forEach(button => button.setAttribute('aria-label', 'Close dialog'));
            new MutationObserver(sync).observe(element, { attributes: true, attributeFilter: ['class'] });
        }
        setupEngagementTracking();

        // Footer Newsletter form handling
        document.getElementById('newsletterForm')?.addEventListener('submit', window.handleNewsletterSubmit);

        const savedLang = localStorage.getItem('sanzy_lang') || 'en';
        if (savedLang !== 'en') {
            setTranslateCookies(savedLang);
            loadGoogleTranslateScript();
        }

        // If user previously accepted cookies, initialize analytics now.
        if (localStorage.getItem('sanzy_cookies') === 'accepted' && window.loadAnalytics) {
            window.loadAnalytics();
        }

        document.addEventListener('click', (event) => {
            const panel = document.getElementById('languagePanel');
            const toggleBtn = document.getElementById('langToggleBtn');
            if (!panel || !toggleBtn) return;

            const clickedInsidePanel = panel.contains(event.target);
            const clickedToggle = toggleBtn.contains(event.target);
            if (!clickedInsidePanel && !clickedToggle) {
                setLanguagePanelOpen(false);
            }
        });
    });

})();
