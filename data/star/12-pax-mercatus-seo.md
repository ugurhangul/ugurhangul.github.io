# STAR — Pax Mercatus: AI-Powered SEO Analysis Platform

> **Company:** HAUS Technology (personal venture)
> **Period:** 2025 – Present
> **Role:** Founder & Sole Architect
> **Evidence:** 69 commits, 28 PRs in `project-pax-mercatus` repository

| PR # | Feature | Ticket |
|------|---------|--------|
| #2 | AI Provider Interface — interfaces and selector | PM-37 |
| #3 | Gemini Provider with gemini-1.5-flash model | PM-39 |
| #4 | OpenAI Provider with gpt-4o-mini model (fallback) | PM-38 |
| #5 | Meta Generation with Turkish SEO prompts | PM-41 |
| #6 | SEO Scoring Algorithm with weighted category scorers | PM-35 |
| #8 | SEO Issue Detection Engine with 7 analyzers | PM-33 |
| #9 | Quick-Win Generator with AI suggestions and priority scoring | PM-34 |
| #11 | Subscription Entity with premium gates and tier limits | PM-62 |
| #12 | SignalR Real-time Hub with crawl and notification publishers | PM-72 |
| #14 | Keyword NLP Extraction with cannibalization detection | PM-61 |
| #15 | Excel/CSV export for SEO issues and quick-wins | PM-32 |
| #16 | PDF export for SEO reports with QuestPDF | PM-82 |
| #17 | Competitor Analysis AI with page comparison | PM-76 |
| #18 | Excel/CSV Product Import with ClosedXML and CsvHelper | PM-73 |
| #21 | Google Search Console Integration | PM-79 |
| #22 | Google Merchant Center Integration | PM-80 |
| #23 | Python Cloudflare Bypass with fallback pattern | PM-64 |
| #24 | Category Mapping AI with two-stage approach | PM-77 |
| #25 | AI Keyword Extraction endpoint | PM-83 |
| #26 | Sitemap URL Storage and Health Check | PM-145 |
| #27 | Sitemap UI — Display Health Status and Cross-Check | PM-158 |
| #28 | Comprehensive Sitemap Health Validation | PM-167 |

---

## Situation

Small and medium-sized businesses in Turkey lack affordable SEO tooling. Enterprise tools like Ahrefs and SEMrush are **expensive** ($99–$449/month) and **English-first** — they don't optimize for Turkish language nuances, character sets, or local search behavior. Turkish businesses struggle to improve their organic search visibility without dedicated SEO specialists. No affordable, **AI-powered, Turkish-focused** SEO platform existed in the market.

## Task

I set out to build a **complete SEO analysis platform** from scratch as a solo founder:

- Web crawling with intelligent content analysis
- AI-powered SEO issue detection and fix suggestions (in Turkish)
- Google Search Console and Merchant Center integrations for real performance data
- Keyword NLP extraction with cannibalization detection
- Subscription tiers with premium gating
- Professional PDF/Excel report generation
- Real-time crawl progress feedback

## Action

### Clean Architecture (5-Project Solution)
- Designed the platform following **Clean Architecture** principles:
  - **`PaxMercatus.Domain`** — Entities: Site, Page, SeoIssue, Keyword, Subscription, Product
  - **`PaxMercatus.Application`** — Services, MassTransit consumers, DTOs, scoring logic
  - **`PaxMercatus.Infrastructure`** — EF Core, Google API clients, AI SDK integrations
  - **`PaxMercatus.Api`** — REST endpoints + SignalR hubs
  - **`PaxMercatus.Shared`** — Cross-cutting concerns
  - **`frontend`** — React + Zustand dashboard

### AI Provider Abstraction (PRs #2–#5)
- Designed **Strategy pattern** for AI provider selection *(PR #2: `ae5f677` "AI Provider Interface — interfaces and selector")*
- Implemented **Gemini provider** with `gemini-1.5-flash` as primary model *(PR #3: `9923f3c`)*
- Implemented **OpenAI provider** with `gpt-4o-mini` as automatic fallback *(PR #4: `3968761`)*
- Built **token usage tracking** per request for cost monitoring
- Created **Meta Generation endpoint** with Turkish-specific SEO prompts *(PR #5: `3b39c91`)*

### 7-Analyzer SEO Issue Detection Engine (PR #8)
- Built a modular **SEO Issue Detection Engine** with 7 independent analyzers *(PR #8: `0449901`)*:
  1. **Title Analyzer** — length, uniqueness, keyword presence
  2. **Meta Description Analyzer** — length, call-to-action, keyword density
  3. **H1 Tag Analyzer** — presence, count, content quality
  4. **Image Analyzer** — alt text presence, file size, lazy loading
  5. **Link Analyzer** — internal/external ratio, broken links, anchor text
  6. **Schema Markup Analyzer** — structured data presence and validity
  7. **Performance Analyzer** — Core Web Vitals integration
- Implemented **comprehensive SEO analysis** with HTML parsing and issue persistence *(commit: `fe989f8`)*

### Weighted SEO Scoring Algorithm (PR #6)
- Designed a **weighted scoring algorithm** with category-level scorers *(PR #6: `91a478a`)*
- Each analyzer contributes a weighted score to produce an **overall SEO health score** per page
- Implemented **page analysis consumer** with SEO scoring and crawl progress *(commit: `f2a1143`)*

### Quick-Win Generator with AI (PR #9)
- Built a **Quick-Win Generator** that uses AI to prioritize fixes by business impact *(PR #9: `757efff`)*
- AI analyzes detected issues and produces **actionable, prioritized fix suggestions**
- Priority scoring considers effort vs. impact for each recommendation

### Competitor Analysis AI (PR #17)
- Implemented **AI-powered competitor analysis** with page-by-page comparison *(PR #17: `56c313c`)*
- Compares target site SEO metrics against competitor pages to identify gaps

### Category Mapping AI (PR #24)
- Built **two-stage AI category mapping** — first classifies content, then maps to taxonomy *(PR #24: `edc2efb`)*

### Web Crawling Pipeline
- Implemented **crawl orchestration** with MassTransit consumers:
  - `CrawlOrchestrator` → `PageAnalysisConsumer` (per page) → `SitemapHealthConsumer`
  - *(Commits: `8a06e47`, `ca11c6d`, `7fa4e0d`)*
- Built **robots.txt parsing and platform detection** before crawling to respect server rules *(commit: `8a06e47`)*
- Implemented **Cloudflare bypass** via Python sidecar with fallback patterns *(PR #23: `4dd2793`)*
- **Lighthouse audit integration** per page feeding into SEO scoring *(commits: `a9e9f38`, `4152612`, `7fab5e6`)*

### Sitemap Health Validation (PRs #26–#28)
- Built **sitemap URL storage and health checking** *(PR #26: `e0d4164`)*
- Implemented **sitemap UI** with health status and cross-check *(PR #27: `bc764f8`)*
- Added **comprehensive sitemap validation** — cross-validating crawled pages against declared sitemap URLs *(PR #28: `6b64112`)*

### Real-Time Progress via SignalR (PR #12)
- Built **`CrawlProgressHub`** with SignalR for real-time crawl progress *(PR #12: `ab4107e`)*
- Each MassTransit consumer publishes progress events pushed to connected clients
- Frontend **Zustand store** manages crawl state reactively *(commit: `d76b901`)*
- Users see live feedback: pages discovered, analyzed, scored — all in real time

### Google Integrations (PRs #21–#22)
- Integrated **Google OAuth** for secure authentication *(commit: `749121b`)*
- Built **Google Search Console integration** for real search performance data *(PR #21: `c3edeef`)*
- Built **Google Merchant Center integration** for product feed data *(PR #22: `042427e`)*
- Created SEO dashboard with Search Console, keyword, product, and analytics views *(commit: `f7da806`)*

### Keyword NLP Extraction (PRs #14, #25)
- Implemented **keyword NLP extraction** with cannibalization detection *(PR #14: `755e208`)*
- Built dedicated **AI keyword extraction endpoint** *(PR #25: `dec30c1`)*
- Detects when multiple pages compete for the same keywords

### Subscription & Premium Gating (PR #11)
- Designed **subscription entity** with tier-based limits *(PR #11: `77fa442`)*
- Premium gates control access to advanced features: AI suggestions, competitor analysis, PDF export
- Site detail page includes subscription overview *(commit: `ce97a29`)*

### Report Generation (PRs #15–#16, #18)
- Built **PDF report generation** with QuestPDF for professional SEO reports *(PR #16: `c0396f4`)*
- Implemented **Excel/CSV export** for SEO issues and quick-wins via ClosedXML + CsvHelper *(PR #15: `2bca724`)*
- Created **Excel/CSV product import** for e-commerce product data *(PR #18: `94d2ef5`)*

### Frontend Dashboard
- Built complete **React + Zustand** dashboard with:
  - Site management with activity and health distribution *(commit: `841c652`)*
  - Page detail views with Core Web Vitals metrics *(commit: `b1ed8dd`)*
  - SEO issue grouping and real-time crawl updates *(commit: `b4d907b`)*
  - Authentication with Google OAuth *(commit: `5c41954`)*

## Result

- **69 commits across 28 PRs** delivering a full SEO platform from zero
- **Multi-AI provider** architecture with Strategy pattern: Gemini primary, OpenAI fallback
- **7 independent SEO analyzers** with weighted scoring algorithm
- **AI-powered Quick-Win Generator** prioritizing fixes by business impact
- **Real-time crawling UX** via SignalR + MassTransit event-driven pipeline
- **Google Search Console + Merchant Center** integrations for real performance data
- **Keyword NLP extraction** with cannibalization detection
- **Cloudflare bypass** via Python sidecar for hard-to-crawl sites
- **Professional PDF/Excel reports** with QuestPDF and ClosedXML
- **Subscription tiers** with premium gating for monetization
- **Competitor analysis AI** and **category mapping AI** for advanced insights
- **Sitemap health validation** cross-checking crawled pages against declared URLs
- Clean Architecture with full separation of concerns across 5 backend projects

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about working with AI/ML" | Multi-AI Strategy pattern (Gemini + OpenAI), Turkish SEO prompts, keyword NLP |
| "How do you integrate third-party APIs?" | Google OAuth + Search Console + Merchant Center, AI providers, Lighthouse |
| "Tell me about a product you built end-to-end" | 69 commits, 28 PRs, crawling → analysis → AI → reports → subscription |
| "Tell me about event-driven architecture" | MassTransit consumers for crawl orchestration, SignalR for real-time UX |
| "How do you handle long-running processes?" | Async crawl pipeline with per-page consumers, progress events, Zustand state |
| "How do you design for extensibility?" | Strategy pattern for AI, modular analyzers, Clean Architecture layers |
| "How do you monetize a SaaS product?" | Subscription tiers with premium gates, feature-level access control |

---

## Key Technologies

`C#` · `.NET` · `Clean Architecture` · `MassTransit` · `RabbitMQ` · `SignalR` · `Entity Framework Core` · `PostgreSQL` · `Google APIs` · `OpenAI API` · `Google Gemini API` · `QuestPDF` · `ClosedXML` · `CsvHelper` · `Lighthouse` · `Python` · `React` · `Zustand` · `NLP` · `Strategy Pattern`
