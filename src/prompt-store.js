// =============================================
// PROMPT PACKS DATA
// =============================================

const packs = [
    {
        id:0, name:'Ultimate Premium Prompt Bundle',
        image:'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#1A1A24,#2D1B4B)',
        price:9.99, origPrice:49, priceCategory:'5-15',
        platforms:['chatgpt','midjourney','claude','gemini'],
        count:10000, category:'Bundles / Everything',
        rating:5.0, reviews:842, reviewCount:'842',
        badge:'👑 Premium All-Access', badgeClass:'badge-gold',
        cardClass:'bestseller',
        desc:'Gain complete access to our entire premium library. Includes over 10,000 professional-grade prompts for business, marketing, SEO, coding, and creative arts. Updated monthly.',
        included:[
            'Access to the entire prompt library (10k+ prompts)',
            'Lifetime updates (New prompts added monthly)',
            'The "Virtual CMO" mega-prompt framework',
            'Prompt engineering cheat sheets & PDF guides',
            'Private Discord community access'
        ],
        samples:[
            { label:'The Virtual CMO Prompt', text:'Act as a fractional CMO for my [NICHE] business. Review my current revenue model: [MODEL]. Give me a 30-day aggressive growth plan focusing on 1) Zero-cost acquisition channels, 2) Optimizing my landing page conversion rate, and 3) An email automation sequence to recover abandoned carts. Format the plan into a daily checklist.' },
            { label:'100x Content Repurposer', text:'Take this core piece of content: [PASTE CONTENT]. Repurpose it into: 1) A viral 12-tweet thread with hooks, 2) A 300-word LinkedIn thought leadership post, 3) A 60-second TikTok script, 4) A 5-email onboarding sequence, and 5) 3 SEO-focused blog post titles.' }
        ],
        reviews_data:[
            { name:'Michael T.', rating:5, text:'I literally fired my marketing agency after buying this. The Virtual CMO prompt is insane.', date:'2 days ago' },
            { name:'Sarah K.', rating:5, text:'$49 is a steal for 10,000 prompts. I use it every single day for my e-com brand.', date:'1 week ago' }
        ],
        fbt:[1,3],
        link:'https://sanzyai.gumroad.com/l/the-mastery-vault'
    },
    {
        id:1, name:'ChatGPT for Solo-Founders',
        image:'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#101820,#1A2A3A)',
        price:2.99, origPrice:15, priceCategory:'1-5',
        platforms:['chatgpt','business'],
        count:150, category:'ChatGPT / Business',
        rating:4.9, reviews:215, reviewCount:'215',
        badge:'💼 Business Bestseller', badgeClass:'badge-trending',
        cardClass:'',
        desc:'Stop working *in* your business and start working *on* it. 150 elite ChatGPT prompts designed specifically for Solo-Founders and bootstrappers to automate marketing, sales, and operations.',
        included:[
            'The 150-word Cold Email template that books 5+ demos a week',
            'One-click business plan & financial projector',
            'Automated customer support response macros',
            'SaaS pricing model & tiered offering calculators',
            'Investor pitch deck outline generator'
        ],
        samples:[
            { label:'Cold Email Writer', text:'Write a highly personalized cold email to [PROSPECT NAME] at [COMPANY]. Make it under 150 words. The hook must reference their recent achievement: [ACHIEVEMENT]. Do not talk about my company until the 3rd sentence. Focus on their pain point: [PAIN POINT]. End with a low-friction 15-minute call CTA.' },
            { label:'Pricing Strategy Matrix', text:'Act as a SaaS pricing expert. My product does [FUNCTION] for [AUDIENCE]. Suggest 3 pricing tiers (Basic, Pro, Enterprise). For each tier, give me: The monthly price, 3 anchor features, psychological pricing justification, and the exact naming convention to use to drive users to the middle tier.' }
        ],
        reviews_data:[
            { name:'David R.', rating:5, text:'The cold email prompts tripled my response rate in one week.', date:'4 days ago' },
            { name:'Priya M.', rating:5, text:'Saved me 20 hours a week on operations. Essential for any solopreneur.', date:'2 weeks ago' }
        ],
        fbt:[7,4],
        link:'https://sanzyai.gumroad.com/l/solo-founder-chatgpt-pack'
    },
    {
        id:2, name:'Midjourney E-Commerce Seller Pack',
        image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#231515,#421A1A)',
        price:3.49, origPrice:20, priceCategory:'1-5',
        platforms:['midjourney','art','business'],
        count:100, category:'Midjourney / E-commerce',
        rating:4.8, reviews:142, reviewCount:'142',
        badge:'📸 High-Converting', badgeClass:'badge-hot',
        cardClass:'',
        desc:'Never pay for expensive professional photography or 3D mockups again. 100 copy-paste Midjourney prompts that generate photorealistic lifestyle shots, pure white backgrounds, and infographic assets for physical products.',
        included:[
            'Pure white background (Amazon compliant) product prompts',
            'High-end lifestyle setting & environmental prompts',
            'Photorealistic shadow and ray-tracing adjustments',
            'Packaging mockup generators (Boxes, Bottles, Tubes)',
            'Infographic element generators'
        ],
        samples:[
            { label:'Lifestyle Product Shot', text:'Commercial photography of a [PRODUCT TYPE] sitting on a marble countertop in a modern, sunlit kitchen. Depth of field, blurred background, morning sunlight streaming through a window, highly detailed, photorealistic, shot on Sony A7R IV, 85mm lens, f/1.8 --ar 16:9 --style raw --v 6' },
            { label:'Amazon Pure White', text:'Studio photography of a [PRODUCT TYPE], pure white background rgb(255,255,255), bright even studio lighting, soft shadows, front angle, clear branding, sharp edges, 8k resolution, commercial product photography --ar 1:1 --v 6' }
        ],
        reviews_data:[
            { name:'Alex W.', rating:5, text:'My Etsy click-through rate doubled. The lifestyle prompts are indistinguishable from real photos.', date:'1 week ago' },
            { name:'Jenna B.', rating:4, text:'Takes a bit of tweaking to get the text right on packaging, but the lighting is incredible.', date:'2 weeks ago' }
        ],
        fbt:[1,3],
        link:'https://sanzyai.gumroad.com/l/midjourney-ecommerce-pack'
    },
    {
        id:3, name:'SEO Content Writer Pack',
        image:'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#1E2E1E,#1B6B35)',
        price:1.99, origPrice:10, priceCategory:'1-5',
        platforms:['chatgpt','seo'],
        count:50, category:'ChatGPT / SEO',
        rating:4.7, reviews:89, reviewCount:'89',
        badge:'📈 Traffic Driver', badgeClass:'badge-new',
        cardClass:'',
        desc:'Stop writing articles that nobody reads. 50 advanced SEO-focused ChatGPT prompts that generate Rank-1 content, optimize meta tags, and perform deep competitor cluster analysis.',
        included:[
            'The 2,000+ word "Skyscraper" blog post generator',
            'LSI keyword & semantic entity integrator',
            'High-CTR Meta Description optimizer (under 160 chars)',
            'Competitor topical gap analysis frameworks',
            'Internal linking architecture strategies'
        ],
        samples:[
            { label:'Skyscraper Article Generator', text:'Write a 2000-word comprehensive guide about "[TOPIC]". Primary Keyword: "[KEY]". Secondary Keywords: [LIST]. You must structure it with 1x H1, 5-7x H2s, and bulleted lists. The tone must be authoritative but accessible. Include a "Key Takeaways" summary box at the top, and answer the following PAA (People Also Ask) queries in an FAQ section at the bottom: [PAA LIST].' },
            { label:'Topical Authority Cluster', text:'Act as an elite SEO Strategist. I want to build topical authority for the silo: "[CORE TOPIC]". Give me a content cluster strategy including 1 Pillar Page title and 10 supporting cluster article titles. For each, provide the primary long-tail keyword, search intent (informational/transactional), and naturally suggest internal link anchor text pointing back to the pillar.' }
        ],
        reviews_data:[
            { name:'Leo K.', rating:5, text:'My tech blog finally hit page 1 for my main keyword. The topical cluster prompt is genius.', date:'3 weeks ago' },
            { name:'Rachel S.', rating:5, text:'I cancelled my $99/mo AI writing tool. These prompts combined with ChatGPT Plus are way better.', date:'1 month ago' }
        ],
        fbt:[4,1],
        link:'https://sanzyai.gumroad.com/l/seo-content-writer-pack'
    },
    {
        id:4, name:'Go Viral: Social Media AI Pack',
        image:'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#1A2436,#1D3A5F)',
        price:1.99, origPrice:10, priceCategory:'1-5',
        platforms:['chatgpt','social'],
        count:65, category:'ChatGPT / Social Media',
        rating:4.8, reviews:156, reviewCount:'156',
        badge:'🗣️ High Engagement', badgeClass:'badge-money',
        cardClass:'',
        desc:'Turn your social profiles into lead-generation machines. 65 highly-engineered prompts to generate viral Twitter/X threads, engaging LinkedIn thought-leadership, and algorithmic short-form hooks.',
        included:[
            'The "Justin Welsh" LinkedIn post structure template',
            '10-Tweet viral thread generator with cliffhanger hooks',
            'Storytelling frameworks for personal branding',
            'Counter-narrative & controversial angle generators',
            '30-Day automated content calendar planner'
        ],
        samples:[
            { label:'The Contrarian Hook', text:'Take this widely accepted industry belief: "[BELIEF]". Write a LinkedIn post arguing the exact opposite. Start with a short, punchy 1-sentence hook that shocks the reader. Follow with 3 bullet points proving why the common belief is actually holding people back. Conclude with your counter-framework. Keep formatting extremely spacious (1 sentence per line).' },
            { label:'Viral Thread Creator', text:'Create a 10-tweet Twitter thread about "[TOPIC]". Tweet 1 must be a hook combining a large number/metric and a specific timeline. Tweet 2 must establish credibility. Tweets 3-8 deliver actionable steps using bullet points. Tweet 9 summarizes. Tweet 10 is the CTA to follow and retweet. Use minimal emojis and a direct, authoritative tone.' }
        ],
        reviews_data:[
            { name:'Mark J.', rating:5, text:'Got 120k impressions on my first LinkedIn post using the contrarian framework.', date:'5 days ago' },
            { name:'Emily C.', rating:4, text:'Great prompts. Sometimes ChatGPT uses too many emojis, but the structures are perfect.', date:'2 weeks ago' }
        ],
        fbt:[1,6],
        link:'https://sanzyai.gumroad.com/l/social-media-content-pack'
    },
    {
        id:6, name:'Close More Deals: AI Freelancer Pack',
        image:'https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#142416,#1B4222)',
        price:2.49, origPrice:12, priceCategory:'1-5',
        platforms:['chatgpt','business','freelance'],
        count:45, category:'ChatGPT / Freelancing',
        rating:4.9, reviews:92, reviewCount:'92',
        badge:'💰 ROI Focused', badgeClass:'badge-gold',
        cardClass:'',
        desc:'Stop competing on price. 45 psychology-backed prompts for freelancers and agencies to write winning proposals, handle pricing objections, and close $5k-$10k retainers effortlessly.',
        included:[
            'The "Value-Based" project proposal writer',
            'Objection handling scripts ("You are too expensive")',
            'Discovery call question generators to expose pain points',
            'Upwork/Fiverr profile optimizer for premium clients',
            'Automated client onboarding & boundary setting emails'
        ],
        samples:[
            { label:'The Value-Based Proposal', text:'Write a project proposal for a [SERVICE] project. The client\'s stated problem is [PROBLEM]. Do not price by the hour. Price based on the value delivered. Structure: 1) Executive Summary confirming their pain, 2) The Proposed Solution, 3) 3-Tiered Pricing Matrix (Small, Medium, Premium), 4) Timeline, 5) Next Steps to sign. Tone: Confident elite expert.' },
            { label:'Price Objection Handler', text:'A client just replied to my proposal saying: "We love your work, but we found someone cheaper." Write a professional, unbothered response. Acknowledge their budget constraints, but pivot the conversation to the *cost of doing it wrong* and the specific ROI/reliability they get with me. End by asking if they want to adjust the scope to fit the budget, rather than lowering my rate.' }
        ],
        reviews_data:[
            { name:'Chris D.', rating:5, text:'The objection handler prompt literally saved a $6,000 contract for me yesterday. Best $11 I ever spent.', date:'1 week ago' },
            { name:'Sam T.', rating:5, text:'I completely rewrote my Upwork profile using this and got two Enterprise invites this week.', date:'2 weeks ago' }
        ],
        fbt:[1,4],
        link:'https://sanzyai.gumroad.com/l/freelance-high-ticket-closer'
    },
    {
        id:5, name:'Claude Vibe Coding Architect',
        image:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#131E17,#1A241F)',
        price:3.99, origPrice:19, priceCategory:'1-5',
        platforms:['claude','chatgpt','business'],
        count:85, category:'Claude / Coding',
        rating:4.9, reviews:212, reviewCount:'212',
        badge:'🧠 Vibe Coding', badgeClass:'badge-new',
        cardClass:'',
        desc:'Stop fighting with AI hallucinations and endless loops. 85 elite prompt architectures for cursor/claude users executing "Vibe Coding" to quickly build web apps, debug complex trace logs, and write rock-solid test coverage.',
        included:[
            'The "Context-Injection" app scaffold generator',
            'Root-cause analysis prompts for deep debugging',
            'React/Vue component generator with strict typing',
            'Database schema and ORM optimization prompts',
            'Automated unit testing generation framework'
        ],
        samples:[
            { label:'App Scaffold Generator', text:'Act as a Senior Staff Engineer. I want to build a [APP DESCRIPTION] using [TECH STACK]. Before writing any code, give me a complete file-tree architecture. For each core entity, define its schema and primary relationships. Ask me 3 clarifying questions about edge-cases before we begin implementation. Do not write any components yet.' },
            { label:'Root-Cause Analysis', text:'Act as an elite debugging architect. I am getting this error: [PASTE ERROR]. My current file is: [PASTE CODE]. Do not just give me a patch. First, explain the exact execution path that led to the crash. Second, identify any underlying architectural flaws. Third, provide the safest minimal patch to fix the issue without causing regressions elsewhere.' }
        ],
        reviews_data:[
            { name:'Jordan K.', rating:5, text:'These prompts completely changed how I use Cursor. No more wild hallucinations.', date:'2 days ago' },
            { name:'Sam M.', rating:5, text:'The debugging prompt alone is worth $100. Saves me hours of headache.', date:'1 week ago' }
        ],
        fbt:[1,2],
        link:'https://sanzyai.gumroad.com/l/claude-vibe-coding-architect'
    },
    {
        id:8, name:'YouTube Growth Engine Pack',
        image:'/youtube-pack.png',
        bgColor:'linear-gradient(135deg,#FF0000,#8B0000)',
        price:1.99, origPrice:20, priceCategory:'1-5',
        platforms:['chatgpt','social','video'],
        count:75, category:'ChatGPT / YouTube',
        rating:4.9, reviews:0, reviewCount:'New',
        badge:'🔥 Creator\'s Choice', badgeClass:'badge-orange',
        cardClass:'',
        desc:'The complete system to grow your YouTube channel with AI. 75 high-quality prompts for viral titles, hooks, scripts, SEO descriptions, and thumbnail design.',
        included:[
            'Viral video title & hook generator',
            'Script writer for any niche',
            'YouTube description SEO optimizer',
            'Thumbnail idea generator',
            'Community building engagement scripts'
        ],
        samples:[
            { 
                label:'Curiosity Gap Title Generator', 
                text:'You are a viral YouTube title expert. I will give you my video topic and you will generate 10 high-CTR YouTube titles using the curiosity gap formula.\n\nMy video topic: [TOPIC]\nMy target audience: [AUDIENCE]\nMy niche: [NICHE]\n\nRules:\n- Use numbers when possible\n- Create curiosity without clickbait\n- Keep titles under 60 characters\n- Use power words (Secret, Proven, Never, Finally, Warning)\n- Include the main keyword naturally\n\nOutput: 10 titles ranked from most clickable to least, with a brief reason why each works.' 
            },
            { 
                label:'Hook Script Generator (First 30 Seconds)', 
                text:'You are a YouTube hook specialist. Write a powerful 30-second hook script for my video.\n\nVideo Topic: [TOPIC]\nTarget Audience: [AUDIENCE]\nMain Pain Point I Solve: [PAIN POINT]\n\nCreate the hook using this structure:\n1. Pattern Interrupt (shocking statement or question) - 5 seconds\n2. Agitate the problem - 10 seconds  \n3. Promise the solution - 10 seconds\n4. Tease what\'s coming - 5 seconds\n\nMake it conversational, energetic, and impossible to skip. Output the full script with [PAUSE] and [EMPHASIS] markers.' 
            },
            { 
                label:'YouTube Shorts Script Writer', 
                text:'Write a punchy YouTube Shorts script (under 60 seconds).\n\nTopic: [TOPIC]\nKey Message: [ONE MAIN POINT]\nTarget Viewer: [AUDIENCE]\nDesired Action After Watching: [FOLLOW/SAVE/SHARE/VISIT]\n\nScript rules:\n- Hook in first 1-2 seconds (start mid-action or with shocking statement)\n- No long intros\n- One point only, explained clearly\n- End with a question or CTA to comment\n- Exactly 150-200 words\n\nWrite the complete script with [ON SCREEN TEXT] cues and [TRANSITION] markers. Also suggest the background music vibe.' 
            }
        ],
        reviews_data:[],
        fbt:[0,4],
        link:'https://sanzyai.gumroad.com/l/youtube-growth-engine-pack'
    }
];


function getPriceCategory(price) {
    if (price === 0) return 'free';
    if (price <= 5) return '1-5';
    if (price <= 15) return '5-15';
    if (price <= 30) return '15-30';
    return '30+';
}

function inferPromptProblem(label, text) {
    const hay = `${label} ${text}`.toLowerCase();
    if (hay.includes('email')) return 'Low reply rate due to unclear or weak messaging.';
    if (hay.includes('seo') || hay.includes('keyword')) return 'Content does not rank or attract qualified organic traffic.';
    if (hay.includes('proposal') || hay.includes('freelance')) return 'Losing deals because offer positioning and pricing are weak.';
    if (hay.includes('ad') || hay.includes('copy')) return 'Paid campaigns underperform due to weak angles and hooks.';
    if (hay.includes('youtube') || hay.includes('hook') || hay.includes('script')) return 'Viewers drop early because openings are not compelling enough.';
    if (hay.includes('image') || hay.includes('midjourney') || hay.includes('thumbnail')) return 'Inconsistent visual outputs and low creative conversion quality.';
    if (hay.includes('product')) return 'Product messaging fails to convert visitors into buyers.';
    return 'Unclear execution system causes inconsistent output quality and slower results.';
}

function inferPromptBestFor(pack) {
    const cat = String(pack.category || '').toLowerCase();
    if (cat.includes('freelanc')) return 'Freelancers, consultants, and service providers.';
    if (cat.includes('seo')) return 'SEO writers, affiliate publishers, and niche-site operators.';
    if (cat.includes('social')) return 'Creators, social media managers, and personal brands.';
    if (cat.includes('video')) return 'YouTubers, creators, and video marketers.';
    if (cat.includes('image') || cat.includes('art')) return 'Designers, ecommerce brands, and ad creatives.';
    if (cat.includes('coding') || cat.includes('claude')) return 'Developers, technical founders, and product teams.';
    if (cat.includes('business')) return 'Founders, marketers, and operators building revenue workflows.';
    return 'Creators and operators who need practical AI execution prompts.';
}

function enrichPromptSample(sample, pack) {
    const base = String(sample.text || '').trim();
    const alreadyStructured = /problem solved:|best for:|output format:/i.test(base);
    if (alreadyStructured) return sample;

    const problem = inferPromptProblem(sample.label || '', base);
    const bestFor = inferPromptBestFor(pack);

    return {
        ...sample,
        text: [
            `Problem solved: ${problem}`,
            `Best for: ${bestFor}`,
            'Use case: Run this prompt when you need practical output that can be deployed immediately.',
            'Prompt:',
            base,
            'Output format required:',
            '- Executive summary or strategy angle',
            '- Step-by-step execution plan',
            '- Final deliverable draft ready to use',
            '- Quality checklist and 3 optimization suggestions',
        ].join('\n')
    };
}

// Month-1 launch promo: all paid packs are 50% off.
packs.forEach((pack) => {
    if (pack.price > 0 && !pack.skipLaunchPromo) {
        pack.price = Number((pack.price * 0.5).toFixed(2));
        pack.priceCategory = getPriceCategory(pack.price);
    }

    pack.samples = (pack.samples || []).map((sample) => enrichPromptSample(sample, pack));
});

// =============================================
// STATE
// =============================================
let activePlatform = 'all';
let activePriceFilter = 'all';
let activeSort = 'popular';
let searchQuery = '';
let wishlist = new Set(window.getWishlist());
let filteredPacks = [...packs];
let activeModalEl = null;
let lastFocusedEl = null;
let jspdfLoaderPromise;

const FREE_PACK_TXT_PATH = '/free-starter-chatgpt-pack.txt';

function prefetchJspdf() {
    if (!jspdfLoaderPromise) {
        jspdfLoaderPromise = import('jspdf');
    }
    return jspdfLoaderPromise;
}

function parseFreePackText(content = '') {
    const lines = String(content).split(/\r?\n/);
    const prompts = [];
    let current = null;

    for (const line of lines) {
        const trimmed = line.trim();
        const titleMatch = trimmed.match(/^(\d+)\)\s+(.+)$/);

        if (titleMatch) {
            if (current) prompts.push(current);
            current = { title: titleMatch[2], body: '' };
            continue;
        }

        if (!current) continue;
        if (!trimmed) continue;
        if (trimmed.toLowerCase().startsWith('download source:')) continue;

        current.body = current.body ? `${current.body}\n${trimmed}` : trimmed;
    }

    if (current) prompts.push(current);
    return prompts;
}

function drawRoundedRect(doc, x, y, w, h, r, style = 'S') {
    doc.roundedRect(x, y, w, h, r, r, style);
}

async function downloadFreePackPdf() {
    showToast('Preparing your free prompt PDF...', '🎁');

    try {
        const [txtResponse, { jsPDF }] = await Promise.all([
            fetch(FREE_PACK_TXT_PATH, { cache: 'no-store' }),
            prefetchJspdf(),
        ]);

        if (!txtResponse.ok) {
            throw new Error('Could not load free starter pack content.');
        }

        const rawText = await txtResponse.text();
        const prompts = parseFreePackText(rawText);
        if (!prompts.length) {
            throw new Error('No prompts found in starter pack.');
        }

        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const marginX = 42;
        const contentWidth = pageWidth - marginX * 2;
        let y = 56;

        const addFooter = () => {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(99, 115, 129);
            doc.text('SanzyAI • Free Starter ChatGPT Pack', marginX, pageHeight - 24);
            doc.text(`${doc.getCurrentPageInfo().pageNumber}`, pageWidth - marginX, pageHeight - 24, { align: 'right' });
        };

        const ensureSpace = (neededHeight) => {
            if (y + neededHeight <= pageHeight - 56) return;
            addFooter();
            doc.addPage();
            y = 56;
        };

        // Cover / title block
        doc.setFillColor(20, 27, 45);
        drawRoundedRect(doc, marginX, y, contentWidth, 122, 16, 'F');
        doc.setFillColor(65, 124, 255);
        drawRoundedRect(doc, marginX + 18, y + 16, 172, 28, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('FREE DOWNLOAD', marginX + 28, y + 35);
        doc.setFontSize(24);
        doc.text('Starter ChatGPT Prompt Pack', marginX + 18, y + 72);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(214, 222, 255);
        doc.text('10 practical prompts designed for creators, marketers, and beginners.', marginX + 18, y + 96);
        y += 146;

        for (let i = 0; i < prompts.length; i += 1) {
            const p = prompts[i];
            const title = `${i + 1}. ${p.title}`;
            const bodyLines = doc.splitTextToSize(p.body, contentWidth - 30);
            const cardHeight = 52 + bodyLines.length * 15;

            ensureSpace(cardHeight + 12);

            doc.setFillColor(i % 2 === 0 ? 245 : 239, i % 2 === 0 ? 248 : 245, 255);
            doc.setDrawColor(213, 221, 255);
            drawRoundedRect(doc, marginX, y, contentWidth, cardHeight, 12, 'FD');

            doc.setFillColor(65, 124, 255);
            drawRoundedRect(doc, marginX + 12, y + 11, 24, 24, 8, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(255, 255, 255);
            doc.text(String(i + 1), marginX + 20, y + 28);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(20, 27, 45);
            doc.text(title, marginX + 44, y + 28);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10.5);
            doc.setTextColor(51, 65, 85);
            doc.text(bodyLines, marginX + 16, y + 50);

            y += cardHeight + 12;
        }

        ensureSpace(64);
        doc.setFillColor(235, 244, 255);
        drawRoundedRect(doc, marginX, y, contentWidth, 44, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(12, 74, 110);
        doc.text('Tip: Replace bracketed placeholders like [NICHE], [AUDIENCE], [TOPIC] with your real context.', marginX + 14, y + 27);

        addFooter();
        doc.save('sanzyai-free-starter-chatgpt-pack.pdf');
        showToast('Free starter pack downloaded as PDF', '📄');
    } catch (error) {
        showToast('Download failed. Please try again.', '⚠️');
    }
}

window.downloadFreePackPdf = downloadFreePackPdf;

function getModalFocusableElements(modalEl) {
    if (!modalEl) return [];
    return Array.from(modalEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter((el) => !el.hasAttribute('disabled'));
}

function openModalDialog(modalEl) {
    if (!modalEl) return;
    lastFocusedEl = document.activeElement;
    activeModalEl = modalEl;
    modalEl.classList.add('open');
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';

    const focusable = getModalFocusableElements(modalEl);
    if (focusable.length) {
        setTimeout(() => focusable[0].focus(), 0);
    }
}

function closeModalDialog(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    document.body.style.overflow = '';
    if (activeModalEl === modalEl) {
        activeModalEl = null;
    }

    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
    }
}

// =============================================
// RENDER PACKS
// =============================================
function renderPacks() {
    const grid = document.getElementById('promptGrid');

    if (filteredPacks.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div style="font-size:3rem;margin-bottom:16px;">🔍</div>
                <h3>No packs found</h3>
                <p>Try a different filter combination.</p>
                <button type="button" class="btn btn-primary" style="margin-top:16px;" data-action="reset-filters">Show All Packs</button>
            </div>`;
        document.getElementById('packCount').textContent = '0 packs found';
        return;
    }

    document.getElementById('packCount').textContent = `Showing ${filteredPacks.length} pack${filteredPacks.length !== 1 ? 's' : ''}`;

    grid.innerHTML = filteredPacks.map(pack => {
        const stars = renderStars(pack.rating);
        const isWished = wishlist.has(pack.id);
        const discount = pack.origPrice
            ? Math.round((1 - pack.price / pack.origPrice) * 100)
            : 0;

        return `
        <div class="prod-card ${pack.cardClass}" data-id="${pack.id}">
            <!-- Thumbnail -->
            <div class="prod-thumb" style="background:${pack.image ? `url('${pack.image}') center/cover` : pack.bgColor};">
                ${pack.emoji ? `<div class="prod-thumb-emoji">${pack.emoji}</div>` : ''}
                ${pack.badge ? `
                <div class="thumb-badge">
                    <span class="pack-badge ${pack.badgeClass}">${pack.badge}</span>
                </div>` : ''}

                <button class="wish-btn ${isWished ? 'active' : ''}"
                    type="button" data-action="toggle-wish" data-pack-id="${pack.id}" title="Save to wishlist">
                    ${isWished ? '❤️' : '🤍'}
                </button>

                <div class="prompt-count-badge">📦 ${pack.count} Prompts</div>
            </div>

            <!-- Body -->
            <div class="card-body">
                <div class="card-cat-row">
                    ${pack.platforms.slice(0,2).map((p,i) => `
                        <span class="cat-chip ${i===0?'ai-chip':''}">${getPlatformLabel(p)}</span>
                    `).join('')}
                </div>

                <div class="card-title">${pack.name}</div>

                <div class="card-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-num">${pack.rating}</span>
                    <span class="review-cnt">(${pack.reviewCount} reviews)</span>
                </div>

                <div class="card-price-row">
                    <span class="price-main ${pack.price === 0 ? 'free' : ''}">
                        ${pack.price === 0 ? 'FREE' : '$' + pack.price.toFixed(2)}
                    </span>
                    ${pack.origPrice ? `<span class="price-orig">$${pack.origPrice}</span>` : ''}
                    ${discount > 0 ? `<span class="price-save">${discount}% OFF</span>` : ''}
                </div>

                <!-- What's Included -->
                <div class="included-section">
                    <div class="included-title">What's Included</div>
                    <div class="included-list">
                        ${pack.included.slice(0,3).map(item => `
                            <div class="included-item">${item}</div>
                        `).join('')}
                        ${pack.included.length > 3 ? `
                            <div class="included-item" style="color:var(--primary-light);">+ ${pack.included.length - 3} more...</div>
                        ` : ''}
                    </div>
                </div>

                <!-- Actions -->
                <div class="card-actions">
                    <button type="button" class="preview-btn" data-action="open-preview" data-pack-id="${pack.id}">
                        👁️ Preview
                    </button>
                    ${pack.isFree
                        ? `<button type="button" class="buy-btn free-btn" data-action="download-free-pack">🎁 Get Free Pack</button>`
                        : `<a href="${pack.link}" target="_blank" rel="noopener sponsored" class="buy-btn">🛒 Buy Now — $${pack.price.toFixed(2)}</a>`
                    }
                </div>
            </div>
        </div>`;
    }).join('');
}

function getPlatformLabel(p) {
    const labels = {
        chatgpt:'🤖 ChatGPT', midjourney:'🎨 Midjourney',
        claude:'🧠 Claude', gemini:'✨ Gemini',
        'stable-diffusion':'🌊 SD', runway:'🎬 Runway',
        business:'💼 Business', seo:'📈 SEO',
        social:'📣 Social', art:'🖼️ Art',
        freelance:'💼 Freelance', video:'🎬 YouTube'
    };
    return labels[p] || p;
}

function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            html += `<span class="star-y">★</span>`;
        } else if (i - rating < 1 && i > Math.floor(rating)) {
            // Partial star using CSS clip
            const pct = Math.round((rating - Math.floor(rating)) * 100);
            html += `<span class="star-partial" style="--fill:${pct}%">★</span>`;
        } else {
            html += `<span class="star-e">★</span>`;
        }
    }
    return html;
}

// =============================================
// FILTERS
// =============================================
window.filterPlatform = function(btn, platform) {
    activePlatform = platform;
    document.querySelectorAll('[data-platform]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyAllFilters();
}

window.filterPrice = function(btn, range) {
    if (activePriceFilter === range) {
        activePriceFilter = 'all';
        document.querySelectorAll('[data-price]').forEach(b => {
            b.classList.remove('active','active-free','active-price');
        });
    } else {
        activePriceFilter = range;
        document.querySelectorAll('[data-price]').forEach(b => {
            b.classList.remove('active','active-free','active-price');
        });
        btn.classList.add(range === 'free' ? 'active-free' : 'active-price');
    }
    applyAllFilters();
}

function applyAllFilters() {
    filteredPacks = packs.filter(pack => {
        // Platform/category filter
        const matchPlatform = activePlatform === 'all' || pack.platforms.includes(activePlatform);

        // Price filter
        let matchPrice = true;
        if (activePriceFilter === 'free') matchPrice = pack.price === 0;
        else if (activePriceFilter === '1-5') matchPrice = pack.price >= 1 && pack.price <= 5;
        else if (activePriceFilter === '5-15') matchPrice = pack.price > 5 && pack.price <= 15;
        else if (activePriceFilter === '15-30') matchPrice = pack.price > 15 && pack.price <= 30;
        else if (activePriceFilter === '30+') matchPrice = pack.price > 30;

        const haystack = [
            pack.name,
            pack.category,
            pack.desc,
            ...(pack.included || []),
            ...(pack.platforms || [])
        ].join(' ').toLowerCase();
        const matchSearch = !searchQuery || haystack.includes(searchQuery);

        return matchPlatform && matchPrice && matchSearch;
    });
    sortPacksData();
    renderPacks();
}

window.sortPacks = function() {
    activeSort = document.getElementById('sortSel')?.value || 'popular';
    sortPacksData();
    renderPacks();
}

window.filterPlatformSelect = function() {
    activePlatform = document.getElementById('platformSel')?.value || 'all';
    applyAllFilters();
}

window.filterPriceSelect = function() {
    activePriceFilter = document.getElementById('priceSel')?.value || 'all';
    applyAllFilters();
}

window.filterSearchInput = function() {
    searchQuery = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
    applyAllFilters();
}

function sortPacksData() {
    filteredPacks.sort((a, b) => {
        switch(activeSort) {
            case 'popular': return b.reviews - a.reviews;
            case 'new': return b.id - a.id;
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'rating': return b.rating - a.rating;
            default: return b.reviews - a.reviews;
        }
    });
}

window.resetFilters = function() {
    activePlatform = 'all';
    activePriceFilter = 'all';
    searchQuery = '';
    const platformSel = document.getElementById('platformSel');
    const priceSel = document.getElementById('priceSel');
    const sortSel = document.getElementById('sortSel');
    const searchInput = document.getElementById('searchInput');

    if (platformSel) platformSel.value = 'all';
    if (priceSel) priceSel.value = 'all';
    if (sortSel) sortSel.value = 'popular';
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('[data-platform]').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('[data-platform="all"]');
    if (allBtn) allBtn.classList.add('active');
    document.querySelectorAll('[data-price]').forEach(b => {
        b.classList.remove('active','active-free','active-price');
    });
    filteredPacks = [...packs];
    sortPacksData();
    renderPacks();
}

// =============================================
// WISHLIST
// =============================================
window.toggleWish = function(id, btn) {
    const isAdded = window.toggleWishlistItem(id);
    if (isAdded) {
        wishlist.add(id);
        btn.textContent = '❤️';
        btn.classList.add('active');
    } else {
        wishlist.delete(id);
        btn.textContent = '🤍';
        btn.classList.remove('active');
    }
}

// Sync wishlist on global update
window.addEventListener('wishlistUpdated', (e) => {
    wishlist = new Set(e.detail);
    renderPacks();
});

// =============================================
// PRODUCT DETAIL MODAL
// =============================================
window.openProduct = function(id) {
    const pack = packs.find(p => p.id === id);
    if (!pack) return;

    const fbtPacks = pack.fbt.map(fid => packs.find(p => p.id === fid)).filter(Boolean);
    const modal = document.getElementById('modalContent');
    const discount = pack.origPrice ? Math.round((1-pack.price/pack.origPrice)*100) : 0;

    modal.innerHTML = `
        <div class="modal-header">
            <span class="modal-title">${pack.emoji ? pack.emoji + ' ' : ''}${pack.name}</span>
            <button type="button" class="modal-close" data-action="close-modal">✕</button>
        </div>

        <div class="modal-body">
            <div class="modal-left">
                <!-- Thumb -->
                <div class="modal-thumb" style="background:${pack.image ? `url('${pack.image}') center/cover` : pack.bgColor};">
                    ${pack.emoji ? `<span style="font-size:4rem; filter:drop-shadow(0 4px 12px rgba(0,0,0,0.5));">${pack.emoji}</span>` : ''}
                    <div style="position:absolute;bottom:10px;right:10px;background:#FFF;padding:6px 12px;border-radius:6px;font-family:var(--fh);font-size:0.76rem;font-weight:700;color:#1A1A24;box-shadow:0 4px 12px rgba(0,0,0,0.15);">📦 ${pack.count} Prompts Included</div>
                </div>

                <!-- Badges -->
                <div class="modal-badges">
                    ${pack.badge ? `<span class="pack-badge ${pack.badgeClass}">${pack.badge}</span>` : ''}
                    ${pack.platforms.map(p => `<span class="cat-chip ai-chip">${getPlatformLabel(p)}</span>`).join('')}
                </div>

                <!-- Description -->
                <p class="modal-desc">${pack.desc}</p>

                <!-- Full included list -->
                <div class="included-section" style="margin-bottom:16px;">
                    <div class="included-title">Everything Included (${pack.included.length} items)</div>
                    <div class="included-list">
                        ${pack.included.map(item => `<div class="included-item">${item}</div>`).join('')}
                    </div>
                </div>

                <!-- Free Samples -->
                <div class="samples-section">
                    <div class="samples-title">🔍 3 Free Sample Prompts <span style="font-size:0.75rem;color:var(--muted);font-weight:400;">(full pack has ${pack.count})</span></div>
                    ${pack.samples.map(s => `
                        <div class="sample-prompt">
                            <div class="sample-prompt-label">${s.label}</div>
                            <div class="sample-prompt-text">${s.text}</div>
                            <button type="button" class="sample-copy-btn" data-action="copy-prompt" data-prompt="${encodeURIComponent(s.text)}" title="Copy prompt">📋</button>
                        </div>
                    `).join('')}
                </div>

                <!-- Reviews -->
                <div class="reviews-title">⭐ Customer Reviews (${pack.reviews})</div>
                ${pack.reviews_data.map(r => `
                    <div class="review-item">
                        <div class="review-top">
                            <span class="reviewer-name">👤 ${r.name}</span>
                            <div style="display:flex;align-items:center;gap:4px;">
                                ${Array.from({length:5},(_,i)=>`<span style="color:${i<r.rating?'var(--yellow)':'var(--dim)'};">★</span>`).join('')}
                                <span style="font-size:0.74rem;color:var(--dim);margin-left:4px;">${r.date}</span>
                            </div>
                        </div>
                        <p class="review-text">${r.text}</p>
                    </div>
                `).join('')}
            </div>

            <div class="modal-right">
                <!-- Price Box -->
                <div class="modal-price-box">
                    <div class="mprice ${pack.price === 0 ? 'mfree' : ''}">
                        ${pack.price === 0 ? 'FREE' : `$${pack.price}`}
                        ${pack.origPrice ? `<span class="mprice-orig">$${pack.origPrice}</span>` : ''}
                        ${discount > 0 ? `<span class="price-save">${discount}% OFF</span>` : ''}
                    </div>
                    <p class="mprice-label">📦 ${pack.count} prompts · Instant PDF download · Lifetime access</p>

                    ${pack.isFree
                        ? `<button type="button" class="btn btn-green btn-lg modal-buy-btn" data-action="close-modal-download-free-pack">
                                🎁 Get FREE Pack Now
                           </button>`
                        : `<a href="${pack.link}" target="_blank" rel="noopener sponsored" class="btn btn-primary btn-lg modal-buy-btn">
                                🛒 Buy Now — $${pack.price}
                           </a>`
                    }

                    <button type="button" class="btn btn-outline modal-preview-btn" data-action="close-modal-open-preview" data-pack-id="${pack.id}">
                        👁️ Preview Free Sample Prompts
                    </button>

                    <div class="modal-perks">
                        <div class="modal-perk"><span class="modal-perk-icon">🔒</span> Secure payment via Stripe / PayPal</div>
                        <div class="modal-perk"><span class="modal-perk-icon">⚡</span> Instant download after purchase</div>
                        <div class="modal-perk"><span class="modal-perk-icon">💯</span> Premium quality checked by experts</div>
                        <div class="modal-perk"><span class="modal-perk-icon">🔄</span> Free lifetime updates included</div>
                        <div class="modal-perk"><span class="modal-perk-icon">📧</span> Customer support via email</div>
                    </div>
                </div>

                <!-- Trust badges -->
                <div class="modal-trust">
                    <div class="trust-chip">🔒 Secure SSL</div>
                    <div class="trust-chip">⚡ Instant Download</div>
                    <div class="trust-chip">💯 Verified Quality</div>
                    <div class="trust-chip">⭐ ${pack.rating}/5 Rated</div>
                </div>
            </div>
        </div>

        <!-- Frequently Bought Together -->
        ${fbtPacks.length > 0 ? `
        <div class="fbt-section">
            <div class="fbt-title">🛒 Frequently Bought Together</div>
            <div class="fbt-row">
                <div class="fbt-item" data-action="fbt-open-product" data-pack-id="${pack.id}" role="button" tabindex="0">
                    <span class="fbt-emoji">${pack.emoji}</span>
                    <div class="fbt-info">
                        <div class="fbt-name">${pack.name.substring(0,28)}...</div>
                        <div class="fbt-price">${pack.price === 0 ? 'FREE' : '$'+pack.price}</div>
                    </div>
                </div>
                <span class="fbt-plus">+</span>
                ${fbtPacks.map(fp => `
                    <div class="fbt-item" data-action="fbt-open-product" data-pack-id="${fp.id}" data-delay="200" role="button" tabindex="0">
                        <span class="fbt-emoji">${fp.emoji}</span>
                        <div class="fbt-info">
                            <div class="fbt-name">${fp.name.substring(0,28)}...</div>
                            <div class="fbt-price">${fp.price === 0 ? 'FREE' : '$'+fp.price}</div>
                        </div>
                    </div>
                `).join('<span class="fbt-plus">+</span>')}
                <div style="flex-shrink:0;">
                    <div style="font-size:0.8rem;color:var(--muted);margin-bottom:6px;">Bundle price:</div>
                    <div style="font-family:var(--fh);font-weight:700;font-size:1.2rem;color:var(--accent);">
                        $${pack.price + fbtPacks.reduce((s,fp)=>s+fp.price,0)}
                    </div>
                </div>
            </div>
        </div>` : ''}
    `;

    openModalDialog(document.getElementById('prodModal'));
}

window.closeModal = function() {
    closeModalDialog(document.getElementById('prodModal'));
}

// =============================================
// PREVIEW MODAL
// =============================================
window.openPreview = function(id) {
    const pack = packs.find(p => p.id === id);
    if (!pack) return;

    document.getElementById('previewTitle').textContent = `👁️ Preview: ${pack.name}`;
    document.getElementById('previewBody').innerHTML = `
        <div class="preview-note">
            ⭐ <span><strong>2 free sample prompts</strong> shown. Full pack includes <strong>${pack.count} prompts</strong>. All prompts are editable and work with ChatGPT, Claude, and Gemini.</span>
        </div>
        ${pack.samples.slice(0,2).map((s,i) => `
            <div class="sample-prompt">
                <div class="sample-prompt-label">Sample ${i+1}: ${s.label}</div>
                <div class="sample-prompt-text">${s.text}</div>
                <button type="button" class="sample-copy-btn" data-action="copy-prompt" data-prompt="${encodeURIComponent(s.text)}" title="Copy">📋</button>
            </div>
        `).join('')}
        <div style="text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid var(--border-s);">
            <p style="color:var(--muted);font-size:0.86rem;margin-bottom:16px;">Want all <strong>${pack.count} prompts</strong>? Get the full pack now.</p>
            ${pack.isFree
                ? `<button type="button" class="btn btn-green btn-lg" data-action="close-preview-download-free-pack">🎁 Get FREE Pack</button>`
                : `<a href="${pack.link}" target="_blank" rel="noopener"
                       class="btn btn-primary btn-lg"
                       data-action="open-checkout">
                       🛒 Buy Full Pack — $${pack.price}
                   </a>`
            }
        </div>`;

    openModalDialog(document.getElementById('previewModal'));
}

window.closePreview = function() {
    closeModalDialog(document.getElementById('previewModal'));
}

// =============================================
// COPY PROMPT
// =============================================
window.copyPrompt = function(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Prompt copied to clipboard!','📋');
        const orig = btn.innerHTML;
        btn.innerHTML = '✅';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }).catch(() => {
        showToast('Copy manually from the text box','📋');
    });
}

// =============================================
// EMAIL MODAL (Free Pack)
// =============================================
window.openEmailModal = function() {
    openModalDialog(document.getElementById('emailModal'));
}

window.closeEmailModal = function() {
    closeModalDialog(document.getElementById('emailModal'));
}

window.handleFreeDownload = async function(e) {
    e.preventDefault();
    await window.downloadFreePackPdf();
    window.closeEmailModal();
    const form = e.target;
    form.reset();
}

// =============================================
// SELL APPLY
// =============================================
window.handleSellApply = function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✅ Application Submitted!';
    btn.style.background = '#00C851';
    btn.style.pointerEvents = 'none';
    showToast('Application submitted! We\'ll review it within 48 hours.','🚀');
    setTimeout(() => {
        form.reset();
        btn.textContent = '🚀 Submit Application';
        btn.style.background = '';
        btn.style.pointerEvents = '';
    }, 4000);
}

// =============================================
// HAMBURGER
// =============================================
const ham = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileMenu');
if (ham && mobileNav) {
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
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('vis', window.scrollY > 400);
    });
}

// =============================================
// CLOSE MODALS ON OVERLAY CLICK
// =============================================
document.getElementById('prodModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});
document.getElementById('emailModal').addEventListener('click', function(e) {
    if (e.target === this) closeEmailModal();
});
document.getElementById('previewModal').addEventListener('click', function(e) {
    if (e.target === this) closePreview();
});

// Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Tab' && activeModalEl) {
        const focusable = getModalFocusableElements(activeModalEl);
        if (focusable.length) {
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
        }
    }

    if (e.key === 'Escape') {
        closeModal();
        closePreview();
        closeEmailModal();
    }
});

// =============================================
// TOAST
// =============================================
let toastT;
function showToast(msg, icon='✅') {
    clearTimeout(toastT);
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    document.getElementById('toastIcon').textContent = icon;
    t.classList.add('show');
    toastT = setTimeout(() => t.classList.remove('show'), 3200);
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput')?.addEventListener('input', () => window.filterSearchInput());
    document.getElementById('platformSel')?.addEventListener('change', () => window.filterPlatformSelect());
    document.getElementById('priceSel')?.addEventListener('change', () => window.filterPriceSelect());
    document.getElementById('sortSel')?.addEventListener('change', () => window.sortPacks());
    document.getElementById('emailModalCloseBtn')?.addEventListener('click', () => window.closeEmailModal());
    document.getElementById('previewCloseBtn')?.addEventListener('click', () => window.closePreview());
    document.getElementById('freeDownloadForm')?.addEventListener('submit', (event) => window.handleFreeDownload(event));

    sortPacksData();
    renderPacks();

    document.addEventListener('click', (event) => {
        const actionEl = event.target.closest('[data-action]');
        if (!actionEl) return;

        const action = actionEl.dataset.action;
        const packIdAttr = actionEl.dataset.packId;
        const packId = (packIdAttr !== undefined && packIdAttr !== null) ? Number(packIdAttr) : null;

        switch (action) {
            case 'reset-filters':
                window.resetFilters();
                break;
            case 'toggle-wish':
                if (packId !== null) window.toggleWish(packId, actionEl);
                break;
            case 'open-preview':
                if (packId !== null) window.openPreview(packId);
                break;
            case 'open-email-modal':
                window.downloadFreePackPdf();
                break;
            case 'download-free-pack':
                window.downloadFreePackPdf();
                break;
            case 'open-product':
                if (packId) window.openProduct(packId);
                break;
            case 'close-modal':
                window.closeModal();
                break;
            case 'close-modal-open-email':
                window.closeModal();
                window.downloadFreePackPdf();
                break;
            case 'close-modal-download-free-pack':
                window.closeModal();
                window.downloadFreePackPdf();
                break;
            case 'close-modal-open-preview':
                window.closeModal();
                if (packId) window.openPreview(packId);
                break;
            case 'close-preview-open-email':
                window.closePreview();
                window.downloadFreePackPdf();
                break;
            case 'close-preview-download-free-pack':
                window.closePreview();
                window.downloadFreePackPdf();
                break;
            case 'open-secure-checkout':
                showToast('Opening secure checkout...', '🔒');
                break;
            case 'open-checkout':
                showToast('Opening checkout...', '🔒');
                break;
            case 'copy-prompt': {
                const prompt = decodeURIComponent(actionEl.dataset.prompt || '');
                if (prompt) window.copyPrompt(prompt, actionEl);
                break;
            }
            case 'fbt-open-product': {
                if (!packId) break;
                window.closeModal();
                const delay = Number(actionEl.dataset.delay || '0');
                if (delay > 0) {
                    setTimeout(() => window.openProduct(packId), delay);
                } else {
                    window.openProduct(packId);
                }
                break;
            }
            default:
                break;
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const el = event.target.closest('[data-action="fbt-open-product"]');
        if (!el || event.target !== el) return;
        event.preventDefault();
        el.click();
    });



    // =============================================
    // UPSELL AFTER FREE DOWNLOAD
    // =============================================
    const origDownload = window.downloadFreePackPdf;
    window.downloadFreePackPdf = async function() {
        await origDownload();
        // Show upsell after 2 seconds
        setTimeout(() => {
            const bestSeller = packs.find(p => p.id === 1);
            if (!bestSeller) return;
            showToast(`Loved the free pack? Get ${bestSeller.name} for just $${bestSeller.price}!`, '⭐');
        }, 2000);
    };

    // =============================================
    // HASH HANDLER — scroll to free pack
    // =============================================
    if (window.location.hash === '#free') {
        activePriceFilter = 'free';
        const priceSel = document.getElementById('priceSel');
        if (priceSel) priceSel.value = 'free';
        applyAllFilters();
        setTimeout(() => {
            const freeCard = document.querySelector('.free-card');
            if (freeCard) freeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
});
