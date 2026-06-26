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

export function buildGroupSection(groupName, group, astronauts) {
  if (astronauts.length === 0) return null;

  const section = document.createElement('div');
  section.className = 'group-section';
  
  // Create collapsible header
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
