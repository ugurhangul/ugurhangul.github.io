# STAR — UDFtör: UYAP Document Handling Mobile App

> **Company:** Personal Project
> **Period:** 2026
> **Role:** Sole Developer
> **Evidence:** 15 commits in `UDF-Editor` repository, 30 Dart source files

---

## Situation

**UYAP UDF legal documents** (the document format of Turkey's national judiciary system, UYAP) are used for official legal filings. Existing mobile viewers could only display these files — they couldn't **edit** the content. This forced users to use desktop software for any document editing workflow.

## Task

Build an end-to-end **Flutter mobile app** (a framework new to me, delivered with an AI-assisted development workflow) that:

- Parses and renders UDF document files
- Provides rich text editing with paragraph structure preservation
- Evaluates mobile signature (**CAdES**) integration across Turkish operator-backed signing providers
- Implements monetization via Pro subscription with feature gating
- Handles edge cases in UTF-8 byte offset conversion and rendering

## Action

### UDF Document Engine (Custom Parser & Serializer)
- Built a **custom UDF parser** (`udf_parser.dart`) handling document structure extraction
- Fixed critical **UTF-8 byte offset → character offset** conversion for proper text positioning *(commit: `2299b0a`)*
- Created **UDF serializer** (`udf_serializer.dart`) for saving edited documents back to UDF format
- Built **UDF document model** (`udf_document.dart`, `models.dart`) for in-memory representation
- Implemented **UDF archive** support (`udf_archive.dart`) for packaged document handling
- Created **UDF Delta converter** (`udf_delta_converter.dart`) for rich text ↔ UDF format bridging

### Rich Text Editor — Pragmatic Library Evolution
The editor went through a **deliberate evolution** — documented in commit history:

1. **Started with flutter_quill** — industry-standard rich text editor *(commit: `0f98c5b` — v0.1.0)*
2. **Hit RenderViewport crash** — Delta conversion errors caused sliver rendering failures *(commit: `521205f`)*
3. **Tried explicit QuillEditor** — replaced `QuillEditor.basic` to avoid sliver crash *(commit: `84fb7eb`)*
4. **Tried multiRowsDisplay toolbar** — bypassed scroll bug *(commit: `2b20ed1`)*
5. **Pivoted to custom TextField** — replaced flutter_quill entirely with a custom TextField-based editor that proved simpler and more reliable *(commit: `287fb15`)*
6. **Fixed paragraph preservation** — ensured structure and formatting survive save/load cycles *(commit: `2bad189`)*

**Key insight**: Replaced a buggy third-party library with a simpler custom solution when 3 attempted fixes proved insufficient.

### Digital Signing Evaluation (CAdES)
Evaluated mobile signature (**CAdES**) integration across Turkish operator-backed signing providers.

### Monetization — Pro Subscription
- Implemented **paywall button** in editor Pro gate *(commit: `4242680`)*
- **Hide ads for Pro subscribers** *(commit: `4504c11`)*
- Built `paywall_service.dart` for subscription management
- Created `ad_banner_widget.dart` for ad placement

### Additional Features
- **File browser** (`file_browser_screen.dart`) for navigating local UDF files
- **Google Drive sync** (`google_drive_sync.dart`) for cloud document access
- **iCloud sync** (`icloud_sync.dart`) for Apple ecosystem integration
- **Sync service** (`sync_service.dart`, `sync_metadata.dart`, `sync_state.dart`, `sync_settings_screen.dart`) for cross-device document sync
- **Reader screen** (`reader_screen.dart`) for document viewing
- **Theme** (`theme.dart`) for consistent app styling
- **Routes** (`routes.dart`) for navigation

## Result

- **15 commits** delivering a complete Flutter document editor from zero
- **Custom UDF parser/serializer** with UTF-8 byte offset handling for Turkish character support
- **Pragmatic library decision**: 3 flutter_quill bug fixes → pivot to simpler TextField — documented evolution
- **Evaluated mobile signature (CAdES) integration** across Turkish operator-backed signing providers
- **Pro subscription** monetization with feature gating
- **Cloud sync** support for Google Drive and iCloud
- **30 Dart source files** across a well-structured Flutter application

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about mobile development" | Flutter app with custom parser, CAdES signing evaluation, cloud sync, monetization |
| "How do you handle third-party library issues?" | 3 flutter_quill fixes → pragmatic pivot to custom TextField solution |
| "How do you handle encoding/character issues?" | UTF-8 byte offset → char offset conversion for Turkish characters |
| "Tell me about monetization" | Pro subscription, paywall gating, ad hiding for subscribers |
| "How do you make build-vs-buy decisions?" | flutter_quill was popular but buggy — custom solution proved better |

---

## Key Technologies

`Flutter` · `Dart` · `CAdES` · `UDF Format` · `UTF-8 Parsing` · `Google Drive API` · `iCloud` · `In-App Purchases` · `Mobile Development`
