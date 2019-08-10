/**
 * @file Test the  usage of a packager to create an executable
 * Created Jul 13 2019
 */

const fs = require('fs');

/**
 * Just a basic function to make it do something
 * @param {string} filePath
 */
module.exports = (filePath) => {
    let data = fs.readFileSync(filePath).toString();
    let object;
    try {
        object = JSON.parse();
    } catch (e) {
        object = { error: `Parsing error: ${e.message}` };
    }
    return JSON.stringify(object, null, 2);
};