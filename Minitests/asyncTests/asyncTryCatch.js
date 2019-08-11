/**
 * @file Proof of concept how async functions without async/await cannot be caught with try/catch
 * Created Aug 27 2018
 */

 /**
  * A standard little async function
  * @param {Function} callback 
  */
const someAsyncThing = (callback) => {
  try {
    throw new Error('D-mail');
  } catch (e) {
    console.log('An error in the async', e);
  }
  setTimeout(() => {
    throw new Error('BOOM');
    callback('Okarin');
  }, 3000);
}

try {
  someAsyncThing((msg) => {
    console.log('Async pulled an', msg);
  });
} catch (e) {
  console.log('Caught an error:', e);
} finally {
  console.log('Finally final');
}

setTimeout(() => {
  console.log('Oh hey I am still alive');
}, 5000);
