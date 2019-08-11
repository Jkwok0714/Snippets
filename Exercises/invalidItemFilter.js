/**
 * @file A quick filter to see  what was removed in an array given both its states
 * Created Apr 24 2018
 */

//A quick filter by using a set
let filterByArray = (original, filter) => {
  let set = new Set(filter);
  return original.filter(item => !set.has(item));
};

let runTest = (arr1, arr2) => {
  console.log('=====\nFirst array', arr1);
  console.log('Second array', arr2);
  console.log('Filtered,', filterByArray(arr1, arr2));
};

let list1 = ['a', 'b', 'c', 'd'];
let list2 = ['b', 'd'];

runTest(list1, list2);

//Attempt to find out what was removed in an array
list1 = [0, 1, 2, 3, 4];
list2 = [0, 1, 3, 4];

runTest(list1, list2);
