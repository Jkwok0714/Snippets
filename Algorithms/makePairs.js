



// pair index = index + (length/2)


/*
0 1 2 3 4
9 8 7 6 5 Index: length - (index+1)

+ + + + +
9 7 5 3 1

0 9 1 2 3
8 7 6 5 4

0 8 9 1 2
7 6 5 4 3

remove first element, rotate the rest n-1 times
var temp = array.pop();
  array.unshift(temp);
*/

//  pair = (index + (arrLen/2 + rotation)) % (arrLen);

var generatePairings = function(array) {
  // var arrShuffled = array.slice(0).sort(function(a, sb){return 0.5 - Math.random()});
  var arrShuffled = array.slice(0);

  if (arrShuffled.length % 2 === 1) arrShuffled.push('BYE');
  var arrLen = arrShuffled.length;

  var result = [];
  for (var i = 0; i < arrLen - 1; i++) {
    var cycle = [];
    for (var j = 0; j < arrLen/2; j++) {
      cycle.push([arrShuffled[j], arrShuffled[arrLen - (j + 1)]]);
    }
    rotateSpecialized(arrShuffled);
    result.push(cycle);
  }
  return result;
};


var rotate = function(array) {
	var temp = array.pop();
  array.unshift(temp);
  // console.log(array);
}

var rotateSpecialized = function(array) {
	var temp = array.pop();
  // array.unshift(temp);
  array.splice(1, 0, temp);
  // console.log(array);
}


var main = () => {
  var peoples = makeStudents(5);
  logByRounds(generatePairings(peoples));


};

var logByRounds = function (array) {
  for (var [index, round] of array.entries()) {
    console.log('round#' + index, ':',JSON.stringify(round));
  }
}

var makeStudents = function(numStudents) {
  var students = [];
  var temp;
  for (var i = 0; i < 5; i++) {
    temp = ((Math.random() * 100) < 50) ? makeGenericFirstName('M') : makeGenericFirstName('F');
    students.push(temp + ' ' + capitalize(getElement(syllables)));
  }
  return students;
}

//Name generator stuff

var englishNamesM = ['John', 'Jack', 'Rich', 'Rick', 'Frank', 'Dave', 'Rob', 'Bill', 'Tom', 'Mark', 'James', 'Michael', 'Ben', 'Raymond',
  'Dennis', 'Tyler', 'Henry', 'Joseph', 'Thomas', 'Donald', 'Anthony', 'Paul', 'Edward', 'Ronald', 'Harry'];
var englishNamesF = ['Mary', 'Karen', 'Nancy', 'Betty', 'Helen', 'Sharon', 'Amy', 'Lulu', 'Ruth', 'Nicole', 'Janet', 'Samantha', 'Joyce',
  'Jennifer', 'Victoria', 'Lauren', 'Alice', 'Rebecca', 'Laura', 'Christina', 'Evelyn', 'Grace', 'Hannah', 'Olivia'];

var syllables = ['long', 'dong', 'wang', 'fei', 'lei', 'wei', 'bao', 'ting', 'ling', 'fang', 'xiao', 'da',
  'fa', 'qiu', 'qiao', 'feng', 'yong', 'yang', 'mei', 'guo', 'jing', 'jiao', 'xie', 'mo', 'zhang', 'zheng',
  'luo', 'lei', 'ru', 'rong', 'ze', 'qiang', 'qian', 'ding', 'yin', 'du', 'shi', 'hao', 'guo'];
var capitalize = function(string) {
  return string && string[0].toUpperCase() + string.slice(1);
};

var getElement = function(array) {
  var length = array.length;
  return array[Math.floor(Math.random() * length)];
};
var getRandomChance = function() {
  return Math.floor(Math.random() * 100);
};

var makeGenericFirstName = function(gender) {
  if (gender === 'M') {
    return getElement(englishNamesM);
  } else if (gender === 'F') {
    return getElement(englishNamesF);
  } else {
    if (getRandomChance() < 50) {
      return getElement(englishNamesM);
    } else {
      return getElement(englishNamesF);
    }
  }
}

main();
