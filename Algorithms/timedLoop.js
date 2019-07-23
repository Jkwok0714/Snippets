/**
 * A for loop functionality but with async delay
 * @param {number} i Where to start iteration
 * @param {*[]} arr Input data
 * @param {timedLoopCallback} callback How to process the data being iterated
 * @param {number} timeout Delay to wait per iteration
 * @param {function=} doneCallback Optional callback for when the loop is done
 */
const timedLoop = (i, arr, callback, timeout, doneCallback = null) => {
    if (i >= arr.length) {
        if (!!doneCallback && doneCallback instanceof Function) doneCallback();
        return;
    }

    if (callback instanceof Function)
        callback(arr[i], i);
    else
        throw new Error('Callback given was not a function!');

    setTimeout(timedLoop.bind({}, ++i, arr, callback, timeout, doneCallback), timeout);
};

/**
 * Callback to use for processing data in timed loop
 * @callback timedLoopCallback
 * @param {*} data The data to be processed
 * @param {number} i The index of current iteration
 */

// Test here
const sample = [
    'Jonathon Joestar',
    'Joseph Joestar',
    'Jotaro Kujo',
    'Josuke Higashikata',
    'Giorno Giovanna',
    'Jolyne Cujoh',
    'Johnny Joestar',
    'Josuk8 Higashikata'
];

timedLoop(0, sample, (data, i) => {
    console.log(`[TimedLoopCallback] Printing data ${i}: ${data}`);
}, 1000, () => {
    console.log('[TimedLoopCallback] Complete.');
});