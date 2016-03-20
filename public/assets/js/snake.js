function snakeObj(apple, callback, callbackApple){

  this.snakeParts = [];
  this.direction = 'right';
  this.new_direction = null;
  this.cursors = game.input.keyboard.createCursorKeys();
  this.timer = 0;
  this.apple = apple;
  this.callback = callback;
  this.callbackApple = callbackApple;
  this.speed = 0;
  this.numberOfApplesCollected = 0;

  this.preload = function(){
    game.load.image('snakeObj',"./assets/images/snake.png");
  };

  this.create = function(x, y){
    for (var i = 0; i < 10; i++) {
      this.snakeParts[i] = game.add.sprite(x +(i*15),y,'snakeObj');
    }
  };

  this.update = function(){
    //check input
    this.checkInput();

    //timer used to slow the game down
    this.timer++;
    if(this.timer >= (10 - this.speed)){
      this.timer = 0;

      //move the snake
      this.move();

      //check collision for this snake
      this.collision();
    }
  };

  this.checkInput = function(){


    if (this.cursors.up.isDown) {
      if(this.direction !== 'down'){
        this.new_direction = 'up';
      }
    }
    if (this.cursors.down.isDown) {
      if(this.direction !== 'up'){
        this.new_direction = 'down';
      }
    }
    if (this.cursors.left.isDown) {
      if(this.direction !== 'right'){
        this.new_direction = 'left';
      }
    }
    if (this.cursors.right.isDown) {
      if(this.direction !== 'left'){
        this.new_direction = 'right';
      }
    }
  };

  this.move = function(){

    if(this.new_direction){
      this.direction = this.new_direction;
      this.new_direction = null;
    }

    this.firstCell = this.snakeParts[this.snakeParts.length - 1];
    var lastCell = this.snakeParts.shift();

    if(this.direction == 'right')
    {
      lastCell.x = this.firstCell.x +15;
      lastCell.y = this.firstCell.y;
    }
    else if (this.direction == 'left') {
      lastCell.x = this.firstCell.x - 15;
      lastCell.y = this.firstCell.y;
    }
    else if (this.direction == 'up') {
      lastCell.x = this.firstCell.x;
      lastCell.y = this.firstCell.y -15;
    }
    else if (this.direction == 'down') {
      lastCell.x = this.firstCell.x;
      lastCell.y = this.firstCell.y +15;
    }

    this.snakeParts.push(lastCell);
    this.firstCell = lastCell;

  };

  this.collision = function(){
    var head = this.snakeParts[this.snakeParts.length -1];

    //collision with itself
    for (var i = 0; i < this.snakeParts.length -1; i++) {
      if(head.x == this.snakeParts[i].x && head.y == this.snakeParts[i].y)
      {
        this.callback();
      }
    }

    //collision with walls
    if(head.x < 0 || head.x >= 600 || head.y < 0 || head.y >= 450)
    {
      if(head.x < 0){
        head.x = 600;
      }
      else if(head.x >= 600) {
        head.x = 0;
      }
      else if (head.y < 0) {
        head.y = 450;
      }
      else if (head.y >= 450) {
        head.y = 0;
      }
    }

    //collision with apple
    if(head.x == this.apple.sprite.x && head.y == this.apple.sprite.y)
    {
      if(this.numberOfApplesCollected%2 == 0)
      {
        this.snakeParts.unshift(game.add.sprite(this.firstCell.x,this.firstCell.y,'snakeObj'));
      }


      this.callbackApple();
      this.numberOfApplesCollected++;
      this.speed = Math.floor(this.numberOfApplesCollected/5);

      this.apple.generateApple();
    }

  };


};
