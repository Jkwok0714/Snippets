var express = require('express');
var app = express();

const socketPort = 3002;
const httpPort = 3000;

const http = require('http');
var socketServer = http.createServer(app);
var io = require('socket.io')(socketServer);

const getDateString = () => {
  let d = new Date();
  return d.toString();
}

socketServer.listen(socketPort, function(){
  console.log(`Socket server listening on : ${socketPort}`);
});

io.on('connection', function(socket){
  console.log('\x1b[32mSocket connection established:', getDateString(),'\x1b[0m');
  socket.on('newMessage', (message) => {
    console.log('\x1b[36mServer got message', message, '\x1b[0m');
  });

  socket.on('disconnect', () => {
    console.log('\x1b[33mSocket connection closed:', getDateString(), '\x1b[0m');
  })
});

var server = http.createServer(app);
server.listen(httpPort);
