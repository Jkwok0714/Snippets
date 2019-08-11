
/**
 * @file Trying out a terrible brute force guesser type mechanism
 * Created  Sep 17 2017
 */

var password = 'Test+';
var password36 = 'test1';
var startI = 496080000;
var startI36 = 48480000;
var passLengthToTry = password.length;

//Use Radix 36 or 64
var test = 36;

console.log('Entering function');
console.log('Max i:', Number.MAX_SAFE_INTEGER);

var bruteForceGuesser = function(start, maxLength, use64 = true) {
  var i = start;
  var currTry = '';
  if (use64) {
    while (currTry.length <= maxLength) {
      currTry = Base64.fromInt(i);
      console.log('Trying ==>', currTry, ':', i);
      if (currTry === password) {
        console.log('Found', currTry, 'on attempt', i-start, ': seed', i);
        return true;
      }
      i++;
    }
  } else {
    while (currTry.length <= maxLength) {
      currTry = i.toString(36);
      console.log('Trying ==>', currTry, ':', i);
      if (currTry === password36) {
        console.log('Found', currTry, 'on attempt', i-start, ', seed', i);
        return true;
      }
      i++;
    }
  }
  return false;
}

//Base 64 radix converted courtesy Jahooma @ StackOverflow
//  Power-Radix module from npm can allow more dynamic character possibilities.
Base64 = (function () {
    var digitsStr =
    //   0       8       16      24      32      40      48      56     63
    //   v       v       v       v       v       v       v       v      v
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-";
    var digits = digitsStr.split('');
    var digitsMap = {};
    for (var i = 0; i < digits.length; i++) {
        digitsMap[digits[i]] = i;
    }
    return {
        fromInt: function(int32) {
            var result = '';
            while (true) {
                result = digits[int32 & 0x3f] + result;
                int32 >>>= 6;
                if (int32 === 0)
                    break;
            }
            return result;
        },
        toInt: function(digitsStr) {
            var result = 0;
            var digits = digitsStr.split('');
            for (var i = 0; i < digits.length; i++) {
                result = (result << 6) + digitsMap[digits[i]];
            }
            return result;
        }
    };
})();
if (test = 36) {
  bruteForceGuesser(startI36, 7, false);
} else {
  bruteForceGuesser(startI, 7);
}
