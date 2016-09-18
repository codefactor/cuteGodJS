var express = require('express');
var app = express();
var http = require('http').Server(app);

app.set('port', (process.env.PORT || 5000));

var watchers = {};

var io = require('socket.io')(http);
io.on('connection', function(socket) {
	console.log('Socket connected: ' + socket.id);

    socket.on('watch', function(minTz, maxTz, minTx, maxTx) {
    	console.log('Socket ' + socket.id + ' is watching: z between ' + minTz + ' and ' + maxTz + ', x between ' + minTx + ' and ' + maxTx);
    	watchers[socket.id] = {
    		socket: socket,
			minTz: minTz,
			maxTz: maxTz,
			minTx: minTx,
			maxTx: maxTx
    	};
    	var levelData = {};
    	for (var z=minTz; z <= mazTz; z++) {
    		for (var x=minTx; x <= maxTx; x++) {
    			var tileId = z+','+x;
    			levelData[tileId] = level[tileId];
    		}
    	}
    	socket.emit('levelData', levelData);
    });

    socket.on('pickup', function(tz, tx, bz, bx) {
    	var watched = 0;
    	for (var id in watchers) {
    		var watcher = watchers[id];
    		if (tz >= watcher.minTz && tz <= watcher.maxTz && tx >= watcher.minTx && tx <= watcher.maxTx) {
    			watched++;
    			watcher.socket.emit('pickup', tz, tx, bz, bx);
    		}
    	}
    	console.log('Socket ' + socket.id + ' has picked up ' + tz + ',' + tx + ':' + bz + ',' + bx + ' -- ' + watched + ' watcher(s)');
    });

    socket.on('disconnect', function() {
		console.log('Socket disconnected: ' + socket.id);
    	delete watchers[socket.id];
    });
});

app.use(express.static('public'));

http.listen(app.get('port'), function() {
    console.log('listening on *:' + app.get('port'));
});

var level = {
    '0,0': {
        0: {
            0: [2, 3, 4, 16],
            1: [2, 3, 4],
            2: [2, 3, 4, 9],
            3: [2, 2, 2, 11, 11, [7, 7]],
            4: [2, 2, 6, 0, 0, [7, 0]],
            5: [2, 2, 2, 11, 11, [7, 1]]
        },
        1: {
            0: [2, 3, 4],
            1: [2, 3, 4],
            2: [2, 3, 4, 10],
            3: [2, 2, 2, 11, 11, [7, 6]],
            4: [2, 2, 6, 0, 0, 11],
            5: [2, 2, 2, 11, 11, [7, 2]]
        },
        2: {
            0: [2, 3, 4],
            1: [2, 3, 5],
            2: [2, 3, 5],
            3: [2, 2, 2, 11, 11, [7, 5]],
            4: [2, 2, 6, [13, 0], 0, [7, 4]],
            5: [2, 2, 2, 11, 11, [7, 3]]
        },
        3: {
            0: [2, 3, 4],
            1: [2, 3, 5],
            2: [2, 3, 5],
            3: [2, 3, 4],
            4: [2, 2, 2]
        },
        4: {
            0: [2, 3, 4],
            1: [2, 3, 4],
            2: [2, 3, 4],
            3: [2, 3, 4],
            4: [2, 2, 2]
        },
        5: {
            0: [1, 1, [8, 2]],
            1: [1, 1, [8, 2]],
            2: [1, 1]
        },
        6: {
            0: [1, [8, 2]],
            1: [1, 1],
            2: [1, [8, 1]],
            3: [[8, 1]]
        },
        7: {
            0: [[8, 2]]
        }
    }
};