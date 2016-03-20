var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('data',function(data){
    console.log(data);
    socket.broadcast.emit('return',data);
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});
