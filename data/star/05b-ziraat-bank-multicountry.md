# STAR — Ziraat Bank Multi-Country CMS Infrastructure

> **Company:** Clockwork Agency (client: Ziraat Bankası)
> **Period:** Oct 2019 – Sep 2024
> **Role:** Senior Software Developer
> **Evidence:** 140+ personal commits across 25 repositories

| Repository Group | Personal Commits | Repos |
|-----------------|-----------------|-------|
| `clockwork.ziraat` (core) | **36** | Core shared CMS (865 total team commits) |
| `ziraat-teknoloji-umbraco` | 7 | Ziraat Technology subsidiary |
| Country sites (15+) | 73 | Germany, Azerbaijan, Bahrain, Bosnia, Georgia, Iraq, Kosovo, Russia, Turkmenistan, Uzbekistan |
| Subsidiaries | 51 | Yatırım (11), Filo (16), GSYO (8), GYO (3), Portföy (6), Spor Kulübü (6), FX |
| Shared infrastructure | 5 | `zfg-cms-api`, `zfg-cms-app`, `zfg-management-domain`, `zfg-management-models`, `zfg-montenegro` |

---

## Situation

Ziraat Bankası — **Turkey's largest state-owned bank** — operates subsidiaries in **15+ countries** including Germany, Azerbaijan, Bahrain, Bosnia, Georgia, Iraq, Kosovo, Russia, Turkmenistan, and Uzbekistan, plus domestic subsidiaries (Ziraat Yatırım, Portföy, GYO, GSYO, FX, Filo, Spor Kulübü). Each entity needed a **corporate website** with country-specific content, localized currency displays, fund portfolio data, Bankkart application flows, and regulatory compliance — all while sharing a common CMS infrastructure to keep development costs manageable. The bank required strict security controls: encrypted configuration, CAPTCHA-protected content, user approval workflows, and bot detection across all sites.

## Task

As the developer responsible for the Ziraat account, I was tasked with:

- Building and maintaining the **shared CMS core** (`clockwork.ziraat`) used across all 25+ deployments
- Creating custom Umbraco backoffice plugins for content management
- Implementing Bankkart application flows with validation
- Building user approval workflows for content editors
- Integrating fund portfolio data retrieval and display
- Managing environment-specific encrypted SMTP configurations
- Deploying and customizing 15+ country-specific sites
- Implementing bot detection (CAPTCHA) across all properties
- Ensuring regulatory compliance for banking websites across jurisdictions

## Action

### Core CMS Platform (36 commits on `clockwork.ziraat`)

#### ClockworkUploader — Custom Backoffice Plugin
- Built **`ClockworkUploader`** — a custom Umbraco backoffice plugin for file upload and document management *(commit: `f07d76c5`)*
- Added **"Uploaded Files Viewer"** feature for browsing and previewing uploaded documents inline *(commit: `ed9e7833`)*
- Cleaned up excessive logging and redundant HTML in plugin components *(commit: `d0e0dcf1`)*

#### Bankkart Application System
- Implemented **Bankkart application validation and error handling** — form submission with field-level validation, error messages, and server-side checks *(commit: `5d741a4e`)*

#### User Approval Workflow
- Built **user approval workflow** with `UserSavingNotification` handler for managing editor approval states *(commit: `bfb63c7f`)*
- Implemented state transitions: unapproved on creation, lockout handling *(commits: `5e599dfc`, `ea441adc`)*
- Set invite date to null and confirm email on user updates *(commit: `17ba810f`)*
- Refactored user state check logic *(commit: `b9a6536a`)*
- Added `AccountController` with user verification URL *(commit: `26d9a3fb`)*

#### Fund Portfolio Integration
- Integrated **fund portfolio data retrieval** from Ziraat financial services and built UI display components *(commit: `3010951e`)*
- Added generated models for fund content with block list updates *(commit: `62ce8d29`)*

#### Encrypted SMTP Configuration
- Implemented **environment-specific configuration** files with variable handling *(commit: `2beaa39f`)*
- Added **encryption/decryption for sensitive configuration data** — SMTP credentials, API keys *(commit: `2269e258`)*
- Built SMTP configuration across environments *(commits: `8ddad0ea`, `8e077ea0`)*
- Updated SMTP settings with improved fallback handling *(commit: `0034db78`)*
- Fixed email recipient handling with delimiter and validation improvements *(commits: `da787939`, `f3a19a87`, `9eabff74`)*

#### Content & Navigation
- Refactored CurrencyController for consistency *(commits: `3c315a95`, `17ebfc1d`)*
- Updated footer navigation to use `NewsTitle` content children *(commits: `828b1aff`, `d92ddbcb`)*
- Refactored content handling and logging in providers *(commit: `a6675a42`)*
- Improved main page retrieval logic *(commit: `478c98c0`)*
- Custom URL provider with domain support *(commits: `b59cc517`, `d8e5ee33`)*

### Ziraat Technology Subsidiary (7 commits on `ziraat-teknoloji-umbraco`)
- Added **cookie consent** with configurable `EnableCookie` property *(commit: `c4c5bf6`)*
- Built **career form handling** with `CareerFormModel` *(commit: `7f1e9bb`)*
- Refactored **background queue** to support scoped service resolution *(commit: `17f1344`)*
- Cleaned up obsolete career days form configurations *(commit: `3c0d01c`)*
- Enabled untrusted certificate allowance for deployment *(commit: `e27115a`)*

### Multi-Country Deployments (15+ countries)

#### Bot Detection & Security
- Deployed **ZiraatBotDetect** (CAPTCHA) across multiple country sites:
  - Azerbaijan *(commits: `a267215`, `b4131e4`)*
  - Yatırım *(commit: `a4eb982`)*
  - GSYO *(commit: `5067939`)*
  - Portföy *(commit: `8a06489`)*
- Implemented content security policies (CSP) *(commit: `3c7d39e` on Spor Kulübü)*
- Google ad services policy *(commit: `29cf60d` on Bosnia)*

#### Country-Specific Customizations
- **Germany** (`zfg-ziraatalmanya`, 7 commits): Mobile responsive fixes, online banking link updates, bundle optimization
- **Azerbaijan** (`zfg-ziraatazerbaijan`, 7 commits): Maps cluster display, currency visibility filtering *(commits: `4c3d1e3`, `b36a57f`)* — hide unavailable/valueless currencies
- **Bahrain** (`zfg-ziraatbahrain`, 4 commits): Address updates, deployment configuration
- **Bosnia** (`zfg-ziraatbosnia`, 5 commits): Kobi (SME) feature toggling, Kestrel configuration, Google Maps integration
- **Iraq** (`zfg-ziraatiraq`, 2 commits): Country-specific content
- **Kosovo** (`zfg-ziraatkosovo`, 4 commits): Dependencies management, address configuration
- **Russia** (`zfg-ziraatrussia`, 2 commits): Localized content
- **Turkmenistan** (`zfg-ziraatturkmenistan`, 1 commit): Regional adaptation
- **Uzbekistan** (`zfg-ziraatuzbekistan`, 6 commits): Virtual reception, Tehran representative office, localized contact information

### Domestic Subsidiaries

#### Ziraat Filo (Fleet Management — 16 commits)
- Implemented **Payten payment integration** (version 3) *(commit: `9e962b6`)*
- Built **"Hemen Öde" (Pay Now)** functionality *(commit: `22ac75d`)*
- Managed domain migration: `centraltr.com` → `ziraatfilo.com.tr` *(commit: `2a90570`)*
- Updated brand name to "Ziraat Filo Yönetimi ve Mobilite Çözümler A.Ş" *(commit: `e8ad285`)*
- Contact information, social media, and location management *(commits: `382278b`, `7566b3a`, `2d05588`)*

#### Ziraat Yatırım (Investment — 11 commits)
- YouTube integration, MediatR pattern implementation *(commits: `6285ebd`, `b352e35`)*
- Branch address management for domestic and international locations *(commits: `890e81c`, `8d9d180`)*
- Maps API integration *(commit: `693ddcc`)*

#### Other Subsidiaries
- **GSYO** (8 commits): Phone, maps, address management, DLL management
- **Portföy** (6 commits): MediatR implementation, fax removal, address updates
- **Spor Kulübü** (6 commits): CSP headers, address and contact management
- **GYO** (3 commits): Address and configuration updates

### Shared Infrastructure
- Contributed to `zfg-cms-api` — the shared content API consumed by all country sites *(2 commits)*
- Maintained `zfg-management-domain` and `zfg-management-models` — shared domain models *(2 commits)*

## Result

- **25+ banking websites** running on shared Umbraco CMS infrastructure across **15+ countries**
- **140+ personal commits** across 25 repositories maintaining the entire Ziraat ecosystem
- **ClockworkUploader plugin** enabled content editors to manage documents directly in Umbraco backoffice
- **User approval workflow** ensured only verified editors could publish content on banking sites
- **Encrypted SMTP** protected sensitive email credentials across all environments
- **ZiraatBotDetect** (CAPTCHA) deployed across 5+ properties to prevent automated attacks
- **Fund portfolio integration** connected CMS to live financial data feeds
- **Bankkart application flow** with validation served online banking product applications
- Shared CMS core **reduced per-country development cost** — new country sites inherited all shared components
- **Payten payment integration** enabled online payments for Ziraat Filo fleet services
- Maintained compliance with banking regulations across 15+ jurisdictions

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about multi-tenant architecture" | 25+ banking sites on shared CMS core, 15+ countries, shared API |
| "How do you handle localization at scale?" | Country-specific repos inheriting shared infrastructure, currency filtering, address localization |
| "Banking experience?" | Bankkart application, fund portfolio, user approval workflows, encrypted config |
| "How do you handle security in web apps?" | Encrypted SMTP, CAPTCHA/BotDetect, user approval states, CSP headers |
| "Tell me about building reusable components" | ClockworkUploader plugin, shared CMS core, per-country inheritance model |
| "How do you manage many deployments?" | 25 repos with shared infrastructure layer, environment-specific configuration |

---

## Key Technologies

`C#` · `Umbraco CMS` · `ASP.NET Core` · `MediatR` · `Entity Framework` · `SQL Server` · `SignalR` · `Payten Payment` · `CAPTCHA/BotDetect` · `SMTP Encryption` · `Docker` · `Kestrel` · `Multi-Country Deployment` · `Fund Portfolio API`
