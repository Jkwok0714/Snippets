/**
 * @file A test to see what happens with for looping and await
 */

 /**
  * A sample async function with the classic setTimeout
  * @param {string} value 
  */
const dummyAsyncFunction = async (value) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`~~**${value}**~~`);
        }, 1000);
    });
};

/**
 * The loop function that calls an async function inside the for loop
 */
const whatHappensHere = async () => {
    const arr = ['Sono chi no sadame', 'Joooooo', 'oooooooooooo', 'Jo'];
    for (let i = 0; i < 4; i++) {
        await console.log(`[${i}]: ${await dummyAsyncFunction(arr[i])}`);
    }
    return;
};

/**
 * Does not work with forEach..probably because it expects a sync and thus doesn't have the await
 * So all the async callbacks  are called at once
 */
const forEachVersion = async () => {
    await ['Suttandup!', 'Suttandup!', 'Suttandup!', 'Uchiko mu no wa!'].forEach(async (verse, i) => {
        console.log(`[${i}]${await dummyAsyncFunction(verse)}`);
    });
};

/**
 * @callback forEachAwaitCallback
 * @param {*} arrayElement
 * @param {number} index
 */

/**
 * Tack on a forEachAwait, use "function" to keep scoping
 * @param {forEachAwaitCallback} callback
 */
Array.prototype.forEachAwait = async function (callback) {
    for (let i = 0; i < this.length; i++) {
        await callback(this[i], i);
    }
};

/**
 * Call the custom forEach that handles async
 */
const forEachAwaitVersion = async () => {
    ['Crazy', 'Noisy', 'Bizarre', 'Town'].forEachAwait(async (verse, i) => {
        console.log(`[${i}]${await dummyAsyncFunction(verse)}`);
    })
};

/**
 * Main
 */
const main = async () => {
    const logThis = await dummyAsyncFunction('Like a bloody stream');
    console.log(logThis);
    await whatHappensHere();
    await forEachVersion();
    await forEachAwaitVersion();
};

main();