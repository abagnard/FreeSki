import MovingObject from './moving_object';
import { Tree, Rock } from './nature';
import Skier from './skier';


Game.NUM_TREES = 50;
Game.NUM_ROCKS = 10;

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimX = 800;
    this.dimY = 900;

    this.gameOver = false;
    this.playing = true;
    this.collision = false;

    this.natureObjs = [];

    this.setGame();

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.newGame = this.newGame.bind(this);
    this.setGame = this.setGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);

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
    this.skier.reset();
    this.natureObjs.forEach(obj => {
      obj.clear(this.ctx);
      obj.reset();
    });
    this.natureObjs = [];
  }

  setGame() {
    this.skier = new Skier;
    this.natureObjs.push(this.skier);
    this.addNatureObjs();
    this.natureObjs.forEach (obj => {
      obj.draw(this.ctx);
    });
    this.play();
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
    for (let i = 0; i < this.NUM_TREES; i++) {
      this.natureObjs.push(new Tree);
    }

    for(let i = 0; i < this.NUM_ROCKS; i++) {
      this.natureObjs.push(new Rock);
    }
  }

  checkCollisions(){
    this.natureObjs.forEach( obj =>{
      if(this.skier.collision(obj) && this.collision === false){
        this.collision = true;
        this.skier.lives -= 1;
        this.skier.falls();
      }
    });
  }


  play(){
    if (this.playing === false){
      return;
    }
    if (this.collision && this.skier.lives === 0){
      alert("GAME OVER");
      this.playing = false;
      this.gameover = true;
      this.resetGame();
    } else if (this.collision && this.skier.lives > 0){
      console.log(this.skier.lives);
      this.skier.clear(this.ctx);
      this.skier.reset();
      this.skier.move();
      this.skier.draw(this.ctx);
    }
    this.natureObjs.forEach( obj => {
      obj.clear(this.ctx);
      obj.move();
      obj.draw(this.ctx);
      this.collision = false;
    });
    window.requestAnimationFrame(this.play);
  }
}


export default Game;
