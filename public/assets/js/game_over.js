var Game_over = {

  preload: function(){
    game.load.image('game_over',"./assets/images/gameover.png");
  },

  create: function(){
    this.add.button(0,0,'game_over',this.restartGame);
    game.add.text(230,340,"Score: " + score,{font: "36px Arial",
      fill: "#00c4ff",
      align: "center"
    });
  },

  restartGame: function(){
    game.state.start('Game');
  }
};
