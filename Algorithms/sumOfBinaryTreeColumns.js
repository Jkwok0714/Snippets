var sumColumns = function(tree){

  var columnSums = {};
  var column = 0;
  var searchTree = function(aTree, column){
    columnSums[column] ? columnSums[column] += aTree.value : columnSums[column] = aTree.value;
    if(aTree.left){
      searchTree(aTree.left, column - 1);
    }
    if(aTree.right){
      searchTree(aTree.right, column + 1);
    }

  }
  searchTree(tree, column);

  return columnSums;
}

var thisTree = function(value){
  this.value = value;
  this.right = null;
  this.left = null;
}

var root1 = new thisTree(8);
var left = new thisTree(5);
root1.left = left;
var leftLeft = new thisTree(9);
left.left = leftLeft;
var leftRight = new thisTree(7);
left.right = leftRight;
var leftRightLeft = new thisTree(1);
leftRight.left = leftRightLeft;
var leftRightRight = new thisTree(12);
leftRight.right = leftRightRight;
var leftRightRightLeft = new thisTree(2);
leftRightRight.left = leftRightRightLeft;

var right = new thisTree(4);
root1.right = right;
var rightRight = new thisTree(11);
right.right = rightRight;
root1.right.right.left = new thisTree(3);

var sumOfColumns = sumColumns(root1);
