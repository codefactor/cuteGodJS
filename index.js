var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 5000;
var fs = require('fs');
var tiles = JSON.parse(fs.readFileSync('./tiles.json', 'utf8'));
var seedrandom = require('./seedrandom');

var io = require('socket.io')(http);
io.on('connection', function(socket) {
	console.log('Socket connected: ' + socket.id);

	socket.on('watch', function(tz, tx) {
		if (typeof tz == 'number' && typeof tx == 'number' && !isNaN(tz) && !isNaN(tx)) {
			tz = Math.floor(tz);
			tx = Math.floor(tx);
		}
		socket.emit('tile init', tz, tx, tiles[Math.floor(seedrandom(tz+'-'+tx)() * tiles.length)]);
	});

    socket.on('disconnect', function() {
		console.log('Socket disconnected: ' + socket.id);
    });
});

app.use(express.static('public'));

http.listen(port, function() {
    console.log('listening on *:' + port);
});