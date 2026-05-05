// =============================================
// DATA
// =============================================
const services = [
    {
        id: 1,
        icon: "✍️",
        name: "AI Blog Post Writer",
        startingPrice: "$7",
        unit: "/article",
        color: "violet",
        delivery: "24 Hours",
        desc: "SEO-optimized blog posts, articles, and website copy crafted by advanced AI and reviewed by human editors for maximum quality and accuracy.",
        packages: [
            {
                name: "Basic",
                price: "$7",
                desc: "1 SEO article (800 words)",
                features: [
                    "500-800 words",
                    "SEO optimized",
                    "Keyword focus + meta description",
                    "Plagiarism checked",
                    "1 revision",
                ],
            },
            {
                name: "Standard",
                price: "$15",
                desc: "3 SEO articles (1000 words each)",
                features: [
                    "1000 words each",
                    "SEO optimized",
                    "Internal linking",
                    "Plagiarism checked",
                    "3 revisions",
                ],
            },
            {
                name: "Premium",
                price: "$35",
                desc: "8 SEO articles (1200 words each)",
                features: [
                    "1200 words each",
                    "Full SEO package",
                    "Internal + external links",
                    "Plagiarism checked",
                    "Unlimited revisions",
                ],
            },
        ],
    },
    {
        id: 2,
        icon: "🎨",
        name: "AI Logo Concept Pack",
        startingPrice: "$6",
        unit: "",
        color: "pink",
        delivery: "12 Hours",
        desc: "Professional logos and complete brand identities created with cutting-edge AI design tools and refined by creative human designers.",
        packages: [
            {
                name: "Basic",
                price: "$6",
                desc: "5 logo concepts",
                features: [
                    "5 unique logo directions",
                    "High-res PNG + SVG",
                    "Monochrome variation",
                    "3 revision rounds",
                    "Commercial license",
                ],
            },
            {
                name: "Standard",
                price: "$18",
                desc: "Full brand kit",
                features: [
                    "10 logo concepts",
                    "Brand color palette",
                    "Typography guide",
                    "Business card design",
                    "Unlimited revisions",
                ],
            },
            {
                name: "Premium",
                price: "$40",
                desc: "Complete brand identity",
                features: [
                    "20 logo concepts",
                    "Full brand guidelines",
                    "Social media kit",
                    "Stationery design",
                    "Source files included",
                ],
            },
        ],
    },
    {
        id: 3,
        icon: "📱",
        name: "AI Social Media Kit",
        startingPrice: "$8",
        unit: "",
        color: "blue",
        delivery: "24 Hours",
        desc: "Get a complete month of social media content. Captions, hooks, and hashtags for Instagram, LinkedIn, and X.",
        packages: [
            {
                name: "Basic",
                price: "$8",
                desc: "30-day content kit",
                features: [
                    "30 captions",
                    "Viral hooks included",
                    "Hashtag strategy",
                    "Content calendar",
                    "Instagram, LinkedIn, X",
                ],
            },
            {
                name: "Standard",
                price: "$20",
                desc: "60-day content kit",
                features: [
                    "60 captions",
                    "Platform-specific hooks",
                    "Advanced hashtags",
                    "Engagement tips",
                    "All major platforms",
                ],
            },
            {
                name: "Premium",
                price: "$45",
                desc: "90-day full content system",
                features: [
                    "90 captions",
                    "Visual content ideas",
                    "Story templates",
                    "Reel scripts",
                    "Monthly refresh",
                ],
            },
        ],
    },
    {
        id: 4,
        icon: "🎬",
        name: "AI YouTube Script",
        startingPrice: "$5",
        unit: "",
        color: "orange",
        delivery: "24 Hours",
        desc: "Engaging video scripts for YouTube and Shorts. Designed for maximum viewer retention and clarity.",
        packages: [
            {
                name: "Basic",
                price: "$5",
                desc: "1 Full video script",
                features: [
                    "8-12 minute script",
                    "Viral hook + intro",
                    "Chapter markers",
                    "Call to action",
                    "SEO video title suggestions",
                ],
            },
            {
                name: "Standard",
                price: "$14",
                desc: "3 video scripts",
                features: [
                    "3 full scripts",
                    "Custom hooks",
                    "Thumbnail ideas",
                    "Description copy",
                    "3 revisions each",
                ],
            },
            {
                name: "Premium",
                price: "$30",
                desc: "8 video scripts",
                features: [
                    "8 full scripts",
                    "Series planning",
                    "Channel strategy",
                    "End screen CTAs",
                    "Unlimited revisions",
                ],
            },
        ],
    },
    {
        id: 5,
        icon: "🔍",
        name: "AI SEO Content Optimizer",
        startingPrice: "$9",
        unit: "",
        color: "teal",
        delivery: "10 Hours",
        desc: "Optimize your existing content for Search Engines. Get keyword clusters, meta data, and internal linking maps.",
        packages: [
            {
                name: "Basic",
                price: "$9",
                desc: "10-page optimization",
                features: [
                    "10 Meta titles & descriptions",
                    "Primary keyword clustering",
                    "Semantic entity mapping",
                    "Content gap analysis",
                ],
            },
            {
                name: "Standard",
                price: "$22",
                desc: "25-page optimization",
                features: [
                    "25 pages optimized",
                    "Full keyword map",
                    "Internal link strategy",
                    "Competitor analysis",
                    "Monthly tracking",
                ],
            },
            {
                name: "Premium",
                price: "$50",
                desc: "Full site SEO audit",
                features: [
                    "Unlimited pages",
                    "Technical SEO report",
                    "Backlink strategy",
                    "Schema markup",
                    "Priority support",
                ],
            },
        ],
    },
];

const portfolioItems = [
    {
        emoji: '📝',
        label: 'SaaS Content Series',
        sub: 'Content Writing • 15 SEO blog posts',
        bg: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
        challenge: 'The client needed 15 high-quality articles in under 30 days to build topical authority.',
        solution: 'Deployed a custom AI editorial workflow with human fact-checking and SEO optimization.',
        impact: ['Ranked in top 3 for 5 keywords', '+340% organic traffic in 45 days', 'Production time cut by 64%'],
        deliverables: ['15 SEO blog posts', 'Editorial SOP', 'Topic cluster map']
    },
    {
        emoji: '🎨',
        label: 'Fintech Brand Identity',
        sub: 'Logo & Design • Complete brand system',
        bg: 'linear-gradient(135deg, #ec4899, #be185d)',
        challenge: 'A launch-stage startup had no recognizable brand identity for ads or social media.',
        solution: 'Delivered 8 logo variations and built a full visual system using AI-assisted design.',
        impact: ['Final identity approved in 2 days', 'Landing page conversion improved by 21%', 'Consistent cross-platform visuals'],
        deliverables: ['Primary + secondary logo suite', 'Color palette & font system', 'Social media brand kit']
    },
    {
        emoji: '📱',
        label: 'Fitness Coach Social Kit',
        sub: 'Social Media • 30-day content engine',
        bg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        challenge: 'A creator was spending 10+ hours a week writing captions and planning content.',
        solution: 'Generated a 30-day calendar with viral hooks and platform-specific captions.',
        impact: ['Saved 40 hours of work monthly', 'Engagement rate increased by 15%', 'Consistent daily posting'],
        deliverables: ['30 captions + 12 Reels scripts', 'Viral hook library', 'Hashtag strategy guide']
    }
];

const GOOGLE_SHEETS_WEBHOOK = window.SANZY_QUOTE_WEBHOOK || '';

async function submitQuoteToGoogleSheets(data) {
    if (!GOOGLE_SHEETS_WEBHOOK) return false;
    const payload = {
        submittedAt: data.timestamp,
        fullName: data.name,
        email: data.email,
        whatsapp: data.phone,
        serviceNeeded: data.service,
        budgetRange: data.budget,
        leadSource: data.source || 'Not provided',
        projectBrief: data.desc
    };

    try {
        const res = await fetch(GOOGLE_SHEETS_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return res.ok;
    } catch (err) {
        console.error('Google Sheets webhook failed:', err);
        return false;
    }
}

// =============================================
// RENDER SERVICES
// =============================================
function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    grid.innerHTML = services.map(svc => {
        const pkg = svc.packages[0];
        return `
        <div class="svc-card theme-${svc.color}" id="svc-${svc.id}">
            <div class="svc-header">
                <div class="svc-icon-wrap">${svc.icon}</div>
                <div class="svc-delivery">⚡ ${svc.delivery}</div>
            </div>
            <div class="svc-body">
                <div class="svc-title">${svc.name}</div>
                <div class="svc-price-wrap">
                    <span class="svc-price">${svc.startingPrice}</span>
                    <span class="svc-unit">${svc.unit}</span>
                    <span class="svc-label-sm">starting price</span>
                </div>
                <p class="svc-desc">${svc.desc}</p>

                <div class="pkg-features" style="margin-bottom: 24px; background: var(--surface2); padding: 16px; border-radius: 16px; border: 1px solid var(--border-s);">
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px;">What's Included:</div>
                    ${pkg.features.map(f => `
                        <div class="pkg-feat">
                            <span class="feat-check">✓</span>
                            ${f}
                        </div>
                    `).join('')}
                </div>

                <div class="svc-cta">
                    <button type="button" class="svc-buy-btn" data-action="scroll-quote" data-service-name="${svc.name}">
                        🚀 Order Now
                    </button>
                    <button type="button" class="svc-quote-btn" data-action="scroll-quote" data-service-name="${svc.name}">
                        💬 Quote
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// =============================================
// RENDER PORTFOLIO
// =============================================
function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    grid.innerHTML = portfolioItems.map((item, index) => `
        <div class="port-item-new" data-action="open-portfolio" data-portfolio-index="${index}" role="button" tabindex="0" aria-label="Open ${item.label} case study">
            <div class="port-visual" style="background: ${item.bg};">
                <span class="port-tag-sm">${item.sub.split(' • ')[0]}</span>
                <div class="port-icon-box">${item.emoji}</div>
                <div class="port-overlay-new">
                </div>
                <div class="port-info-mini">
                    <div class="pi-title">${item.label}</div>
                    <div class="pi-sub">${item.sub}</div>
                </div>
            </div>
        </div>
    `).join('');
}

window.openPortfolio = function(index) {
    const item = portfolioItems[index];
    const modal = document.getElementById('portfolioModal');
    const body = document.getElementById('portfolioModalBody');
    if (!item || !modal || !body) return;

    body.innerHTML = `
        <div class="pm-hero" style="background:${item.bg};">
            <div class="pm-emoji">${item.emoji}</div>
            <div class="pm-hero-text">
                <div class="pm-title">${item.label}</div>
                <div class="pm-sub">${item.sub}</div>
            </div>
        </div>
        <div class="pm-grid">
            <div class="pm-card">
                <div class="pm-card-icon">🎯</div>
                <h4>The Challenge</h4>
                <p>${item.challenge}</p>
            </div>
            <div class="pm-card">
                <div class="pm-card-icon">💡</div>
                <h4>Our Solution</h4>
                <p>${item.solution}</p>
            </div>
            <div class="pm-card highlight">
                <div class="pm-card-icon">📈</div>
                <h4>Key Results</h4>
                <ul>${item.impact.map(v => `<li><strong>${v}</strong></li>`).join('')}</ul>
            </div>
            <div class="pm-card">
                <div class="pm-card-icon">📦</div>
                <h4>Deliverables</h4>
                <ul>${item.deliverables.map(v => `<li>${v}</li>`).join('')}</ul>
            </div>
        </div>
        <div class="pm-footer">
            <button class="btn btn-primary btn-block" onclick="window.closePortfolio(); window.scrollToQuote('${item.label}');">Get Results Like These →</button>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

window.closePortfolio = function() {
    const modal = document.getElementById('portfolioModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// =============================================
// PARTICLES
// =============================================
function createParticles() {
    const container = document.getElementById('heroParticles');
    if(!container) return;

    const colors = ['#6C35DE','#00D4FF','#00FF88','#8B5CF6'];
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 6 + 2;
        p.className = 'particle';
        p.style.cssText = `
            width:${size}px;height:${size}px;
            background:${colors[Math.floor(Math.random()*colors.length)]};
            left:${Math.random()*100}%;
            top:${Math.random()*100}%;
            animation-delay:${Math.random()*6}s;
            animation-duration:${Math.random()*4+4}s;
        `;
        container.appendChild(p);
    }
}

// =============================================
// QUOTE FORM
// =============================================
window.scrollToQuote = function(service) {
    const input = document.getElementById('fservice');
    if(input) input.value = service;

    const section = document.getElementById('quote-form');
    if(section) {
        section.scrollIntoView({ behavior:'smooth', block:'start' });
        setTimeout(() => {
            if(input) {
                input.style.borderColor = 'var(--primary)';
                setTimeout(() => input.style.borderColor = '', 1500);
            }
        }, 800);
    }
}

window.handleQuoteSubmit = async function(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    btn.classList.add('loading');
    btn.disabled = true;

    // Collect data
    const data = {
        name: document.getElementById('fname').value,
        email: document.getElementById('femail').value,
        phone: document.getElementById('fphone').value,
        service: document.getElementById('fservice').value,
        budget: document.getElementById('fbudget').value,
        source: document.getElementById('fsource').value,
        desc: document.getElementById('fdesc').value,
        timestamp: new Date().toISOString()
    };

    const sentToSheet = await submitQuoteToGoogleSheets(data);

    btn.classList.remove('loading');
    btn.disabled = false;

    const success = document.getElementById('successOverlay');
    if(success) success.classList.add('open');
    e.target.reset();

    if (sentToSheet) {
        showToast('Quote request sent and mapped to Google Sheet.','✅');
        return;
    }
    showToast('Quote request sent. Add webhook to auto-save in Google Sheets.','✅');
}

// =============================================
// HAMBURGER
// =============================================
const ham = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileMenu');
if(ham && mobileNav) {
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
if(scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('vis', window.scrollY > 500);
    });
}

// Success overlay close on outside click
const successOverlay = document.getElementById('successOverlay');
if(successOverlay) {
    successOverlay.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('open');
    });
}

const portfolioModal = document.getElementById('portfolioModal');
if (portfolioModal) {
    portfolioModal.addEventListener('click', function(e) {
        if (e.target === this) window.closePortfolio();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closePortfolio();
    }
});

// =============================================
// TOAST
// =============================================
let toastT;
function showToast(msg, icon='✅') {
    clearTimeout(toastT);
    const t = document.getElementById('toast');
    const m = document.getElementById('toastMsg');
    const i = document.getElementById('toastIcon');
    if(!t || !m || !i) return;

    m.textContent = msg;
    i.textContent = icon;
    t.classList.add('show');
    toastT = setTimeout(() => t.classList.remove('show'), 3500);
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    renderPortfolio();
    createParticles();

    document.getElementById('quoteForm')?.addEventListener('submit', (event) => {
        window.handleQuoteSubmit(event);
    });

    document.getElementById('portfolioCloseBtn')?.addEventListener('click', () => {
        window.closePortfolio();
    });

    document.getElementById('successBackBtn')?.addEventListener('click', () => {
        document.getElementById('successOverlay')?.classList.remove('open');
    });

    document.addEventListener('click', (event) => {
        const actionEl = event.target.closest('[data-action]');
        if (!actionEl) return;

        const action = actionEl.dataset.action;

        if (action === 'scroll-quote') {
            const serviceName = actionEl.dataset.serviceName || '';
            window.scrollToQuote(serviceName);
            return;
        }

        if (action === 'open-portfolio') {
            const index = Number(actionEl.dataset.portfolioIndex || '-1');
            if (index >= 0) {
                window.openPortfolio(index);
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const item = event.target.closest('[data-action="open-portfolio"]');
        if (!item || event.target !== item) return;
        event.preventDefault();
        item.click();
    });
});
