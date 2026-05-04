# STAR — İnci Akü: Battery Finder Tool & Long-Term Client Engagement

> **Company:** Clockwork Agency
> **Period:** Mar 2020 – Jan 2025
> **Role:** Lead Developer
> **Evidence:** 175 commits in `inciaku.com`, 116 in `easaku.com`, 35 in `AkumGelsin` (326 total across İnci Holding projects)

---

## Situation

**İnci Akü** (Turkey's largest battery manufacturer and exporter) needed a central feature for their corporate website: an **"Akünü Bul" (Find Your Battery)** product configuration tool. Users needed to enter their vehicle's make, model, and year to receive exact battery recommendations. Because the automotive catalog is massive and constantly changing, the tool required complex filtering logic, data deduplication, category-based dealer routing, and robust SEO infrastructure to capture organic search traffic for specific vehicle battery queries. The project evolved into a long-term, 5-year relationship encompassing multiple brand websites (İnci Akü, EAS Akü, Aküm Gelsin).

## Task

Build and maintain the **battery finder configuration tool** over a multi-year lifecycle, addressing catalog growth, UX improvements, SEO optimization, and feature additions like start-stop logic, road assistance integration, and multi-language support.

## Action

### The "Akünü Bul" (Battery Finder) Engine
- Built the core **`AkunuBulController`** driving the configuration tool *(commits: `14ffeed`, `c305647`, `eaa3b04`)*
- Implemented **year-based battery search** expanding the matching granularity beyond make/model *(commit: `3fe8fc0`)*
- Engineered **start/stop logic handling** — modern vehicles require specific AGM/EFB batteries, the tool dynamically filters based on this critical parameter *(commits: `65d71d2`, `3f1db8e`)*
- Added strict **unique result deduplication** to ensure clean UI presentation when underlying catalog data contains overlapping SKUs *(commit: `aaa3ac0`)*
- Fixed critical **null handling** to ensure proper UI updates during filter changes *(commit: `a3ea0ae`)*

### Dealer Routing & Location Services
- Implemented **category-based dealer routing** — routing users to specific branches based on their battery needs (e.g., "otomotiv" / automotive) *(commits: `09801ba`, `95f0946`)*
- Built comprehensive **Bayiler (Dealers)** and **Yol Yardım (Road Assistance)** API services *(commits: `cfc02f2`, `4ee241b`, `92540de`, `9bce727`)*
- Integrated 3-step road assistance workflow directly into the platform *(commits: `c8f30ae`, `6eff244`, `a69f17b`, `1c36260`)*

### SEO & Organic Discovery Optimization
The battery finder is a major lead generation tool, requiring aggressive SEO optimization:
- Built dynamic routing for SEO content generation *(commit: `fc4ed08`)*
- Implemented **custom sidebars** for flat SEO content pages *(commit: `6ab0246`)*
- Fixed **duplicate title tags** and normalized heading structures *(commits: `7ccf1fc`, `3f2e542`, `39f5f5f`, `ae487ca`)*
- Managed **hreflang** tags and internationalized product category SEO *(commits: `30b6564`, `38b9975`)*
- Resolved edge cases like 404 handling for missing configurations *(commit: `1818616`)*

### Internationalization & Security
- Integrated **multi-language routing** supporting Turkish, English, and Russian markets *(commits: `931f8ce`, `005703e`, `519e698`, `baa59e8`, `5001e7a`, `55ed536`)*
- Implemented **reCAPTCHA** validation to protect endpoints from automated scraping *(commit: `6e7ab7b`)*
- Fixed specific mobile language bugs *(commit: `38d02d6`)*

### Multi-Brand Rollout (İnci Holding Portfolio)
The architecture established for `inciaku.com` (175 personal commits) was subsequently leveraged to deliver and maintain sister brands:
- **`easaku.com`** (EAS Battery) — 116 personal commits
- **`AkumGelsin`** (Direct-to-consumer delivery) — 35 personal commits

## Result

- Maintained a continuous, **5-year technical relationship** with Turkey's largest battery manufacturer (2020–2025)
- Delivered **326 personal commits** across 3 distinct brand repositories
- The **Battery Finder tool** successfully handles the entire, evolving automotive product catalog with smart start/stop filtering and unique result deduplication
- **Dynamic dealer routing** successfully connects users from the configuration tool directly to the appropriate regional service branch
- Deep **SEO integration** ensures product category pages rank for highly specific organic queries

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about building a product configuration tool" | AkünüBul — vehicle make/model/year filtering, start/stop logic, deduplication |
| "Tell me about a long-term client relationship" | 5-year relationship (2020-2025) maintaining 3 brand repositories for İnci Holding |
| "How do you handle messy underlying data?" | Unique result deduplication and null handling in the AkunuBul controller |
| "How do you optimize an application for SEO?" | Hreflang tags, duplicate title resolution, dynamic content routing for catalog pages |
| "Tell me about location-based routing" | Category-aware dealer routing connecting search results to physical service centers |

---

## Key Technologies

`C#` · `ASP.NET` · `Umbraco CMS` · `SEO` · `Hreflang` · `Multi-Language` · `reCAPTCHA` · `Product Configuration` · `Data Deduplication`
