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
}

module.exports = Utility;
