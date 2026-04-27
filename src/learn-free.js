const roadmapByPath = {
    free: [
        {
            id: 'idea',
            title: 'Define Niche + Offer',
            duration: 'Day 1',
            tools: 'Google Trends, Reddit, Notion',
            outcome: 'One clear audience + one offer',
            tasks: [
                'Pick one narrow audience and one painful problem.',
                'Write your one-line value promise.',
                'Collect 20 keywords people already search for.'
            ]
        },
        {
            id: 'domain',
            title: 'Domain + Free Hosting Setup',
            duration: 'Day 2',
            tools: 'Namecheap, Cloudflare Pages / Vercel',
            outcome: 'Live domain connected to free hosting',
            tasks: [
                'Buy a short domain and enable privacy.',
                'Connect DNS records to your host.',
                'Turn on SSL and verify HTTPS.'
            ]
        },
        {
            id: 'build',
            title: 'Build MVP Website',
            duration: 'Day 3-5',
            tools: 'HTML/CSS, Vite, GitHub',
            outcome: 'Homepage + core pages + responsive UI',
            tasks: [
                'Publish Home, About, Contact, Privacy pages.',
                'Optimize navigation for mobile first.',
                'Set clear CTA above the fold.'
            ]
        },
        {
            id: 'content',
            title: 'Create SEO Content Base',
            duration: 'Week 2',
            tools: 'Search Console, Claude/ChatGPT free',
            outcome: '5 useful pages targeting real keywords',
            tasks: [
                'Write 5 pages that solve one user problem each.',
                'Add title, meta description, and internal links.',
                'Submit sitemap to Search Console.'
            ]
        },
        {
            id: 'growth',
            title: 'Organic Growth Engine',
            duration: 'Week 3',
            tools: 'Reddit, LinkedIn, X, Email capture',
            outcome: 'First 100 targeted visitors',
            tasks: [
                'Share one practical post daily for 7 days.',
                'Offer one free template to capture emails.',
                'Reply to 15 relevant conversations per week.'
            ]
        },
        {
            id: 'monetize',
            title: 'Monetize Early',
            duration: 'Week 4',
            tools: 'Affiliate links, Gumroad, Stripe links',
            outcome: 'First revenue signal',
            tasks: [
                'Add one starter offer on your top page.',
                'Create one affiliate recommendation block.',
                'Track clicks on CTA and revenue links.'
            ]
        },
        {
            id: 'iterate',
            title: 'Improve Weekly',
            duration: 'Ongoing',
            tools: 'Analytics + user feedback',
            outcome: 'Higher conversion each month',
            tasks: [
                'Keep only pages that bring visits or revenue.',
                'Rewrite weak headlines and CTAs.',
                'Double down on best traffic channels.'
            ]
        }
    ],
    paid: [
        {
            id: 'idea',
            title: 'Niche Validation Sprint',
            duration: 'Day 1',
            tools: 'Ahrefs/Semrush, SparkToro',
            outcome: 'Validated demand + competitor gap',
            tasks: [
                'Find low-competition high-intent keywords.',
                'Analyze competitor positioning and offers.',
                'Pick your clear positioning angle.'
            ]
        },
        {
            id: 'stack',
            title: 'Premium Stack Setup',
            duration: 'Day 2',
            tools: 'Domain, managed host, paid templates',
            outcome: 'Fast, stable, conversion-ready stack',
            tasks: [
                'Set managed hosting with CDN + backups.',
                'Install analytics and heatmaps.',
                'Configure business email + DNS correctly.'
            ]
        },
        {
            id: 'design',
            title: 'Brand + UX Build',
            duration: 'Day 3-5',
            tools: 'Framer/Webflow, paid UI kit',
            outcome: 'Professional, high-trust design',
            tasks: [
                'Build pages with consistent visual system.',
                'Improve readability and CTA hierarchy.',
                'Test responsiveness across breakpoints.'
            ]
        },
        {
            id: 'content',
            title: 'AI Content Production',
            duration: 'Week 2',
            tools: 'Claude Pro, image tools, editor',
            outcome: '10 optimized pages quickly',
            tasks: [
                'Create conversion-focused content briefs.',
                'Ship optimized pages with schema markup.',
                'Add lead magnets and comparison tables.'
            ]
        },
        {
            id: 'acquisition',
            title: 'Traffic Acceleration',
            duration: 'Week 3',
            tools: 'SEO + paid social + retargeting',
            outcome: 'Predictable traffic inflow',
            tasks: [
                'Launch one narrow ad campaign for key page.',
                'Retarget site visitors with lead offer.',
                'Measure CAC and stop weak creatives fast.'
            ]
        },
        {
            id: 'funnel',
            title: 'Sales Funnel + Email',
            duration: 'Week 4',
            tools: 'ConvertKit/Beehiiv, checkout tool',
            outcome: 'Lead capture and conversion pipeline',
            tasks: [
                'Create welcome sequence with 5 emails.',
                'Design one entry offer and one upsell.',
                'Track funnel drop-off points.'
            ]
        },
        {
            id: 'scale',
            title: 'Scale With Data',
            duration: 'Ongoing',
            tools: 'A/B testing + dashboard',
            outcome: 'Compounding growth',
            tasks: [
                'Run one A/B test per week on high traffic pages.',
                'Improve offer, headline, and proof blocks.',
                'Automate reporting and weekly decisions.'
            ]
        }
    ]
};

const stageDetailMap = {
    'free:idea': [
        { title: 'Audience Snapshot', desc: 'Write who you serve, what they struggle with, and what outcome they want in one sentence.' },
        { title: 'Problem Validation', desc: 'Check Reddit, Quora, and search suggestions. Save 10 real user questions as proof of demand.' },
        { title: 'Micro Offer Draft', desc: 'Define one core offer: free tool, guide, service, or product. Keep it narrow and specific.' },
        { title: 'Message Test', desc: 'Post your value line in one community and measure replies/clicks before building full site.' },
        { title: 'Decision Rule', desc: 'If people respond positively, move to domain setup. If not, refine audience and repeat.' }
    ],
    'free:domain': [
        { title: 'Name Criteria', desc: 'Pick a short, easy-to-spell domain. Avoid numbers and hyphens for stronger recall.' },
        { title: 'Registrar Compare', desc: 'Compare first-year and renewal prices. Renewal cost matters more than discount year one.' },
        { title: 'Buy + Protect', desc: 'Enable WHOIS privacy and auto-renew. Save registrar and DNS access in a secure note.' },
        { title: 'DNS Connect', desc: 'Point A/CNAME records to your hosting. Wait for propagation and verify SSL lock.' },
        { title: 'Brand Consistency', desc: 'Use the same name across email, social handle, and website title for trust.' }
    ],
    'free:build': [
        { title: 'Structure First', desc: 'Create core pages: Home, About, Contact, Privacy. Keep menu simple and clear.' },
        { title: 'Hero Outcome', desc: 'Write a homepage hero that explains what users get in 5 seconds.' },
        { title: 'CTA Placement', desc: 'Add one primary CTA above the fold and repeat it after key proof sections.' },
        { title: 'Mobile Pass', desc: 'Test 360px and 768px widths. Fix overflow, button spacing, and tap targets.' },
        { title: 'Publish MVP', desc: 'Ship version 1 quickly. Real feedback beats perfect design in early stage.' }
    ],
    'free:content': [
        { title: 'Keyword to Page Map', desc: 'Assign one primary search intent per page to avoid cannibalization.' },
        { title: 'Useful Content Blocks', desc: 'Use problem, process, examples, and checklist sections for practical value.' },
        { title: 'On-page Basics', desc: 'Set title, H1, meta description, and internal links between related pages.' },
        { title: 'Indexing Setup', desc: 'Submit sitemap and inspect URLs in Search Console after publishing.' },
        { title: 'Weekly Refresh', desc: 'Update top pages every 2-4 weeks with better examples and clearer CTAs.' }
    ],
    'free:growth': [
        { title: 'Channel Focus', desc: 'Pick one main traffic source for 30 days instead of spreading across everything.' },
        { title: 'Distribution Habit', desc: 'Repurpose one article into thread, carousel, and short post every day.' },
        { title: 'Lead Capture', desc: 'Offer one free checklist/template and collect email with clear benefit.' },
        { title: 'Community Loop', desc: 'Answer real questions where your audience hangs out and link useful resources.' },
        { title: 'Measure Weekly', desc: 'Track sessions, CTR, and signups weekly. Double down where numbers move.' }
    ],
    'free:monetize': [
        { title: 'Monetization Path', desc: 'Choose affiliate, product, or service model based on your audience intent.' },
        { title: 'Offer Packaging', desc: 'Create one simple entry offer with clear deliverable and price.' },
        { title: 'Trust Layer', desc: 'Add proof: examples, testimonials, or measurable outcomes.' },
        { title: 'Checkout Simplicity', desc: 'Reduce friction with one clear CTA and easy checkout flow.' },
        { title: 'Revenue Tracking', desc: 'Track clicks and sales source by page to know what actually converts.' }
    ],
    'free:iterate': [
        { title: 'Page Performance Review', desc: 'Identify top traffic pages and low-performing pages using analytics.' },
        { title: 'Improve Winners', desc: 'Upgrade winning pages with stronger CTA and better examples.' },
        { title: 'Cut Noise', desc: 'Remove or merge weak pages that add maintenance but no traffic.' },
        { title: 'Test One Change', desc: 'Run one change at a time so you know what caused improvement.' },
        { title: 'Monthly System', desc: 'Use a monthly cycle: review data, refine content, improve conversion.' }
    ],
    'paid:idea': [
        { title: 'Demand Scan', desc: 'Use paid tools to quantify volume, trend, and intent for each keyword cluster.' },
        { title: 'Competitor Gap', desc: 'Find what competitors miss: format, angle, or audience segment.' },
        { title: 'Offer Positioning', desc: 'Create one sharp positioning statement based on measurable differentiator.' },
        { title: 'Validation Campaign', desc: 'Run a small ad test to validate message before full build investment.' },
        { title: 'Go/No-Go Decision', desc: 'Proceed only when cost per signal is within your target range.' }
    ],
    'paid:stack': [
        { title: 'Domain Strategy', desc: 'Choose domain with long-term brand potential and clean renewals.' },
        { title: 'Infrastructure Setup', desc: 'Configure managed hosting, CDN, backups, and monitoring from day one.' },
        { title: 'Security Baseline', desc: 'Enable SSL, security headers, bot protection, and admin hardening.' },
        { title: 'Business Email', desc: 'Set branded email and SPF/DKIM/DMARC for delivery trust.' },
        { title: 'Performance Baseline', desc: 'Record initial CWV metrics and set improvement thresholds.' }
    ],
    'paid:design': [
        { title: 'Visual System', desc: 'Define typography, color system, spacing, and card patterns before page design.' },
        { title: 'Conversion UX', desc: 'Design pages around one CTA hierarchy and reduced cognitive load.' },
        { title: 'Proof Architecture', desc: 'Add credibility blocks where decisions happen: hero, pricing, checkout.' },
        { title: 'Responsive QA', desc: 'Test interaction quality on mobile gestures and keyboard navigation.' },
        { title: 'Polish Pass', desc: 'Refine microcopy and motion for clarity, not decoration.' }
    ],
    'paid:content': [
        { title: 'Editorial Plan', desc: 'Map content by funnel stage: awareness, consideration, conversion.' },
        { title: 'AI Draft + Human Edit', desc: 'Use AI for first drafts, then add examples, opinions, and proof.' },
        { title: 'Schema Coverage', desc: 'Apply FAQ/Article schema where relevant for richer SERP presence.' },
        { title: 'Internal Link Network', desc: 'Connect content clusters so authority flows to money pages.' },
        { title: 'Refresh Cadence', desc: 'Refresh high-value content monthly with updated data and insights.' }
    ],
    'paid:acquisition': [
        { title: 'Channel Split', desc: 'Allocate traffic budget by expected CAC and conversion rate assumptions.' },
        { title: 'Creative Testing', desc: 'Test multiple hooks and creatives early; kill weak variants quickly.' },
        { title: 'Retargeting Layer', desc: 'Retarget visitors by page intent with tailored offer sequence.' },
        { title: 'Attribution Hygiene', desc: 'Use UTM standards and dashboard views for trustworthy reporting.' },
        { title: 'Scale Rule', desc: 'Increase spend only on channels meeting profitability targets.' }
    ],
    'paid:funnel': [
        { title: 'Lead Magnet Fit', desc: 'Create one lead magnet aligned with your highest-intent audience segment.' },
        { title: 'Email Sequence', desc: 'Build a 5-email sequence: educate, prove, invite, handle objections, close.' },
        { title: 'Offer Ladder', desc: 'Structure entry offer, core offer, and optional upsell logically.' },
        { title: 'Checkout Optimization', desc: 'Reduce fields, clarify guarantee, and improve trust signals.' },
        { title: 'Funnel Analytics', desc: 'Track open, click, conversion, and drop-off by step.' }
    ],
    'paid:scale': [
        { title: 'Weekly Experiment', desc: 'Run one controlled test per week on top traffic pages.' },
        { title: 'Segment Insights', desc: 'Analyze behavior by device, channel, and returning users.' },
        { title: 'Automation Layer', desc: 'Automate reporting and notification triggers for key KPI shifts.' },
        { title: 'Team SOPs', desc: 'Document repeatable content, ad, and conversion workflows.' },
        { title: 'Compounding Loop', desc: 'Reinvest wins into content, distribution, and product quality.' }
    ]
};

const launchChecklist = [
    'Homepage with clear value proposition',
    'Mobile navigation works perfectly',
    'Contact form tested end-to-end',
    'Privacy policy + terms linked in footer',
    'Sitemap submitted to Google Search Console',
    'Page speed tested and optimized',
    'Analytics events tracking CTA clicks',
    'One lead magnet added',
    'One monetization path enabled',
    'Weekly growth task scheduled'
];

let activePath = 'free';
let activeStageIndex = 0;
let currentSprintPlan = null;
let jspdfLoaderPromise = null;
const DEBUG_MODE = new URLSearchParams(window.location.search).get('debug') === '1';

let debugPanelBody = null;

const ACTIVITY_KEY = 'learnfree_activity_days';
const VISITED_KEY = 'learnfree_visited_stages';

function trackEvent(eventName, params = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
    debugLogEvent(eventName, params);
}

function initDebugPanel() {
    if (!DEBUG_MODE || document.getElementById('debugPanel')) return;

    const panel = document.createElement('aside');
    panel.id = 'debugPanel';
    panel.className = 'debug-panel';
    panel.innerHTML = `
        <div class="debug-panel-head">
            <strong>Debug Events</strong>
            <span>?debug=1</span>
        </div>
        <div class="debug-panel-body" id="debugPanelBody"></div>
    `;
    document.body.appendChild(panel);
    debugPanelBody = document.getElementById('debugPanelBody');
}

function debugLogEvent(eventName, params = {}) {
    if (!DEBUG_MODE || !debugPanelBody) return;

    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const item = document.createElement('div');
    item.className = 'debug-item';

    const payload = Object.keys(params).length ? JSON.stringify(params) : '{}';
    item.innerHTML = `
        <div class="debug-item-top"><span>${eventName}</span><time>${ts}</time></div>
        <pre>${payload}</pre>
    `;

    debugPanelBody.prepend(item);

    const maxItems = 20;
    while (debugPanelBody.children.length > maxItems) {
        debugPanelBody.removeChild(debugPanelBody.lastChild);
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
}

function getChecklistSet() {
    return new Set(JSON.parse(localStorage.getItem('learnfree_checklist') || '[]'));
}

function markTodayActivity() {
    const today = new Date().toISOString().slice(0, 10);
    const days = new Set(JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]'));
    days.add(today);
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(Array.from(days).sort()));
}

function getStreakCount() {
    const saved = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]').sort();
    if (saved.length === 0) return 0;

    const set = new Set(saved);
    let streak = 0;
    const d = new Date();

    while (true) {
        const key = d.toISOString().slice(0, 10);
        if (!set.has(key)) break;
        streak += 1;
        d.setDate(d.getDate() - 1);
    }
    return streak;
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
    const streakEl = document.getElementById('streakDays');
    const tasksEl = document.getElementById('tasksDone');
    const stagesEl = document.getElementById('stagesSeen');

    if (ring) {
        const circumference = 314;
        const offset = circumference - (circumference * overallPct / 100);
        ring.style.strokeDashoffset = `${offset}`;
    }
    if (pctEl) pctEl.textContent = `${overallPct}%`;
    if (streakEl) streakEl.textContent = `${getStreakCount()}`;
    if (tasksEl) tasksEl.textContent = `${tasksDone}/${tasksTotal}`;
    if (stagesEl) stagesEl.textContent = `${stageSeen}/${stageTotal}`;
}

function renderStageDetail() {
    const stage = roadmapByPath[activePath][activeStageIndex];
    const title = document.getElementById('stageTitle');
    const summary = document.getElementById('stageSummary');
    const meta = document.getElementById('stageMeta');
    const tasks = document.getElementById('stageTasks');
    const detailList = document.getElementById('stageStepList');
    const domainLink = document.getElementById('stageDomainLink');

    if (!stage || !title || !summary || !meta || !tasks || !detailList || !domainLink) return;

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
    detailList.innerHTML = detailSteps.map((step, idx) => `
        <article class="stage-step" style="--delay:${idx * 70}ms">
            <div class="stage-step-head">
                <span class="stage-step-index">${idx + 1}</span>
                <span class="stage-step-title">${step.title}</span>
            </div>
            <p class="stage-step-desc">${step.desc}</p>
        </article>
    `).join('');

    const showDomainLink = stage.id === 'domain' || stage.id === 'stack';
    domainLink.style.display = showDomainLink ? 'inline-flex' : 'none';
}

window.setPath = function(path) {
    activePath = path === 'paid' ? 'paid' : 'free';
    activeStageIndex = 0;

    document.getElementById('freePathBtn')?.classList.toggle('active', activePath === 'free');
    document.getElementById('paidPathBtn')?.classList.toggle('active', activePath === 'paid');

    renderRoadmap();
    updateBudget();
    updateLearnProgressUI();
    trackEvent('learnfree_path_switch', { path: activePath });
    showToast(`${activePath.toUpperCase()} path loaded`, '🧭');
};

window.selectStage = function(index) {
    activeStageIndex = index;
    const stage = roadmapByPath[activePath][index];
    if (stage) {
        setVisitedStage(`${activePath}:${stage.id}`);
        markTodayActivity();
        updateLearnProgressUI();
        trackEvent('learnfree_stage_select', { path: activePath, stage_id: stage.id, stage_title: stage.title });
    }
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

    markTodayActivity();
    updateLearnProgressUI();
    trackEvent('learnfree_sprint_generated', { channel, intensity, hours_per_week: hours });

    showToast('Growth sprint generated', '🚀');
};

window.saveSprintPlanAsPdf = function() {
    if (!currentSprintPlan) {
        showToast('Generate a sprint plan first', '⚠️');
        return;
    }

    const saveBtn = document.getElementById('savePlanPdfBtn');
    const prevText = saveBtn ? saveBtn.textContent : '';

    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Preparing PDF...';
    }

    prefetchJspdf().then(({ jsPDF }) => {
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const margin = 48;
        let y = margin;

        const addLine = (text, size = 12, spacing = 20) => {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(size);
            const lines = doc.splitTextToSize(text, 500);
            doc.text(lines, margin, y);
            y += (lines.length * spacing);
            if (y > 760) {
                doc.addPage();
                y = margin;
            }
        };

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('SanzyAI 30-Day Growth Sprint Plan', margin, y);
        y += 30;

        addLine(`Niche: ${currentSprintPlan.niche}`);
        addLine(`Intensity: ${currentSprintPlan.intensity}`);
        addLine(`Primary Channel: ${currentSprintPlan.channel}`);
        addLine(`Hours/Week: ${currentSprintPlan.hours}`);
        y += 4;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Week-by-Week Actions', margin, y);
        y += 24;

        addLine('Week 1: Finalize offer, launch homepage, publish first practical guide.');
        addLine(`Week 2: ${currentSprintPlan.channelTasks.join(' | ')}`);
        addLine('Week 3: Improve conversion blocks, lead magnet, and test headline.');
        addLine('Week 4: Scale winning channel, remove weak pages, define next sprint.');

        y += 10;
        addLine('Generated from Learn Free Interactive Lab on SanzyAI.', 10, 16);

        const fileSafeNiche = currentSprintPlan.niche.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        doc.save(`sanzyai-sprint-plan-${fileSafeNiche || 'website'}.pdf`);

        markTodayActivity();
        updateLearnProgressUI();
        trackEvent('learnfree_sprint_pdf_saved', {
            niche: currentSprintPlan.niche,
            channel: currentSprintPlan.channel,
            intensity: currentSprintPlan.intensity
        });
        showToast('Sprint plan PDF saved', '📄');
    }).catch(() => {
        trackEvent('learnfree_sprint_pdf_error');
        showToast('Could not generate PDF right now', '⚠️');
    }).finally(() => {
        if (saveBtn) {
            saveBtn.textContent = prevText || 'Save My Sprint Plan as PDF';
            saveBtn.disabled = false;
        }
    });
};

function renderChecklist() {
    const grid = document.getElementById('checkGrid');
    if (!grid) return;

    const saved = JSON.parse(localStorage.getItem('learnfree_checklist') || '[]');
    const active = new Set(saved);

    grid.innerHTML = launchChecklist.map((item, index) => `
        <label class="check-item">
            <input type="checkbox" ${active.has(index) ? 'checked' : ''} data-action="toggle-checklist" data-item-index="${index}">
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

window.toggleChecklist = function(index, checked) {
    const saved = new Set(JSON.parse(localStorage.getItem('learnfree_checklist') || '[]'));
    if (checked) saved.add(index);
    else saved.delete(index);

    localStorage.setItem('learnfree_checklist', JSON.stringify(Array.from(saved)));
    updateChecklistProgress(saved);
    markTodayActivity();
    updateLearnProgressUI();
    trackEvent('learnfree_checklist_toggle', {
        item_index: index,
        checked,
        completed_count: saved.size
    });
};

function setupMobileNav() {
    const ham = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!ham || !mobileNav) return;

    ham.addEventListener('click', () => {
        ham.classList.toggle('active');
        mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
            ham.classList.remove('active');
            mobileNav.classList.remove('open');
        });
    });
}

function bindLearnFreeControls() {
    document.getElementById('freePathBtn')?.addEventListener('click', () => window.setPath('free'));
    document.getElementById('paidPathBtn')?.addEventListener('click', () => window.setPath('paid'));

    ['projectType', 'trafficRange', 'aiUsage'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const evt = id === 'trafficRange' ? 'input' : 'change';
        el.addEventListener(evt, () => window.updateBudget());
    });

    document.getElementById('generateSprintBtn')?.addEventListener('click', () => {
        window.generateSprintPlan();
    });

    document.getElementById('savePlanPdfBtn')?.addEventListener('click', () => {
        window.saveSprintPlanAsPdf();
    });

    document.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-action]');
        if (!trigger) return;

        if (trigger.dataset.action === 'select-stage') {
            const index = Number(trigger.dataset.stageIndex || '-1');
            if (index >= 0) {
                window.selectStage(index);
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const card = event.target.closest('[data-action="select-stage"]');
        if (!card || event.target !== card) return;
        event.preventDefault();
        const index = Number(card.dataset.stageIndex || '-1');
        if (index >= 0) {
            window.selectStage(index);
        }
    });

    document.addEventListener('change', (event) => {
        const input = event.target;
        if (!(input instanceof HTMLInputElement)) return;
        if (input.dataset.action !== 'toggle-checklist') return;
        const index = Number(input.dataset.itemIndex || '-1');
        if (index >= 0) {
            window.toggleChecklist(index, input.checked);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initDebugPanel();
    bindLearnFreeControls();
    renderRoadmap();
    updateBudget();
    renderChecklist();
    setupMobileNav();
    const hasExistingActivity = getVisitedStages().size > 0;
    const firstStage = roadmapByPath[activePath][0];
    if (firstStage && hasExistingActivity) setVisitedStage(`${activePath}:${firstStage.id}`);
    updateLearnProgressUI();
});
