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
    this.pos.x, this.pos.y, this.height, this.width
    );
  }

  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, this.height, this.width);
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
    this.pos.x, this.pos.y, this.height, this.width
    );
  }

  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, this.height, this.width);
  }
}

// export class Snow extends MovingObject {
//   constructor(){
//     super();
//     // this.smallSnow = new Image();
//     this.medSnow = new Image();
//     // this.largeSnow = new Image();
//
//     // this.smallSnow = 'images/natureObj.png';
//     this.medSnow.src = 'images/natureObj.png';
//     // this.largeSnow = 'images/natureObj.png';
//   }
//
//   draw(ctx){
//     ctx.drawImage(
//       this.medSnow,
//       181, 27, 20, 77,
//       this.pos.x, this.pos.y, 20, 77
//     );
//   }
//
//   clear(ctx){
//     ctx.clearRect(this.pos.x, this.pos.y, 20, 77);
//   }
// }
