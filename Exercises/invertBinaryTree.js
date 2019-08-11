/**
 * @file Invert a binary tree with a funfact about the problem
 * At the time of adding this comment I probably can't do this anymore ;) Let's solve practical problems!
 * Created Dev 23 2017
 */

// This problem was inspired by this original tweet by Max Howell:
// Google: 90% of our engineers use the software you wrote (Homebrew)
//  but you can’t invert a binary tree on a whiteboard so fuck off.

let invertTree = (node) => {
  if (!node) return;

  node.left = invertTree(node.left);
  node.right = invertTree(node.right);

  [node.left, node.right] = [node.right, node.left];

  return node;
};

// ==== SAMPLE TREE ====

let BinaryTreeNode = function (value) {
  this.value = value;
  this.left = undefined;
  this.right = undefined;
};

BinaryTreeNode.prototype.print = function (depth = 0) {
  console.log('D' + depth, this.value);

  if (this.left) this.left.print(depth + 1);
  if (this.right) this.right.print(depth + 1);
};

//==== TEST ====
let testFunction = (tree) => {
  console.log('Testing new tree');
  tree.print();
  console.log('Inverting');
  invertTree(tree);
  tree.print();
};

let noobTree = new BinaryTreeNode(4);
noobTree.left = new BinaryTreeNode(5);
noobTree.right = new BinaryTreeNode(6);

testFunction(noobTree);
// noobTree.print();

let testTree = new BinaryTreeNode(5);

testTree.left = new BinaryTreeNode(6);
testTree.right = new BinaryTreeNode(4);
testTree.left.left = new BinaryTreeNode(10);
testTree.left.right = new BinaryTreeNode(12);

testFunction(testTree);
// testTree.print();
