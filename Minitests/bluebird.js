var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var fs = Promise.promisifyAll(require('fs'));
var cron = require('node-cron');
var helpers = require('./nodeHelper')

var path = './trashOutput/testFile.txt';

console.log('Entered file...\n');

function runTest() {
  console.log('\nRunning test...');
  helpers.promiseTest('http://www.google.com').then((msg) => {
    console.log('Got code', msg);
    return fs.appendFileAsync(path, msg + '\n');
  }).then((success) => {
    var message = 'Wrote result to file @' + path;
    // console.log();
    return fs.appendFileAsync(path, 'Redundant log! ' + message + '\n');
  }).then(() => {
    console.log('Chained promises');
  }).catch((err) => {
    console.log(err);
  });
}

cron.schedule('*/5 * * * * *', runTest);
