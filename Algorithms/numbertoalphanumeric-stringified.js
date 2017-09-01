//Turn 5000 to five thousand

var singleDigits = [''];
var teens = [''];
var tens = [''];

var numericToAlphabet = function (number) {
  var stringified = number.toString();
  var result = [];
  var names = ['thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion'];
  if (stringified.length % 3 !== 0) {
    stringified = fillToThree(stringified);
  }
  result = result.concat(convertThreeDigits(stringified)).filter((ele) => {
    return ele != '';
  });
  return result.join(' ');
};

var convertThreeDigits = function(stringifiedThreeDigits) {
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
  var result = (new Array(Math.floor(1 + (numString.length % 3))).join('0')) + numString;
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
testIt(400);
testIt(912);
testIt(5);
testIt(303);
