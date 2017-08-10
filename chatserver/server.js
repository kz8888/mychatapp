var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(8082,function(){
    console.log('Server started on port 8082');
});

// socket io
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('new-message', function (data) {
    console.log(data);
    io.emit('new-message', data);
  });
});