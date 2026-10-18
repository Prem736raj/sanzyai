# E2E Test Infra: SanzyAI Modern SaaS Redesign

## Test Philosophy
- Opaque-box, requirement-driven, zero tolerance for hardcoded facades or regression.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial + Real-World Workload Testing.

## Verification Pipeline & Gates
| # | Gate | Command | Pass Criteria |
|---|---|---|---|
| 1 | Inline Handlers | `npm run check:inline-handlers` | 0 inline event attributes across HTML and JS files |
| 2 | Structured Data | `npm run validate:structured-data` | Valid JSON-LD schema on required pages (including `learn-free.html`) |
| 3 | Route Integrity | `npm run check:routes` | 0 broken internal links |
| 4 | API Tests | `npm run test:api` | 21/21 backend tests pass |
| 5 | Vite Build | `npm run build` | All 31 pages build cleanly |
| 6 | Performance Budgets | `npm run test:performance` | JS bundle budgets (<65KB learn-free, <70KB ai-tools) and all image tags compliant |
| 7 | HTML Validation | `npm run validate:html` | 0 errors across all HTML pages |
| 8 | Smoke / E2E Tests | `npm run test:smoke` | Playwright test suite passes across browsers and mobile |
| 9 | Accessibility | `npm run test:a11y:ci` | Axe-core WCAG 2.1 AA 0 violations in Light & Dark modes |
| 10 | Master Gate | `npm run quality:ci` | Exit code 0 across the entire chained suite |

## Page Test Scenarios
### Domain Finder
- Search for `exampletest` -> auto-completes to `exampletest.com`
- Availability and recommendation bar updates dynamically
- Price comparison matrix renders 10 registrars sorted by price
- TLD selector pills update rates proportionally
- Coupon code copy functionality works via clipboard API

### Tools Directory
- Directory title contains `AI Tools` (satisfies smoke test regex)
- Search for tools (e.g. `ChatGPT`, `Midjourney`) filters catalog in real time
- Category filters (`free`, `freemium`, `paid`, `writing`, `design`, `code`, `marketing`) filter catalog
- Tool cards do not have button roles; sequential tab key order reaches `Details` then `Visit Tool`
- Tool comparison bar opens, updates chips, and displays multi-column comparison matrix
- Tool bookmarking persists to `localStorage`

### Learn Free
- Course JSON-LD schema validates
- Quiz answers navigate from Q1 to Q3 and display recommendation
- Path switch toggle changes mode between `Start Free Path` and `Start Paid Path`
- 16 curriculum stages render objectives, toolchains, checklists, and common pitfalls
- 30-Day Sprint builder generates customized 4-week roadmap and exports `sprint-plan.pdf`
- Launch checklist saves completed task indices to `localStorage`
