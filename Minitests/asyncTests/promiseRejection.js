/**
 * @file Testing promise rejections?? If only this were documented when it was made
 * Created Aug 8 2018
 */

console.log('\x1b[36m*** Start of file ***\x1b[0m');

process.on('uncaughtException', (e) => {
  console.error('\x1b[31m>>> Uncaught exception!! CRASH\x1b[0m', e);
  process.exit(1);
});

const innerCallbackthing = (obj, callback) => {
  setTimeout(() => {
    callback(null, JSON.parse(obj));
  }, 50);
};

const doThingThatWillError = (notParseable) => {
  return new Promise (resolve => {
    // let result = JSON.parse(notParseable);
    innerCallbackthing(notParseable, (err, res) => {
      resolve(res);
    })
  });
}

const unsafelyDoThingThatWillError = (notParseable) => {
  // let result = JSON.parse(notParseable);
  innerCallbackthing(notParseable, (err, res) => {

  });
  return resolve;
}

const asyncAwaitIt = async () => {
  try {
    await doThingThatWillError();
  } catch (e) {
    console.error('\x1b[36mError caught safely in await-try-catch\x1b[0m', err);
  }
};

asyncAwaitIt();

setTimeout(() => {
  console.log('\x1b[32m## Got past unsafe test 1. Trying same thing without promises\x1b[0m');
  doThingThatWillError('}').then(res => {
    console.log('No error caught', res);
  }).catch(err => {
    console.error('\x1b[36mError caught safely in promise\x1b[0m', err);
  });
  // console.log('\x1b[32m## Got past unsafe test 2\x1b[0m');
}, 500);



setTimeout(() => {
  console.log('\x1b[32m## Got past unsafe test 2. Trying same thing without promises\x1b[0m');
  unsafelyDoThingThatWillError('}');
  console.log('\x1b[32m## Got past unsafe test 3\x1b[0m');
}, 1000);
