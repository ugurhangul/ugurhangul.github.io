# PLAN: Bold Typography Portfolio Redesign

## Overview
This plan outlines the transformation of the portfolio into a **Bold Typography** editorial-style dashboard on the `feat/bold-typography-redesign` branch. The redesign focuses on "Poster Design for Web," prioritizing extreme typographic scale, high contrast, and deep evidence integration from 22 STAR documents.

**Project Type**: WEB (Vanilla HTML/CSS/JS)

## User Review Required
> [!IMPORTANT]
> - **Visual Identity**: Switching to a high-contrast Black/White/Vermillion palette.
> - **Typography**: Using "Inter Tight" for massive headlines (up to 160px).
> - **Evidence Engine**: We will parse STAR documents into a local manifest for instant loading.
> - **Design System**: No rounded corners, sharp edges, and animated typographic underlines.

## Success Criteria
- [ ] 22 STAR documents integrated via embedded modals.
- [ ] 150M+ rows and other metrics displayed as "Impact Badges" with 6:1 scale ratio.
- [ ] 1.5% fractal noise texture applied to background.
- [ ] Performance score remains > 95 on Lighthouse.
- [ ] Responsive design works across all breakpoints (mobile to 9xl desktop).

## Tech Stack
- **Languages**: HTML5, CSS3, Vanilla JavaScript.
- **Fonts**: Inter Tight (Google Fonts).
- **Icons**: Lucide-React (1.5px stroke).
- **Data**: JSON manifest generated from STAR Markdown files.

## File Structure
```text
/
├── index.html                  # Structure update
├── css/
│   ├── index.css               # Design tokens & Global styles
│   └── components.css          # New typographic components
├── js/
│   ├── main.js                 # Modal logic & Data engine
│   └── evidence-engine.js      # [NEW] Manifest loader
└── data/
    └── evidence_manifest.json  # [NEW] Aggregated STAR data
```

## Task Breakdown

### Phase 1: Data Infrastructure
| ID | Task Name | Agent | Skills | Priority | Input → Output → Verify |
|:---|:---|:---|:---|:---|:---|
| 1.1 | Create Evidence Aggregator | project-planner | clean-code | P0 | Read `data/star/*.md` → `data/evidence_manifest.json` → Verify JSON structure matches STAR metadata. |

### Phase 2: Design System (The Manifesto)
| ID | Task Name | Agent | Skills | Priority | Input → Output → Verify |
|:---|:---|:---|:---|:---|:---|
| 2.1 | Centralize CSS Tokens | frontend-specialist | frontend-design | P0 | `design-system` spec → `css/index.css` variables → Check contrast ratios & font loading. |
| 2.2 | Implement Texture & Grid | frontend-specialist | frontend-design | P1 | SVG Filter → `body` background → Visible fractal noise at 1.5% opacity. |

### Phase 3: Component Engineering
| ID | Task Name | Agent | Skills | Priority | Input → Output → Verify |
|:---|:---|:---|:---|:---|:---|
| 3.1 | Build Impact Matrix | frontend-specialist | frontend-design | P1 | `cv.md` metrics → `index.html` section → Verify 6:1 scale ratio for H1 vs Body. |
| 3.2 | Build Evidence Modal | frontend-specialist | webapp-testing | P0 | `evidence_manifest.json` → `js/main.js` modal logic → Trigger modal on click & verify content. |
| 3.3 | Typographic Refactor | frontend-specialist | frontend-design | P1 | Existing HTML → Bold Typography styles → Verify no rounded corners & animated underlines. |

### Phase 4: Final Polish
| ID | Task Name | Agent | Skills | Priority | Input → Output → Verify |
|:---|:---|:---|:---|:---|:---|
| 4.1 | Animation & Motion | frontend-specialist | performance-profiling | P2 | Design specs → CSS Transitions → Verify 150ms decisive easing on interactions. |

## Phase X: Final Verification
- [ ] `python .agent/scripts/verify_all.py .`
- [ ] `python .agent/skills/frontend-design/scripts/ux_audit.py .`
- [ ] No purple/violet hex codes (`#FF3D00` only for accent)
- [ ] Socratic Gate respected.
