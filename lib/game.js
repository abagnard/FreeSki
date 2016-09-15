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
    this.pauseTime = 0;
    this.pauseStart = 0;
    this.pauseEnd = 0;
    this.timeElapsed = 0;

    this.skier = new Skier;
    this.natureObjs = [];
    this.hitObjs = [];
    // this.snowObjs = [];


    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.newGame = this.newGame.bind(this);
    this.setGame = this.setGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.updateSkierLives = this.updateSkierLives.bind(this);


    this.setGame();

    key('space', () =>  {
      if(this.skier.direction !== "fallen"){
        this.pause();
      }
      return false;
    } );

    key('left', () =>  {
        clearTimeout(this.skier.sitTimout);
        this.skier.moveLeft(this.ctx);
        this.natureObjs.forEach(obj => {
          obj.moveLeft(this.ctx);
        });
        if(this.playing === false){ this.pause();}
        return false;
    } );
    key('down', () =>  {
        clearTimeout(this.skier.sitTimout);
        this.skier.moveDown(this.ctx);
        this.natureObjs.forEach(obj => {
          obj.moveDown(this.ctx);
        });
        if(this.playing === false){ this.pause();}
      // this.checkCollisions();
      return false;
    } );
    key('right', () =>  {
      // if(this.playing === true){
        clearTimeout(this.skier.sitTimout);
        this.skier.moveRight(this.ctx);
        this.natureObjs.forEach(obj => {
          obj.moveRight(this.ctx);
        });
        if(this.playing === false){ this.pause();}
        return false;
      // }
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
    this.timeElapsed = 0;
    this.pauseTime = 0;
    this.pauseStart = 0;
    this.pauseEnd = 0;
    this.skier.clear(this.ctx);
    this.skier.resetPosition(this.ctx);
    // this.snowObjs.forEach(obj => {
    //   obj.clear(this.ctx);
    // });
    this.natureObjs.forEach(obj => {
      obj.clear(this.ctx);
    });
    this.natureObjs = [];
    // this.snowObjs = [];
  }

  setGame() {
    this.updateSkierLives();
    this.skier.draw(this.ctx);
    // this.addSnowObjs();
    // this.snowObjs.forEach (obj => {
    //   obj.draw(this.ctx);
    // });
    this.addNatureObjs();
    this.natureObjs.forEach (obj => {
      obj.draw(this.ctx);
    });
    this.startTime = Date.now();
  }

  pause() {
    if (this.playing === true) {
      this.playing = false;
      this.pauseStart = Date.now();
    } else {
      this.playing = true;
      this.pauseEnd = Date.now();
      this.pauseTime = this.pauseEnd - this.pauseStart;
      this.pauseEnd = 0;
      this.pauseStart = 0;
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

  // addSnowObjs(){
  //   for(let i =0; i < 10; i++){
  //     this.snowObjs.push(new Snow);
  //   }
  // }

  checkCollisions(){
    this.natureObjs.find( obj =>{
      if(this.skier.collision(obj) && this.collision === false){
        if (this.hitObjs.length === 0 || this.hitObjs[this.hitObjs.length - 1].pos !== obj.pos) {
          this.hitObjs.push(obj);
          this.collision = true;
          this.pause();
          // obj.crashedInto();
          // this.startTime = Date.now();

          this.updateSkier();

          // this.updateObj(obj);
          // setTimeout(this.pause.bind(this), 1500);
        }

      }
    });
  }

  updateSkier(){

    this.skier.lives -= 1;
    this.updateSkierLives();
    this.skier.falls(this.ctx);
    // this.updateSkierLives();
    // this.skier.falls(this.ctx);
    // this.skier.resetPosition();
  }

  // updateObj(object){
  //   this.natureObjs.splice(this.natureObjs.indexOf(object), 1);
  //   this.natureObjs.forEach( obj => {
  //     obj.clear(this.ctx);
  //     obj.draw(this.ctx);
  //   });
  // }

  updateTime(){
    var delta = Date.now() - this.startTime - this.pauseTime;
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
      // clearTimeout(this.skier.sitTimout);
      this.newGame();
    } else if (this.timeElapsed >= 100 && this.skier.lives > 0){
       alert("YOU WON");
      //  clearTimeout(this.skier.sitTimout);
       this.newGame();
    } else if (this.collision && this.skier.lives > 0){
      // console.log(this.skier.lives);
      this.skier.clear(this.ctx);
      this.skier.draw(this.ctx);
      // this.timeElapsed = 0;
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
    this.checkCollisions();
    this.updateTime();
    window.requestAnimationFrame(this.play);
  }


}


module.exports = Game;
