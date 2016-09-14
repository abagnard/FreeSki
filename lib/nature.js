import MovingObject from './moving_object';

export class Tree extends MovingObject {
  constructor(){
    super();
    this.color = "#7efa0a";
  }
}

export class Rock extends MovingObject {
  constructor(){
    super();
    this.color = "#aaa";
  }
}
