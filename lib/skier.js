import MovingObject from './moving_object';

class Skier extends MovingObject {
  constructor(){
    super();
    this.pos = {x: 400, y: 200};
    this.velocity = {x: 0, y: 0};
    this.color = "#f6fa0a";
    this.lives = 3;
  }

  reset(){
    this.color = "#f6fa0a";
  }

  falls(ctx){
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


}

export default Skier;
