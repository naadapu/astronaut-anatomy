import { getTotalApplications, getTotalNumberOfAstronauts } from './dataService.js';

function renderSelectivityCard() {
  const card = document.getElementById('selectivity_stat');
  if (!card) return;

  const applications = getTotalApplications();
  const selected = getTotalNumberOfAstronauts();
  const ratio = Math.round(applications / selected);

  let html = '<div class="selectivity-content">';
  html += '<p class="selectivity-label">Selection Rate</p>';
  html += `<p class="selectivity-stat">1 selected for every <strong>${ratio}</strong> applicants</p>`;
  html += `<p class="selectivity-details">${applications.toLocaleString()} applications → ${selected} selected</p>`;
  html += '</div>';

  card.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderSelectivityCard);
