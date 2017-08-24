function quickSort(arr, low, high) {
  if (low < high) {
    //The PARTITION will find out where to divide the array in half by the pivot (current high value)
    let pi = partition(arr, low, high);

    //Sort left of the pivot, and right of the pivot individually
    quickSort(arr, low, pi-1);
    quickSort(arr, pi+1, high);
  }
}

function partition(arr, low, high) {
  //Set the pivot as the element on the end of the array
  let pivot = arr[high];

  //i will be a value where we can swap elements to if they're smaller
  let i = low-1;

  //Traverse all the array
  for (var j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      //If the current element is smaller than the pivot, throw it over to the left
      i++;
      //Also increase i so we can track the last element which is less than the pivot
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
  }

  //Since everything left of i is smaller than the pivot and everything on the right is larger, move the pivot element to after i.
  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];

  //This is where to bisect the array for our recursive runs
  return i + 1;
}


//Below are just functions to test and demo the quicksort.

function ran() {
  return Math.floor(Math.random()*1000);
}

function fillArray(numEles) {
  let result = new Array(numEles);
  // result.forEach(function(el) {
  //   el = 4;
  // });
  for (var i = 0; i < result.length; i++) {
    result[i] = ran();
  }
  return result;
}

let inputArr = fillArray(10);

console.log('Array before sort:',inputArr);
quickSort(inputArr, 0, inputArr.length-1);
console.log('Array after sort:', inputArr);
