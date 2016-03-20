var scoreText, score;


var Game = {

  snake: {},
  apple2: {},

  preload: function(){
    score = 0;
    scoreText = game.add.text(10,10, "Score: " + score, {font: "24px Arial",
      fill: "#00c4ff",
      align: "center"
    });
    this.apple2 = new appleObj();
    this.snake = new snakeObj(this.apple2,function(){
      game.state.start('Game_over');
    },
    function(){
      score++;
      scoreText.setText("Score: " + score);
    });
    this.snake.preload();
    this.apple2.preload();
  },


  create: function(){
    game.stage.backgroundColor = '#061f27';
    this.snake.create(150,150);
    this.apple2.create();
  },

  update: function(){
    this.snake.update();

  }
}
