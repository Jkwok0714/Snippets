/*
 * Utility Methods
 */
const getUnion = (arr1, arr2) => {
    // Change set elements to array, after converting set from two arrays and removing dups
    return [...new Set([...arr1, ...arr2])];
};

const getIntersection = (arr1, arr2) => {
    // Filter arr1 elements down to what is in arr2 as well
    return arr1.filter(it => arr2.includes(it));
};

const uniqueGroups = (arr, key) => {
    // Reduce to just one key and use Set to remove dups
    return [...new Set(arr.map(o => o[key]))];
}

const removeDuplicatePrimitives = (arr) => {
    return [... new Set(arr)];
};

const groupAndCount = (arr, key) => {
    return arr.reduce((acc, it) => {
        acc[it[key]] = acc[it[key]] + 1 || 1;
        return acc;
    }, {});
};

const simpleSearch = (arr, query, key) => {
    // Use i to make it case insensitive
    return arr.filter(o => new RegExp(query, 'i').test(o[key]));
};

/*
 * Test Methods
 */
const announceTest = (testName) => {
    console.log(`\x1b[32m== Now running test: ${testName} ==\x1b[0m`);
};

/*
 * Test Runner
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
};

main();