# SanzyAI Strategic Growth & Architecture Plan

This plan complements the [Top 25 Fix Roadmap](./TOP_25_FIX_ROADMAP.md) by focusing on high-level business growth, SEO dominance, and conversion optimization.

## 1. SEO "Shift Left" & Authority Building
Current state: SEO metadata is injected at runtime via `globals.js`.
Target: 100% static metadata for optimal crawler performance.

- **[S] Static Meta Injection:** Create a build-time script that reads `seoByPath` and updates HTML files in the `dist/` folder. This eliminates dependence on client-side JS for SEO.
- **[M] Dynamic Sitemap Generation:** Automate `sitemap.xml` updates based on the file system and blog post JSON to ensure new content is indexed instantly.
- **[L] Topic Cluster Architecture:** Refactor the `/blog` directory into category-based subfolders (e.g., `/blog/ai-tools/`, `/blog/domain-strategy/`) to build topical authority.

## 2. Conversion & Revenue Optimization
Current state: External links and manual "follows".
Target: Lower-friction, high-trust checkout experiences.

- **[S] Gumroad Overlay Integration:** Replace `window.open` with the Gumroad Overlay script for a seamless "stay-on-site" purchase flow for prompt packs.
- **[M] Domain ROI Calculator:** Add a "Total Cost of Ownership" calculator to the Domain Finder page, comparing 5-year costs (Registration + 4 Renewals) across registrars.
- **[M] Personalization Engine:** Show "Recently Viewed" or "Recommended for You" based on `localStorage` wishlist and search history on the homepage.

## 3. Advanced UX & Interactive Assets
Current state: Static lists and basic search.
Target: Interactive "Lead Magnets" that provide instant value.

- **[M] AI Prompt Previewer:** Allow users to "test" a snippet of a prompt pack in the browser using the Groq proxy before buying.
- **[S] Micro-Interactions Pass:** Add subtle CSS animations to cards, buttons, and "Learn Free" progress bars to make the site feel "premium".
- **[M] Progressive Web App (PWA):** Add a manifest and service worker to allow users to "Install" SanzyAI for quick access to their wishlist and saved tools.

## 4. Scalability & Technical Debt
Current state: Monolithic `globals.js` and pure HTML duplication.
Target: Modular, component-based maintenance.

- **[M] Component Extraction:** Move shared elements (Navbar, Footer, Site Controls) into a lightweight templating system or Web Components to avoid manual updates across 20+ HTML files.
- **[M] API Edge Caching:** Enhance `server/groq-proxy.mjs` with an LRU cache to minimize Groq API calls and reduce response latency for common queries.
- **[S] Security Header Hardening:** Implement a stricter `Content-Security-Policy` (CSP) and ensure `SameSite` attributes on all cookies.

## Success Metrics
- **Performance:** Maintain 95+ Lighthouse scores across all categories.
- **SEO:** Increase "Crawled - currently not indexed" resolution by 40% through static meta injection.
- **Conversion:** Increase Prompt Store "Add to Wishlist" to "Checkout" conversion by 15% using overlays.
