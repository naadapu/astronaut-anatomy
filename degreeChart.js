import { getDegreeCounts } from './dataService.js';
import { filterService } from './filterService.js';

const DEGREE_RANK = {
  PhD: 1, MD: 2, MS: 3, MEd: 4, MPhil: 5, MSc: 6, MPH: 7, EMPA: 8, BS: 9, BEng: 10
};
const PADDING = 50;
const BAR_GAP = 10;

function getCSSVar(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function drawDegreeChart(filters = { military: 'all', degree: 'all', gender: 'all' }) {
  const canvas = document.getElementById('degreeChart');
  const ctx = canvas.getContext('2d');

  // Match internal resolution to displayed size
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // Chart shows degree distribution for selected military/gender
  // Exclude degree filter so all degrees are visible regardless of selection
  const chartFilters = { ...filters, degree: 'all' };
  const bars = Object.entries(getDegreeCounts(chartFilters))
    .sort(([a], [b]) => (DEGREE_RANK[a] || 999) - (DEGREE_RANK[b] || 999));

  if (bars.length === 0) return;

  const maxValue = Math.max(...bars.map(([, count]) => count));
  const chartWidth = canvas.width;
  const chartHeight = canvas.height;
  const barWidth = (chartWidth - PADDING * 2) / bars.length;

  ctx.clearRect(0, 0, chartWidth, chartHeight);

  bars.forEach(([degree, value], index) => {
    const barHeight = (value / maxValue) * (chartHeight - PADDING * 2);
    const x = PADDING + index * barWidth;
    const y = chartHeight - PADDING - barHeight;
    const centerX = x + (barWidth - BAR_GAP) / 2;

    ctx.fillStyle = getCSSVar('--bar-color');
    ctx.fillRect(x, y, barWidth - BAR_GAP, barHeight);

    ctx.fillStyle = getCSSVar('--bar-label');
    ctx.textAlign = "center";
    ctx.fillText(value, centerX, y - 5);
    ctx.fillText(degree, centerX, chartHeight - PADDING + 20);
  });
}

function init() {
  const redraw = () => drawDegreeChart(filterService.getFilters());
  filterService.subscribe(filters => drawDegreeChart(filters));
  document.addEventListener('DOMContentLoaded', redraw);
  window.addEventListener('resize', redraw);
}

init();
