/**
 * globals.js - SanzyAI Global Elements Controller
 * Handles injection of universal UI (Loading, Popups, Bars) without duplicating HTML.
 */

(function() {
    'use strict';

    const SITE_ORIGIN = 'https://sanzyai.com';

    // GA4 Measurement ID — replace with your real ID from analytics.google.com
    window.SANZY_GA_ID = 'G-XXXXXXXXXX';

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

    window.handleNewsletterSubmit = function(e) {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const btn = e.target.querySelector('button');
        if (!input || !btn) return;

        const email = input.value.trim();
        if (!email) return;

        // Store email locally as backup
        const stored = JSON.parse(localStorage.getItem('sanzyai_subscribers') || '[]');
        if (!stored.includes(email)) {
            stored.push(email);
            localStorage.setItem('sanzyai_subscribers', JSON.stringify(stored));
        }

        // Also subscribe via Gumroad follow (real email capture)
        window.open(`https://sanzyai.gumroad.com/follow?email=${encodeURIComponent(email)}`, '_blank', 'width=600,height=400');
        
        const originalText = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #00FF88, #00C870)';
        btn.style.boxShadow = '0 4px 20px rgba(0, 255, 136, 0.4)';
        input.value = '';
        input.disabled = true;
        btn.disabled = true;
        
        window.trackEvent('newsletter_subscribe', { email_domain: email.split('@')[1] });
        if (window.trackConversion) window.trackConversion('newsletter_signup', { method: 'gumroad_follow' });

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.boxShadow = '';
            input.disabled = false;
            btn.disabled = false;
        }, 3000);
    }

    // Wishlist logic
    const WISHLIST_KEY = 'sanzy_wishlist';
    window.getWishlist = () => {
        try {
            return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
        } catch (e) {
            return [];
        }
    };

    window.saveWishlist = (list) => {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: list }));
        updateWishlistUI();
    };

    window.toggleWishlistItem = (id) => {
        let list = window.getWishlist();
        const index = list.indexOf(id);
        if (index > -1) {
            list.splice(index, 1);
            showToast('Removed from wishlist', '💔');
        } else {
            list.push(id);
            showToast('Added to wishlist!', '❤️');
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
                        <div class="wish-empty-icon">❤️</div>
                        <p>Your wishlist is empty</p>
                        <a href="/prompt-store" class="btn btn-primary btn-sm">Browse Prompts</a>
                    </div>
                `;
            } else {
                // Try to get packs from window.packs (if on prompt-store)
                // or fallback to basic item info.
                const packs = window.packs || [];
                drawerList.innerHTML = list.map(id => {
                    const pack = packs.find(p => p.id === id);
                    const name = pack ? pack.name : `AI Prompt Pack #${id}`;
                    const price = pack ? (pack.price > 0 ? '$' + pack.price.toFixed(2) : 'FREE') : 'View Price';
                    
                    return `
                        <div class="wishlist-item" data-id="${id}">
                            <div class="wi-info">
                                <div class="wi-name">${name}</div>
                                <div class="wi-price">${price}</div>
                            </div>
                            <div class="wi-actions">
                                <a href="/prompt-store" class="wi-btn wi-view" title="View Product">👁️</a>
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
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        } else {
            updateWishlistUI();
            drawer.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    };

    const seoByPath = {
        '/': {
            title: 'SanzyAI - Domain Prices, AI Tools, Prompts & Free Learning Hub',
            description: 'Compare domain prices from 10+ registrars, discover curated AI tools, buy AI prompts, hire AI services and learn website building for free.',
            type: 'website',
            schema: {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'SanzyAI',
                url: `${SITE_ORIGIN}/`,
                description: 'AI + domain growth hub with tools, prompts, services, and free learning resources.',
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
            title: 'Buy AI Prompt Packs - ChatGPT, Claude, Gemini | SanzyAI',
            description: 'Shop ready-to-use AI prompt packs with practical use cases, instant access, and lifetime updates.',
            type: 'product.group',
        },
        '/ai-services': {
            title: 'AI Services - Content, Brand, and Growth Ops | SanzyAI',
            description: 'Done-for-you AI services for content, branding, automation, and growth with fast execution.',
            type: 'website',
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
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'ar', label: 'العربية', flag: '🇸🇦' },
        { code: 'pt', label: 'Português', flag: '🇧🇷' },
        { code: 'ru', label: 'Русский', flag: '🇷🇺' },
        { code: 'ja', label: '日本語', flag: '🇯🇵' },
        { code: 'ko', label: '한국어', flag: '🇰🇷' },
        { code: 'zh-CN', label: '中文', flag: '🇨🇳' }
    ];

    function currentPath() {
        const path = window.location.pathname || '/';
        if (path === '/index.html') return '/';
        if (path.endsWith('.html')) return path.replace(/\.html$/i, '');
        return path;
    }

    function getMetaConfig() {
        const path = currentPath();
        return seoByPath[path] || seoByPath['/'];
    }

    function setOrCreateMeta(attrName, attrValue, content) {
        if (!content) return;
        let node = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (!node) {
            node = document.createElement('meta');
            node.setAttribute(attrName, attrValue);
            document.head.appendChild(node);
        }
        node.setAttribute('content', content);
    }

    function setCanonical(url) {
        let link = document.head.querySelector('link[rel="canonical"]');
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

        if (meta.title) document.title = meta.title;
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

        if (meta.schema) {
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
            trackGlobalEvent('lead_form_submit', {
                form_id: String(formId).slice(0, 80),
                page: currentPath(),
            });
        });
    }

    function setupNavA11y() {
        const menus = ['mobileMenu', 'mobileNav'];
        const toggleButtons = document.querySelectorAll('.hamburger');

        toggleButtons.forEach((btn) => {
            const targetId = menus.find((id) => document.getElementById(id));
            if (!targetId) return;

            btn.setAttribute('aria-controls', targetId);
            btn.setAttribute('aria-expanded', 'false');

            btn.addEventListener('click', () => {
                requestAnimationFrame(() => {
                    const menu = document.getElementById(targetId);
                    const isOpen = Boolean(menu && (menu.classList.contains('open') || menu.classList.contains('active')));
                    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                });
            });
        });
    }

    function injectSkipLink() {
        if (document.querySelector('.skip-link')) return;

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
            themeBtn.textContent = useLight ? '☀️' : '🌙';
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

    window.toggleLangPanel = () => {
        const panel = document.getElementById('languagePanel');
        if (!panel) return;

        panel.classList.toggle('open');
        panel.setAttribute('aria-hidden', panel.classList.contains('open') ? 'false' : 'true');
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
            .map((lang) => `<button class="lang-btn${lang.code === savedLang ? ' active' : ''}" data-lang="${lang.code}">${lang.flag} ${lang.label}</button>`)
            .join('');

        // Only show language controls when multiple languages are configured.
        const langControlHtml = (languageOptions && languageOptions.length > 1) ? `
                <button class="site-control-btn" id="langToggleBtn" aria-label="Change language" title="Change language">🌐</button>
                <div class="language-panel" id="languagePanel" aria-hidden="true">
                    <div class="language-panel-title">Choose Language</div>
                    <div class="language-list" id="languageList">
                        ${langButtonsHtml}
                    </div>
                </div>
            ` : '';

        const controlsHTML = `
            <div class="site-controls" id="siteControls">
                <button class="site-control-btn wishlist-toggle-btn" id="wishlistBtn" aria-label="View Wishlist" title="Your Wishlist">
                    ❤️ <span class="wishlist-count">0</span>
                </button>
                ${langControlHtml}
                <button class="site-control-btn" id="themeToggleBtn" aria-label="Toggle theme" title="Toggle theme">🌙</button>
            </div>
            <div id="google_translate_element" class="translate-hidden" aria-hidden="true"></div>
            
            <div class="wishlist-overlay" id="wishlistOverlay"></div>
            <div class="wishlist-drawer" id="wishlistDrawer">
                <div class="wish-drawer-header">
                    <h3>My Wishlist <span class="wishlist-count">0</span></h3>
                    <button class="wish-drawer-close" id="wishlistClose">✕</button>
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
                    <div class="cookie-text">🍪 We use cookies to improve experience.</div>
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

        // Handle language button clicks
        document.getElementById('languageList')?.addEventListener('click', (event) => {
            const btn = event.target.closest('.lang-btn');
            if (!btn) return;
            const langCode = btn.dataset.lang;
            if (langCode) {
                window.setSiteLanguage(langCode);
                // Close language panel
                const panel = document.getElementById('languagePanel');
                if (panel) {
                    panel.classList.remove('open');
                    panel.setAttribute('aria-hidden', 'true');
                }
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
            
            // Exact match for home page
            if ((path === '/' || path === '/index.html' || path === '') && (href === '/' || href === '/index.html')) {
                link.classList.add('active');
            } else if (href !== '/' && href !== '/index.html' && path.includes(href)) {
                link.classList.add('active');
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
                panel.classList.remove('open');
                panel.setAttribute('aria-hidden', 'true');
            }
        });
    });

})();
