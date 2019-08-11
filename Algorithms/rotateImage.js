/**
 * @file Timed interview practice with rotate image problem
 * Created Oct 17 2017
 */

/*
Note: Solve this task in-place (with O(1) additional space).

You are given an n x n 2D matrix that represents an image. Rotate the image by 90 degrees (clockwise).

*Example*

For:
a = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]

the output should be:
rotateImage(a) =
    [[7, 4, 1],
     [8, 5, 2],
     [9, 6, 3]]




each rotate:

index  + (n-1)
[0][0] ==> [0][2]

[0][2] ==> [2][2]

[2][2] ==> [2][0]

[2][0] ==> [0][0]

new Pos : currX, currY

recursion? rotate inside then outside

1  2  3  4
5  6  7  8
9  10 11 12
13 14 15 16

13 9  5  1
14 10 6  2
15 11 7  3
16 12 8  4

move first row to last col, i goes left to right
move last col to last row, i goes up to down
move last row to first col, i goes right to left
move first col to first row, i goes down to up

*/

let rotateImage = (a) => {
  let n = a[0].length;
  let b = n - 1;
  // let midway = Math.floor(n / 2);

  let rotateLevel = (n) => {
    if (n <= 1) return;
    for (var i = 0; i < b; i++) {
      [a[i][b], a[b][b - i], a[b - i][0], a[0][i]] =
      [a[0][i], a[i][b],     a[b][b - i], a[b - i][0]];
    }
    // rotateLevel(n - 1);
  }
  rotateLevel(n);

};

// let fourwayswap = (a) => {
//   [a[0], a[1], a[2], a[3]] = [a[1], a[2], a[3], a[0]];
// }
//
// let b = ['a', 'b', 'c', 'd'];
// console.log(b);
// fourwayswap(b);
// console.log(b);



let a = [[1, 2, 3],
         [4, 5, 6],
         [7, 8, 9]];
console.log(a);
rotateImage(a);
console.log(a);
