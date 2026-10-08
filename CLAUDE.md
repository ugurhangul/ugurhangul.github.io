# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio/CV site for ugurhangul, served by GitHub Pages straight from `master`. Plain HTML/CSS/vanilla JS. No package manager, bundler, build step, linter or test suite.

## Running locally

The JS loads JSON with `fetch`, so opening `index.html` from disk (`file://`) breaks the data sections. Serve the repo root over HTTP:

```
python -m http.server 8000
```

Then open http://localhost:8000. Nothing else to build. Verify changes in a browser and check the console.

## Architecture

- `index.html` is the single page. Most section content (experience, education, impact) is hand-written HTML; data-driven sections are empty containers (`#tech-radar`, `#sector-chart`, `#heatmap-container`, `#repo-grid`, `#projects-grid`) that the JS fills on `DOMContentLoaded`.
- Script order matters: Chart.js 4 (jsDelivr CDN) → `evidence-engine.js` → `main.js` → `heatmap.js` → `charts.js`. Each file is a plain global script, no modules.
- CSS: `css/index.css` holds design tokens and globals, `css/components.css` holds typographic components, `css/style.css` is a small remainder. Pages also use many inline `style=""` attributes.

### Data flow

- **`data/evidence_data.json`** is the main precomputed dataset (stats, `languageBreakdown`, `personalHighlights`, sectors). `getPortfolioData()` in `js/main.js` fetches it once (memoized promise), then merges live public repos from the GitHub REST API into it. The API result is cached in `localStorage` (`github_public_repos`, 24h). All render functions in `main.js` and `charts.js` read through `getPortfolioData()`.
- **`data/evidence_manifest.json`** holds the STAR case studies (`id`, `title`, `situation`, `task`, `action`, `result`, `tech`), sourced from `data/star/*.md`. `js/evidence-engine.js` loads it and opens a modal for any element with `data-star-id="<id>"`, using a small regex Markdown-to-HTML converter. No script in the repo generates this manifest. Edit the JSON when a STAR doc changes.
- **Heatmap** (`js/heatmap.js`) fetches `github-contributions-api.deno.dev` directly, also with a `localStorage` cache.
- `loadProjects()` tries `data/linkedin/Projects.csv`, but `data/linkedin/` is gitignored, so on the live site that fetch 404s and is skipped. It only shows up locally.

### Offline data pipeline (`scripts/`, gitignored)

Python scripts that build `evidence_data.json` from private sources. They exist only on the author's machine.

1. `scrape_clockwork.py` finds commits by the author in the Clockwork-Agency org and writes `data/clockwork_contributions.json`. Needs `GH_TOKEN` or `GITHUB_TOKEN`.
2. `detect_techstack.py` / `enrich_techstack.py` add tech-stack info to that file.
3. `prepare_evidence.py` merges it with `data/github_stats.json` into `data/evidence_data.json`, including the sector and headline-stat precomputation.

The intermediate JSON files are private and gitignored. Only `evidence_data.json` (and the manifest) ship.

## Private data: do not commit

`.gitignore` excludes `scripts/`, `data/linkedin/`, `data/clockwork_contributions.json`, `data/github_stats.json`, `aysenur_data/` and `cv_extracted.txt`. They hold personal or employer data (LinkedIn export with messages and contacts, private org contributions). Never stage them, and never make the site depend on them.

## Current work

Branch `feat/bold-typography-redesign` follows `docs/PLAN-typography-redesign.md`: a high-contrast black/white/vermillion editorial design, Inter Tight headlines, no rounded corners, and STAR evidence modals.
