# STAR — Hyundai Turkey: Dealer Website (End-to-End Delivery)

> **Company:** Clockwork Agency
> **Period:** Oct 2021 – Nov 2022
> **Role:** Lead Developer (sole backend, CMS & integration developer)
> **Evidence:** 129 personal commits / 276 total in `hyundai` repository

---

## Situation

**Hyundai Turkey** needed a complete dealer-facing corporate website with vehicle catalog, test drive scheduling, video consultation, service menu, campaign management, and location-based dealer routing. The site needed to showcase Hyundai's full vehicle lineup — including the new **EV range** — with proper dealer branch routing for Turkey's regional dealer network. The project required end-to-end delivery: CMS setup, backend development, frontend integration, and deployment.

## Task

Build the **entire Hyundai Turkey dealer website** from scratch using Umbraco CMS:

- Vehicle catalog with model details, pricing, and specifications
- Test drive request forms with dealer routing
- Video consultation ("görüntülü görüşme") scheduling
- Service menu for after-sales
- Campaign management with date-based visibility
- Cookie consent compliance
- Fuel type filtering including dedicated EV tab
- Admin panel for content management
- Multi-language support
- Production deployment pipeline

## Action

### CMS Foundation & Architecture
- Initialized **Umbraco 8.17** CMS project and configured content models *(commits: `fda0c52`, `479672e`)*
- Upgraded to Umbraco 8.17.2 for stability *(commits: `3f746c7`, `04d99cd`)*
- Built **page builder** system for flexible content composition *(commit: `6f72e2f`)*
- Created **DocTypeGrid** editor for structured content editing *(commits: `aa3b44d`, `01cb6ff`)*
- Configured **uSync** for content synchronization *(commit: `52fb81d`)*

### Vehicle Catalog & Models
- Built vehicle model pages with car hero sections *(commits: `87be70c`, `6dcd8bd`, `d6ce479`)*
- Implemented **"Öne Çıkanlar" (Featured)** and technical specifications ("Teknik Donanım") views *(commits: `8dac6de`, `285312a`, `cc76c01`)*
- Created **all cars listing** page *(commit: `e7ed3c4`)*
- Added **VehicleType** filtering for model categorization *(commit: `59cf33a`)*
- Built **Excel import** for price lists with parent ID handling *(commits: `a7cd0dd`, `9c9ed0a`, `0acb213`)*
- Seat color configuration *(commit: `e6360c8`)*
- Price list display with null controls and disable toggle *(commits: `f94fdd3`, `10d20b3`)*

### Fuel Type Filtering (Including EV)
- Implemented **fuel type ("yakıt tipi") filtering** across vehicle catalog *(commits: `7450541`, `4fee9d7`)*
- Added dedicated **electric vehicle (EV) tab** — "elektrik" *(commit: `a802327`)*
- Enables users to filter between petrol, diesel, hybrid, and fully electric models

### Test Drive Request System
- Built **test drive request form** with dealer routing *(commit: `25f95e7`)*
- Test drive frontend integration *(commits: `799f26f`, `3c3475d`)*
- Form handling with validation and success messaging *(commits: `f62b42c`, `af37079`, `ffe4a6b`)*
- "İlgilenen araç" (interested vehicle) null handling *(commit: `4dde310`)*

### Video Consultation ("Görüntülü Görüşme")
- Implemented **video consultation scheduling** system *(commit: `086209b`)*
- Target-based consultation routing *(commit: `9c65388`)*
- Video component for multimedia support *(commit: `1af44cc`)*

### Dealer Branch Routing
- Built **dealer ("bayi") select** system for location-based routing *(commit: `ba0b453`)*
- **Get current branch** logic refined for accurate dealer detection *(commit: `851ba99`)*
- **Redirect for branches** — proper branch-level URL handling *(commit: `85d4a60`)*
- **Bayiler access** management *(commit: `f623abd`)*
- Branch info display *(commit: `7854968`)*

### Service & After-Sales
- Implemented **service menu** ("servis menüsü") *(commit: `f7696b0`)*
- Built **after-sales ("satış sonrası")** links and content sections *(commits: `02f5ab5`, `ff5a0f7`)*
- Insurance ("sigorta") section with null controls *(commits: `8ff364d`, `ebaafc7`)*
- Second-hand vehicles section *(commit: `2662fcf`)*

### Campaign Management
- Built **campaign ("kampanya")** system with start/end date visibility *(commits: `5002673`, `dd24864`)*
- Campaign buttons and meaningful variable naming *(commits: `d812f3a`, `5002673`)*
- **Monthly special offers** ("ayın özel teklifleri") featured media *(commit: `8e4e15f`)*

### Cookie Consent & Compliance
- Implemented **cookie consent popup** for KVKK/GDPR compliance *(commit: `bcdb978`)*

### Admin Panel & Content Management
- Built **admin panel** for dealer content management *(commit: `5283dad`)*
- CMS login configuration *(commit: `579cd9f`)*
- **DB comparison tools** for staging ↔ production sync *(commit: `e9e7bbd`)*

### Frontend Integration
- Integrated frontend assets into source *(commit: `8169474`)*
- Multiple frontend refinement passes *(commits: `332055b`, `70df29e`, `e972ec2`)*
- Banner system with text color, positioning, and RTE support *(commits: `c150f82`, `d567346`, `d0e6bba`, `4336c38`, `d50aa0a`, `084d2d2`, `73e0830`, `45d329c`)*
- News pagination with fix *(commits: `c68c017`, `777052d`)*
- Photo gallery with null controls *(commits: `6388199`, `08e98e2`)*
- Social media integration *(commit: `490a5d6`)*
- Navigation menu fixes with Trello tracking *(commit: `19f3764`)*
- Header address display *(commit: `57857b3`)*
- Phone string formatting *(commit: `90301be`)*

### Deployment & Infrastructure
- Configured **publish profiles** and webdeploy *(commits: `1a6c763`, `1bc78ce`)*
- **SMTP** delivery method configuration *(commit: `1673425`)*
- Models and gitignore production configuration *(commit: `8e23131`)*

## Result

- **129 personal commits** delivering a complete dealer website from CMS setup to production
- **End-to-end delivery**: Umbraco CMS → backend → frontend integration → deployment pipeline
- **Vehicle catalog** with Excel price import, fuel type filtering (including EV tab), and technical specifications
- **Test drive scheduling** with dealer branch routing
- **Video consultation** system for remote dealer engagement
- **Campaign management** with date-based visibility
- **Cookie consent** for KVKK/GDPR compliance
- **Admin panel** with DB comparison tools for staging/production sync
- Delivered for one of the **world's largest automotive brands** under Clockwork Agency

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about building a full website from scratch" | 129 commits, Umbraco CMS, vehicle catalog, forms, deployment — end to end |
| "Tell me about end-to-end delivery" | CMS setup → models → forms → frontend → admin → SMTP → deploy in one project |
| "How do you handle content management?" | Umbraco CMS with DocTypeGrid, uSync, page builder, Excel import |
| "Tell me about automotive/enterprise clients" | Hyundai Turkey — vehicle catalog, test drive, EV filtering, dealer routing |
| "How do you handle form processing?" | Test drive + video consultation forms, validation, success messaging, dealer routing |
| "How do you handle compliance?" | Cookie consent popup for KVKK/GDPR |

---

## Key Technologies

`C#` · `ASP.NET` · `Umbraco 8` · `JavaScript` · `jQuery` · `SMTP` · `Excel Import` · `uSync` · `DocTypeGrid` · `WebDeploy` · `reCAPTCHA` · `Cookie Consent` · `Multi-Language`
