# STAR — Hepsiburada Hydra: Content Management Platform & Vodafone Multi-Tenant

> **Company:** Kafein Technology Solutions (outsourced to Hepsiburada / Vodafone)
> **Period:** Sep 2024 – Dec 2025
> **Role:** Senior Full Stack .NET Developer
> **Evidence:** 122 personal commits across 4 repositories

| Repository | Personal Commits | Total Team | Description |
|------------|-----------------|------------|-------------|
| `hydra-core` | **46** | 1,826 | Core content management engine |
| `mobile-mw` | **22** | 4,500 | Mobile middleware / BFF |
| `hydra-api` | **11** | 789 | Content API layer |
| **Total** | **79 (Hydra)** | — | Content platform |

---

## Situation

**Hepsiburada** — Turkey's largest e-commerce platform with millions of daily users — manages its homepage content (banners, campaigns, product recommendations, swimlane carousels, feature grids) through an internal platform called **Hydra**. The system was scaling to serve more content types and surfaces (web, iOS, Android) but had **three critical gaps**:

1. **No observability**: When content rendering failed or showed stale data, engineers guessed which pipeline stage was at fault — content import, binding, export, or event handling. No structured tracing existed across the 5-stage pipeline.
2. **Rigid content architecture**: Every new widget type (swimlane carousels, feature grids, vertical features) required custom wiring code, making the content team bottleneck engineers for simple content additions.
3. **No audit trail**: Multiple team members and automated systems modified homepage content, but there was no record of who changed what — making regulatory compliance and incident investigation impossible.

Additionally, **Vodafone Turkey** operated as a multi-tenant client on the same platform, requiring tenant-specific personalization.

## Task

As a Senior .NET Developer embedded in Hepsiburada's content team, I was responsible for:

- Adding distributed tracing across the entire content pipeline without impacting performance
- Designing an extensible content binder pipeline for rapid widget onboarding
- Building mobile campaign rendering BFF features for iOS/Android cross-platform delivery
- Implementing a content audit trail for regulatory compliance
- Supporting Vodafone multi-tenant integration with persona-based personalization

## Action

### Distributed Tracing — Content Pipeline Observability (VAN-2490)

Mapped the full 5-stage pipeline and added structured trace logging at each stage:

1. **Content Importers** — Trace logs for data ingestion *(commit: `44c2fb0c4`)*
2. **Content EventHandlers** — Trace logs for async event processing *(commits: `da523588`, `539797bb`)*
3. **Content QueryHandlers** — Trace logs for read operations *(commit: `ff294c28`)*
4. **Content Binders** — Trace logs for content binding/resolution *(commit: `10a337f6`)*
5. **Content Exporters** — Trace logs for output rendering *(commit: `c42fb0c4`)*

- Used **`ILoggerFactory`** (not static loggers) for proper DI and testability *(commit: `b520ed45`)*
- Added **ContentGroups** service-level trace logs *(commit: `caa1b162`)*
- Added **ContentGroupsQueryHandler** trace logs *(commit: `5288bc02`)*
- Added **ContentGroupEvents** trace logs *(commit: `874a56f4`)*
- Added **ContentGroupsCommandHandlers** trace logs *(commit: `72499c25`)*
- Included content group ID, operation type, and timing in log entries
- Split into **5 incremental PRs** (one per pipeline stage) for isolated review
- *(Commits: `44c2fb0c4` → `da523588` → `ff294c28` → `10a337f6` → `c42fb0c4`)*

### Generic Content Binder Pipeline (VAN-2222)

- Designed a **`ContentBinderPipeline`** abstraction that any component type can plug into *(commit: `c712f403`)*
- Created typed binder contexts for each widget type:
  - **`SwimlaneBinderContext`** — with automated categoryIds resolution from recommendation engine *(commit: `40406194`)*
  - **`FeaturesBinderContext`** — with automated categoryIds *(commit: `d22c2f85`)*
  - **`VerticalFeaturesContext`** — for vertical feature grids *(commit: `9223bc2d`)*
- Applied pipeline to all existing components for backward compatibility *(commit: `c712f403`)*
- Extended to dynamic auto-reco views with categoryIds queries *(hydra-api commit: `a5631ad`)*
- **Result**: New widget types added by defining a context class and registering it — reduced onboarding from days to hours

### Cross-Platform Mobile Campaign Rendering (VAN-2518)

Built mobile BFF (Backend-For-Frontend) features for campaign pages:

#### Price Area Rendering
- Implemented **PriceArea rendering** for 4×4 campaign grid layout *(commits: `7aac67db6`, `e9b2484b2`)*
- Null-safe handling for empty price labels *(commits: `fce42f5ca`, `9cd8bc4e0`, `0e8d64e38`)*

#### iOS Feature Gating
- Implemented **`IsIosVersionReady`** checks to conditionally include features not yet supported on older iOS *(commit: `2d54b826f`)*
- Fixed platform-specific description strings using `PlatformTypes.iOS.GetDescription()` *(commits: `7832ca441`, `8ab4147e4`)*

#### Campaign Elements
- Added **countdown timer** data rendering *(commit: `788d4cac`)*
- Added **`SetCampaignButton`** support *(commits: `20f4998d`, `39b91740`)*
- Added **boxSpacerText** rendering *(commit: `5d539eba`)*
- Added **labels** to campaign components *(commit: `ba4c8e61b`)*

#### Image Label Support
- Added **image label rendering** in campaign mapper *(commit: `d90c2464d`)*
- Unit tests validating label value rendering *(commit: `52849931c`)*
- Cleaned up obsolete test for image label validation *(commit: `be7378fc4`)*

#### Payload Optimization
- Removed deprecated **`WinnerLabel`** and **`AffordabilityLabel`** fields to reduce payload size *(commits: `7f17733ad`, `a0c8fd9e3`, `5cd9f6fc2`)*

#### Product Badge
- Added **`HydraHomeProductBadgeSize`** support *(commits: `0cf69efe0`, `f5e91a391`)*

### Content Audit Trail for Compliance (VAN-2309)

- Added **`LastModifiedBy`** and **`UpdatedDateTime`** tracking to all content mutations *(commit: `74a19383`)*
- Included audit fields in **component list API** response *(commit: `2fe9c750`)*
- Set **`UserId` on event consumers** so async modifications carry originator identity *(commit: `f18e0337`)*
- Made UserId non-nullable for data integrity *(commit: `555a99da`)*
- Added **`UpdatedTimestamp` to `BannerAutomation`** for scheduled content changes *(commit: `321c3ef4`)*
- Handled **timezone normalization** (`ToLocalTime`) for consistent display *(commit: `189f05b3`)*
- Iterated naming `lastUpdatedBy` → `lastModifiedBy` based on team convention review *(commit: `68228c14`)*
- Removed unnecessary fields and added updatedDateTime *(commit: `e573c0d4`)*
- **Result**: Full audit trail for all content changes — both synchronous (API) and asynchronous (event consumers)

### Vodafone Multi-Tenant Integration (VAN-2380)

- Added **Vodafone persona** tag support for tenant-specific content targeting *(commits: `6f828850`, `6c0c4780`)*
- Implemented **tenant name pass-through** to ecommerce engine *(hydra-api commits: `5d12478`, `7161ed1`, `0035674`)*
- Built **case-insensitive `additionalTags`** matching for persona-based content *(hydra-api commit: `362fa9f`)*

### Additional Features

#### Banner Tracking (VAN-2411)
- Added **`trackingId` query** to banner links for analytics *(commits: `a451dfee`, `83d51537`)*
- URL validation before manipulation *(commit: `a79dac7d`)*
- Unit tests for **`UriBuilderExtensions`** *(commit: `7282d5a6`)*

#### Floating Button Personalization (VAN-2308)
- Implemented **FloatingButton persona tags** for targeted content *(commits: `4f1d6174`, `f4b3f70`)*
- Null handling for no suitable button per user persona *(hydra-api commit: `21516f5`)*
- JWT `IsAuthenticated` claim validation *(hydra-api commit: `58a87bd`)*
- Dynamic object handling for floating button data *(hydra-api commit: `7a62986`)*

## Result

- **79 personal commits** on Hydra (core + API) contributing to Turkey's **largest e-commerce content platform** (1,826+ team commits on hydra-core alone)
- **22 commits** on mobile-mw (4,500+ team commits) powering campaign rendering across iOS/Android
- **End-to-end content pipeline tracing** reduced mean-time-to-debug for content rendering issues
- **Generic ContentBinderPipeline** reduced new widget onboarding from **days to hours**
- **Full audit trail** for content changes — regulatory compliance for Hepsiburada's homepage content
- **Cross-platform campaign rendering** with iOS version gating and payload optimization
- **Vodafone multi-tenant** integration with persona-based content targeting
- Contributed to a platform serving **millions of daily users** on Turkey's #2 e-commerce site

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about improving system reliability" | 5-stage pipeline tracing, ILoggerFactory for DI, incremental PR strategy |
| "How do you debug production issues?" | Distributed tracing across import → event → query → bind → export stages |
| "Tell me about a large-scale system" | Hydra serves millions of users, 1,826+ team commits, multi-platform |
| "How do you design extensible systems?" | ContentBinderPipeline + typed contexts, new widgets in hours not days |
| "Tell me about working on a mobile-facing API" | BFF campaign rendering, iOS version gating, platform-specific handling |
| "How do you implement audit/compliance?" | LastModifiedBy on sync + async paths, timezone normalization, BannerAutomation |
| "How do you handle multi-tenancy?" | Vodafone persona tags, tenant name pass-through, case-insensitive matching |
| "How do you handle growing feature requirements?" | Generic pipeline → typed contexts → register → done |

---

## Key Technologies

`C#` · `.NET` · `Go` · `MongoDB` · `Kafka` · `RabbitMQ` · `Redis` · `JWT` · `ILoggerFactory` · `OpenTelemetry` · `Jaeger` · `SignalR` · `Unit Testing` · `BFF Pattern` · `Multi-Tenant` · `Content Pipeline` · `CQRS`
