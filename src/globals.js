/**
 * globals.js - SanzyAI Global Elements Controller
 * Handles injection of universal UI (Loading, Popups, Bars) without duplicating HTML.
 */

(function() {
    'use strict';

    const SITE_ORIGIN = 'https://sanzyai.com';

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
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'Hindi' },
        { code: 'es', label: 'Spanish' },
        { code: 'fr', label: 'French' },
        { code: 'de', label: 'German' },
        { code: 'ar', label: 'Arabic' },
        { code: 'pt', label: 'Portuguese' },
        { code: 'ru', label: 'Russian' },
        { code: 'ja', label: 'Japanese' },
        { code: 'ko', label: 'Korean' },
        { code: 'zh-CN', label: 'Chinese' }
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
        if (document.getElementById('googleTranslateScript')) return;

        const script = document.createElement('script');
        script.id = 'googleTranslateScript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
    }

    window.googleTranslateElementInit = function() {
        if (!window.google || !window.google.translate) return;
        new window.google.translate.TranslateElement(
            { pageLanguage: 'en', autoDisplay: false },
            'google_translate_element'
        );
    };

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

    window.setSiteLanguage = (langCode) => {
        localStorage.setItem('sanzy_lang', langCode);

        if (langCode === 'en') {
            clearTranslateCookies();
            window.location.reload();
            return;
        }

        setTranslateCookies(langCode);
        loadGoogleTranslateScript();
        setTimeout(() => {
            window.location.reload();
        }, 120);
    };

    // Build the markup for all global elements
    function injectGlobalElements() {
        const body = document.body;

        const optionsHtml = languageOptions
            .map((lang) => `<option value="${lang.code}">${lang.label}</option>`)
            .join('');

        // Only show language controls when multiple languages are configured.
        const langControlHtml = (languageOptions && languageOptions.length > 1) ? `
                <button class="site-control-btn" id="langToggleBtn" onclick="window.toggleLangPanel()" aria-label="Change language" title="Change language">🌐</button>
                <div class="language-panel" id="languagePanel" aria-hidden="true">
                    <div class="language-panel-title">Choose language</div>
                    <select id="siteLangSelect" class="site-lang-select" onchange="window.setSiteLanguage(this.value)">
                        ${optionsHtml}
                    </select>
                </div>
            ` : '';

        const controlsHTML = `
            <div class="site-controls" id="siteControls">
                ${langControlHtml}
                <button class="site-control-btn" id="themeToggleBtn" onclick="window.toggleTheme()" aria-label="Toggle theme" title="Toggle theme">🌙</button>
            </div>
            <div id="google_translate_element" class="translate-hidden" aria-hidden="true"></div>
        `;
        body.insertAdjacentHTML('beforeend', controlsHTML);

        const controls = document.getElementById('siteControls');
        const navControlHost =
            document.querySelector('.navbar .nav-right') ||
            document.querySelector('.navbar .nav-inner > div:last-child') ||
            document.querySelector('.navbar .navbar-inner > div:last-child');

        if (controls && navControlHost && !navControlHost.contains(controls)) {
            controls.classList.add('in-navbar');
            navControlHost.appendChild(controls);
        }

        // If the language select ended up with only one option (English), remove the
        // language toggle to avoid showing a non-functional UI element.
        const _langSelect = document.getElementById('siteLangSelect');
        if (_langSelect && _langSelect.options.length <= 1) {
            document.getElementById('langToggleBtn')?.remove();
            document.getElementById('languagePanel')?.remove();
        }

        // 1. Cookie Consent Banner
        if (!localStorage.getItem('sanzy_cookies')) {
            const cookieHTML = `
                <div class="cookie-banner" id="cookieBanner">
                    <div class="cookie-text">🍪 We use cookies to improve experience.</div>
                    <div class="cookie-btns">
                        <button class="cookie-btn accept" onclick="window.acceptCookies()">Accept</button>
                        <button class="cookie-btn decline" onclick="window.declineCookies()">Decline</button>
                    </div>
                </div>
            `;
            body.insertAdjacentHTML('beforeend', cookieHTML);
            setTimeout(() => {
                const cb = document.getElementById('cookieBanner');
                if (cb) cb.classList.add('show');
            }, 3000);
        }

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

    // ============================================
    // INITIALIZATION
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        applySeoMetadata();
        applyTheme(getPreferredTheme());

        injectGlobalElements();
        injectSkipLink();
        setupNavA11y();
        setupEngagementTracking();

        const savedLang = localStorage.getItem('sanzy_lang') || 'en';
        const langSelect = document.getElementById('siteLangSelect');
        if (langSelect) {
            langSelect.value = savedLang;
        }
        if (savedLang !== 'en') {
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

        // Newsletter popup scheduling removed permanently.

        // Social proof toasts: DISABLED — they were overlapping content
        // Users found them intrusive; the trust bar already provides social proof
    });

})();
