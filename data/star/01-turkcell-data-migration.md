# STAR — Turkcell Data Migration Engine

> **Company:** Kafein Technology Solutions (outsourced to Turkcell)
> **Period:** Sep 2024 – Dec 2025
> **Role:** Senior Full Stack .NET Developer (Sole Architect)
> **Evidence:** ~178 commits across 5 repositories (`gy_win_be`, `gy_win_be_migration`)

---

## Situation

Turkcell — Turkey's largest mobile operator — needed to migrate its legacy Drupal-based content platform ("Geleceği Yazanlar" community portal) to a modern .NET + PostgreSQL stack. The existing system held **150M+ rows** of user-generated content (blog posts, Q&A threads, social cards, comments, media) spread across an aging MySQL/Drupal database. Migration had to happen with **zero data loss** and **zero downtime** for millions of active users. The legacy data had inconsistent slugs, broken relationships, and no SEO-friendly URLs.

## Task

I was assigned as the **sole architect** of the migration engine. My responsibilities included:

- Design and build a high-performance data migration pipeline from Drupal/MySQL → PostgreSQL
- Implement SEO slug generation for all content entities (blogs, questions, social cards, job details)
- Add content moderation middleware (forbidden words, user suspension)
- Ensure data integrity across 150M+ rows with referential constraints
- Optimize the existing .NET backend APIs for the new data layer

## Action

### Migration Engine Architecture
- Built a parallel processing migration engine using **Dapper** for raw SQL performance, bypassing EF Core overhead for bulk operations
- Implemented **Multithreading** with configurable batch sizes to maximize throughput while respecting database connection limits
- Created an incremental migration mode with shared DB context, allowing partial migrations and resume-on-failure capability
- *(Commit: `912744d` — "Add incremental migration support and shared DB context")*

### SEO Slug System
- Designed and implemented a comprehensive slug generation system across all content types:
  - Blog entities with caching for collision detection *(commit: `ef4dfd9b`)*
  - Social cards with slug retrieval *(commit: `f5ec2a97`)*
  - Social pages with caching layer *(commit: `6fb710f4`)*
  - Job details with slug-based lookup *(commit: `bf765b1c`)*
  - Q&A questions with slug support *(commit: `af86404a`)*
- Added dynamic slug cleanup and caching logic to handle Turkish character transliteration *(commit: `37d7702e`)*

### Content Moderation & Security
- Implemented `UserSuspendMiddleware` for real-time user blocking *(commits: `2a0984bc`, `5e312748`, `42f8ccb0`)*
- Enhanced forbidden words middleware to support all HTTP methods *(commit: `47bb86d1`)*
- Added notification query optimizations for the new data model *(commit: `1ee2a68`)*

### API Optimization
- Refactored endpoint naming for RESTful clarity (e.g., `jobdetailbyslug`) *(commit: `e84fe14f`)*
- Added missing validation and data integrity checks for user comments *(commit: `41a27493`)*
- Improved search result models with slug properties for SEO indexing *(commit: `35aeb115`)*

## Result

- **150M+ rows** migrated successfully from Drupal/MySQL to PostgreSQL with **zero data loss**
- Migration time **reduced by 70%** compared to initial estimates through parallel processing optimization
- SEO slug system generated clean URLs for **all content types**, improving organic search discoverability
- Content moderation middleware blocked malicious content in real-time across the platform
- The migration engine became reusable — designed for horizontal scalability with incremental batch support
- System served **millions of daily active users** on the new stack without performance degradation

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about a large-scale data migration" | Full story — 150M rows, Drupal → PostgreSQL, parallel processing |
| "How do you handle performance at scale?" | Dapper over EF Core, multithreading, batch processing, incremental mode |
| "Describe a time you improved SEO" | Slug generation system across 6 content types with caching |
| "How do you ensure data integrity?" | Incremental migration with resume-on-failure, referential constraint validation |

---

## Key Technologies

`C#` · `.NET` · `PostgreSQL` · `Dapper` · `Parallel Programming` · `Multithreading` · `MySQL` · `Drupal Migration` · `SEO` · `Middleware`
