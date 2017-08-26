let binarySearch = function(arr, target, low, high) {
  low === undefined ? low = 0 : low = low;
  high === undefined ? high = arr.length : high = high;

  console.log('passed a high and low of', high, low);
  let midpoint = 1 + Math.floor((high-low)/2);
  console.log('select midpoint of', midpoint);

  if (high >= low) {
    if (arr[midpoint] === target) {
      return true;
    }
    if (target < arr[midpoint]) {
      console.log('target is less than midpoint');
      return binarySearch(arr, target, low, midpoint - 1)
    } else {
      console.log('target is more than midpoint');
      return binarySearch(arr, target, midpoint + 1, high)
    }
  }
  return false;

};


let main = function() {
  var amount = 50;
  var array = createArray(amount);

  var searchFor = Math.floor(Math.random() * amount);
  console.log('Search for',searchFor);

  console.log(binarySearch(array, searchFor));
};

var createArray = function(amount) {
  let result = [];
  for (var i = 0; i < amount; i++) {
    result.push(i);
  }
  return result;
}


//=====Helper Functions=======

//=====Data Generation========

//====Make sure this is last==
main();
