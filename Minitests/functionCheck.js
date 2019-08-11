/**
 * @file Simple function checker for validation of callbacks
 * Created Dec 10 2018
 */

const func1  = {};
const func2 = () => console.log('Hello there.');

/**
 * Check if param passed in is an executable function.
 * @param {*} func 
 */
const checkCallback = (func) => {
  const isFunction = func instanceof Function;
  console.log('func is a function?', isFunction);
  if (isFunction) {
    func();
  } else {
    console.log('Invalid callback passed');
  }
};

checkCallback(func1);
checkCallback(func2);
