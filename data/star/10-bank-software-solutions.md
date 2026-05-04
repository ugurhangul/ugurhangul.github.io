# STAR — Bank Software Solutions: Maritime Shipping Agency Automation Platform

> **Company:** Bank Software Solutions
> **Period:** Dec 2015 – Jul 2019
> **Role:** Fullstack .NET Developer
> **Evidence:** 233 commits (`AcenteOnline`) + 39 commits (`Kenway Project`) = **272 total commits** across 2 repositories, 7-project solution architecture

---

## Situation

Turkish maritime shipping agencies (gemi acenteleri) managed all port operations — vessel arrivals/departures, crew changes, cargo manifests, customs documentation, proforma disbursement accounts, and regulatory filings — using **manual paperwork, fax machines, and spreadsheets**. Each port call required generating dozens of official documents (Statement of Facts, Bill of Lading, Ballast Water reports, Customs petitions, Pilotage requests, Sanitation certificates, etc.) while coordinating with harbor masters, customs offices, health authorities, and vessel owners simultaneously. This was error-prone, time-consuming, and made audit compliance nearly impossible.

Bank Software Solutions (the company name, not banking-related) was hired to digitize and automate the entire shipping agency workflow.

## Task

As a Fullstack .NET Developer, I was responsible for **designing and building the maritime shipping agency automation platform** end-to-end:

- Build a complete vessel operations management system (arrival → port stay → departure)
- Automate generation of 40+ official maritime document types
- Implement proforma disbursement accounting with customizable formula engines
- Create a contact management (CRM) and internal communication system
- Build real-time vessel tracking and Bosphorus Strait monitoring
- Develop a multi-project modular architecture handling operations, printing, proformas, APIs, and utilities

## Action

### Solution Architecture (7 Projects, 272 commits)
- Designed a **7-project .NET solution** with clear separation of concerns:
  - **Acente.Client** — Main web application (MVC + controllers for all business domains)
  - **Acente.Operation** — Port operation management module
  - **Acente.Proforma** — Proforma disbursement accounting with wizard-based creation
  - **Acente.Print** — Document generation engine (40+ official maritime templates)
  - **Acente.DAL** — Data Access Layer with Entity Framework Code-First + migrations
  - **Acente.WebApi** — RESTful API for external integrations
  - **Bank.Utils** — Shared utilities, SignalR hubs, notification center
  - **Bank.File** — File management and document upload system

### Vessel Operations Management
- Built comprehensive **operation tracking** from vessel arrival to departure:
  - `OperationController` / `OperationsController` — Full lifecycle management
  - `BerthingsController` — Berth assignment and scheduling
  - `GemiController` — Vessel registry and details
  - `VisitedPortsController` — Port call history tracking
  - `CrewsController` — Crew roster management
  - `PassengersController` — Passenger manifests
  - `CheckInVisitorsController` — Port visitor access control
- *(Commits: `0611ec0` "Operation Done", `866841b` "Rehber Done", `bf67de6` "Şirket Done")*

### Maritime Document Generation Engine (40+ Templates)
- Built a dedicated **Print module** generating official Turkish maritime documents:
  - **Customs:** `GumrukMesai`, `GumrukPersonelDegisikligi`, `TalepGumrukMuhafaza`
  - **Port Authority:** `GelisGidisTutanagi`, `GelisKontrolVarakası`, `GidisKontrolZabitVarakasi`
  - **Health/Safety:** `SaglıkGidis`, `Sanitation`, `PersonelSahilSaglik`
  - **Cargo:** `BillOfLoading`, `Manifesto`, `Ordino`
  - **Crew:** `CrewList`, `Shorepass`, `ShorePassTutanak`, `PersonelDenizLimanı`
  - **Financial:** `Disbursements`, `FinalAcceptanceFatura`, `FinalAcceptancePdf`, `Voucher`
  - **Environmental:** `Atık Bildirim Formu` (Waste Notification), `Ballast Water`
  - **Navigation:** `Kılavuzluk` (Pilotage), `KılavuzRomarkajTalep`, `Talepname`
  - **Operations:** `DailyReport`, `Sof` (Statement of Facts), `SofSingle`, `GemiBildirim`
  - **Queries:** `GelisSorgu`, `GidisSorgu`, `SonOnLiman` (Last 10 Ports)
- *(Commits: `4724a1e` "Print Update", `b4e3d94` "page-break", `a57394b` "sof buttons & non-print class")*

### Proforma Disbursement Accounting
- Built a **wizard-based proforma creation system** for calculating port call costs:
  - `ProformaController` + `WizardController` — Step-by-step proforma creation
  - `ProformaDraftsController` — Draft management for iterative cost estimation
  - `ProformaDetailsController` — Line-item cost breakdowns
  - `ProformaRemarksController` — Notes and special conditions
- Implemented **custom formula engine** for flexible cost calculations:
  - `CustomFormulesController` — User-defined calculation formulas
  - `FormulaeController` / `FormulaIntervalsController` — Standard tariff formulas with tiered pricing
  - *(Commits: `6987c98` "Acente.Proforma Project Added", `0ee1170` "Proforma Done", `da2936b` "ProformaWizard Full Width")*
- Built proforma dashboard with Material UI for financial overview *(commit: `7935ea8`)*

### Contact Management & Communication
- Implemented **CRM-style contact management**:
  - `RehberController` — Contact directory (companies + people)
  - `SirketController` — Company registry management
  - Company/Person detail views with relationship tracking
- Built **internal mail system** with IMAP integration:
  - `MailBoxController` — Inbox, Sent, Spam, Trash views
  - `MailerDaemon` — Background mail processing
  - IMAP authentication support *(Kenway commit: `39aeb36` "ImapAuth Added")*
- Implemented **real-time notifications** via SignalR:
  - `SignalrHub` — WebSocket hub for live updates
  - `NotificationCenter` — Push notification management
  - `ChatPanel` / `PrivateChat` — Internal team messaging

### Statement of Facts (SOF) & Compliance
- Built the **Statement of Facts** system — the critical legal document recording all events during a vessel's port stay:
  - `SofsController` — SOF creation and management
  - Bulk SOF operations *(commit: `c18e0d1` "mdbulksof")*
  - SOF printing with customizable templates
  - FDA (Final Disbursement Account) integration *(commits: `d94e7fc` "Fda upgrade", `202ed4b` "Fda & Transit")*

### Vessel Tracking & Monitoring
- Integrated **VesselFinder** for real-time ship tracking
- Built **Bosphorus Strait monitoring** (`BogazTakip`) for tracking vessel transit through Istanbul
- Implemented **meteorology weather** integration for port operations
- Daily reporting system with `DailyReportsController`

### Supplementary Systems (Kenway Project — 39 commits)
- Built a separate **CRM and utility system** as a companion project:
  - `Bank.Kenway` — Core application with Web API security (OAuth)
  - `Bank.Kenway.CRM` — Customer relationship management module
  - `Bank.Compass.DAL` — Shared data access layer
  - `Bank.Kenway.Utils` — Shared utility library
  - Port/Pier registry management *(commits: `7be9bb9`, `7165dfa`, `6e663c0`)*
  - Staff document management *(commit: `435bc59` "StaffDocuments Added")*
  - Yellow Pages integration *(commit: `4fa3b19` "YellowPages Logo Added")*

### Technical Infrastructure
- Entity Framework **Code-First with migrations** — 8 database migrations tracking schema evolution *(VoyageRef, OperationLog, ChangeLog, Certificate, AuditFix)*
- **Audit logging** with `ContextChangeLog` for compliance tracking
- **OAuth authentication** with ASP.NET Identity
- **Material UI** dashboard theming *(commit: `5c49f35` "Altair Theme First Init")*
- Logging infrastructure *(commit: `0b730f9` "Logging Added")*
- Task/TODO management system for internal operations

## Result

- **272 commits** across 2 repositories delivering a complete maritime agency digitization platform
- **40+ official document templates** automated — from customs forms to Bill of Lading to Sanitation certificates
- **Proforma wizard** with custom formula engine replaced manual cost calculations for port call disbursements
- Real-time vessel tracking and Bosphorus monitoring enabled proactive operations management
- **Statement of Facts** automation ensured compliance with maritime regulations
- Internal CRM + mail + chat system unified all agency communications
- 7-project modular architecture demonstrated enterprise-grade code organization
- System served the company's shipping agency clients throughout the employment period (3.5 years)
- Gained deep domain expertise in **maritime logistics, customs regulations, and port operations**

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about a domain-heavy project" | Maritime shipping agency — 40+ document types, customs, port regulations |
| "Describe building a complete business system" | 7-project solution, 272 commits, operations + proforma + printing + CRM |
| "How do you handle complex document generation?" | Print module with 40+ templates, SOF, Bill of Lading, customs forms |
| "Tell me about working with formulas/calculations" | Custom formula engine for proforma disbursements with tiered pricing |
| "How do you approach real-time features?" | SignalR for notifications, vessel tracking, Bosphorus monitoring |
| "Describe a modular architecture you designed" | 7-project .NET solution: Client, Operation, Proforma, Print, DAL, WebApi, Utils |

---

## Key Technologies

`C#` · `.NET Framework` · `ASP.NET MVC` · `Entity Framework Code-First` · `SQL Server` · `SignalR` · `OAuth` · `Web API` · `Material UI` · `IMAP` · `Maritime Logistics` · `Document Generation` · `Port Operations`
