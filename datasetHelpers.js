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

// compute and display ratio of astronauts with military experience
// compute and display astronauts by military branch + unaffiliated
// compute and display statistics related to degrees, ie. (20 PhDs, 13 Masters,...)
// + only count one degree per person, the highest degree earned
