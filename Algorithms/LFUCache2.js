/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {

};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {

};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {

};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = Object.create(LFUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
//
var lfu = new LFUCache(2);
lfu.put(2, 3);
lfu.put(3, 3);
lfu.get(3);
lfu.put(5, 2);
console.log(lfu.length);
console.log(lfu.get(3), lfu.get(5), lfu.get(2));
