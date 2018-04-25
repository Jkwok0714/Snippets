//Between n words find longest common prefix

let longestCommonPrefix = (array) => {
  let count = 0;
  let prefix = '';
  let endLoop = false;

  while (!endLoop) {
    for (var i = 1; i < array.length; i++) {
      if (array[i][count] !== array[i - 1][count]) {
        //We found a break. Terminate
        endLoop = true;
      }
      if (array[i][count] === undefined) {
        endLoop = true;
      }
    }
    if (!endLoop) prefix += array[0][count];
    count ++;
  }
  return prefix;
};

//==== TEST ====

let testFunction = (array) => {
  console.log('Array to be tested:', array);
  console.log('Longest prefix:', longestCommonPrefix(array));
};

testFunction(['socks', 'soccer', 'sorrow']);
testFunction(['socks', 'soccer', 'socrates']);
testFunction(['socks', 'soccer', 'ball']);
