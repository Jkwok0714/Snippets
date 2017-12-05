/*
Example 1:
nums1 = [1, 3]
nums2 = [2]

The median is 2.0
====
Example 2:
nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
*/

var findMedianSortedArrays = function(arr1, arr2) {
  var combined = arr1.concat(arr2);
  combined.sort((a, b) => {
    return a - b
  });
  var length = combined.length;

  //Find the media depending on odd or even number of total elements
  if(length % 2 === 0) {
    return (combined[(length / 2) - 1] + combined[length / 2]) / 2;
  } else {
    return (combined[Math.floor(length / 2)]);
  }
}

// ==== TESTS ====

let arr1, arr2;
arr1 = [1, 4];
arr2 = [0];
//expect [0 1 4]
console.log(findMedianSortedArrays(arr1, arr2));
arr1 = [2, 5, 12, 24];
arr2 = [1, 6, 9, 17];
//Expect [1 2 5 6 HERE 9 12 17 24]
console.log(findMedianSortedArrays(arr1, arr2));
