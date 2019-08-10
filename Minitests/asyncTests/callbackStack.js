/**
 * @file For testing the length of call stacks when using a callback loop
 */

Error.stackTraceLimit = Infinity;
const RECURSE_AMOUNT = 5;

/**
 * Simulate getting a user object
 * @param {Function} callback 
 */
const getUserObject = (callback) => {
	getUserInfo(() => {
  	callback();
  });
}

/**
 * Simulate getting a user info block
 * @param {Function} callback 
 */
const getUserState = (callback) => {
	callback();
}

/**
 * Simulate getting user profile in a user object
 * @param {Function} callback 
 */
const getUserInfo = (callback) => {
	getUserState(() => {
		callback();
	});
}

/**
 * Get the length of the call stack
 */
const getCallStack = () => {
	let err = new Error().stack.split('at ');
  console.trace('!!! Done recursing !!!');
  console.log(`Final stack length: ${err.length - 1}`);
}

/**
 * Recursively loop to buffer up callstack, running the test
 * @param {number} n 
 */
const recurseLoop = (n) => {
	if (n === 0) {
  	getCallStack();
  	return;
  } else {
  	getUserObject(() => {
    	console.log('recurse', n);
    	recurseLoop(n - 1);
    });
  }
}

/**
 * Main process runner
 *   Improvement would be to read process args for terminal input on loop count
 * @param {number} n How many times to recurse
 */
const main = (n) => {
	console.log(`Running test with ${n} loops`);
  recurseLoop(n);
}

main(RECURSE_AMOUNT);
