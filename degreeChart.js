function drawDegreeChart(filters = { military: 'all', degree: 'all' }) {
  const degreeRank = {
  PhD: 1,
  MD: 2,
  MS: 3,
  MEd: 4,
  MPhil: 5,
  MSc: 6,
  MPH: 7,
  EMPA: 8,
  BS: 9,
  BEng: 10
};

  const canvas = document.getElementById('degreeChart');
  const ctx = canvas.getContext('2d');

  // Match internal resolution to displayed size
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  if (!filters) { filters = { military: 'all', degree: 'all' }}

  const counts = getDegreeCounts(filters);

  const degrees = Object.keys(counts);
  // Sort degrees by seniority using our rank map
  degrees.sort((a, b) => {
    const rankA = degreeRank[a] || 999; // fallback for unknown degrees
    const rankB = degreeRank[b] || 999;
    return rankA - rankB;
  });

  const values = degrees.map(degree => counts[degree])

  if (values.length === 0) return;

  const maxValue = Math.max(...values);

  const chartWidth = canvas.width;
  const chartHeight = canvas.height;
  const padding = 50;

  const barWidth = (chartWidth - padding * 2) / degrees.length;

  ctx.clearRect(0, 0, chartWidth, chartHeight);

  degrees.forEach((degree, index) => {
    const value = values[index];

    const barHeight = (value / maxValue) * (chartHeight - padding * 2);

    const x = padding + index * barWidth;
    const y = chartHeight - padding - barHeight;

    ctx.fillStyle = "#2a6fdb";
    ctx.fillRect(x, y, barWidth - 10, barHeight);

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(value, x + (barWidth - 10) / 2, y - 5);
    ctx.fillText(degree, x + (barWidth - 10) / 2, chartHeight - padding + 20);
  });
}

// Subscribe to filter changes and auto-render
filterService.subscribe((filters) => {
  drawDegreeChart(filters);
});

document.addEventListener("DOMContentLoaded", () => {
  drawDegreeChart(filterService.getFilters());
});

window.addEventListener('resize', () => {
  drawDegreeChart(filterService.getFilters());
});
