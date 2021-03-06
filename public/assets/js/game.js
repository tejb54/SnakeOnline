var scoreText, score;
var snake;
var snakeId = -1;
var onlineSnakes = [];
var started = false;

var Game = {

  apple2: {},

  //preload
  preload: function(){
    game.state.disableVisibilityChange = false;
    score = 0;
    scoreText = game.add.text(10,10, "Score: " + score, {font: "24px Arial",
      fill: "#00c4ff",
      align: "center"
    });

    this.apple2 = new appleObj();

    game.load.image('snakeObj',"./assets/images/snake.png");
    this.apple2.preload();
  },

  //create
  create: function(){
    game.stage.backgroundColor = '#061f27';
    this.apple2.create();

    snake = new snakeObj(Game.apple2,function(){
      socket.emit('gameOver');
      game.state.start('Game_over');
    },
    function(){
      score++;
      scoreText.setText("Score: " + score);
    });

    snake.create(150,150);
    socket.emit('user started');

  },

  //update
  update: function(){
    //started = true;
    //if(snake.getId() != -1){
    //  snake.update();
    //}
    //else {
    //  snake.setId(snakeId);
    // }
    snake.checkInput();
  }
}


// setInterval(function(){
//   if(started){
//     //socket.emit('getSnakes');
//   }
// }, 30);

//networking client
socket.on('connected',function(id){
  console.log('You connected');
  snakeId = id;
});

socket.on('update tick', function(snakes){
  console.log('server update tick');

  if(snakeId != -1){
    snake.update();
    started = true;
    snake.setId(snakeId);
  }
  else {

  }

  if(!started){
    return;
  }

  var foundMatch = false;
  for(var i = 0; i < snakes.length; i++){
    foundMatch = false;
    for (var j = 0; j < onlineSnakes.length; j++) {
      if(onlineSnakes[j].getId() == snakes[i].snakeId){
        onlineSnakes[j].update2(snakes[i].snakeParts);
        foundMatch = true;
      }
    }
    if(!foundMatch)
    {
      if(snakeId != snakes[i].snakeId){
        var tmpSnake = new snakeOnlineObj();
        tmpSnake.create();
        tmpSnake.setId(snakes[i].snakeId);
        onlineSnakes.push(tmpSnake);
      }
    }
  }




});

socket.on('user disconnected',function(id){
  for (var i = 0; i < onlineSnakes.length; i++) {
    if(id == onlineSnakes[i].getId()){
      onlineSnakes[i].kill();
      onlineSnakes.splice(i,1);
    }
  }
});

socket.on('user connected',function(id){

});

socket.on('direction update', function(data){
  // var foundMatch = false;
  // for (var j = 0; j < onlineSnakes.length; j++) {
  //   if(onlineSnakes[j].getId() == data.id){
  //     //onlineSnakes[j].update(data.direction);
  //     foundMatch = true;
  //   }
  // }
});

//will add new snakes to onlineSnakes
socket.on('response getSnakes', function(snakes){

});
