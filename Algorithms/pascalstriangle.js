//PASCAL'S TRIANGLE FROM INTERVIEW PREP ATTEMPT 8/31/17

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    var solutionArray = [];
    //var currRow = 1;

    if (numRows === 0) return [];

    var recursiveGenerate = function(currRow) {
        if (currRow === 1) {
            solutionArray.push([1]);
            recursiveGenerate(currRow + 1);
        } else if (currRow > numRows) {
            return;
        } else {
            var resultArray = [];
            resultArray.push(1);
            //row - 2 because minus the edges
            for (var i = 1; i < currRow - 1; i++) {
                var indexOfLastSolution = currRow - 2;
                resultArray.push(solutionArray[indexOfLastSolution][i - 1] + solutionArray[indexOfLastSolution][i]);
            }
            resultArray.push(1);
            solutionArray.push(resultArray);
            recursiveGenerate(currRow + 1);
        }
    };
    recursiveGenerate(1);

    return solutionArray;
};
/* triangle of 5
xxxxx1
xxxx1.1
xxx1.2.1
xx1.3.3.1
x1.4.6.4.1
1.5.10.10.5.1
*/
var logTriangle = (triangle) => {
  for (var i = 0; i < triangle.length; i++) {
    var whiteSpace = new Array(Math.floor(triangle.length-(i))).join(' ');
    console.log(whiteSpace + triangle[i].join(' '));
  }
};

test = generate(2);
logTriangle(test);
var test = generate(3);
logTriangle(test);
test = generate(5);
logTriangle(test);
