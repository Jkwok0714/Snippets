/**
 * A test to make a simple reusable wrapper for a class whose functions use callbacks, for legacy support.
 * @file Trying to test a wrapper around a set of callback-based functions.
 */

const { promisify } = require('util');

/**
 * How long to wait for the mock  async function to return
 */
const ASYNC_WAIT = 1000;

/**
 * Callback enabled functions we want to wrap around
 */
const FUNCNAMES = {
    twoParamFunction: 'twoParamFunction',
    oneParamFunction: 'oneParamFunction'
};

/**
 * Definition for a standard callback function in Node format
 * @callback standardCallback
 * @param {ErrorEvent} err An error object if applicable
 * @param {*} result Whatever being returned
 */

/**
 * A mock async class, stand-in for something such  as database or Redis handler.
 */
class MockAsyncClient {
    /**
     * A function with two args.
     * @param {string} arg1 
     * @param {string} arg2 
     * @param {standardCallback} callback 
     */
    static twoParamFunction (arg1, arg2, callback) {
        dummyThiccAsync(arg1, arg2, callback);
    }
    
    /**
     * A function with one arg.
     * @param {string} arg1 
     * @param {standardCallback} callback 
     */
    static oneParamFunction (arg1, callback) {
        dummyThiccAsync(arg1, callback);
    }

}

/**
 * The wrapper method that turns a callback function into a promise/async function.
 * not perfectly ideal as it won't enforce each wrapped function's params, do checks, etc
 * Should work with instances
 * @param {string} funcName 
 * @param  {...any} args 
 */
const wrapperRunner = (funcName, ...args) => {
    return new Promise((resolve, reject) => {
        if (!funcName || !(MockAsyncClient[funcName] instanceof Function)) {
            reject(`Invalid funcName provide: ${funcName}`);
        }
        MockAsyncClient[funcName](...args, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

/**
 * Promisify class functions and return object with said functions.
 * This will not work with instance methods though, and will not be optimal for a database handler where
 *   the Database object handles its own connection e.g. this.redisClient instantiated in constructor() or init()
 * Will require further testing there.
 */
const ConvertedAPI = Object.getOwnPropertyNames(MockAsyncClient).filter(k => MockAsyncClient[k] instanceof Function).map(key => {
    return { key, fn: promisify(MockAsyncClient[key]) }
}).reduce((acc, curr) => Object.assign(acc, { [curr.key]: curr.fn }), {});

/**
 * Print a string, the "result" function
 * @param {string} input 
 */
const printResult = (input) => {
    console.log(`\x1b[35m[printResult]: ${input}\x1b[0m`);
};

/**
 * Just a dummy async function. SetTimeout as always.
 * Stringifies stuff, not  really the point of this test.
 * @param  {...string} args Last param is callback function
 */
const dummyThiccAsync = (...args) => {
    const callback = args.pop();
    setTimeout(() => {
        callback(null, args.join(' '));
    }, ASYNC_WAIT);
};

/**
 * Main process to run
 */
const main = async () => {
    console.log('\x1b[33m[main] Begin\x1b[0m');
    let result = await wrapperRunner(FUNCNAMES.oneParamFunction, 'Hello there.');
    printResult(result);
    result = await wrapperRunner(FUNCNAMES.twoParamFunction, 'General Kenobi!', 'You are a bold one!');
    printResult(result);
    result = await ConvertedAPI.oneParamFunction(`Oh I don't think so.`);
    printResult(result);
    result = await ConvertedAPI.twoParamFunction(result, '-zoom into eyes-');
    printResult(result);
};

main();
