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
let testString;
testString = 'ASDFGHJ';
console.log(testString, 'is unique?', isUnique(testString));
testString = 'Benji Whang';
console.log(testString, 'is unique?', isUnique(testString));
testString = 'Metal';
console.log(testString, 'is unique?', isUnique(testString));
