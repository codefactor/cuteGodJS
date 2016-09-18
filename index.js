var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 5000;
var level = require('./levels/main');

var io = require('socket.io')(http);
io.on('connection', function(socket) {
	console.log('Socket connected: ' + socket.id);

	socket.on('get', function(z, x) {
	});

    socket.on('disconnect', function() {
		console.log('Socket disconnected: ' + socket.id);
    });
});

app.use(express.static('public'));

http.listen(port, function() {
    console.log('listening on *:' + port);
});