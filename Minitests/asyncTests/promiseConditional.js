const UTIL = require('../utility');

const NUM_TESTS = 5;
const VALUES = {
  A: 'async1a',
  B: 'async1b'
}

const async1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve(VALUES.A);
      } else {
        resolve(VALUES.B);
      }
    }, 100);
  });
};

const async2 = (input) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(input + '\nprocessed by async2');
    }, 100);
  });
};

const async3 = (input) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(input + '\nprocessed by async3');
    }, 100);
  });
};

const main = () => {
  let looper = new Array(NUM_TESTS).fill('a');

  UTIL.promiseLoop(looper, (item, done) => {
    async1().then(res => {
      console.log('chosen', res);
      return res === VALUES.A ? async2(res) : async3(res);
    }).then(res => {
      console.log('Ran async thing; Message:', res);
      done();
    });
  }).then(res => {
    console.log('Test complete');
  }).catch(err => {
    console.log('err', err);
  });
};

main();
