import { nasa } from './data.js';
import { passesFilters } from './filterService.js';

export function getGroupNames() {
  let groupsObject = nasa.astronaut_groups;
  let groupNames = Object.keys(groupsObject);
  return groupNames;
}

export function getGroup(groupName) {
  return nasa.astronaut_groups[groupName];
}

export function getTotalNumberOfAstronauts() {
  let total = 0;
  for (let groupName in nasa.astronaut_groups) {
    total += nasa.astronaut_groups[groupName].astronauts.length;
  }
  return total;
}

export function getAgeAveragesObject() {
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
export function getDegreeCounts(filters = {}) {
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

// Military //

export function getMilitaryCounts(filters = {}) {
  let militaryBranches = {};
  let civilianCount = 0;
  let militaryTotalCount = 0;
  let groupNames = getGroupNames();

  for (let i = 0; i < groupNames.length; i++) {
    let group = getGroup(groupNames[i]);
    let astronauts = group.astronauts;

    for (let j = 0; j < astronauts.length; j++) {
      let astronaut = astronauts[j];
      
      // Apply filters
      if (!passesFilters(astronaut, filters)) continue;
      
      let militaryExp = astronaut.military_experience;

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

/**
 * Get all astronauts in a specific group, optionally filtered
 * @param {string} groupName - The group identifier (e.g., 'group_1', 'group_24')
 * @param {object} filters - Filter object with keys: military, degree, gender
 * @returns {array} Array of astronaut objects that pass the filters
 */
export function getGroupAstronauts(groupName, filters = {}) {
  const group = getGroup(groupName);
  if (!group || !group.astronauts) return [];
  
  return group.astronauts.filter(astronaut => passesFilters(astronaut, filters));
}

/**
 * Get total applications across all groups
 * @returns {number} Total applications received
 */
export function getTotalApplications() {
  return getGroupNames().reduce((sum, name) => {
    return sum + (getGroup(name).applications_received || 0);
  }, 0);
}

/**
 * Get degree list with counts (all degrees with their highest occurrence)
 * @param {object} filters - Filter object with keys: military, degree, gender
 * @returns {object} Object with degree as key, count as value
 */
export function getDegreeList(filters = {}) {
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

/**
 * Get field of study counts from degrees array
 * @param {object} filters - Filter object with keys: military, degree, gender
 * @returns {object} Object with field category as key, count as value
 */
export function getFieldOfStudyCounts(filters = {}) {
  const counts = {};
  getGroupNames().forEach(name => {
    getGroup(name).astronauts.forEach(astronaut => {
      if (!passesFilters(astronaut, filters)) return;
      // Support both new degrees array and fallback to education text
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

/**
 * Get age distribution in buckets
 * @param {object} filters - Filter object with keys: military, degree, gender
 * @param {number} bucketSize - Size of age buckets (default 4)
 * @returns {object} Object with age range labels as keys, counts as values
 */
export function getAgeDistribution(filters = {}, bucketSize = 4) {
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

/**
 * Get military branches with gender breakdown
 * @param {object} filters - Filter object with keys: military, degree, gender
 * @returns {object} Object with branch names as keys, value has male/female/total counts
 */
export function getMilitaryBranchesByGender(filters = {}) {
  const branches = {};
  
  getGroupNames().forEach(name => {
    getGroup(name).astronauts.forEach(astronaut => {
      if (!passesFilters(astronaut, filters)) return;
      
      const militaryExp = astronaut.military_experience;
      if (!militaryExp) return;
      
      // Parse military branches
      let branchList = militaryExp.split(/[,;]/);
      branchList.forEach(branchStr => {
        let branch = branchStr.trim().toLowerCase();
        
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

// compute and display ratio of astronauts with military experience
// compute and display astronauts by military branch + unaffiliated
// compute and display statistics related to degrees, ie. (20 PhDs, 13 Masters,...)
// + only count one degree per person, the highest degree earned
