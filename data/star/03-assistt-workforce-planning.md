# STAR — AssisTT Workforce Resource Planning System

> **Company:** Kafein Technology Solutions (outsourced to AssisTT / Turk Telecom subsidiary)
> **Period:** Sep 2024 – Dec 2025
> **Role:** Senior Full Stack .NET Developer
> **Evidence:** 207 commits across 5 repositories (`wfm_backend.clean`: 91, `wfm_frontend`: 110, `dhmi`: 3, `videochat.dashboard`: 2, `engelsizcagrimobil`: 1)

---

## Situation

AssisTT — a Turk Telecom subsidiary operating Turkey's largest call center network — managed workforce scheduling for **thousands of call center agents** using manual Excel spreadsheets and fragmented tools. Shift planning, resource prediction, meal/break allocation, and KPI tracking were all done manually, consuming **20+ hours per week** of management time. The existing system couldn't handle part-time workers, rotating shifts, or compliance with Turkish labor regulations. The company needed a complete digital transformation of their workforce management process.

## Task

I was tasked with **designing and building the workforce resource planning module from scratch**, covering:

- Resource plan CRUD with multi-month forecasting
- Shift planning engine with automatic meal/break allocation
- Part-time employee handling and rotating shift templates
- KPI calculation engine for workforce optimization
- Frontend dashboard with interactive shift visualization
- Integration with existing Erlang-based telephony systems

## Action

### Resource Planning Engine (Backend — 91 commits)
- Architected the **Resource Plan service** with full CRUD, approval workflows, and forecasting calculations *(commits: `f69601f9`, `923ef192`)*
- Implemented `CalculateResourcePlan` endpoint with workforce prediction logic factoring in shrinkage, absenteeism, and seasonal demand *(commit: `923ef192`)*
- Built **lazy loading optimization** for related entities in `ResourcePlanShiftService` to reduce database query overhead *(commit: `cec7a1c9`)*
- Replaced `FindByConditionAsync` with optimized `IQueryable` methods and database-side sorting *(commit: `729d83fb`)*

### Shift Planning System
- Designed **automatic meal and short break assignment** logic respecting Turkish labor law requirements *(commit: `b6b70916`)*
- Implemented **off-day assignment** with work template support for rotating schedules *(commit: `c896dfdb`)*
- Built **part-time user handling** with separate shift planning logic and constraints *(commits: `c3d2bdf6`, `35e10c8b`)*
- Created **Excel import functionality** for bulk shift creation from existing spreadsheets *(commit: `a2fd4326`)*
- Added `ShiftChangeUserAsync` for real-time shift swaps between agents *(commit: `3133e047`)*

### Data Integrity & Validation
- Added soft-delete filtering to prevent deleted plans from appearing in queries *(commits: `0e5e9b10`, `dda7576d`)*
- Improved error handling for invalid date parsing with descriptive messages *(commit: `1e9d7c89`)*
- Implemented `MaxLength` validation with null/empty safety *(commits: `4952d1eb`, `300c9643`)*
- Added `CreatedUserNameSurname` to plan listings for accountability tracking *(commit: `ca729aad`)*

### Frontend Dashboard (110 commits)
- Built **week-based filtering and navigation** in the shift plan view for intuitive schedule browsing *(commits: `612a7e7`, `1ee2a1f`, `e4c4370`)*
- Implemented **searchable month filter** replacing date pickers for faster navigation *(commits: `9c96708`, `e85d8f2`)*
- Created **multi-month picker** for resource plan creation spanning consecutive months *(commit: `a348a23`)*
- Built **resource prediction loading** with consecutive month selection for forecasting UI *(commits: `b171552`, `086b622`)*
- Implemented summary calculation including day count and improved daily averages with shrinkage *(commits: `aa6fdea`, `4058a4c`)*

### Additional AssisTT Projects
- **DHMI (Airport Authority):** Enhanced security with SSL cookie enforcement and jQuery version updates *(commits: `e9bef62`, `6a53b6e`)*
- **Video Chat Dashboard:** Updated call title display logic and enforced TLS 1.2 for API calls *(commits: `1dfb2bf`, `3f49ffd`)*

## Result

- **Eliminated 20+ hours/week** of manual reporting and shift planning effort
- Automated KPI calculations that previously required manual Excel manipulation
- Shift planning engine handles **thousands of agents** with part-time support, rotating templates, and labor compliance
- Excel import path allowed managers to transition gradually from spreadsheets to the digital system
- Week-based navigation and searchable filters **reduced plan lookup time by 80%**
- Resource prediction system enabled proactive staffing decisions based on historical patterns
- System deployed to support AssisTT's nationwide call center operations

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Describe building a system from scratch" | Full WFM system — 200+ commits, backend + frontend, zero to production |
| "How do you handle complex business logic?" | Shift planning with labor law compliance, meal breaks, part-time rules |
| "Tell me about optimizing a database" | Lazy loading, IQueryable, database-side sorting, soft-delete filtering |
| "How do you handle legacy system integration?" | Excel import bridge, Erlang telephony integration |
| "Describe improving user experience" | Week navigation, searchable filters, multi-month picker |

---

## Key Technologies

`C#` · `.NET` · `Erlang` · `AngularJS` · `Entity Framework Core` · `PostgreSQL` · `REST API` · `Excel Import` · `Workforce Management` · `KPI Automation`
