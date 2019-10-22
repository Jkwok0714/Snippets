const UTIL = require('./utility/index');

const BLOCK_FOR_SECOND = 4;

let timedTask = setInterval(() => console.log('[child] time'), 500);
console.log('[child] BEGIN');

UTIL.blockThread(BLOCK_FOR_SECOND);

setTimeout(() => {
    clearInterval(timedTask);
    console.log('[child] END');

    process.exit();
}, 2000);
