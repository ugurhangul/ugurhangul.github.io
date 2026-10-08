# STAR — Clockwork Umbraco Boilerplate: Agency-Wide Technical Leadership

> **Company:** Clockwork Agency
> **Period:** Oct 2019 – Sep 2024
> **Role:** Senior Software Developer / Team Lead
> **Evidence:** 187 personal commits across 8 boilerplate repositories (Umbraco v8 through v13)

---

## Situation

With over **100+ active client websites** built on Umbraco CMS, starting every new project from scratch was inefficient and error-prone. Each client (Dream Games, Akra Hotels, Gloria, NG Phaselis Bay, İnci Akü, Superfilm, etc.) required standard features: SEO schemas, sitemaps, image optimization, multi-language support, and deployment pipelines. Without a shared foundation, features built for one client weren't easily propagated to others, leading to fragmented codebases and inconsistent quality across the agency portfolio.

## Task

Create, maintain, and evolve the agency's **core Umbraco boilerplate project** across multiple major framework versions (Umbraco 8 through 13), ensuring all new client projects start with production-ready architecture, SEO tooling, image optimization, and content sync out of the box.

## Action

### The Boilerplate Ecosystem
- Created **`Clockwork.Umbraco`** (the v8 foundation) with 104 personal commits
- Maintained a parallel ecosystem of version-specific repositories (8 boilerplate repositories in total) to match the evolving .NET/Umbraco release cycles:
  - `Clockwork.Umbraco.V9` (18 commits) — Transition to .NET 5
  - `clockwork.umbraco.v10` (27 commits) — .NET 6 LTS
  - `clockwork.umbraco.v11` (28 commits) — .NET 7
  - Remaining boilerplate repositories, v12 through v13 (10 commits combined) — Ongoing modernization up to .NET 8
- Ensured a unified standard where **every new agency project inherits from this boilerplate**.

### Reusable Architecture & Components
Built a suite of plug-and-play components shared across the agency:
- **`ImageProcessingModuleWebPValidatorComposer`**: Custom plugin enforcing WebP image optimization with safe fallback validation across all CMS image renders
- **Local Business Schema Generator**: Automated SEO JSON-LD schema generation tailored to client location/contact nodes
- **XML Sitemap Generator**: Dynamic sitemap generation respecting publish/unpublish states and multi-lingual URLs
- **Virtual Node Routing**: Custom routing logic for clean, SEO-friendly URLs that detach from physical CMS node hierarchies
- **Multilingual Routing**: Standardized approach for language detection and URL localization
- **UI Components**: Integrated `Matryoshka` for editor UX, later managing the deprecation and transition to `umb-nav` for modern navigation

### Deployment & Sync Infrastructure
- Integrated and standardized **uSync** across the boilerplate for seamless content and schema deployment between Development, Staging, and Production environments.
- Established baseline configurations for SMTP, TeamCity CI/CD profiles, and environment variables.

## Result

- **100+ enterprise client websites** supported by reusable architecture managed across **8 boilerplate repositories**, successfully built on this consistent, well-maintained foundation (including major brands like Hyundai, Zorlu Center, Ziraat Bank).
- Drastically reduced project spin-up time — typical new project setup reduced from approximately **2 weeks to 2 days**, with SEO, sitemaps, image optimization, and content sync working out of the box.
- **187 personal commits** demonstrating sustained technical leadership, leading **five major platform version upgrades** (Umbraco v8 → v13).
- Established a unified standard where a bug fix or feature developed for the boilerplate instantly benefits all future client builds.

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about technical leadership" | Architected and maintained the core boilerplate used by the entire agency for 100+ projects |
| "How do you manage shared code?" | Centralized boilerplate repositories versioned alongside major framework releases |
| "Tell me about your agency experience" | Led standardizations that reduced project spin-up time and unified quality across major enterprise clients |
| "How do you handle framework upgrades?" | Transitioned the agency through Umbraco 8 to 13 (.NET Framework to .NET 8) with dedicated boilerplate repos |
| "How do you build for scale?" | Creating plug-and-play components (WebP validator, Schema generator) used by dozens of different websites |

---

## Key Technologies

`C#` · `ASP.NET Core` · `Umbraco v8-v13` · `uSync` · `WebP` · `SEO Automation` · `Multi-Language Routing` · `TeamCity` · `Architecture`
