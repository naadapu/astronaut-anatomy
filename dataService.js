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

// Education //
function getDegreeCounts() {
  let degreeCounts = {};
  let groupNames = getGroupNames();

  for (let i = 0; i < groupNames.length; i++) {
    let group = getGroup(groupNames[i]);
    let astronauts = group.astronauts;

    for (let j = 0; j < astronauts.length; j++) {
      let degree = astronauts[j].highest_degree;
      if (degreeCounts[degree]) {
        degreeCounts[degree]++;
      } else {
        degreeCounts[degree] = 1;
      }
    }
  }

  return degreeCounts;
}

function formatDegreeCounts() { // TODO where should this go?
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

// Military //

function getMilitaryCounts() {
  let militaryBranches = {};
  let civilianCount = 0;
  let militaryTotalCount = 0;
  let groupNames = getGroupNames();

  for (let i = 0; i < groupNames.length; i++) {
    let group = getGroup(groupNames[i]);
    let astronauts = group.astronauts;

    for (let j = 0; j < astronauts.length; j++) {
      let militaryExp = astronauts[j].military_experience;

      if (!militaryExp || militaryExp === null) {
        civilianCount++;
      } else {
        militaryTotalCount++;
        // Parse military branches - some have multiple branches
        let branches = militaryExp.split(/[,;]/);
        for (let k = 0; k < branches.length; k++) {
          let branch = branches[k].trim().toLowerCase();
          
          // Normalize branch names
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

function formatMilitaryCounts() { // TODO this is above the data API layer
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

// compute and display ratio of astronauts with military experience
// compute and display astronauts by military branch + unaffiliated
// compute and display statistics related to degrees, ie. (20 PhDs, 13 Masters,...)
// + only count one degree per person, the highest degree earned
