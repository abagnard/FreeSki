import MovingObject from './moving_object';
import { Tree, Rock } from './nature';
import Skier from './skier';



class Game {
  constructor(ctx) {
    this.dimX = 800;
    this.dimY = 900;
    this.ctx = ctx;

    this.playing = true;
    this.gameOver = false;
    this.collision = false;

    this.skier = new Skier;
    this.natureObjs = [];

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.newGame = this.newGame.bind(this);
    this.setGame = this.setGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.updateSkierLives = this.updateSkierLives.bind(this);

    this.setGame();

    key('space', () =>  {
      this.pause();
    } );

    key('left', () =>  {
      if(this.playing === true){
        this.natureObjs.forEach(obj => {
          obj.moveLeft(this.ctx);
        });
        this.checkCollisions();
      }
    } );
    key('down', () =>  {
      if(this.playing === true){
        this.natureObjs.forEach(obj => {
          obj.moveDown(this.ctx);
        });
        this.checkCollisions();
      }
    } );
    key('right', () =>  {
      if(this.playing === true){
        this.natureObjs.forEach(obj => {
          obj.moveRight(this.ctx);
        });
        this.checkCollisions();
      }
    });
  }


  newGame() {
    this.resetGame();
    this.setGame();
    this.play();
  }

  resetGame() {
    this.skier.clear(this.ctx);
    this.skier.resetPosition();
    this.natureObjs.forEach(obj => {
      obj.clear(this.ctx);
      obj.resetPosition();
    });
    this.natureObjs = [];
  }

  setGame() {
    this.skier = new Skier;
    this.updateSkierLives();
    this.skier.draw(this.ctx);
    this.addNatureObjs();
    this.natureObjs.forEach (obj => {
      obj.draw(this.ctx);
    });
  }

  pause() {
    if (this.playing === true) {
      this.playing = false;
    } else {
      this.playing = true;
      this.play();
    }
  }

  addNatureObjs() {
    for (let i = 0; i < 20; i++) {
      this.natureObjs.push(new Tree);
    }

    for(let i = 0; i < 5; i++) {
      this.natureObjs.push(new Rock);
    }
  }

  checkCollisions(){
    this.natureObjs.find( obj =>{
      if(this.skier.collision(obj) && this.collision === false){
        this.collision = true;
        this.skier.lives -= 1;
      }
    });
  }

  wrap(object){
    if((object.pos.y < 0) || (object.pos.x > this.dimX) || (object.pos.x < 0)){
      object.resetPosition();
    }
  }

  updateSkierLives(){
    let parent = document.getElementById("lives");
    parent.innerHTML = this.skier.lives;
  }


  play(){
    if (this.playing === false){
      return;
    } else {
      console.log("playing game!");
    }
    if (this.collision && this.skier.lives === 0){
      alert("GAME OVER");
      this.playing = false;
      this.gameover = true;
      this.resetGame();
    } else if (this.collision && this.skier.lives > 0){
      console.log(this.skier.lives);
      this.updateSkierLives();
      this.skier.clear(this.ctx);
      this.skier.resetPosition();
      this.skier.draw(this.ctx);
      this.collision = false;
    }
    this.natureObjs.forEach( obj => {
      obj.clear(this.ctx);
      obj.move();
      this.wrap(obj);
      obj.draw(this.ctx);
    });
    this.skier.clear(this.ctx);
    this.skier.draw(this.ctx);
    window.requestAnimationFrame(this.play);
  }


}


module.exports = Game;
