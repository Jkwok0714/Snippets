/** npm i -g pkg to install packager */

const importMethod = require('.');
console.log(importMethod(process.argv[2]));