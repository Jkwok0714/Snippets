/**
 * @file Test avoiding blocking processes by delegating to a child process, if even works on 1 core
 * Created Oct 22 2019
 */

const { fork } = require('child_process');

let timedTask = setInterval(() => console.log('[Parent] Time.'), 500);

const child = fork('blockingChild.js');

child.on('exit', () => {
    console.log('[Parent] Child exited, parent exits too');
    clearInterval(timedTask);
    process.exit();
});
