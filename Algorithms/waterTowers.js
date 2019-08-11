/**
 * @file Water Towers interview practice problem: Find how many water blocks there can be in a tower configuration
 * What is this Minecraft??
 * Created Nov 22 2017
 */

let findWater = (towers) => {
  let tallestToLeft = [towers[0]];
  let tallestToRight = [];
  tallestToRight[towers.length - 1] = towers[towers.length - 1];

  // console.log(tallestToRight);
  let result = 0;
  //Find the highest tower to left
  for (var i = 1; i < towers.length; i++) {
    tallestToLeft[i] = Math.max(tallestToLeft[i - 1], towers[i]);
  }
  //Find the highest towers to right
  for (var i = towers.length - 2; i >= 0; i--) {
    tallestToRight[i] = Math.max(tallestToRight[i + 1], towers[i]);
  }

  // console.log(tallestToLeft, tallestToRight);

  //Water only goes up to the shortest tower
  for (var i = 0; i < towers.length; i++) {
    result += Math.min(tallestToLeft[i], tallestToRight[i]) - towers[i];
  }
  return result;
};

// ==== TEST ====

let testFunction = (towers) => {
  console.log('Water in', towers, ' : ', findWater(towers));
};

testFunction([2, 0, 2]);
testFunction([0, 5, 2]);
testFunction([3, 2, 5, 4, 2, 3]);
