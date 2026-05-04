# STAR — Zorlu Center: Salesforce CRM Integration & Shopping Mall Website

> **Company:** Clockwork Agency
> **Period:** Jan 2020 – Sep 2022
> **Role:** Lead Developer
> **Evidence:** 67 personal commits / 421 total in `zorlucenter` repository

---

## Situation

**Zorlu Center** — one of Istanbul's most premium shopping, entertainment, and residential complexes — needed their corporate website to serve both marketing and lead generation purposes. The marketing team was manually processing form submissions (contact requests, campaign registrations) and had no direct connection to their **Salesforce CRM**. Form data lived in the CMS database with no easy way to export for analytics. The site also needed campaign management, SEO-friendly URLs, and modern image optimization (WebP).

## Task

Integrate the Zorlu Center Umbraco website with **Salesforce CRM** for automated lead flow, add form data export for marketing analytics, implement WebP image processing, and build CMS-managed campaign pages — all while maintaining the existing site and performing progressive Umbraco upgrades.

## Action

### Salesforce CRM Integration
- Built **Salesforce API integration** pushing form submissions directly to CRM *(commit: `538f337` — "salesforce done")*
- Implemented **CRM field mapping** with `crmvalue` attribute on form options — each form field maps to a Salesforce lead field *(commit: `9ac6698`)*
- Created Salesforce models for typed API communication *(commit: `f51a7bb`)*
- Configured content-type headers and request formatting *(commit: `1c70889`)*
- Iterative Salesforce refinement *(commit: `95464f7`)*
- **Result**: Form submissions flow directly to Salesforce without developer intervention — marketing team manages field mapping via CMS

### Form Data Export (OpenXML)
- Implemented **`ExportForms`** functionality for offline form data analysis *(commit: `b175c7b`)*
- Added **`ArrayToExcel`** library for structured Excel export *(commit: `2e4e91f`)*
- Updated **`DocumentFormat.OpenXml`** for compatibility *(commit: `f63f6fd`)*
- Marketing team can export form submissions as Excel files for campaign analytics

### WebP Image Processing Plugin
- Built **`ImageProcessingModuleWebPValidatorComposer`** — custom Umbraco plugin for WebP image handling *(commit: `67efbd2`)*
- Added **`File.Exist`** validation on WebP plugin to prevent 404 errors for missing images *(commit: `1c70889`)*
- Improves page load performance with modern image format support

### Campaign Management ("Kampanyalar")
- Built CMS-driven **campaign pages** *(commits: `6f46061`, `6f25800`)*
- Campaign content fully manageable by marketing team without developer intervention
- Shopping mall campaigns (store promotions, seasonal events) rendered dynamically

### Virtual Node Routing (SEO)
- Implemented **custom virtual node routing** for SEO-friendly URLs *(commit: `2760fe8`)*
- Added **multiple virtual node functionality** for complex URL patterns *(commit: `9b71d85`)*
- Virtual node helpers for URL generation *(commit: `3d82d73`)*
- Enables clean URLs like `/stores/brand-name` instead of CMS node paths

### CMS Platform Evolution (Umbraco 7 → 8)
- **Migrated from Umbraco 7 to 8** with multi-language support and Clockwork.Umbraco.Forms *(commit: `d32d206`)*
- Progressive upgrades through multiple Umbraco versions:
  - 8.5.3 → 8.7.0 *(commit: `25c764b`)* — cleaned project, added plugins, admin panel URL rewrite
  - 8.7.0 → 8.8.0 *(commit: `2c38e59`)*
  - 8.8.0 → 8.9.1 *(commit: `4e0b97d`)*
  - 8.9.1 → 8.10.1 *(commit: `e8f9fce`)*
- Each upgrade included testing, plugin compatibility verification, and cleanup

### Forms & Mail Handling
- Implemented **Umbraco Forms** with custom form handling *(commit: `504feae`)*
- Updated **`FormsMailHandler`** for email notification logic *(commit: `8a7bbf3`)*
- Converted **sync methods to async** for performance *(commit: `baae7b4`)*
- URL improvements for form submission routing *(commit: `f7ec9ca`)*

### CMS Plugins & Admin
- Added **God Mode** and **Audit** plugins for content administration *(commit: `bf1f372`)*
- Integrated **Contentment** plugin for enhanced editing *(commits: `8ae1141`, `d48d9eb`)*
- Added **Matryoshka** layout plugin *(commit: `b0a4a2d`)*
- SEO plugin integration *(commit: `1058d2e`)*
- Admin panel URL rewrite and dashboard customization *(commits: `25c764b`, `a0cf40e`)*
- Hosting requirements documented in README *(commit: `5384ba9`)*

### Deployment & Infrastructure
- Configured **publish profiles** for deployment *(commit: `fe88bb5`)*
- Favicon and manifest configuration *(commit: `1d1572a`)*
- SQL database management scripts *(commits: `b25782d`, `47b1810`)*
- Brand upgrade with new logos *(commits: `1d4589d`, `211b2bf`, `a80310b`, `273ed88`)*

## Result

- **67 personal commits** over 2.5 years maintaining and enhancing a premium shopping mall website
- **Salesforce CRM integration** — form submissions flow automatically to CRM with field-level mapping
- **OpenXML export** — marketing team downloads form data as Excel for campaign analytics
- **WebP image plugin** — modern image format support with validation
- **Campaign management** — fully CMS-managed, no developer needed for new campaigns
- **Virtual node routing** — SEO-friendly URLs for stores and content
- **4 progressive Umbraco upgrades** (8.5 → 8.10) without downtime
- Delivered for one of **Istanbul's most premium commercial properties**

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about third-party CRM integration" | Salesforce API, crmvalue field mapping, automatic lead flow |
| "CRM experience?" | Salesforce integration with typed models, field mapping on form options |
| "How do you handle data export?" | OpenXML/ArrayToExcel for form data → Excel export |
| "How do you handle CMS upgrades?" | 4 progressive Umbraco upgrades with plugin compatibility testing |
| "Tell me about SEO improvements" | Virtual node routing for clean URLs, SEO plugins |
| "How do you handle image optimization?" | Custom WebP validator plugin with File.Exist safety |

---

## Key Technologies

`C#` · `ASP.NET` · `Umbraco 8` · `Salesforce API` · `OpenXML` · `ArrayToExcel` · `WebP` · `Virtual Node Routing` · `Umbraco Forms` · `God Mode` · `Contentment` · `Multi-Language` · `WebDeploy`
