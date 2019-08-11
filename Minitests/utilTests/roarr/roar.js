/**
 * @file Trying out the ROARR logging library
 * Created Aug 6 2018
 */
const log = require('roarr').default;

// console.log('LOG:', log, '--');

// log('foo');
//
// log('bar %s', 'baz');
//
// const debug = log.child({
//   logLevel: 10
// });
//
// debug('qux');
//
// debug({
//   quuz: 'corge'
// }, 'quux');

const maxTicks = 100;
let tick = 0;

log('Initializing logger test');
console.log('Normal consolo loggo');

let timer = setInterval(() => {
  if (tick >= maxTicks) {
    clearInterval(timer);
  } else {
    tick++;
    const randumb = Math.floor(Math.random() * 100);
    log.info(`Creating log ${tick}: ${randumb}`);

    if (randumb > 90) {
      log.error('Fatal crash about to happen');
      const obj = {};
      console.log('heres obj', obj.hello.cool.stuff);
    }
  }
}, 1000);
