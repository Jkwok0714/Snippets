const Utility = {
  promiseLoop: (array, task) => {
    let pLoop = array.map(item => {
      return new Promise((res, rej) => {
        task(item, (data) => {
          res(data);
        });
      });
    });
    return Promise.all(pLoop);
  }
}

module.exports = Utility;
