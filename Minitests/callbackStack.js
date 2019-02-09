/**
 * For testing the length of call stacks when using a callback loop
 */

Error.stackTraceLimit = Infinity;
const RECURSE_AMOUNT = 5;


const getUserObject = (callback) => {
	getUserInfo(() => {
  	callback();
  });
}

const getUserState = (callback) => {
	callback();
}

const getUserInfo = (callback) => {
	getUserState(() => {
		callback();
	});
}

const getCallStack = () => {
	let err = new Error().stack.split('at ');
  console.trace('!!! Done recursing !!!');
  console.log(`Final stack length: ${err.length - 1}`);
}

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

const main = (n) => {
	console.log(`Running test with ${n} loops`);
  recurseLoop(n);
}

main(RECURSE_AMOUNT);
