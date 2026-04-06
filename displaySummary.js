let astronautCountElement = document.getElementById('astronaut_count');
let degreesElement = document.getElementById('degree_counts');
let militaryElement = document.getElementById('military_counts');

if (astronautCountElement) {
  astronautCountElement.innerText = getTotalNumberOfAstronauts();
}

if (degreesElement) {
  degreesElement.innerText = formatDegreeCounts();
}

if (militaryElement) {
  militaryElement.innerText = formatMilitaryCounts();
}

// todo probably simplify this shit somehow
let ageAverageAllGroupsElement = document.getElementById('age_all_groups')
let ageAveragesByGroupElement = document.getElementById('age_by_group')

let ageAveragesObject = getAgeAveragesObject();
let ageAverageAllGroups = ageAveragesObject.averageAge;
let ageAveragesByGroup = ageAveragesObject.averageAgeByGroup;

if (ageAverageAllGroupsElement) {
  ageAverageAllGroupsElement.innerText = ageAverageAllGroups;
}

if (ageAveragesByGroupElement) {
  ageAveragesByGroupElement.innerText = prettyPrintGroupAverages(ageAveragesByGroup);
}

function prettyPrintGroupAverages(ageAveragesByGroup) {
  let output = JSON.stringify(ageAveragesByGroup);
  output = output.replaceAll(',', '\n').replaceAll('"', ' ').replaceAll(' :', ': ');
  output = output.replace('{', '').replace('}', '');

  return output;
}