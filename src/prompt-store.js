// =============================================
// PROMPT PACKS DATA
// =============================================
const packs = [
    {
        id:1, name:'Ultimate Business ChatGPT Pack',
        emoji:'✨', bgColor:'linear-gradient(135deg,#1E1E2E,#2D1B6B)',
        price:9.5, origPrice:35, priceCategory:'5-15',
        platforms:['chatgpt','business'],
        count:50, category:'ChatGPT / Business',
        rating:4.9, reviews:127, reviewCount:'127',
        badge:'🔥 Bestseller', badgeClass:'badge-gold',
        cardClass:'bestseller',
        desc:'The ultimate collection of 50 battle-tested ChatGPT prompts for entrepreneurs, founders and business professionals. From business planning to customer service — everything you need to run a smarter business with AI.',
        included:['Business plan generator prompts','Professional email writing templates','High-converting marketing copy','Sales scripts & objection handlers','Customer service response prompts'],
        samples:[
            { label:'Business Plan Generator', text:'Create a comprehensive business plan for [BUSINESS TYPE] targeting [TARGET AUDIENCE] in [LOCATION]. Include: executive summary, market analysis, competitive landscape, revenue model, marketing strategy, and 12-month financial projections. Format as a professional document.' },
            { label:'Cold Email Writer', text:'Write a personalized cold email to [PROSPECT NAME] at [COMPANY] about [VALUE PROPOSITION]. Make it under 150 words, include a compelling subject line, focus on their pain point [PAIN POINT], and end with a soft CTA for a 15-minute call.' },
            { label:'Marketing Copy Generator', text:'Write 5 variations of ad copy for [PRODUCT/SERVICE] targeting [AUDIENCE]. Each variation should use a different psychological trigger: urgency, social proof, curiosity, fear of missing out, and authority. Keep each under 100 words.' }
        ],
        reviews_data:[
            { name:'Sarah M.', rating:5, text:'These prompts saved me 20+ hours a week. The business plan generator is incredible!', date:'2 weeks ago' },
            { name:'James K.', rating:5, text:'Worth every penny. My email response rates went up by 40% using the email prompts.', date:'1 month ago' },
            { name:'Priya R.', rating:4, text:'Really comprehensive pack. Could use a few more niche-specific prompts but overall excellent.', date:'3 weeks ago' }
        ],
        fbt:[2,3],
        link:'https://gumroad.com/sanzyai'
    },
    {
        id:2, name:'Midjourney Art Masterpack',
        emoji:'🎨', bgColor:'linear-gradient(135deg,#1E1E2E,#2D1B4B)',
        price:12, origPrice:45, priceCategory:'5-15',
        platforms:['midjourney','art','stable-diffusion'],
        count:100, category:'Midjourney / Art',
        rating:4.8, reviews:89, reviewCount:'89',
        badge:'⭐ Most Popular', badgeClass:'badge-gold',
        cardClass:'',
        desc:'100 professionally crafted Midjourney prompts covering every art style, mood and subject. Create stunning AI art that stands out — from photorealistic portraits to fantasy landscapes and commercial product shots.',
        included:['Photorealistic portrait prompts','Epic landscape & scenery prompts','Logo & brand design prompts','Product photography prompts','Fantasy & concept art prompts'],
        samples:[
            { label:'Cinematic Portrait', text:'Portrait of a [ETHNICITY] [GENDER] in their 30s, golden hour lighting, shallow depth of field, shot on Hasselblad 500C, f/2.8, 85mm lens, editorial fashion photography, Vogue magazine style, ultra sharp, 8K --ar 2:3 --v 6 --style raw' },
            { label:'Epic Fantasy Landscape', text:'Breathtaking aerial view of a floating crystal palace above the clouds, bioluminescent waterfalls, twin moons rising, painted by Thomas Kinkade meets Greg Rutkowski, dramatic volumetric lighting, ultra detailed, 8K UHD --ar 16:9 --v 6 --q 2' },
            { label:'Minimal Logo Design', text:'Minimalist logo for a tech startup called "[COMPANY NAME]", geometric design, purple and cyan gradient, white background, vector style, clean lines, modern typography, professional, scalable design --ar 1:1 --v 6 --style raw --no text blur' }
        ],
        reviews_data:[
            { name:'Alex T.', rating:5, text:'My Etsy AI art store doubled in revenue after using these prompts!', date:'1 week ago' },
            { name:'Maria S.', rating:5, text:'The portrait prompts alone are worth $24. Absolute gold.', date:'2 weeks ago' },
            { name:'Tom B.', rating:4, text:'Great variety. Some prompts work better in v5 but overall amazing pack.', date:'1 month ago' }
        ],
        fbt:[1,5],
        link:'https://gumroad.com/sanzyai'
    },
    {
        id:3, name:'SEO Content Writer Pack',
        emoji:'📝', bgColor:'linear-gradient(135deg,#1E2E1E,#1B6B35)',
        price:7.5, origPrice:25, priceCategory:'5-15',
        platforms:['chatgpt','seo'],
        count:30, category:'ChatGPT / SEO',
        rating:4.7, reviews:64, reviewCount:'64',
        badge:'🌶️ Hot', badgeClass:'badge-hot',
        cardClass:'',
        desc:'30 powerful SEO-focused ChatGPT prompts that help you rank on Google. Create blog posts, optimize meta tags, craft compelling titles and perform competitor keyword analysis — all with AI.',
        included:['Full blog post writer (2000+ words)','Meta description optimizer','SEO title tag generator','Content outline creator','Keyword research & clustering prompts'],
        samples:[
            { label:'SEO Blog Post Writer', text:'Write a comprehensive, SEO-optimized blog post about "[TOPIC]" targeting the keyword "[PRIMARY KEYWORD]". The post should be 1500+ words, include an engaging intro, 5-7 H2 headers with H3 subheadings, naturally incorporate the keyword every 200 words, include a FAQ section, and end with a strong CTA. Tone: [TONE].' },
            { label:'Meta Description Writer', text:'Write 5 compelling meta descriptions for a page about "[PAGE TOPIC]" targeting keyword "[KEYWORD]". Each should be under 160 characters, include the keyword naturally, communicate clear value, and have a subtle CTA. Rank them by estimated CTR.' },
            { label:'Content Outline Creator', text:'Create a detailed content outline for an ultimate guide about "[TOPIC]". Include: title, intro hook, 8-10 main sections with H2s, 3-4 H3 subsections each, estimated word count per section, internal link opportunities, and suggested images/infographics. Target keyword: "[KEYWORD]".' }
        ],
        reviews_data:[
            { name:'David L.', rating:5, text:'My articles now rank on page 1 consistently. These prompts are gold!', date:'3 weeks ago' },
            { name:'Nina K.', rating:4, text:'Really solid SEO prompts. The blog writer prompt is my daily go-to.', date:'1 month ago' }
        ],
        fbt:[1,4],
        link:'https://gumroad.com/sanzyai'
    },
    {
        id:4, name:'Social Media Content Pack',
        emoji:'📲', bgColor:'linear-gradient(135deg,#2E1E1E,#6B1B5A)',
        price:6, origPrice:20, priceCategory:'5-15',
        platforms:['chatgpt','social'],
        count:40, category:'ChatGPT / Social Media',
        rating:4.8, reviews:201, reviewCount:'201',
        badge:'📈 Trending', badgeClass:'badge-trending',
        cardClass:'',
        desc:'40 viral-ready social media prompts for Instagram, Twitter/X, LinkedIn, TikTok and Facebook. Create engaging captions, hooks, carousels and content calendars that grow your following.',
        included:['Instagram caption writer (all niches)','Viral Twitter/X thread creator','LinkedIn thought leadership posts','TikTok hook & script generator','30-day content calendar creator'],
        samples:[
            { label:'Viral Instagram Caption', text:'Write 5 Instagram caption options for a photo of [DESCRIBE PHOTO] for a [NICHE] account with [FOLLOWER COUNT] followers. Include: an attention-grabbing first line, storytelling middle, emotional connection, 3-5 relevant hashtags, and a question CTA. Tone: [CASUAL/PROFESSIONAL/INSPIRATIONAL].' },
            { label:'Twitter Thread Creator', text:'Create a viral Twitter/X thread about "[TOPIC]" with 10-15 tweets. Start with a bold hook tweet that creates curiosity, include data/statistics, use short punchy sentences, add a relatable analogy, include practical tips, and end with a strong CTA to follow. Format each tweet with a number and emoji.' },
            { label:'LinkedIn Post Writer', text:'Write a thought-leadership LinkedIn post about "[PROFESSIONAL TOPIC]" for someone who works in [INDUSTRY]. Include a bold opening hook, personal story/observation, 3 key insights with bullet points, and a question to drive comments. Aim for 200-300 words. Professional but conversational tone.' }
        ],
        reviews_data:[
            { name:'Emma R.', rating:5, text:'Grew my Instagram from 500 to 8k followers in 2 months using these prompts!', date:'1 week ago' },
            { name:'Carlos M.', rating:5, text:'The LinkedIn post prompt got me 50K impressions on my first try!', date:'2 weeks ago' },
            { name:'Lisa P.', rating:4, text:'Great variety across all platforms. The content calendar prompt is amazing.', date:'1 month ago' }
        ],
        fbt:[1,3],
        link:'https://gumroad.com/sanzyai'
    },
    {
        id:5, name:'YouTube Script Writing Pack',
        emoji:'🎬', bgColor:'linear-gradient(135deg,#2E1E1E,#6B1B1B)',
        price:8.5, origPrice:29, priceCategory:'5-15',
        platforms:['chatgpt','business'],
        count:25, category:'ChatGPT / Video',
        rating:4.9, reviews:45, reviewCount:'45',
        badge:'✨ New', badgeClass:'badge-new',
        cardClass:'',
        desc:'25 YouTube-optimized script writing prompts that help you create engaging videos from hook to CTA. Write scripts for tutorials, vlogs, educational videos and shorts that keep viewers watching.',
        included:['Full YouTube video script writer','Hook & intro writer (first 30 secs)','YouTube Shorts script creator','Video title & thumbnail optimizer','End screen & CTA script templates'],
        samples:[
            { label:'Full Video Script Writer', text:'Write a complete YouTube script for a [LENGTH]-minute video about "[TOPIC]" targeting [AUDIENCE]. Include: a pattern-interrupt hook (first 30 seconds), problem setup, promise of value, 3-5 main content sections with smooth transitions, b-roll suggestions in [brackets], natural speech patterns, and a strong CTA. Channel tone: [TONE].' },
            { label:'Viral Video Hook Creator', text:'Generate 10 different video hook options for a YouTube video about "[TOPIC]". Each hook should be under 15 seconds when read aloud, use a different psychological trigger (curiosity gap, controversy, shocking stat, relatable problem, bold claim, etc.), and start with an action or question to prevent the skip. Rate each by virality potential 1-10.' },
            { label:'YouTube Shorts Script', text:'Write 5 YouTube Shorts scripts (under 60 seconds each) about "[TOPIC]" for [NICHE] creators. Each should have: an immediate hook in the first 2 seconds, fast-paced delivery, a pattern interrupt at 15 seconds, value delivery, and a CTA. Format with visual cues and speaking pace notes.' }
        ],
        reviews_data:[
            { name:'Ryan T.', rating:5, text:'My watch time went from 35% to 68% after using the hook prompts!', date:'5 days ago' },
            { name:'Sophie L.', rating:5, text:'Worth every cent. The full script writer is incredibly detailed.', date:'2 weeks ago' }
        ],
        fbt:[4,1],
        link:'https://gumroad.com/sanzyai'
    },
    {
        id:6, name:'Freelancer Income Pack',
        emoji:'💵', bgColor:'linear-gradient(135deg,#1E2E1A,#2B5A1B)',
        price:11, origPrice:39, priceCategory:'5-15',
        platforms:['chatgpt','business','freelance'],
        count:60, category:'ChatGPT / Freelancing',
        rating:4.7, reviews:33, reviewCount:'33',
        badge:'🏆 Top Earner', badgeClass:'badge-money',
        cardClass:'',
        desc:'60 income-generating prompts for freelancers, consultants and solopreneurs. Win more clients, write better proposals, set premium prices and automate your freelance business with AI.',
        included:['Winning project proposal writer','Client outreach & pitch emails','Freelance contract clause generator','Upwork & Fiverr profile optimizer','Rate negotiation scripts & tactics'],
        samples:[
            { label:'Winning Project Proposal', text:'Write a professional project proposal for a [PROJECT TYPE] worth $[BUDGET] to [CLIENT TYPE]. Include: executive summary with clear understanding of their needs, proposed solution & methodology, timeline with milestones, team/skills overview, relevant case study, pricing breakdown with ROI justification, and next steps. Make it persuasive without being salesy.' },
            { label:'Client Outreach Email', text:'Write a cold outreach email to potential [CLIENT TYPE] clients for my [SERVICE] freelance business. I help clients achieve [RESULT] using [METHOD]. The email should: feel personalized and researched, reference a specific pain point of their industry, briefly show my credibility, and propose a no-risk first step. Keep under 200 words.' },
            { label:'Rate Negotiation Script', text:'Help me negotiate my freelance rate from $[CURRENT RATE] to $[DESIRED RATE] with a client who says "your rate is too high." Give me: the exact words to say, 3 ways to justify my rate using value not hours, how to handle "we have a smaller budget," and when to walk away. Role play the conversation with objections and responses.' }
        ],
        reviews_data:[
            { name:'Mike D.', rating:5, text:'Landed a $8,000 project using the proposal prompt on my first try!', date:'2 weeks ago' },
            { name:'Anita B.', rating:4, text:'The rate negotiation script alone is worth $22. Raised my rates by 40%.', date:'1 month ago' }
        ],
        fbt:[1,3],
        link:'https://gumroad.com/sanzyai'
    },
    {
        id:7, name:'E-commerce Product Pack',
        emoji:'🛍️', bgColor:'linear-gradient(135deg,#1E1E2E,#1B4B6B)',
        price:7, origPrice:24, priceCategory:'5-15',
        platforms:['chatgpt','business'],
        count:35, category:'ChatGPT / E-commerce',
        rating:4.6, reviews:78, reviewCount:'78',
        badge:'📦 Value Pack', badgeClass:'badge-trending',
        cardClass:'',
        desc:'35 e-commerce focused prompts that help you write killer product descriptions, optimize your store and create high-converting ad copy. Perfect for Shopify, Amazon and Etsy sellers.',
        included:['High-converting product descriptions','Amazon listing optimizer','Facebook & Instagram ad copy','Customer review response templates','Abandoned cart email sequences'],
        samples:[
            { label:'Product Description Writer', text:'Write a high-converting product description for [PRODUCT NAME] priced at $[PRICE]. Target customer: [DESCRIBE IDEAL BUYER]. Include: an emotional hook, key features as benefits, sensory language, social proof element, scarcity/urgency if applicable, and a CTA. Write versions for: website PDP (300 words), Amazon listing (500 words), and Instagram caption (100 words).' },
            { label:'Amazon Listing Optimizer', text:'Create an optimized Amazon listing for [PRODUCT] in the [CATEGORY] category. Include: keyword-rich title (under 200 chars), 5 bullet points highlighting key benefits, compelling product description (1000 words), backend search terms, and A+ content outline. Primary keyword: [KEYWORD]. Competitor to beat: [ASIN/PRODUCT NAME].' },
            { label:'Abandoned Cart Email', text:'Write a 3-email abandoned cart sequence for [PRODUCT TYPE] priced at $[PRICE]. Email 1 (1 hour after): friendly reminder, no discount. Email 2 (24 hours): add social proof + 10% discount code [CODE]. Email 3 (48 hours): urgency + last chance. Each email: subject line, preview text, body under 200 words, clear CTA button text.' }
        ],
        reviews_data:[
            { name:'Jordan P.', rating:5, text:'My product page conversion rate jumped from 2.1% to 4.8%!', date:'3 weeks ago' },
            { name:'Chen W.', rating:4, text:'Great prompts for Amazon sellers. The listing optimizer is spot on.', date:'1 month ago' }
        ],
        fbt:[1,4],
        link:'https://gumroad.com/sanzyai'
    },
    {
        id:8, name:'FREE Starter ChatGPT Pack',
        emoji:'🎁', bgColor:'linear-gradient(135deg,#1A2E1A,#1B5A35)',
        price:0, origPrice:null, priceCategory:'free',
        platforms:['chatgpt'],
        count:10, category:'ChatGPT / Starter',
        rating:4.7, reviews:312, reviewCount:'312',
        badge:'✅ 100% Free', badgeClass:'badge-free',
        cardClass:'free-card',
        isFree:true,
        desc:'10 beginner-friendly ChatGPT prompts to kick-start your AI journey — completely free, no credit card needed. Perfect if you are new to AI prompts and want to see what is possible.',
        included:['Content idea generator prompt','Email writer template','Meeting agenda creator','Daily planning assistant','Creative story starter prompts'],
        samples:[
            { label:'Content Idea Generator', text:'Generate 20 unique content ideas for a [NICHE] blog/YouTube channel targeting [AUDIENCE]. For each idea, include: title, content format (video/blog/podcast), estimated search volume potential (high/medium/low), content angle, and one key insight to include. Organize by content pillar: [PILLAR 1], [PILLAR 2], [PILLAR 3].' },
            { label:'Professional Email Writer', text:'Rewrite this email to sound [MORE PROFESSIONAL/FRIENDLY/CONCISE]: "[PASTE YOUR EMAIL]". Fix the tone, improve clarity, strengthen the subject line, and make the CTA clearer. Provide 2 versions: one formal and one conversational.' },
            { label:'Meeting Agenda Creator', text:'Create a structured agenda for a [LENGTH]-minute meeting about [TOPIC] with [NUMBER] attendees. Include: pre-meeting prep items, time-boxed agenda items with clear objectives, discussion questions for each item, decision points, action item template, and a parking lot section. Meeting goal: [GOAL].' }
        ],
        reviews_data:[
            { name:'Beginner Barb', rating:5, text:'Perfect introduction to AI prompts! Downloaded in seconds and they actually work.', date:'1 week ago' },
            { name:'Student Sam', rating:5, text:'Great for starting out. So useful I bought the Business Pack too!', date:'3 weeks ago' },
            { name:'Creator Chris', rating:4, text:'Solid free pack. The content idea generator alone is super valuable.', date:'1 month ago' }
        ],
        fbt:[1,4],
        link:'https://gumroad.com/sanzyai'
    },
    {
        id:9, name:'Gemini Image Prompt Pro Pack',
        emoji:'🖼️', bgColor:'linear-gradient(135deg,#1C2338,#214D6C)',
        price:10.5, origPrice:39, priceCategory:'5-15',
        platforms:['gemini','art'],
        count:80, category:'Gemini / Image Generation',
        rating:4.8, reviews:54, reviewCount:'54',
        badge:'🧪 New Gemini Pack', badgeClass:'badge-new',
        cardClass:'',
        desc:'80 production-ready Gemini prompts for product shots, ad creatives, social thumbnails, cinematic scenes and consistent brand visuals. Designed for creators and marketers who want high quality image outputs quickly.',
        included:['Photoreal product image prompts','Ad creative + text-safe composition prompts','Character consistency workflows','Food, fashion and lifestyle campaign prompts','Thumbnail and poster prompt frameworks'],
        samples:[
            { label:'E-commerce Product Hero', text:'Generate a premium product hero image of [PRODUCT] on a minimal studio set, soft-box lighting from left and top, realistic reflections, shallow depth of field, clean white and slate background, 4K detail, commercial photography style, leave negative space on right for headline text.' },
            { label:'Cinematic Brand Scene', text:'Create a cinematic scene for [BRAND TYPE] showing [SUBJECT] in [LOCATION], golden-hour volumetric lighting, subtle film grain, teal-orange grade, realistic skin texture, high dynamic range, emotionally aspirational mood, suitable for a homepage hero banner 16:9.' },
            { label:'Social Carousel Visual Set', text:'Produce a 5-image visual series for Instagram carousel about [TOPIC], consistent art direction and palette [COLORS], each frame with one focal subject, bold composition, editorial style, modern shadows, high clarity, ready for text overlays.' }
        ],
        reviews_data:[
            { name:'Ava N.', rating:5, text:'The product-shot prompts are insanely good. My ad creatives look agency-level now.', date:'1 week ago' },
            { name:'Harsh V.', rating:5, text:'Gemini outputs became much more consistent after using these templates.', date:'2 weeks ago' },
            { name:'Leo P.', rating:4, text:'Great pack overall. Character consistency prompts are especially useful.', date:'3 weeks ago' }
        ],
        fbt:[2,10],
        link:'https://gumroad.com/sanzyai'
    },
    {
        id:10, name:'ChatGPT Image Direction Pack',
        emoji:'📸', bgColor:'linear-gradient(135deg,#2A1F3A,#4A2D63)',
        price:9, origPrice:34, priceCategory:'5-15',
        platforms:['chatgpt','art'],
        count:70, category:'ChatGPT / Image Prompting',
        rating:4.7, reviews:47, reviewCount:'47',
        badge:'🎯 Creator Favorite', badgeClass:'badge-trending',
        cardClass:'',
        desc:'70 advanced ChatGPT prompt blueprints to plan, refine and iterate image outputs for logos, branding, concept art, storyboards and social content. Built to help you get clearer, higher-converting visuals.',
        included:['Prompt frameworks for multiple image styles','Visual moodboard and art-direction templates','Shot-list and scene breakdown prompts','Brand style consistency prompts','Iteration prompts for fixing image errors'],
        samples:[
            { label:'Art Direction Blueprint', text:'Act as a senior art director. Build a detailed image prompt for [CAMPAIGN GOAL] with style [STYLE], color palette [COLORS], subject [SUBJECT], camera angle [ANGLE], lighting [LIGHTING], and composition rules. Return final prompt + 3 alternate variations for testing.' },
            { label:'Character Consistency Prompt', text:'Create a reusable image prompt template that keeps the same character identity across 10 scenes. Character profile: [PROFILE]. Keep face shape, hair, clothing motifs and color palette consistent while changing background, camera distance and pose.' },
            { label:'Thumbnail CTR Prompt', text:'Write 6 thumbnail-generation prompts for a YouTube video about [TOPIC]. Each prompt should target one CTR trigger: curiosity, contrast, urgency, authority, emotion and transformation. Keep designs clean with one focal point and safe text placement.' }
        ],
        reviews_data:[
            { name:'Noah G.', rating:5, text:'This pack made my thumbnail ideation 3x faster. Super practical prompts.', date:'5 days ago' },
            { name:'Mina R.', rating:4, text:'Excellent for brand visuals and storyboard planning with ChatGPT.', date:'2 weeks ago' },
            { name:'Daniel K.', rating:5, text:'The iteration prompts helped me fix image outputs without guesswork.', date:'1 month ago' }
        ],
        fbt:[1,9],
        link:'https://gumroad.com/sanzyai'
    }
];

// =============================================
// STATE
// =============================================
let activePlatform = 'all';
let activePriceFilter = 'all';
let activeSort = 'popular';
let searchQuery = '';
let wishlist = new Set();
let filteredPacks = [...packs];

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
                <button class="btn btn-primary" style="margin-top:16px;" onclick="resetFilters()">Show All Packs</button>
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
            <div class="prod-thumb" style="background:${pack.bgColor};">
                <div class="prod-thumb-bg" style="background:${pack.bgColor};"></div>
                <div class="prod-thumb-emoji">${pack.emoji}</div>

                ${pack.badge ? `
                <div class="thumb-badge">
                    <span class="pack-badge ${pack.badgeClass}">${pack.badge}</span>
                </div>` : ''}

                <button class="wish-btn ${isWished ? 'active' : ''}"
                    onclick="toggleWish(${pack.id}, this)" title="Save to wishlist">
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
                        ${pack.price === 0 ? 'FREE' : '$' + pack.price}
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
                    <button class="preview-btn" onclick="openPreview(${pack.id})">
                        👁️ Preview
                    </button>
                    <button class="buy-btn ${pack.isFree ? 'free-btn' : ''}"
                        onclick="${pack.isFree ? `openEmailModal()` : `openProduct(${pack.id})`}">
                        ${pack.isFree ? '🎁 Get Free Pack' : `🛒 Buy Now — $${pack.price}`}
                    </button>
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
        freelance:'💼 Freelance'
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
    activeSort = document.getElementById('sortSel').value;
    sortPacksData();
    renderPacks();
}

window.filterPlatformSelect = function() {
    activePlatform = document.getElementById('platformSel').value;
    applyAllFilters();
}

window.filterPriceSelect = function() {
    activePriceFilter = document.getElementById('priceSel').value;
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
    if (wishlist.has(id)) {
        wishlist.delete(id);
        btn.textContent = '🤍';
        btn.classList.remove('active');
        showToast('Removed from wishlist','💔');
    } else {
        wishlist.add(id);
        btn.textContent = '❤️';
        btn.classList.add('active');
        showToast('Added to wishlist! ❤️','✅');
    }
}

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
            <span class="modal-title">${pack.emoji} ${pack.name}</span>
            <button class="modal-close" onclick="closeModal()">✕</button>
        </div>

        <div class="modal-body">
            <div class="modal-left">
                <!-- Thumb -->
                <div class="modal-thumb" style="background:${pack.bgColor};">
                    <span style="font-size:4rem;">${pack.emoji}</span>
                    <div style="position:absolute;bottom:10px;right:10px;background:rgba(0,0,0,0.7);padding:5px 12px;border-radius:6px;font-family:var(--fh);font-size:0.76rem;font-weight:700;color:var(--muted);">📦 ${pack.count} Prompts Included</div>
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
                            <button class="sample-copy-btn" onclick="copyPrompt('${s.text.replace(/'/g,"\\'")}', this)" title="Copy prompt">📋</button>
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
                        ? `<button class="btn btn-green btn-lg modal-buy-btn" onclick="closeModal();openEmailModal();">
                                🎁 Get FREE Pack Now
                           </button>`
                        : `<a href="${pack.link}" target="_blank" rel="noopener sponsored"
                               class="btn btn-primary btn-lg modal-buy-btn"
                               onclick="showToast('Opening secure checkout...','🔒')">
                                🛒 Buy Now — $${pack.price}
                           </a>`
                    }

                    <button class="btn btn-outline modal-preview-btn" onclick="closeModal();openPreview(${pack.id});">
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
                <div class="fbt-item" onclick="closeModal();openProduct(${pack.id})">
                    <span class="fbt-emoji">${pack.emoji}</span>
                    <div class="fbt-info">
                        <div class="fbt-name">${pack.name.substring(0,28)}...</div>
                        <div class="fbt-price">${pack.price === 0 ? 'FREE' : '$'+pack.price}</div>
                    </div>
                </div>
                <span class="fbt-plus">+</span>
                ${fbtPacks.map(fp => `
                    <div class="fbt-item" onclick="closeModal();setTimeout(()=>openProduct(${fp.id}),200);">
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

    document.getElementById('prodModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
    document.getElementById('prodModal').classList.remove('open');
    document.body.style.overflow = '';
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
                <button class="sample-copy-btn" onclick="copyPrompt('${s.text.replace(/'/g,"\\'")}',this)" title="Copy">📋</button>
            </div>
        `).join('')}
        <div style="text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid var(--border-s);">
            <p style="color:var(--muted);font-size:0.86rem;margin-bottom:16px;">Want all <strong>${pack.count} prompts</strong>? Get the full pack now.</p>
            ${pack.isFree
                ? `<button class="btn btn-green btn-lg" onclick="closePreview();openEmailModal();">🎁 Get FREE Pack</button>`
                : `<a href="${pack.link}" target="_blank" rel="noopener"
                       class="btn btn-primary btn-lg"
                       onclick="showToast('Opening checkout...','🔒')">
                       🛒 Buy Full Pack — $${pack.price}
                   </a>`
            }
        </div>`;

    document.getElementById('previewModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

window.closePreview = function() {
    document.getElementById('previewModal').classList.remove('open');
    document.body.style.overflow = '';
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
    document.getElementById('emailModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

window.closeEmailModal = function() {
    document.getElementById('emailModal').classList.remove('open');
    document.body.style.overflow = '';
}

window.handleFreeDownload = async function(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = document.getElementById('freePackEmail').value;
    const packUrl = `${window.location.origin}/free-starter-chatgpt-pack.txt`;

    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.textContent = 'Sending...';

    try {
        const response = await fetch('https://formsubmit.co/ajax/hello@sanzyai.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                email,
                source: 'Prompt Store Free Pack',
                message: `Send free pack to ${email}`,
                free_pack_link: packUrl,
                _subject: `Free Pack Request - ${email}`,
                _captcha: 'false',
                _template: 'table',
                _autoresponse: `Thanks for joining SanzyAI. Your free starter pack is ready: ${packUrl}`
            })
        });

        if (!response.ok) {
            throw new Error('Email provider returned non-200 response.');
        }

        closeEmailModal();
        showToast('📬 Free pack email sent to ' + email, '✅');
        window.open(packUrl, '_blank', 'noopener');
    } catch (err) {
        closeEmailModal();
        showToast('⚠️ Email delayed. Download opened directly.', '⬇️');
        window.open(packUrl, '_blank', 'noopener');
    } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.innerHTML = '✅ Send Me The Free Pack!';
        form.reset();
    }
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
const ham = document.getElementById('ham');
const mobileNav = document.getElementById('mobileNav');
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
    sortPacksData();
    renderPacks();
});

console.log('%c💰 SanzyAI Prompt Marketplace Loaded','color:#6C35DE;font-weight:bold;font-size:16px;');
