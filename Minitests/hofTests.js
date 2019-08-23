/**
 * @file Utility functions practice using JS higher-order methods
 * Created Feb 3 2019
 */

/**
 * Get the union between two arrays using the Set to remove duplicates
 * @param {*[]} arr1 
 * @param {*[]} arr2 
 */
const getUnion = (arr1, arr2) => {
    return [...new Set([...arr1, ...arr2])];
};

/**
 * Filter arr1's elements down to what is in arr2 as well
 * @param {*[]} arr1 
 * @param {*[]} arr2 
 */
const getIntersection = (arr1, arr2) => {
    return arr1.filter(it => arr2.includes(it));
};

/**
 * Reduce everything to just one key, using sets to remove duplicates
 * @param {*[]} arr 
 * @param {string} key 
 */
const uniqueGroups = (arr, key) => {
    return [...new Set(arr.map(o => o[key]))];
}

/**
 * Remove duplicates but with an array of primitive types instead
 * @param {*[]} arr 
 */
const removeDuplicatePrimitives = (arr) => {
    return [... new Set(arr)];
};

/**
 * Group an array's elements by a key but then count them
 * @param {Object[]} arr 
 * @param {string} key 
 */
const groupAndCount = (arr, key) => {
    return arr.reduce((acc, it) => {
        acc[it[key]] = acc[it[key]] + 1 || 1;
        return acc;
    }, {});
};

/**
 * Search an array of objects for a string located in the defined key
 * @param {Object[]} arr 
 * @param {string} query The search query; what are we looking for
 * @param {string} key The key to run the search on
 */
const simpleSearch = (arr, query, key) => {
    // Use i to make it case insensitive
    return arr.filter(o => new RegExp(query, 'i').test(o[key]));
};

const highbrowForLoop = (n, fnc) => {
    Array.from({ length: n }, (_, i) => fnc(i));
};

/**
 * .uniq function that looks at a certain key in the objects of the array.
 * Obviously the objects are all expected to be the same type.
 * The idea is to make an array of the key values, and filter back with it
 * If they are primitives just make a Set, which will remove duplicates.
 * @param {Object[]} arr
 * @param {string} key
 */
const uniqueArrayByKey = (arr, key) => {
    return key
        ? arr.map(e => e[key])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e])
            .map(e => arr[e])
        : [...new Set(arr)];
};

/* ======
 * Test Methods
 */

/**
 * Print out the name of the test so it looks more organized (but isn't really)
 * @param {string} testName 
 */
const announceTest = (testName) => {
    console.log(`\x1b[32m== Now running test: ${testName} ==\x1b[0m`);
};

/* ======
 * Test Runner
 */

/**
 * Main test runner
 */
const main = () => {
    const arr1 = ['Complete Control', 'Hazard', 'Bronco', 'Whiplash'];
    const arr2 = ['Hazard', 'Bronco', 'Bite Force', 'Biohazard'];

    announceTest('Union / Intersection');
    console.log('The two arrays:', arr1, arr2);

    console.log('getUnion:', getUnion(arr1, arr2));
    console.log('getIntersection', getIntersection(arr1, arr2));

    const units = [
        { name: 'Yari Ashigaru', type: 'Melee' },
        { name: 'Katana Samurai', type: 'Melee' },
        { name: 'General Unit', type: 'Cavalry' },
        { name: 'Bow Ashigaru', type: 'Ranged' },
        { name: 'Shimazu Heavy Gunners', type: 'Ranged' }
    ];

    announceTest('Unique Groups');
    console.log('Units list', units);
    console.log('Groups in units list', uniqueGroups(units, 'type'));

    announceTest('Duplicate Primitives Removal');
    let testArr = [1, 1, 2, 4, 5, 'Milk Tea', 'Nippon', 'Milk Tea'];
    console.log('Array is now', testArr);
    testArr = removeDuplicatePrimitives(testArr);
    console.log('Array is now', testArr);

    announceTest('Group and count');
    console.log(groupAndCount(units, 'type'));

    announceTest('Simple search for Ashigaru');
    console.log(simpleSearch(units, 'ashi', 'name'));

    announceTest('Highbrow for loop');
    highbrowForLoop(5, (i) => console.log(`Intellectual #${i}`));
};

if (!module.parent) main();

module.exports = {
    getUnion,
    getIntersection,
    uniqueGroups,
    removeDuplicatePrimitives,
    groupAndCount,
    simpleSearch,
    highbrowForLoop,
    uniqueArrayByKey
};
