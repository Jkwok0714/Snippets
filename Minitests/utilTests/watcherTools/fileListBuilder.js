/**
 * @file Build a file list for a directory
 * Created Oct 8 2018
 */

const { stat, statSync, readdir } = require('fs');
const testFilePath = 'gitIgnoreThis';

const examineItems = (list, i, basePath, files, done) => {
  let file = list[i++];
  if (!file) {
    done(files);
  } else {
    file = `${basePath}/${file}`;
    stat(file, (err, stat) => {
      if (stat && stat.isDirectory()) {
        buildFileList(file).then(res => {
          files = files.concat(res);
          examineItems(list, i, basePath, files, done);
        });
      } else {
        files.push(file);
        examineItems(list, i, basePath, files, done);
      }
    });
  }
}

const buildFileList = (baseFilePath) => {
  let files = [];
  return new Promise((resolve, reject) => {
    if (statSync(baseFilePath).isFile()) {
      resolve([baseFilePath]);
    } else {
      readdir(baseFilePath, (err, list) => {
        if (err) {
          reject(err);
        } else {
          let i = 0;
          examineItems(list, i, baseFilePath, files, resolve);
        }
      });
    }
  });
};

buildFileList(testFilePath).then(res => {
  console.log(res);
}).catch(err => {
  console.log('err', err);
})
