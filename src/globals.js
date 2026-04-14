/**
 * globals.js - SanzyAI Global Elements Controller
 * Handles injection of universal UI (Loading, Popups, Bars) without duplicating HTML.
 */

(function() {
    'use strict';

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
        const currentTheme = localStorage.getItem('sanzy_theme') || 'dark';
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

        const controlsHTML = `
            <div class="site-controls" id="siteControls">
                <button class="site-control-btn" id="langToggleBtn" onclick="window.toggleLangPanel()" aria-label="Change language" title="Change language">🌐</button>
                <div class="language-panel" id="languagePanel" aria-hidden="true">
                    <div class="language-panel-title">Choose language</div>
                    <select id="siteLangSelect" class="site-lang-select" onchange="window.setSiteLanguage(this.value)">
                        ${optionsHtml}
                    </select>
                </div>
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

        // 2. Social Proof Popup
        const spHTML = `
            <div class="social-proof" id="socialProof">
                <div class="sp-icon">🔥</div>
                <div>
                    <div class="sp-text" id="spText"><span>John from USA</span> just bought Business Pack</div>
                    <span class="sp-time">Just now</span>
                </div>
            </div>
        `;
        body.insertAdjacentHTML('beforeend', spHTML);

        // 3. Newsletter Popup
        if (!localStorage.getItem('sanzy_newsletter_subbed')) {
            const nlHTML = `
                <div class="nl-overlay" id="nlOverlay">
                    <div class="nl-modal">
                        <span class="nl-icon">📬</span>
                        <h2>Get Weekly AI Tips & Deals</h2>
                        <p>Join 10,000+ creators dominating the digital space with our free weekly insights.</p>
                        <form class="nl-form" onsubmit="window.handleGlobalNL(event)">
                            <input type="email" placeholder="Enter your email" required>
                            <button type="submit">Subscribe Free</button>
                        </form>
                        <button class="nl-close-btn" onclick="window.closeGlobalNL()">No thanks, I'll pass</button>
                    </div>
                </div>
            `;
            body.insertAdjacentHTML('beforeend', nlHTML);
        }
    }

    // ============================================
    // LOGIC CONTROLLERS
    // ============================================

    // Cookie Functions
    window.acceptCookies = () => {
        localStorage.setItem('sanzy_cookies', 'accepted');
        document.getElementById('cookieBanner')?.classList.remove('show');
    };
    window.declineCookies = () => {
        localStorage.setItem('sanzy_cookies', 'declined');
        document.getElementById('cookieBanner')?.classList.remove('show');
    };

    // Newsletter Functions
    window.handleGlobalNL = (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.textContent = '✅ Subscribed!';
        btn.style.background = '#00C851';
        localStorage.setItem('sanzy_newsletter_subbed', 'true');
        setTimeout(() => window.closeGlobalNL(), 2000);
    };
    window.closeGlobalNL = () => {
        document.getElementById('nlOverlay')?.classList.remove('show');
        // Prevent showing again for this session if just closed, or forever if they want
        sessionStorage.setItem('nl_closed_session', 'true');
    };

    // Social Proof Logic
    const spNames = ['John from USA', 'Sarah from UK', 'Mike from CA', 'Emma from AUS', 'David from NY', 'Chloe from TX'];
    const spActions = [
        'just bought Business Prompt Pack',
        'just enrolled in the Free Course',
        'subscribed to the Newsletter',
        'just downloaded Midjourney Prompts',
        'found a $8.88 .com domain'
    ];

    function showSocialProof() {
        const sp = document.getElementById('socialProof');
        const spText = document.getElementById('spText');
        if (!sp || !spText) return;

        const name = spNames[Math.floor(Math.random() * spNames.length)];
        const action = spActions[Math.floor(Math.random() * spActions.length)];
        
        spText.innerHTML = `<span>${name}</span> ${action}`;
        sp.classList.add('show');

        // Hide after 5 seconds
        setTimeout(() => {
            sp.classList.remove('show');
        }, 5000);
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('sanzy_theme') || 'dark';
        applyTheme(savedTheme);

        injectGlobalElements();

        const savedLang = localStorage.getItem('sanzy_lang') || 'en';
        const langSelect = document.getElementById('siteLangSelect');
        if (langSelect) {
            langSelect.value = savedLang;
        }
        if (savedLang !== 'en') {
            loadGoogleTranslateScript();
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

        // Schedule Newsletter (90 seconds — plenty of time to explore first)
        setTimeout(() => {
            if (!localStorage.getItem('sanzy_newsletter_subbed') && !sessionStorage.getItem('nl_closed_session')) {
                const overlay = document.getElementById('nlOverlay');
                if (overlay) overlay.classList.add('show');
            }
        }, 90000);

        // Social proof toasts: DISABLED — they were overlapping content
        // Users found them intrusive; the trust bar already provides social proof
    });

})();
