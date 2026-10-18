import DOMPurify from 'dompurify';
import './chat.css';

(function() {
    'use strict';

    // =============================================
    // DYNAMIC MARKUP INJECTION
    // =============================================
    function injectSanzyBot() {
        if (document.getElementById('sanzyWindow')) return;

        const widgetHTML = `
            <!-- Floating Button -->
            <div class="sanzy-btn-wrap">
                <button class="sanzy-float-btn" id="sanzyFloatBtn" aria-label="Open Sanzy Guide" aria-controls="sanzyWindow" aria-expanded="false" draggable="false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <div class="sanzy-notif" id="sanzyNotif">1</div>
                </button>
            </div>

            <!-- Chat Window -->
            <div class="sanzy-window" id="sanzyWindow" role="dialog" aria-modal="true" aria-labelledby="sanzyDialogTitle" aria-label="Sanzy Guide" tabindex="-1">
                <!-- Header -->
                <div class="sanzy-header">
                    <div class="sanzy-avatar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                    <div class="sanzy-header-info">
                        <span class="sanzy-name" id="sanzyDialogTitle">Sanzy Guide</span>
                            <div class="sanzy-status">
                                <span class="sanzy-status-dot" id="sanzyStatusDot"></span>
                                <span id="sanzyStatusText">Online · Ready to help</span>
                            </div>
                    </div>
                    <div class="sanzy-header-btns">
                        <button class="sanzy-hbtn" data-action="restart-chat" title="Restart chat">↺</button>
                        <button class="sanzy-hbtn" data-action="close-chat" title="Close chat">✕</button>
                    </div>
                </div>

                <!-- Page-Specific Banner -->
                <div class="sanzy-page-banner hide" id="sanzyPageBanner">
                    <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/></svg></span>
                    <span id="sanzyBannerText"></span>
                </div>

                <!-- Messages -->
                <div class="sanzy-messages" id="sanzyMessages"></div>

                <!-- Quick Replies (shown initially) -->
                <div class="sanzy-quick-replies" id="sanzyQuickReplies"></div>

                <!-- Input Area -->
                <div class="sanzy-input-area">
                    <div class="sanzy-input-row">
                        <input
                            type="text"
                            class="sanzy-input"
                            id="sanzyInput"
                            placeholder="Ask Sanzy anything..."
                            maxlength="500"
                            autocomplete="off"
                        >
                        <button class="sanzy-send" id="sanzySend" title="Send message">
                            ➤
                        </button>
                    </div>
                    <div class="sanzy-input-footer">
                        <div class="sanzy-powered">Powered by <span>SanzyAI</span></div>
                        <button class="sanzy-restart" data-action="restart-chat">↺ New chat</button>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('sanzyLauncherWrap')?.remove();
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    // =============================================
    // SANZY BOT ENGINE
    // =============================================
    const SanzyBot = {

        // ---- STATE ----
        isOpen: false,
        isTyping: false,
        connected: false,
        backendUrl: '',
        conversationHistory: [],
        hasGreeted: false,
        currentPage: 'home',
        notifCount: 1,
        typingTimer: null,
        lastFocusedEl: null,

        // ---- DOM REFS ----
        get window() { return document.getElementById('sanzyWindow'); },
        get messages() { return document.getElementById('sanzyMessages'); },
        get input() { return document.getElementById('sanzyInput'); },
        get sendBtn() { return document.getElementById('sanzySend'); },
        get floatBtn() { return document.getElementById('sanzyFloatBtn'); },
        get label() { return document.getElementById('sanzyLabel'); },
        get notif() { return document.getElementById('sanzyNotif'); },
        get quickReplies() { return document.getElementById('sanzyQuickReplies'); },
        get pageBanner() { return document.getElementById('sanzyPageBanner'); },
        get bannerText() { return document.getElementById('sanzyBannerText'); },

        // =============================================
        // PAGE DETECTION
        // =============================================
        detectPage() {
            const url = window.location.href.toLowerCase();
            const path = window.location.pathname.toLowerCase();
            if (path.includes('domain')) return 'domain';
            if (path.includes('ai-tools') || path.includes('tools')) return 'tools';
            if (path.includes('prompt')) return 'prompts';
            if (path.includes('service')) return 'services';
            if (path.includes('learn')) return 'learn';
            if (path.includes('blog')) return 'blog';
            return 'home';
        },

        // =============================================
        // PAGE-SPECIFIC MESSAGES
        // =============================================
        pageMessages: {
            home: null,
            domain: 'Looking for domain pricing? Type any domain name in the finder above and check registrar rates.',
            tools: 'Looking for an AI tool? Let us know what you want to accomplish.',
            prompts: 'Explore editable samples. Paid packs are paused during a content-quality review.',
            services: 'Interested in AI services? Share your budget and project goals to explore options.',
            learn: 'Explore eight stages of free website-building guidance at your own pace.',
            blog: 'Looking for a specific topic? Ask here or browse categories in the sidebar.'
        },

        // =============================================
        // RESPONSE DATABASE
        // =============================================
        responses: {
            domain: {
                keywords: ['domain','registrar','cheap','cheapest','namecheap','godaddy','porkbun','cloudflare','spaceship','.com','.io','.ai','.net','.org','buy domain','domain price','register'],
                response: `Compare domain registration and renewal estimates in the Domain Price Finder. Confirm the final price, taxes and terms with the registrar before buying.

<a class="bot-link-btn" href="/domain-finder">Open Domain Finder →</a>`
            },
            tools: {
                keywords: ['ai tools','tools','chatgpt','midjourney','claude','gemini','elevenlabs','cursor','jasper','copy.ai','runway','synthesia','perplexity','best ai','ai tool','tool recommendation','which tool','what tool'],
                response: `We have a curated AI tools list you can browse right now!

**Examples listed in the directory:**
• ChatGPT — Used for writing & chat
• Midjourney — Used for AI images
• ElevenLabs — Used for voice & audio
• Cursor AI — Used for coding
• Perplexity — Used for research

<a class="bot-link-btn" href="/ai-tools">Browse All AI Tools →</a>

**Want a personalized recommendation?** Just tell me:
• What do you want to create?
• What is your budget?
• Are you a beginner or advanced?`
            },
            prompts: {
                keywords: ['prompt','prompts','prompt pack','midjourney prompts','chatgpt prompts','buy prompts','prompt store','prompt marketplace','writing prompts','business prompts','seo prompts'],
                response: `Paid prompt packs are paused during a content-quality review. You can explore editable samples and download the free starter pack without checkout.

<a class="bot-link-btn" href="/prompt-store">Browse prompt samples →</a>
<a class="bot-link-btn" href="/prompt-store#free">Get the free starter pack →</a>`
            },
            services: {
                keywords: ['service','services','hire','agency','content','logo','chatbot','automation','social media','ai service','freelance','build for me','help me','setup','create','make','design'],
                response: `For custom project inquiries, reach out through our contact page with your goals, budget, and timeline. Scope, pricing, and delivery dates are confirmed directly with our team.

<a class="bot-link-btn" href="/contact">Send a project inquiry →</a>`
            },
            learn: {
                keywords: ['learn','course','tutorial','free course','website','build website','hosting','seo learn','how to','guide','beginner','start','domain learn','make money learn','certificate'],
                response: `The free learning hub has eight stages covering domain setup, hosting, building, design, launch, SEO, monetization and AI tools. Work through the guidance at your own pace; no certificate is currently offered.

<a class="bot-link-btn" href="/learn-free">Start the free guide →</a>`
            },
            money: {
                keywords: ['money','earn','income','make money','profit','revenue','adsense','affiliate','sell','freelance income','$','dollar','passive income','side hustle','online business'],
                response: `You can explore service work, useful digital products or a content website. Validate demand, account for costs and test a small offer first. Results depend on your skills, audience and execution; the site does not promise earnings.

<a class="bot-link-btn" href="/learn-free">Explore the learning guide →</a>`
            },
            pricing: {
                keywords: ['price','pricing','cost','how much','free','paid','subscription','monthly','yearly','plan','affordable','budget','cheap'],
                response: `Browsing the directory, domain finder, learning guide and prompt samples is free. External tools and registrars set their own prices.

Paid prompt checkout is paused during a content-quality review. Service quotes need confirmation for your scope.

<a class="bot-link-btn" href="/prompt-store">View prompt samples →</a>
<a class="bot-link-btn" href="/contact">Send a project inquiry →</a>`
            },
            hello: {
                keywords: ['hi','hello','hey','hiya','howdy','sup','what\'s up','good morning','good evening','greetings','yo'],
                response: `Hello! Great to see you.

I'm Sanzy, your guide on SanzyAI.com.

Here is what I can help with:
• Find cheapest domain prices
• Discover the best AI tools
• Explore prompt samples
• Get in touch for custom projects
• Start learning for free

What would you like to explore today?`
            },
            help: {
                keywords: ['help','what can you do','what do you know','capabilities','options','menu','features','tell me about','what is sanzy'],
                response: `I'm Sanzy, and here is what I can help you with:

**Domain Tools**
Find registrars, compare prices, and tips on choosing domains.

**AI Tools**
Curated tools list — recommendations based on your needs.

**Prompt Store**
Prompt packs explained, free samples, and usage guides.

**AI Services**
Pricing, packages, and requesting quotes for custom work.

**Free Learning**
Step-by-step guidance through our free web-building course.

**Blog**
Find specific articles, guides, and tutorials.

Just type what you need and I'll help right away!`
            },
            thanks: {
                keywords: ['thank','thanks','thank you','ty','cheers','appreciate','helpful','great','awesome','nice','perfect','excellent','love it','brilliant'],
                response: `You're welcome! That's what I'm here for.

Here are some things you might explore:
• <a class="bot-link-btn" href="/domain-finder">Find Domain Price</a>
• <a class="bot-link-btn" href="/ai-tools">Browse AI Tools</a>
• <a class="bot-link-btn" href="/learn-free">Start Free Course</a>

Feel free to ask anytime!`
            },
            contact: {
                keywords: ['contact','email','support','help desk','reach','talk to human','real person','team','sanzyai email'],
                response: `Use the contact page to find published support options. Response and delivery times need confirmation by the team.

<a class="bot-link-btn" href="/contact">Contact SanzyAI →</a>`
            }
        },

        // =============================================
        // GREETING MESSAGE
        // =============================================
        greetingMessage: `Hello! I'm **Sanzy**, your guide on SanzyAI.com.

I can help you:
• Find cheapest domain prices
• Discover top AI tools
• Explore prompt samples
• Hire AI services
• Learn to build websites — free!

**What would you like to explore today?**`,

        quickRepliesData: [
            { icon:'', text:'Find Domain Price', query:'domain price' },
            { icon:'', text:'AI Tools', query:'ai tools' },
            { icon:'', text:'Prompt Samples', query:'prompts' },
            { icon:'', text:'AI Services', query:'services' },
            { icon:'', text:'Learn Free', query:'learn' }
        ],

        // =============================================
        // INITIALIZE
        // =============================================
        init() {
            if (document.body.classList.contains('no-float-widgets')) return;
            injectSanzyBot();
            this.currentPage = this.detectPage();
            this.backendUrl = window.SANZY_BOT_BACKEND_URL || '/api/chat';
            this.setupEventListeners();
            this.showPageBanner();
            this.setupAutoOpen();

            // Start in demo mode and upgrade to connected if backend health check passes.
            this.setConnectionStatus(false);
            this.detectBackendConnection();
        },

        setConnectionStatus(isConnected) {
            const statusTextEl = document.getElementById('sanzyStatusText');
            const statusDotEl = document.getElementById('sanzyStatusDot');
            this.connected = Boolean(isConnected);

            if (!statusTextEl || !statusDotEl) return;
            if (this.connected) {
                statusTextEl.textContent = 'Online · Connected to AI';
                statusDotEl.classList.remove('demo');
            } else {
                statusTextEl.textContent = 'Site guide · AI unavailable';
                statusDotEl.classList.add('demo');
            }
        },

        async detectBackendConnection() {
            if (!this.backendUrl) {
                this.setConnectionStatus(false);
                return;
            }

            const healthUrl = this.backendUrl.replace(/\/chat$/, '/ready');
            try {
                const res = await fetch(healthUrl, { method: 'GET', signal: AbortSignal.timeout(2500) });
                const readiness = await res.json();
                this.setConnectionStatus(res.ok && readiness.ready === true);
            } catch (e) {
                this.setConnectionStatus(false);
            }
        },

        async fetchAIReply(text) {
            if (!this.connected || !this.backendUrl) return null;

            try {
                const history = this.conversationHistory.slice(-6).map(entry => ({ role: entry.role === 'bot' ? 'assistant' : 'user', text: entry.text.slice(0, 800) }));
                const res = await fetch(this.backendUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text, history }),
                    signal: AbortSignal.timeout(10000)
                });

                if (!res.ok) { this.setConnectionStatus(false); return null; }
                const data = await res.json();
                return data?.reply ? String(data.reply).trim() : null;
            } catch (e) {
                return null;
            }
        },

        setupEventListeners() {
            if (this.floatBtn) {
                this.floatBtn.addEventListener('click', () => this.toggle());
            }

            // Send on Enter
            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSend();
                }
            });

            // Send button click
            if (this.sendBtn) this.sendBtn.addEventListener('click', () => this.handleSend());

            if (this.window) {
                this.window.addEventListener('click', (e) => {
                    const actionEl = e.target.closest('[data-action]');
                    if (!actionEl) return;

                    if (actionEl.dataset.action === 'restart-chat') {
                        e.preventDefault();
                        this.restart();
                        return;
                    }

                    if (actionEl.dataset.action === 'close-chat') {
                        e.preventDefault();
                        this.close();
                    }
                });
            }

            // Input changes
            if (this.input) {
                this.input.addEventListener('input', () => {
                    this.sendBtn.disabled = this.input.value.trim().length === 0;
                });
            }

            // Keep keyboard focus trapped while dialog is open.
            document.addEventListener('keydown', (e) => {
                if (!this.isOpen) return;

                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.close();
                    return;
                }

                if (e.key !== 'Tab') return;
                const focusable = this.getFocusableElements();
                if (!focusable.length) return;

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
            });
        },

        getFocusableElements() {
            if (!this.window) return [];
            return Array.from(this.window.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
                .filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
        },

        setupAutoOpen() {
            // Show notification after 3s
            setTimeout(() => {
                if (!this.isOpen) {
                    if (this.notif) this.notif.classList.remove('hide');
                }
            }, 3000);
        },

        showPageBanner() {
            const msg = document.body.dataset.chatMessage || this.pageMessages[this.currentPage];
            if (msg && this.pageBanner && this.bannerText) {
                this.bannerText.textContent = msg;
                this.pageBanner.classList.remove('hide');
            }
        },

        // =============================================
        // OPEN / CLOSE / TOGGLE
        // =============================================
        open() {
            initializeChat();
            if (!this.window || !this.floatBtn || this.isOpen) return;
            this.isOpen = true;
            this.lastFocusedEl = document.activeElement;
            this.window.classList.add('open');
            this.floatBtn.classList.add('bot-open');
            this.floatBtn.setAttribute('aria-expanded', 'true');
            this.floatBtn.textContent = '';
            this.floatBtn.innerHTML = '<span>✕</span>';

            // Greet on first open
            if (!this.hasGreeted) {
                this.hasGreeted = true;
                setTimeout(() => this.greet(), 300);
            }

            // Focus input
            setTimeout(() => this.input.focus(), 400);
        },

        close() {
            this.isOpen = false;
            this.window.classList.remove('open');
            this.floatBtn.classList.remove('bot-open');
            this.floatBtn.setAttribute('aria-expanded', 'false');
            this.floatBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><div class="sanzy-notif hide" id="sanzyNotif">1</div>';

            if (this.lastFocusedEl && typeof this.lastFocusedEl.focus === 'function') {
                this.lastFocusedEl.focus();
            }
        },

        toggle() {
            if (this.isOpen) this.close();
            else this.open();
        },

        restart() {
            this.messages.innerHTML = '';
            this.quickReplies.innerHTML = '';
            this.conversationHistory = [];
            this.hasGreeted = false;
            this.input.value = '';
            setTimeout(() => this.greet(), 200);
        },

        // =============================================
        // GREETING
        // =============================================
        greet() {
            this.addDivider('Today');
            this.showTyping();

            setTimeout(() => {
                this.hideTyping();
                this.addBotMessage(this.greetingMessage);
                this.showQuickReplies();
            }, 1200);
        },

        // =============================================
        // QUICK REPLIES
        // =============================================
        showQuickReplies() {
            this.quickReplies.innerHTML = '';
            this.quickRepliesData.forEach(qr => {
                const btn = document.createElement('button');
                btn.className = 'qr-btn';
                btn.textContent = qr.icon ? `${qr.icon} ${qr.text}` : qr.text;
                btn.onclick = () => {
                    this.sendUserMessage(qr.text);
                    this.processMessage(qr.query);
                    this.quickReplies.innerHTML = '';
                };
                this.quickReplies.appendChild(btn);
            });
        },

        // =============================================
        // HANDLE SEND
        // =============================================
        handleSend() {
            const text = this.input.value.trim();
            if (!text || this.isTyping) return;

            this.input.value = '';
            this.sendBtn.disabled = true;
            this.quickReplies.innerHTML = '';
            this.sendUserMessage(text);
            this.processMessage(text);
        },

        // =============================================
        // ADD USER MESSAGE
        // =============================================
        sendUserMessage(text) {
            const wrap = document.createElement('div');
            wrap.className = 'sanzy-msg-wrap user';
            wrap.innerHTML = `
                <div>
                    <div class="sanzy-bubble">
                        <div class="sanzy-bubble-text">${this.escapeHtml(text)}</div>
                    </div>
                    <div class="sanzy-time" style="padding-right:6px;">${this.getTime()}</div>
                </div>
                <div class="sanzy-msg-ava"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
            `;
            this.messages.appendChild(wrap);
            this.scrollBottom();
            this.conversationHistory.push({ role:'user', text });
        },

        // =============================================
        // PROCESS USER MESSAGE & GET RESPONSE
        // =============================================
        processMessage(text) {
            const lc = text.toLowerCase();
            let matched = null;

            // Find matching response
            for (const [key, data] of Object.entries(this.responses)) {
                if (data.keywords.some(kw => lc.includes(kw))) {
                    matched = data.response;
                    break;
                }
            }

            if (!matched) {
                matched = this.getDefaultResponse();
            }

            // Show typing then respond
            this.showTyping();
            const delay = 800 + Math.random() * 800;

            this.typingTimer = setTimeout(async () => {
                const aiReply = await this.fetchAIReply(text);
                this.hideTyping();
                this.addBotMessage(aiReply || matched);

                // Show suggestions after response
                setTimeout(() => this.showSuggestions(lc), 300);
            }, delay);
        },

        // =============================================
        // CONTEXT-AWARE SUGGESTIONS
        // =============================================
        showSuggestions(query) {
            const sMap = {
                domain: ['Check hosting options', 'Learn domain tips', 'Compare registrars'],
                tools: ['Find writing tools', 'Image AI tools', 'Free tools only'],
                prompts: ['Business prompts', 'Free starter pack', 'Midjourney prompts'],
                services: ['Request consultation', 'View all services', 'Content writing'],
                learn: ['Start Module 1', 'Download resources', 'View learning guide'],
            };

            let sugs = null;
            for (const [key, list] of Object.entries(sMap)) {
                if (query.includes(key) || this.responses[key]?.keywords?.some(k => query.includes(k))) {
                    sugs = list;
                    break;
                }
            }

            if (!sugs) {
                sugs = ['Domain prices', 'AI tools', 'Free course'];
            }

            const container = document.createElement('div');
            container.className = 'sanzy-suggestions';
            sugs.forEach(s => {
                const chip = document.createElement('span');
                chip.className = 'sug-chip';
                chip.textContent = s;
                chip.onclick = () => {
                    container.remove();
                    this.sendUserMessage(s);
                    this.processMessage(s);
                };
                container.appendChild(chip);
            });

            this.messages.appendChild(container);
            this.scrollBottom();
        },

        // =============================================
        // DEFAULT RESPONSE
        // =============================================
        getDefaultResponse() {
            const defaults = [
                `I am not certain about that specific query.

You can explore these sections:
• <a class="bot-link-btn" href="/domain-finder">Domain Price Finder</a>
• <a class="bot-link-btn" href="/ai-tools">AI Tools Directory</a>
• <a class="bot-link-btn" href="/prompt-store">Prompt Store</a>
• <a class="bot-link-btn" href="/learn-free">Free Guide</a>

Or email us at: **hello@sanzyai.com**`,

                `That inquiry falls outside my preconfigured guidance.

Try asking about:
• Domain prices & registrars
• AI tool recommendations
• Prompt templates
• Free website building course

You can also reach out to **hello@sanzyai.com** for direct support.`
            ];

            return defaults[Math.floor(Math.random() * defaults.length)];
        },

        // =============================================
        // ADD BOT MESSAGE
        // =============================================
        addBotMessage(text) {
            const safeHtml = this.sanitizeBotHtml(this.formatMessage(text));
            const wrap = document.createElement('div');
            wrap.className = 'sanzy-msg-wrap';
            wrap.innerHTML = `
                <div class="sanzy-msg-ava"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                <div>
                    <div class="sanzy-bubble">
                        <div class="sanzy-bubble-text">${safeHtml}</div>
                    </div>
                    <div class="sanzy-time">${this.getTime()}</div>
                </div>
            `;
            this.messages.appendChild(wrap);
            this.scrollBottom();
            this.conversationHistory.push({ role:'bot', text });
        },

        // =============================================
        // FORMAT MESSAGE (markdown-lite)
        // =============================================
        formatMessage(text) {
            return text
                // Bold **text**
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                // Italic *text*
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                // Preserve bot-link-btn anchors (already HTML)
                // Convert bullet lines • item
                .replace(/^• (.+)$/gm, '<div style="display:flex;gap:7px;align-items:flex-start;margin:3px 0;"><span style="color:#8B5CF6;flex-shrink:0;">•</span><span>$1</span></div>')
                // Newlines to br
                .replace(/\n/g, '<br>');
        },

        sanitizeBotHtml(html) {
            return DOMPurify.sanitize(html, {
                ALLOWED_TAGS: ['a', 'strong', 'em', 'br', 'div', 'span'],
                ALLOWED_ATTR: ['href', 'class', 'style', 'target', 'rel'],
                ALLOWED_URI_REGEXP: /^(?:(?:https?:|mailto:|\/|#).*)$/i,
                FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'],
                FORBID_ATTR: [/^on/i],
            });
        },

        // =============================================
        // TYPING INDICATOR
        // =============================================
        showTyping() {
            this.isTyping = true;
            if (this.sendBtn) this.sendBtn.disabled = true;

            const typing = document.createElement('div');
            typing.className = 'sanzy-typing';
            typing.id = 'sanzyTyping';
            typing.innerHTML = `
                <div class="typing-ava"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                <div class="typing-bubble">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            this.messages.appendChild(typing);
            this.scrollBottom();
        },

        hideTyping() {
            this.isTyping = false;
            if (this.sendBtn) this.sendBtn.disabled = false;
            const typing = document.getElementById('sanzyTyping');
            if (typing) typing.remove();
        },

        // =============================================
        // DATE DIVIDER
        // =============================================
        addDivider(label) {
            const div = document.createElement('div');
            div.className = 'sanzy-divider';
            div.textContent = label;
            this.messages.appendChild(div);
        },

        // =============================================
        // HELPERS
        // =============================================
        scrollBottom() {
            requestAnimationFrame(() => {
                if (this.messages) this.messages.scrollTop = this.messages.scrollHeight;
            });
        },

        getTime() {
            const now = new Date();
            return now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
        },

        escapeHtml(text) {
            const div = document.createElement('div');
            div.appendChild(document.createTextNode(text));
            return div.innerHTML;
        }
    };

    window.SanzyBot = SanzyBot;
})();

export function initializeChat() {
    if (!window.__sanzyBotBooted) {
        window.__sanzyBotBooted = true;
        window.SanzyBot.init();
    }
    return window.SanzyBot;
}
