/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    mainMenu(searchByName(people)[0]);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Please try again");
    app(data); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'."+"\n"+"Type 'restart' if you wish you restart your search.");
  let filteredPeople = [];

  switch(userSearchChoice) {
    case "height, weight":
      filteredPeople = searchByHeight(people);
      filteredPeople = searchByWeight(people);
      break;
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeCol(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    case "restart":
      app(data); // restart
      break;

    // so on and so forth
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }


  if (filteredPeople.length > 1) {
    displayPeople(filteredPeople);
    searchByTraits(filteredPeople);
  } else if (filteredPeople.length === 1) {
    let foundPerson = filteredPeople[0];
    mainMenu(foundPerson, people);
  } else {
    app(data);
  }
}

//search functions
function searchByHeight(people) {
  let userInputHeight = prompt("How tall is this person?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });
  if (newArray === undefined || newArray.length === 0) {
    alert("Could not find that individual.");
    return app(data); // restart
  }
  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });
  if (newArray === undefined || newArray.length === 0) {
    alert("Could not find that individual.");
    return app(data); // restart
  }
  return newArray;
}

function searchByEyeCol(people) {
  let userInputEyeCol = prompt("What is this person's eye color?").toLowerCase();

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeCol) {
      return true;
    }
  });
  if (newArray === undefined || newArray.length === 0) {
    alert("Could not find that individual.");
    return app(data); // restart
  }
  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("What is this person's gender?").toLowerCase();

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });
  if (newArray === undefined || newArray.length === 0) {
    alert("Could not find that individual.");
    return app(data); // restart
  }
  return newArray;
}

function searchByAge(people) {
  let userInputAge = prompt("How old is this person?");

  let newArray = people.filter(function (el) {
    if(trueAge(el.dob) == userInputAge) {
      return true;
    }
  });
  if (newArray === undefined || newArray.length === 0) {
    alert("Could not find that individual.");
    return app(data); // restart
  }
  return newArray;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is this person's occupation?").toLowerCase();

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
  });
  if (newArray === undefined || newArray.length === 0) {
    alert("Could not find that individual.");
    return app(data); // restart
  }
  return newArray;
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(data); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + ". Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    return app(data);
    break;
    case "family":
    displayFamily(person, data)
    break;
    case "descendants":
    displayDescendants(person, data);
    break;
    case "restart":
    app(data); // restart
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  //changes inputed name to have uppercase letters for easier data access
  upperFirstName = firstName[0].toUpperCase() + firstName.substring(1);
  upperLastName = lastName[0].toUpperCase() + lastName.substring(1);

  let newArray = people.filter(function (el) {
    if( (el.firstName == upperFirstName) && (el.lastName == upperLastName) ) {
      return true;
    } else {
      return false;
    }
  });
  //if no person exists by that name
  if (newArray === undefined || newArray.length === 0) {
    alert("Could not find that individual.");
    return app(data); // restart
  }
  return newArray;
}

function trueAge(age) {
  var currentYear = 2018;
  var actualAge = currentYear-(age[age.length-4]+age[age.length-3]+age[age.length-2]+age[age.length-1]);
  return actualAge;
}

// alerts a list of people
function displayPeople(people){
  alert("Search Results: "+"\n"+people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function resultsLoop(newArray) {
  if (newArray.length > 1) {

  } else {
    return;
  }
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + trueAge(person.dob) + "\n";
  personInfo += "Date of birth: " + person.dob + "\n";
  personInfo += "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";

  alert(personInfo);
}

function displayDescendants(person, people, allDescend = []) {
  var loopFinish = false;
  let newArray = people.filter(function (el) {
    if( (person.id == el.parents[0]) || (person.id == el.parents[1]) ) {
      allDescend.push(el)
      return true;
    } else {
      return false;
    }
  });
  if (newArray.length > 1) {
    for (i = 0; i < newArray.length; i++) {
      displayDescendants(newArray[i], data, allDescend);
    }
    loopFinish = true;
  } else if (allDescend.length === 0) {
    loopFinish = true;
  }
  //if descendants
  if (newArray.length >= 1) {
    displayPeople(allDescend)
    return app(data);
  }
  //if no descendants
  if (loopFinish) {
    if (newArray === undefined || newArray.length === 0) {
      alert("This person has no descendants");
      return app(data);
    }
    loopFinish = false;
  }
}

function displayFamily(person, people, allFamily = []) {
  let newArray = people.filter(function (el) {
      if (person.id === el.id) {
        return false;
      } else if( ( (person.id === el.currentSpouse && el.currentSpouse !== null && person.currentSpouse !== null) ||
        person.id === el.parents[0] ||
        person.id === el.parents[1] ||
        person.parents[0] === el.id ||
        person.parents[1] === el.id ||
        (person.parents[0] === el.parents[0] && person.parents.length >= 1) ||
        (person.parents[0] === el.parents[1] && person.parents.length >= 1) ||
        (person.parents[1] === el.parents[0] && person.parents.length >= 1) ||
        (person.parents[1] === el.parents[1] && person.parents.length >= 1) ) ) {
        return true;
      } else {
        return false;
      }
  });

  if (newArray.length >= 1) {
    displayPeople(newArray);
    return app(data);
  }
}

function checkDescend(person, people) {
  var returnNew = false;
  let newArray = people.filter(function (el) {
    if( (person.id == el.parents[0]) || (person.id == el.parents[1]) ) {
      returnNew = true;
    } else {
      returnNew = false;
    }
  });
  if (returnNew) {
    checkDescend(person, data);
  } else {
    return newArray;
  }
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
