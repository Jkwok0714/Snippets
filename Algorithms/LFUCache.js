/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
  this.cache = {};
  this.arrCache = [];
  this.length = 0;
  this.capacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
  if (this.cache[key] === undefined) return -1;
  this.cache[key].accessed++;
  this.cache[key].lastAccess = Date.now();
  return this.cache[key].value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
  if (this.length < this.capacity) {
    this.length++;
  } else {
    this.removeLFU();
  }
  this.cache[key] = {
    key: key,
    value: value,
    accessed: 0,
    lastAccess: Date.now()
  };
  this.arrCache.push(this.cache[key]);
};

LFUCache.prototype.removeLFU = function() {
  //Loop thru keys, find min accessed
  this.arrCache = this.arrCache.sort((a, b) => {
    if (a.accessed < b.accessed) {
      return -1;
    } else if (a.accessed > b.accessed) {
      return 1;
    } else {
      if (a.lastAccess < b.lastAccess) {
        return -1;
      }
      return 1;
    }
  });
  let deleteThis = this.arrCache.shift();

  delete this.cache[deleteThis.key];
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = Object.create(LFUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
//
// var lfu = new LFUCache(2);
// lfu.put(2, 3);
// lfu.put(3, 3);
// lfu.get(3);
// lfu.put(5, 2);
// console.log(lfu.length);
// console.log(lfu.get(3), lfu.get(5), lfu.get(2));
