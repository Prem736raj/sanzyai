# Analytics Funnel Plan

## Core Events
- cta_click: Any major CTA click (captured globally in src/globals.js)
- lead_form_submit: Any form submit attempt (captured globally)
- homepage_launch_score_update: Home launch meter range update
- homepage_launch_score_checkbox: Home launch meter checklist interaction
- learnfree_path_switch: Learn Free path toggle
- learnfree_stage_select: Learn Free stage selection
- learnfree_sprint_generated: Sprint generation event
- learnfree_sprint_pdf_saved: Sprint PDF export success
- learnfree_sprint_pdf_error: Sprint PDF export error

## Funnel Dashboard (GA4)
1. Acquisition to intent
- View: Session source/medium
- Step: landing page -> cta_click

2. Engagement to lead
- Step: cta_click -> lead_form_submit
- Breakdown: page path, device category

3. Product education funnel
- Step: learnfree_path_switch -> learnfree_stage_select -> learnfree_sprint_generated -> learnfree_sprint_pdf_saved

## KPI Targets
- CTA click-through rate >= 6%
- Lead form conversion from CTA >= 12%
- Learn Free sprint generation rate >= 20% of Learn Free page sessions

## UTM Discipline
- Require utm_source, utm_medium, utm_campaign for all paid and partner links
- Create weekly report by campaign grouped by cta_click and lead_form_submit
