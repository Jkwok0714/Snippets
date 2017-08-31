let main = function() {
  //Take the seed from an input box in the html
  var amount = $('#seed').val();
  resetInfiniteRecursionProtection();
  htmlThemeChange('Binary Search Test');
  var array = createIncrementingArray(amount);
  helperLog('Made an array of',amount,'elements');
  var searchFor = Math.floor(Math.random() * amount)*2;
  htmlLog('Search for',searchFor,'in an array of numbers 1 thru',amount);
  htmlLog('Found:', binarySearch(array, searchFor));


  //Signify end of main
  $('<hr>').appendTo($('#scrollbox'));
};

let loadAllScripts = function() {
  appendScript('tree-struct.js');
};


//=====Helper Functions=======

// var makeRerunButton = function() {
//   var $body = $('#scrollbox');
//   var $rerunButton = $('<button class="printedButton" id="rerunButton">Re-run main()</button>');
//   $rerunButton.appendTo($body);
// };

var appendScript = function(scriptName) {
  var $head = $('head');
  var $newScript = $('<script src="' + scriptName + '"></script>');
  $head.append($newScript);
}

var htmlLog = function(...args) {
  printHtmlLog('jsLog', ...args);
}

var helperLog = function(...args) {
  printHtmlLog('helperLog', ...args);
}

var resetInfiniteRecursionProtection = function() {
  runCount = 0;
}

var printHtmlLog = function(type, ...args) {
  var $body = $('#scrollbox');
  var result = args.join(' ');
  var $textBit = $('<div class="' + type + '">' + result + '</div>');
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
var jQueryStuff = function() {
  $('#rerunButton').on('click', main);

};


//====Make sure this is last==
$(document).ready(function() {
  loadAllScripts();
  main();
  jQueryStuff();
});
