/**
 * @file A little implementation of Number of Islands counter that counts islands which are in "water" that contains islands
 * Created Apr 24 2018
 */

let findNumOfIslands = (map) => {
  if (!map || map.length === 0) return;

  let width = map.length;
  let height = map[0].length;

  let result = 0;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (map[i][j] !== 1) {
        /* If we are on a water tile, just keep searching */
        continue;
      }

      result++;
      /* Sink the island that we found so we don't count it again */
      depthSearch(map, i, j);
    }
  }

  return result;
};

let depthSearch = (map, x, y) => {
  /* Cancel if beyond the bounds. */
  if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) return;

  if (map[x][y] === 1) {
    map[x][y] = 0;
    depthSearch(map, x - 1, y);
    depthSearch(map, x + 1, y);
    depthSearch(map, x, y + 1);
    depthSearch(map, x, y - 1);
  }
};

let runTest = (map) => {
  console.log('MAP TO SEARCH IS...\n');
  for (let i = 0; i < map.length; i++) {
    console.log(map[i]);
  }

  console.log(`There are ${findNumOfIslands(map)} islands in this map.`);
};

/*
 * Create the map; 1 = land, 0 = water 
 */
let map1 = [
  [0, 0, 0, 1],
  [0, 1, 0, 1],
  [0, 0, 0, 0],
  [1, 0, 0, 1]
];
runTest(map1);

map1 = [
  [0, 1, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0 ,0]
];
runTest(map1);
