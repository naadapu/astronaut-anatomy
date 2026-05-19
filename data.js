// data.js
//
// Field categotories to help make degrees searchable (todo)
// Engineering
// Physical Sciences
// Biological Sciences
// Mathematics
// Medicine
// Military Science
// Computer Science
// Other
/*
  links = document.getElementsByTagName('a')
  for ( let i = 0; links[i]; i++) {
    console.log(links[i].href)
  }
*/

// todo add group 24: https://en.wikipedia.org/wiki/NASA_Astronaut_Group_24
export const nasa = {
  "astronaut_groups": {
    "group_24": {
      "selection_year": 2025,
      "applications_received": 8000,
      "average_age_of_astronauts": 37.6, 
      "astronauts": [
        {
          "name": "Ben Bailey",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Ben_Bailey_(astronaut)",
          "age_at_selection": 38,
          "gender": "male",
          "highest_degree": "BS",
          "education": "University of Virginia",
          "military_experience": "US Army",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Mechanical Engineering"],
              "category": "Engineering",
              "institution": "University of Virginia",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Lauren Edgar",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Lauren_Edgar",
          "age_at_selection": 40,
          "gender": "female",
          "highest_degree": "PhD",
          "education": "University of Virginia",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Earth Sciences"],
              "category": "Science", //todo
              "institution": "Dartmouth College",
              "year_completed": 2007
            },
             {
              "level": "MS",
              "fields": ["Geology"],
              "category": "Engineering", //todo
              "institution": "California Institute of Technology",
              "year_completed": null
            },
             {
              "level": "PhD",
              "fields": ["Geology"],
              "category": "Engineering", //todo
              "institution": "California Institute of Technology",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Adam Fuhrmann",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Adam_Fuhrmann",
          "age_at_selection": 35,
          "gender": "male",
          "highest_degree": "MS",
          "education": "Purdue University",
          "military_experience": "USAF",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Aerospace Engineering"],
              "category": "Engineering",
              "institution": "Massachusetts Institute of Technology",
              "year_completed": 2011
            },
             {
              "level": "MS",
              "fields": ["Flight Test Engineering"],
              "category": "Engineering",
              "institution": "United States Air Force Test Pilot School",
              "year_completed": 2020
            },
             {
              "level": "MS",
              "fields": ["Systems Engineering"],
              "category": "Engineering", //todo
              "institution": "Purdue University",
              "year_completed": 2022
            }
          ]
        },
        {
          "name": "Cameron Jones",
          "wikipedia_link": null,
          "age_at_selection": 35,
          "gender": "male",
          "highest_degree": "MS",
          "education": "University of Illinois at Urbana-Champaign",
          "military_experience": "USAF",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Aerospace Engineering"],
              "category": "Engineering",
              "institution": "University of Illinois at Urbana-Champaign",
              "year_completed": null
            },
             {
              "level": "MS",
              "fields": ["Aerospace Engineering"],
              "category": "Engineering",
              "institution": "University of Illinois at Urbana-Champaign",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Yuri Kubo",
          "wikipedia_link": null,
          "age_at_selection": 40,
          "gender": "male",
          "highest_degree": "MS",
          "education": "Purdue University",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Electrical Engineering"],
              "category": "Engineering",
              "institution": "Purdue University",
              "year_completed": null
            },
             {
              "level": "MS",
              "fields": ["Electrical and Computer Engineering"],
              "category": "Engineering",
              "institution": "Purdue University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Rebecca Lawler",
          "wikipedia_link": null,
          "age_at_selection": 38,
          "gender": "female",
          "highest_degree": "MS",
          "education": "Johns Hopkins University",
          "military_experience": "US Navy",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Mechanical Engineering"],
              "category": "Engineering",
              "institution": "United States Naval Academy",
              "year_completed": 2009
            },
             {
              "level": "MS",
              "fields": ["Space Systems Engineering"],
              "category": "Engineering",
              "institution": "Johns Hopkins University",
              "year_completed": 2018
            }
          ]
        },
        {
          "name": "Anna Menon",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Anna_Menon",
          "age_at_selection": 39,
          "gender": "female",
          "highest_degree": "MS",
          "education": "Duke University",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Mathematics", "Spanish"],
              "category": "Mathematics",
              "institution": "Texas Christian University",
              "year_completed": null
            },
             {
              "level": "MS",
              "fields": ["Biomedical Engineering"],
              "category": "Engineering",
              "institution": "Duke University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Imelda Muller",
          "wikipedia_link": null,
          "age_at_selection": 34,
          "gender": "female",
          "highest_degree": "MD",
          "education": "Duke University",
          "military_experience": "US Navy",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Behavioral Neuroscience"],
              "category": "Science",
              "institution": "Northeastern University",
              "year_completed": 2017
            },
             {
              "level": "MD",
              "fields": ["Medical Degree"], // todo lol
              "category": "Science", //todo
              "institution": "University of Vermont College of Medicine",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Erin Overcash",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Erin_Overcash",
          "age_at_selection": 34,
          "gender": "female",
          "highest_degree": "MS",
          "education": "University of Colorado, Boulder",
          "military_experience": "US Navy",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Aerospace Engineering"],
              "category": "Engineering",
              "institution": "University of Colorado, Boulder",
              "year_completed": 2014
            },
             {
              "level": "MS",
              "fields": ["Bioastronautics"],
              "category": "Engineering",
              "institution": "University of Colorado, Boulder",
              "year_completed": 2017
            }
          ]
        },
        {
          "name": "Katherine Spies",
          "wikipedia_link": null,
          "age_at_selection": 43,
          "gender": "female",
          "highest_degree": "MS",
          "education": "Harvard University",
          "military_experience": "USMC",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Chemical Engineering"],
              "category": "Engineering",
              "institution": "University of Southern California",
              "year_completed": null
            },
             {
              "level": "MS",
              "fields": ["Design Engineering"],
              "category": "Engineering",
              "institution": "Harvard University",
              "year_completed": null
            }
          ]
        }
      ]
    },
    "group_23": {
      "selection_year": 2021,
      "applications_received": 12000,
      "average_age_of_astronauts": 36.67, 
      "astronauts": [
        {
          "name": "Nichole Ayers",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Nichole_Ayers",
          "age_at_selection": 33,
          "gender": "female",
          "highest_degree": "MS",
          "education": "Rice University",
          "military_experience": "USAF",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Mathematics"],
              "category": "Mathematics",
              "minor": "Russian", // TODO category -> array?
              "institution": "United States Air Force Academy",
              "year_completed": 2011
            },
            {
              "level": "MS",
              "fields": ["Computational and Applied Mathematics"],
              "category": "Mathematics",
              "institution": "Rice University",
              "year_completed": 2013
            }
          ]
        },
        {
          "name": "Marcos Berrios",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Marcos_Berríos",
          "age_at_selection": 37,
          "gender": "male",
          "highest_degree": "PhD",
          "education": "Stanford University",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Mechanical Engineering"],
              "category": "Engineering",
              "institution": "Massachusetts Institute of Technology",
              "year_completed": null
            },
            {
              "level": "MS",
              "fields": ["Mechanical Engineering"],
              "category": "Engineering",
              "institution": "Stanford University",
              "year_completed": null
            },
            {
              "level": "PhD",
              "fields": ["Aeronautics and Astronautics"],
              "category": "Engineering",
              "institution": "Stanford University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Chris Birch",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Christina_Birch",
          "age_at_selection": 35,
          "gender": "female",
          "highest_degree": "PhD",
          "education": "MIT",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Mathematics", "Biochemistry", "Molecular Biophysics"],
              "category": "Engineering", // TODO this probably should be an array
              "institution": "University of Arizona",
              "year_completed": null
            },
            {
              "level": "PhD",
              "fields": ["Biological Engineering"],
              "category": "Engineering",
              "institution": "Massachusetts Institute of Technology",
              "year_completed": 2015
            }
          ]
        },
        {
          "name": "Deniz Burnham",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Deniz_Burnham",
          "age_at_selection": 36,
          "gender": "female",
          "highest_degree": "MS",
          "education": "USC",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Chemical Engineering"],
              "category": "Engineering",
              "institution": "University of California, San Diego",
              "year_completed": 2007
            },
            {
              "level": "MS",
              "fields": ["Mechanical Engineering"],
              "category": "Engineering",
              "institution": "Unviersity of Southern California",
              "year_completed": 2017
            },
          ]
        },
        {
          "name": "Luke Delaney",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Luke_Delaney_(astronaut)",
          "age_at_selection": 42,
          "gender": "male",
          "highest_degree": "MS",
          "education": "Naval Postgraduate School",
          "military_experience": "USMC",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Mechanical Engineering"],
              "category": "Engineering",
              "institution": "University of North Florida",
              "year_completed": null
            },
            {
              "level": "MS",
              "fields": ["Aerospace Engineering"],
              "category": "Engineering",
              "institution": "Naval Postgraduate School",
              "year_completed": null
            },
          ]
        },
        {
          "name": "Andre Douglas",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Andre_Douglas",
          "age_at_selection": 36,
          "gender": "male",
          "highest_degree": "PhD",
          "education": "George Washington University",
          "military_experience": "US Coast Guard",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Mechanical Engineering"],
              "category": "Engineering",
              "institution": "United States Coast Guard Academy",
              "year_completed": 2008
            },
            {
              "level": "MS",
              "fields": ["Mechanical Engineering"],
              "category": "Engineering",
              "institution": "University of Michigan",
              "year_completed": 2012
            },
            {
              "level": "MS",
              "fields": ["Naval Architecture and Marine Engineering"],
              "category": "Engineering",
              "institution": "University of Michigan",
              "year_completed": 2012
            },
            {
              "level": "MS",
              "fields": ["Electrical and Computer Engineering"],
              "category": "Engineering",
              "institution": "Johns Hopkins University",
              "year_completed": 2019
            },
            {
              "level": "PhD",
              "fields": ["Systems Engineering"],
              "category": "Engineering",
              "institution": "George Washington University",
              "year_completed": 2021
            }
          ]
        },
        {
          "name": "Jack Hathaway",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Jack_Hathaway",
          "age_at_selection": 39,
          "gender": "male",
          "highest_degree": "MS",
          "education": "Cranfield University; Naval War College",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Physics and History"],
              "category": "Engineering", // todo fix
              "institution": "United States Naval Academy",
              "year_completed": 2004
            },
            {
              "level": "MS",
              "fields": ["Aerospace Dynamics"],
              "category": "Engineering",
              "institution": "Cranfield University",
              "year_completed": 2014
            },
            {
              "level": "MS",
              "fields": ["National Security and Strategic Studies"],
              "category": "Military Science",
              "institution": "United States Naval War College",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Anil Menon",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Anil_Menon_(astronaut_candidate)",
          "age_at_selection": 45,
          "gender": "male",
          "highest_degree": "MD",
          "education": "Stanford University; UT Medical Branch",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Neurobiology"],
              "category": "Biology",
              "institution": "Harvard University",
              "year_completed": 1999
            },
            {
              "level": "MS",
              "fields": [],
              "category": "",
              "institution": "Stanford University",
              "year_completed": null
            },
            {
              "level": "MD",
              "fields": [],
              "category": "",
              "institution": "Stanford University",
              "year_completed": null
            },
            {
              "level": "MPH",
              "fields": [],
              "category": "",
              "institution": "University of Texas Medical Branch",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Christopher L. Williams",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Christopher_Williams_(astronaut)",
          "age_at_selection": 38,
          "gender": "male",
          "highest_degree": "PhD",
          "education": "MIT",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Physics"],
              "category": "Physics",
              "institution": "Stanford University",
              "year_completed": 2005
            },
            {
              "level": "PhD",
              "fields": ["Physics"],
              "category": "Physics", //todo
              "institution": "Massachusetts Institute of Technology",
              "year_completed": 2012
            }
          ]
        },
        {
          "name": "Jessica Wittner",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Jessica_Wittner",
          "age_at_selection": 38,
          "gender": "female",
          "highest_degree": "MS",
          "education": "Naval Postgraduate School",
          "military_experience": "US Navy",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Aerospace Engineering"],
              "category": "Engineering",
              "institution": "University of Arizona",
              "year_completed": null
            },
            {
              "level": "MS",
              "fields": ["Aerospace Engineering"],
              "category": "Engineering", //todo
              "institution": "United States Naval Postgraduate School",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Nora Al Matrooshi",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Nora_Al_Matrooshi",
          "age_at_selection": 28,
          "gender": "female",
          "highest_degree": "BS",
          "education": "UAE University",
          "military_experience": null,
          "nationality": "UAE",
          "is_international": true,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Mechanical Engineering"],
              "category": "Engineering",
              "institution": "United Arab Emirates University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Mohammed Al Mulla",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Mohammad_Al_Mulla",
          "age_at_selection": 33,
          "gender": "male",
          "highest_degree": "EMPA",
          "education": "Mohammed Bin Rashid School of Government",
          "military_experience": "Dubai Police",
          "nationality": "UAE",
          "is_international": true,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Law and Economics"],
              "category": "", //todo
              "institution": "Mohammed Bin Rashid School of Government",
              "year_completed": 2015
            },
            {
              "level": "EMPA",
              "fields": ["Public Administration"],
              "category": "", //todo
              "institution": "Mohammed Bin Rashid School of Government",
              "year_completed": 2021
            }
          ]
        }
      ]
    },

    "group_22": {
      "selection_year": 2017,
      "applications_received": 18300,
      "average_age_of_astronauts": 33.71, 
      "astronauts": [
        {
          "name": "Kayla Barron",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Kayla_Barron",
          "age_at_selection": 30,
          "gender": "female",
          "highest_degree": "MPhil",
          "education": "Peterhouse, Cambridge",
          "military_experience": "US Navy",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Zena Cardman",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Zena_Cardman",
          "age_at_selection": 30,
          "gender": "female",
          "highest_degree": "MS",
          "education": "UNC Chapel Hill",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Raja Chari",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Raja_Chari",
          "age_at_selection": 40,
          "gender": "male",
          "highest_degree": "MS",
          "education": "MIT",
          "military_experience": "US Air Force",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Matthew Dominick",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Matthew_Dominick",
          "age_at_selection": 32,
          "gender": "male",
          "highest_degree": "MS",
          "education": "Naval Postgraduate School",
          "military_experience": "US Navy",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Bob Hines",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Robert_Hines_(astronaut)",
          "age_at_selection": 38,
          "gender": "male",
          "highest_degree": "MS",
          "education": "US Air Force Test Pilot School; University of Alabama",
          "military_experience": "US Air Force",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Warren Hoburg",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Warren_Hoburg",
          "age_at_selection": 32,
          "gender": "male",
          "highest_degree": "PhD",
          "education": "UC Berkeley",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Jonny Kim",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Jonny_Kim",
          "age_at_selection": 33,
          "gender": "male",
          "highest_degree": "MD",
          "education": "Harvard",
          "military_experience": "US Navy SEAL",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Jasmin Moghbeli",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Jasmin_Moghbeli",
          "age_at_selection": 34,
          "gender": "female",
          "highest_degree": "MS",
          "education": "Naval Postgraduate School; MIT",
          "military_experience": "USMC",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Loral O'Hara",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Loral_O%27Hara",
          "age_at_selection": 34,
          "gender": "female",
          "highest_degree": "MS",
          "education": "Purdue",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Frank Rubio",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Francisco_Rubio_(astronaut)",
          "age_at_selection": 42,
          "gender": "male",
          "highest_degree": "MD",
          "education": "Uniformed Services University of the Health Sciences",
          "military_experience": "US Army",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Jessica Watkins",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Jessica_Watkins",
          "age_at_selection": 29,
          "gender": "female",
          "highest_degree": "PhD",
          "education": "UCLA; Stanford",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Joshua Kutryk",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Joshua_Kutryk",
          "age_at_selection": 35,
          "gender": "male",
          "highest_degree": "MSc",
          "education": "Embry Riddle; Air University",
          "military_experience": "Royal Canadian Air Force",
          "nationality": "Canada",
          "is_international": true,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Jenni Sidey-Gibbons",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Jennifer_Sidey",
          "age_at_selection": 29,
          "gender": "female",
          "highest_degree": "PhD",
          "education": "Jesus College Cambridge",
          "military_experience": null,
          "nationality": "Canada",
          "is_international": true,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Robb Kulin (resigned before training)",
          "wikipedia_link": "https://en.wikipedia.org/wiki/Robb_Kulin",
          "age_at_selection": 34,
          "gender": "male",
          "highest_degree": "PhD",
          "education": "University of California San Diego",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        }
      ]
    },

    "group_21": {
      "selection_year": 2013,
      "applications_received": 6300,
      "average_age_of_astronauts": 36.50, 
      "astronauts": [
        {
          "name": "Josh A. Cassada",
          "wikipedia_link": "",
          "age_at_selection": 40,
          "gender": "unknown",
          "highest_degree": "PhD",
          "education": "University of Rochester",
          "military_experience": "US Navy",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Victor J. Glover, Jr.",
          "wikipedia_link": "",
          "age_at_selection": 37,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "Naval Postgraduate School; Air University",
          "military_experience": "US Navy",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Nick Hague",
          "wikipedia_link": "",
          "age_at_selection": 38,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "MIT",
          "military_experience": "US Air Force Space Force",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Christina H. Koch",
          "wikipedia_link": "",
          "age_at_selection": 34,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "North Carolina State University",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Nicole A. Mann",
          "wikipedia_link": "",
          "age_at_selection": 36,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "Stanford",
          "military_experience": "USMC",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Anne C. McClain",
          "wikipedia_link": "",
          "age_at_selection": 34,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "University of Bath; University of Bristol",
          "military_experience": "US Army",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Jessica U. Meir",
          "wikipedia_link": "",
          "age_at_selection": 36,
          "gender": "unknown",
          "highest_degree": "PhD",
          "education": "UC San Diego",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Andrew R. Morgan",
          "wikipedia_link": "",
          "age_at_selection": 37,
          "gender": "unknown",
          "highest_degree": "MD",
          "education": "Uniformed Services University of the Health Sciences",
          "military_experience": "US Army",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        }
      ]
    },

    "group_20": {
      "selection_year": 2009,
      "applications_received": null,
      "average_age_of_astronauts": 36.71, 
      "astronauts": [
        {
          "name": "Serena M. Aunon",
          "wikipedia_link": "",
          "age_at_selection": 33,
          "gender": "unknown",
          "highest_degree": "MPH",
          "education": "UT Galveston",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Jeanette J Epps",
          "wikipedia_link": "",
          "age_at_selection": 39,
          "gender": "unknown",
          "highest_degree": "PhD",
          "education": "University of Maryland College Park",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Jack D Fischer",
          "wikipedia_link": "",
          "age_at_selection": 35,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "MIT",
          "military_experience": "US Air Force",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Michael S Hopkins",
          "wikipedia_link": "",
          "age_at_selection": 41,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "Stanford",
          "military_experience": "US Space Force",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Kjell N Lindgren",
          "wikipedia_link": "",
          "age_at_selection": 36,
          "gender": "unknown",
          "highest_degree": "MPH",
          "education": "UT Galveston",
          "military_experience": "US Air Force",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Kathleen Rubins",
          "wikipedia_link": "",
          "age_at_selection": 31,
          "gender": "unknown",
          "highest_degree": "PhD",
          "education": "Stanford University",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Scott D Tingle",
          "wikipedia_link": "",
          "age_at_selection": 44,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "Purdue",
          "military_experience": "US Navy",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Mark T. Vande Hei",
          "wikipedia_link": "",
          "age_at_selection": 43,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "Stanford",
          "military_experience": "US Army",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Gregory R Wiseman",
          "wikipedia_link": "",
          "age_at_selection": 34,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "Johns Hopkins",
          "military_experience": "US Navy",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Jeremy Hansen",
          "wikipedia_link": "",
          "age_at_selection": 33,
          "gender": "unknown",
          "highest_degree": "MSc",
          "education": "Royal Military College",
          "military_experience": "Royal Canadian Air Force",
          "nationality": "Canada",
          "is_international": true,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Norishige Kanai",
          "wikipedia_link": "",
          "age_at_selection": 33,
          "gender": "unknown",
          "highest_degree": "MD",
          "education": "National Defense Medical College",
          "military_experience": null,
          "nationality": "Japan",
          "is_international": true,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Takuya Onishi",
          "wikipedia_link": "",
          "age_at_selection": 34,
          "gender": "unknown",
          "highest_degree": "BEng",
          "education": "University of Tokyo",
          "military_experience": null,
          "nationality": "Japan",
          "is_international": true,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "David Saint-Jacques",
          "wikipedia_link": "",
          "age_at_selection": 39,
          "gender": "unknown",
          "highest_degree": "PhD",
          "education": "Corpus Christi College Cambridge",
          "military_experience": null,
          "nationality": "Canada",
          "is_international": true,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Kimiya Yui",
          "wikipedia_link": "",
          "age_at_selection": 39,
          "gender": "unknown",
          "highest_degree": "BS",
          "education": "National Defense Academy of Japan",
          "military_experience": "Japan Air Self Defense Force",
          "nationality": "Japan",
          "is_international": true,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        }
      ]
    },

    "group_19": {
      "selection_year": 2004,
      "applications_received": null,
      "average_age_of_astronauts": 37.73, 
      "astronauts": [
        {
          "name": "Joseph M Acaba",
          "wikipedia_link": "",
          "age_at_selection": 37,
          "gender": "unknown",
          "highest_degree": "MEd",
          "education": "Texas Tech University",
          "military_experience": "USMCR",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Richard R Arnold",
          "wikipedia_link": "",
          "age_at_selection": 41,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "University of Maryland College Park",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Randolph Bresnik",
          "wikipedia_link": "",
          "age_at_selection": 37,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "University of Tennessee Knoxville",
          "military_experience": "USMC",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Christopher Cassidy",
          "wikipedia_link": "",
          "age_at_selection": 34,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "MIT",
          "military_experience": "US Navy SEAL",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "James Dutton",
          "wikipedia_link": "",
          "age_at_selection": 36,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "University of Washington",
          "military_experience": "USAF",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Jose Moreno Hernandez",
          "wikipedia_link": "",
          "age_at_selection": 42,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "UC Santa Barbara",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Robert S Kimbrough",
          "wikipedia_link": "",
          "age_at_selection": 37,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "Georgia Institute of Technology",
          "military_experience": "army",
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Thomas Marshburn",
          "wikipedia_link": "",
          "age_at_selection": 44,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "UT Galveston",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Dorothy Metcalf-Lindenburger",
          "wikipedia_link": "",
          "age_at_selection": 29,
          "gender": "unknown",
          "highest_degree": "MS",
          "education": "University of Washington",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Robert Satcher",
          "wikipedia_link": "",
          "age_at_selection": 39,
          "gender": "unknown",
          "highest_degree": "PhD",
          "education": "MIT",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        },
        {
          "name": "Shannon Walker",
          "wikipedia_link": "",
          "age_at_selection": 39,
          "gender": "unknown",
          "highest_degree": "PhD",
          "education": "Rice University",
          "military_experience": null,
          "nationality": "USA",
          "is_international": false,
          "degrees": [
            {
              "level": "BS",
              "fields": ["Engineering"],
              "category": "Engineering",
              "institution": "University",
              "year_completed": null
            }
          ]
        }
      ]
    }
  }
}
