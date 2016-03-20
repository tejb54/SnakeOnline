function appleObj(){

  this.preload = function(){
    game.load.image('apple', "./assets/images/apple.png");
  };

  this.create = function(){
    this.generateApple();
  };

  this.generateApple = function(){
    var randomX = Math.floor(Math.random() * 40 ) * 15,
        randomY = Math.floor(Math.random() * 30 ) * 15;

        if(this.sprite == null){
          this.sprite = game.add.sprite(randomX, randomY, 'apple');
        }
        else {
          this.sprite.x = randomX;
          this.sprite.y = randomY;
        }
  };

}
