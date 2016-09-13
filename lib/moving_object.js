

class MovingObject {
  constructor(){
    this.pos = this.randomPosition();
    this.velocity = {x: 0, y: 0};
    this.width = 25;
    this.height = 25;
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
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
  }


  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  move(){
      this.pos.x = this.pos.x + this.velocity.x;
      this.pos.y = this.pos.y + this.velocity.y;
  }

  moveRight(ctx){
    this.velocity.x = -10;
    this.velocity.y = -10;
    this.clear(ctx);
    this.move();
    this.draw(ctx);
  }

  moveLeft(ctx){
    this.velocity.x = 10;
    this.velocity.y = -10;
    this.clear(ctx);
    this.move();
    this.draw(ctx);
  }

  moveDown(ctx){
    this.velocity.x = 0;
    this.velocity.y = -10;
    this.clear(ctx);
    this.move();
    this.draw(ctx);
  }

  collision(otherObject){
    if (this.pos.x < otherObject.pos.x + otherObject.width &&
       this.pos.x + this.width > otherObject.pos.x &&
       this.pos.y < otherObject.pos.y + otherObject.height &&
       this.height + this.pos.y > otherObject.pos.y) {
         return true;
    }
  }

}

export default MovingObject;
