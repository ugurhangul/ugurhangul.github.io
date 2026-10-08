# STAR — Bank Software Solutions: Maritime Shipping Agency Automation Platform

> **Company:** Bank Software Solutions
> **Period:** Dec 2015 – Jul 2019
> **Role:** Full Stack .NET Developer
> **Evidence:** 233 commits (`AcenteOnline`) + 39 commits (`Kenway Project`) = **272 total commits** across 2 repositories, 7-project solution architecture

---

## Situation

A maritime shipping agency (gemi acentesi) needed a platform for port operations — vessel arrivals/departures, crew, cargo, customs, port authority workflows, and proforma disbursement accounting. Each port call required official documents (Statement of Facts, Bill of Lading, Ballast Water reports, Customs petitions, Pilotage requests, Sanitation certificates, etc.), and operational status tracking relied on manual work.

Bank Software Solutions (the company name, not banking-related) employed me to build this platform.

## Task

As a Full Stack .NET Developer, I was responsible for **designing and building the maritime shipping agency automation platform** end-to-end:

- Build a vessel operations management system (arrival → port stay → departure)
- Automate generation of 30+ official maritime document types
- Implement proforma disbursement accounting with customizable formula engines
- Create a contact management (CRM) and internal communication system
- Build real-time vessel tracking and Bosphorus Strait monitoring
- Develop a multi-project modular architecture handling operations, printing, proformas, APIs, and utilities

## Action

### Solution Architecture (7 Projects, 272 commits)
- Designed a **7-project .NET modular monolith** organised by business capability, over a shared Entity Framework Code-First data layer:
  - **Acente.Client** — Main web application (MVC + controllers for all business domains)
  - **Acente.Operation** — Port operation management module
  - **Acente.Proforma** — Proforma disbursement accounting with wizard-based creation
  - **Acente.Print** — Document generation engine (30+ official maritime templates)
  - **Acente.DAL** — Data Access Layer with Entity Framework Code-First + migrations
  - **Acente.WebApi** — RESTful API for external integrations
  - **Bank.Utils** — Shared utilities, SignalR hubs, notification center, file management and document upload

### Vessel Operations Management
- Built **operation tracking** from vessel arrival to departure:
  - `OperationController` / `OperationsController` — Full lifecycle management
  - `BerthingsController` — Berth assignment and scheduling
  - `GemiController` — Vessel registry and details
  - `VisitedPortsController` — Port call history tracking
  - `CrewsController` — Crew roster management
  - `PassengersController` — Passenger manifests
  - `CheckInVisitorsController` — Port visitor access control
- *(Commits: `0611ec0` "Operation Done", `866841b` "Rehber Done", `bf67de6` "Şirket Done")*

### Maritime Document Generation Engine (30+ Templates)
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
- Built proforma dashboard for financial overview *(commit: `7935ea8`)*

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
- Built the **Statement of Facts** system — the document recording events during a vessel's port stay:
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
- Built and consumed **WCF services** for system-to-system integration across the platform
- Entity Framework **Code-First with migrations** — 8 database migrations tracking schema evolution *(VoyageRef, OperationLog, ChangeLog, Certificate, AuditFix)*
- **Audit logging** with `ContextChangeLog` for change tracking
- **OAuth authentication** with ASP.NET Identity
- Dashboard theme *(commit: `5c49f35` "Altair Theme First Init")*
- Logging infrastructure *(commit: `0b730f9` "Logging Added")*
- Task/TODO management system for internal operations

## Result

- **272 commits** across 2 repositories delivering the maritime agency automation platform
- **30+ official document templates** automated — from customs forms to Bill of Lading to Sanitation certificates
- **Proforma wizard** with custom formula engine for port call disbursement calculations
- Real-time vessel tracking and Bosphorus monitoring, reducing reliance on manual operational status tracking
- **Statement of Facts** generation and printing automated
- Internal CRM, mail and chat system with SignalR notifications
- 7-project modular architecture organised by business capability

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about a domain-heavy project" | Maritime shipping agency — 30+ document types, customs, port regulations |
| "Describe building a business system end to end" | 7-project solution, 272 commits, operations + proforma + printing + CRM |
| "How do you handle complex document generation?" | Print module with 30+ templates, SOF, Bill of Lading, customs forms |
| "Tell me about working with formulas/calculations" | Custom formula engine for proforma disbursements with tiered pricing |
| "How do you approach real-time features?" | SignalR for notifications, vessel tracking, Bosphorus monitoring |
| "Describe a modular architecture you designed" | 7-project .NET solution: Client, Operation, Proforma, Print, DAL, WebApi, Utils |

---

## Key Technologies

`C#` · `.NET Framework` · `ASP.NET MVC` · `Entity Framework Code-First` · `SQL Server` · `SignalR` · `OAuth` · `Web API` · `WCF` · `IMAP` · `Maritime Logistics` · `Document Generation` · `Port Operations`
