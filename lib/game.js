import MovingObject from './moving_object';
import { Tree, Rock } from './nature';
import Skier from './skier';



class Game {
  constructor(ctx) {
    this.dimX = 800;
    this.dimY = 900;
    this.ctx = ctx;

    this.playing = true;
    this.collision = false;
    this.startTime = Date.now();
    this.timeElapsed = 0;

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
        this.skier.moveLeft(this.ctx);
        this.natureObjs.forEach(obj => {
          obj.moveLeft(this.ctx);
        });
        this.checkCollisions();
      }
    } );
    key('down', () =>  {
      if(this.playing === true){
        this.skier.moveDown(this.ctx);
        this.natureObjs.forEach(obj => {
          obj.moveDown(this.ctx);
        });
        this.checkCollisions();
      }
    } );
    key('right', () =>  {
      if(this.playing === true){
        this.skier.moveRight(this.ctx);
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
    this.playing = true;
    this.skier.lives = 3;
    this.updateSkierLives();
    this.skier.clear(this.ctx);
    this.skier.resetPosition();
    this.natureObjs.forEach(obj => {
      obj.clear(this.ctx);
      obj.velocity = {x: 0, y: 0};
      // obj.resetPosition();
    });
    this.natureObjs = [];
  }

  setGame() {
    this.skier.draw(this.ctx);
    this.addNatureObjs();
    this.natureObjs.forEach (obj => {
      obj.draw(this.ctx);
    });
    this.startTime = Date.now();
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
        this.skier.falls(this.ctx);
        this.pause();
        setTimeout(this.pause.bind(this), 1500);
        this.skier.lives -= 1;
        this.updateSkierLives();
      }
    });
  }

  updateTime(){
    var delta = Date.now() - this.startTime;
    this.timeElapsed = Math.floor(delta / 1000);
    let parent = document.getElementById("time");
    parent.innerHTML = this.timeElapsed;
  }


  updateSkierLives(){
    let parent = document.getElementById("lives");
    parent.innerHTML = this.skier.lives;
  }


  play(){
    if (this.playing === false){
      return;
    }

    if (this.collision && this.skier.lives === 0){
      alert("GAME OVER");
      this.newGame();
    // } else if (this.timeElapsed >= 100 && this.skier.lives > 0){
    //   //  alert("YOU WON");
    //    this.newGame();
    } else if (this.collision && this.skier.lives > 0){
      // console.log(this.skier.lives);
      this.skier.clear(this.ctx);
      this.skier.resetPosition();
      this.skier.draw(this.ctx);
      this.collision = false;
    }
    this.natureObjs.forEach( obj => {
      obj.clear(this.ctx);
      obj.move();
      obj.wrap();
      obj.draw(this.ctx);
    });
    this.skier.clear(this.ctx);
    this.skier.draw(this.ctx);
    this.updateTime();
    window.requestAnimationFrame(this.play);
  }


}


module.exports = Game;
