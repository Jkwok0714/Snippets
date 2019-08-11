/**
 * @file Test conditional promise patterns
 * Created Dec 6 2018
 */

const UTIL = require('../utility');

const NUM_TESTS = 5;
const VALUES = {
  A: 'async1a',
  B: 'async1b'
}

/**
 * The first in the chain, which will decide what's the next function
 */
const async1 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve(VALUES.A);
      } else {
        resolve(VALUES.B);
      }
    }, 100);
  });
};

/**
 * Option A to be second in the chain
 * @param {string} input 
 */
const async2 = (input) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(input + '\nprocessed by async2');
    }, 100);
  });
};

/**
 * Option B to be second in the chain
 * @param {string} input 
 */
const async3 = (input) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(input + '\nprocessed by async3');
    }, 100);
  });
};

/**
 * Main process runner
 */
const main = () => {
  /** Convoluted way to start up a loop  :)  */
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
