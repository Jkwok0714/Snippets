/**
 * Using async-await in different ways and comparing against raw promises
 */

const junk = require('../junkData');
const UTIL = require('./utility');

/* How long to wait to resolve simulated async funcs */
const WAIT_TIME = 1000;

/* Generic function that calls a promise based function */
const asyncWithAsync = async (rng = false) => {
    const result = await genericAsyncFunction(rng);
    console.log('*Async result:', result);
    return result;
};

/* Test calling consecutive async functions */
const chainAsync = async () => {
    announceTest('Chain Async');
    await asyncWithAsync();
    await asyncWithAsync();
    await asyncWithAsync();
    await asyncWithAsync();
    console.log('\x1b[35mchainAsync complete\x1b[0m');
};

/* Test calling consecutive async with a loop */
const chainAsyncLoop = async (n) => {
    announceTest(`Async for loop ${n}x`);
    for (let i = 0; i < n; i++) {
        let result = await asyncWithAsync(true);
        console.log(`for #${i}: ${result}`);
    }
    console.log('\x1b[35mchainAsyncLoop complete\x1b[0m');
};

/* As above but with forEach; does not preserve order, calls concurrent */
const chainAsyncForEach = async (n) => {
    announceTest(`Async forEach loop ${n}x`);
    new Array(n).fill('').forEach(async (_, i) => {
        let result = await asyncWithAsync(true);
        console.log(`forEach #${i}: ${result}`);
    });
    await wait(1.5 * WAIT_TIME);
    console.log('\x1b[35mchainAsyncForEach complete\x1b[0m');
};

/* Using try-catch with async functions */
const asyncTryCatch = async () => {
    announceTest('Async Try-Catch');
    try {
        await genericFailFunction();
    } catch (e) {
        console.log('\x1b[33mFail function caught, return normal function', e, '\x1b[0m');
        await asyncWithAsync();
    }
};

/* Using a conditional with async functions depending on result */
const conditionalAwait = async () => {
    announceTest('Conditional Await');
    let result = await asyncWithAsync();
    let chosenChar = false;
    if (result.length > 10) {
        console.log('Conditional await got long result, choosing char instead');
        chosenChar = true;
        result = await genericAsyncFunctionCharacter();
    }
    console.log('Chosen', chosenChar ? result.name : result);
    return result;
};

/* Call an async function that doesn't work */
const callAsyncFunctionDirectly = async () => {
    announceTest('Call async setTimeout directly');
    const chosenName = await genericAsyncFunctionAsync();
    console.log('\x1b[35mChose', chosenName, '\x1b[0m');
};

/* Test if callback runs at the end of an async chain */
const runAllThenCallCallback = async (callback) => {
    announceTest('Await then callback');
    await asyncWithAsync();
    await asyncWithAsync();
    callback();
};

/* Run tests but with async/await */
const testRunnerNewMethod = async () => {
    announceTest('Main but with await');
    const loopTimes = UTIL.getRngBetween(3, 5);

    await chainAsync();
    await chainAsyncLoop(loopTimes);
    await chainAsyncForEach(loopTimes);
    await asyncTryCatch();
    await callAsyncFunctionDirectly();
    await conditionalAwait();
    await runAllThenCallCallback(() => sampleCallback());
    await useNestedAsync(UTIL.getRngBetween(2, 4));

    console.log('\x1b[35m** testRunnerNewMethod Completed **\x1b[0m');
};

/* Multiple loops back to back deoending on results */
const useNestedAsync = async (n) => {
    announceTest('Nested Await Builder')
    let characterList = [];
    for (let i = 0; i < n; i++)
        characterList.push(await genericAsyncFunctionCharacter());
    
    for (let character of characterList)
        character.chosenEq = await getItemsForCharacter(character);

    console.log('\x1b[35mCharacters armed:\n', characterList.map(c => `${c.name} - ${c.chosenEq || 'None'}`).join(', '), '\x1b[0m');
};

/*
 * Test Methods
 */
const announceTest = (testName) => {
    console.log(`\x1b[32m== Now running test: ${testName} ==\x1b[0m`);
};

/*
 * Test runner
 */
const main = () => {
    announceTest('Main');
    asyncWithAsync()
    .then(() => asyncWithAsync())
    .then(() => asyncWithAsync())
    .then(() => chainAsync())
    .then(() => chainAsyncLoop(UTIL.getRngBetween(2, 5)))
    .then(() => asyncTryCatch())
    .then(() => conditionalAwait())
    .then(() => testRunnerNewMethod())
};

/*
 * Generic filler functions for using with tests
 */
const genericAsyncFunction = (rng = false) => {
    return new Promise(res => {
        setTimeout(() => {
            const chosen = UTIL.chooseRandom(junk.artifacts);
            res(chosen);
        }, rng ? UTIL.getRngBetween(10, WAIT_TIME) : WAIT_TIME);
    });
};

/* Async with return doesn't work, needs promise */
const genericAsyncFunctionAsync = async () => {
    setTimeout(() => {
        return UTIL.chooseRandom(junk.inhabitants).name;
    }, WAIT_TIME);
};

const genericAsyncFunctionCharacter = (rng = false) => {
    return new Promise(res => {
        setTimeout(() => {
            const chosen = UTIL.chooseRandom(junk.inhabitants);
            console.log('Getting character...', chosen.name);
            res(chosen);
        }, rng ? UTIL.getRngBetween(10, WAIT_TIME) : WAIT_TIME);
    });
};

const genericFailFunction = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('\x1b[31mGonk\x1b[0m');
            rej(new Error('I am a bad function'));
        }, WAIT_TIME);
    });
};

const getItemsForCharacter = (character) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const { weapon } = character;
            const item = UTIL.chooseRandom(junk.weapons[weapon.toLowerCase()]);
            console.log('Getting item...', item);
            res(item);
        }, WAIT_TIME);
    });
};

const wait = (time) => {
    return new Promise(res => {
        setTimeout(res, time);
    });
};

const sampleCallback = () => {
    console.log('\x1b[35mHeeeeere\'s a callback\x1b[0m');
};


main();
