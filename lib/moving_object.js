
class MovingObject {
  constructor(){
    this.pos = this.randomPosition();
    this.initialPos = this.pos;
    this.velocity = {x: 0, y: 0};
  }


  randomPosition(){
    let yVal = 200;
    let xVal = 400;
    while (!(yVal > 400 || xVal < 200 || xVal > 600)){
      xVal = Math.floor(800 * Math.random());
      yVal = Math.floor(800 * Math.random());
    }
    return {x: xVal, y: yVal};
  }

  resetPosition(){
    this.pos = this.initialPos;
    this.velocity = {x: 0, y:0};
  }

  wrappedCord(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }

  wrap(){
    this.pos.x = this.wrappedCord(this.pos.x, 800);
    this.pos.y = this.wrappedCord(this.pos.y, 900);
  }

  move(){
    this.pos.x = this.pos.x + this.velocity.x;
    this.pos.y = this.pos.y + this.velocity.y;
  }

  moveRight(ctx){
    this.velocity.x = -5;
    this.velocity.y = -5;
    this.clear(ctx);
    this.move();
    this.draw(ctx);
  }

  moveLeft(ctx){
    this.velocity.x = 5;
    this.velocity.y = -5;
    this.clear(ctx);
    this.move();
    this.draw(ctx);
  }

  moveDown(ctx){
    this.velocity.x = 0;
    this.velocity.y = -5;
    this.clear(ctx);
    this.move();
    this.draw(ctx);
  }

  crashedInto(ctx){
    this.velocity.x = 0;
    this.velocity.y = -20;
    this.clear(ctx);
    this.move();
    this.draw(ctx);
  }


}

export default MovingObject;
