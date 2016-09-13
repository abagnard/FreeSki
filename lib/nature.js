import MovingObject from './moving_object';


export class Nature extends MovingObject {
  constructor(options = {}){
    super();
    this.initialPos = options.pos;
    this.pos = options.pos;
  }
  reset(){
    this.pos = this.initialPos;
  }
}



export class Tree extends Nature {
  constructor(options={}){
    super();
    this.color = "#7efa0a";
  }
}

export class Rock extends Nature {
  constructor(options={}){
    super();
    this.color = "#7efa0a";
  }
}
