import MovingObject from './moving_object';

export class Tree extends MovingObject {
  constructor(){
    super();
    this.tree = new Image();
    this.tree.src = 'images/natureObj.png';
    this.height = 31;
    this.width = 34;
  }

  draw(ctx){
    ctx.drawImage(
    this.tree,
    0, 29, this.height, this.width,
    this.pos.x, this.pos.y, this.height * .8, this.width * .8
    );
  }

  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, this.height * .8, this.width * .8);
  }
}

export class BigTree extends MovingObject {
  constructor(){
    super();
    this.bigTree = new Image();
    this.bigTree.src = 'images/natureObj.png';
    this.height = 33;
    this.width = 64;
  }

  draw(ctx){
    ctx.drawImage(
    this.bigTree,
    94, 66, this.height, this.width,
    this.pos.x, this.pos.y, this.height * .8, this.width * .8
    );
  }

  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, this.height * .8, this.width * .8);
  }
}


export class Rock extends MovingObject {
  constructor(){
    super();
    this.rock = new Image();
    this.rock.src = 'images/natureObj.png';
    this.height = 27;
    this.width = 14;
  }

  draw(ctx){
    ctx.drawImage(
    this.rock,
    29, 49, this.height, this.width,
    this.pos.x, this.pos.y, this.height * .8, this.width * .8
    );
  }

  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, this.height * .8, this.width * .8);
  }
}

export class Snow extends MovingObject {
  constructor(){
    super();
    this.snow = new Image();
    this.snow.src = 'images/natureObj.png';
    this.height = 77;
    this.width = 20;
  }

  draw(ctx){
    ctx.drawImage(
    this.snow,
    181, 27, this.height, this.width,
    this.pos.x, this.pos.y, this.height * .8, this.width * .8
    );
  }

  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, this.height * .8, this.width * .8);
  }
}
