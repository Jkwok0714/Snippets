var runCount = 0;

let binarySearch = function(arr, target, low, high) {
  //Infinite recursion protection
  runCount++;
  if (runCount > 10) return;
  // debugger;
  low === undefined ? low = 0 : low = low;
  high === undefined ? high = arr.length : high = high;

  // console.log('passed a high and low of', high, low);
  var midpoint = low + Math.floor((high-low)/2);
  // console.log('select midpoint of', midpoint);

  if (high >= low) {
    if (arr[midpoint] === target) {
      return true;
    } else {
      if (target < arr[midpoint]) {
        // console.log('target is less than midpoint');
        // console.log('search high to low:', midpoint-1, low);
        return binarySearch(arr, target, low, midpoint-1);
      } else if (target > arr[midpoint]) {
        // console.log('target is more than midpoint');
        // console.log('search high to low:', high, midpoint+1);
        return binarySearch(arr, target, midpoint + 1, high);
      }
    }
  }
  return false;

};

/*
let main = function() {
  var amount = 50;
  var array = createArray(amount);
  // debugger;
  runCount = 0;
  var searchFor = Math.floor(Math.random() * amount);
  console.log('Search for',searchFor,'in an array of',amount,'numbers');

  console.log(binarySearch(array, searchFor));
};


//=====Helper Functions=======

//=====Data Generation========

var createArray = function(amount) {
  let result = [];
  for (var i = 0; i < amount; i++) {
    result.push(i);
  }
  return result;
}

//====Make sure this is last==
main();
*/
