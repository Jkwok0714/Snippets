/**
 * Testing three different trigger methods yet again
 */
const TIMEOUT = 1000;

const asyncThing = async (input, callback) => {
    return new Promise((res) => {
        setTimeout(() => {
            const result = `Got the input: ${input}`;
            if (callback) callback(null, result);
            res(result);
        }, TIMEOUT);
    });
};

const asyncWrapper = async (input) => {
    console.log(await asyncThing(input));
};

/** Style 1 */
asyncThing('Callback style', (err, res) => {
    console.log(res);
});

/** Style 2 */
asyncThing('Promise style').then(res => {
    console.log(res);
});

/** Style 3 */
asyncWrapper('Await style');

console.log('Yup, still single forever');