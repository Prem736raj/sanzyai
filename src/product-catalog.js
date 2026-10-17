import { productSummaries } from './catalog-summary.js';

const catalog = [
    { id: 0, name: "All-access bundle under quality review", count: 20, price: 0, samples: [], platforms: [], included: [], fbt: [], link: null },
    {
        id:1, name:'ChatGPT for Solo-Founders',
        image:'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#101820,#1A2A3A)',
        price:2.99,  priceCategory:'1-5',
        platforms:['chatgpt','business'],
        count:150, category:'ChatGPT / Business',
        rating:0, reviews:0, reviewCount:"",
        badge:'Business Bestseller', badgeClass:'badge-trending',
        cardClass:'',
        desc:'Stop working *in* your business and start working *on* it. 150 elite ChatGPT prompts designed specifically for Solo-Founders and bootstrappers to automate marketing, sales, and operations.',
        included:[
            'A concise cold email template to customize and test',
            'One-click business plan & financial projector',
            'Automated customer support response macros',
            'SaaS pricing model & tiered offering calculators',
            'Investor pitch deck outline generator'
        ],
        samples:[
            { label:'Cold Email Writer', text:'Write a highly personalized cold email to [PROSPECT NAME] at [COMPANY]. Make it under 150 words. The hook must reference their recent achievement: [ACHIEVEMENT]. Do not talk about my company until the 3rd sentence. Focus on their pain point: [PAIN POINT]. End with a low-friction 15-minute call CTA.' },
            { label:'Pricing Strategy Matrix', text:'Act as a SaaS pricing expert. My product does [FUNCTION] for [AUDIENCE]. Suggest 3 pricing tiers (Basic, Pro, Enterprise). For each tier, give me: The monthly price, 3 anchor features, psychological pricing justification, and the exact naming convention to use to drive users to the middle tier.' }
        ],
        reviews_data:[],
        fbt:[7,4],
        link:'https://sanzyai.gumroad.com/l/solo-founder-chatgpt-pack'
    },
    {
        id:2, name:'Midjourney E-Commerce Seller Pack',
        image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#231515,#421A1A)',
        price:3.49,  priceCategory:'1-5',
        platforms:['midjourney','art','business'],
        count:100, category:'Midjourney / E-commerce',
        rating:0, reviews:0, reviewCount:"",
        badge:'High-Converting', badgeClass:'badge-hot',
        cardClass:'',
        desc:'Never pay for expensive professional photography or 3D mockups again. 100 copy-paste Midjourney prompts that generate photorealistic lifestyle shots, pure white backgrounds, and infographic assets for physical products.',
        included:[
            'Pure white background (review listing requirements) product prompts',
            'High-end lifestyle setting & environmental prompts',
            'Photorealistic shadow and ray-tracing adjustments',
            'Packaging mockup generators (Boxes, Bottles, Tubes)',
            'Infographic element generators'
        ],
        samples:[
            { label:'Lifestyle Product Shot', text:'Commercial photography of a [PRODUCT TYPE] sitting on a marble countertop in a modern, sunlit kitchen. Depth of field, blurred background, morning sunlight streaming through a window, highly detailed, photorealistic, shot on Sony A7R IV, 85mm lens, f/1.8 --ar 16:9 --style raw --v 6' },
            { label:'Amazon Pure White', text:'Studio photography of a [PRODUCT TYPE], pure white background rgb(255,255,255), bright even studio lighting, soft shadows, front angle, clear branding, sharp edges, 8k resolution, commercial product photography --ar 1:1 --v 6' }
        ],
        reviews_data:[],
        fbt:[1,3],
        link:'https://sanzyai.gumroad.com/l/midjourney-ecommerce-pack'
    },
    {
        id:3, name:'SEO Content Writer Pack',
        image:'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#1E2E1E,#1B6B35)',
        price:1.99,  priceCategory:'1-5',
        platforms:['chatgpt','seo'],
        count:50, category:'ChatGPT / SEO',
        rating:0, reviews:0, reviewCount:"",
        badge:'Traffic Driver', badgeClass:'badge-new',
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
        reviews_data:[],
        fbt:[4,1],
        link:'https://sanzyai.gumroad.com/l/seo-content-writer-pack'
    },
    {
        id:4, name:'Go Viral: Social Media AI Pack',
        image:'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#1A2436,#1D3A5F)',
        price:1.99,  priceCategory:'1-5',
        platforms:['chatgpt','social'],
        count:65, category:'ChatGPT / Social Media',
        rating:0, reviews:0, reviewCount:"",
        badge:'High Engagement', badgeClass:'badge-money',
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
        reviews_data:[],
        fbt:[1,6],
        link:'https://sanzyai.gumroad.com/l/social-media-content-pack'
    },
    {
        id:6, name:'Close More Deals: AI Freelancer Pack',
        image:'https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#142416,#1B4222)',
        price:2.49,  priceCategory:'1-5',
        platforms:['chatgpt','business','freelance'],
        count:45, category:'ChatGPT / Freelancing',
        rating:0, reviews:0, reviewCount:"",
        badge:'ROI Focused', badgeClass:'badge-gold',
        cardClass:'',
        desc:'Stop competing on price. 45 psychology-backed prompts for freelancers and agencies to write winning proposals, handle pricing objections, and prepare clearer proposals and client conversations.',
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
        reviews_data:[],
        fbt:[1,4],
        link:'https://sanzyai.gumroad.com/l/freelance-high-ticket-closer'
    },
    {
        id:5, name:'Claude Vibe Coding Architect',
        image:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        bgColor:'linear-gradient(135deg,#131E17,#1A241F)',
        price:3.99,  priceCategory:'1-5',
        platforms:['claude','chatgpt','business'],
        count:85, category:'Claude / Coding',
        rating:0, reviews:0, reviewCount:"",
        badge:'Developer Architecture', badgeClass:'badge-new',
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
        reviews_data:[],
        fbt:[1,2],
        link:'https://sanzyai.gumroad.com/l/claude-vibe-coding-architect'
    },
    {
        id:8, name:'YouTube Growth Engine Pack',
        image:'/youtube-pack.png',
        bgColor:'linear-gradient(135deg,#FF0000,#8B0000)',
        price:1.99,  priceCategory:'1-5',
        platforms:['chatgpt','social','video'],
        count:75, category:'ChatGPT / YouTube',
        rating:0, reviews:0, reviewCount:"",
        badge:'Creator\'s Choice', badgeClass:'badge-orange',
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
const summaryById = new Map(productSummaries.map(product => [product.id, product]));
export const products = catalog.map(product => ({
    ...product, ...summaryById.get(product.id),
    badge: 'Draft · quality review', badgeClass: 'badge-new', cardClass: '',
    link: summaryById.get(product.id)?.status === 'available' ? product.link : null,
    rating: 0, reviews: 0, reviews_data: [],
}));
export const availableProducts = products.filter(product => product.status === 'available');
export const previewProducts = products.filter(product => product.id !== 0);
