/**
 * @file Some utility functions needlessly made into a class
 * Created Aug 17 2018
 */

class Utility {
  /**
   * @callback taskLoopCallback
   * @param {any} item The item in the array
   * @param {Function} done Callback to call when done with async operation 
   */
  /**
   * Async looping
   * @param {Array<any>} array
   * @param {taskLoopCallback} task
   * @returns {Promise<null>}
   */
  static promiseLoop (array, task) {
    let pLoop = array.map(item => {
      return new Promise(res => {
        task(item, (data) => {
          res(data);
        });
      });
    });
    return Promise.all(pLoop);
  }

  /**
   * @callback arrayMakerCallback
   * @param {number} [i=]
   */
  /**
   * 
   * @param {number} n 
   * @param {arrayMakerCallback} task 
   */
  static makeArrayOfNLength (n, task) {
    if (typeof n !== 'number' || n < 0) return [];
    return new Array(n).fill('').map((v, i) => task(i));
  }

  /**
   * Filter array of objects unique by key
   * @param {Array<Object>} array The input array
   * @param {string} key The key to filter by
   */
  static uniqByKey (array, key) {
    return array.filter((ele, i, self) =>
      i === self.findIndex(t =>
        t[key] === ele[key]
      )
    )
  }

  /**
   * Create a randomized token
   * @param {number} [len=5] Length of token to make
   * @returns {string}
   */
  static makeToken (len = 5) {
    if (len === null || typeof len !== 'number' || len < 1 || len > 20) len = 5;
    return Array(len + 1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, len);
  }

  /**
   * Choose a random element from an array
   * @param {Array} arr
   */
  static chooseRandom (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Get a random number between a and b
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  static getRngBetween (a, b) {
    if (a === null || b === null || typeof a !==  'number' || typeof b !== 'number') return Math.floor(Math.random() * 100);
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * A sync timeout that is blocking
   * @param {number} duration In seconds
   */
  static blockThread (duration) {
    const getSeconds = () => new Date().getTime() / 1000;

    const start = getSeconds();
    let done = false;
    let current;

    while (1 && !done) {
      current = Math.round(getSeconds() - start);

      if (current >= duration) done = true;
    }
  }
}

module.exports = Utility;
