/**
 * @file Find the two numbers in an array that add to a given number, in n time
 * Created Dec 3 2017
 */

let twoSum = (array, sum) => {
  let tracker = {};
  let tempDifference;
  for (var i = 0; i < array.length; i++) {
    tempDifference = sum - array[i];
    if (tracker[array[i]] === undefined) {
      tracker[tempDifference] = array[i];
    } else {
      return true;
    }
  }
  return false;
}

//====TESTS====
let testFunction = (arr, sum) => {
  console.log(array, '-', sum, twoSum(array, sum));
};

testFunction([2, 4, 6, 1, 7], 500);
testFunction([2, 4, 6, 1, 7], 13);
