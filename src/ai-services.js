// =============================================
// DATA
// =============================================
const services = [
    {
        id:1, name:'AI Content Writing', icon:'✍️',
        bg:'rgba(108,53,222,0.15)', delivery:'24 Hours',
        startingPrice:'$5/article',
        desc:'SEO-optimized blog posts, articles, and website copy crafted by advanced AI and reviewed by human editors for maximum quality and accuracy.',
        packages:[
            { name:'Basic', price:'$5', desc:'1 article (1000 words)', features:['1 SEO blog post','1000-1500 words','Meta description','Plagiarism report','1 revision'] },
            { name:'Standard', price:'$20', desc:'5 articles bundle', features:['5 SEO blog posts','1000+ words each','Keyword research','Meta descriptions','Unlimited revisions'] },
            { name:'Premium', price:'$60/mo', desc:'20 articles/month', features:['20 articles monthly','Full SEO strategy','Content calendar','Social snippets','Priority delivery','Monthly report'] }
        ],
        features:['SEO optimized content','Plagiarism free guaranteed','Human reviewed & edited','Unlimited revisions included','Meta description included','Keyword research']
    },
    {
        id:2, name:'AI Logo & Brand Design', icon:'🎨',
        bg:'rgba(255,107,53,0.15)', delivery:'12 Hours',
        startingPrice:'$3',
        desc:'Professional logos and complete brand identities created with cutting-edge AI design tools and refined by creative human designers.',
        packages:[
            { name:'Basic', price:'$3', desc:'3 logo concepts', features:['3 logo variations','High-res PNG/SVG','Black & white version','2 revisions included','Commercial license'] },
            { name:'Standard', price:'$7.5', desc:'10 concepts + brand kit', features:['10 logo concepts','Full brand kit','Color palette','Typography guide','Social media kit','Unlimited revisions'] },
            { name:'Premium', price:'$20', desc:'Full brand identity', features:['Full brand identity','Logo + guidelines','Business card design','Letterhead template','Social media templates','Brand strategy doc'] }
        ],
        features:['Vector file formats','Commercial license','Multiple file formats','Brand guidelines included','Social media ready','Quick turnaround']
    },
    {
        id:3, name:'AI Social Media Management', icon:'📱',
        bg:'rgba(255,20,147,0.12)', delivery:'Ongoing',
        startingPrice:'$10/month',
        desc:'Complete social media management powered by AI. We handle content creation, scheduling, hashtags and reporting across all major platforms.',
        packages:[
            { name:'Starter', price:'$10/mo', desc:'Essential presence', features:['15 posts/month','Instagram + Facebook','AI-written captions','Hashtag research','Basic monthly report'] },
            { name:'Growth', price:'$20/mo', desc:'Multi-platform', features:['30 posts/month','4 platforms covered','Custom graphics included','Story content','Engagement report','Content calendar'] },
            { name:'Pro', price:'$40/mo', desc:'Full management', features:['60 posts/month','All platforms','Video reels included','Community management','Weekly reports','Strategy calls'] }
        ],
        features:['30 posts per month','AI-crafted captions','Hashtag optimization','Posting schedule','Monthly analytics report','Platform management']
    },
    {
        id:4, name:'AI Chatbot Setup', icon:'🤖',
        bg:'rgba(0,212,255,0.12)', delivery:'3 Days',
        startingPrice:'$20',
        desc:'Custom AI chatbots trained on your business data and integrated into your website. Handles customer queries 24/7 without human intervention.',
        packages:[
            { name:'Basic', price:'$20', desc:'Simple chatbot', features:['FAQ chatbot setup','Website integration','Basic training (50 Q&As)','7 days support','Setup documentation'] },
            { name:'Standard', price:'$50', desc:'Smart assistant', features:['Advanced AI chatbot','CRM integration','Custom training (200+ Q&As)','Lead capture setup','30 days support','Analytics dashboard'] },
            { name:'Enterprise', price:'$120', desc:'Full AI agent', features:['Full AI agent','Multi-platform deploy','Unlimited training data','API integrations','90 days support','Custom reporting','Dedicated setup call'] }
        ],
        features:['Custom trained on your data','Website integration included','30 days support','Training documentation','Lead capture setup','Multi-language support']
    },
    {
        id:5, name:'AI Video Creation', icon:'🎬',
        bg:'rgba(255,59,48,0.12)', delivery:'48 Hours',
        startingPrice:'$7.5/video',
        desc:'Professional AI-generated videos with realistic avatars, custom scripts, background music and subtitles. Perfect for marketing, training and social media.',
        packages:[
            { name:'Basic', price:'$7.5', desc:'1 short video (1 min)', features:['1-minute AI video','Script writing','AI avatar included','Background music','HD quality export'] },
            { name:'Standard', price:'$18', desc:'3 videos bundle', features:['3 AI videos (2 min each)','Custom script writing','AI avatar + backgrounds','Music + subtitles','Thumbnail design','3 revisions'] },
            { name:'Premium', price:'$40/mo', desc:'8 videos/month', features:['8 videos monthly','Up to 5 minutes each','Multiple AI presenters','Full post-production','Subtitles in 3 languages','YouTube optimization'] }
        ],
        features:['Professional script writing','AI avatar presenter','Background music included','Subtitles & captions','HD video delivery','Thumbnail design']
    },
    {
        id:6, name:'AI SEO Optimization', icon:'🔍',
        bg:'rgba(0,200,81,0.12)', delivery:'Ongoing',
        startingPrice:'$15/month',
        desc:'Data-driven SEO powered by AI. We research keywords, optimize content, fix technical issues and track rankings to get you more organic traffic.',
        packages:[
            { name:'Basic', price:'$15/mo', desc:'Foundation SEO', features:['Keyword research (20 KWs)','On-page optimization','Meta tags optimization','Monthly ranking report','Basic link building'] },
            { name:'Growth', price:'$30/mo', desc:'Accelerated growth', features:['Full keyword strategy','Content optimization','Technical SEO audit','Competitor analysis','Monthly detailed report','10 backlinks/month'] },
            { name:'Authority', price:'$60/mo', desc:'Market domination', features:['Unlimited keyword targeting','Full site optimization','Advanced technical SEO','25 backlinks/month','Weekly ranking updates','Quarterly strategy review'] }
        ],
        features:['Keyword research & strategy','Content optimization','Meta tags & schema','Monthly ranking report','Technical SEO included','Competitor analysis']
    }
];

const portfolioItems = [
    {
        emoji:'📝',
        label:'Tech Blog Content Engine',
        sub:'AI Content Writing • 15,000 words/month',
        bg:'linear-gradient(135deg,#1E1E2E,#2D1B6B)',
        challenge:'Client had inconsistent publishing and weak keyword coverage.',
        solution:'Built an AI-assisted editorial workflow with topic clusters and SEO briefs.',
        impact:['+214% organic clicks in 90 days','34 articles shipped in 45 days','Avg time-on-page up 41%'],
        deliverables:['Keyword map by funnel stage','Monthly content calendar','SEO article templates']
    },
    {
        emoji:'🎨',
        label:'SaaS Brand Identity System',
        sub:'Logo Design + Full Brand Kit',
        bg:'linear-gradient(135deg,#2E1E1A,#6B3B1B)',
        challenge:'Early-stage SaaS had no visual consistency across web and socials.',
        solution:'Created complete AI-assisted brand kit with logo, palette and usage rules.',
        impact:['10 launch-ready logo variants','Brand refresh completed in 12 hours','Ad creative CTR improved by 28%'],
        deliverables:['Primary and secondary logos','Color + typography guide','Social cover templates']
    },
    {
        emoji:'🤖',
        label:'E-commerce Support Chatbot',
        sub:'AI Chatbot • 800+ Q&As Trained',
        bg:'linear-gradient(135deg,#1E1E2A,#1B356B)',
        challenge:'Support team overloaded with repetitive shipping and returns questions.',
        solution:'Trained chatbot on policy docs and integrated lead capture + handoff rules.',
        impact:['62% ticket deflection rate','Average response time dropped to <10 sec','+19% qualified leads captured'],
        deliverables:['Website chatbot integration','Intent and fallback logic','Admin handoff playbook']
    },
    {
        emoji:'🎬',
        label:'Product Launch Video Series',
        sub:'AI Video • 3-minute explainer',
        bg:'linear-gradient(135deg,#2E1A1A,#6B1B1B)',
        challenge:'Client needed launch videos fast without production studio cost.',
        solution:'Produced AI avatar explainers with scripted hooks and multilingual captions.',
        impact:['8 videos delivered in 1 week','Production cost reduced by ~70%','Watch time improved by 33%'],
        deliverables:['Explainer + short clips','Thumbnail and title set','Caption files (EN/ES/HI)']
    },
    {
        emoji:'📈',
        label:'SaaS SEO Growth Campaign',
        sub:'SEO Optimization • 280% traffic increase',
        bg:'linear-gradient(135deg,#1A2E1A,#1B6B35)',
        challenge:'Website had low visibility and weak technical SEO foundation.',
        solution:'Ran AI-assisted audit, fixed technical issues, then built topical clusters.',
        impact:['+280% organic traffic in 4 months','21 keywords moved to top 10','Bounce rate improved by 17%'],
        deliverables:['Technical SEO audit','On-page optimization map','Backlink prospect list']
    },
    {
        emoji:'📱',
        label:'Influencer Social Growth Pack',
        sub:'Social Media • 60 posts/month',
        bg:'linear-gradient(135deg,#2E1A2E,#6B1B5A)',
        challenge:'Creator lacked posting consistency and content pillars.',
        solution:'Built monthly AI-assisted content system with scripts, hooks and creatives.',
        impact:['Followers doubled in 8 weeks','Average saves up by 46%','Consistent 60-post cadence achieved'],
        deliverables:['30-day post plan','Caption + hook library','Reusable creative templates']
    }
];

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
                            <div class="pkg-tab ${i===0?'active':''}"
                                onclick="switchPkg(${svc.id},${i})">${p.name}</div>
                        `).join('')}
                    </div>
                    <div class="pkg-content" id="pkg-${svc.id}">
                        ${renderPkgContent(pkg)}
                    </div>
                </div>

                <div class="svc-cta">
                    <button class="svc-buy-btn" onclick="scrollToQuote('${svc.name}')">
                        🚀 Order Now
                    </button>
                    <button class="svc-quote-btn" onclick="scrollToQuote('${svc.name}')">
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
        <div class="port-item" onclick="openPortfolio(${index})" role="button" tabindex="0" aria-label="Open ${item.label} case study">
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

window.handleQuoteSubmit = function(e) {
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

    console.log('Quote Request:', data);

    // Simulate API call / email send
    setTimeout(() => {
        btn.classList.remove('loading');
        btn.disabled = false;

        // Show success
        const success = document.getElementById('successOverlay');
        if(success) success.classList.add('open');
        e.target.reset();

        showToast('Quote request sent! Check your email soon.','✅');
    }, 2000);
}

// =============================================
// HAMBURGER
// =============================================
const ham = document.getElementById('ham');
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
});

console.log('%c🚀 SanzyAI Services Page Loaded','color:#6C35DE;font-weight:bold;font-size:16px;');
