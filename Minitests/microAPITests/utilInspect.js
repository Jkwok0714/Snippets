/**
 * @file Just seeing what inspect does
 * Created Nov 4 2019
 */

const { inspect } = require('util');

/** A circular reference that'll throw error on stringify */
let circ = {};
circ.ref = circ;
let nonCirc = {
    ref: 'boop'
};

try {
    console.log(nonCirc);
    console.log(circ);
} catch (e) {
    console.error(e);
}

console.log(inspect(nonCirc, true, null, true));
console.log(inspect(circ));

let str = inspect(circ);

console.log(typeof str);
