

class Skier {
  constructor(){
    this.pos = {x: 400, y: 200};
    this.velocity = {x: 0, y: 0};
    this.lives = 3;
    this.direction = "stoped";
    this.sitTimout = "";
    this.skierImg = new Image();
    this.startX = 0;
    this.startY = 0;
    this.width = 0;
    this.height = 0;
  }

  draw(ctx){
      ctx.drawImage(
        this.skierImg,
        this.startX, this.startY, this.width, this.height,
        this.pos.x, this.pos.y, this.width, this.height
      );
  }

  clear(ctx){
    ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
  }


  resetPosition(ctx){
    this.pos = {x: 400, y: 200};
    this.direction = "stoped";
    clearTimeout(this.sitTimout);

    this.skierImg.src = 'images/skier.png';
    this.startX = 0;
    this.startY = 0;
    this.width = 24;
    this.height = 35;

    // this.clear(ctx);
    // this.draw(ctx);
  }

  falls(ctx){
    this.direction = "fallen";
    this.clear(ctx);

    this.skierImg.src = 'images/skier.png';
    this.startX = 241;
    this.startY = 1;
    this.width = 30;
    this.height = 33;

    this.draw(ctx);
    this.sitTimout = setTimeout(this.sitting.bind(this, ctx), 1000);
  }

  sitting(ctx){
    this.clear(ctx);
    this.skierImg.src = 'images/skier.png';
    this.startX = 0;
    this.startY = 39;
    this.width = 32;
    this.height = 29;

    this.draw(ctx);
  }

  moveRight(ctx){
    this.direction = "right";
    this.clear(ctx);

    this.skierImg.src = 'images/skier.png';
    this.startX = 23;
    this.startY = 0;
    this.width = 26;
    this.height = 34;

    this.draw(ctx);
  }


  moveLeft(ctx){
    this.direction = "left";
    this.clear(ctx);

    this.skierImg.src = 'images/skier_reverse.png';
    this.startX = 224;
    this.startY = 0;
    this.width = 26;
    this.height = 34;

    this.draw(ctx);
  }


  moveDown(ctx){
    this.direction = "down";
    this.clear(ctx);

    this.skierImg.src = 'images/skier.png';
    this.startX = 65;
    this.startY = 0;
    this.width = 18;
    this.height = 34;

    this.draw(ctx);
  }


  collision(otherObject){
    if (this.pos.x < otherObject.pos.x + otherObject.width - 5 && this.pos.x + this.width  > otherObject.pos.x + 5 &&
		this.pos.y < otherObject.pos.y + otherObject.height + 20 && this.pos.y + this.height > otherObject.pos.y + 20) {
      return true;
    } else {
      return false;
    }
  }


}

export default Skier;
