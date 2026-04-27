import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'deliverables', 'premium-prompt-packs');

const packs = [
  { id: 0, key: 'mastery', name: 'The Mastery Vault 10000+ AI Prompts', count: 10000 },
  { id: 1, key: 'solofounder', name: 'ChatGPT for Solo-Founders', count: 150 },
  { id: 2, key: 'midjourney-ecommerce', name: 'Midjourney for Amazon Etsy', count: 100 },
  { id: 3, key: 'seo-content', name: 'SEO Content Writer Pack', count: 50 },
  { id: 4, key: 'viral-social', name: 'Viral X LinkedIn Ghostwriter', count: 65 },
  { id: 6, key: 'freelance-closer', name: 'Freelance High-Ticket Closer', count: 45 }
];

const blueprints = {
  mastery: {
    role: 'elite AI polymath and digital operations architect',
    problems: [
      'Lack of systemic AI use across the business.',
      'Silos between marketing, coding, and design tasks.',
      'Slow execution speed from manual work.',
      'Missing advanced prompt-engineering frameworks.'
    ],
    bestFor: 'Entrepreneurs, agencies, and full-stack business operators.',
    objective: ['cross-department strategy', 'full-funnel optimization', 'creative/technical hybrid workflow', 'automation pipeline setup'],
    deliverables: ['omni-channel strategy', 'GTM plan', 'cost-reduction blueprint', 'AI integration roadmap']
  },
  solofounder: {
    role: 'fractional CMO and solo-business operator',
    problems: [
      'Founders are stuck working IN the business, not ON it.',
      'Operations are manual and unscalable.',
      'Cold outreach emails have low conversion.',
      'Pricing models are leaving money on the table.'
    ],
    bestFor: 'Solo-founders, bootstrappers, and indie-hackers.',
    objective: ['scale operations', 'pitch deck refinement', 'SaaS pricing optimization', 'automated acquisition'],
    deliverables: ['cold email sequence', 'pricing matrix', 'product-market fit survey', 'automated workflow diagram']
  },
  'midjourney-ecommerce': {
    role: 'commercial product photographer and 3D mockup artist',
    problems: [
      'Product photography is too expensive and slow.',
      'Amazon listings lack white-background compliance.',
      'Lifestyle shots do not elicit emotional desire.',
      'Packaging mockups look fake or unprofessional.'
    ],
    bestFor: 'Amazon FBA sellers, Etsy shop owners, and Shopify merchants.',
    objective: ['pure white ecommerce shots', 'lifestyle in-situ renders', 'packaging mockup variation', 'ad creative asset generation'],
    deliverables: ['raw image prompt', 'V6 parameter tuning', 'lighting angle instructions', 'camera/lens specs']
  },
  'seo-content': {
    role: 'senior SEO content strategist and semantic cluster expert',
    problems: [
      'Blog posts get published but never reach page 1.',
      'Keyword cannibalization occurs across the site.',
      'Content lacks semantic depth and LSI keywords.',
      'Meta tags do not convert impressions into clicks.'
    ],
    bestFor: 'SEO marketers, niche bloggers, and content directors.',
    objective: ['topical cluster architecture', 'skyscraper content brief', 'internal linking mapping', 'high CTR meta data'],
    deliverables: ['topical map', '2000-word article outline', 'competitor gap analysis', 'schema markup logic']
  },
  'viral-social': {
    role: 'viral thread architect and ghostwriter for personal brands',
    problems: [
      'Content gets lost in the feed algorithm.',
      'Hooks fail to stop the scroll.',
      'Follower growth does not translate into newsletter subs.',
      'Personal stories lack professional context.'
    ],
    bestFor: 'Founders on Twitter/X, LinkedIn creators, and thought leaders.',
    objective: ['viral hook generation', 'contrarian storytelling framing', 'audience retention mechanics', 'CTA conversion tuning'],
    deliverables: ['10-tweet thread', 'LinkedIn carousel script', '30-day content calendar', 'engagement reply scripts']
  },
  'freelance-closer': {
    role: 'elite high-ticket freelance closer and pricing negotiator',
    problems: [
      'Clients aggressively push back on high project fees.',
      'Proposals focus on tasks rather than business outcomes/ROI.',
      'The pipeline is feast or famine.',
      'Freelancers get ghosted after sending the first quote.'
    ],
    bestFor: 'Freelancers, independent consultants, and solo-agencies.',
    objective: ['value-based pricing defense', 'discovery call scripting', 'objection handling', 'proposal restructuring'],
    deliverables: ['objection response script', '3-tier pricing proposal', 'lead qualification checklist', 're-engagement email sequence']
  }
};

const phasePool = [
  'discovery',
  'strategy',
  'execution',
  'optimization',
  'quality assurance',
];

const stylePool = [
  'concise and decision-focused',
  'analytical with practical examples',
  'operator-level and implementation ready',
  'high-conversion and outcome-oriented',
  'structured for team handoff',
];

const commonInputVars = [
  '[BUSINESS_CONTEXT]',
  '[TARGET_AUDIENCE]',
  '[PRIMARY_GOAL]',
  '[CONSTRAINTS]',
  '[TIMEFRAME]',
  '[SUCCESS_METRIC]',
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function makePrompt(pack, idx) {
  const bp = blueprints[pack.key];
  const objective = bp.objective[idx % bp.objective.length];
  const problem = bp.problems[idx % bp.problems.length];
  const deliverable = bp.deliverables[idx % bp.deliverables.length];
  const phase = phasePool[idx % phasePool.length];
  const style = stylePool[idx % stylePool.length];

  const title = `${idx + 1}. ${objective.toUpperCase()} - ${phase.toUpperCase()} WORKFLOW`;

  const promptBody = [
    `Problem solved: ${problem}`,
    `Best for: ${bp.bestFor}`,
    `Use case: Deploy this when you need ${objective} under real delivery constraints.`,
    'Inputs to replace:',
    ...commonInputVars.map((v) => `- ${v}`),
    '',
    'Master prompt:',
    `Act as a ${bp.role}.`,
    `Goal: Build a ${objective} plan for [BUSINESS_CONTEXT] targeting [TARGET_AUDIENCE] with success metric [SUCCESS_METRIC].`,
    `Context and constraints: [CONSTRAINTS]. Delivery window: [TIMEFRAME].`,
    `Work through the ${phase} phase first, then produce implementation assets that can be used immediately by an operator team.`,
    'Force high specificity: include assumptions, dependencies, risks, and fallback options where uncertainty exists.',
    '',
    'Output format required:',
    `1) Executive summary (max 180 words)`,
    `2) ${deliverable} with step-by-step actions`,
    '3) Prioritized action table (impact, effort, owner, deadline)',
    '4) Risk register with mitigation plan',
    '5) Quality checklist with pass/fail criteria',
    '6) Optimization suggestions (minimum 3)',
    '',
    'Quality checks:',
    '- Avoid generic advice and avoid repeating obvious best practices.',
    '- Every recommendation must map to a measurable business/user outcome.',
    '- Highlight what to do first if time is limited to 20% of full scope.',
    `- Writing style must be ${style}.`,
  ].join('\n');

  return `${title}\n${promptBody}`;
}

function buildPackFile(pack) {
  const prompts = [];
  for (let i = 0; i < pack.count; i += 1) {
    prompts.push(makePrompt(pack, i));
  }

  const header = [
    `${pack.name.toUpperCase()} (${pack.count} PROMPTS)`,
    `Pack ID: ${pack.id}`,
    'Standard: Premium Prompt Quality v1',
    '',
    'How to use:',
    '1) Replace all bracket placeholders before use.',
    '2) Run prompt once, then run a second pass with real data for refinement.',
    '3) Keep the Quality checks section in every run.',
    '',
  ].join('\n');

  return `${header}${prompts.join('\n\n---\n\n')}\n`;
}

function buildManifest(packsList) {
  const lines = [];
  lines.push('PREMIUM PROMPT PACK MANIFEST');
  lines.push('');
  lines.push('Generated files ready for external delivery upload (e.g., Gumroad).');
  lines.push('');
  lines.push('Packs generated:');
  lines.push('');

  let total = 0;
  for (const pack of packsList) {
    total += pack.count;
    lines.push(`- ${pack.name} -> ${slugify(pack.name)}.txt (${pack.count} prompts)`);
  }

  lines.push('');
  lines.push(`Total prompts generated: ${total}`);
  lines.push('');
  lines.push('Quality baseline: each prompt includes Problem solved, Best for, Inputs, Master prompt, Output format, and Quality checks.');
  lines.push('');
  lines.push('Before upload:');
  lines.push('1) Spot-check 10 prompts per pack for niche-specific accuracy.');
  lines.push('2) Add any pack-specific legal/compliance notes if required.');
  lines.push('3) Upload as downloadable assets in your checkout platform.');

  return `${lines.join('\n')}\n`;
}

async function run() {
  await mkdir(outDir, { recursive: true });

  for (const pack of packs) {
    const outFile = path.join(outDir, `${slugify(pack.name)}.txt`);
    await writeFile(outFile, buildPackFile(pack), 'utf8');
  }

  const manifestPath = path.join(outDir, 'MANIFEST.txt');
  await writeFile(manifestPath, buildManifest(packs), 'utf8');

  console.log(`Generated ${packs.length} premium pack files in ${outDir}`);
}

run().catch((err) => {
  console.error('Failed to generate premium pack files:', err);
  process.exit(1);
});
