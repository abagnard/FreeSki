import MovingObject from './moving_object';


export class Nature extends MovingObject {
  constructor(){
    super();
    this.initialPos = this.pos;
    this.direction = "down";
  }
  resetPosition(){
    if (this.direction === "down"){
      this.pos.x = this.initialPos.x;
      this.pos.y = 901;
    } else if (this.direction === "left"){
      this.pos.x = 0;
      this.pos.y = this.initialPos.y;
    } else if (this.direction === "right") {
      this.pos.x = 900;
      this.pos.y = this.initialPos.y;
    }
  }
}



export class Tree extends Nature {
  constructor(){
    super();
    this.color = "#7efa0a";
  }
}

export class Rock extends Nature {
  constructor(){
    super();
    this.color = "#aaa";
  }
}
