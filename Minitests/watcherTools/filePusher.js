const Client = require('ssh2-sftp-client');
const CONFIGS = require('./config');
const UTIL = require('../utility');

console.log(UTIL.makeToken(8));

const testFilePath = 'gitIgnoreThis/';

const NO_DIR_ERROR_CODE = 2;

let sftp;

//\x1b[32m
const runTest = () => {
  sftp = new Client();
  sftp.connect({
    host: CONFIGS.host,
    port: CONFIGS.port,
    username: CONFIGS.username,
    password: CONFIGS.password
  }).then(() => {
    console.log('connected');
    return sftp.list('./');
  }).then((data) => {
    console.log('Files on remote:', data.map(file => file.name));
    console.log(`Now putting a file up there: ${testFilePath}`);
    return sftp.put(`${__dirname}/${testFilePath}`, testFilePath);
  }).then(() => {
    const trickyPath = `tricky/${UTIL.makeToken(8)}/${UTIL.makeToken(8)}/${testFilePath}`;
    console.log(`Put. Making a tricky path: ${trickyPath}`);
    return putWithMkdir(`${__dirname}/${testFilePath}`, trickyPath);
  }).then(() => {
    console.log('\x1b[32mDone\x1b[0m');
  }).catch((err) => {
    console.log('\x1b[31mERROR:\x1b[0m', err);
  });
}

const putWithMkdir = (localPath, remotePath) => {
  return new Promise((resolve, reject) => {
    sftp.put(localPath, remotePath).then(() => {
      resolve();
    }).catch(err => {
      if (err.code === NO_DIR_ERROR_CODE) {
        // directory does not exist. make it
        const directoriesOnly = remotePath.split('/').slice(0, -1).join('/');
        console.log(`\x1b[33mErr code 2, attempt to create directories recursively: ${directoriesOnly}\x1b[0m`);
        sftp.mkdir(directoriesOnly, true).then(() => {
          console.log('created directories');
          putWithMkdir(localPath, remotePath).then(() => {
            resolve();
          });
        });
      } else {
        reject(err);
      }
    });
  });
}


runTest();
