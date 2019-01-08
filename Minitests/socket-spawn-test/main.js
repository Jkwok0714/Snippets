const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cp = require('child_process');

const PORT = 3000;
let enableWorker = true;

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
