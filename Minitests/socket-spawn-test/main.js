/**
 * @file Socket spawn tester made to test a CPU maxing error
 * Description of problem: When a process with sockets quit on a larger project,
 *   Node is thrown into an infinite loop under the hood (something with engine.io?)
 *   Eventually the problem seemed to disappear after an upgrade to the socket.io library?
 * Created Jan 8 2019
 */

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cp = require('child_process');

const PORT = 3000;
let enableWorker = true;

/**
 * Create a worker process to simulate a spawned session
 */
const startChild = () => {
  if (!enableWorker) return;
  let workerProcess = cp.fork(__dirname + '/child.js', null, {
    env: process.env
  });

  enableWorker = false;
  setTimeout(() => {
    enableWorker = true;
  }, 10000);
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/**
 * We create the process in response to a socket connection.
 */
io.on('connection', function (socket) {
  console.log('a user connected');
  startChild();

  socket.on('disconnect', () => {
    console.log('a user left');
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
