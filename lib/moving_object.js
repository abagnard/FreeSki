
class MovingObject {
  constructor(){
    this.pos = this.randomPosition();
    this.velocity = {x: 0, y: 0};
    this.width = 25;
    this.height = 25;
    this.direct = "down";
  }

  randomPosition(){
    return {
      x: 800 * Math.random(),
      y: 900 * Math.random()
    };
  }


  draw(ctx){
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }


  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  move(){
      this.pos.x = this.pos.x + this.velocity.x;
      this.pos.y = this.pos.y + this.velocity.y;
  }

  moveRight(ctx){
    this.direction = "right";
    this.velocity.x = -5;
    this.velocity.y = -5;
    this.clear(ctx);
    this.move();
    this.draw(ctx);
  }

  moveLeft(ctx){
    this.directon = "left";
    this.velocity.x = 5;
    this.velocity.y = -5;
    this.clear(ctx);
    this.move();
    this.draw(ctx);
  }

  moveDown(ctx){
    this.direction = "down";
    this.velocity.x = 0;
    this.velocity.y = -5;
    this.clear(ctx);
    this.move();
    this.draw(ctx);
  }


}

export default MovingObject;
