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

function formatDegreeCounts() {
  let degreeCounts = getDegreeCounts();
  let degreeOrder = ['PhD', 'MD', 'MS', 'MEd', 'MPhil', 'MSc', 'MPH', 'EMPA', 'BS', 'BEng'];
  let output = [];

  for (let i = 0; i < degreeOrder.length; i++) {
    let degree = degreeOrder[i];
    if (degreeCounts[degree]) {
      let label = degree;
      if (degreeCounts[degree] > 1 && degree === 'PhD') {
        label = 'PhDs';
      } else if (degreeCounts[degree] > 1 && degree === 'MD') {
        label = 'MDs';
      }
      output.push(`${degreeCounts[degree]} ${label}`);
    }
  }

  return output.join('. ') + '.';
}

function formatMilitaryCounts() {
  let counts = getMilitaryCounts();
  let output = `${counts.civilian} Civilian${counts.civilian !== 1 ? 's' : ''}. ${counts.military} Military (`;
  
  // Separate US and international branches
  let usAmerican = ['Air Force', 'Navy', 'Army', 'Marines', 'Coast Guard', 'Space Force'];
  let usaStrings = [];
  let internationalStrings = [];
  
  for (let branch in counts.branches) {
    let branchString = `${counts.branches[branch]} ${branch}`;
    
    if (usAmerican.includes(branch)) {
      usaStrings.push(branchString);
    } else {
      internationalStrings.push(branchString);
    }
  }
  
  // Combine USA branches first
  let allBranches = usaStrings;
  
  // Add international branches with label if they exist
  if (internationalStrings.length > 0) {
    allBranches.push('International: ' + internationalStrings.join(', '));
  }
  
  output += allBranches.join(', ') + ').';
  return output;
}