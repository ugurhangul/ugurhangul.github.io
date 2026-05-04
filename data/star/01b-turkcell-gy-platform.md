# STAR — Turkcell Geleceği Yazanlar: Social Platform & Data Migration

> **Company:** Kafein Technology Solutions (outsourced to Turkcell)
> **Period:** Sep 2024 – Dec 2025
> **Role:** Senior Full Stack .NET Developer
> **Evidence:** 61 personal commits across 2 repositories

| Repository | Personal Commits | Total Team | Description |
|------------|-----------------|------------|-------------|
| `gy_win_be` | **46** | 2,489 | Main backend (microservices) |
| `gy_win_be_migration` | **15** | 16 | Data migration tool (.NET 9) |
| **Total** | **61** | — | |

---

## Situation

**Turkcell Geleceği Yazanlar (GY)** — Turkey's leading telecom operator's youth mentorship and social networking platform — was being **rewritten from scratch** on a modern .NET Aspire microservices architecture. The platform hosts blogs, Q&A, social pages, job listings, gamification, and career resources for young technology professionals. Three critical gaps needed addressing:

1. **No SEO strategy**: All content used numeric IDs in URLs (`/question/12345`), hurting search engine visibility and user experience
2. **No content moderation**: A youth-facing platform with no centralized mechanism to prevent inappropriate content across multiple microservices
3. **No API-level suspension**: Suspended users could still access API endpoints because enforcement was only at the frontend level
4. **Full data migration needed**: 10+ entity types needed to be migrated from the legacy platform to the new schema with different ID systems, URL formats, and data models

## Task

As a Senior .NET Developer on the GY team, I was responsible for:

- Implementing a cross-cutting SEO slug system across all microservices
- Building content moderation middleware for forbidden words filtering
- Creating API-level user suspension middleware with safe rollout
- Building a standalone .NET 9 data migration tool for 10+ entity types

---

## Action

### 1. Cross-Cutting SEO Slug System (14 commits)

#### Entity-Level Slug Support
- Added **`Slug` property** to all content entities as nullable for backward compatibility:
  - Blog entities *(commits: `ef4dfd9b`, `3e1fed2e`)*
  - Questions *(commits: `af86404a`, `cfd467d7`)*
  - SocialPage *(commits: `dc122189`, `c9b7717a` — reverted and fixed)*
  - SocialCard *(commit: `f5ec2a97`)*
  - JobDetail *(commit: `385157c8`)*

#### Slug Generation & Caching
- Built **reusable slug generation utility** with Turkish character sanitization, special character removal, and hyphen normalization *(commit: `37d7702e`)*
- Refactored slug generation logic with validation improvements *(commit: `a16e9c77`)*
- Implemented **caching for slug lookups** to avoid repeated DB hits *(commits: `6fb710f4`, `ef4dfd9b`)*
- Dynamic slug cleanup caching logic *(commit: `37d7702e`)*

#### Slug-Based Endpoints
- Created **slug-based retrieval endpoints** alongside existing ID-based ones:
  - Blog: slug generation and retrieval logic *(commit: `a79444cb`)*
  - Blog controller slug generation *(commit: `f3efd9f4`)*
  - JobDetail: `jobdetailbyslug` endpoint *(commit: `e84fe14f`)*
  - SocialPage slug operations *(commit: `dc122189`)*

#### Search & DTO Integration
- Added slug to **SearchResult models** for SEO-friendly URL construction *(commits: `35aeb115`, `81e618e1`)*
- Added **`Slug` to `SocialCardDto`** and updated usages *(commit: `20b6af6a`)*
- Added **`QuestionSlug`** to user QAC responses *(commit: `46b89755`)*
- Added Slug field to DTOs and improved query formatting *(commit: `521e4a32`)*

### 2. Forbidden Words Content Moderation Middleware (6 commits)

- Designed **`ForbiddenWordsMiddleware`** as ASP.NET middleware intercepting request bodies before controllers *(commit: `559e17a9`)*
- Deployed to **all microservices** *(commit: `bfec215a`)*
- Defined **unified error message constants** for consistent client-side handling *(commit: `436cf3c1`)*
- Refactored forbidden word handling with unified error messaging *(commit: `0a73a18d`)*
- Refactored middleware and **repository** for improved request handling — database-backed word list for moderator updates without deployments *(commit: `1482f46d`)*
- Enhanced middleware for **HTTP method awareness** *(commit: `47bb86d1`)*
- Refactored repository method for optimized lookups *(commit: `db426deb`)*
- **Iterated 3 times** based on edge cases: request body parsing, Unicode handling, method filtering

### 3. Graceful User Suspension Middleware (11 commits)

#### Initial Implementation
- Built **`UserSuspendMiddleware`** that intercepts every authenticated request *(commit: `85bec3ff`)*
- Checks user status via `GetByUserName` and returns **403 for suspended users** *(commit: `8fbda1d5`)*
- Refactored to improve user status checks *(commits: `85bec3ff`, `dfb1085c`)*

#### Disciplined Production Rollout
- **Phase 1 — Enable across all APIs**: Deployed to all microservices *(commit: `46898a77`)*
- **Phase 2 — Discovered status code conflict**: 200 vs 403 edge case with `ExceptionMiddleware`
  - Handled specific status code for `ApiException` *(commit: `5e665993`)*
  - Handled 200 status code in ExceptionMiddleware *(commit: `3aa02734`)*
- **Phase 3 — Reverted**: Disabled globally to fix issue *(commit: `fbbdf40a`)*
- **Phase 4 — Re-enabled incrementally**: After fixing status code handling:
  - Re-enabled step by step *(commits: `9bfaba49`, `5724c41e`, `42f8ccb0`, `5e312748`, `2a0984bc`)*
- **Result**: Staged rollout prevented production incidents — commit history shows the disciplined approach

### 4. Data Migration Tool (.NET 9) — 15 commits

#### Architecture
- Built a **standalone .NET 9 console application** with per-entity migration services *(commit: `3e762b0`)*
- Created services for: `UserMigrationService`, `QuestionMigrationService`, `BlogMigrationService`, `CategoryMigrationService`, and more *(commit: `3e762b0`)*
- Added project configuration with .gitignore and README *(commit: `6a59e7e`)*

#### Migration Services
- Refactored migration services for improved data handling *(commit: `b62ba89`)*
- Refactored `UserRole` and `Category` migration logic *(commit: `5718817`)*
- Improved data migration logic with whitespace cleanup *(commit: `4822282`)*
- Fixed ID assignment and enabled triggers in category migration *(commit: `e618045`)*
- Added `UpdateInstructorInfo` method with null description handling *(commit: `bd70328`)*

#### Content Transformation
- Built **CDN URL rewriting** to transform legacy URLs to new CDN API format *(commit: `1872688`)*
- Refactored `QuestionOptionMigrationService` for enhanced URL handling *(commit: `e104d9f`)*
- Fixed null handling for descriptions *(commit: `e39afe3`)*
- Built **Kaltura video ID extraction** with primary regex + fallback patterns *(commit: `aedd03b`)*

#### Slug Generation During Migration
- Generated slugs for all content with proper sanitization *(commit: `f0942ed`)*
- Reset slugs before migration for idempotent reruns *(commit: `f0942ed`)*
- Set slug to null during question migration for regeneration *(commit: `7348064`)*
- Replaced hyphens with underscores in sanitized strings *(commit: `74307c1`)*

#### Safety & Re-runnability
- Created **`truncates.sql`** with proper ordering for re-runnable migrations *(commit: `d33eb6e`)*
- Managed PostgreSQL triggers (`ENABLE/DISABLE TRIGGER ALL`) for bulk inserts with custom IDs *(commit: `e618045`)*
- Progress logging with records processed and estimated completion

### 5. Additional Platform Contributions

- Enhanced `GetUserQACInfo` query by including related questions *(commit: `9bcf6fc9`)*
- Fixed missing question data in user comments query *(commit: `41a27493`)*
- Refactored `GetRandomQuestions` query for readability *(commit: `3266bd2c`)*
- Added API endpoint for reading content files *(commit: `92fed589`)*

## Result

- **61 personal commits** across 2 repositories contributing to Turkcell's youth mentorship platform
- **SEO slug system** deployed across all content types (Blog, Question, SocialPage, SocialCard, JobDetail) with caching and backward compatibility
- **Content moderation middleware** providing single point of enforcement across all microservices — database-backed for hot updates
- **User suspension middleware** enforcing API-level blocks with disciplined staged rollout (enable → discover issue → revert → fix → re-enable)
- **Data migration tool** successfully migrated **10+ entity types** with CDN URL rewriting, Kaltura video extraction, and idempotent re-runnability
- All features shipped to a platform serving **Turkey's young tech community** under Turkcell's brand

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about a cross-cutting concern" | SEO slug system across 5 entity types, 6 microservices, with caching |
| "How do you handle content moderation?" | ForbiddenWordsMiddleware, DB-backed word list, HTTP method filtering |
| "Tell me about a challenging migration" | .NET 9 tool, 10+ entities, Kaltura regex, CDN URL rewriting, truncates.sql |
| "How do you handle authorization/access control?" | UserSuspendMiddleware, staged rollout, 403 status code handling |
| "How do you do safe production rollouts?" | Enable → discover → revert → fix → re-enable (commit trail proves it) |
| "How do you handle SEO in web apps?" | Slug generation, Turkish char sanitization, caching, dual endpoints |
| "How do you protect against inappropriate content?" | ASP.NET middleware, intercepts before controllers, unified error messages |

---

## Key Technologies

`C#` · `.NET 9` · `.NET Aspire` · `ASP.NET Core Middleware` · `Entity Framework Core` · `PostgreSQL` · `Redis Cache` · `Slug Generation` · `Content Moderation` · `Data Migration` · `Kaltura API` · `CDN Integration` · `Unit Testing`
