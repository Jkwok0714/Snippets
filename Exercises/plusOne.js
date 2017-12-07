/*
Given a non-negative integer represented as a non-empty array of digits, plus one to the integer.

You may assume the integer do not contain any leading zero, except the number 0 itself.

The digits are stored such that the most significant digit is at the head of the list.

E.G [1 9 5 3 6] plusOne 1 9 5 3 7
*/

let plusOne = (arr) => {
  let last = arr.length - 1;

  for (var i = last; i >= 0; i--) {
    if (arr[i] != 9) {
      arr[i]++;
      break;
    } else {
      arr[i] = 0;
    }
  }

  if (arr[0] === 0) {
    arr.unshift(1);
  }
  return arr;
};

//==== TEST ====
let arr;
arr = [1, 2, 6, 5];
console.log('Arr:', arr);
console.log('Add:', plusOne(arr));
arr = [1, 2, 6, 9];
console.log('Arr:', arr);
console.log('Add:', plusOne(arr));
arr = [9, 9, 9, 9];
console.log('Arr:', arr);
console.log('Add:', plusOne(arr));
