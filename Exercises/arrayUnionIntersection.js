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
let array1 = [1, 2, 5, 6, 8, 9, 10];
let array2 = [3, 4, 6, 7, 9, 11];

console.log('array1 is', array1);
console.log('array2 is', array2);
console.log('union is', getUnion(array1, array2));
console.log('intersection is', getIntersection(array1, array2));
