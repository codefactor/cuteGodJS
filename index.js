var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var metadata = require('./metadata');

io.on('connection', function(socket) {
	socket.emit('world init', metadata);
});

app.use(express.static('public'));

http.listen(3000, function() {
	console.log('listening on *:3000');
});