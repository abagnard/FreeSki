import MovingObject from './moving_object';


export class Nature extends MovingObject {
  constructor(){
    super();
    this.initialPos = this.pos;
  }
  resetPosition(){
    this.pos = this.initialPos;
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
