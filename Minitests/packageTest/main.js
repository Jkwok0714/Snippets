const fs = require('fs');

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