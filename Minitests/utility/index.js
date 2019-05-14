class Utility {
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

  static uniqByKey (array, key) {
    return array.filter((ele, i, self) =>
      i === self.findIndex(t =>
        t.name === ele.name
      )
    )
  }

  static makeToken (len) {
    if (len === null || typeof len !== 'number' || len < 1 || len > 20) len = 5;
    return Array(len + 1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, len);
  }

  static chooseRandom (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static enforceDecimals (input, decimalPlaces = 2, keepZeroes = false) {
    return keepZeroes ? input.toFixed(decimalPlaces) : toFloat(input.toFixed(decimalPlaces));
  }
}

module.exports = Utility;
