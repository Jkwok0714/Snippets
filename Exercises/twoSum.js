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
let array, sum;
array = [2, 4, 6, 1, 7];
sum = 500;
console.log(array, '-', sum, twoSum(array, sum));
sum = 13;
console.log(array, '-', sum, twoSum(array, sum));
