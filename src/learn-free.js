const roadmapByPath = {
    free: [
        {
            id: 'niche',
            title: 'Phase 1: Zero-Cost Niche Selection',
            duration: 'Day 1-2',
            tools: 'Google Trends, Reddit, AnswerThePublic, Exploding Topics, Ubersuggest, Keyword Sheeter',
            outcome: 'A validated niche with zero upfront spend',
            mistake: 'Picking a niche "just for money" that you have zero interest in. You will burn out before Phase 5.',
            tasks: [
                'Analyze 5 niche ideas using Google Trends and Pinterest Trends.',
                'Find 30 "pain point" questions on Reddit, Quora, and niche forums.',
                'Use Ubersuggest (Free Tier) to find 10 low-competition keywords.',
                'Draft your "Minimum Viable Message" (MVM) headline.'
            ]
        },
        {
            id: 'plan',
            title: 'Phase 2: Architecture & Planning',
            duration: 'Day 3',
            tools: 'Notion, Excalidraw, Miro (Free), Draw.io, sitemap.xml generators',
            outcome: 'Complete site structure and user flow',
            mistake: 'Trying to plan a 50-page site. Stick to 1 Home page and 5 Pillar pages to start.',
            tasks: [
                'Draw your site map (Home, 5 Pillars, Legal, Contact) in Draw.io.',
                'Plan your user journey: where do they land, where do they click?',
                'Define your "Conversion Goal" (e.g., Email Signup or Link Click).'
            ]
        },
        {
            id: 'stack',
            title: 'Phase 3: The Free Tech Stack',
            duration: 'Day 4',
            tools: 'GitHub, Vercel, Cloudflare, Netlify, InfinityFree, Surge.sh, 000webhost',
            outcome: 'Live site on global edge network for $0',
            mistake: 'Paying for premium hosting before you even have 100 visitors. Use free edge tiers first.',
            tasks: [
                'Create a GitHub repo and connect it to Vercel/Cloudflare Pages.',
                'Configure a free subdomain (e.g., .vercel.app) or use Surge.sh for CLI deployment.',
                'Verify SSL/HTTPS is active (automatic on most free hosts).'
            ]
        },
        {
            id: 'design',
            title: 'Phase 4: Visuals & Brand (Free)',
            duration: 'Day 5-7',
            tools: 'Canva, Figma (Free), Color Hunt, Fontjoy, Pixlr, Unsplash, Google Fonts, FontAwesome, Flaticon',
            outcome: 'A professional-looking high-trust identity',
            mistake: 'Spending 20+ hours on a logo. Your content and speed matter 10x more than your icon.',
            tasks: [
                'Design a logo and favicon in Canva or Figma.',
                'Pick a 2-color palette using Color Hunt and 2-font system using Fontjoy.',
                'Select 10 high-quality, legal-to-use images from Unsplash/Pexels.'
            ]
        },
        {
            id: 'content',
            title: 'Phase 5: Content Strategy for $0',
            duration: 'Week 2',
            tools: 'ChatGPT (Free), Claude (Free), Hemingway, Grammarly Free, Quillbot, Copy.ai (Free)',
            outcome: '5 SEO-optimized pillar articles',
            mistake: 'Copy-pasting raw AI text. Google rewards "Human-in-the-loop" content. Always edit.',
            tasks: [
                'Draft 5 "Ultimate Guide" articles targeting niche problems.',
                'Use AI for structure, then edit for your unique voice.',
                'Add images with descriptive ALT tags for search engines.'
            ]
        },
        {
            id: 'seo-speed',
            title: 'Phase 6: Performance & Tech SEO',
            duration: 'Week 3',
            tools: 'PageSpeed Insights, Squoosh.app, Microsoft Clarity, Ahrefs Free SEO Toolbar, Screaming Frog (Free)',
            outcome: 'Perfect Lighthouse scores and indexed pages',
            mistake: 'Uploading 5MB images. One heavy image can kill your SEO rankings. Always compress.',
            tasks: [
                'Compress all images using Squoosh to <100KB.',
                'Install Microsoft Clarity for 100% free heatmaps and session recordings.',
                'Submit your sitemap to Google Search Console.'
            ]
        },
        {
            id: 'traffic',
            title: 'Phase 7: Organic Growth (No Ads)',
            duration: 'Week 4',
            tools: 'Reddit, LinkedIn, Twitter/X, Buffer Free, Mailchimp Free, ManyChat Free',
            outcome: 'First 500 organic visitors',
            mistake: 'Buying "backlinks" or fake traffic. It will get your site banned from Google permanently.',
            tasks: [
                'Post 3 "Value Bombs" in subreddits without being "spammy".',
                'Set up a free newsletter and add a signup box to your site.',
                'Reach out to 5 other sites for a "guest post" exchange.'
            ]
        },
        {
            id: 'monetize',
            title: 'Phase 8: First $1 (Free Tools)',
            duration: 'Ongoing',
            tools: 'Gumroad, Amazon Associates, Ko-fi, BuyMeACoffee, Stripe Links',
            outcome: 'Setup your first revenue stream',
            mistake: 'Waiting for "perfect" traffic before adding links. Start monetizing from day 1.',
            tasks: [
                'Add Amazon affiliate links to your top guides.',
                'Create a $0-5 digital product on Gumroad.',
                'Add a "Support" button for your most loyal readers.'
            ]
        }
    ],
    paid: [
        {
            id: 'market',
            title: 'Phase 1: High-Intent Market Analysis',
            duration: 'Day 1-2',
            tools: 'Ahrefs, Semrush, SparkToro, Facebook Ad Library, SpyFu, SimilarWeb',
            outcome: 'Calculated market entry strategy',
            mistake: 'Picking keywords with high volume but low commercial intent. You want buyers, not just browsers.',
            tasks: [
                'Find "Money Keywords" with high volume and low KD.',
                'Analyze competitor traffic sources using SimilarWeb.',
                'Spy on active ads in your niche to see what sells.'
            ]
        },
        {
            id: 'strategy',
            title: 'Phase 2: Funnel Architecture',
            duration: 'Day 3',
            tools: 'Funnelytics, LucidChart, ClickUp, Monday.com, Hotjar',
            outcome: 'Optimized sales funnel blueprint',
            mistake: 'Making a funnel too complex. Start with Ad -> Landing Page -> Email -> Sale. Skip the 10 upsells.',
            tasks: [
                'Map your High-Ticket conversion path in Funnelytics.',
                'Define your "Lead Magnet" and "Tripwire" offer.',
                'Plan your automated email drip sequence.'
            ]
        },
        {
            id: 'hosting',
            title: 'Phase 3: Premium Infrastructure',
            duration: 'Day 4',
            tools: 'WP Engine, Kinsta, Cloudways, DigitalOcean, Namecheap Premium, Cloudflare Pro',
            outcome: 'Lightning-fast, secure business foundation',
            mistake: 'Buying the most expensive dedicated server for a new site. Start with Managed WP or a basic Cloudways.',
            tasks: [
                'Purchase a high-trust .com domain.',
                'Setup managed hosting with daily backups and staging.',
                'Configure a premium WAF (Firewall) and CDN.'
            ]
        },
        {
            id: 'design',
            title: 'Phase 4: High-Conversion Design',
            duration: 'Day 5-7',
            tools: 'Elementor Pro, Webflow, Framer, Envato Elements, Adobe CC, Figma Team',
            outcome: 'Premium brand identity and UI',
            mistake: 'Ignoring mobile design. 80%+ of your paid traffic will be on phones. Build mobile-first.',
            tasks: [
                'Install a high-perf framework or theme.',
                'Create custom, branded assets and icons.',
                'Setup Hotjar for advanced user recording.'
            ]
        },
        {
            id: 'content-scale',
            title: 'Phase 5: Content Authority Scaling',
            duration: 'Week 2',
            tools: 'Claude Pro, SurferSEO, Jasper, MarketMuse, Midjourney, Frase',
            outcome: '20+ SEO-perfect articles',
            mistake: 'Focusing on quantity over quality. One #1 ranking article is worth 100 articles on Page 5.',
            tasks: [
                'Produce 20 data-driven articles using AI editors.',
                'Generate custom AI art for every blog post.',
                'Optimize all content for #1 ranking potential.'
            ]
        },
        {
            id: 'perf-audit',
            title: 'Phase 6: Enterprise Performance',
            duration: 'Week 3',
            tools: 'GTmetrix Premium, Screaming Frog Paid, SEMrush Audit, WebPageTest',
            outcome: 'Sub-1s load times and 0 tech errors',
            mistake: 'Optimizing for speed but ignoring security. A fast site that gets hacked is a dead site.',
            tasks: [
                'Run a full crawl to fix broken links and redirects.',
                'Optimize Core Web Vitals to the extreme.',
                'Implement advanced Schema Markup (JSON-LD).'
            ]
        },
        {
            id: 'ads',
            title: 'Phase 7: Paid Acquisition (The Gas)',
            duration: 'Week 4',
            tools: 'Google Ads, Meta Ads, TikTok Ads, AdEspresso, WordStream',
            outcome: 'Predictable, scalable traffic',
            mistake: 'Scaling a losing ad. If it doesn\'t convert at $10/day, it won\'t convert at $1000/day. Fix the offer.',
            tasks: [
                'Launch a lead-gen ad campaign with $20/day.',
                'Setup Retargeting for anyone who visits the site.',
                'A/B test 3 different ad headlines and images.'
            ]
        },
        {
            id: 'automation',
            title: 'Phase 8: Revenue Automation',
            duration: 'Ongoing',
            tools: 'ConvertKit, Zapier, Make.com, Stripe, ActiveCampaign, HubSpot',
            outcome: 'Passive income machine',
            mistake: 'Automating a broken process. Automate things only AFTER you have done them manually and they work.',
            tasks: [
                'Automate your sales funnel from Lead -> Sale.',
                'Connect Stripe for global, multi-currency payments.',
                'Setup monthly automated performance reporting.'
            ]
        }
    ]
};

const stageDetailMap = {
    'free:niche': [
        { title: 'The 3-Circle Rule', desc: 'Find where your Passion, Skill, and Market Demand overlap. Use Google Trends to confirm the niche isn\'t dying.' },
        { title: 'Reddit Mining', desc: 'Go to subreddits in your niche. Filter by "Top" and "All Time". Look for questions starting with "How do I..." or "Why is it so hard to...".' },
        { title: 'Ubersuggest (Free)', desc: 'Neil Patel\'s tool gives you 3 free searches a day. Use them to find keywords with KD (Keyword Difficulty) under 20.' }
    ],
    'free:plan': [
        { title: 'Draw.io Sitemap', desc: 'Use Draw.io for a professional, free way to draw site architectures. Export as PNG and save in your Notion docs.' },
        { title: 'User Pathing', desc: 'Landing Page -> Value Proposition -> Call to Action. Every page must have ONE goal.' }
    ],
    'free:stack': [
        { title: 'GitHub for Non-Coders', desc: 'Think of GitHub as a "folder in the cloud" that stores your website files and keeps track of changes.' },
        { title: 'Vercel vs Netlify', desc: 'Both are free. Vercel is often faster for static sites, while Netlify has great form handling built-in.' }
    ],
    'free:design': [
        { title: 'Color Hunt (Palettes)', desc: 'Don\'t guess colors. Browse thousands of curated color palettes and find one that fits your brand emotion.' },
        { title: 'Fontjoy (Pairings)', desc: 'Uses AI to find perfect font pairings. Pick one for headings and one for body text for instant pro design.' }
    ],
    'free:content': [
        { title: 'AI Brainstorming', desc: 'Ask ChatGPT: "What are 10 questions a beginner in [Niche] would ask?". These are your first 10 blog posts.' },
        { title: 'Hemingway App', desc: 'Paste your text here. It tells you if your sentences are too hard to read. Aim for Grade 6-8.' }
    ],
    'free:seo-speed': [
        { title: 'Squoosh Image Prep', desc: 'A free tool by Google. Convert JPGs to WebP. It can reduce image size by 90% with zero quality loss.' },
        { title: 'Microsoft Clarity (100% Free)', desc: 'Unlike Hotjar (which limits you), Clarity is 100% free forever for unlimited heatmaps and recordings.' }
    ],
    'free:traffic': [
        { title: 'ManyChat (Free)', desc: 'Automate your Instagram/Facebook replies. Send people to your landing page automatically when they comment.' },
        { title: 'Buffer Free Tier', desc: 'Schedule your social posts for the whole week in one hour. Stay consistent without being on your phone all day.' }
    ],
    'free:monetize': [
        { title: 'Amazon Associates', desc: 'The easiest way to start. Link to products you use. You get a commission on anything they buy in 24 hours.' },
        { title: 'Stripe Payment Links', desc: 'Create a direct payment link in Stripe for a service or digital item. No complex checkout needed.' }
    ],
    'paid:market': [
        { title: 'Ahrefs Deep Dive', desc: 'Find keywords with "High Volume" but "Low Competition". This is the shortcut to ranking #1.' },
        { title: 'SparkToro Audience', desc: 'Find exactly what podcasts your audience listens to and what social accounts they follow.' }
    ],
    'paid:strategy': [
        { title: 'Funnelytics Mapping', desc: 'Draw your funnel properly. See where people "drop off" so you can fix the leaks.' },
        { title: 'The High-Ticket Path', desc: 'Plan how to move a user from a $10 ebook to a $1000 coaching or software subscription.' }
    ],
    'paid:hosting': [
        { title: 'WP Engine/Kinsta', desc: 'Managed WordPress hosting. They handle speed, security, and updates. You focus on your business.' },
        { title: 'DigitalOcean Droplets', desc: 'For the tech-savvy. High-performance VPS for a fraction of the cost of managed hosting.' }
    ],
    'paid:design': [
        { title: 'Elementor Pro / Divi', desc: 'Drag-and-drop design for WordPress. Build any design you can imagine without code.' },
        { title: 'Webflow/Framer', desc: 'The future of web design. Professional-grade interactions and animations.' }
    ],
    'paid:content-scale': [
        { title: 'Claude/GPT Pro', desc: 'The advanced models have better reasoning and writing. They are worth the $20/mo subscription.' },
        { title: 'SurferSEO / Frase', desc: 'Data-driven tools that tell you exactly how many words and headers you need to rank.' }
    ],
    'paid:perf-audit': [
        { title: 'Screaming Frog SEO', desc: 'The industry standard for technical audits. Find every broken link, redirect, and missing tag.' },
        { title: 'GTmetrix Deep Audit', desc: 'Detailed waterfall charts that show you exactly what file is slowing down your site.' }
    ],
    'paid:ads': [
        { title: 'Google Ads Search', desc: 'Bid on high-intent keywords to appear at the very top of Google instantly.' },
        { title: 'Retargeting Pixels', desc: 'Show ads to people who visited your site but didn\'t buy. It\'s the highest ROI in advertising.' }
    ],
    'paid:automation': [
        { title: 'Zapier / Make.com', desc: 'Connect your website to your email, CRM, and accounting. Run your business on autopilot.' },
        { title: 'ActiveCampaign CRM', desc: 'Advanced email automation that sends different messages based on what the user does.' }
    ]
};

const launchChecklist = [
    'Homepage with clear value proposition',
    'Mobile navigation works perfectly',
    'Contact form tested end-to-end',
    'Privacy policy + terms linked in footer',
    'Sitemap submitted to Google Search Console',
    'Page speed tested (Desktop/Mobile > 90)',
    'Analytics events tracking CTA clicks',
    'Custom Favicon and Brand Colors set',
    'Open Graph (OG) tags for social sharing',
    'Robots.txt file correctly configured',
    'Broken link check (0 errors)',
    'Image ALT tags for all visuals',
    'One high-value Lead Magnet added',
    'Email Signup form integrated',
    'One monetization path enabled',
    'Weekly growth task scheduled'
];

let activePath = 'free';
let activeStageIndex = 0;
let currentSprintPlan = null;
let jspdfLoaderPromise = null;
const DEBUG_MODE = new URLSearchParams(window.location.search).get('debug') === '1';

const ACTIVITY_KEY = 'learnfree_activity_days';
const VISITED_KEY = 'learnfree_visited_stages';

function trackEvent(eventName, params = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
}

function prefetchJspdf() {
    if (!jspdfLoaderPromise) {
        jspdfLoaderPromise = import('jspdf');
    }
    return jspdfLoaderPromise;
}

function formatMoney(num) {
    return `$${Math.max(0, Math.round(num)).toLocaleString()}`;
}

function showToast(msg, icon = '✅') {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toastMsg');
    const iconEl = document.getElementById('toastIcon');
    if (!toast || !msgEl || !iconEl) return;

    msgEl.textContent = msg;
    iconEl.textContent = icon;
    toast.classList.add('show');
    clearTimeout(window.__sanzyToastTimer);
    window.__sanzyToastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function renderRoadmap() {
    const track = document.getElementById('roadmapTrack');
    const stages = roadmapByPath[activePath];
    if (!track || !stages) return;

    track.innerHTML = stages.map((stage, index) => `
        <article class="stage-card ${index === activeStageIndex ? 'active' : ''}" data-action="select-stage" data-stage-index="${index}" role="button" tabindex="0">
            <div class="stage-index">${index + 1}</div>
            <div>
                <div class="stage-name">${stage.title}</div>
                <div class="stage-time">${stage.duration}</div>
            </div>
            <span class="stage-type ${activePath}">${activePath}</span>
        </article>
    `).join('');

    renderStageDetail();
}

function getVisitedStages() {
    return new Set(JSON.parse(localStorage.getItem(VISITED_KEY) || '[]'));
}

function setVisitedStage(stageId) {
    const visited = getVisitedStages();
    visited.add(stageId);
    localStorage.setItem(VISITED_KEY, JSON.stringify(Array.from(visited)));
    updateBadges();
}

function getChecklistSet() {
    return new Set(JSON.parse(localStorage.getItem('learnfree_checklist') || '[]'));
}

function updateLearnProgressUI() {
    const visited = getVisitedStages();
    const checklist = getChecklistSet();
    const stageTotal = roadmapByPath[activePath].length;
    const stageSeen = roadmapByPath[activePath].filter((stage) => visited.has(`${activePath}:${stage.id}`)).length;
    const tasksDone = checklist.size;
    const tasksTotal = launchChecklist.length;

    const stagePct = stageTotal === 0 ? 0 : (stageSeen / stageTotal) * 100;
    const taskPct = tasksTotal === 0 ? 0 : (tasksDone / tasksTotal) * 100;
    const overallPct = Math.round((stagePct * 0.45) + (taskPct * 0.55));

    const ring = document.getElementById('learnRing');
    const pctEl = document.getElementById('learnProgressPct');
    const tasksEl = document.getElementById('tasksDone');
    const stagesEl = document.getElementById('stagesSeen');

    if (ring) {
        const circumference = 314;
        const offset = circumference - (circumference * overallPct / 100);
        ring.style.strokeDashoffset = `${offset}`;
    }
    if (pctEl) pctEl.textContent = `${overallPct}%`;
    if (tasksEl) tasksEl.textContent = `${tasksDone}/${tasksTotal}`;
    if (stagesEl) stagesEl.textContent = `${stageSeen}/${stageTotal}`;

    if (overallPct === 100) triggerConfetti();
    updateBadges();
}

function updateBadges() {
    const visited = getVisitedStages();
    const checklist = getChecklistSet();
    const totalChecklist = launchChecklist.length;
    
    const bNiche = document.getElementById('badge-niche');
    const bStack = document.getElementById('badge-stack');
    const bContent = document.getElementById('badge-content');
    const bHero = document.getElementById('badge-hero');

    if (visited.has('free:niche') || visited.has('paid:market')) bNiche?.classList.remove('locked'), bNiche?.classList.add('unlocked');
    if (visited.has('free:stack') || visited.has('paid:hosting')) bStack?.classList.remove('locked'), bStack?.classList.add('unlocked');
    if (visited.has('free:content') || visited.has('paid:content-scale')) bContent?.classList.remove('locked'), bContent?.classList.add('unlocked');
    if (checklist.size === totalChecklist) bHero?.classList.remove('locked'), bHero?.classList.add('unlocked');
}

function triggerConfetti() {
    if (window.confettiActive) return;
    window.confettiActive = true;
    showToast('YOU ARE A WEBSITE HERO!', '🏆');
}

function renderStageDetail() {
    const stage = roadmapByPath[activePath][activeStageIndex];
    const title = document.getElementById('stageTitle');
    const summary = document.getElementById('stageSummary');
    const meta = document.getElementById('stageMeta');
    const tasks = document.getElementById('stageTasks');
    const detailList = document.getElementById('stageStepList');

    if (!stage || !title || !summary || !meta || !tasks || !detailList) return;

    title.textContent = stage.title;
    summary.textContent = stage.outcome;
    meta.innerHTML = `
        <span class="pill">Path: ${activePath.toUpperCase()}</span>
        <span class="pill">Timing: ${stage.duration}</span>
        <span class="pill">Tools: ${stage.tools}</span>
    `;

    tasks.innerHTML = stage.tasks.map((task) => `<li>${task}</li>`).join('');

    const detailKey = `${activePath}:${stage.id}`;
    const detailSteps = stageDetailMap[detailKey] || [];
    
    let html = detailSteps.map((step, idx) => `
        <article class="stage-step" style="--delay:${idx * 70}ms">
            <div class="stage-step-head">
                <span class="stage-step-index">${idx + 1}</span>
                <span class="stage-step-title">${step.title}</span>
            </div>
            <p class="stage-step-desc">${step.desc}</p>
        </article>
    `).join('');

    if (stage.mistake) {
        html += `
            <div class="mistake-box">
                <strong>🚫 Common Mistake to Avoid</strong>
                <p>${stage.mistake}</p>
            </div>
        `;
    }

    html += `
        <div class="mentor-btn-wrap">
            <button class="btn-mentor" onclick="askMentor('${stage.id}')">
                <span>🤖 Ask the AI Mentor about this stage</span>
            </button>
        </div>
    `;

    detailList.innerHTML = html;
}

window.askMentor = function(stageId) {
    const stage = roadmapByPath[activePath][activeStageIndex];
    const msg = `I am currently in ${stage.title} (${activePath} path). I have a question about using ${stage.tools.split(',')[0]} for my website. Can you give me a beginner-friendly tip?`;
    
    if (window.triggerInteraction) {
        window.triggerInteraction(msg);
    } else {
        showToast('Chat with AI using the bubble at the bottom!', '🤖');
    }
}

// Quiz Logic
let quizAnswers = [];
window.nextQuiz = function(qNum, value) {
    quizAnswers.push(value);
    const curr = document.querySelector(`.quiz-q[data-q="${qNum}"]`);
    const next = document.querySelector(`.quiz-q[data-q="${qNum + 1}"]`);
    if (curr && next) {
        curr.classList.remove('active');
        next.classList.add('active');
    }
}

window.finishQuiz = function(value) {
    quizAnswers.push(value);
    const freeCount = quizAnswers.filter(v => v === 'free').length;
    const paidCount = quizAnswers.filter(v => v === 'paid').length;
    const result = freeCount >= paidCount ? 'free' : 'paid';
    
    document.querySelector('.quiz-questions').style.display = 'none';
    const resEl = document.getElementById('quizResult');
    const msgEl = document.getElementById('quizResultMsg');
    
    resEl.hidden = false;
    msgEl.innerHTML = result === 'free' 
        ? "We recommend the <strong>Free Path</strong>. It's perfect for learning the ropes without any financial risk."
        : "We recommend the <strong>Paid Path</strong>. Your goals and budget suggest you're ready for professional growth.";
    
    window.setPath(result);
}

window.resetQuiz = function() {
    quizAnswers = [];
    document.querySelector('.quiz-questions').style.display = 'block';
    document.getElementById('quizResult').hidden = true;
    document.querySelectorAll('.quiz-q').forEach(q => q.classList.remove('active'));
    document.querySelector('.quiz-q[data-q="1"]').classList.add('active');
}

window.setPath = function(path) {
    activePath = path === 'paid' ? 'paid' : 'free';
    activeStageIndex = 0;
    document.getElementById('freePathBtn')?.classList.toggle('active', activePath === 'free');
    document.getElementById('paidPathBtn')?.classList.toggle('active', activePath === 'paid');
    renderRoadmap();
    updateBudget();
    updateLearnProgressUI();
};

window.selectStage = function(index) {
    activeStageIndex = index;
    const stage = roadmapByPath[activePath][index];
    if (stage) setVisitedStage(`${activePath}:${stage.id}`);
    renderRoadmap();
};

window.updateBudget = function() {
    const project = document.getElementById('projectType')?.value || 'portfolio';
    const traffic = Number(document.getElementById('trafficRange')?.value || 2500);
    const usage = document.getElementById('aiUsage')?.value || 'medium';

    const trafficOut = document.getElementById('trafficOut');
    if (trafficOut) trafficOut.textContent = `${traffic.toLocaleString()} visitors`;

    const baseByProject = {
        portfolio: { free: 0, paid: 19 },
        blog: { free: 2, paid: 29 },
        store: { free: 5, paid: 59 },
        saas: { free: 9, paid: 99 }
    };

    const usageFactor = {
        light: { free: 0, paid: 8 },
        medium: { free: 2, paid: 18 },
        heavy: { free: 6, paid: 38 }
    };

    const trafficFactorFree = traffic > 10000 ? 8 : traffic > 5000 ? 4 : 0;
    const trafficFactorPaid = traffic > 10000 ? 42 : traffic > 5000 ? 18 : 6;

    let freeCost = baseByProject[project].free + usageFactor[usage].free + trafficFactorFree;
    let paidCost = baseByProject[project].paid + usageFactor[usage].paid + trafficFactorPaid;

    if (activePath === 'free') freeCost = Math.max(0, freeCost - 2);
    if (activePath === 'paid') paidCost += 12;

    const freeEstimate = document.getElementById('freeEstimate');
    const freeYearly = document.getElementById('freeYearly');
    const paidEstimate = document.getElementById('paidEstimate');
    const paidYearly = document.getElementById('paidYearly');

    if (freeEstimate) freeEstimate.textContent = `${formatMoney(freeCost)}/mo`;
    if (freeYearly) freeYearly.textContent = `${formatMoney(freeCost * 12)}/year`;
    if (paidEstimate) paidEstimate.textContent = `${formatMoney(paidCost)}/mo`;
    if (paidYearly) paidYearly.textContent = `${formatMoney(paidCost * 12)}/year`;
}

window.generateSprintPlan = function() {
    const niche = (document.getElementById('nicheInput')?.value || '').trim() || 'your niche';
    const hours = Number(document.getElementById('hoursInput')?.value || 8);
    const channel = document.getElementById('channelInput')?.value || 'seo';

    const channelPlay = {
        seo: ['Publish 2 optimized pages per week', 'Build 5 internal links each page', 'Submit updates in Search Console'],
        social: ['Post one value thread daily', 'Repurpose into short clips', 'Use CTA to one landing page'],
        community: ['Answer 3 questions/day in niche groups', 'Drop one free template weekly', 'Invite users to email list'],
        email: ['Create one lead magnet', 'Run 5-email welcome sequence', 'Send one weekly value newsletter']
    };

    const intensity = hours >= 15 ? 'aggressive' : hours >= 8 ? 'balanced' : 'lean';
    currentSprintPlan = {
        niche,
        intensity,
        channel,
        hours,
        channelTasks: channelPlay[channel]
    };

    const output = document.getElementById('growthOutput');
    if (!output) return;

    output.innerHTML = `
        <h3>30-Day ${intensity.toUpperCase()} Sprint for ${niche}</h3>
        <div class="sprint-block">
            <strong>Week 1: Foundation</strong>
            <ul>
                <li>Finalize offer + homepage for ${niche}.</li>
                <li>Set one conversion goal and one CTA.</li>
                <li>Publish your first practical guide.</li>
            </ul>
        </div>
        <div class="sprint-block">
            <strong>Week 2: Distribution</strong>
            <ul>
                ${channelPlay[channel].map((item) => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="sprint-block">
            <strong>Week 3: Conversion</strong>
            <ul>
                <li>Add proof blocks, FAQs, and stronger CTA copy.</li>
                <li>Create one free tool/template as lead magnet.</li>
                <li>Run one simple A/B test on headline.</li>
            </ul>
        </div>
        <div class="sprint-block">
            <strong>Week 4: Scale</strong>
            <ul>
                <li>Double down on best performing channel.</li>
                <li>Cut weak pages and improve winners.</li>
                <li>Define next 30-day repeatable growth loop.</li>
            </ul>
        </div>
    `;

    const saveBtn = document.getElementById('savePlanPdfBtn');
    if (saveBtn) saveBtn.disabled = false;
    updateLearnProgressUI();
    showToast('Growth sprint generated', '🚀');
};

window.saveSprintPlanAsPdf = function() {
    if (!currentSprintPlan) return;
    prefetchJspdf().then(({ jsPDF }) => {
        const doc = new jsPDF();
        doc.text(`SanzyAI Sprint Plan: ${currentSprintPlan.niche}`, 10, 10);
        doc.save('sprint-plan.pdf');
    });
};

function renderChecklist() {
    const grid = document.getElementById('checkGrid');
    if (!grid) return;
    const saved = JSON.parse(localStorage.getItem('learnfree_checklist') || '[]');
    const active = new Set(saved);

    grid.innerHTML = launchChecklist.map((item, index) => `
        <label class="check-item">
            <input type="checkbox" ${active.has(index) ? 'checked' : ''} data-index="${index}" onchange="toggleCheckItem(${index}, this.checked)">
            <span>${item}</span>
        </label>
    `).join('');
    updateChecklistProgress(active);
}

function updateChecklistProgress(activeSet) {
    const total = launchChecklist.length;
    const done = activeSet.size;
    const pct = Math.round((done / total) * 100);
    const bar = document.getElementById('checkProgressBar');
    const text = document.getElementById('checkProgressText');
    if (bar) bar.style.width = `${pct}%`;
    if (text) text.textContent = `${pct}% complete (${done}/${total} tasks)`;
}

window.toggleCheckItem = function(index, checked) {
    const saved = new Set(JSON.parse(localStorage.getItem('learnfree_checklist') || '[]'));
    if (checked) saved.add(index); else saved.delete(index);
    localStorage.setItem('learnfree_checklist', JSON.stringify(Array.from(saved)));
    updateChecklistProgress(saved);
    updateLearnProgressUI();
};

document.addEventListener('DOMContentLoaded', () => {
    renderRoadmap();
    updateLearnProgressUI();
    renderChecklist();
    updateBudget();
    
    document.getElementById('freePathBtn')?.addEventListener('click', () => window.setPath('free'));
    document.getElementById('paidPathBtn')?.addEventListener('click', () => window.setPath('paid'));
    document.getElementById('projectType')?.addEventListener('change', () => window.updateBudget());
    document.getElementById('trafficRange')?.addEventListener('input', () => window.updateBudget());
    document.getElementById('aiUsage')?.addEventListener('change', () => window.updateBudget());
    document.getElementById('generateSprintBtn')?.addEventListener('click', () => window.generateSprintPlan());
    document.getElementById('savePlanPdfBtn')?.addEventListener('click', () => window.saveSprintPlanAsPdf());

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-action="select-stage"]');
        if (trigger) window.selectStage(Number(trigger.dataset.stageIndex));
    });
});
