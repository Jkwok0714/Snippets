/**
 * @file Bits and snippets from Medium article "Helpful JS snippets"
 */



/**
 * Split objects into two arrays depending on whether or not the pass or fail a test.
 * @param {Array<*>} arr 
 * @param {function(*) => boolean} test 
 */
const bifurcateBy = (arr, test) => (
    arr.reduce((a, v, i) => (a[test(v, i) ? 0 : 1].push(v), a), [[], []])
);

/**
 * Capitalize every word in a sentence.
 * @param {string} str 
 */
const capitalizeEveryWord = (str) => (
    str.replace(/\b[a-z]/g, char => char.toUpperCase())
);



/**
 * Print out the name of the test so it looks more organized (but isn't really)
 * @param {string} testName 
 */
const announceTest = (testName) => {
    console.log(`\x1b[32m== Now running test: ${testName} ==\x1b[0m`);
};

/**
 * Count the number of times a value occurs within an array
 * @param {Array} arr 
 * @param {*} val 
 */
const countOccurrences = (arr, val) => (
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
);

/**
 * User recursion to flatten an array of arrays, if applicable
 * @param {Array} arr 
 */
const deepFlatten = (arr) => (
    [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))
);

/**
 * Wait on execution of a function until the call stack is cleared
 * @param {*} fn 
 * @param  {...any} args 
 */
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

/**
 * Removes array elements until a passed function returns true
 * @param {Array} arr 
 * @param {function(*) => boolean} fn 
 */
const dropWhile = (arr, fn) => {
    while (arr.length > 0 && !fn(arr[0])) arr = arr.slice(1);
    return arr;
};

/**
 * A method of getting unique items only with lastIndexOf
 * @param {Array} arr 
 */
const uniqueOnly = (arr) => (
    arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))
);

/**
 * Print a function's name into the console
 * @param {Function} fn 
 */
const functionName = (fn) => (
    console.debug(fn.name, fn)
);

/**
 * Main Test runner
 * Nevermind, will write something in Tests for it.
 */
const main = () => {
    announceTest('Bifurcate By');
    // let arr1 = [{}];
};

module.exports = {
    bifurcateBy,
    capitalizeEveryWord,
    countOccurrences,
    deepFlatten,
    defer,
    dropWhile,
    uniqueOnly,
    functionName
};