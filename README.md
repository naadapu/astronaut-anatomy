# Astronaut Anatomy ([View Site](https://mrvivacious.github.io/astronaut-anatomy/))

## *"What does it take to go to space?"*

Explore the qualities of astronauts selected for NASA missions (data is from Wikipedia and NASA websites).

Created for students interested in becoming astronauts. Astronomy enthusiasts welcome.


#### Note to all astronaut prospects: This is not a how-to guide. This project describes selected astronauts and lacks applicant data. Copying surface traits without replicating underlying skillsets, responsibilities, successes...is unlikely to help.

### 👩‍🚀 features
```
- Bar graph breaking down degree spread
- Filter astronauts by miltary / civilian
- Data from 2004 to present (69 astronauts)
- View astronaut age at selection, education history, and military experience
```
### 🚀 future nice to haves
- display astronaut career experiences
- compare astronaut skillsets and experiences against the missions they were recruited for
- some more filters

---

## Performance Audit

**Audit date:** 2026-05-17  
**Total JS:** ~69 KB across 6 files | **CSS:** 2.1 KB | **Images:** none

### Findings

| # | Issue | File(s) | Impact |
|---|-------|---------|--------|
| 1 | Scripts placed **after `</html>`** (invalid HTML) with no `defer` — browser cannot download them in parallel during HTML parse | `index.html` lines 97–102 | High |
| 2 | **6 separate synchronous HTTP requests** for JS files — each request adds round-trip overhead | `index.html` | High |
| 3 | **Render-blocking CSS** loaded via `<link>` — browser won't paint anything until the 2.1 KB stylesheet is fetched | `index.html` line 6, `stylesheet.css` | Medium |
| 4 | **Entire `displaySummary.js` is dead code** — all 5 target elements are commented out in HTML, yet `getAgeAveragesObject()` still runs on every load and its result is silently discarded | `displaySummary.js`, `index.html` | Medium |
| 5 | **`data.js` (54 KB, 76% of all JS) opens with ~19 lines of comments** including an embedded block comment with a JS snippet — wastes bytes and parse time on the largest file | `data.js` lines 1–19 | Low–Medium |

### Top 5 Performance Todos (ranked by impact)

- [ ] **1. Add `defer` to all script tags and move them inside `</body>`**
  - Scripts currently sit between `</body>` and `</html>` — technically invalid HTML that browsers silently fix
  - `defer` lets the browser download all scripts in parallel while parsing HTML, then execute them in declaration order after the DOM is ready
  - Change: move lines 97–102 of `index.html` to just before `</body>`, add `defer` to each `<script>` tag
  - Note: `degreeChart.js` already uses `DOMContentLoaded`, which fires *after* deferred scripts run, so no timing issues

- [ ] **2. Bundle the 5 app JS files into a single `app.js`**
  - `filterService.js`, `dataService.js`, `displaySummary.js`, `groups_display.js`, `degreeChart.js` can be concatenated in that order
  - Reduces 5 HTTP requests to 1 — saves 4 round trips worth of latency and header overhead
  - `data.js` should remain separate so it can be cached independently from the code files
  - Result: `<script defer src="data.js"></script>` + `<script defer src="app.js"></script>`

- [ ] **3. Inline `stylesheet.css` into a `<style>` block in `<head>`**
  - The CSS file is render-blocking: the browser will not paint a single pixel until this file is downloaded and parsed
  - At 2.1 KB the file is tiny, but inlining it means the CSS arrives with the initial HTML response — zero extra round trips
  - Change: replace `<link rel="stylesheet" href="stylesheet.css">` with `<style>` + paste contents of `stylesheet.css`

- [ ] **4. Delete (or gut) `displaySummary.js`**
  - Every `getElementById` call in the file returns `null` because `#astronaut_count`, `#degree_counts`, `#military_counts`, `#age_all_groups`, and `#age_by_group` are all commented out in `index.html`
  - Despite this, `getAgeAveragesObject()` still executes on every page load — it iterates all groups and does arithmetic — and its result is immediately thrown away
  - The functions `formatDegreeCounts()`, `formatMilitaryCounts()`, and `prettyPrintGroupAverages()` are defined but never reachable
  - Removing the file from the bundle (or from `index.html`) changes zero visible behavior

- [ ] **5. Strip the dead comment block from `data.js`**
  - Lines 1–19 of `data.js` are comments only: a field-category list, a block comment with an unused JS snippet, and a `// todo` line
  - Removing them trims ~800 bytes from the 54 KB file and reduces parse overhead on the largest asset
  - Also consider removing the `getGenderCounts()` stub in `dataService.js` (returns `null`, never called)

