const cp = require('child_process');
const uselessify = cp.fork(__dirname + '/uselessify');

const modString = 'We are eternal frost';

console.log('[Main] Sending to worker', modString);

uselessify.send(modString);
setTimeout(() => {
  console.log('[Main] 2 seconds passed...');
}, 2000);

uselessify.on('message', (data) => {
  console.log('[Main] Got data back from worker bee:', data);
  uselessify.kill();
  process.exit();
});
