/**
 * Scanning a directory for JSON and aggregating their data into one object
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const promiseLoop = require('./utility').promiseLoop;

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const searchPath = 'jasonsJsons/'
const loadType = 'json';
const encoding = 'utf8';

console.log(promiseLoop);

const getPathList = (searchPath, loadType) => {
  return new Promise((resolve, reject) => {
    readdir(searchPath).then(items => {
      const pathList = [];
      items.forEach(item => {
        if (item.indexOf(loadType) !== -1) {
          const filePath = path.join(searchPath, item);
          pathList.push(filePath);
        }
      });
      resolve(pathList);
    }).catch(err => {
      console.error('error reading dir', err);
      reject(err);
    });
  });
}

const combineJSON = (array) => {
  let result = {};
  array.forEach(obj => Object.assign(result, obj));
  return result;
};

// ==== TEST ====
getPathList(searchPath, loadType).then(fileList => {
  console.log('Scanned files:\n', fileList);
  return promiseLoop(fileList, (item, done) => {
    readFile(item, encoding)
      .then(data => done(JSON.parse(data)))
      .catch(err => console.error('error reading file', err));
  });
}).then(res => {
  console.log('After reading res:\n', res)
  const aggregated = combineJSON(res);
  console.log('Aggregated:\n', JSON.stringify(aggregated, null, 2));
});
