# PRD: 映盛公司官网第一阶段

## Problem Statement

映盛需要建设一个专业、可信、可持续扩展的公司官网，用来承接潜在客户、AI/search 爬虫和求职候选人。当前需求已经明确：官网不能只是品牌展示页，也不能只服务人类访客；它需要清楚表达映盛的核心定位、六大核心业务、优势行业、服务案例、研究院内容、企业文化、招聘入口和咨询合作路径，同时成为 AI 搜索与问答系统能够抓取、理解、引用的 GEO Authority Source。

如果官网信息结构不清晰，潜在客户很难快速理解映盛能解决什么问题；如果内容只做视觉展示，AI/search 爬虫难以获得结构化信息；如果招聘内容缺失，Job Candidate 无法判断公司业务、文化和加入方式；如果咨询路径不明确，官网无法有效转化商业线索。

## Solution

建设一个 Chinese First Website 的 Multi-Page Website Skeleton，采用 Static-First Next.js Architecture。官网以“让品牌增长，回到真实用户关系”为首页主张，以 Core Positioning 解释映盛面向中大型品牌，提供用户运营、口碑营销、社会化媒体营销、直播/短视频营销、互动公关与数字渠道建设服务，帮助品牌实现从公域获客到私域转化的长效增长。

网站第一阶段包含完整首页、核心业务、服务案例、映盛研究院、映盛文化、关于映盛、加入我们、FAQ、咨询合作和隐私政策等页面。内容采用 Static Content Source 管理，不建设 CMS 后台。咨询合作通过 Consultation Form 收集轻量线索，并通过 Lead Notification 发送到指定商务邮箱，预留企业微信通知能力。

官网必须支持 GEO Content Layer：FAQ、公司事实、服务问答、研究院内容、结构化数据、metadata、sitemap、robots 和清晰标题层级都要服务于可爬取、可理解、可引用的内容结构。FAQ 不能做隐藏爬虫页，必须是低干扰但公开可访问、可阅读的页面。

## User Stories

1. As a Potential Customer, I want to understand what Yingsheng does on the homepage, so that I can quickly judge whether it fits my brand's needs.
2. As a Potential Customer, I want to see a clear Core Positioning, so that I understand how the six Core Service Lines fit together.
3. As a Potential Customer, I want the homepage hero to communicate a memorable brand-growth claim, so that I can quickly remember the company's value.
4. As a Potential Customer, I want to browse the six Core Service Lines, so that I can find the service area related to my current challenge.
5. As a Potential Customer, I want each Homepage Service Summary to include a title, value sentence, and service keywords, so that I can scan services efficiently.
6. As a Potential Customer, I want to click from a Homepage Service Summary to a Service Detail Page, so that I can understand the full service scope.
7. As a Potential Customer, I want the User Operations page to explain public-domain acquisition, private-domain conversion, user lifecycle, KOC, community, WeCom, activity, and mall operations, so that I can evaluate user growth fit.
8. As a Potential Customer, I want the Word-of-Mouth Marketing page to explain reputation strategy, KOC/KOL collaboration, platform operations, sentiment monitoring, and crisis PR, so that I can evaluate brand reputation services.
9. As a Potential Customer, I want the Social Media Marketing page to explain platform strategy, SNS operations, topic activation, KOL placement, media resources, and account operations, so that I can evaluate social asset building.
10. As a Potential Customer, I want the Live Streaming and Short-Video Marketing page to explain creative scripts, shooting, production, account incubation, livestream operations, matrix collaboration, and IP incubation, so that I can evaluate content conversion services.
11. As a Potential Customer, I want the Interactive Public Relations page to explain PR strategy, events, scenario marketing, crossover marketing, and brand asset design, so that I can evaluate user-centered PR support.
12. As a Potential Customer, I want the Digital Channel Construction page to explain website, app, mini program, SCRM/business system, and H5 interactive development, so that I can evaluate digital touchpoint construction.
13. As a Potential Customer, I want representative clients to appear at the end of each Service Detail Page, so that trust evidence is tied to relevant services.
14. As a Potential Customer, I want automotive experience to be visible as an Advantage Industry, so that I can trust Yingsheng's experience in a complex category.
15. As a Potential Customer outside automotive, I want the site to also mention consumer goods, finance, tourism, and other Target Industries, so that I do not assume Yingsheng only serves automotive brands.
16. As a Potential Customer, I want to browse Service Cases, so that I can understand what Yingsheng has done for similar clients.
17. As a Potential Customer, I want each Business Case to include client background, service line, challenge, solution, execution, and Case Result, so that I can evaluate relevance and credibility.
18. As a Potential Customer, I want Case Result to allow qualitative impact when metrics are confidential, so that cases can still communicate value without exposing sensitive data.
19. As a Potential Customer, I want clear Consultation CTA entries in the hero, footer, service pages, and case pages, so that I always know how to start cooperation.
20. As a Potential Customer, I want a Consultation Form with only necessary fields, so that contacting Yingsheng is not burdensome.
21. As a Potential Customer, I want direct contact methods such as phone, email, address, and optional QR/WeCom entry, so that I can choose my preferred channel.
22. As a Potential Customer, I want confirmation after submitting the Consultation Form, so that I know my inquiry was received.
23. As a Potential Customer, I want a Privacy Policy Page linked near the form, so that I understand how my personal information will be used.
24. As an AI/search crawler, I want crawlable HTML text for the company positioning and services, so that I can correctly understand and cite Yingsheng.
25. As an AI/search crawler, I want structured metadata for pages, so that I can classify page purpose accurately.
26. As an AI/search crawler, I want sitemap and robots configuration, so that I can discover important pages efficiently.
27. As an AI/search crawler, I want structured data for organization, FAQ, articles, and breadcrumbs where appropriate, so that Yingsheng can be represented accurately in search and answer systems.
28. As an AI/search crawler, I want the FAQ to be publicly accessible and readable, so that the site does not rely on hidden crawler-only content.
29. As an AI/search crawler, I want clear headings and question-answer content, so that common user questions can be mapped to authoritative answers.
30. As a visitor using AI search, I want answers about what Yingsheng does, who it serves, and what services it provides, so that I can trust AI-generated summaries.
31. As a Research Institute reader, I want industry insights, marketing methodology, platform trends, and brand growth research, so that I can understand Yingsheng's expertise.
32. As a Potential Customer, I want Yingsheng Research Institute content to feel professional rather than like company news, so that it builds expert trust.
33. As a Job Candidate, I want a Careers Page, so that I can understand Yingsheng's business direction and application channels.
34. As a Job Candidate, I want to understand Yingsheng Culture, so that I can judge whether the team style and values fit me.
35. As a Job Candidate, I want homepage and navigation entry points to careers content, so that I can find candidate-facing information without the homepage becoming recruitment-led.
36. As a general visitor, I want About Yingsheng to provide company facts, history, service capabilities, industries, customer types, and contact paths, so that I can understand the company as an entity.
37. As a general visitor, I want Yingsheng Culture to be separate from About Yingsheng, so that company facts and employer branding are not mixed together.
38. As a mobile visitor, I want navigation, service summaries, forms, and content pages to work cleanly on small screens, so that I can browse without layout issues.
39. As a desktop visitor, I want the site to feel professional, modern, restrained, and energetic, so that Yingsheng feels credible and current.
40. As a site maintainer, I want research articles, service cases, and FAQ to live in Static Content Source files, so that first-phase updates do not require a CMS backend.
41. As a site maintainer, I want service data to be reusable across homepage summaries and detail pages, so that content stays consistent.
42. As a site maintainer, I want a content model that can later connect to a CMS, so that the first-phase architecture does not block future growth.
43. As a developer, I want the website to use Static-First Next.js Architecture, so that pages are crawlable and performant.
44. As a developer, I want Consultation Form submission handled by a lightweight API route, so that lead notification can work without a full CRM.
45. As a developer, I want the first phase to avoid a client-only SPA, so that SEO and GEO behavior are not compromised.
46. As a business stakeholder, I want GEO Optimization Service not to appear as a seventh public service line yet, so that the public service scope stays aligned with current offerings.
47. As a business stakeholder, I want GEO considerations built into the information architecture, so that the site is prepared for AI-driven discovery.
48. As a business stakeholder, I want the site to be Chinese-first, so that the first release focuses content quality on the primary market.
49. As a future stakeholder, I want multilingual expansion not to be structurally blocked, so that an English site can be added later if needed.
50. As a reviewer, I want the PRD and domain language to use terms from CONTEXT.md, so that implementation stays aligned with confirmed decisions.

## Implementation Decisions

- Build a Chinese First Website, not a bilingual launch.
- Build a Multi-Page Website Skeleton, not a single-page website.
- Use Static-First Next.js Architecture with TypeScript, Tailwind CSS, static content files, and a lightweight API route for Consultation Form submission.
- Use Static Content Source for research articles, service cases, FAQ, and service data in the first phase.
- Do not build a CMS backend in the first phase.
- Primary Navigation must be: 首页, 核心业务, 服务案例, 映盛研究院, 映盛文化, 关于映盛, 加入我们, FAQ.
- Homepage hero must use the confirmed Homepage Hero Message: H1 “让品牌增长，回到真实用户关系”, with supporting copy explaining the six Core Service Lines and long-term growth positioning.
- Primary CTA is Consultation CTA: “咨询合作”.
- Secondary CTAs are “查看核心业务” and “查看服务案例”.
- Homepage service summaries must include title, one value sentence, and inline service keywords.
- Homepage service summaries must not include representative client names.
- Representative clients belong at the end of each Service Detail Page.
- Public Core Service Lines are limited to six: User Operations, Word-of-Mouth Marketing, Social Media Marketing, Live Streaming and Short-Video Marketing, Interactive Public Relations, Digital Channel Construction.
- GEO Optimization Service influences information architecture but must not be shown as a seventh public service line in the first phase.
- Service Detail Pages should include overview, service content, platforms, target customers, business modules, representative clients, service-specific FAQ when useful, and Consultation CTA.
- Service Cases should use a consistent content structure: client background, related service line, challenge, solution, execution content, and Case Result.
- Case Result must be present but does not require quantified metrics when confidential.
- Yingsheng Research Institute must contain industry insights, marketing methodology, platform trends, and brand growth research; it must not become company news.
- About Yingsheng must focus on trust and entity clarity.
- Yingsheng Culture must focus on employer branding.
- Careers Page must serve Job Candidates with company introduction, business direction, team culture, growth opportunities, open-role entry points, and application channels.
- FAQ must be low-prominence but publicly accessible, readable by humans, and crawlable by AI/search systems.
- Do not create hidden crawler-only FAQ content or cloaking behavior.
- GEO Content Layer should include company facts, service Q&A, clear headings, crawlable text, structured data, metadata, sitemap, and robots configuration.
- Consultation Form fields are name, company, contact method, service interest, and demand description.
- Lead Notification sends submissions to a designated business email in the first phase and leaves room for future WeCom notification.
- Do not integrate CRM in the first phase.
- Privacy Policy Page is required and must be linked near the Consultation Form submit action and in the footer.
- Visual Tone must be professional, modern, restrained, and energetic enough to reflect digital marketing expertise.
- Avoid pure technology style, flashy gradient style, traditional corporate template, and overly youthful or playful presentation.

### Proposed Build Modules

- Content model module: validates and exposes service, case, research, FAQ, navigation, and company facts data from Static Content Source.
- Site shell module: shared layout, Primary Navigation, footer, responsive containers, CTA placement, and visual tone primitives.
- SEO/GEO module: page metadata, structured data, sitemap, robots, canonical URLs, breadcrumbs, FAQ schema, and organization schema.
- Service pages module: homepage service summaries, core services index, and six Service Detail Pages.
- Case pages module: service case listing, case detail template, and Case Result rendering.
- Research module: Yingsheng Research Institute listing and article template.
- Employer-branding module: Yingsheng Culture and Careers Page.
- Trust/entity module: About Yingsheng, company facts, contact paths, credentials/honors when available.
- Lead module: Consultation Form validation, submission API route, Lead Notification, success/error states, and privacy link.
- Design system module: typography, spacing, color tokens, responsive rules, motion conventions, buttons, cards, form fields, and section layouts.

## Testing Decisions

- Tests should focus on externally visible behavior: rendered content, route availability, form behavior, metadata output, structured data validity, and responsive usability. They should not assert internal implementation details such as component names or private helper structure.
- Content model tests should verify required fields for services, cases, research articles, FAQ, navigation, and company facts.
- SEO/GEO tests should verify every public page has title, description, canonical URL where applicable, crawlable text, and correct structured data for relevant page types.
- Routing tests should verify homepage, service pages, case pages, research pages, culture, about, careers, FAQ, consultation, and privacy pages are reachable.
- Service page tests should verify representative clients appear on Service Detail Pages and do not appear inside Homepage Service Summaries.
- Case page tests should verify every Business Case includes challenge, solution, execution, and Case Result.
- FAQ tests should verify FAQ content is publicly rendered in HTML and not hidden as crawler-only content.
- Consultation Form tests should verify required field validation, successful submission behavior, error states, privacy policy link presence, and payload shape sent to the API route.
- Lead Notification tests should mock email delivery and verify the business email notification is built from the submitted form data without integrating CRM.
- Accessibility checks should cover heading hierarchy, keyboard navigation, link names, form labels, color contrast, and mobile layout.
- Visual regression or Playwright screenshot checks should cover desktop and mobile views for homepage, service detail, case detail, FAQ, consultation form, and careers page.
- No prior application tests exist in the current workspace, so the first implementation should establish the testing pattern alongside the Next.js setup.

## Out of Scope

- CMS backend.
- CRM integration.
- Public GEO Optimization Service page as a seventh service line.
- Hidden crawler-only FAQ or cloaking content.
- Full bilingual or English website.
- Complex recruiting system or job board.
- User accounts, login, dashboards, or customer portals.
- Payment, ecommerce checkout, or self-service purchasing.
- Full WeCom notification integration unless explicitly added after first-phase email notification.
- Large-scale analytics warehouse or CDP integration.
- Hard dependency on quantified case metrics when client data is confidential.

## Further Notes

- The current workspace is not a git repository and has no GitHub remote, so this PRD cannot yet be published to GitHub Issues via `gh issue create`.
- Once the repo exists on GitHub, publish this PRD as an issue and apply the `ready-for-agent` label.
- Existing domain vocabulary lives in `CONTEXT.md` and should remain the source of truth for future implementation.
- The implementation should preserve the distinction between GEO Authority Source and GEO Optimization Service: the website must be GEO-ready, but GEO is not a public service line in the first phase.
