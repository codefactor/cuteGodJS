var express = require('express');
var app = express();
var http = require('http').Server(app);

app.set('port', (process.env.PORT || 5000));

var io = require('socket.io')(http);
io.on('connection', function(socket) {
    socket.on('watch location', function(minTz, maxTz, minTx, maxTx) {
    });
});

app.use(express.static('public'));

http.listen(app.get('port'), function() {
    console.log('listening on *:' + app.get('port'));
});
