//I am no tree

let Tree = function(value) {
  this.value = value;
  this.children = [];
};

Tree.prototype.addChild = function(value) {
  let newTree = new Tree(value);
  this.children.push(newTree);
};
