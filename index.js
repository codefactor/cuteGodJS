var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 5000;
var fs = require('fs');
var tiles = JSON.parse(fs.readFileSync('./levels/test.json', 'utf8'));

var io = require('socket.io')(http);
io.on('connection', function(socket) {
	console.log('Socket connected: ' + socket.id);

	socket.on('watch', function(tile) {
		console.log(socket.id + ' requested to watch tile: ' + tile);
		socket.emit('tile init', tile, tiles[tile]);
	});

    socket.on('disconnect', function() {
		console.log('Socket disconnected: ' + socket.id);
    });
});

app.use(express.static('public'));

http.listen(port, function() {
    console.log('listening on *:' + port);
});