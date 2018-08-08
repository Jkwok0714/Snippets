console.log('\x1b[36m*** Start of file ***\x1b[0m');

process.on('uncaughtException', (e) => {
  console.error('\x1b[31m>>> Uncaught exception!! CRASH\x1b[0m', e);
  process.exit(1);
});

const doThingThatWillError = (notParseable) => {
  return new Promise ((resolve, reject) => {
    let result = JSON.parse(notParseable);
    resolve(result);
  });
}

const unsafelyDoThingThatWillError = (notParseable) => {
  let result = JSON.parse(notParseable);
  return resolve;
}

doThingThatWillError('}').then(res => {
  console.log('No error caught', res);
}).catch(err => {
  console.error('\x1b[36mError caught safely in promise\x1b[0m', err);
});

setTimeout(() => {
  console.log('\x1b[32m## Got past unsafe test 1. Trying same thing without promises\x1b[0m');
  unsafelyDoThingThatWillError('}');
  console.log('\x1b[32m## Got past unsafe test 2\x1b[0m');
}, 1000);
