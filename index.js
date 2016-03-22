var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

var numberOfPlayers = 0;
var id = 0;

io.on('connection', function(socket){
  console.log('a user connected')
  setTimeout(function(){
    socket.emit('connected', id);
    socket.id = id;
    id++;

    numberOfPlayers++;
    socket.broadcast.emit('user connected',socket.id);
  },1500);


  socket.on('disconnect',function(){
    console.log('disconnect ' + socket.id);
    io.emit('user disconnected', socket.id);
    numberOfPlayers--;
  });

  socket.on('moved',function(data){
    socket.broadcast.emit('has moved',data);
  });

});

http.listen(8000, function(){
  console.log('listening on *:8000');
});
