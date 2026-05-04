# STAR — Enterprise Aerospace Compliance Platform (MeterpiAuditor)

> **Company:** Confidential Client (via HAUS Technology)
> **Period:** 2026
> **Role:** Sole Architect & Developer
> **Evidence:** CV artifacts, architecture documentation, 8-project .NET solution

---

## Situation

An aerospace manufacturing supply chain company needed to validate supplier document packages against **AS9100D** quality standards and **DIN EN 10204** material certification requirements. Each supplier package contains **compound PDF files** — sometimes 50+ pages mixing 12 different document types (Purchase Orders, Material Test Reports, Certificates of Conformance, FAI Form 3 reports, shipping lists, MSDS sheets, etc.). Auditors were manually reading, classifying, and cross-referencing these documents — a process taking **hours per package** with significant human error risk. In aerospace, a missed traceability link (wrong heat number, mismatched material spec) can ground aircraft and trigger regulatory action.

## Task

I was hired to build an **end-to-end automated audit system** that could:

- Accept compound PDF packages and intelligently split them into individual documents
- Classify each document into one of 12 aerospace document types
- Extract structured data (part numbers, heat numbers, material specs, quantities)
- Cross-reference extracted data across documents for traceability validation
- Produce compliance scores against AS9100D and DIN EN 10204 standards
- Provide auditor review UI for oversight and exception handling

## Action

### 3-Stage Cascade AI Classifier
- Engineered a **cascade classification system** that short-circuits at the cheapest confident stage:
  1. **Keyword Scoring**: Fast pattern matching against known document signatures
  2. **LLM Text Classification**: Ollama-hosted language model for uncertain cases
  3. **Vision Language Model**: VLM for truly ambiguous pages (scanned images, complex layouts)
- This approach **optimizes cost and latency** — most documents are classified at stage 1 without LLM invocation

### Structured Data Extraction via LLM
- Designed **JSON schema prompts** for each document type to extract structured data into strongly-typed DTOs
- Built a robust **LLM JSON sanitization layer** handling malformed outputs: partial JSON, markdown fences, trailing content, format inconsistencies
- Integrated **Docling OCR** for document structure extraction with table detection and bounding box indexing

### Deterministic Compliance Engine
- Implemented **NRules engine** for deterministic, auditable compliance checking:
  - **AS9100D §8.4**: Supplier verification rules
  - **AS9100D §8.5.2**: Traceability requirements
  - Material chemistry verification against **ASTM specifications** (composition ranges, mechanical limits)
  - Cross-document traceability: PO line items ↔ MTR material specs, shipped heat numbers ↔ MTR heat numbers
- Chose NRules over LLM for compliance because **rules must be deterministic and reproducible** — LLMs hallucinate, NRules produces identical results for identical inputs

### Supply Chain Graph
- Designed a **document relationship graph** for cross-document traceability
- Automatically detects **missing documents** in the supply chain (e.g., PO references a material but no MTR exists)
- Validates quantity consistency across PO → shipping → receiving documents

### Architecture & Infrastructure
- Built a modular **8-project .NET 8 solution** following Clean Architecture:
  - Extraction, Orchestration, Rules, Validation, Graph, Pipelines, Models, Web
- Implemented **config-driven pipeline orchestrator** — add new document types without code changes
- Created **SHA-256 content-addressed caching** to prevent redundant document re-processing
- Built **Blazor Server** interactive UI with drag-and-drop upload and real-time audit progress

### Auditor Review UI
- Developed **interactive boundary review** where auditors toggle split points on compound PDFs
- Built page-strip thumbnails with confidence indicators for each proposed split
- Implemented **12-slot document classification** dashboard covering the full aerospace document flow

## Result

- Automated processing of **12 distinct aerospace document types** through AI classification and extraction
- **3-stage cascade classifier** reduces LLM costs by short-circuiting at the cheapest confident stage
- **8+ AS9100D compliance rules** implemented with deterministic, auditable NRules engine
- Content-addressed caching **eliminates redundant processing** of previously-seen documents
- Compound PDF splitting with AI-detected boundaries **reduces manual document preparation time**
- Architecture supports **new document types via configuration** without code changes
- Comprehensive test coverage across **4 test projects** with ~1,200 code entities
- System produces actionable compliance scores with specific violation details and remediation guidance

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Why this architecture?" | Pipeline pattern — each stage independently testable, configurable, replaceable |
| "How does the AI classification work?" | 3-stage cascade: cheap keyword first, LLM when uncertain, VLM for ambiguous |
| "Why NRules instead of LLM for compliance?" | Deterministic, auditable, reproducible — LLMs hallucinate, NRules doesn't |
| "How do you handle compound PDFs?" | Boundary detection + interactive review — AI proposes, human decides |
| "What was the hardest part?" | LLM output sanitization — real-world JSON from LLMs is messy |

---

## Key Technologies

`.NET 8` · `C#` · `Blazor Server` · `Ollama` · `Docling` · `NRules` · `FluentValidation` · `Clean Architecture` · `AS9100D` · `DIN EN 10204` · `SHA-256` · `LLM` · `VLM` · `OCR` · `Pipeline Pattern`
