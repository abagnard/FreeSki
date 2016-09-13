

class Skier {
  constructor(){
    this.width = 25;
    this.height = 25;
    this.pos = {x: 400, y: 200};
    this.velocity = {x: 0, y: 0};
    this.color = "#f6fa0a";
    this.lives = 3;
  }

  resetPosition(){
    this.color = "#f6fa0a";
  }

  draw(ctx){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  falls(ctx){
    this.lives -= 1;
    this.color = "#000000";
    this.clear(ctx);
    this.draw(ctx);
  }

  moveRight(ctx){
    this.color = "#0af6fa";
    this.clear(ctx);
    this.draw(ctx);
  }

  moveLeft(ctx){
    this.color = "#7efa0a";
    this.clear(ctx);
    this.draw(ctx);
  }

  moveDown(ctx){
    this.color = "#fa0a7e";
    this.clear(ctx);
    this.draw(ctx);
  }

  collision(otherObject){
    if (this.pos.x === otherObject.pos.x && this.pos.y === otherObject.pos.y) {
      return true;
    }
  }


}

export default Skier;
