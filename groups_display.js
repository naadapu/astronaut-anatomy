import { getGroupNames, getGroup } from './dataService.js';
import { filterService, passesFilters } from './filterService.js';
import { buildGroupSection } from './tableBuilder.js';

function displayGroupsInfo(filters = {}) {
  const container = document.getElementById('groups_info');
  container.innerHTML = '';

  const groupNames = getGroupNames().sort((a, b) =>
    getGroup(b).selection_year - getGroup(a).selection_year
  );

  groupNames.forEach(groupName => {
    const group = getGroup(groupName);
    const astronauts = group.astronauts.filter(a => passesFilters(a, filters));
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

function init() {
  filterService.subscribe(filters => displayGroupsInfo(filters));
  setupFilters();
  displayGroupsInfo(filterService.getFilters());
}

document.addEventListener('DOMContentLoaded', init);
