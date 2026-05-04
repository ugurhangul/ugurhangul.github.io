# STAR — Fiat/Jeep/Alfa Romeo Online Car Sales Platform

> **Company:** Clockwork Agency (client: TOFAŞ)
> **Period:** Oct 2019 – Sep 2024
> **Role:** Senior Software Developer → Lead Developer
> **Evidence:** ~1,000+ unique personal commits across 12 repositories

| Repository | Personal Commits | Description |
|------------|-----------------|-------------|
| `onlineapi.fiat.com.tr` | **692** | Main backend API (consumer + dealer + admin) |
| `api.online.alfaromeo.com.tr` | 136 | Alfa Romeo API deployment |
| `api.online.jeep.com.tr` | 130 | Jeep API deployment |
| `online.fiat.com.tr` | 25 | Fiat consumer frontend |
| `onlineadmin.fiat.com.tr` | 18 | Fiat admin panel |
| `onlinebayi.fiat.com.tr` | 13 | Fiat dealer portal |
| `online.alfaromeo.com.tr` | 9 | Alfa Romeo consumer frontend |
| `onlineadmin.jeep.com.tr` | 7 | Jeep admin panel |
| `clockwork.tofas` | **74** | TOFAŞ CRM, Datacord, subscription management |

---

## Situation

TOFAŞ — Turkey's largest automotive group and Fiat's manufacturing partner — wanted to **sell cars online for the first time in the Turkish market**. Three separate brands (Fiat, Jeep, Alfa Romeo) needed a unified platform where customers could configure vehicles, see real-time pricing, apply promotions, complete payments (credit card, wire transfer, auto financing), and get matched with a dealer. This was a **first-of-its-kind** platform in Turkey's automotive industry. The system needed to integrate with TOFAŞ's existing Datacord CRM, stock management systems, and pricing webservices while serving consumers, dealers, and admins through separate interfaces.

## Task

As the **Lead Backend Developer**, I was responsible for:

- Architecting and building the entire backend API platform serving 3 brands
- Implementing the complete payment pipeline (credit card, wire transfer/havale, auto loans)
- Building the coupon/promotion system, stock management, and pricing engine
- Designing and implementing a 12+ state order lifecycle
- Creating separate API surfaces for consumers, dealers, and administrators
- Replicating the platform for Jeep (130 commits) and Alfa Romeo (136 commits) with brand-specific customizations
- Migrating the entire codebase from .NET 6 → .NET 8
- Building the TOFAŞ CRM integration (Datacord) separately (74 commits)

## Action

### Multi-Project API Architecture
- Architected a **shared Infrastructure layer** consumed by three separate APIs:
  - `api.online.fiat.com.tr` — Consumer-facing API
  - `api.bayi` — Dealer-facing API
  - `api.admin` — Admin panel API
- *(Commits: `3e3f96e` "api.online.fiat.com.tr fully migrated to dotnet 6 and refactored folder structure", `7182b1c` "api.online.admin.fiat.com.tr fully migrated to dotnet 6", `c869f3b` "api.bayi.online.fiat.com.tr fully migrated to dotnet 6")*

### Payment Pipeline
- Built **`TransactionService`** for credit card processing via Iyzico payment gateway *(commits: `61af17b`, `330c0ec`)*
- Implemented **`ApprovePayment`** with conditional logic for different payment types *(commits: `c2e9db9`, `4346751`, `82de37f`)*
- Created **havale (wire transfer) verification** flow with dealer-side confirmation *(commits: `a6eed12`, `2d2a1bc`, `916e46f`, `832a813`, `9d60a1e`)*
- Built **`PreApplyLoanService`** for auto financing applications with .NET 8 constructor optimization *(commit: `635d70d`)*
- Implemented **refund processing** with transaction history validation *(commits: `5b85dc7`, `76b5f43`)*
- Added payment-before-commit timing checks and success verification *(commits: `e377b0f`, `9bca8fa`)*
- Created lead-based payment tracking with PaymentId history *(commit: `a3c6883`)*

### Coupon & Promotion System
- Built complete **`CouponService`** — create, validate, cache, prevent double-use *(commit: `fda4020` "Coupon.cs done")*
- Implemented coupon usability checks and cache management *(commits: `9072918`, `011cc9d`, `b5be9c4`)*
- Added coupon code inclusion in customer notification emails *(commit: `32d3638`)*
- Prevented empty coupon submissions *(commit: `6bc65e4`)*
- Integrated coupons with package selection *(commit: `bb3a6c9`)*
- Built buyer legitimacy validation for reservations *(commits: `178f831`, `a68f093`)*

### Stock Management & Feature Flags
- Implemented **stock feature flag** system to start/stop sales dynamically *(commit: `3fcfc68`)*
- Built `StockService` with real-time inventory from TOFAŞ systems *(commits: `0e15e49`, `a9feee0`)*
- Created **passive car exclusion** logic to hide unavailable inventory *(commit: `9debe46`)*
- Implemented **color-level stock** tracking with dealer-specific availability *(commits: `c653a6c`, `9c5538a`, `8e4bdb6`)*
- Added stock/price update locking to prevent orders during sync *(commit: `b600841`)*
- Built live stock status display *(commit: `88344e8` "canlı stock")*
- Cache management for stock and order data *(commits: `810328b`, `1348195`)*

### Pricing Engine
- Integrated **TOFAŞ PriceWebservice** for real-time vehicle pricing *(commits: `09bf0f5`, `0b5d985`, `522dcb2`)*
- Built price caching with null-handling *(commits: `3463ecc`, `3e9d7f9`)*
- Implemented **reservation pricing** with alerts for missing data *(commits: `51aba7c`, `ebe61b8`)*
- Color-level and package-level pricing *(commits: `6622460`, `f6a5df6`, `48fd861`)*
- Equipment filtering based on price availability *(commit: `90885c6`)*
- Price legitimacy validation before order creation *(commit: `0ae9969`)*

### 12-State Order Lifecycle
- Designed **12+ order states** with full history tracking:
  - Created `OrderStatusHistory` with descriptions and timestamps *(commits: `3dde825`, `11e6e92`, `a7e93f3`)*
  - Built `OrderStatusDefinitions` with caching *(commits: `9ab16d3`, `fc773a5`)*
  - Implemented status-based order filtering *(commit: `a2dcfeb`)*
  - Added dealer status management *(commit: `cf0fb92`)*
  - Built vendor order tracking *(commits: `f981eed`, `1c76160`)*
  - Added loan cancellation prevention on cancelled orders *(commit: `440e40b`)*
- Implemented **`HistoryKey`** for configuration audit trail *(commits: `ed3b009`, `84ce47a`, `9c2b3be`)*
- Built `UserConfigurationHistory` with order relationships *(commit: `d37be94`)*
- Created `CleanInCompletedOrders` service for stale order cleanup *(commits: `657b2d6`, `6e39bd9`)*

### Vehicle Image Management (MVSS)
- Built **MVSS (Media Vehicle Standard System) integration** for dynamic vehicle images
- Implemented `UpdateImages` with model-level activation *(commits: `1c9ebe6`, `b53ca72`, `8b7f47b`)*
- Created exterior media processing with package code mapping *(commit: `abece73`)*
- Image download for exterior color variants *(commit: `1789f68`)*

### Multi-Brand Replication
- Replicated entire platform for **Alfa Romeo** (136 commits) with brand-specific customizations
- Replicated for **Jeep** (130 commits) including:
  - Memory cache clearing for price services *(commit: `21eb895`)*
  - Bulk `numordespl` processing *(commit: `469e0a0`)*
  - Notification service integration *(commit: `1abdef9`)*
  - Campaign and activity code support *(commit: `b250813`)*

### .NET Migration & Optimization
- Migrated from **.NET 6 → .NET 8** across all API projects *(commit: `892a252` "cleaning and dotnet 8 optimization")*
- Optimized middleware pipeline *(commit: `e4f716f` "dotnet 8, middleware optimized")*
- Simplified constructors for service classes *(commit: `635d70d`)*
- Added `ReferenceHandler.IgnoreCycles` for JSON serialization *(commit: `fd1f0ae`)*

### TOFAŞ CRM & Datacord Integration (74 commits)
- Built **`clockwork.tofas`** as a separate CRM system:
  - Datacord CRM integration for lead management *(commits: `95d90f4`, `e6e2e95`)*
  - Subscription management system *(commit: `df22b6d`)*
  - Slide CMS for promotional content *(commits: `b89c117`, `5fcd3a8`)*
  - Import controller for data feeds *(commit: `631bb7d`)*

### Dealer Integration
- Built complete dealer portal API with claims-based authorization *(commits: `c30822d`, `72e2930`)*
- Dealer address, area, and contact information management *(commits: `85a2158`, `6d539ad`, `a67be20`)*
- Dealer-specific mail notifications *(commit: `9455032`)*
- Dealer pricing display *(commit: `d389d23`)*
- Dealer SQL data seeding and management *(commits: `9e4126f`, `1f22c55`)*

## Result

- **~1,000+ unique personal commits** — the largest single project in the portfolio
- **First online car sales platform** in the Turkish automotive market
- Served **3 automotive brands** (Fiat, Jeep, Alfa Romeo) under TOFAŞ
- Complete **payment pipeline**: credit card (Iyzico), wire transfer (havale), auto financing (PreApplyLoan)
- **Coupon/promotion engine** with cache management and double-use prevention
- **Stock management** with feature flags, live inventory sync, and color-level tracking
- **12+ state order lifecycle** with full audit trail via HistoryKey
- Multi-API architecture sharing an Infrastructure layer across consumer, dealer, and admin interfaces
- Successfully migrated from **.NET 6 → .NET 8** with middleware optimization
- Platform operated for **2+ years** processing real vehicle purchases
- Separately built **TOFAŞ CRM** (74 commits) with Datacord integration and subscription management

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about a complex e-commerce system" | Full story — 3 brands, payment pipeline, stock mgmt, 12-state orders |
| "Tell me about payment integration" | Iyzico CC, havale verification, auto loans, refund processing |
| "Your most impactful project?" | First online car sales in Turkey, ~1,000+ commits, 3 brands |
| "How do you handle state machines?" | 12+ order states, history tracking, status transitions, audit trail |
| "How do you manage stock/inventory?" | Feature flags, real-time TOFAŞ sync, color-level tracking, cache |
| "Tell me about a .NET migration" | .NET 6 → .NET 8, middleware optimization, constructor simplification |
| "How do you scale across multiple products?" | Shared Infrastructure layer, brand-specific API deployments |
| "How do you work with dealers/partners?" | Dealer portal API, claims-based auth, pricing, notifications |

---

## Key Technologies

`C#` · `.NET 6/8` · `ASP.NET Core` · `Entity Framework Core` · `SQL Server` · `Iyzico Payment Gateway` · `Redis Cache` · `Datacord CRM` · `React` · `Redux` · `Feature Flags` · `MVSS` · `OAuth` · `Swagger` · `wkhtmltopdf`
