var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

function snake(id){
  this.snakeId = id;
  this.snakeParts = [];
  this.direction = 'right';
};




var plyerCount = 0;
var id = -1;
var snakes = [];

io.on('connection', function(socket){
  console.log('a user connected')
  setTimeout(function(){

    snakes.push(new snake(socket.id));

    socket.emit('connected', socket.id);

    console.log(snakes);

    socket.broadcast.emit('user connected',id);
  },1500);


  socket.on('disconnect',function(){
    snakes.forEach(function(element,index,array){
      if(element.snakeId == socket.id){
        snakes.splice(index,1);
      }
      console.log('user disconnected');
      console.log(snakes);
    });
    io.emit('user disconnected', socket.id);

  });

  socket.on('moved',function(data){
    snakes.forEach(function(element,index,array){
      if(element.snakeId == socket.id){
        snakes[index].snakeParts = data.snakeParts;
      }
    });
  });

  socket.on('getSnakes',function(){
    socket.emit('response getSnakes', snakes);
  });

  socket.on('new direction', function(newDirection){
    snakes.forEach(function(element,index,array){
      if(element.snakeId == socket.id){
        snakes[index].direction = newDirection;
        console.log(newDirection + ' from ' + socket.id);
        io.emit('direction update',{id:socket.id,direction:newDirection});
      }
    });
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});
