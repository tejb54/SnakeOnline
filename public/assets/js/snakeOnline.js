function snakeOnlineObj()
{
  var snakeParts = [];
  var snakeId = -1;

  this.preload = function(){
    //game.load.image('snakeOnline',"./assets/images/snake.png");
  };

  this.create = function(){

    for (var i = 0; i < 10; i++) {
       snakeParts[i] = game.add.sprite(150 + (i*15),150,'snakeObj');
    }

  };

  this.getId = function(){
    return snakeId;
  };

  this.setId = function(id){
    snakeId = id;
  };

  this.update = function(new_direction){
    if(new_direction != this.direction){
      this.direction = new_direction;
    }

    var firstCell = snakeParts[snakeParts.length - 1];
    var lastCell = snakeParts.shift();

    if(this.direction == 'right')
    {
      lastCell.x = firstCell.x +15;
      lastCell.y = firstCell.y;
    }
    else if (this.direction == 'left') {
      lastCell.x = firstCell.x - 15;
      lastCell.y = firstCell.y;
    }
    else if (this.direction == 'up') {
      lastCell.x = firstCell.x;
      lastCell.y = firstCell.y -15;
    }
    else if (this.direction == 'down') {
      lastCell.x = firstCell.x;
      lastCell.y = firstCell.y +15;
    }

    if(lastCell.x >= 600){
      lastCell.x = 0;
    }
    else if(lastCell.x < 0){
      lastCell.x = 600;
    }
    else if(lastCell.y < 0){
      lastCell.y = 450;
    }
    else if(lastCell.y >= 450){
      lastCell.y = 0;
    }

    snakeParts.push(lastCell);
    firstCell = lastCell;
  };

  this.update2 = function(data){
    for (var i = 0; i < 10; i++) {
       snakeParts[i].x = data[i].x;
       snakeParts[i].y = data[i].y;
    }
  };
}
