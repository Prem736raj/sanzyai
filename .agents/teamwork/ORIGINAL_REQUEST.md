# Original User Request

## Initial Request — 2026-10-17T09:40:50Z

# Teamwork Project Prompt

Redesign the Learn Free, Tools Directory (formerly AI Tools), and Domain Finder pages into a clean, premium, human-crafted modern SaaS interface with restrained neutral tones, disciplined spacing, and zero AI-slop visual patterns.

Working directory: c:\Users\prem7\Downloads\sanzyai-main-20261016T152129Z-1-001\sanzyai-main\sanzyai-main
Integrity mode: development

## Requirements

### R1. Design System & Aesthetic De-Slop
Purge all stereotypical "AI-generated" visual gimmicks across `/learn-free`, `/ai-tools`, and `/domain-finder`:
- Completely remove neon glow borders, fluorescent cyan/purple gradients, glassmorphism, floating pills, sparkle icons, random decorative backdrop blobs, and oversized pill-shaped cards.
- Implement an authentic, human-designed modern SaaS aesthetic using restrained neutral slate/zinc tones, precise borders (1px solid var(--border)), compact border-radii (4px–8px max), clean tabular and list groupings, and a single controlled accent color.
- Ensure page-specific layout composition rather than repeating the same card grid on every screen.

### R2. Page-Specific Redesigns
1. Domain Finder (`domain-finder.html` + `src/domain-finder.css`):
   - Transform into a crisp, high-density utility tool.
   - Clean search bar, clear registrar comparison table/matrix with transparent pricing, renewal details, and straightforward filters without marketing fluff.
2. Tools Directory (`ai-tools.html` + `src/ai-tools.css`):
   - Reframe from a buzzy "AI Directory" to a curated "Digital & Web Creator Tools" catalog.
   - High-signal categorisation, structured data rows/compact cards, realistic tags, clear external links, and zero fake ratings or sparkle badges.
3. Learn Free (`learn-free.html` + `src/learn-free.css`):
   - Present as an authentic, structured digital curriculum / syllabus.
   - Editorial typography, clear phase milestones, clean collapsible modules, legible reading line-length, and an uncluttered sprint builder.

### R3. Content De-Hype & Human Editorial Voice
- Remove all robotic, hyperbolic copy ("supercharge", "unleash next-gen AI power", "revolutionary intelligence").
- Replace with direct, understated, practical product copy focusing on utility, workflows, domain strategies, and digital business creation.

### R4. Preserved Logic & Strict Quality Gates
- Maintain full functionality of domain search filtering, tool bookmarking, syllabus progress, and theme switching.
- Pass all project verification gates:
  - `npm run check:inline-handlers` (0 inline handlers)
  - `npm run build` (all 31 pages build cleanly)
  - `npm run test:api` (19/19 tests passing)
  - `npm run test:performance` (budget compliance across pages and images)
  - `npm run validate:html` (strict HTML standards)

## Acceptance Criteria

### Visual Art Direction & Craftsmanship
- [ ] No neon gradients, glow effects, floating pill badges, sparkle emojis/icons, or glassmorphic blur layers on the three pages.
- [ ] Consistent professional typography hierarchy with restrained radii (max 8px) and a cohesive slate/zinc neutral foundation.
- [ ] Distinct, purpose-built page composition for each of the three pages (not identical card grids).

### Content & Voice
- [ ] All page titles, headings, and descriptions rewritten into clean, grounded, human copy without AI buzzwords.
- [ ] Page metadata and headings reflect practical web building, tools, and domain utilities.

### Functionality & Verification
- [ ] Domain search, registrar comparisons, tool filtering/search, and course progress remain 100% functional with zero console errors.
- [ ] `npm run quality:ci` passes with exit code 0.
