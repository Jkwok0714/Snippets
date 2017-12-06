//Merge two sorted linked lists
let sortedMerge = (list1, list2) => {
  let result = new LinkedList();

  //while both arrays are not empty, add depending on value
  while (list1.head !== undefined && list2.head !== undefined) {
    if (list1.head.value < list2.head.value) {
      result.addToTail(list1.removeHead());
    } else {
      result.addToTail(list2.removeHead());
    }
  }

  //Once emptied, if there's still nodes left in any array, add them
  if (list1.head !== undefined) {
    while (list1.head !== undefined) {
      result.addToTail(list1.removeHead());
    }
  }
  if (list2.head !== undefined) {
    while (list2.head !== undefined) {
      result.addToTail(list2.removeHead());
    }
  }

  return result;
};


//Linked List Helper
//Instantiators
let LinkedList = function() {
  this.head, this.tail = undefined;
}

let LinkedListNode = function() {
  this.value, this.nextNode = undefined;
}

//Prototype pseudoneoclassical Instantiation functions
LinkedList.prototype.addToTail = function(value) {
  let newNode = new LinkedListNode();
  newNode.value = value;
  if (this.tail === undefined) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.nextNode = newNode;
    this.tail = newNode;
  }
};

LinkedList.prototype.removeHead = function() {
  let result = this.head.value;
  let trash = this.head;
  this.head = this.head.nextNode;
  delete trash;
  return result;
};

LinkedList.prototype.print = function() {
  let result = [];
  let currEle = this.head;

  while (currEle != undefined) {
    result.push(currEle.value);
    currEle = currEle.nextNode;
  }
  return result;
}

// ==== TEST ====
let testList1 = new LinkedList();
let testList2 = new LinkedList();

testList1.addToTail(3);
testList1.addToTail(5);
testList1.addToTail(6);
testList1.addToTail(9);
testList2.addToTail(2);
testList2.addToTail(4);
testList2.addToTail(7);
testList2.addToTail(11);
testList2.addToTail(13);
testList2.addToTail(18);
console.log('Merging', testList1.print(), 'and', testList2.print());
let sortedList = sortedMerge(testList1, testList2);
console.log(sortedList.print());
