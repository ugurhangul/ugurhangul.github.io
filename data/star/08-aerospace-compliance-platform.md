# STAR — Enterprise Aerospace Compliance Platform

> **Company:** Confidential Client (Independent Software Engineer / Consultant)
> **Period:** Apr 2026 – Present
> **Role:** Software Architect / Senior .NET Developer
> **Evidence:** CV artifacts, architecture documentation, 13-project .NET 10 modular monolith

---

## Situation

An aerospace manufacturing supply chain company needed to validate supplier document packages against **AS9100** quality standards and **EN 10204** material certification requirements. Each supplier package contains **compound PDF files** — mixing 22 different document types (Purchase Orders, Material Test Reports, Certificates of Conformance, FAI Form 3 reports, shipping lists, MSDS sheets, etc.). Auditors were manually reading, classifying, and cross-referencing these documents — a manual process with significant human error risk. In aerospace, a missed traceability link (wrong heat number, mismatched material spec) can ground aircraft and trigger regulatory action.

## Task

I was hired to build an **end-to-end automated audit system** that could:

- Accept compound PDF packages and intelligently split them into individual documents
- Classify each document into one of 22 aerospace document types, with bounding box evidence
- Extract structured data (part numbers, heat numbers, material specs, quantities)
- Cross-reference extracted data across documents for traceability validation
- Run deterministic compliance checks against AS9100 and EN 10204 standards
- Provide auditor review UI for oversight and exception handling

## Action

### 3-Stage Cascade AI Classifier
- Engineered a **cascade classification system** that short-circuits at the cheapest confident stage:
  1. **Keyword Scoring**: Fast pattern matching against known document signatures
  2. **LLM Text Classification**: Self-hosted language model for uncertain cases
  3. **Vision Language Model**: VLM for truly ambiguous pages (scanned images, complex layouts)
- This approach **optimizes cost and latency** — most documents are classified at stage 1 without LLM invocation
- Integrated **self-hosted AI inference** to support confidential and fully air-gapped environments, with no CDN, cloud model or telemetry

### Structured Data Extraction via LLM
- Designed **JSON schema prompts** for each document type to extract structured data into strongly-typed DTOs
- Built a robust **LLM JSON sanitization layer** handling malformed outputs: partial JSON, markdown fences, trailing content, format inconsistencies

### Deterministic Compliance Engine
- Implemented **NRules engine** (47 rule classes against AS9100 and EN 10204) for deterministic, auditable compliance checking:
  - **AS9100 §8.4**: Supplier verification rules
  - **AS9100 §8.5.2**: Traceability requirements
  - Material documentation verification (composition ranges, mechanical limits)
  - Cross-document traceability: PO line items ↔ MTR material specs, shipped heat numbers ↔ MTR heat numbers
- Chose NRules over LLM for compliance because **rules must be deterministic and reproducible** — LLMs hallucinate, NRules produces identical results for identical inputs
- Separated concerns so that models extract and locate while the rules engine alone judges, keeping audit verdicts reproducible and pinning every finding to its source page coordinates

### Supply Chain Graph
- Designed a **document relationship graph** for cross-document traceability
- Automatically detects **missing documents** in the supply chain (e.g., PO references a material but no MTR exists)
- Validates quantity consistency across PO → shipping → receiving documents

### Architecture & Infrastructure
- Built a **13-project .NET 10 modular monolith** organised into bounded contexts
- Implemented **PostgreSQL persistence on EF Core 10** with insert-only findings and an append-only audit log enforced by database triggers
- Built a **React 19 / TypeScript** operator interface with Playwright end-to-end and axe-core accessibility suites

### Auditor Review UI
- Developed **interactive boundary review** where auditors toggle split points on compound PDFs
- Built page-strip thumbnails with confidence indicators for each proposed split
- Implemented **22-type document classification** dashboard covering the full aerospace document flow

## Result

- Automated processing of **22 distinct aerospace document types** through AI classification and extraction
- **3-stage cascade classifier** short-circuits at the cheapest confident stage
- **47 NRules rule classes** against AS9100 and EN 10204, deterministic and auditable
- Compound PDF splitting with AI-detected boundaries and interactive auditor review
- Comprehensive test coverage: **2,600+ xUnit and FluentAssertions tests** and **31 architecture decision records**
- Audit verdicts are reproducible, and every finding is pinned to its source page coordinates

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Why this architecture?" | 13-project modular monolith organised into bounded contexts |
| "How does the AI classification work?" | 3-stage cascade: cheap keyword first, LLM when uncertain, VLM for ambiguous |
| "Why NRules instead of LLM for compliance?" | Deterministic, auditable, reproducible — LLMs hallucinate, NRules doesn't |
| "How do you handle compound PDFs?" | Boundary detection + interactive review — AI proposes, human decides |
| "What was the hardest part?" | LLM output sanitization — real-world JSON from LLMs is messy |

---

## Key Technologies

`.NET 10` · `C#` · `PostgreSQL` · `EF Core 10` · `React 19` · `TypeScript` · `Self-Hosted AI Inference` · `NRules` · `Hangfire` · `xUnit` · `FluentAssertions` · `Playwright` · `Modular Monolith` · `AS9100` · `EN 10204` · `LLM` · `VLM`
