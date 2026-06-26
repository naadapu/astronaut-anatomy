import { getMilitaryBranchesByGender } from './dataService.js';
import { filterService } from './filterService.js';

const PADDING = { top: 20, right: 40, bottom: 20, left: 140 };
const BAR_HEIGHT = 24;
const BAR_GAP = 8;

function drawMilitaryBranchChart(filters) {
  const container = document.getElementById('militaryBranchViewer');
  if (!container) return;
  
  const branches = getMilitaryBranchesByGender(filters);
  const data = Object.entries(branches)
    .sort(([, a], [, b]) => b.total - a.total);
  
  if (data.length === 0) {
    container.innerHTML = '<p>No military data available for selected filters.</p>';
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const chartHeight = data.length * (BAR_HEIGHT + BAR_GAP) + PADDING.top + PADDING.bottom;
  canvas.width = container.clientWidth || 600;
  canvas.height = chartHeight;

  // Clear container and add canvas
  container.innerHTML = '';
  container.appendChild(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxValue = Math.max(...data.map(([, v]) => v.total));
  const chartWidth = canvas.width - PADDING.left - PADDING.right;

  // Draw title
  ctx.fillStyle = '#000';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Military Experience by Branch', PADDING.left, 15);

  data.forEach(([branch, counts], index) => {
    const y = PADDING.top + 20 + index * (BAR_HEIGHT + BAR_GAP);
    const totalWidth = (counts.total / maxValue) * chartWidth;
    const maleWidth = (counts.male / maxValue) * chartWidth;

    // Female segment (lighter)
    ctx.fillStyle = '#ffb3b3';
    ctx.fillRect(PADDING.left, y, totalWidth, BAR_HEIGHT);

    // Male segment (darker, overlaid)
    ctx.fillStyle = '#2a6fdb';
    ctx.fillRect(PADDING.left, y, maleWidth, BAR_HEIGHT);

    // Branch label
    ctx.fillStyle = '#000';
    ctx.textAlign = 'right';
    ctx.font = '12px Arial';
    ctx.fillText(branch, PADDING.left - 8, y + BAR_HEIGHT / 2 + 4);

    // Count label
    ctx.textAlign = 'left';
    ctx.fillText(counts.total, PADDING.left + totalWidth + 6, y + BAR_HEIGHT / 2 + 4);
  });

  // Draw legend
  const legendY = PADDING.top + 20 + data.length * (BAR_HEIGHT + BAR_GAP) + 15;
  ctx.fillStyle = '#2a6fdb';
  ctx.fillRect(PADDING.left, legendY, 12, 12);
  ctx.fillStyle = '#000';
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Male', PADDING.left + 18, legendY + 10);

  ctx.fillStyle = '#ffb3b3';
  ctx.fillRect(PADDING.left + 100, legendY, 12, 12);
  ctx.fillStyle = '#000';
  ctx.fillText('Female', PADDING.left + 118, legendY + 10);
}

function init() {
  const redraw = () => drawMilitaryBranchChart(filterService.getFilters());
  filterService.subscribe(filters => drawMilitaryBranchChart(filters));
  document.addEventListener('DOMContentLoaded', redraw);
  window.addEventListener('resize', redraw);
}

init();
