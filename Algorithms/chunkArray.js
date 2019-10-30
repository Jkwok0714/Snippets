/**
 * @file Chunk an array into n number of subarrays
 * Created Oct 29 2019
 */

 /**
  * @param {Array<*>} arr 
  * @param {number} perChunk 
  */
 const chunk = (arr, perChunk) => {
    let res = [];
    let copy = arr.slice(0);
    const numChunks = Math.ceil(copy.length / perChunk);
    for (let i = 0; i < numChunks; i++) res.push(copy.splice(0, perChunk));
    return res;
 };

let arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let arr2 = chunk(arr1, 2);
console.log('Input:', arr1);
console.log('Output:', arr2);