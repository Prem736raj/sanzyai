// Lightweight shared product metadata. Prompt bodies stay in product-catalog.js.
export const productSummaries = [
  {
    "id": 0,
    "name": "All-access bundle under quality review",
    "desc": "Purchases paused during quality review.",
    "price": 0,
    "status": "paused",
    "count": 20
  },
  {
    "id": 1,
    "name": "ChatGPT for Solo-Founders",
    "desc": "Editable prompts for business planning, customer messages and routine operations. Review the samples and adapt them to your business.",
    "price": 1.5,
    "status": "paused",
    "count": 20
  },
  {
    "id": 2,
    "name": "Midjourney E-Commerce Seller Pack",
    "desc": "Product-image prompt templates to customize for your own products. Check accuracy and marketplace requirements before using generated images.",
    "price": 1.75,
    "status": "paused",
    "count": 20
  },
  {
    "id": 3,
    "name": "SEO Content Writer Pack",
    "desc": "Content planning and drafting templates. Review factual claims and search intent; rankings are not guaranteed.",
    "price": 0.99,
    "status": "paused",
    "count": 20
  },
  {
    "id": 4,
    "name": "Go Viral: Social Media AI Pack",
    "desc": "Idea, hook and content-calendar templates for your social channels. Adapt them to your audience and voice.",
    "price": 0.99,
    "status": "paused",
    "count": 20
  },
  {
    "id": 6,
    "name": "Close More Deals: AI Freelancer Pack",
    "desc": "Proposal and client-conversation prompts to adapt to your services and pricing.",
    "price": 1.25,
    "status": "paused",
    "count": 20
  },
  {
    "id": 5,
    "name": "Claude Vibe Coding Architect",
    "desc": "Planning, debugging and test-writing prompts. Review and test generated code before use.",
    "price": 2,
    "status": "paused",
    "count": 20
  },
  {
    "id": 8,
    "name": "YouTube Growth Engine Pack",
    "desc": "Video title, outline, script and description templates. Review the examples before buying.",
    "price": 0.99,
    "status": "paused",
    "count": null
  }
];
export const previewProducts = productSummaries.filter(product => product.id !== 0);
