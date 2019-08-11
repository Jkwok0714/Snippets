/**
 * @file Simple insertion sort implementation
 * Created Nov 29 2017
 */

let insertionSort = (arr) => {
  //Iterate through ever element of the array
  for(var i = 0; i < arr.length; i++) {
    var temp = arr[i];
    var backCounter = i - 1;

    //Iterate from back until element in right order
    while (backCounter >= 0 && arr[backCounter] > temp) {
      //Shift
      arr[backCounter + 1] = arr[backCounter];
      //Check next lowest
      backCounter--;
    }
    //Swap to the right spot
    arr[backCounter + 1] = temp;
  }

  return arr;
}

//==== TESTS ====
let newArray = [];
let ranLen = Math.floor(Math.random() * 4) + 4;
for (var i = 0; i < ranLen; i++) {
  newArray.push(Math.floor(Math.random() * 100));
}
console.log('Inserting:', newArray);
console.log('Sorting:', insertionSort(newArray));
newArray = [];
ranLen = Math.floor(Math.random() * 4) + 4;
for (var i = 0; i < ranLen; i++) {
  newArray.push(Math.floor(Math.random() * 100));
}
console.log('Inserting:', newArray);
console.log('Sorting:', insertionSort(newArray));
