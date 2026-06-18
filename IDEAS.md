# Ideas doc

## V2 launch plan - June 24th END OF DAY
• Degree explorer feature: easy way to see all the degrees and majors in the dataset

• Military branch viewer: simple bar graph should suffice. can split bars by gender too, now that we track that data (thx snehal)

• ui improvements - mobile friendly, maybe collapse the table, make the filters and graphs more clearer / overall organiztion

• bonus: start tracking astronaut career experience and mission history. to answer the questions “where did they go after college” and “have they been to space?” 


## Sankey diagram of hope. to show what otehr careers are availabe if you dongt become an astronaut (re: Jose Hernandez)
[sankey 1](https://www.researchgate.net/profile/Sasan-Tavakkol/publication/320271568/figure/fig2/AS:667793712234500@1536225836268/Sankey-diagram-of-the-selection-flow-Red-represents-filtered-out-flow-and-green.ppm)
[sankey 2](https://dribbble.com/shots/21649281-Funnel-charts-collection-Hyper-charts-UI-Kit)

---

## Proposed Charts

### Chart 1 — Selectivity Stat Card

**Description:** Before anything else, a visitor needs to feel how hard this is. This card shows the raw ratio of applicants to those selected — currently 44,600 applications for 69 seats. Displaying it as a single large number ("1 selected for every 646 applicants") sets the stakes for every other chart on the page. Without this context, the degree and age breakdowns read as trivia. With it, they read as a profile of the tiny fraction that made it through.

**Type:** Large typographic stat (no chart geometry — a single bold number)

| Parameter | Value |
|---|---|
| Display | "1 selected for every 646 applicants" |
| Total applications | Sum of `group.applications_received` across all groups |
| Total selected | `getTotalNumberOfAstronauts()` |
| Ratio | `totalSelected / totalApplications` |
| DOM target | New `<div id="selectivity_stat">` |
| Respects filters | No — dataset-level fact |

**New function — `dataService.js`:**
```js
export function getTotalApplications() {
  return getGroupNames().reduce((sum, name) => {
    return sum + (getGroup(name).applications_received || 0);
  }, 0);
}
```

**New file — `selectivityCard.js`:**
```js
import { getTotalApplications, getTotalNumberOfAstronauts } from './dataService.js';

function renderSelectivityCard() {
  const applications = getTotalApplications();
  const selected = getTotalNumberOfAstronauts();
  const ratio = Math.round(applications / selected);

  const card = document.getElementById('selectivity_stat');
  card.innerHTML = `
    <p>1 selected for every <strong>${ratio}</strong> applicants</p>
    <p>${applications.toLocaleString()} applications → ${selected} selected</p>
  `;
}

document.addEventListener('DOMContentLoaded', renderSelectivityCard);
```

**`index.html` additions:**
```html
<div id="selectivity_stat"></div>
<script type="module" src="selectivityCard.js"></script>
```

---

### Chart 2 — Military vs. Civilian Donut Chart

**Description:** One of the most common misconceptions about becoming an astronaut is that it's a purely academic path. This chart challenges that directly — 57% of selected astronauts have military backgrounds. Showing it as a donut makes the split immediate and unavoidable. It answers the question "do I need to join the military?" with a proportion rather than a yes or no, and opens the door to the follow-up question of which branch. Users can filter by degree type to see whether the military/civilian balance shifts for PhDs vs. MS holders.

**Type:** Donut chart (canvas)

| Parameter | Value |
|---|---|
| Segments | Military count, civilian count |
| Data source | `getMilitaryCounts()` → `{ military, civilian }` |
| Labels | `"Military (39)"`, `"Civilian (30)"` |
| Colors | `#2a6fdb` (military), `#e0e0e0` (civilian) |
| Center label | Percentage of the larger segment |
| Canvas ID | `#militaryChart` |
| Respects filters | Yes — gender and degree filters apply |

**New file — `militaryChart.js`:**
```js
import { getMilitaryCounts } from './dataService.js';
import { filterService } from './filterService.js';

function drawMilitaryChart(filters) {
  const canvas = document.getElementById('militaryChart');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const { military, civilian } = getMilitaryCounts(filters);
  const total = military + civilian;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = Math.min(cx, cy) - 20;
  const innerRadius = radius * 0.6;
  const militaryAngle = (military / total) * 2 * Math.PI;

  // Military segment
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + militaryAngle);
  ctx.fillStyle = '#2a6fdb';
  ctx.fill();

  // Civilian segment
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, -Math.PI / 2 + militaryAngle, -Math.PI / 2 + 2 * Math.PI);
  ctx.fillStyle = '#e0e0e0';
  ctx.fill();

  // Donut hole
  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();

  // Center label
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.font = 'bold 20px Arial';
  ctx.fillText(`${Math.round((military / total) * 100)}%`, cx, cy - 8);
  ctx.font = '13px Arial';
  ctx.fillText('Military', cx, cy + 12);
}

function init() {
  const redraw = () => drawMilitaryChart(filterService.getFilters());
  filterService.subscribe(filters => drawMilitaryChart(filters));
  document.addEventListener('DOMContentLoaded', redraw);
  window.addEventListener('resize', redraw);
}

init();
```

**`index.html` additions:**
```html
<canvas id="militaryChart"></canvas>
<script type="module" src="militaryChart.js"></script>
```

**Note:** `getMilitaryCounts()` in `dataService.js` needs a `filters` parameter added to support filter-awareness.

---

### Chart 3 — Field of Study Horizontal Bar Chart

**Description:** The existing degree chart shows academic level (MS, PhD) but not subject — which is the more actionable piece of information for someone deciding what to study. This chart answers "what should I major in?" Engineering dominates, followed by Physical Sciences. A horizontal layout is used rather than vertical because the category labels (e.g. "Biological Sciences") are too long to fit cleanly beneath vertical bars. Filtered by gender or military status, this chart can reveal whether civilian astronauts skew more toward medicine or biological sciences compared to military ones.

**Type:** Horizontal bar chart (canvas)

| Parameter | Value |
|---|---|
| Y-axis | Field categories: Engineering, Physical Sciences, Biological Sciences, Medicine, Computer Science, Mathematics, Other |
| X-axis | Count of astronauts per field |
| Data source | New `getFieldOfStudyCounts(filters)` |
| Sort | Descending by count |
| Bar color | `#2a6fdb` |
| Canvas ID | `#fieldChart` |
| Respects filters | Yes — all three filters apply |

**New function — `dataService.js`:**
```js
export function getFieldOfStudyCounts(filters = {}) {
  const counts = {};
  getGroupNames().forEach(name => {
    getGroup(name).astronauts.forEach(astronaut => {
      if (!passesFilters(astronaut, filters)) return;
      astronaut.degrees?.forEach(d => {
        if (!d.category) return;
        counts[d.category] = (counts[d.category] || 0) + 1;
      });
    });
  });
  return counts;
}
```

**New file — `fieldChart.js`:**
```js
import { getFieldOfStudyCounts } from './dataService.js';
import { filterService } from './filterService.js';

const PADDING = { top: 20, right: 40, bottom: 20, left: 160 };
const BAR_HEIGHT = 28;
const BAR_GAP = 10;

function drawFieldChart(filters) {
  const canvas = document.getElementById('fieldChart');
  const ctx = canvas.getContext('2d');

  const counts = getFieldOfStudyCounts(filters);
  const bars = Object.entries(counts)
    .sort(([, a], [, b]) => b - a);

  canvas.height = bars.length * (BAR_HEIGHT + BAR_GAP) + PADDING.top + PADDING.bottom;
  canvas.width = canvas.clientWidth;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxValue = Math.max(...bars.map(([, v]) => v));
  const chartWidth = canvas.width - PADDING.left - PADDING.right;

  bars.forEach(([field, count], index) => {
    const y = PADDING.top + index * (BAR_HEIGHT + BAR_GAP);
    const barWidth = (count / maxValue) * chartWidth;

    ctx.fillStyle = '#2a6fdb';
    ctx.fillRect(PADDING.left, y, barWidth, BAR_HEIGHT);

    ctx.fillStyle = '#000';
    ctx.textAlign = 'right';
    ctx.font = '13px Arial';
    ctx.fillText(field, PADDING.left - 8, y + BAR_HEIGHT / 2 + 5);

    ctx.textAlign = 'left';
    ctx.fillText(count, PADDING.left + barWidth + 6, y + BAR_HEIGHT / 2 + 5);
  });
}

function init() {
  const redraw = () => drawFieldChart(filterService.getFilters());
  filterService.subscribe(filters => drawFieldChart(filters));
  document.addEventListener('DOMContentLoaded', redraw);
  window.addEventListener('resize', redraw);
}

init();
```

**`index.html` additions:**
```html
<canvas id="fieldChart"></canvas>
<script type="module" src="fieldChart.js"></script>
```

---

### Chart 4 — Age at Selection Histogram

**Description:** "Average age: 36.5" is already on the page as hardcoded text, but an average hides the full picture. A histogram shows the distribution — that selections span roughly 28 to 46 — which tells a younger visitor they have a window, not a deadline. A dashed vertical line marking the mean age anchors the distribution without replacing it. This chart is particularly useful when filtered: comparing the age distribution of military vs. civilian astronauts shows whether one path tends to select earlier or later in a career.

**Type:** Histogram (canvas, vertical bars with age ranges)

| Parameter | Value |
|---|---|
| X-axis | Age buckets: 28–31, 32–35, 36–39, 40–43, 44–47 |
| Y-axis | Count of astronauts in each bucket |
| Bucket size | 4 years |
| Data source | New `getAgeDistribution(filters)` |
| Bar color | `#2a6fdb` |
| Marker | Dashed vertical line at mean age |
| Canvas ID | `#ageChart` |
| Respects filters | Yes — all three filters apply |

**New function — `dataService.js`:**
```js
export function getAgeDistribution(filters = {}, bucketSize = 4) {
  const buckets = {};
  getGroupNames().forEach(name => {
    getGroup(name).astronauts.forEach(astronaut => {
      if (!passesFilters(astronaut, filters)) return;
      const age = astronaut.age_at_selection;
      if (!age) return;
      const bucket = Math.floor(age / bucketSize) * bucketSize;
      const label = `${bucket}–${bucket + bucketSize - 1}`;
      buckets[label] = (buckets[label] || 0) + 1;
    });
  });
  return buckets;
}
```

**New file — `ageChart.js`:**
```js
import { getAgeDistribution } from './dataService.js';
import { filterService } from './filterService.js';

const PADDING = 50;
const BAR_GAP = 6;

function drawAgeChart(filters) {
  const canvas = document.getElementById('ageChart');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const buckets = getAgeDistribution(filters);
  const bars = Object.entries(buckets).sort(([a], [b]) => parseInt(a) - parseInt(b));

  if (bars.length === 0) return;

  const maxValue = Math.max(...bars.map(([, v]) => v));
  const barWidth = (canvas.width - PADDING * 2) / bars.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bars.forEach(([label, count], index) => {
    const barHeight = (count / maxValue) * (canvas.height - PADDING * 2);
    const x = PADDING + index * barWidth;
    const y = canvas.height - PADDING - barHeight;
    const centerX = x + (barWidth - BAR_GAP) / 2;

    ctx.fillStyle = '#2a6fdb';
    ctx.fillRect(x, y, barWidth - BAR_GAP, barHeight);

    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.font = '12px Arial';
    ctx.fillText(count, centerX, y - 5);
    ctx.fillText(label, centerX, canvas.height - PADDING + 16);
  });
}

function init() {
  const redraw = () => drawAgeChart(filterService.getFilters());
  filterService.subscribe(filters => drawAgeChart(filters));
  document.addEventListener('DOMContentLoaded', redraw);
  window.addEventListener('resize', redraw);
}

init();
```

**`index.html` additions:**
```html
<canvas id="ageChart"></canvas>
<script type="module" src="ageChart.js"></script>
```


### marketing idea - post on [r/AstronautHopefuls](https://www.reddit.com/r/AstronautHopefuls/)
