import MovingObject from './moving_object';

export class Tree extends MovingObject {
  constructor(){
    super();
    this.color = "#7efa0a";
    this.tree = new Image();
    this.tree.src = 'images/natureObj.png';
  }

  draw(ctx){
    ctx.drawImage(
    this.tree,
    0, 29, 31, 34,
    this.pos.x, this.pos.y, 31, 34
    );
  }

  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, 31, 34);
  }
}

export class Rock extends MovingObject {
  constructor(){
    super();
    this.color = "#aaa";
    this.rock = new Image();
    this.rock.src = 'images/natureObj.png';
  }

  draw(ctx){
    ctx.drawImage(
    this.rock,
    29, 49, 27, 14,
    this.pos.x, this.pos.y, 27, 14
    );
  }

  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, 27, 14);
  }
}
