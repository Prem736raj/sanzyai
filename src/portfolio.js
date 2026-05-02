const portfolioProjects = [
    {
        id: 1,
        slug: "saas-content-series",
        category: "Content",
        tag: "Blog Writing",
        title: "SaaS Content Series",
        subtitle: "15 SEO-Optimized Blog Posts",
        client: "TechFlow SaaS",
        industry: "Software / B2B",
        duration: "7 Days",
        result: "+340% Organic Traffic",
        price: "$105",
        image: "/assets/portfolio/saas.png",
        stats: [
            { label: "Articles", value: "15" },
            { label: "Avg Words", value: "1,200" },
            { label: "Traffic Boost", value: "+340%" },
            { label: "Keywords Ranked", value: "47" },
        ],
        description: "A full content marketing series for a B2B SaaS company targeting startup founders. Each article was deeply researched, SEO-structured, and written to rank on page 1.",
        deliverables: [
            "15 long-form SEO articles",
            "Keyword research & clustering",
            "Internal linking strategy",
            "Meta titles & descriptions",
            "Content calendar",
            "Plagiarism reports",
        ],
        tools: ["ChatGPT-4", "SurferSEO", "Grammarly", "Ahrefs"],
        testimonial: {
            text: "Our blog went from 200 to 12,000 monthly visitors in 60 days. Insane ROI.",
            author: "Marcus T.",
            role: "Founder, TechFlow",
        },
    },
    {
        id: 2,
        slug: "ecommerce-product-copy",
        category: "Content",
        tag: "Copywriting",
        title: "E-Commerce Product Copy",
        subtitle: "50 High-Converting Product Descriptions",
        client: "UrbanWear Store",
        industry: "Fashion / E-Commerce",
        duration: "3 Days",
        result: "+28% Conversion Rate",
        price: "$120",
        image: "/assets/portfolio/ecommerce.png",
        stats: [
            { label: "Products", value: "50" },
            { label: "Conv. Boost", value: "+28%" },
            { label: "Avg Length", value: "200w" },
            { label: "Revisions", value: "0" },
        ],
        description: "Compelling product descriptions for a fashion brand's full catalog. Copy was designed to trigger emotion, communicate value, and push buyers to checkout.",
        deliverables: [
            "50 product descriptions",
            "SEO keyword integration",
            "Tone & voice guide",
            "A/B test variants",
            "Mobile-optimized copy",
            "Brand style sheet",
        ],
        tools: ["Claude AI", "Jasper", "Hemingway App"],
        testimonial: {
            text: "Conversion rate jumped 28% the week we updated our product pages.",
            author: "Priya S.",
            role: "CMO, UrbanWear",
        },
    },
    {
        id: 3,
        slug: "youtube-script-series",
        category: "Content",
        tag: "Video Scripts",
        title: "YouTube Script Series",
        subtitle: "12 Viral-Optimized Video Scripts",
        client: "FinanceWithAlex",
        industry: "Finance / Education",
        duration: "5 Days",
        result: "2.1M Views in 30 Days",
        price: "$84",
        image: "/assets/portfolio/youtube.png",
        stats: [
            { label: "Scripts", value: "12" },
            { label: "Total Views", value: "2.1M" },
            { label: "Avg Duration", value: "11 min" },
            { label: "Subscribers", value: "+8.4K" },
        ],
        description: "A full month of YouTube scripts for a personal finance creator. Each script had a viral hook, structured flow, retention loops, and a CTA that drove subscribers.",
        deliverables: [
            "12 full video scripts",
            "Hook variations (3 per video)",
            "Chapter markers",
            "On-screen text cues",
            "End screen CTAs",
            "SEO title suggestions",
        ],
        tools: ["GPT-4", "VidIQ", "TubeBuddy"],
        targetPage: "/video-scripts-portfolio.html",
        testimonial: {
            text: "One script hit 800K views. Never thought AI could write this well.",
            author: "Alex R.",
            role: "YouTuber, 180K Subs",
        },
    },
    {
        id: 4,
        slug: "fintech-brand-identity",
        category: "Design",
        tag: "Brand Identity",
        title: "Fintech Brand Identity",
        subtitle: "Complete Visual Brand System",
        client: "NovaPay",
        industry: "Fintech / Payments",
        duration: "48 Hours",
        result: "Funded $500K Seed Round",
        price: "$180",
        image: "/assets/portfolio/fintech.png",
        stats: [
            { label: "Logo Concepts", value: "20" },
            { label: "Brand Colors", value: "8" },
            { label: "File Formats", value: "12" },
            { label: "Delivery", value: "48h" },
        ],
        description: "Full brand identity design for a fintech startup preparing for seed funding. Delivered logo suite, color system, typography, and a 30-page brand guidelines document.",
        deliverables: [
            "20 logo concepts",
            "Final logo suite (all formats)",
            "Color palette system",
            "Typography guide",
            "Brand guidelines PDF",
            "Business card design",
            "Email signature",
            "Social media kit",
        ],
        tools: ["Midjourney", "Adobe Illustrator", "Figma", "Canva AI"],
        testimonial: {
            text: "Our investors said the brand looked like a $10M company. Worth every cent.",
            author: "Kemi A.",
            role: "CEO, NovaPay",
        },
    },
    {
        id: 5,
        slug: "wellness-app-logo",
        category: "Design",
        tag: "Logo Design",
        title: "Wellness App Logo Pack",
        subtitle: "100+ Unique Concepts (Click to View Vault)",
        client: "MindBloom",
        industry: "Health & Wellness",
        duration: "12 Hours",
        result: "App Store Featured",
        price: "$48",
        image: "/assets/portfolio/wellness.png",
        stats: [
            { label: "Logo Concepts", value: "100+" },
            { label: "Variations", value: "Infinite" },
            { label: "Formats", value: "SVG/PNG/PDF" },
            { label: "Revisions", value: "Unlimited" },
        ],
        description: "Explore our massive vault of 100+ unique, high-quality logos generated for a wellness brand. Each logo is professional, modern, and ready for launch.",
        deliverables: [
            "100+ unique logo concepts",
            "Full prompt vault access",
            "App icon (all sizes)",
            "Light & dark versions",
            "Monochrome version",
            "Commercial license",
        ],
        tools: ["Midjourney V6", "Adobe Illustrator", "Figma"],
        targetPage: "/wellness-app-showcase.html",
        testimonial: {
            text: "Got featured by Apple App Store within 2 weeks of launch. The logo was a big part.",
            author: "Sophia L.",
            role: "Founder, MindBloom",
        },
    },
    {
        id: 6,
        slug: "restaurant-menu-design",
        category: "Design",
        tag: "Print Design",
        title: "Restaurant Brand Package",
        subtitle: "Menu + Logo + Social Templates",
        client: "Saffron Kitchen",
        industry: "F&B / Restaurant",
        duration: "24 Hours",
        result: "+45% Dine-In Bookings",
        price: "$65",
        image: "/assets/portfolio/restaurant.png",
        stats: [
            { label: "Menu Pages", value: "8" },
            { label: "Social Templates", value: "15" },
            { label: "Bookings Boost", value: "+45%" },
            { label: "Delivery", value: "24h" },
        ],
        description: "Complete visual rebrand for a fine dining restaurant. New logo, full menu redesign, and 15 editable social media templates in Canva.",
        deliverables: [
            "New restaurant logo",
            "8-page menu (print-ready)",
            "15 Instagram templates",
            "Facebook cover design",
            "Google Business photos",
            "Editable Canva files",
        ],
        tools: ["Canva AI", "Midjourney", "Adobe InDesign"],
        testimonial: {
            text: "Customers literally take photos of the menu. Bookings went up 45%.",
            author: "Ravi P.",
            role: "Owner, Saffron Kitchen",
        },
    },
    {
        id: 7,
        slug: "fitness-coach-social-kit",
        category: "Social",
        tag: "Social Media",
        title: "Fitness Coach Social Kit",
        subtitle: "90-Day Content Engine",
        client: "Coach Daniela",
        industry: "Fitness / Personal Brand",
        duration: "24 Hours",
        result: "+12K Instagram Followers",
        price: "$72",
        image: "/assets/portfolio/fitness.png",
        stats: [
            { label: "Captions", value: "90" },
            { label: "New Followers", value: "+12K" },
            { label: "Hashtag Sets", value: "30" },
            { label: "Reel Scripts", value: "20" },
        ],
        description: "90-day social media content system for a fitness coach. Included daily captions, hashtag clusters, viral hooks, reel scripts, and a full content calendar.",
        deliverables: [
            "90 Instagram captions",
            "20 Reel scripts",
            "Hashtag strategy (30 sets)",
            "Content calendar",
            "Story prompt ideas",
            "Engagement reply templates",
            "Bio optimization",
        ],
        tools: ["ChatGPT-4", "Metricool", "Later"],
        testimonial: {
            text: "Went from 3K to 15K followers in 90 days. The content was elite.",
            author: "Daniela M.",
            role: "Fitness Coach",
        },
    },
    {
        id: 8,
        slug: "startup-linkedin-strategy",
        category: "Social",
        tag: "LinkedIn",
        title: "Startup LinkedIn Strategy",
        subtitle: "60-Day Thought Leadership Campaign",
        client: "BuildrAI",
        industry: "AI Startup / B2B",
        duration: "48 Hours",
        result: "500K+ Post Impressions",
        price: "$96",
        image: "/assets/portfolio/linkedin.png",
        stats: [
            { label: "Posts", value: "60" },
            { label: "Impressions", value: "500K+" },
            { label: "Leads Gen", value: "47" },
            { label: "Connections", value: "+890" },
        ],
        description: "60-day LinkedIn content strategy for an AI startup. Posts ranged from thought leadership to product stories. The campaign generated 47 qualified leads.",
        deliverables: [
            "60 LinkedIn posts",
            "Thought leadership articles",
            "Carousel post scripts",
            "Hashtag strategy",
            "Profile optimization guide",
            "Engagement playbook",
        ],
        tools: ["Claude AI", "Taplio", "Shield Analytics"],
        testimonial: {
            text: "One post got 80K impressions. We closed 3 enterprise deals from LinkedIn alone.",
            author: "Jay K.",
            role: "CEO, BuildrAI",
        },
    },
    {
        id: 9,
        slug: "beauty-brand-tiktok",
        category: "Social",
        tag: "TikTok / Reels",
        title: "Beauty Brand TikTok Scripts",
        subtitle: "30 Viral TikTok + Reel Scripts",
        client: "GlowLab Beauty",
        industry: "Beauty / D2C",
        duration: "24 Hours",
        result: "3 Videos Hit 1M+ Views",
        price: "$60",
        image: "/assets/portfolio/tiktok.png",
        stats: [
            { label: "Scripts", value: "30" },
            { label: "Viral Videos", value: "3" },
            { label: "Views", value: "4.2M" },
            { label: "Sales Boost", value: "+67%" },
        ],
        description: "30 TikTok and Reel scripts for a beauty brand, engineered for virality. Used proven hooks, trend templates, and product demonstration formats.",
        deliverables: [
            "30 TikTok/Reel scripts",
            "Hook variations",
            "On-screen text overlays",
            "Caption + hashtags",
            "Trending sound suggestions",
            "Posting schedule",
        ],
        tools: ["GPT-4", "TikTok Trends", "CapCut AI"],
        testimonial: {
            text: "3 videos crossed 1M views. Sales went up 67% that month. Unreal.",
            author: "Lena C.",
            role: "Brand Director, GlowLab",
        },
    },
];

let activeFilter = "All";

function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    const filtered = activeFilter === "All" 
        ? portfolioProjects 
        : portfolioProjects.filter(p => p.category === activeFilter);

    grid.innerHTML = filtered.map(p => `
        <${p.targetPage ? `a href="${p.targetPage}"` : 'div'} class="project-card" data-slug="${p.slug}">
            <div class="card-visual">
                <img src="${p.image}" alt="${p.title}" class="card-img">
                <span class="card-tag">${p.tag}</span>
                <span class="card-result">${p.result}</span>
                <div class="card-overlay"></div>
            </div>
            <div class="card-content">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-subtitle">${p.subtitle}</p>
                <p class="project-desc">${p.description}</p>
                
                <div class="mini-stats">
                    ${p.stats.slice(0, 4).map(s => `
                        <div class="mini-stat">
                            <div class="ms-val">${s.value}</div>
                            <div class="ms-lbl">${s.label}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="card-footer">
                    <div class="footer-item">
                        <div class="fi-lbl">Client</div>
                        <div class="fi-val">${p.client}</div>
                    </div>
                    <div class="footer-item text-right">
                        <div class="fi-lbl">Project Value</div>
                        <div class="fi-val highlight">${p.price}</div>
                    </div>
                </div>
            </div>
        </${p.targetPage ? 'a' : 'div'}>
    `).join('');

    updateCounts();
}

function updateCounts() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = (activeFilter === "All" ? portfolioProjects : portfolioProjects.filter(p => p.category === activeFilter)).length;
    }

    document.getElementById('count-all').textContent = portfolioProjects.length;
    document.getElementById('count-content').textContent = portfolioProjects.filter(p => p.category === "Content").length;
    document.getElementById('count-design').textContent = portfolioProjects.filter(p => p.category === "Design").length;
    document.getElementById('count-social').textContent = portfolioProjects.filter(p => p.category === "Social").length;
}

function openCaseStudy(slug) {
    const project = portfolioProjects.find(p => p.slug === slug);
    if (!project) return;

    const modal = document.getElementById('modalOverlay');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;

    body.innerHTML = `
        <div class="case-study-hero">
            <img src="${project.image}" alt="${project.title}" class="cs-hero-bg">
            <div class="cs-hero-content">
                <span class="cs-tag">${project.tag}</span>
                <h1>${project.title}</h1>
                <p class="cs-sub">${project.subtitle}</p>
                <p class="cs-desc">${project.description}</p>
            </div>
            <div class="cs-hero-side">
                <div class="cs-quick-info">
                    <div class="qi-item"><span>Client</span><strong>${project.client}</strong></div>
                    <div class="qi-item"><span>Industry</span><strong>${project.industry}</strong></div>
                    <div class="qi-item"><span>Duration</span><strong>${project.duration}</strong></div>
                    <div class="qi-item"><span>Value</span><strong>${project.price}</strong></div>
                </div>
            </div>
        </div>
        
        <div class="cs-result-banner">
            <div class="cs-rb-text">
                <div class="cs-rb-lbl">Key Result</div>
                <div class="cs-rb-val">${project.result}</div>
            </div>
        </div>

        <div class="cs-stats-grid">
            ${project.stats.map(s => `
                <div class="cs-stat-card">
                    <div class="cs-stat-val">${s.value}</div>
                    <div class="cs-stat-lbl">${s.label}</div>
                </div>
            `).join('')}
        </div>

        <div class="cs-details-grid">
            <div class="cs-detail-box">
                <h2>What Was Delivered</h2>
                <ul class="cs-list">
                    ${project.deliverables.map(d => `<li>${d}</li>`).join('')}
                </ul>
            </div>
            <div class="cs-detail-box">
                <h2>AI Tools Used</h2>
                <div class="cs-tools">
                    ${project.tools.map(t => `<span class="cs-tool">${t}</span>`).join('')}
                </div>
                <div class="cs-process">
                    <h3>Our Process</h3>
                    <div class="process-steps">
                        <div class="p-step"><span>1</span> Brief</div>
                        <div class="p-step"><span>2</span> AI Gen</div>
                        <div class="p-step"><span>3</span> Human</div>
                        <div class="p-step"><span>4</span> Done</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cs-testimonial">
            <div class="t-quote">"${project.testimonial.text}"</div>
            <div class="t-author">
                <div>
                    <strong>${project.testimonial.author}</strong>
                    <span>${project.testimonial.role}</span>
                </div>
                <div class="t-stars">★★★★★</div>
            </div>
        </div>

        <div class="cs-footer-cta">
            <h3>Want Similar Results?</h3>
            <p>Get the same quality work for your project. Starting at $5.</p>
            <div class="cs-cta-btns">
                <a href="/ai-services" class="btn btn-primary">Order This Service</a>
                <button class="btn btn-outline" id="closeModalBtn">← Back to Portfolio</button>
            </div>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    document.getElementById('closeModalBtn').addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();

    const grid = document.getElementById('portfolioGrid');
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card && !card.href) {
            const slug = card.dataset.slug;
            openCaseStudy(slug);
        }
    });

    const modal = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
});
