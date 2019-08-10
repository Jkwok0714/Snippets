/**
 * @file Testing the call stack lengths of different possibly asynchronous looping methods
 * Created Feb 1 2019
 */

Error.stackTraceLimit = Infinity;

/** Store references to the methods in here */
const methods = {};

/** The method names */
const methodNames = {
    callback: 'callbackRecursiveLoop',
    promise: 'promiseRecursiveLoop',
    nextTick: 'nextTickRecursiveLoop'
};

/**
 * @callback operationCallback
 * @param {*} data The data in the array processed this iteration
 * @param {Function} done Call this done function when the processing is complete.
 */

/**
 * Async loop using callback pattern
 * @param {*[]} arr
 * @param {number} count Index to begin iteration
 * @param {operationCallback} fnc The function to run on the data
 * @param {Function} done Callback to run when everything is completed.
 */
methods[methodNames.callback] = (arr, count, fnc, done) => {
    if (count < arr.length) {
        fnc(arr[count], () => {
            methods[methodNames.callback](arr, count + 1, fnc, done);
        }, count);
    } else {
        if (done) done();
    }
};

/**
 * Async loop using nextTick
 * @param {*[]} arr
 * @param {number} count Index to begin iteration
 * @param {operationCallback} fnc The function to run on the data
 * @param {Function} done Callback to run when everything is completed.
 */
methods[methodNames.nextTick] = (arr, count, fnc, done) => {
    const callDone = () => {
        if (done) process.nextTick(done);
    };

    if (count < arr.length) {
        fnc(arr[count], () => {
            methods[methodNames.nextTick](arr, count + 1, fnc, callDone);
        }, count);
    } else {
        if (callDone) callDone();
    }
};

/**
 * Async loop using promises
 * @param {*[]} arr
 * @param {number} count Index to begin iteration
 * @param {operationCallback} fnc The function to run on the data
 * @param {Function} done Callback to run when everything is completed.
 */
methods[methodNames.promise] = (arr, count, fnc, done) => {
    let p = [];
    for (let i = count; i < arr.length; i++) {
        p.push(new Promise(res => {
            fnc(arr[i], res, i);
        }));
    }
    if (p.length) {
        Promise.all(p).then(() => {
            if (done) done();
        });
    } else {
        if (done) done();
    }
};

/**
 * Main test runner
 */
const main = () => {
    let testArray = [1, 2, 3, 4, 5];

    runTest(testArray, methodNames.callback).then(() => {
        return runTest(testArray, methodNames.promise);
    }).then(() => {
        return runTest(testArray, methodNames.nextTick);
    });
};

/**
 * Run one individual test in async pattern.
 * @param {*[]} arr 
 * @param {string} funcName 
 */
const runTest = (arr, funcName) => {
    return new Promise((res, rej) => {
        console.log(`>> Running test for ${funcName}`);
        if (!methods[funcName]) return res();
    
        let result = [];
        methods[funcName](arr, 0, (data, done) => {
            result.push(data * 2);
            done();
        }, () => {
            console.log('Processed array', result);
            printStackLength();
            res();
        });
    });
}

/**
 * See how lonng the call stack is after a run
 */
const printStackLength = () => {
    let err = new Error().stack.split('at ');
    // console.trace('!!! Done recursing !!!');
    console.log(`Final stack length: ${err.length - 1}`);
};

main();