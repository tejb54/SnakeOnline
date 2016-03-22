var scoreText, score;
var snake;
var snakeId = -1;
var onlineSnakes = [];

var Game = {

  apple2: {},

  //preload
  preload: function(){
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
      game.state.start('Game_over');
    },
    function(){
      score++;
      scoreText.setText("Score: " + score);
    });

    snake.create(150,150);
  },

  //update
  update: function(){
    if(snake.getId() != -1){
      snake.update();
    }
    else {
      snake.setId(snakeId);
    }
  }
}


//networking
socket.on('connected',function(id){
  console.log('You connected with id: '+ id);
  snakeId = id;


});

socket.on('user connected',function(id){
  console.log('a new user connected with id: ' + id);
  if(id != snakeId){
    var tmpSnakeOnline = new snakeOnlineObj();
    tmpSnakeOnline.create();
    tmpSnakeOnline.setId(id);
    onlineSnakes.push(tmpSnakeOnline);
  }

});

socket.on('has moved',function(data){
  onlineSnakes.forEach(function(element, index, array){
    if(data.id == element.getId()){
      element.update(data.direction);
    }
  });


});
