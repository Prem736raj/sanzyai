/**
 * globals.js - SanzyAI Global Elements Controller
 * Handles injection of universal UI (Loading, Popups, Bars) without duplicating HTML.
 */

(function() {
    'use strict';

    // Build the markup for all global elements
    function injectGlobalElements() {
        const body = document.body;

        // 1. Reading Progress Bar
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-container';
        progressBar.innerHTML = '<div class="progress-bar" id="readingProgress"></div>';
        body.insertBefore(progressBar, body.firstChild);

        // 2. Announcement Bar
        const announceBar = document.createElement('div');
        announceBar.className = 'announce-bar';
        announceBar.id = 'announceBar';
        announceBar.innerHTML = '🎉 FREE: Get 10 AI Prompts - No Credit Card Needed <a href="prompt-store.html">→ Claim Now</a><button class="announce-close" onclick="window.closeAnnounce()" aria-label="Close announcement">✕</button>';
        body.insertBefore(announceBar, body.firstChild);
        body.classList.add('has-announce');

        // 3. Loading Screen
        // We only want this to run once per session to avoid annoying users on every navigate
        if (!sessionStorage.getItem('sanzy_loaded')) {
            const loaderHTML = `
                <div class="global-loader" id="globalLoader">
                    <div class="loader-logo">⚡</div>
                    <div class="loader-text">Loading your AI hub...</div>
                </div>
            `;
            body.insertAdjacentHTML('beforeend', loaderHTML);
            sessionStorage.setItem('sanzy_loaded', 'true');
            
            // Remove loader after 2 seconds
            setTimeout(() => {
                const loader = document.getElementById('globalLoader');
                if (loader) {
                    loader.classList.add('hide');
                    setTimeout(() => loader.remove(), 500);
                }
            }, 2000);
        }

        // 4. WhatsApp Button
        const waHTML = `
            <a href="https://wa.me/1234567890" target="_blank" class="whatsapp-btn" title="Chat on WhatsApp" aria-label="Chat on WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span class="wa-tooltip">WhatsApp</span>
            </a>
        `;
        body.insertAdjacentHTML('beforeend', waHTML);

        // 5. Cookie Consent Banner
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

        // 6. Social Proof Popup
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

        // 7. Newsletter Popup
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

    // Announce Bar Close
    window.closeAnnounce = () => {
        const bar = document.getElementById('announceBar');
        if (bar) {
            bar.style.transition = 'all 0.3s ease';
            bar.style.maxHeight = '0';
            bar.style.padding = '0';
            bar.style.opacity = '0';
            bar.style.overflow = 'hidden';
            setTimeout(() => {
                bar.remove();
                document.body.classList.remove('has-announce');
            }, 300);
        }
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

    // Read Progress Logic
    function updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const pb = document.getElementById('readingProgress');
        if (pb) pb.style.width = scrolled + '%';
    }

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
        injectGlobalElements();

        // Attach scroll for progress
        window.addEventListener('scroll', updateProgress);

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
