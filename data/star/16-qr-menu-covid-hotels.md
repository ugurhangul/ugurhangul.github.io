# STAR — Contactless QR Menu System: COVID-19 Hotel Dining Solution

> **Company:** Clockwork Agency
> **Period:** Feb 2022 – Apr 2023
> **Role:** Lead Developer
> **Evidence:** 36 personal commits across 4 repositories + hotel site integrations

| Repository | Personal Commits | Total Team | Description |
|------------|-----------------|------------|-------------|
| `clockwork.qrmenu` | **7** | 102 | Shared API & backend engine |
| `qr.akrahotels` | **11** | 222 | Akra Hotels branded instance |
| `qr.alibey.com` | **6** | 163 | Alibey Hotels branded instance |
| `qr.ethnohotels.com` | **12** | 385 | Ethno Hotels branded instance |
| **Total** | **36** | 872 | |

---

## Situation

During the **COVID-19 pandemic**, Turkey's hospitality industry faced urgent requirements for contactless dining. Hotels needed to replace physical menus with QR code-based digital alternatives to comply with health regulations and reassure guests. Multiple hotel clients at Clockwork Agency — **Akra Hotels** (Antalya's premium city hotel), **Alibey Hotels** (resort chain), and **Ethno Hotels** — all needed this capability simultaneously. Building separate systems for each hotel would be wasteful; building a one-size-fits-all solution wouldn't accommodate brand identity.

## Task

Build a **reusable QR menu system** that:

- Provides a shared backend API for menu management
- Supports hotel-specific branding (logos, colors, layout)
- Deploys as independent branded instances per hotel
- Integrates QR menu access into each hotel's main website
- Delivers rapidly — hotels needed this within weeks, not months

## Action

### Shared API Engine (`clockwork.qrmenu`)
- Built the **core QR menu API** with .NET backend and database *(commit: `620dd0a` — "Initial Commit")*
- Implemented **API endpoints** for menu data retrieval *(commit: `2f92e82` — "api implemented dirty")* — rapid development under pandemic pressure
- Set up new database for menu content management *(commit: `c5a4388`)*
- Configured **publish profiles** for staging and production deployment *(commits: `ff43b9f`, `641fd50`)*
- API handles: menu categories, items, pricing, descriptions, allergen info, and availability

### Akra Hotels Instance (`qr.akrahotels`)
- Deployed **branded Umbraco CMS instance** for Akra Hotels *(commit: `42c953d` — "first")*
- Configured Umbraco CMS for Akra-specific content *(commit: `1342503`)*
- Added **Akra brand logos** *(commit: `ca761da`)*
- Activated **URL segment** support for SEO-friendly menu links *(commit: `41eca36`)*
- Added URL to directory listing *(commit: `26a9a91`)*
- Built **navigation** and **icon list** components *(commits: `b039aca`, `ec535e0`)*
- Property naming and cache cleanup *(commits: `5b5ec5f`, `a7fdeae`)*
- Integrated QR menu links into **main Akra Hotels website**:
  - Added QR menu section *(commit on akrahotels.com: `a26bfc5` — "QR Added, umbraco updated")*
  - QR and Asmani restaurant integration *(commit: `edddf8f`)*
  - QR menu list page *(commit: `859ed3e` — "qrmenu list")*

### Alibey Hotels Instance (`qr.alibey.com`)
- Deployed **branded instance** split from template project *(commit: `0123748` — "project splitted template project")*
- Configured project naming and gitignore *(commit: `c42c08f`)*
- Set up **publish profile** and uSync content sync *(commit: `82c6766`)*
- Shared initial commit and DB with core system *(commits: `620dd0a`, `c5a4388`)*

### Ethno Hotels Instance (`qr.ethnohotels.com`)
- Deployed **branded instance** with Ethno-specific branding *(commit: `42c953d` — "first")*
- Full Umbraco CMS configuration *(commit: `1342503`)*
- **Ethno brand logos** *(commit: `ca761da`)*
- URL segment activation, navigation, icon list — same component architecture *(commits: `41eca36`, `b039aca`, `ec535e0`)*
- Solution naming for Ethno *(commit: `5f206c1`)*
- Cache and property management *(commits: `5b5ec5f`, `a7fdeae`)*

### Reusable Architecture Pattern
The system follows a **hub-and-spoke** architecture:
- **Hub**: `clockwork.qrmenu` — single API serving all hotels
- **Spokes**: Per-hotel Umbraco CMS instances with branded templates
- **Template project**: New hotels deployed by splitting from the template *(commit: `0123748`)*
- Each spoke connects to the shared API with hotel-specific configuration
- Consistent component architecture (navigation, icon list, URL segments) reused across all instances

## Result

- **36 personal commits** across 4 repositories, delivering a multi-hotel QR menu system
- **3 hotel chains** deployed: Akra Hotels, Alibey Hotels, Ethno Hotels
- **Shared API** eliminates code duplication — menu management logic maintained once
- **Template-based deployment** — new hotel instances deployed by splitting from the template project
- **Rapid delivery** during COVID-19 pandemic — built and deployed within weeks
- **QR menu integration** into main hotel websites for seamless guest experience
- **872 total team commits** across all instances — the system grew significantly after initial deployment
- Directly addressed **COVID-19 health requirements** for Turkey's hospitality industry

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about adapting to market changes" | COVID-19 → contactless dining need → built reusable QR menu system in weeks |
| "How did COVID affect your work?" | Direct impact — built health-compliant solution for hotel clients under time pressure |
| "How do you build reusable systems?" | Hub-and-spoke: shared API + branded CMS instances per hotel |
| "Tell me about multi-tenant architecture" | Template-based deployment — split, brand, configure, deploy |
| "How do you handle rapid delivery?" | "api implemented dirty" → iterate → deploy — pragmatic under pandemic pressure |
| "Tell me about a project with multiple stakeholders" | 3 hotel chains, each with brand requirements, served by one system |

---

## Key Technologies

`C#` · `ASP.NET` · `Umbraco CMS` · `.NET API` · `QR Code` · `uSync` · `Multi-Instance Architecture` · `WebDeploy` · `Publish Profiles` · `Hub-and-Spoke Pattern`
