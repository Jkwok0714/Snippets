/*
 * == Dev Watcher ==
 *
 * Watch for file changes and reflect them on a remote server for dev
 *
 */

const { watch, stat, statSync, readdir } = require('fs');
const path = require('path');
try {
  const Client = require('ssh2-sftp-client'); // if client installed globally, run npm link first
} catch (e) {
  console.error('\x1b[31mFailed to load ssh2-sftp-client. Make sure module is installed globally (-g) and run `npm link ssh2-sftp-client`\x1b[0m');
  process.exit(0);
}

// Constants and Configurations
const CONFIGS = require('./config');
const SETTINGS = require('./settings');
const targetDirectory = path.resolve(__dirname, SETTINGS.target);
const watchOptions = {
  encoding: 'buffer',
  recursive: SETTINGS.recursive
};
const colors = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  CYAN: '\x1b[36m',
  MAGENTA: '\x1b[35m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  WHITE: '\x1b[37m'
}

// Helpers
const createHeader = () => {

}

const colorLog = (msg, col) => {
  if (!col) col = colors.WHITE;
  console.log(`${col}${msg}${colors.RESET}`);
};

const shouldExclude = (filename) => {
  return SETTINGS.exclude.filter(t => filename.indexOf(t) > -1).length > 0;
}

const getOptions = () => {
  return (process.argv.length > 2) ? process.argv[2] : null;
}

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
        files.push(path.relative(SETTINGS.target, file));
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

// Sftp handler


// Functions
const handleFileChange = (eventType, filename) => {
  if (!filename) return;
  colorLog(`[${new Date().toISOString()}] - ${eventType}:filename - ${filename}`, colors.CYAN);
  if (shouldExclude(filename)) {
    colorLog(`- Excluding: found in exclude settings.`, colors.YELLOW);
  } else {
    colorLog(`- Uploading...`, colors.MAGENTA);
  }
};

const handlePush = () => {
  buildFileList(targetDirectory).then(list => {
    console.log(list);
  }).catch(err => {

  });
};

const handleWatch = () => {
  watch(targetDirectory, watchOptions, handleFileChange);
};

// Main
const main = () => {
  const options = getOptions();
  colorLog(`Running tool on ${targetDirectory} with options: ${options}`, colors.GREEN);
  switch (options) {
    case '-watch':
    case 'watch':
      handleWatch();
      break;
    case null:
    case '-push':
    case 'push':
      handlePush();
      break;
    default:
      colorLog('Invalid option provided, Please check again.', colors.RED);
      break;
  }
}

// Run
main();
