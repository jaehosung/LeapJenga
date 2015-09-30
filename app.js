var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/', express.static(__dirname));

var user1_socket;
var user2_socket;

io.on('connection', function (socket) {
    //socket.emit('news', { hello: 'world' });
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
        if (socket === user1_socket) user1_socket = undefined;
        if (socket === user2_socket) user2_socket = undefined;
    });

    if (user1_socket === undefined) {
        user1_socket = socket;
        socket.emit('connected', 1);
    } else {
        user2_socket = socket;
        socket.emit('connected', 2);
    }

    socket.on('to_user1', function(data){
        if (user1_socket)
            user1_socket.emit('data', data);
    });   

    socket.on('to_user2', function(data){
        if (user2_socket)
            user2_socket.emit('data', data);
    });

    socket.on('turn_change_user1', function(data){
        console.log(1);
        if (user1_socket)
            user1_socket.emit('turn_change');
    });

    socket.on('turn_change_user2', function(data){
        console.log(2);
        if (user2_socket)
            user2_socket.emit('turn_change');
    });
});