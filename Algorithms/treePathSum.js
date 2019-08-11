/**
 * @file Interview practice with tree path sum problem
 * Created Sep 28 2017
 */

var Tree = function(value) {
  this.value = value;
  this.children = [];
};

const hasPathToSum = function(node, targetSum) {
  // your code here
  var currSum = node.value;

  var recurse = function(innerNode, innerSum) {
    for (var child of innerNode.children) {
      if (innerSum + child.value === targetSum) {
        return true;
      } else {
        //keep searching
        if (recurse(child, innerSum + child.value)) {
          return true;
        }
      }
    }
  };

  return recurse(node, currSum) === undefined ? false : true;

};

/*
    10
  5    6
2 3     10
*/

var root = new Tree(10);

root.children[0] = new Tree(5);
root.children[1] = new Tree(6);

console.log('has 15', hasPathToSum(root, 15)); //expect true
console.log('has 17', hasPathToSum(root, 17)); //expect false

root.children[0].children[0] = new Tree(2);
root.children[0].children[1] = new Tree(3);
root.children[1].children[0] = new Tree(10);

console.log('has 26', hasPathToSum(root, 26)); //expect true
console.log('has 42', hasPathToSum(root, 42)); //expect false
console.log('has 17', hasPathToSum(root, 17)); //expect true
