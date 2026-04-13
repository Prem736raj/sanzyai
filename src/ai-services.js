// =============================================
// DATA
// =============================================
const services = [
    {
        id:1, name:'AI Content Writing', icon:'✍️',
        bg:'rgba(108,53,222,0.15)', delivery:'24 Hours',
        startingPrice:'$50/article',
        desc:'SEO-optimized blog posts, articles, and website copy crafted by advanced AI and reviewed by human editors for maximum quality and accuracy.',
        packages:[
            { name:'Basic', price:'$50', desc:'1 article (1000 words)', features:['1 SEO blog post','1000-1500 words','Meta description','Plagiarism report','1 revision'] },
            { name:'Standard', price:'$200', desc:'5 articles bundle', features:['5 SEO blog posts','1000+ words each','Keyword research','Meta descriptions','Unlimited revisions'] },
            { name:'Premium', price:'$600/mo', desc:'20 articles/month', features:['20 articles monthly','Full SEO strategy','Content calendar','Social snippets','Priority delivery','Monthly report'] }
        ],
        features:['SEO optimized content','Plagiarism free guaranteed','Human reviewed & edited','Unlimited revisions included','Meta description included','Keyword research']
    },
    {
        id:2, name:'AI Logo & Brand Design', icon:'🎨',
        bg:'rgba(255,107,53,0.15)', delivery:'12 Hours',
        startingPrice:'$30',
        desc:'Professional logos and complete brand identities created with cutting-edge AI design tools and refined by creative human designers.',
        packages:[
            { name:'Basic', price:'$30', desc:'3 logo concepts', features:['3 logo variations','High-res PNG/SVG','Black & white version','2 revisions included','Commercial license'] },
            { name:'Standard', price:'$75', desc:'10 concepts + brand kit', features:['10 logo concepts','Full brand kit','Color palette','Typography guide','Social media kit','Unlimited revisions'] },
            { name:'Premium', price:'$200', desc:'Full brand identity', features:['Full brand identity','Logo + guidelines','Business card design','Letterhead template','Social media templates','Brand strategy doc'] }
        ],
        features:['Vector file formats','Commercial license','Multiple file formats','Brand guidelines included','Social media ready','Quick turnaround']
    },
    {
        id:3, name:'AI Social Media Management', icon:'📱',
        bg:'rgba(255,20,147,0.12)', delivery:'Ongoing',
        startingPrice:'$100/month',
        desc:'Complete social media management powered by AI. We handle content creation, scheduling, hashtags and reporting across all major platforms.',
        packages:[
            { name:'Starter', price:'$100/mo', desc:'Essential presence', features:['15 posts/month','Instagram + Facebook','AI-written captions','Hashtag research','Basic monthly report'] },
            { name:'Growth', price:'$200/mo', desc:'Multi-platform', features:['30 posts/month','4 platforms covered','Custom graphics included','Story content','Engagement report','Content calendar'] },
            { name:'Pro', price:'$400/mo', desc:'Full management', features:['60 posts/month','All platforms','Video reels included','Community management','Weekly reports','Strategy calls'] }
        ],
        features:['30 posts per month','AI-crafted captions','Hashtag optimization','Posting schedule','Monthly analytics report','Platform management']
    },
    {
        id:4, name:'AI Chatbot Setup', icon:'🤖',
        bg:'rgba(0,212,255,0.12)', delivery:'3 Days',
        startingPrice:'$200',
        desc:'Custom AI chatbots trained on your business data and integrated into your website. Handles customer queries 24/7 without human intervention.',
        packages:[
            { name:'Basic', price:'$200', desc:'Simple chatbot', features:['FAQ chatbot setup','Website integration','Basic training (50 Q&As)','7 days support','Setup documentation'] },
            { name:'Standard', price:'$500', desc:'Smart assistant', features:['Advanced AI chatbot','CRM integration','Custom training (200+ Q&As)','Lead capture setup','30 days support','Analytics dashboard'] },
            { name:'Enterprise', price:'$1200', desc:'Full AI agent', features:['Full AI agent','Multi-platform deploy','Unlimited training data','API integrations','90 days support','Custom reporting','Dedicated setup call'] }
        ],
        features:['Custom trained on your data','Website integration included','30 days support','Training documentation','Lead capture setup','Multi-language support']
    },
    {
        id:5, name:'AI Video Creation', icon:'🎬',
        bg:'rgba(255,59,48,0.12)', delivery:'48 Hours',
        startingPrice:'$75/video',
        desc:'Professional AI-generated videos with realistic avatars, custom scripts, background music and subtitles. Perfect for marketing, training and social media.',
        packages:[
            { name:'Basic', price:'$75', desc:'1 short video (1 min)', features:['1-minute AI video','Script writing','AI avatar included','Background music','HD quality export'] },
            { name:'Standard', price:'$180', desc:'3 videos bundle', features:['3 AI videos (2 min each)','Custom script writing','AI avatar + backgrounds','Music + subtitles','Thumbnail design','3 revisions'] },
            { name:'Premium', price:'$400/mo', desc:'8 videos/month', features:['8 videos monthly','Up to 5 minutes each','Multiple AI presenters','Full post-production','Subtitles in 3 languages','YouTube optimization'] }
        ],
        features:['Professional script writing','AI avatar presenter','Background music included','Subtitles & captions','HD video delivery','Thumbnail design']
    },
    {
        id:6, name:'AI SEO Optimization', icon:'🔍',
        bg:'rgba(0,200,81,0.12)', delivery:'Ongoing',
        startingPrice:'$150/month',
        desc:'Data-driven SEO powered by AI. We research keywords, optimize content, fix technical issues and track rankings to get you more organic traffic.',
        packages:[
            { name:'Basic', price:'$150/mo', desc:'Foundation SEO', features:['Keyword research (20 KWs)','On-page optimization','Meta tags optimization','Monthly ranking report','Basic link building'] },
            { name:'Growth', price:'$300/mo', desc:'Accelerated growth', features:['Full keyword strategy','Content optimization','Technical SEO audit','Competitor analysis','Monthly detailed report','10 backlinks/month'] },
            { name:'Authority', price:'$600/mo', desc:'Market domination', features:['Unlimited keyword targeting','Full site optimization','Advanced technical SEO','25 backlinks/month','Weekly ranking updates','Quarterly strategy review'] }
        ],
        features:['Keyword research & strategy','Content optimization','Meta tags & schema','Monthly ranking report','Technical SEO included','Competitor analysis']
    },
    {
        id:7, name:'AI Email Marketing', icon:'📧',
        bg:'rgba(255,184,0,0.12)', delivery:'24 Hours',
        startingPrice:'$80/campaign',
        desc:'High-converting email campaigns written by AI and optimized for open rates and clicks. Includes copywriting, subject line testing and full sequences.',
        packages:[
            { name:'Single', price:'$80', desc:'1 email campaign', features:['1 full email campaign','3 subject line variations','Mobile-optimized design','Performance tracking','2 revisions included'] },
            { name:'Sequence', price:'$200', desc:'5-email sequence', features:['5-email automation','Welcome + nurture flow','Subject line A/B tests','Segmentation strategy','Detailed analytics','Unlimited revisions'] },
            { name:'Monthly', price:'$350/mo', desc:'Ongoing campaigns', features:['4 campaigns/month','Full automation setup','List management','A/B testing monthly','Monthly performance report','Strategy optimization'] }
        ],
        features:['AI-written email copy','Subject line A/B testing','5-email sequence included','Performance tracking','Mobile optimized','Segmentation strategy']
    },
    {
        id:8, name:'AI Business Consulting', icon:'💼',
        bg:'rgba(108,53,222,0.12)', delivery:'Scheduled',
        startingPrice:'$100/hour',
        desc:'Strategic AI consulting to transform your business operations. Get a custom AI implementation roadmap, tool stack recommendations and ROI projections.',
        packages:[
            { name:'Single Call', price:'$100', desc:'1 hour strategy session', features:['60-min video consultation','AI opportunity assessment','Tool recommendations','Session recording','Action items list','1-week follow-up email'] },
            { name:'Deep Dive', price:'$250', desc:'3-hour intensive', features:['3-hour consultation','Full AI audit of business','Custom AI roadmap (PDF)','Implementation timeline','Priority tool setup list','2 weeks email support'] },
            { name:'Retainer', price:'$500/mo', desc:'Ongoing advisory', features:['4 hours/month consulting','Monthly strategy review','AI tool setup assistance','Team training session','Unlimited email support','Quarterly business review'] }
        ],
        features:['1-hour video consultation','Custom AI strategy plan','Tool recommendations','2 weeks follow-up support','Session recording included','ROI projections']
    }
];

const testimonials = [
    { name:'Sarah Mitchell', flag:'🇺🇸', role:'E-commerce Store Owner', avatar:'👩💼', avatarBg:'rgba(108,53,222,0.2)', rating:5, service:'AI Content Writing', text:'SanzyAI transformed my product descriptions completely. My conversion rate jumped by 32% in just 6 weeks. The quality is incredible — you\'d never know it was AI-assisted. Highly recommend their content team!' },
    { name:'James Okonkwo', flag:'🇬🇧', role:'Digital Marketing Manager', avatar:'👨💻', avatarBg:'rgba(0,200,81,0.15)', rating:5, service:'AI SEO Optimization', text:'Went from page 5 to page 1 on Google for my main keyword in 3 months. The AI SEO strategy they developed was comprehensive and clearly explained. Best investment I\'ve made for my agency.' },
    { name:'Priya Sharma', flag:'🇮🇳', role:'SaaS Startup Founder', avatar:'👩🚀', avatarBg:'rgba(255,184,0,0.15)', rating:5, service:'AI Chatbot Setup', text:'The chatbot they built handles 80% of our support tickets automatically. Setup was fast, training was thorough and the 30-day support meant we were fully confident before they handed it off. Worth every penny.' },
    { name:'Marco Rossi', flag:'🇩🇪', role:'YouTube Content Creator', avatar:'🎬', avatarBg:'rgba(255,59,48,0.12)', rating:5, service:'AI Video Creation', text:'I was skeptical about AI avatars but the quality blew me away. My product explainer videos look completely professional. Saved me $2,000+ in video production costs and the turnaround is insanely fast.' },
    { name:'Lisa Chen', flag:'🇦🇺', role:'Brand Consultant', avatar:'🎨', avatarBg:'rgba(255,107,53,0.12)', rating:4, service:'AI Logo & Brand Design', text:'Got 10 logo concepts in 12 hours. The AI-generated designs were modern, clean and versatile. We went through 3 revision rounds and they were always responsive and professional throughout the process.' },
    { name:'Ahmed Al-Rashid', flag:'🇦🇪', role:'Real Estate Business Owner', avatar:'🏢', avatarBg:'rgba(0,212,255,0.12)', rating:5, service:'AI Social Media Management', text:'Our social media was non-existent before SanzyAI. Now we have consistent daily posts, our followers doubled in 2 months and we\'ve generated actual leads from social. The team really understands our industry.' }
];

const portfolioItems = [
    { emoji:'📝', label:'Tech Blog Content', sub:'AI Content Writing • 15,000 words/month', bg:'linear-gradient(135deg,#1E1E2E,#2D1B6B)', accent:'rgba(108,53,222,0.6)' },
    { emoji:'🎨', label:'SaaS Brand Identity', sub:'Logo Design + Full Brand Kit', bg:'linear-gradient(135deg,#2E1E1A,#6B3B1B)', accent:'rgba(255,107,53,0.6)' },
    { emoji:'🤖', label:'E-commerce Chatbot', sub:'AI Chatbot • 800+ Q&As Trained', bg:'linear-gradient(135deg,#1E1E2A,#1B356B)', accent:'rgba(0,212,255,0.6)' },
    { emoji:'🎬', label:'Product Launch Video', sub:'AI Video • 3-minute explainer', bg:'linear-gradient(135deg,#2E1A1A,#6B1B1B)', accent:'rgba(255,59,48,0.6)' },
    { emoji:'📈', label:'SaaS SEO Campaign', sub:'SEO Optimization • 280% traffic increase', bg:'linear-gradient(135deg,#1A2E1A,#1B6B35)', accent:'rgba(0,200,81,0.6)' },
    { emoji:'📱', label:'Influencer Social Pack', sub:'Social Media • 60 posts/month', bg:'linear-gradient(135deg,#2E1A2E,#6B1B5A)', accent:'rgba(255,20,147,0.6)' }
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

    grid.innerHTML = portfolioItems.map(item => `
        <div class="port-item">
            <div class="port-bg" style="background:${item.bg};">
                <div class="port-emoji">${item.emoji}</div>
                <div class="port-label">${item.label}</div>
                <div class="port-sublabel">${item.sub}</div>
                <div class="port-overlay">
                    <div style="font-size:2.5rem;">${item.emoji}</div>
                    <div class="port-label">${item.label}</div>
                    <div class="port-sublabel">${item.sub}</div>
                    <button class="port-view-btn" onclick="showToast('Portfolio case study coming soon!','📋')">View Case Study →</button>
                </div>
            </div>
        </div>
    `).join('');
}

// =============================================
// RENDER TESTIMONIALS
// =============================================
function renderTestimonials() {
    const grid = document.getElementById('testiGrid');
    if(!grid) return;

    grid.innerHTML = testimonials.map(t => `
        <div class="testi-card">
            <div class="testi-top">
                <div class="testi-avatar" style="background:${t.avatarBg};">${t.avatar}</div>
                <div class="testi-info">
                    <div class="testi-name">${t.name} <span class="testi-flag">${t.flag}</span></div>
                    <div class="testi-role">${t.role}</div>
                </div>
            </div>
            <div class="testi-stars">
                ${Array.from({length:5},(_,i) => `<span class="tstar" style="opacity:${i<t.rating?1:0.25};">★</span>`).join('')}
            </div>
            <p class="testi-text">"${t.text}"</p>
            <span class="testi-service">✅ Used: ${t.service}</span>
        </div>
    `).join('');
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
    renderTestimonials();
    createParticles();
});

console.log('%c🚀 SanzyAI Services Page Loaded','color:#6C35DE;font-weight:bold;font-size:16px;');
