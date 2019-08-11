/**
 * @file A filter map that combines filtering and mapping given the functions
 * Created Oct 18 2018
 */

const { inhabitants } = require('../junkData');

/**
 * Create a dictionary
 */
const hash = inhabitants.reduce((acc, char) => {
  acc[char.id] = char;
  return acc;
}, {});

let list = [];

/**
 * Generate a list of stuff to work with
 * @param {number} n 
 */
const generateList = (n) => {
  for (let i = 0; i < n; i++) {
    list.push({
      id : i,
      value: Math.floor(Math.random() * 100),
      owner: Math.floor(Math.random() * inhabitants.length),
      type: Math.random() > 0.5 ? 'Artifact' : 'Skill'
    });
  }
};

/**
 * Map function we want to pass in
 * @param {*} el 
 */
const mapFunction = (el) => {
  return Object.assign({}, el, { owner: hash[el.owner] });
}

/**
 * Filter function we want to pass in
 * @param {*} el 
 */
const filterFunction = (el) => {
  return el.type !== 'Artifact';
}

/**
 * The filter map function we're here for, to filter and map something..with reduce
 *   The filterFunc determines whether or not reduce will add an element
 *   If filterFunc returns true and we add, process the element with the map function.
 * @param {*[]} list 
 * @param {Function} filterFunc 
 * @param {Function} mapFunc 
 */
const fmap = (list, filterFunc, mapFunc) => {
  return list.reduce((acc, curr) => {
    return filterFunc(curr) ? [...acc, mapFunc(curr)] : acc;
  }, []);
}

/**
 * Main test runner
 */
const main = () => {
  generateList(7);
  console.log(list);

  let mapThenFilter = list.map(mapFunction).filter(filterFunction);
  console.log('Using map then filter\n', mapThenFilter);
  let fmapped = fmap(list, filterFunction, mapFunction);
  console.log('Using fmap\n', fmapped);
}

main();
