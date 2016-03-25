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

//varibles used for snake game
var plyerCount = 0;
var id = -1;
var snakes = [];

io.on('connection', function(socket){
  console.log('a user connected')

  //user started a new game
  socket.on('user started',function(){
    console.log('started');

    snakes.push(new snake(socket.id));

    socket.emit('connected', socket.id);
    socket.broadcast.emit('user connected',id);
  });

  //some user had a game over
  socket.on('gameOver',function(){
    snakes.forEach(function(element,index,array){
      if(element.snakeId == socket.id){
        snakes.splice(index,1);
      }
    });
    io.emit('user disconnected', socket.id);
  });

  //some user diconnected
  socket.on('disconnect',function(){
    snakes.forEach(function(element,index,array){
      if(element.snakeId == socket.id){
        snakes.splice(index,1);
      }
    });
    io.emit('user disconnected', socket.id);

  });

  //A snake has updated it's position
  socket.on('moved',function(data){
    snakes.forEach(function(element,index,array){
      if(element.snakeId == socket.id){
        snakes[index].snakeParts = data.snakeParts;
        //return because id should be uniqe
        return;
      }
    });
  });

  //get the array of snakes
  socket.on('getSnakes',function(){
    socket.emit('response getSnakes', snakes);
  });

  //some snake has changed it's direction
  socket.on('new direction', function(newDirection){
    snakes.forEach(function(element,index,array){
      if(element.snakeId == socket.id){
        snakes[index].direction = newDirection;

        //console.log(newDirection + ' from ' + socket.id);
        io.emit('direction update',{id:socket.id,direction:newDirection});
        return;
      }
    });
  });
});

//main server update loop
setInterval(function(){
  io.volatile.emit('update tick',snakes);
},100);

http.listen(8000, function(){
  console.log('listening on *:8000');
});
