/**
 * @file Test a CSV parser algorithm
 * Created Jan 21 2019
 */

const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const csvPath = 'jasonsJsons/test.csv'
const encoding = 'utf8';

/**
 * Load in a file to read
 * @param {string} filePath 
 */
const readInFile = (filePath) => {
  return readFile(filePath, encoding);
}

/**
 * CSV parsing function by Andy VanWagoner, from StackOverflow
 * @param {string} csv 
 * @param {string} reviver 
 */
function parseCsv(csv, reviver) {
    reviver = reviver || function(r, c, v) { return v; };
    var chars = csv.split(''), c = 0, cc = chars.length, start, end, table = [], row;
    while (c < cc) {
        table.push(row = []);
        while (c < cc && '\r' !== chars[c] && '\n' !== chars[c]) {
            start = end = c;
            if ('"' === chars[c]){
                start = end = ++c;
                while (c < cc) {
                    if ('"' === chars[c]) {
                        if ('"' !== chars[c+1]) { break; }
                        else { chars[++c] = ''; } // unescape ""
                    }
                    end = ++c;
                }
                if ('"' === chars[c]) { ++c; }
                while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { ++c; }
            } else {
                while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { end = ++c; }
            }
            row.push(reviver(table.length-1, row.length, chars.slice(start, end).join('')));
            if (',' === chars[c]) { ++c; }
        }
        if ('\r' === chars[c]) { ++c; }
        if ('\n' === chars[c]) { ++c; }
    }
    return table;
}

/**
 * In our case we have user info; parse it
 * @param {string} csvData
 */
const convertToObjects = (csvData) => {
  let result = [];
  const indexOfFirstEntryWitHEmail = csvData.findIndex(row => {
    return row.length > 2 && row[2].indexOf('@') > -1;
  });

  for (let i = indexOfFirstEntryWitHEmail; i < csvData.length; i++) {
    result.push({
      firstName: csvData[i][0],
      lastName: csvData[i][1],
      email: csvData[i][2]
    })
  }

  return result;
};

/**
 * Main process runner
 * Does not handle entries in CSV where commas are part of the value
 */
const main = () => {
  readInFile(csvPath).then(data => {
    // let dataParsed = data.split('\n').map(i => i.split(','));
    let dataParsed = convertToObjects(parseCsv(data));

    console.log('data', dataParsed);
  }).catch(err => {
    console.error(err);
  });
};

main();
