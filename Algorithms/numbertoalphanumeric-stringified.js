//Turn 5000 to five thousand

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
  // console.log(result);
  return result;
};

var fillToThree = function(numString) {
  var zeroes;
  if (numString.length % 3 === 1) {
    zeroes = '00';
  } else {
    zeroes = '0';
  }
  var result = zeroes + numString;
  console.log(result);
  return result;
}

var digitToText = function(digit, style) {
  if (style === 1) {
    if (digit === '1') {
      return 'one';
    } else if (digit === '2') {
      return 'two';
    } else if (digit === '3') {
      return 'three';
    } else if (digit === '4') {
      return 'four';
    } else if (digit === '5') {
      return 'five';
    } else if (digit === '6') {
      return 'six';
    } else if (digit === '7') {
      return 'seven';
    } else if (digit === '8') {
      return 'eight';
    } else if (digit === '9') {
      return 'nine';
    }
  } else if (style === 2) {
    if (digit === '1') {
      return 'ten';
    } else if (digit === '2') {
      return 'twenty';
    } else if (digit === '3') {
      return 'thirty';
    } else if (digit === '4') {
      return 'forty';
    } else if (digit === '5') {
      return 'fifty';
    } else if (digit === '6') {
      return 'sixty';
    } else if (digit === '7') {
      return 'seventy';
    } else if (digit === '8') {
      return 'eighty';
    } else if (digit === '9') {
      return 'ninety';
    }
  } else if (style === 3) {
    if (digit === '1') {
      return 'eleven';
    } else if (digit === '2') {
      return 'twelve';
    } else if (digit === '3') {
      return 'thirteen';
    } else if (digit === '4') {
      return 'fourteen';
    } else if (digit === '5') {
      return 'fifteen';
    } else if (digit === '6') {
      return 'sixteen';
    } else if (digit === '7') {
      return 'seventeen';
    } else if (digit === '8') {
      return 'eighteen';
    } else if (digit === '9') {
      return 'nineteen';
    }
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
