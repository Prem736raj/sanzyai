// =============================================
// DATA
// =============================================
const services = [
    {
        id:1, name:'AI Content Writing', icon:'✍️',
        bg:'rgba(108,53,222,0.15)', delivery:'24 Hours',
        startingPrice:'$19/article',
        desc:'SEO-optimized blog posts, articles, and website copy crafted by advanced AI and reviewed by human editors for maximum quality and accuracy.',
        packages:[
            { name:'Basic', price:'$19', desc:'1 SEO article (1200 words)', features:['1 SEO blog post','1200+ words','Keyword focus + meta description','Plagiarism checked','1 revision'] },
            { name:'Standard', price:'$89', desc:'5 article growth pack', features:['5 SEO blog posts','Content brief for each post','Internal linking suggestions','Meta descriptions included','Unlimited revisions'] },
            { name:'Premium', price:'$329/mo', desc:'Monthly content engine', features:['20 articles per month','Content calendar + publishing rhythm','Topical cluster roadmap','Repurposed social snippets','Priority turnaround','Monthly performance summary'] }
        ],
        features:['SEO optimized content','Plagiarism free guaranteed','Human reviewed & edited','Unlimited revisions included','Meta description included','Keyword research']
    },
    {
        id:2, name:'AI Logo & Brand Design', icon:'🎨',
        bg:'rgba(255,107,53,0.15)', delivery:'12 Hours',
        startingPrice:'$29',
        desc:'Professional logos and complete brand identities created with cutting-edge AI design tools and refined by creative human designers.',
        packages:[
            { name:'Basic', price:'$29', desc:'3 logo concepts', features:['3 logo directions','High-res PNG + SVG','Monochrome variation','2 revision rounds','Commercial license'] },
            { name:'Standard', price:'$99', desc:'Logo + mini brand kit', features:['8 logo concepts','Color palette + font pairing','Social profile kit','Brand usage sheet','Unlimited revisions'] },
            { name:'Premium', price:'$249', desc:'Complete brand identity', features:['Primary + secondary logos','Detailed brand guide PDF','Business card + letterhead','Social templates pack','Messaging tone starter','Launch-ready files'] }
        ],
        features:['Vector file formats','Commercial license','Multiple file formats','Brand guidelines included','Social media ready','Quick turnaround']
    }
];

const portfolioItems = [
    {
        emoji:'📝',
        label:'SaaS Thought Leadership Engine',
        sub:'AI Content Writing • 18 articles in 30 days',
        bg:'linear-gradient(135deg,#1E1E2E,#2D1B6B)',
        challenge:'The team needed consistent high-quality publishing without hiring full-time writers.',
        solution:'Built an AI-assisted editorial process with briefs, outlines, and human QA for every post.',
        impact:['+172% organic clicks in 90 days','18 articles shipped in first month','Content production time cut by 64%'],
        deliverables:['Editorial SOP + QA checklist','Topic cluster map','SEO article + social repurpose templates']
    },
    {
        emoji:'🎨',
        label:'Fintech Brand Identity Sprint',
        sub:'AI Logo & Brand Design • 48-hour turnaround',
        bg:'linear-gradient(135deg,#2E1E1A,#6B3B1B)',
        challenge:'A launch-stage startup had no recognizable brand identity for ads, web, and social.',
        solution:'Delivered logo options, selected direction, and built a full visual language system.',
        impact:['12 concept variations explored','Final identity approved in 2 days','Landing page conversion improved by 21%'],
        deliverables:['Primary + secondary logo suite','Color and typography system','Social profile and brand usage kit']
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
    if(!grid) return;

    grid.innerHTML = services.map(svc => {
        const pkg = svc.packages[0]; // Default to basic
        return `
        <div class="svc-card" id="svc-${svc.id}">
            <div class="svc-header">
                <div class="svc-icon-wrap" style="background:${svc.bg};">${svc.icon}</div>
                <div class="svc-delivery">⚡ ${svc.delivery}</div>
            </div>
            <div class="svc-body">
                <div class="svc-title">${svc.name}</div>
                <div class="svc-price">${svc.startingPrice} <span>starting price</span></div>
                <p class="svc-desc">${svc.desc}</p>

                <!-- Package Tabs -->
                <div>
                    <div class="pkg-tabs" id="tabs-${svc.id}">
                        ${svc.packages.map((p,i) => `
                            <button type="button" class="pkg-tab ${i===0?'active':''}" data-action="switch-pkg" data-svc-id="${svc.id}" data-pkg-index="${i}">${p.name}</button>
                        `).join('')}
                    </div>
                    <div class="pkg-content" id="pkg-${svc.id}">
                        ${renderPkgContent(pkg)}
                    </div>
                </div>

                <div class="svc-cta">
                    <button type="button" class="svc-buy-btn" data-action="scroll-quote" data-service-name="${svc.name}">
                        🚀 Order Now
                    </button>
                    <button type="button" class="svc-quote-btn" data-action="scroll-quote" data-service-name="${svc.name}">
                        📋 Quote
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

function renderPkgContent(pkg) {
    return `
        <div class="pkg-name">${pkg.name} — <span class="pkg-price">${pkg.price}</span></div>
        <div style="font-size:0.76rem;color:var(--dim);margin-bottom:8px;">${pkg.desc}</div>
        <div class="pkg-features">
            ${pkg.features.slice(0,4).map(f => `<div class="pkg-feat">${f}</div>`).join('')}
        </div>`;
}

window.switchPkg = function(svcId, pkgIdx) {
    const svc = services.find(s => s.id === svcId);
    if (!svc) return;

    // Update tabs
    const tabs = document.querySelectorAll(`#tabs-${svcId} .pkg-tab`);
    tabs.forEach((t,i) => t.classList.toggle('active', i === pkgIdx));

    // Update content
    document.getElementById(`pkg-${svcId}`).innerHTML = renderPkgContent(svc.packages[pkgIdx]);
}

// =============================================
// RENDER PORTFOLIO
// =============================================
function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if(!grid) return;

    grid.innerHTML = portfolioItems.map((item, index) => `
        <div class="port-item" data-action="open-portfolio" data-portfolio-index="${index}" role="button" tabindex="0" aria-label="Open ${item.label} case study">
            <div class="port-bg" style="background:${item.bg};">
                <div class="port-emoji">${item.emoji}</div>
                <div class="port-label">${item.label}</div>
                <div class="port-sublabel">${item.sub}</div>
                <div class="port-overlay">
                    <button class="port-view-btn">View Case Study →</button>
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
            <div>
                <div class="pm-title">${item.label}</div>
                <div class="pm-sub">${item.sub}</div>
            </div>
        </div>
        <div class="pm-grid">
            <div class="pm-card">
                <h4>Challenge</h4>
                <p>${item.challenge}</p>
            </div>
            <div class="pm-card">
                <h4>Solution</h4>
                <p>${item.solution}</p>
            </div>
            <div class="pm-card">
                <h4>Key Impact</h4>
                <ul>${item.impact.map(v => `<li>${v}</li>`).join('')}</ul>
            </div>
            <div class="pm-card">
                <h4>Deliverables</h4>
                <ul>${item.deliverables.map(v => `<li>${v}</li>`).join('')}</ul>
            </div>
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
const mobileNav = document.getElementById('mobileNav');
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
        if (action === 'switch-pkg') {
            const svcId = Number(actionEl.dataset.svcId || '0');
            const pkgIndex = Number(actionEl.dataset.pkgIndex || '0');
            if (svcId) {
                window.switchPkg(svcId, pkgIndex);
            }
            return;
        }

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
