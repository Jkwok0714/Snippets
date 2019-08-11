/**
 * @file Testing the concept of "currying"
 * "Currying is a process in functional programming in which we can transform a function with multiple arguments into a sequence of nesting functions."
 * Created Dec 5 2018
 */

const { inhabitants, locations } = require('../junkData');
const Utility = require('./utility');

/** Number of times to run test */
const TEST_TIMES = 6;

/**
 * The currying function, takes a location and returns a function that uses that location
 * @param {string} location 
 */
const setLocation = (location) => {
  return function (person) {
    return `${person} visited ${location} and ordered curry to consume.`;
  };
}

/**
 * Execute the currying function, giving it  a specific 'location' value
 */
const chooseToSend = setLocation(Utility.chooseRandom(locations));

/**
 * Test runner
 */
const main = () =>{
  for (let i = 0; i < TEST_TIMES; i++) {
    console.log(chooseToSend(Utility.chooseRandom(inhabitants).name));
  }
}

main();
