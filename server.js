
var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

server.listen(process.env.PORT || 3000);

// socket.io
io.set('log level', false);
io.set('transports', [process.env.LATENCY_TRANSPORT || 'xhr-polling']);
io.set("polling duration", 10); 
io.sockets.on('connection', function (socket) {
  socket.on('message', function (msg) {
    socket.send(msg);
  });
});
