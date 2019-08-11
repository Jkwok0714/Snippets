var express = require('express');
const path = require('path');
var app = express();
const exec = require("child_process").exec;

const socketPort = 3002;
const httpPort = 3000;

const LAUNCH_TEST_PAGE = true;
const extensionID = 'fpaglojjjlmacghapkfalhljijpojijk';


const http = require('http');
var socketServer = http.createServer(app);
var io = require('socket.io')(socketServer);

const getDateString = () => {
  let d = new Date();
  return d.toString();
}

const launchPage = (query = {}) => {
  // let url = `http://localhost:${httpPort}`;
  const url = 'http://dev.flowapp.com/s/ISAAC/p10/123?autoGenerate=true';
  let sizeOptions = query.width && query.height ? ` --window-size=${query.width},${query.height}` : '--window-size=1450,900';
  const additionalOptions = '--disable-notifications --no-sandbox --test-type --disable-infobars --enable-logging --v=1 --enable-logging=stderr';
  console.log(`\x1b[32mLaunching ${url}\x1b[0m`);
  exec(`export DISPLAY=0:2 && sudo google-chrome-stable --whitelisted-extension-id=${extensionID} ${additionalOptions}${sizeOptions} ${url}`, (err, stdout, stderr) => {
      if (err) {
          // logger.add('Recorder', `[/OPEN-3] Problem launching ${url} - ${err.message ? err.message : JSON.stringify(err)}`);
      } else {
          if (stderr) {
              // console.error("\x1b[31mSTDERR when launching url\x1b[0m", stderr);
          }
          console.log(`\x1b[32mLaunched and closed ${url}\x1b[0m`);
      }
  });
}

socketServer.listen(socketPort, function(){
  console.log(`Socket server listening on : ${socketPort}`);
});

io.on('connection', function(socket){
  console.log('\x1b[32mSocket connection established:', getDateString(),'\x1b[0m');
  socket.on('data', (message) => {
    console.log('\x1b[36mServer got data', message, '\x1b[0m');
  });

  socket.on('disconnect', () => {
    console.log('\x1b[33mSocket connection closed:', getDateString(), '\x1b[0m');
  })
});

if (LAUNCH_TEST_PAGE) setTimeout(() => {
  launchPage();
}, 10000);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

const server = http.createServer(app);
server.listen(httpPort);
