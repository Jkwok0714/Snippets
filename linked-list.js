//herro

//Test implementation of linked list from scratch

//Instantiators
let LinkedList = function() {
  this.head, this.tail = undefined;
}

let LinkedListNode = function() {
  this.value = undefined;
  this.nextNode = undefined;
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

LinkedList.prototype.contains = function(searchTerm) {
  let currEle = this.head;
  let found = false;
  while (currEle !== undefined) {
    if (currEle.value === searchTerm) {
      found = true;
      currEle = currEle.nextNode;
    }
  }
  return found;
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

//Test stuff
let itinerary = new LinkedList();
itinerary.addToTail('Item 1');
itinerary.addToTail('Item 2');
itinerary.addToTail('Item 3');
itinerary.addToTail('Item 4');
console.log('Linked list has', itinerary.print());
console.log('Removing head gets', itinerary.removeHead());
