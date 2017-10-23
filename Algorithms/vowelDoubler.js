/*
Given an array of characters, return the array with every vowel doubled. For example:

['w','h','a','t',' ','o','n',' ','e','a','r','t','h',' ','a','r','e',' ','y','o','u',' ','t','a','l','k','i','n','g',' ','a','b','o','u','t','?']

==>

['w','h','a','a','t',' ','o','o','n',' ','e','e','a','a','r','t','h',' ','a','a','r','e','e',' ','y','o','o','u','u',' ','t','a','a','l','k','i','i','n','g',' ','a','a','b','o','o','u','u','t','?']

Constraints

The challenge in this problem is in meeting its (arbitrary) constraints:

    Do not convert into strings or manipulate strings at all.
    Do not create any other data structures.
    In particular, don't instantiate a new array.
    The big-O of the solution should be O(n).
*/

//Count vowels

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

let vowelDouble = (input) => {
  let vowelCount = 0;
  for (var i = 0; i < input.length; i++) {
    if (VOWELS.indexOf(input[i]) !== -1) {
      vowelCount++;
    }
  }

  let counter = vowelCount;
  let lastPlaced = null;
  for (var j = input.length + vowelCount - 1; j > 0; j--) {
    input[j] = input[j - counter];
    if (VOWELS.indexOf(input[j]) !== -1 && lastPlaced !== input[j]) {
      counter--;
    }
    lastPlaced = input[j];
  }
  return input;
};

let vowelDouble2 = (input) => {
  for (var i = 0; i < input.length; i++) {
    if (VOWELS.indexOf(input[i]) !== -1) {
      //have a vowel, double it
      input.splice(i, 0, input[i]);
      i++;
    }
  }

  return input;
};


// ==== Tests ====
let inArray = ['w','h','a','t',' ','o','n',' ','e','a','r','t','h',' ','a','r','e',' ','y','o','u',' ','t','a','l','k','i','n','g',' ','a','b','o','u','t','?'];
let expected = ['w','h','a','a','t',' ','o','o','n',' ','e','e','a','a','r','t','h',' ','a','a','r','e','e',' ','y','o','o','u','u',' ','t','a','a','l','k','i','i','n','g',' ','a','a','b','o','o','u','u','t','?'];

console.log(vowelDouble(['a', 'b', 'c', 'd', 'e', 'f']));
vowelDouble(inArray);
console.log(JSON.stringify(inArray) === JSON.stringify(expected));
