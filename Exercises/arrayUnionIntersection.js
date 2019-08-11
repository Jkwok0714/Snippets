/**
 * @file Implementation of array unions and intersections.
 * Created Dec 13 2017
 */

let getUnion = (arr1, arr2) => {
  let result = [];

  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else if (arr1[i] > arr2[j]) {
      result.push(arr2[j]);
      j++;
    } else {
      result.push(arr2[j]);
      i++;
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
};

let getIntersection = (arr1, arr2) => {
  let result = [];

  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      i++;
    } else if (arr1[i] > arr2[j]) {
      j++;
    } else {
      result.push(arr2[j]);
      i++;
      j++;
    }
  }

  return result;
};

//====TEST====

let testFunction = (arr1, arr2) => {
  console.log('Array 1 is', arr1);
  console.log('Array 2 is', arr2);
  console.log('Union is', getUnion(arr1, arr2));
  console.log('Intersection is', getIntersection(arr1, arr2));
}

testFunction([1, 2, 5, 6, 8, 9, 10], [3, 4, 6, 7, 9, 11]);
testFunction([1, 2, 5, 6, 10, 5], [3, 4, 6, 7, 9, 11]);
testFunction([1, 2, 5, 6, 8, 9, 10], [18]);
