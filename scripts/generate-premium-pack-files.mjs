import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'deliverables', 'premium-prompt-packs');

const packs = [
  { id: 1, key: 'business', name: 'Ultimate Business ChatGPT Pack', count: 50 },
  { id: 2, key: 'midjourney', name: 'Midjourney Art Masterpack', count: 100 },
  { id: 3, key: 'seo', name: 'SEO Content Writer Pack', count: 30 },
  { id: 4, key: 'social', name: 'Social Media Content Pack', count: 40 },
  { id: 5, key: 'youtube', name: 'YouTube Script Writing Pack', count: 25 },
  { id: 6, key: 'freelance', name: 'Freelancer Income Pack', count: 60 },
  { id: 7, key: 'ecommerce', name: 'E-commerce Product Pack', count: 35 },
  { id: 9, key: 'gemini-image', name: 'Gemini Image Prompt Pro Pack', count: 80 },
  { id: 10, key: 'chatgpt-image', name: 'ChatGPT Image Direction Pack', count: 70 },
  { id: 11, key: 'claude-code', name: 'Claude Code Engineer Pack', count: 120 },
];

const blueprints = {
  business: {
    role: 'senior business strategist and growth operator',
    problems: [
      'Revenue is flat because offers are not positioned clearly.',
      'Conversion is weak due to unclear value messaging.',
      'Execution is slow because operations are not systemized.',
      'Decision-making is reactive because data priorities are unclear.',
    ],
    bestFor: 'Founders, consultants, agency operators, and growth teams.',
    objective: ['offer architecture', 'pricing strategy', 'acquisition plan', 'retention workflow', 'sales process'],
    deliverables: ['strategy brief', 'execution roadmap', 'risk map', 'KPI dashboard spec', '30-day sprint plan'],
  },
  midjourney: {
    role: 'expert Midjourney prompt director for commercial-grade visuals',
    problems: [
      'Image outputs look generic and non-brandable.',
      'Generated visuals are inconsistent across campaign assets.',
      'Creative teams lose time iterating unclear image prompts.',
      'Visual quality does not match premium ad standards.',
    ],
    bestFor: 'Brand designers, visual artists, ad creatives, and content studios.',
    objective: ['hero concept generation', 'campaign art direction', 'character consistency', 'thumbnail optimization', 'product visual storytelling'],
    deliverables: ['primary prompt set', 'variation tree', 'negative prompt list', 'style lock sheet', 'production checklist'],
  },
  seo: {
    role: 'senior SEO content strategist and editorial planner',
    problems: [
      'Pages fail to rank despite publishing consistently.',
      'Content structure does not match search intent.',
      'Traffic arrives but does not convert to leads or sales.',
      'Keyword cannibalization is reducing topical authority.',
    ],
    bestFor: 'SEO writers, niche site builders, affiliate teams, B2B content teams.',
    objective: ['pillar page planning', 'intent mapping', 'SERP gap analysis', 'conversion-focused article brief', 'cluster optimization'],
    deliverables: ['SEO brief', 'outline architecture', 'internal linking map', 'schema notes', 'refresh cycle plan'],
  },
  social: {
    role: 'performance social media strategist and conversion copywriter',
    problems: [
      'Posts get impressions but low engagement depth.',
      'Content lacks a repeatable hook-to-CTA structure.',
      'Audience growth is inconsistent across weeks.',
      'Social content does not translate into pipeline results.',
    ],
    bestFor: 'Creators, social managers, personal brands, and D2C teams.',
    objective: ['engagement campaign design', 'content calendar architecture', 'hook testing matrix', 'comment conversion loop', 'community growth strategy'],
    deliverables: ['post set', 'hook library', 'CTA map', 'platform adaptation notes', '7-day posting sprint'],
  },
  youtube: {
    role: 'YouTube retention strategist and narrative script architect',
    problems: [
      'Viewers drop early because hooks are weak.',
      'Scripts are informative but not engaging enough.',
      'Content output is inconsistent and hard to scale.',
      'Videos get clicks but low watch-time completion.',
    ],
    bestFor: 'YouTubers, educators, storytellers, and content-led businesses.',
    objective: ['hook engineering', 'retention script design', 'format optimization', 'episode pipeline planning', 'CTA performance tuning'],
    deliverables: ['opening variants', 'full script draft', 'b-roll map', 'retention checkpoints', 'thumbnail-title sync brief'],
  },
  freelance: {
    role: 'freelance growth advisor focused on client acquisition and profitability',
    problems: [
      'Freelancers lose deals because proposals sound generic.',
      'Rates stay low due to weak value framing.',
      'Client pipeline is unstable month to month.',
      'Projects overrun because expectations are not scoped clearly.',
    ],
    bestFor: 'Freelancers, consultants, solo agencies, and independent operators.',
    objective: ['proposal optimization', 'lead outreach system', 'rate negotiation strategy', 'client onboarding workflow', 'scope control framework'],
    deliverables: ['client-ready draft', 'objection matrix', 'negotiation script', 'onboarding checklist', 'weekly pipeline plan'],
  },
  ecommerce: {
    role: 'ecommerce conversion strategist and lifecycle copy specialist',
    problems: [
      'Product pages get traffic but conversion is poor.',
      'Paid ads do not align with on-site message match.',
      'AOV is low because bundle and upsell logic is weak.',
      'Retention suffers due to weak post-purchase communication.',
    ],
    bestFor: 'Shopify operators, D2C teams, Amazon sellers, and growth marketers.',
    objective: ['PDP copy optimization', 'offer stack design', 'lifecycle email flow', 'ad-to-page message match', 'checkout conversion tuning'],
    deliverables: ['copy set', 'offer matrix', 'A/B test plan', 'email sequence draft', 'conversion scorecard'],
  },
  'gemini-image': {
    role: 'Gemini image generation director for brand-consistent commercial visuals',
    problems: [
      'Image sets are inconsistent across campaign touchpoints.',
      'Creative intent is lost due to vague image prompting.',
      'Visual outputs lack conversion-focused composition.',
      'Production teams waste time on prompt trial-and-error.',
    ],
    bestFor: 'Brand teams, media buyers, ecommerce creatives, and visual agencies.',
    objective: ['campaign scene design', 'ad creative generation', 'brand style consistency', 'product hero imaging', 'social visual sequencing'],
    deliverables: ['hero prompt', 'variant prompts', 'composition instructions', 'lighting guide', 'QA review checklist'],
  },
  'chatgpt-image': {
    role: 'image prompt planner using ChatGPT for ideation, direction, and iteration control',
    problems: [
      'Image ideation lacks direction and strategic constraints.',
      'Teams cannot maintain consistent visual identity.',
      'Prompt iterations fail to fix recurring output flaws.',
      'Creative production is slow because decision criteria are unclear.',
    ],
    bestFor: 'Design leads, creator teams, brand storytellers, and growth marketers.',
    objective: ['art direction briefing', 'prompt iteration framework', 'thumbnail and hero planning', 'visual consistency system', 'creative QA optimization'],
    deliverables: ['brief template', 'prompt stack', 'iteration fixes', 'visual rubric', 'handoff notes'],
  },
  'claude-code': {
    role: 'staff-level software engineer specializing in debugging, architecture, and release safety',
    problems: [
      'Bugs recur because root cause analysis is shallow.',
      'Feature delivery is delayed by unclear technical planning.',
      'Legacy refactors break behavior due to missing safeguards.',
      'Code quality drops under deadline pressure.',
    ],
    bestFor: 'Developers, tech leads, founders, and product engineering teams.',
    objective: ['bug triage workflow', 'feature implementation planning', 'refactor safety design', 'test strategy architecture', 'performance and security hardening'],
    deliverables: ['diagnostic report', 'implementation patch plan', 'test suite blueprint', 'risk mitigation checklist', 'release readiness criteria'],
  },
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
