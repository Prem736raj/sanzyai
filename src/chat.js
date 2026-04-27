import DOMPurify from 'dompurify';

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
                <button class="sanzy-float-btn" id="sanzyFloatBtn" aria-label="Chat with Sanzy AI" aria-controls="sanzyWindow" aria-expanded="false" draggable="false">
                    🤖
                    <div class="sanzy-notif" id="sanzyNotif">1</div>
                </button>
            </div>

            <!-- Chat Window -->
            <div class="sanzy-window" id="sanzyWindow" role="dialog" aria-modal="true" aria-labelledby="sanzyDialogTitle" aria-label="Sanzy AI Chat" tabindex="-1">
                <!-- Header -->
                <div class="sanzy-header">
                    <div class="sanzy-avatar">🤖</div>
                    <div class="sanzy-header-info">
                        <span class="sanzy-name" id="sanzyDialogTitle">Sanzy — AI Assistant</span>
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
                    <span>📍</span>
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
            domain: '👋 Looking for cheapest domain? Type any domain name in the finder above and I\'ll show you the best prices! Need help? Just ask me 🌐',
            tools: '👋 Looking for the perfect AI tool? Tell me what you want to do and I\'ll recommend the best tool for you! 🤖',
            prompts: '👋 Not sure which prompt pack to buy? Tell me your use case and I\'ll recommend the perfect pack for maximum results! 💰',
            services: '👋 Interested in our AI services? Tell me your budget and project goals, and I\'ll help you choose the right package! 🚀',
            learn: '👋 Ready to start learning? Our free course has 20+ lessons covering everything from domains to making money online! 📚',
            blog: '👋 Looking for a specific topic? Ask me and I\'ll help you find the right article, or check out our categories in the sidebar! 📰'
        },

        // =============================================
        // RESPONSE DATABASE
        // =============================================
        responses: {
            domain: {
                keywords: ['domain','registrar','cheap','cheapest','namecheap','godaddy','porkbun','cloudflare','spaceship','.com','.io','.ai','.net','.org','buy domain','domain price','register'],
                response: `Great! Let me help you find the cheapest domain price! 🌐

Just head to our **Domain Price Finder** and type your domain name — we compare 10+ registrars instantly!

<a class="bot-link-btn" href="domain-finder.html">🌐 Go to Domain Finder →</a>

**Current best deals for .com:**
• Spaceship — $8.88/year 🏆
• Hostinger — $8.99/year
• Cloudflare — $9.15/year (best renewal!)
• Porkbun — $9.73/year

💡 **Tip:** Always check renewal prices — some registrars charge 2-3x more on renewal!

Anything else I can help with? 😊`
            },
            tools: {
                keywords: ['ai tools','tools','chatgpt','midjourney','claude','gemini','elevenlabs','cursor','jasper','copy.ai','runway','synthesia','perplexity','best ai','ai tool','tool recommendation','which tool','what tool'],
                response: `We have a curated AI tools list you can browse right now! 🤖

**🔥 Most popular right now:**
• ChatGPT — Best for writing & chat
• Midjourney — Best for AI images
• ElevenLabs — Best for voice & audio
• Cursor AI — Best for coding
• Perplexity — Best for research

<a class="bot-link-btn" href="ai-tools.html">🤖 Browse All AI Tools →</a>

**Want a personalized recommendation?** Just tell me:
• What do you want to create?
• What's your budget?
• Are you a beginner or advanced?

I'll pick the perfect tool for you! 💪`
            },
            prompts: {
                keywords: ['prompt','prompts','prompt pack','midjourney prompts','chatgpt prompts','buy prompts','prompt store','prompt marketplace','writing prompts','business prompts','seo prompts'],
                response: `Our Prompt Marketplace has amazing packs! 💰

**🔥 Bestsellers:**
🥇 Ultimate Business Pack — $9.50 (50 prompts)
🥈 Midjourney Art Masterpack — $12.00 (100 prompts)
🆕 Gemini Image Prompt Pro Pack — $10.50 (80 prompts)
🆕 ChatGPT Image Direction Pack — $9.00 (70 prompts)
🥉 SEO Content Writer Pack — $7.50 (30 prompts)
📱 Social Media Pack — $6.00 (40 prompts)

**🎁 FREE Starter Pack** — 10 prompts, no credit card!

<a class="bot-link-btn" href="prompt-store.html">💰 Browse Prompt Store →</a>

All packs come with:
✅ Instant download
✅ Expert-reviewed quality
✅ Lifetime updates

Which type of prompts are you looking for? 😊`
            },
            services: {
                keywords: ['service','services','hire','agency','content','logo','chatbot','automation','social media','ai service','freelance','build for me','help me','setup','create','make','design'],
                response: `We offer professional AI-powered services! 🚀

**Quick pricing:**
✍️ Content Writing — from $5
🎨 Logo Design — from $3
📱 Social Media — from $10/month
🤖 Custom Chatbot — from $20
🎬 AI Video Creation — from $7.50/video
🔍 AI SEO Optimization — from $15/month

<a class="bot-link-btn" href="ai-services.html">🚀 See All Services →</a>
<a class="bot-link-btn" href="ai-services.html">📋 Request Consultation →</a>

**Want a custom quote?** Just tell me:
• What service you need
• Your budget range
• Your timeline

I'll get back to you within 24 hours! ⚡`
            },
            learn: {
                keywords: ['learn','course','tutorial','free course','website','build website','hosting','seo learn','how to','guide','beginner','start','domain learn','make money learn','certificate'],
                response: `Our Free Learning Hub covers EVERYTHING! 📚

**7 stages with step-by-step guidance:**
✅ Module 1 — Domain basics
✅ Module 2 — Hosting & servers
✅ Module 3 — Build with AI tools
✅ Module 4 — Design & content
✅ Module 5 — Launch & publish
✅ Module 6 — SEO & promotion
✅ Module 7 — Make money online
🎁 Bonus — AI Tools Mastery

**All completely FREE — no credit card required!**

<a class="bot-link-btn" href="learn-free.html">📚 Start Learning Free →</a>

Covers everything from domain setup to making money online.
**Total course time: 12+ hours** 🎓`
            },
            money: {
                keywords: ['money','earn','income','make money','profit','revenue','adsense','affiliate','sell','freelance income','$','dollar','passive income','side hustle','online business'],
                response: `Great goal — let me show you the paths! 💰

**Ways to earn with SanzyAI:**

🖊️ **Sell AI Prompt Packs** — avg $200-500/month
💼 **Offer AI Freelancing** — $50-200/hr
🌐 **Build Niche Websites** — passive via AdSense
📢 **Affiliate Marketing** — 30-50% commissions
🤖 **AI Consulting** — $100-300/hr

**We have full tutorials for each!**

<a class="bot-link-btn" href="learn-free.html">📚 Free Money-Making Course →</a>
<a class="bot-link-btn" href="blog.html">📰 Make Money Articles →</a>

Which income stream interests you most? Tell me more and I'll give you a personalized roadmap! 🗺️`
            },
            pricing: {
                keywords: ['price','pricing','cost','how much','free','paid','subscription','monthly','yearly','plan','affordable','budget','cheap'],
                response: `Here's a quick pricing overview! 💵

**Free stuff on SanzyAI:**
🆓 Domain Price Finder — 100% free
🆓 AI Tools Directory — 100% free
🆓 Free Learning Course — 100% free
🆓 Free Starter Prompt Pack — free

**Paid products:**
💰 Prompt Packs — $6.00–$12.00 one-time
🚀 AI Services — from $3
🎓 Certificate — free (included in course)

**No subscription needed for most features!**

<a class="bot-link-btn" href="prompt-store.html">💰 See Prompt Prices →</a>

What budget are you working with? I'll find the best option! 😊`
            },
            hello: {
                keywords: ['hi','hello','hey','hiya','howdy','sup','what\'s up','good morning','good evening','greetings','yo'],
                response: `Hey there! 👋 Great to see you!

I'm Sanzy, your AI assistant on SanzyAI.com!

Here's what I can help with:
🌐 Find cheapest domain prices
🤖 Discover the best AI tools
💰 Recommend prompt packs
🚀 Explore our AI services
📚 Start learning for free

What would you like to explore today? ✨`
            },
            help: {
                keywords: ['help','what can you do','what do you know','capabilities','options','menu','features','tell me about','what is sanzy'],
                response: `I'm Sanzy, and here's everything I can help you with! 🤖

**🌐 Domain Tools**
Find cheapest registrars, compare prices, tips on choosing domains

**🤖 AI Tools**
Curated tools list — I can recommend the right one for you

**💰 Prompt Store**
All prompt packs explained, free samples, recommendations

**🚀 AI Services**
Pricing, packages, getting quotes for custom work

**📚 Free Learning**
Guide you through our free web-building course

**💰 Make Money**
Strategies to earn online with AI tools

**📰 Blog**
Find specific articles or guides

Just type what you need and I'll help right away! 😊`
            },
            thanks: {
                keywords: ['thank','thanks','thank you','ty','cheers','appreciate','helpful','great','awesome','nice','perfect','excellent','love it','brilliant'],
                response: `You're so welcome! 😊 That's what I'm here for!

Is there anything else I can help with today? Here are some things you might explore:

🌐 <a class="bot-link-btn" href="domain-finder.html">Find Domain Price</a>
🤖 <a class="bot-link-btn" href="ai-tools.html">Browse AI Tools</a>
📚 <a class="bot-link-btn" href="learn-free.html">Start Free Course</a>

Feel free to ask me anything anytime! 💪`
            },
            contact: {
                keywords: ['contact','email','support','help desk','reach','talk to human','real person','team','sanzyai email'],
                response: `Happy to connect you with the team! 📧

**Contact SanzyAI:**
📩 Email: hello@sanzyai.com
💬 Discord: discord.gg/sanzyai
📱 Telegram: t.me/sanzyai
🐦 Twitter/X: @sanzyai

**Response times:**
• Email — within 24 hours
• Discord/Telegram — usually within 2 hours!

Or keep chatting with me — I can answer most questions right here! 😊

What's your question? I might be able to help right now! 🤖`
            }
        },

        // =============================================
        // GREETING MESSAGE
        // =============================================
        greetingMessage: `Hi there! 👋 I'm **Sanzy**, your AI assistant on SanzyAI.com!

I can help you with:
🌐 Find cheapest domain prices
🤖 Discover best AI tools
💰 Buy AI prompt packs
🚀 Hire AI services
📚 Learn to build websites — free!

**What would you like to explore today?**`,

        quickRepliesData: [
            { icon:'🌐', text:'Find Domain Price', query:'domain price' },
            { icon:'🤖', text:'AI Tools', query:'ai tools' },
            { icon:'💰', text:'Buy Prompts', query:'prompts' },
            { icon:'🚀', text:'AI Services', query:'services' },
            { icon:'📚', text:'Learn Free', query:'learn' }
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
                statusTextEl.textContent = 'Online · Ready to help';
                statusDotEl.classList.add('demo');
            }
        },

        async detectBackendConnection() {
            if (!this.backendUrl) {
                this.setConnectionStatus(false);
                return;
            }

            const healthUrl = this.backendUrl.replace(/\/chat$/, '/health');
            try {
                const res = await fetch(healthUrl, { method: 'GET', signal: AbortSignal.timeout(2500) });
                this.setConnectionStatus(res.ok);
            } catch (e) {
                this.setConnectionStatus(false);
            }
        },

        async fetchAIReply(text) {
            if (!this.connected || !this.backendUrl) return null;

            try {
                const history = this.conversationHistory.slice(-6);
                const res = await fetch(this.backendUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text, history }),
                    signal: AbortSignal.timeout(10000)
                });

                if (!res.ok) return null;
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
            const msg = this.pageMessages[this.currentPage];
            if (msg && this.pageBanner && this.bannerText) {
                this.bannerText.textContent = msg;
                this.pageBanner.classList.remove('hide');
            }
        },

        // =============================================
        // OPEN / CLOSE / TOGGLE
        // =============================================
        open() {
            this.isOpen = true;
            this.lastFocusedEl = document.activeElement;
            this.window.classList.add('open');
            this.floatBtn.classList.add('bot-open');
            this.floatBtn.setAttribute('aria-expanded', 'true');
            this.floatBtn.textContent = '';
            this.floatBtn.innerHTML = '<span>✕</span>';
            this.notif.classList.add('hide');

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
            this.floatBtn.innerHTML = '🤖<div class="sanzy-notif hide" id="sanzyNotif">1</div>';

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
                btn.textContent = `${qr.icon} ${qr.text}`;
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
                <div class="sanzy-msg-ava">👤</div>
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
                learn: ['Start Module 1', 'Download resources', 'View certificate'],
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
                `Hmm, I'm not quite sure about that one! 🤔

But I'm great at helping with:
🌐 <a class="bot-link-btn" href="domain-finder.html">Domain Prices</a>
🤖 <a class="bot-link-btn" href="ai-tools.html">AI Tools</a>
💰 <a class="bot-link-btn" href="prompt-store.html">Prompt Packs</a>
📚 <a class="bot-link-btn" href="learn-free.html">Free Course</a>

Or email us at: **hello@sanzyai.com** 📧

What else can I help you with? 😊`,

                `I want to help, but that's a bit outside my expertise! 😅

Try rephrasing or ask me about:
• Domain prices & registrars
• AI tool recommendations
• Prompt packs for ChatGPT/Midjourney
• Free website building course
• Making money with AI

Still stuck? Email **hello@sanzyai.com** and a human will reply! 🙌`
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
                <div class="sanzy-msg-ava">🤖</div>
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
                // Emoji lines ✅ item
                .replace(/^([✅🌐🤖💰🚀📚🔥🎁📈💡⚡✍️🎨📱🥇🥈🥉📩💬🐦📅🔒🎓📧👋🤔😊💪😅🙌🗺️📋🤲👤]) (.+)$/gm, '<div style="display:flex;gap:7px;align-items:flex-start;margin:3px 0;"><span style="flex-shrink:0;">$1</span><span>$2</span></div>')
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
                <div class="typing-ava">🤖</div>
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

    // =============================================
    // DEFERRED INIT (idle or first interaction)
    // =============================================
    function bootSanzyBotOnce() {
        if (window.__sanzyBotBooted) return;
        window.__sanzyBotBooted = true;
        SanzyBot.init();
    }

    function queueDeferredBoot() {
        const onFirstInteraction = () => {
            cleanupInteractionListeners();
            bootSanzyBotOnce();
        };

        const cleanupInteractionListeners = () => {
            document.removeEventListener('pointerdown', onFirstInteraction, true);
            document.removeEventListener('keydown', onFirstInteraction, true);
            document.removeEventListener('touchstart', onFirstInteraction, true);
            document.removeEventListener('scroll', onFirstInteraction, true);
        };

        document.addEventListener('pointerdown', onFirstInteraction, true);
        document.addEventListener('keydown', onFirstInteraction, true);
        document.addEventListener('touchstart', onFirstInteraction, true);
        document.addEventListener('scroll', onFirstInteraction, true);

        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(() => {
                cleanupInteractionListeners();
                bootSanzyBotOnce();
            }, { timeout: 4500 });
        } else {
            setTimeout(() => {
                cleanupInteractionListeners();
                bootSanzyBotOnce();
            }, 2500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', queueDeferredBoot);
    } else {
        queueDeferredBoot();
    }

    // Expose globally
    window.SanzyBot = SanzyBot;

})();
