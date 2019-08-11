/**
 * @file Swap two values without using a third variable as temp
 * Created Dec 8 2018
 */

/*
lul TRUTHBOMB from Quora

It seems everyone remembers how to do this. Now let me give you my opinion as a professional software engineer: if anyone in my group did any of the arithmetic swap without a third variable, I would make them take it out and replace it either with a version that DID use a third variable of the same type, or with C++’s built in swap() function.
Being cute does not justify code that cannot work for all legal values of the type it deals with… certainly not just to do a swap.
*/

let x = 6;
let y = 10;

console.log(`BEFORE\nx: ${x}, y: ${y}`);

x = x + y;
y = x - y;
x = x - y;

console.log(`AFTER\nx: ${x}, y: ${y}`);
