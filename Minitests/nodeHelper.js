var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var fs = Promise.promisifyAll(require('fs'));

exports.promiseTest = function(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(err);
      }
      console.log(res.headers.date);
      resolve(res.statusCode + '@' + res.headers.date);
    });
  });
};
