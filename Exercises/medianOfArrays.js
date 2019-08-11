/**
 * @file Find the media of two arrays in log time
 * Created Dec 5 2017
 */

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

let testFunction = (arr1, arr2) => {
  console.log(findMedianSortedArrays(arr1, arr2));
};

testFunction([1, 4], [0]);
testFunction([2, 5, 12, 24], [1, 6, 9, 17]);
