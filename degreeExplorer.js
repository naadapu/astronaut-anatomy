import { getDegreeList } from './dataService.js';
import { filterService } from './filterService.js';

const DEGREE_RANK = {
  PhD: 1, MD: 2, MS: 3, MEd: 4, MPhil: 5, MSc: 6, MPH: 7, EMPA: 8, BS: 9, BEng: 10
};

function renderDegreeExplorer(filters) {
  const container = document.getElementById('degreeExplorer');
  if (!container) return;

  const degrees = getDegreeList(filters);
  const sorted = Object.entries(degrees)
    .sort(([a], [b]) => (DEGREE_RANK[a] || 999) - (DEGREE_RANK[b] || 999));

  if (sorted.length === 0) {
    container.innerHTML = '<p>No degrees found for selected filters.</p>';
    return;
  }

  let html = '<div class="degree-list">';
  html += '<h4>Degrees in Dataset</h4>';
  html += '<table class="degree-table">';
  html += '<thead><tr><th>Degree</th><th>Count</th><th>Percentage</th></tr></thead>';
  html += '<tbody>';

  const total = sorted.reduce((sum, [, count]) => sum + count, 0);

  sorted.forEach(([degree, count]) => {
    const percentage = ((count / total) * 100).toFixed(1);
    html += `<tr>
      <td>${degree}</td>
      <td style="text-align: center;">${count}</td>
      <td style="text-align: center;">${percentage}%</td>
    </tr>`;
  });

  html += '</tbody></table>';
  html += '</div>';

  container.innerHTML = html;
}

function init() {
  filterService.subscribe(filters => renderDegreeExplorer(filters));
  document.addEventListener('DOMContentLoaded', () => renderDegreeExplorer(filterService.getFilters()));
}

init();
