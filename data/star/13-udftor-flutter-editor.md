# STAR — UDFtör: Flutter Mobile Document Editor with Digital Signing

> **Company:** Personal Project
> **Period:** 2025 – Present
> **Role:** Sole Developer
> **Evidence:** 15 commits in `UDF-Editor` repository, 30 Dart source files

---

## Situation

**UDF (Universal Document Format)** files are used in Turkish government and institutional contexts for official documents. Existing mobile viewers could only display these files — they couldn't **edit** the content or apply **digital signatures** (TC Kimlik / national ID card signing). This forced users to use desktop software for any document editing or signing workflow. No mobile-first UDF editor existed on the market.

## Task

Build a **Flutter mobile app** that:

- Parses and renders UDF document files
- Provides rich text editing with paragraph structure preservation
- Integrates TC Kimlik card **digital signing** via NFC
- Supports multiple signing methods (NFC ID card, USB OTG, Mobil İmza)
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

### Digital Signing Integration (TC Kimlik Card)
Built a comprehensive **digital signing pipeline** supporting multiple signing methods:

- **NFC ID Card signer** (`nfc_id_card_signer.dart`) — reads TC Kimlik card via NFC
- **NFC Smart Card signer** (`nfc_smart_card_signer.dart`) — generic smart card support
- **NFC bridge** (`nfc_bridge.dart`) — low-level NFC communication
- **USB OTG signer** (`usb_otg_signer.dart`) — USB-connected card readers
- **Mobil İmza signer** (`mobil_imza_signer.dart`) — mobile signature service integration
- **CAdES builder** (`cades_builder.dart`) — CMS Advanced Electronic Signatures
- **TSA client** (`tsa_client.dart`) — Timestamp Authority for signature validity
- **Signature verifier** (`signature_verifier.dart`) — validates existing signatures
- **Signing service** (`signing_service.dart`) — orchestrates the signing workflow

#### Signing Flow Implementation
- Built **PIN status detection** for TC Kimlik card — checks if card is ready *(commit: `3868ae3`)*
- Fixed **stuck PIN check screen** — handled edge case where PIN check would hang *(commit: `3bb6ddc`)*
- Implemented **signing screen** for selecting and executing digital signature processes *(commit: `04ccb57`)*
- Integrated signing with **UDF archive pipeline** *(commit: `77f3702`)*
- Added sign and edit buttons to reader screen app bar *(commit: `43919ac`)*

### Monetization — Pro Subscription
- **Gated signing behind Pro subscription** — free users can read/edit, Pro users can sign *(commit: `19a8aea`)*
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
- **TC Kimlik digital signing** via NFC with CAdES signatures and TSA timestamping
- **4 signing methods**: NFC ID card, NFC smart card, USB OTG, Mobil İmza
- **Pro subscription** monetization with feature gating (signing behind paywall)
- **Cloud sync** support for Google Drive and iCloud
- **30 Dart source files** across a well-structured Flutter application

---

## Interview Questions This Covers

| Question | How to Answer |
|----------|--------------|
| "Tell me about mobile development" | Flutter app with custom parser, NFC signing, cloud sync, monetization |
| "How do you handle third-party library issues?" | 3 flutter_quill fixes → pragmatic pivot to custom TextField solution |
| "Tell me about working with hardware (NFC)" | TC Kimlik card via NFC, PIN detection, stuck screen edge cases |
| "How do you handle encoding/character issues?" | UTF-8 byte offset → char offset conversion for Turkish characters |
| "Tell me about monetization" | Pro subscription, paywall gating, ad hiding for subscribers |
| "How do you make build-vs-buy decisions?" | flutter_quill was popular but buggy — custom solution proved better |

---

## Key Technologies

`Flutter` · `Dart` · `NFC` · `CAdES` · `TSA` · `Digital Signatures` · `TC Kimlik` · `UDF Format` · `UTF-8 Parsing` · `Google Drive API` · `iCloud` · `In-App Purchases` · `Mobile Development`
