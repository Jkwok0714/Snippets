let main = function() {

  var amount = 50;
  var array = createIncrementingArray(amount);
  // debugger;
  runCount = 0;
  var searchFor = Math.floor(Math.random() * amount)*2;
  htmlThemeChange('Binary Search Test');
  htmlLog('Search for',searchFor,'in an array of',amount,'numbers');
  htmlLog('Found:', binarySearch(array, searchFor));


  //makeRerunButton();
};


//=====Helper Functions=======

// var makeRerunButton = function() {
//   var $body = $('#scrollbox');
//   var $rerunButton = $('<button class="printedButton" id="rerunButton">Re-run main()</button>');
//   $rerunButton.appendTo($body);
// };

var htmlLog = function(...args) {
  var $body = $('#scrollbox');
  var result = args.join(' ');
  // args.forEach(function(el) {
  //   result +=
  // });
  // return result;
  var $textBit = $('<div class="jsLog">' + result + '</div>');
  $textBit.appendTo($body);
}

var htmlThemeChange = function(input) {
  var $body = $('#scrollbox');
  var $textBit = $('<div class="themeBreak">' + input + '</div><div style="opacity:0.3"><hr></div><br>');
  $textBit.appendTo($body);
}

let getRandomBetween = function(low, high) {
  return Math.floor(Math.random()*(high-low+1)+low);
}

function getRandom() {
  return Math.floor(Math.random()*1000);
}

//=====Data Generation========

var createIncrementingArray = function(amount) {
  let result = [];
  for (var i = 0; i < amount; i++) {
    result.push(i);
  }
  return result;
}

var createRandomArray = function(amount) {
  let result = new Array(amount);
  // result.forEach(function(el) {
  //   el = 4;
  // });
  for (var i = 0; i < result.length; i++) {
    result[i] = getRandom();
  }
  return result;
}

//===jQuery Functionality=====

//====Make sure this is last==
$(document).ready(function() {
  main();
  $('#rerunButton').on('click', main);
});
