// var pino = require('pino')();

const pino = require('pino');
const childProcess = require('child_process');
const stream = require('stream');

// Environment variables
const cwd = process.cwd();
const projectName = 'Pino Demo';
const { env } = process;
const logPath = `${cwd}`;

// Create a stream where the logs will be written
const logThrough = new stream.PassThrough();
const log = pino({name: projectName}, logThrough);

// Log to multiple files using a separate process
// debug and trace also exist
const child = childProcess.spawn(process.execPath, [
  require.resolve('pino-tee'),
  'info', `${logPath}/pino-log.log`,
  'warn', `${logPath}/pino-warn.log`,
  'error', `${logPath}/pino-error.log`,
  'fatal', `${logPath}/pino-fatal.log`
], {cwd, env});

logThrough.pipe(child.stdin);

// Log pretty messages to console (optional, for development purposes only)
const pretty = pino.pretty();
pretty.pipe(process.stdout);
logThrough.pipe(pretty);


//
log.info('hello world');
log.error('this is at error level');
// pino.info('the answer is %d', 42)
// pino.info({ obj: 42 }, 'hello world')
// pino.info({ obj: 42, b: 2 }, 'hello world')
// pino.info({ obj: { aa: 'bbb' } }, 'another')
// setImmediate(function () {
//   pino.info('after setImmediate')
// })
log.error(new Error('an error'))
//
// var child = pino.child({ a: 'property' })
// child.info('hello child!')
//
// var childsChild = child.child({ another: 'property' })
// childsChild.info('hello baby..')

const maxTicks = 20;
let tick = 0;

let timer = setInterval(() => {
  if (tick >= maxTicks) {
    clearInterval(timer);
    exitTest();
  } else {
    tick++;
    const randumb = Math.floor(Math.random() * 100);
    log.info(`Creating log ${tick}: ${randumb}`);
    console.log(`Console log ${tick}... don't log this please`);

    if (randumb > 90) {
      log.error('Fatal crash about to happen');
      const obj = {};
      console.log('heres obj to crash', obj.hello.cool.stuff);
    }
  }
}, 1000);


const exitTest = () => {
  log.info('Closing the pino test. Pine trees!');
  clearInterval(timer);
  process.exit();
};
