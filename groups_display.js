function displayGroupsInfo(filters = {}) {
  let groupNames = getGroupNames();
  
  // Sort groups by selection year in descending order (newest first)
  groupNames.sort((a, b) => {
    let yearA = getGroup(a).selection_year;
    let yearB = getGroup(b).selection_year;
    return yearB - yearA;
  });

  let groupsInfoElement = document.getElementById('groups_info');
  groupsInfoElement.innerHTML = '';

  for (let i = 0; i < groupNames.length; i++) {
    let groupName = groupNames[i];
    let group = getGroup(groupName);

    // Create group section
    let groupSection = document.createElement('div');
    groupSection.className = 'group-section';

    // Group header
    let headerText = `${groupName} (${group.selection_year})`;
    if (group.applications_received) {
      headerText += ` | ${group.applications_received} applicants`;
    }

    let groupHeader = document.createElement('h3');
    groupHeader.innerText = headerText;
    groupSection.appendChild(groupHeader);

    // Create table wrapper for horizontal scrolling on mobile
    let tableWrapper = document.createElement('div');
    tableWrapper.className = 'table-wrapper';

    // Create table
    let table = document.createElement('table');

    // Table header
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    
    let headers = ['Name', 'Age at selection', 'Degree', 'Education', 'Military', 'Nationality'];
    for (let j = 0; j < headers.length; j++) {
      let th = document.createElement('th');
      th.innerText = headers[j];
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table body
    let tbody = document.createElement('tbody');

    let astronauts = group.astronauts.filter(astronaut => passesFilters(astronaut, filters));

    if (astronauts.length === 0) continue; // don't show empty groups
    for (let j = 0; j < astronauts.length; j++) {
      let astronaut = astronauts[j];
      let row = document.createElement('tr');

      let cells = [
        astronaut.name,
        astronaut.age_at_selection,
        astronaut.highest_degree,
        astronaut.education,
        astronaut.military_experience || '-',
        astronaut.nationality
      ];

      for (let k = 0; k < cells.length; k++) {
        let td = document.createElement('td');
        td.innerText = cells[k];

        // todo this can be optimized somehow, especially when we make more stuff clickable...
        if (k === 0 && astronaut.wikipedia_link) {
          td.innerHTML = `<a href="${astronaut.wikipedia_link}" target="_blank" rel="noopener noreferrer">${td.innerText}</a>`;        
        }

        if (k === 3 && astronaut.degrees) {
          const lines = astronaut.degrees.map(degreeInfo => {
            const fieldsText = degreeInfo.fields?.join(', ') || '';
            return `${degreeInfo.level} ${fieldsText}<br>(${degreeInfo.institution})`;
          });

          td.innerHTML = lines.join('<br><br>');
        }

        row.appendChild(td);
      }
      tbody.appendChild(row);
    }
    table.appendChild(tbody);

    tableWrapper.appendChild(table);
    groupSection.appendChild(tableWrapper);
    groupsInfoElement.appendChild(groupSection);
  }
}

function setupFilters() {
  const militarySelect = document.getElementById('military_filter');
  const degreeSelect = document.getElementById('degree_filter');

  militarySelect.addEventListener('change', (e) => {
    filterService.setFilter('military', e.target.value);
  });

  degreeSelect.addEventListener('change', (e) => {
    filterService.setFilter('degree', e.target.value);
  });
}

// Subscribe to filter changes and auto-render
filterService.subscribe((filters) => {
  displayGroupsInfo(filters);
});

setupFilters();
displayGroupsInfo(filterService.getFilters());