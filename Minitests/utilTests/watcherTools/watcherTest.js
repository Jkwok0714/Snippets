/**
 * Test fs's watch method
 */

const { watch } = require('fs');
const watchDirectory = require('path').resolve(__dirname, '../');

console.log(`Watching: ${watchDirectory}`);

watch(watchDirectory, { encoding: 'buffer', recursive: true }, (eventType, filename) => {
  if (filename) console.log(`filename: ${filename}`);
});
