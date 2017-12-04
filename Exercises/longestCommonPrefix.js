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
let array;
array = ['socks', 'soccer', 'sorrow'];
console.log(array);
console.log('Longest Prefix:', longestCommonPrefix(array));
array = ['socks', 'soccer', 'socrates'];
console.log(array);
console.log('Longest Prefix:', longestCommonPrefix(array));
array = ['socks', 'soccer', 'ball'];
console.log(array);
console.log('Longest Prefix:', longestCommonPrefix(array));
