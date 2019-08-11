/**
 * @file LRU Cache implementation. Wtf is this syntax
 * Created Dec 20 2018
 */

let LRUCache = function (max) {
  this.storage = {};
  this.orderedKeys = [];
  this.max = max;
  this.length = 0;
};

//Moves the item to the top of the stack of keys
LRUCache.prototype.markUsed = function (key) {
  //This is O(n) time, maybe the key object can store its current index instead
  //  of using indexOf to get the position?
  let index = this.orderedKeys.indexOf(key);
  //Maybe splice but it doesn't seem reliable
  this.orderedKeys[index] = undefined;
  this.orderedKeys.push(key);
  console.log(key, 'was accessed');
};
//Retrieve the key's value if it exists
LRUCache.prototype.get = function (key) {
  if (this.storage[key] !== undefined) {
    this.markUsed(key);
    return this.storage[key];
  } else {
    console.log(key, 'does not exist');
    return undefined;
  }
};


LRUCache.prototype.set = function (key, val) {
  console.log('Adding/updating', key, val);
  //If over capacity, remove LRU item
  if (this.length >= this.max) {
    let keyToDelete = this.orderedKeys.shift();
    while (!keyToDelete) keyToDelete = this.orderedKeys.shift();
    console.log(keyToDelete, 'is gonna be deleted');
    delete this.storage[keyToDelete];
    this.length--;
  }
  if (this.storage[key] !== undefined) {
    this.storage[key] = val;
    this.markUsed[key];
    return;
  }
  // console.log(this.storage);

  this.storage[key] = val;
  //If item exists, update it
  this.orderedKeys.push(key);
  this.length++;
  // console.log('new Length of storage', this.length);
};

//==== TEST ====
console.log('Creating new cache with capacity of 3');
let testCache = new LRUCache(3);
testCache.set('Ashera', 'Relindi');
testCache.set('Serenna', 'Azurell');
testCache.set('Linvi', 'Askelore');
testCache.get('Ashera');
testCache.set('Sola', 'Calcifron');
testCache.set('Neria', 'Cyonire');

testCache.get('Ashera');
testCache.get('Serenna');

// console.log('Attempt to get Ashera');
// console.log(testCache.get('Ashera'));
// console.log('Attempt to get Serenna');
// console.log(testCache.get('Serenna'));
console.log(testCache.storage, testCache.length);
