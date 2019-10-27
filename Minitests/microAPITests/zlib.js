/**
 * @file Try and use zlib to "deflate" and "inflate" a JSON string
 * Created Oct 26 2019
 */

const zlib = require('zlib');

/**
 * Use zlib to compress the string
 * @param {string} input 
 */
const compress = (input) => {
    return new Promise((resolve, reject) => {
        zlib.deflate(input, (err, res) => {
            if (err) return reject(err);
            resolve(res.toString('base64'));
        });
    });
};

/**
 * Use xlib to decompress the string
 * @param {string} input 
 */
const extract = (input) => {
    return new Promise((resolve, reject) => {
        zlib.inflate(new Buffer(input, 'base64'), (err, res) => {
            if (err) return reject(err);
            resolve(res.toString());
        });
    });
};

/**
 * Main function runner
 */
const main = async () => {
    let happyObject = { tagline: 'Kazuma Kazuma!' };
    let stringified = JSON.stringify(happyObject);
    console.log('Stringified', stringified);
    let compressed = await compress(stringified);
    console.log('compressed', compressed);
    let extracted = await extract(compressed);
    console.log('extracted', extracted);
};

main();
