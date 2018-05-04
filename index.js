var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 5000;
var fs = require('fs');
var tiles = JSON.parse(fs.readFileSync('./tiles.json', 'utf8'));
var totalWeight = tiles.reduce((t, v) => t + v.weight, 0);
var seedrandom = require('./seedrandom');

var io = require('socket.io')(http);
io.on('connection', function(socket) {
	console.log('Socket connected: ' + socket.id);

	socket.on('start watching', function(tz, tx) {
		if (typeof tz == 'number' && typeof tx == 'number' && !isNaN(tz) && !isNaN(tx)) {
			tz = Math.floor(tz);
			tx = Math.floor(tx);
			var choice = seedrandom(tz+'-'+tx)() * totalWeight;
			var weight = 0;
			var i = 0;
			for (; i<tiles.length-1; i++) {
				weight += tiles[i].weight;
				if (weight > choice) {
					break;
				}
			}
			socket.emit('tile init', tz, tx, tiles[i].data);
		}
	});

	socket.on('stop watching', function(tz, tx) {

	});

    socket.on('disconnect', function() {
		console.log('Socket disconnected: ' + socket.id);
    });
});

app.use(express.static('public'));

http.listen(port, function() {
    console.log('listening on *:' + port);
});