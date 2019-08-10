/**
 * @file Testing converting older async function patterns into async-await
 * Created Jul 31 2019
 */

const ASYNC_INTERVAL = 2000;

/** Simple timer to track seconds since execution */
let timer = 0;
let timerRunner = setInterval(() => {
    timer++;
}, 1000);

/** Looks like async works fine with return Promise, as it is based off it */
const asyncReturnsPromise = async () => {
    return new Promise(res => {
        setTimeout(() => res('==herro=='), ASYNC_INTERVAL);
    });
};

/** Looks like async doesn't work well with callback powered functions */
const asyncWithACallback = async () => {
    callbackFunction(res => {
        return res;
    });
};

/** Looks like if the callback is wrapped into a Promise, it's fine */
const asyncWithACallbackHybrid = async () => {
    return new Promise(res => {
        callbackFunction(data => {
            res(data);
        })
    })
};

/** Generic callback */
const callbackFunction = (callback) => {
    setTimeout(() => {
        logIt('CallbackFunction', 'Returning a callback');
        callback('==callback result here==');
    }, ASYNC_INTERVAL);
};

/** Re-do of main using await */
const main2 = async () => {
    let res;
    logIt('main2', 'Main2 began running');
    res = await asyncReturnsPromise();
    logIt('main2', 'asyncReturnsPromise got value', res);
    res = await asyncWithACallbackHybrid();
    logIt('main2', 'asyncWithACallbackHybrid got value', res);
    logIt('main2', 'Completing main without return value.');
}

/** Run main with tried and true promise chains */
const main = () => {
    logIt('Main', 'Main execution has begun.');
    asyncReturnsPromise().then(res => {
        logIt('Main', 'asyncReturnsPromise returned', res);
        return  asyncWithACallback();
    }).then(res => {
        logIt('Main', 'asyncWithACallback has returned. This should produce undesired result', res);
        return asyncWithACallbackHybrid();
    }).then(res => {
        logIt('Main', 'asyncWithACallbackHybrid has returned:', res);
        return main2();
    }).then(() => {
        logIt('Main', 'Finally, ending the interval and closing the process.');
        clearInterval(timerRunner);
    });
};

/**
 * Log function with formatting and timer included
 * @param {string} funcName 
 * @param  {...string} message 
 */
const logIt = (funcName, ...message) => {
    console.log(`\x1b[32m[${funcName}:${timer}]\x1b[0m ${message.join(' ')}`);
};

main();
