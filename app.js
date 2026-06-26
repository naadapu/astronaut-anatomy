// app.js - Bundled application modules
// Import data layer
import { nasa } from './data.js';

// ============================================================================
// FILTER SERVICE - Single source of truth for filter state
// ============================================================================

const filterService = (() => {
  const DEFAULT_FILTERS = {
    military: 'all',
    degree: 'all',
    gender: 'all'
  };

  let currentFilters = { ...DEFAULT_FILTERS };
  let subscribers = [];

  const notifySubscribers = () => {
    subscribers.forEach(callback => callback({ ...currentFilters }));
  };

  return {
    getFilters() {
      return { ...currentFilters };
    },

    setFilter(key, value) {
      if (key in currentFilters && currentFilters[key] !== value) {
        currentFilters[key] = value;
        notifySubscribers();
      }
    },

    setFilters(newFilters) {
      const merged = { ...currentFilters, ...newFilters };
      if (JSON.stringify(merged) !== JSON.stringify(currentFilters)) {
        currentFilters = merged;
        notifySubscribers();
      }
    },

    reset() {
      if (JSON.stringify(currentFilters) !== JSON.stringify(DEFAULT_FILTERS)) {
        currentFilters = { ...DEFAULT_FILTERS };
        notifySubscribers();
      }
    },

    subscribe(callback) {
      subscribers.push(callback);
      return () => {
        subscribers = subscribers.filter(sub => sub !== callback);
      };
    }
  };
})();

function passesFilters(astronaut, filters) {
  if (filters.military === 'military' && !astronaut.military_experience) return false;
  if (filters.military === 'civilian' && astronaut.military_experience) return false;
  if (filters.degree !== 'all' && astronaut.highest_degree !== filters.degree) return false;
  if (filters.gender !== 'all' && astronaut.gender !== filters.gender) return false;
  return true;
}

// ============================================================================
// TABLE BUILDER - Generate DOM elements for astronaut tables
// ============================================================================

const COLUMN_HEADERS = ['Name', 'Age at selection', 'Degree', 'Education', 'Military', 'Nationality'];

function textCell(value) {
  const td = document.createElement('td');
  td.innerText = value;
  return td;
}

function buildNameCell(astronaut) {
  const td = document.createElement('td');
  if (astronaut.wikipedia_link) {
    td.innerHTML = `<a href="${astronaut.wikipedia_link}" target="_blank" rel="noopener noreferrer">${astronaut.name}</a>`;
  } else {
    td.innerText = astronaut.name;
  }
  return td;
}

function buildEducationCell(astronaut) {
  const td = document.createElement('td');
  if (astronaut.degrees) {
    td.innerHTML = astronaut.degrees.map(d =>
      `${d.level} ${d.fields?.join(', ') || ''}<br>(${d.institution})`
    ).join('<br><br>');
  } else {
    td.innerText = astronaut.education;
  }
  return td;
}

function buildAstronautRow(astronaut) {
  const row = document.createElement('tr');
  row.appendChild(buildNameCell(astronaut));
  row.appendChild(textCell(astronaut.age_at_selection));
  row.appendChild(textCell(astronaut.highest_degree));
  row.appendChild(buildEducationCell(astronaut));
  row.appendChild(textCell(astronaut.military_experience || '-'));
  row.appendChild(textCell(astronaut.nationality));
  return row;
}

function buildTableHeader() {
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  COLUMN_HEADERS.forEach(text => {
    const th = document.createElement('th');
    th.innerText = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  return thead;
}

function buildTable(astronauts) {
  const table = document.createElement('table');
  table.appendChild(buildTableHeader());
  const tbody = document.createElement('tbody');
  astronauts.forEach(astronaut => tbody.appendChild(buildAstronautRow(astronaut)));
  table.appendChild(tbody);
  return table;
}

function buildGroupHeader(groupName, group) {
  let headerText = `${groupName} (${group.selection_year})`;
  if (group.applications_received) {
    headerText += ` | ${group.applications_received} applicants`;
  }
  return headerText;
}

function buildGroupSection(groupName, group, astronauts) {
  if (astronauts.length === 0) return null;

  const section = document.createElement('div');
  section.className = 'group-section';
  
  const h3 = document.createElement('h3');
  h3.innerText = buildGroupHeader(groupName, group);
  h3.style.cursor = 'pointer';
  h3.addEventListener('click', () => {
    section.classList.toggle('collapsed');
    h3.classList.toggle('collapsed');
  });
  section.appendChild(h3);

  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-wrapper';
  tableWrapper.appendChild(buildTable(astronauts));
  section.appendChild(tableWrapper);

  return section;
}

// ============================================================================
// DATA SERVICE - Query and filter layer
// ============================================================================

function getGroupNames() {
  let groupsObject = nasa.astronaut_groups;
  let groupNames = Object.keys(groupsObject);
  return groupNames;
}

function getGroup(groupName) {
  return nasa.astronaut_groups[groupName];
}

function getTotalNumberOfAstronauts() {
  let total = 0;
  for (let groupName in nasa.astronaut_groups) {
    total += nasa.astronaut_groups[groupName].astronauts.length;
  }
  return total;
}

function getAgeAveragesObject() {
  let groupNames = getGroupNames();
  let averageAgeByGroup = {};
  let totalAgeSum = 0;
  let groupCount = 0;

  for (let i = 0; groupNames[i]; i++) {
    let groupName = groupNames[i];
    let group = getGroup(groupName);
    averageAgeByGroup[groupName] = group.average_age_of_astronauts;
    totalAgeSum += group.average_age_of_astronauts;
    groupCount++;
  }

  let overallAverageAge = (totalAgeSum / groupCount).toFixed(2);

  return {
    averageAge: overallAverageAge,
    averageAgeByGroup: averageAgeByGroup
  }
}

function getDegreeCounts(filters = {}) {
  const counts = {};

  const groupNames = getGroupNames();

  groupNames.forEach(name => {
    const group = getGroup(name);

    group.astronauts.forEach(astronaut => {
      if (!passesFilters(astronaut, filters)) return;

      const degree = astronaut.highest_degree;
      if (!degree) return;

      counts[degree] = (counts[degree] || 0) + 1;
    });
  });

  return counts;
}

function getMilitaryCounts(filters = {}) {
  let militaryBranches = {};
  let civilianCount = 0;
  let militaryTotalCount = 0;
  let groupNames = getGroupNames();

  for (let i = 0; i < groupNames.length; i++) {
    let group = getGroup(groupNames[i]);
    let astronauts = group.astronauts;

    for (let j = 0; j < astronauts.length; j++) {
      let astronaut = astronauts[j];
      
      if (!passesFilters(astronaut, filters)) continue;
      
      let militaryExp = astronaut.military_experience;

      if (!militaryExp || militaryExp === null) {
        civilianCount++;
      } else {
        militaryTotalCount++;
        let branches = militaryExp.split(/[,;]/);
        for (let k = 0; k < branches.length; k++) {
          let branch = branches[k].trim().toLowerCase();
          
          if (branch.includes('air force') || branch.includes('usaf')) {
            branch = 'Air Force';
          } else if (branch.includes('navy') || branch.includes('usn')) {
            branch = 'Navy';
          } else if (branch.includes('army') || branch.includes('usa ')) {
            branch = 'Army';
          } else if (branch.includes('marine') || branch.includes('usmc') || branch.includes('usmcr')) {
            branch = 'Marines';
          } else if (branch.includes('coast guard')) {
            branch = 'Coast Guard';
          } else if (branch.includes('space force')) {
            branch = 'Space Force';
          } else if (branch.includes('canadian') || branch.includes('rcaf')) {
            branch = 'Royal Canadian Air Force';
          } else if (branch.includes('self defense')) {
            branch = 'Japan Air Self Defense Force';
          } else if (branch.includes('dubai police')) {
            branch = 'Dubai Police';
          }

          if (militaryBranches[branch]) {
            militaryBranches[branch]++;
          } else {
            militaryBranches[branch] = 1;
          }
        }
      }
    }
  }

  return {
    civilian: civilianCount,
    military: militaryTotalCount,
    branches: militaryBranches
  };
}

function getGroupAstronauts(groupName, filters = {}) {
  const group = getGroup(groupName);
  if (!group || !group.astronauts) return [];
  
  return group.astronauts.filter(astronaut => passesFilters(astronaut, filters));
}

function getTotalApplications() {
  return getGroupNames().reduce((sum, name) => {
    return sum + (getGroup(name).applications_received || 0);
  }, 0);
}

function getDegreeList(filters = {}) {
  const degrees = {};
  getGroupNames().forEach(name => {
    getGroup(name).astronauts.forEach(astronaut => {
      if (!passesFilters(astronaut, filters)) return;
      const degree = astronaut.highest_degree;
      if (degree) {
        degrees[degree] = (degrees[degree] || 0) + 1;
      }
    });
  });
  return degrees;
}

function getFieldOfStudyCounts(filters = {}) {
  const counts = {};
  getGroupNames().forEach(name => {
    getGroup(name).astronauts.forEach(astronaut => {
      if (!passesFilters(astronaut, filters)) return;
      if (astronaut.degrees && Array.isArray(astronaut.degrees)) {
        astronaut.degrees.forEach(d => {
          if (d.category) {
            counts[d.category] = (counts[d.category] || 0) + 1;
          }
        });
      }
    });
  });
  return counts;
}

function getAgeDistribution(filters = {}, bucketSize = 4) {
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

function getMilitaryBranchesByGender(filters = {}) {
  const branches = {};
  
  getGroupNames().forEach(name => {
    getGroup(name).astronauts.forEach(astronaut => {
      if (!passesFilters(astronaut, filters)) return;
      
      const militaryExp = astronaut.military_experience;
      if (!militaryExp) return;
      
      let branchList = militaryExp.split(/[,;]/);
      branchList.forEach(branchStr => {
        let branch = branchStr.trim().toLowerCase();
        
        if (branch.includes('air force') || branch.includes('usaf')) {
          branch = 'Air Force';
        } else if (branch.includes('navy') || branch.includes('usn')) {
          branch = 'Navy';
        } else if (branch.includes('army') || branch.includes('usa ')) {
          branch = 'Army';
        } else if (branch.includes('marine') || branch.includes('usmc') || branch.includes('usmcr')) {
          branch = 'Marines';
        } else if (branch.includes('coast guard')) {
          branch = 'Coast Guard';
        } else if (branch.includes('space force')) {
          branch = 'Space Force';
        } else if (branch.includes('canadian') || branch.includes('rcaf')) {
          branch = 'Royal Canadian Air Force';
        } else if (branch.includes('self defense')) {
          branch = 'Japan Air Self Defense Force';
        } else if (branch.includes('dubai police')) {
          branch = 'Dubai Police';
        }
        
        if (!branches[branch]) {
          branches[branch] = { male: 0, female: 0, total: 0 };
        }
        
        branches[branch].total++;
        if (astronaut.gender === 'male') {
          branches[branch].male++;
        } else if (astronaut.gender === 'female') {
          branches[branch].female++;
        }
      });
    });
  });
  
  return branches;
}

// ============================================================================
// GROUPS DISPLAY - Display astronaut groups by selection year
// ============================================================================

function displayGroupsInfo(filters = {}) {
  const container = document.getElementById('groups_info');
  container.innerHTML = '';

  const groupNames = getGroupNames().sort((a, b) =>
    getGroup(b).selection_year - getGroup(a).selection_year
  );

  groupNames.forEach(groupName => {
    const group = getGroup(groupName);
    const astronauts = getGroupAstronauts(groupName, filters);
    const section = buildGroupSection(groupName, group, astronauts);
    if (section) container.appendChild(section);
  });
}

function setupFilters() {
  [
    { id: 'gender_filter',   key: 'gender' },
    { id: 'military_filter', key: 'military' },
    { id: 'degree_filter',   key: 'degree' },
  ].forEach(({ id, key }) =>
    document.getElementById(id).addEventListener('change', e =>
      filterService.setFilter(key, e.target.value)
    )
  );
}

function initGroupsDisplay() {
  filterService.subscribe(filters => displayGroupsInfo(filters));
  setupFilters();
  displayGroupsInfo(filterService.getFilters());
}

document.addEventListener('DOMContentLoaded', initGroupsDisplay);

// ============================================================================
// DEGREE CHART - Canvas-based bar chart of degree distribution
// ============================================================================

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

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

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

function initDegreeChart() {
  const redraw = () => drawDegreeChart(filterService.getFilters());
  filterService.subscribe(filters => drawDegreeChart(filters));
  document.addEventListener('DOMContentLoaded', redraw);
  window.addEventListener('resize', redraw);
}

initDegreeChart();

// ============================================================================
// MILITARY BRANCH VIEWER - Horizontal bar chart of military branches
// ============================================================================

const PADDING_MILITARY = { top: 20, right: 40, bottom: 20, left: 140 };
const BAR_HEIGHT = 24;
const BAR_GAP_MILITARY = 8;

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

  const chartHeight = data.length * (BAR_HEIGHT + BAR_GAP_MILITARY) + PADDING_MILITARY.top + PADDING_MILITARY.bottom;
  canvas.width = container.clientWidth || 600;
  canvas.height = chartHeight;

  container.innerHTML = '';
  container.appendChild(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxValue = Math.max(...data.map(([, v]) => v.total));
  const chartWidth = canvas.width - PADDING_MILITARY.left - PADDING_MILITARY.right;

  ctx.fillStyle = '#000';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Military Experience by Branch', PADDING_MILITARY.left, 15);

  data.forEach(([branch, counts], index) => {
    const y = PADDING_MILITARY.top + 20 + index * (BAR_HEIGHT + BAR_GAP_MILITARY);
    const totalWidth = (counts.total / maxValue) * chartWidth;
    const maleWidth = (counts.male / maxValue) * chartWidth;

    ctx.fillStyle = '#ffb3b3';
    ctx.fillRect(PADDING_MILITARY.left, y, totalWidth, BAR_HEIGHT);

    ctx.fillStyle = '#2a6fdb';
    ctx.fillRect(PADDING_MILITARY.left, y, maleWidth, BAR_HEIGHT);

    ctx.fillStyle = '#000';
    ctx.textAlign = 'right';
    ctx.font = '12px Arial';
    ctx.fillText(branch, PADDING_MILITARY.left - 8, y + BAR_HEIGHT / 2 + 4);

    ctx.textAlign = 'left';
    ctx.fillText(counts.total, PADDING_MILITARY.left + totalWidth + 6, y + BAR_HEIGHT / 2 + 4);
  });

  const legendY = PADDING_MILITARY.top + 20 + data.length * (BAR_HEIGHT + BAR_GAP_MILITARY) + 15;
  ctx.fillStyle = '#2a6fdb';
  ctx.fillRect(PADDING_MILITARY.left, legendY, 12, 12);
  ctx.fillStyle = '#000';
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Male', PADDING_MILITARY.left + 18, legendY + 10);

  ctx.fillStyle = '#ffb3b3';
  ctx.fillRect(PADDING_MILITARY.left + 100, legendY, 12, 12);
  ctx.fillStyle = '#000';
  ctx.fillText('Female', PADDING_MILITARY.left + 118, legendY + 10);
}

function initMilitaryBranchViewer() {
  const redraw = () => drawMilitaryBranchChart(filterService.getFilters());
  filterService.subscribe(filters => drawMilitaryBranchChart(filters));
  document.addEventListener('DOMContentLoaded', redraw);
  window.addEventListener('resize', redraw);
}

initMilitaryBranchViewer();

// ============================================================================
// DEGREE EXPLORER - Table display of all degrees with counts
// ============================================================================

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

function initDegreeExplorer() {
  filterService.subscribe(filters => renderDegreeExplorer(filters));
  document.addEventListener('DOMContentLoaded', () => renderDegreeExplorer(filterService.getFilters()));
}

initDegreeExplorer();

// ============================================================================
// SELECTIVITY CARD - Dataset-level selection rate statistic
// ============================================================================

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
