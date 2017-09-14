/*
You are given a binary tree whose nodes all have integer values (both positive and negative).

Determine which level of the tree is the "largest", i.e., you sum all the node values at that level, and determine which level has the largest sum.

In the case of a tie, return the level closest to the root.
*/


//Breadth first traversal
//Add root node to a queue array
//Run while loop and pass in depth
//Shift the node out of the array
//Add its sum to sums[depth]
//If it has children, push it to the array
//Find largest number in the sums array and return it


const findLargestLevel = function(node) {
  var queueArray = [{node: node, depth: 0}];
  var sumsArray = [];

  while (queueArray.length > 0) {
    var tempNode = queueArray.shift();

    sumsArray[tempNode.depth] = sumsArray[tempNode.depth] + tempNode.node.value || tempNode.node.value;

    if (tempNode.node.left !== undefined)
      queueArray.push({node: tempNode.node.left, depth: tempNode.depth + 1});
    if (tempNode.node.right !== undefined)
      queueArray.push({node: tempNode.node.right, depth: tempNode.depth + 1});

  }
  return findIndexOfLargestInArray(sumsArray);
};

let findIndexOfLargestInArray = (array) => {
  var largest = array[0];
  var largestIndex = 0;

  for (var [index, value] of array.entries()) {
    if (value > largest) {
      largest = value;
      largestIndex = index;
    }
  }
  return largestIndex;
};

var test = () => {

  //Binary tree with no methods.. manual insert test
  var Tree = function(value) {
    this.value = value;
    this.left = undefined;
    this.right = undefined;
  };

  var root = new Tree(5);
  root.left = new Tree(10);
  root.right = new Tree(10);
  root.left.right = new Tree(22);
  root.left.right.right = new Tree(17);
  console.log('tree 1 largest sum', findLargestLevel(root)); //expect 2

  root = new Tree(33);
  root.left = new Tree(2);
  root.right = new Tree(6);
  root.left.right = new Tree(1);
  root.left.right.right = new Tree(32);
  console.log('tree 2 largest sum', findLargestLevel(root)); //expect 0
}
test();
