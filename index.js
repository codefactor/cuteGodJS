var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 5000;
var fs = require('fs');
var tiles = JSON.parse(fs.readFileSync('./tiles.json', 'utf8'));
var world = JSON.parse(fs.readFileSync('./public/resources/content/world.json'));
var totalWeight = tiles.reduce((t, v) => t + v.weight, 0);
var seedrandom = require('./seedrandom');

tiles.forEach(function(tile) {
	for (var z=0; z<world.tileDepth; z++) {
		var slice = tile.data[z];
		if (!slice) {
			slice = tile.data[z] = {};
		}
		for (var x=0; x<world.tileWidth; x++) {
			var column = slice[x];
			if (column) {
				for (var y in column) {
					block = column[y];
					if (!Array.isArray(block)) {
						column[y] = [block, 0];
					}
				}
			} else {
				slice[x] = [];
			}
		}
	}
});

function getTileData(tz, tx) {
	var choice = seedrandom(tz+'-'+tx)() * totalWeight;
	var weight = 0;
	var i = 0;
	for (; i<tiles.length-1; i++) {
		weight += tiles[i].weight;
		if (weight > choice) {
			break;
		}
	}
	var tile = tiles[i];
	var data = tile.data;
	if (!tile.init) {
		for (var z in data) {
			var slice = data[z];
			for (var x in slice) {
				var column = slice[x];
				for (var y in column) {
					var block = column[y];
					var blockInfo = block && world.blocks[block[0]];
					if (blockInfo && blockInfo.shadow) {
						world.shadows.forEach(function(shadow, shadowIndex) {
							var sz = z - shadow.placed[0];
							var sx = x - shadow.placed[1];
							var sy = y - shadow.placed[2];
							if (sz >= 0 && sx >= 0 && sy >= 0 && sz < world.tileDepth && sx < world.tileWidth && sy < world.tileHeight) {
								var found = false;
								for (var n=0; !found && n<shadow.none.length; n++) {
									var none = shadow.none[n];
									var nblock = data[sz + none[0]];
									nblock = nblock && nblock[sx + none[1]];
									nblock = nblock && nblock[sy + none[2]];
									nblock = nblock && world.blocks[nblock[0]];
									if (nblock && nblock.shadow) {
										found = true;
									}
								}
								if (!found) {
									var scolumn = data[sz][sx];
									var block = scolumn[sy];
									if (!block) {
										block = scolumn[sy] = [0, 0];
									}
									var blockInfo = world.blocks[block[0]];
									if (block[0] == 0 || (blockInfo && blockInfo.shadow)) {
										block.push(shadowIndex);
									}
								}
							}
						});
					}
				}
			}
		}
		tile.init = true;
	}
	return data;
}

var io = require('socket.io')(http);
io.on('connection', function(socket) {
	console.log('Socket connected: ' + socket.id);

	socket.on('start watching', function(tz, tx) {
		if (typeof tz == 'number' && typeof tx == 'number' && !isNaN(tz) && !isNaN(tx)) {
			tz = Math.floor(tz);
			tx = Math.floor(tx);
			socket.emit('tile init', tz, tx, getTileData(tz, tx));
		}
	});

	socket.on('stop watching', function(tz, tx) {
		// TODO
	});

    socket.on('disconnect', function() {
		console.log('Socket disconnected: ' + socket.id);
    });
});

app.use(express.static('public'));

http.listen(port, function() {
    console.log('listening on *:' + port);
});