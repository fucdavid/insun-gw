# Yingsheng Company Website Plan

## Goal

Build a Chinese-first, multi-page company website for Yingsheng that serves three audiences in priority order:

1. Potential customers evaluating cooperation
2. AI/search crawlers that need accurate, structured company and service information
3. Job candidates evaluating the company

The website should generate consultation inquiries, act as a GEO authority source, and support employer branding without making recruiting the primary homepage goal.

## Core Positioning

Yingsheng is a digital marketing and user operations service provider for medium and large brands, helping brands achieve long-term growth from public-domain acquisition to private-domain conversion through user growth, content communication, reputation building, interactive public relations, and digital channel construction.

Homepage hero direction:

- H1: `让品牌增长，回到真实用户关系`
- Supporting copy: explain the six service lines and the long-term growth positioning
- Primary CTA: `咨询合作`
- Secondary CTAs: `查看核心业务`, `查看服务案例`

## Target Industries

Automotive is the primary advantage industry and should be used as a strong trust signal.

The website should still make clear that Yingsheng also serves medium and large brands in consumer goods, finance, tourism, and other industries.

## Primary Navigation

- 首页
- 核心业务
- 服务案例
- 映盛研究院
- 映盛文化
- 关于映盛
- 加入我们
- FAQ

## Page Scope

First phase should be a full multi-page website skeleton, not a single-page website.

Required pages:

- Homepage
- Core services index
- Six service detail pages
- Service cases list
- Case detail template
- Yingsheng Research Institute list
- Research article template
- Yingsheng Culture
- About Yingsheng
- Careers
- FAQ
- Consultation/contact page
- Privacy policy

## Core Services

The public website presents six core service lines:

1. 用户运营
2. 口碑营销
3. 社会化媒体营销
4. 直播/短视频营销
5. 互动公关
6. 数字渠道建设

GEO optimization is a future potential service line and should influence information architecture, but it should not appear as a seventh public business in the first phase.

## Homepage Service Presentation

Homepage service summaries should include:

- Service title
- One value sentence
- Inline service keywords

Homepage service summaries should not include representative client names.

Representative clients belong at the end of each service detail page.

## Service Detail Page Structure

Each service detail page should include:

- Service overview
- Service content
- Service platforms
- Target customers
- Business modules
- Representative clients
- Service-specific FAQ when useful
- Consultation CTA

## Service Cases

The homepage should include a service case entry section.

Each business case should use a consistent structure:

- Client background
- Related service line
- Challenge
- Solution
- Execution content
- Result or impact

Case results may use public metrics when available. If metrics are confidential, use qualitative impact statements. A case should still include some result or impact section.

## Yingsheng Research Institute

Yingsheng Research Institute is a professional content section, not a company news section.

It should cover:

- Industry insights
- Marketing methodology
- Platform trends
- Brand growth research

This section supports GEO by publishing expert, crawlable content that clarifies Yingsheng's market perspective and service expertise.

## About, Culture, Careers

About Yingsheng should focus on trust and entity clarity:

- Company positioning
- Service capabilities
- Development history
- Advantage industries
- Customer types
- Contact paths
- Credentials or honors when available

Yingsheng Culture should focus on employer branding:

- Values
- Team atmosphere
- Working style
- Employee activities
- Growth mechanisms
- Office environment

Careers should be a dedicated candidate-facing page with:

- Company introduction
- Business direction
- Team culture
- Growth opportunities
- Open-role entry points
- Application channels

Homepage and navigation should provide lightweight entry points to Careers, without making recruiting the homepage's primary goal.

## GEO Strategy

The website should be a GEO authority source, but must not use hidden crawler-only pages or cloaking.

Use:

- Publicly accessible FAQ
- Company facts
- Service question-and-answer content
- Clear headings
- Crawlable HTML text
- Structured data
- Metadata
- Sitemap
- Robots configuration

FAQ should be a low-prominence but public page. It should be readable by humans and crawlable by AI/search systems.

## Consultation And Lead Handling

Primary CTA: `咨询合作`

The first phase should include:

- Consultation form
- Phone
- Email
- Address
- Optional QR code or WeCom entry

Consultation form fields:

- Name
- Company
- Contact method
- Service interest
- Demand description

Submissions should go to a designated business email in the first phase, with room for future WeCom notification. Do not build a CRM integration in the first phase.

Because the form collects personal information, include a concise privacy policy page and link it near the form submit action and in the footer.

## Content Management

Do not build a CMS backend in the first phase.

Use static content files such as Markdown or JSON for:

- Research articles
- Service cases
- FAQ

The structure should allow a CMS to be added later if content update frequency justifies it.

## Technical Direction

Use a static-first Next.js architecture:

- Next.js
- TypeScript
- Tailwind CSS
- Static content files
- API route for consultation form submission

The site should prioritize crawlable multi-page output rather than a client-only SPA.

## Visual Tone

The visual tone should be professional, modern, and restrained, with enough motion and content energy to reflect digital marketing expertise.

Avoid:

- Pure technology style
- Flashy gradient style
- Traditional corporate template
- Overly youthful or playful presentation

The design should balance enterprise trust with marketing-industry energy.
