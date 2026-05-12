# 建立端到端验收测试和响应式检查

Label: `ready-for-agent`

## What to build

Build the first acceptance test suite for the Yingsheng Company Website. Tests should verify externally visible behavior: route availability, rendered content, responsive usability, FAQ visibility, Consultation Form behavior, and SEO/GEO outputs. They should not lock implementation details.

## Acceptance criteria

- [ ] Tests verify key public routes are reachable.
- [ ] Tests verify homepage hero, Primary Navigation, Core Service Lines, and Consultation CTA render.
- [ ] Tests verify representative clients appear on Service Detail Pages and not inside Homepage Service Summaries.
- [ ] Tests verify Business Cases include required sections and Case Result.
- [ ] Tests verify FAQ content is visible and crawlable.
- [ ] Tests verify Consultation Form validation, success, error states, and Privacy Policy link.
- [ ] Tests verify key SEO/GEO metadata and structured data outputs.
- [ ] Desktop and mobile screenshot checks cover homepage, service detail, case detail, FAQ, consultation form, and Careers Page.

## Blocked by

- 002-homepage-hero-services-consultation
- 003-service-detail-pages
- 004-service-cases
- 006-about-culture-careers
- 007-geo-faq-page
- 008-consultation-form-lead-privacy
- 009-seo-geo-metadata-structured-data
