/**
 * @file Some utility functions needlessly made into a class
 * Created Aug 17 2018
 */

class Utility {
  /** Async looping */
  static promiseLoop (array, task) {
    let pLoop = array.map(item => {
      return new Promise((res, rej) => {
        task(item, (data) => {
          res(data);
        });
      });
    });
    return Promise.all(pLoop);
  }

  /** Filter array of objects unique by key */
  static uniqByKey (array, key) {
    return array.filter((ele, i, self) =>
      i === self.findIndex(t =>
        t[key] === ele[key]
      )
    )
  }

  /** Create a randomized token */
  static makeToken (len) {
    if (len === null || typeof len !== 'number' || len < 1 || len > 20) len = 5;
    return Array(len + 1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, len);
  }

  /** Choose a random element from an array */
  static chooseRandom (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** Get a random number between a and b */
  static getRngBetween (a, b) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

module.exports = Utility;
