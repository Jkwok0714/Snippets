/**
 * @file The iSunique problem from CTCI, finding duplicate characters
 * Created Dec 3 2017
 */

let isUnique = (string) => {
  let tracker = {};
  for (var i = 0; i < string.length; i++) {
    if (tracker[string[i]] === undefined) {
      tracker[string[i]] = true;
    } else {
      return false;
    }
  }
  return true;
};

// ==== TESTS ====

let testFunction = (string) => {
  console.log(string, '- is unique?', isUnique(string));
}

testFunction('ASDFGHJ');
testFunction('Benji Whang');
testFunction('Metal');
