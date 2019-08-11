/**
 * @file Toy problem practice: turning numbers to word versions e.g. 5000 -> five thousand
 * Created Sep 1 2017
 */

var singleDigits = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var names = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion'];

var numericToAlphabet = function (number) {
  var stringified = number.toString();
  var result = [];
  if (stringified.length % 3 !== 0) {
    stringified = fillToThree(stringified);
  }
  //Find how many segments of 3 there are
  var parts = stringified.length / 3;

  //Track if this segment of three is thousands, millions, etc..
  var perThree = parts;

  for (var i = 0; i < parts; i++) {
    var miniString = stringified[0 + i * 3] + stringified[1 + i * 3] + stringified[2 + i * 3];
    result = result.concat(convertThreeDigits(miniString)).filter((ele) => {
      return ele != '';
    });
    if (miniString !== '000') result = result.concat(names[perThree - 1]);
    perThree--;
  }

  return result.join(' ');
};

var convertThreeDigits = function(stringifiedThreeDigits) {
  // console.log(stringifiedThreeDigits);
  var result = [];
  if (stringifiedThreeDigits[0] !== '0') {
    result.push(digitToText(stringifiedThreeDigits[0], 1), 'hundred');
  }
  if (stringifiedThreeDigits[1] === '1') {
    result.push(digitToText(stringifiedThreeDigits[2], 3));
  } else {
    result.push(digitToText(stringifiedThreeDigits[1], 2));
    result.push(digitToText(stringifiedThreeDigits[2], 1));
  }
  return result;
};

var fillToThree = function(numString) {
  var zeroes = new Array(4 - (numString.length % 3)).join("0");
  var result = zeroes + numString;
  return result;
}

var digitToText = function(digit, style) {
  if (style === 1) {
    return singleDigits[digit];
  } else if (style === 2) {
    return tens[digit];
  } else if (style === 3) {
    return teens[digit];
  }
  return '';
}

var testIt = (input) => {
  console.log(input,'is...',numericToAlphabet(input));
}

//Tests
{
  testIt(400);
  testIt(912);
  testIt(5);
  testIt(3035);
  //30,676,335
  testIt(30676335);
  testIt(52752);
  testIt(6990004);
}
