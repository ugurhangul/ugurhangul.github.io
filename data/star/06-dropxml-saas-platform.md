# STAR — DropXML Platform: Multi-Tenant AI-Powered SaaS

> **Company:** HAUS Technology (personal venture)
> **Period:** 2024 – Present
> **Role:** Sole Architect & Developer
> **Evidence:** 1,047 commits across 13 service repositories + infrastructure

| Service | Commits |
|---------|---------|
| xml-service | 168 |
| marketplace-service | 148 |
| web-app (Next.js) | 134 |
| product-service | 124 |
| auth-service | 73 |
| notification-service | 73 |
| admin-service | 67 |
| tenant-service | 63 |
| order-service | 57 |
| admin-app (React) | 54 |
| shared (NuGet) | 51 |
| payment-service | 31 |
| infrastructure | 4 |

---

## Situation

Turkish e-commerce sellers managing products across multiple marketplaces (Trendyol, Hepsiburada, N11) face a massive operational burden: each marketplace has different XML feed formats, different category trees, different pricing rules, and different API contracts. Sellers spend hours manually mapping product data, updating prices, and synchronizing inventory. No affordable, AI-powered solution existed in the Turkish market to automate this end-to-end workflow from raw supplier XML to live marketplace listings.

## Task

I set out to **design and build a complete multi-tenant SaaS platform from scratch** that would:

- Ingest raw XML supplier feeds and automatically detect their schema
- Use AI (OpenAI) to classify products and map categories
- Manage a global product catalog with tenant-specific overlays for pricing and metadata
- Synchronize products to 3 Turkish marketplaces via their APIs
- Handle orders, payments, notifications, and tenant management
- Support full multi-tenancy with data isolation and role-based access

## Action

### Microservices Architecture (9 Services)
- Designed **9 independent microservices** with clear domain boundaries:
  - **Auth Service** (73 commits): JWT authentication, role management, tenant scoping
  - **Tenant Service** (63 commits): Multi-tenant management, subscription plans
  - **Product Service** (124 commits): Global catalog + tenant overlay model
  - **XML Service** (168 commits): Feed ingestion, parsing, variant detection
  - **Marketplace Service** (148 commits): Trendyol, Hepsiburada, N11 API integrations
  - **Order Service** (57 commits): Order lifecycle management
  - **Payment Service** (31 commits): Stripe + Iyzico integration
  - **Notification Service** (73 commits): Email, webhook, push notifications
  - **Admin Service** (67 commits): Platform administration

### Event-Driven Communication
- Connected all services through **MassTransit publish/subscribe** over RabbitMQ
- Designed async event pipelines: XML sync → AI categorization → marketplace upload
- Implemented **dead-letter handling** for failed message processing
- Built saga orchestration for complex multi-service workflows *(commit evidence: QM-415 through QM-437 series)*

### AI Integration
- Integrated **OpenAI GPT** for automatic XML schema detection — AI analyzes raw feed samples and returns structured field-mapping rules *(xml-service commits)*
- Built **AI categorization pipeline** that maps products to marketplace category trees
- Implemented **AI-driven category suggestion endpoint** with Gemini for two-stage category matching *(commit: `e7fa9b0`)*
- Created **bulk AI SEO and pricing rule endpoints** for batch operations *(PR #26: `e5735b9`)*
- Built auto-sync pipeline with **category mapping cache** and bulk assignment for performance *(commit: `209b4c4`)*
- Implemented product variant detection using AI-provided container/node paths for dynamic XML parsing
- Added **N-level category hierarchy** support with delimiter-based parsing *(commits: `1c91544`, `0bb50ae`, `8c59c87`)*

### Multi-Tenant Product Model
- Designed **dual-layer product architecture**: Global Catalog (platform-managed) vs. Tenant Overlay (pricing, SEO, stock)
- Enforced tenant isolation through **route-level authorization** and **middleware-based tenant scoping**
- Built a **3-tier cascade pricing engine** (Global → Category → Per-Product) with inheritance and override support:
  - Global rules applied platform-wide *(commit: `f7db668` — "docs: add global rules")*
  - Category-level overrides *(commit: `a8432ee` — "sync submodules QM-434 pricing config")*
  - Per-product overrides with highest priority *(commit: `1ae84d0` — "sync submodules QM-437 per-product pricing overrides")*
  - Cascade **resolved at query time** — no denormalization, always fresh
  - *(Merged: `077d333` — "feat: merge global pricing cascade into main")*

### Marketplace Integrations
- Engineered API clients for **3 Turkish marketplaces** handling:
  - Product upload and category mapping
  - Pricing synchronization with cascade rules
  - Inventory tracking and stock updates
  - Order retrieval and webhook callbacks
- Marketplace service alone has **148 commits** covering integration depth

### Shared Infrastructure
- Created a **shared NuGet package** (`DropXML.Shared`, 51 commits) centralizing:
  - Redis caching layer
  - EF Core + MongoDB database helpers
  - JWT authentication middleware
  - Error-handling middleware (Result Pattern)
  - Tenant-scoping middleware
  - Structured logging (Serilog → Loki)
- Implemented the **Result Pattern** for consistent error handling without exceptions
- Standardized **Serilog bootstrap pattern** across all services *(commit: `5ea3768`)*

### Frontend Applications
- Built **tenant-facing web app** (Next.js, 134 commits) for product management, feed configuration, and marketplace operations
- Built **admin panel** (React + TypeScript, 54 commits) for platform operations
- Implemented state management with **Zustand** and UI with **Tailwind CSS**

### DevOps & Observability
- Containerized all services with **Docker** and orchestrated via **Docker Compose** with profile-based organization:
  - `docker-compose.app.yml` — Application services
  - `docker-compose.infra.yml` — Infrastructure (PostgreSQL, MongoDB, Redis, RabbitMQ)
  - `docker-compose.monitoring.yml` — Grafana, Prometheus, Loki, Promtail
  - `docker-compose.prod.yml` — Production overrides
  - `docker-compose.tunnel.yml` — Cloudflare tunneling
  - `docker-compose.portainer.yaml` — Container management UI
  - `docker-compose.registry.yml` — Private Docker registry
- Set up full **observability pipeline**: Prometheus metrics + alert rules, Grafana dashboards, Loki log aggregation, Promtail log shipping

#### CI/CD Pipeline Evolution
- **Phase 1 — TeamCity DSL (Kotlin):** Built initial CI/CD in TeamCity Kotlin DSL *(commit: `d207461`)* with separate build configurations per service:
  - Each pipeline: checkout → restore → build → test → Docker build (`--network host` for NuGet restore) → push to registry
  - Shared NuGet package builds and publishes first; downstream services depend on it
  - Updated DSL version tracking *(commit: `42f4a66` — "update TeamCity DSL version to 2025.11")*
  - Configured per-service NuGet feed *(commit: `d48f2a4`)*
- **Phase 2 — GitHub Actions:** Migrated to GitHub Actions for automated build, push, and VPS deployment:
  - Iterative CI/CD refinement over **10+ deployment commits** *(commits: `818e403` → `a9efbe7` → `df79320` → `bca4ed2` → `814bd07` → `aa6db8c`)*
  - VPS deployment via `docker compose` plugin with automatic git pull on server
  - Restricted production deployments to `main` branch only *(commit: `3053296`)*
- **Next.js Dockerization:** Built Dockerfiles with **standalone output** for minimal image size *(commit: `b8f7aea`)*
- Managed **13 independent repositories** in a polyrepo architecture with Git submodules *(commits: `bf16b4b`, `8d192b3`)*
- Infrastructure scripts: **backup/restore** (`backup.sh`, `restore.sh`), **cron scheduling** (`setup-cron-backups.sh`), **clone-all** (`clone-all.ps1`)
- Documented zero-downtime deployment procedures with RTO (4h) and RPO (24h) targets

### Engineering Practices
- Authored **6 Architecture Decision Records (ADRs)**: event-driven messaging, state management, Minimal API pattern, Result pattern, polyrepo architecture, service boundary design
- Maintained **650+ lines of environment documentation**
- Implemented DI anti-pattern prevention *(commit: `09a569f` — "docs: add DI IEnumerable registration anti-pattern")*

## Result

- **1,047 commits** across 13 services — a production-grade microservices SaaS platform built from zero
- **9 microservices** communicating via event-driven architecture with full observability
- AI-powered XML schema detection **eliminates manual per-supplier configuration**
- Marketplace integrations enable **automated product listing** across 3 platforms
- Multi-tenant architecture supports unlimited tenants with complete data isolation
- 3-tier cascade pricing engine provides **flexible price management** at every level
- Full DevOps pipeline: Docker, CI/CD, monitoring, backup, disaster recovery
- **6 ADRs** documenting every major architectural decision for team scalability

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about a complex system you designed" | 9-service microservices, dual DB strategy, event-driven, multi-tenant |
| "How did you use AI in production?" | OpenAI for XML schema detection and product categorization |
| "How do you handle multi-tenancy?" | Dual-layer product model, route-level auth, middleware scoping |
| "What's your approach to DevOps?" | TeamCity DSL (Kotlin) → GitHub Actions, Docker Compose profiles, backup scripts |
| "How do you manage deployments?" | 13-repo polyrepo, Git submodules for version pinning, main-branch-only deploys |
| "How do you ensure code quality across services?" | Shared NuGet, ADRs, Result pattern, structured logging |
| "How did you integrate with external APIs?" | 3 marketplace API clients, cascade pricing, webhook handling |

---

## Key Technologies

`.NET 10` · `C#` · `React` · `Next.js` · `TypeScript` · `PostgreSQL` · `MongoDB` · `Redis` · `RabbitMQ` · `MassTransit` · `Docker` · `Grafana` · `Prometheus` · `Loki` · `OpenAI API` · `Tailwind CSS` · `Zustand` · `TeamCity` · `Nginx`
