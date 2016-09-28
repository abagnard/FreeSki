import MovingObject from './moving_object';
import { Tree, BigTree, Rock, Snow } from './nature';
import Skier from './skier';



class Game {
  constructor(ctx) {
    this.dimX = 500;
    this.dimY = 590;
    this.ctx = ctx;

    this.playing = true;
    this.gameOver = false;
    this.collision = false;
    // this.startTime = Date.now();
    this.startTime = 0;
    this.pauseTime = 0;
    this.pauseStart = 0;
    this.pauseEnd = 0;
    this.timeElapsed = 0;

    this.skier = new Skier;
    this.natureObjs = [];
    this.hitObjs = [];
    this.snowObjs = [];
    this.allObjs = [];


    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.newGame = this.newGame.bind(this);
    this.setGame = this.setGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.checkStart = this.checkStart.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.updateSkierLives = this.updateSkierLives.bind(this);
    this.showWinModal = this.showWinModal.bind(this);
    this.showGameOverModal = this.showGameOverModal.bind(this);



    this.setGame();

    key('space', () =>  {
      this.checkStart();
      if(this.skier.direction !== "fallen"){
        this.pause();
      }
      return false;
    } );

    key('left', () =>  {
        clearTimeout(this.skier.sitTimout);
        this.checkStart();
        this.skier.moveLeft(this.ctx);
        this.allObjs.forEach(obj => {
          obj.moveLeft(this.ctx);
        });
        if(this.playing === false){ this.pause();}
        return false;
    } );
    key('down', () =>  {
        clearTimeout(this.skier.sitTimout);
        this.checkStart();
        this.skier.moveDown(this.ctx);
        this.allObjs.forEach(obj => {
          obj.moveDown(this.ctx);
        });
        if(this.playing === false){ this.pause();}
      // this.checkCollisions();
      return false;
    } );
    key('right', () =>  {
      // if(this.playing === true){
        clearTimeout(this.skier.sitTimout);
        this.checkStart();
        this.skier.moveRight(this.ctx);
        this.allObjs.forEach(obj => {
          obj.moveRight(this.ctx);
        });
        if(this.playing === false){ this.pause();}
        return false;
      // }
    });
  }


  newGame() {
    this.resetGame();
    this.pause();
    setTimeout(this.pause.bind(this), 50);
    this.setGame();
    // this.play();
  }

  resetGame() {

    this.playing = true;
    this.gameOver = false;
    this.skier.lives = 3;
    this.timeElapsed = 0;
    this.startTime = 0;
    this.pauseTime = 0;
    this.pauseStart = 0;
    this.pauseEnd = 0;
    this.skier.clear(this.ctx);
    this.skier.resetPosition(this.ctx);
    this.allObjs.forEach(obj => {
      obj.resetPosition();
      obj.clear(this.ctx);
    });
    this.natureObjs = [];
    this.snowObjs = [];
    this.allObjs = [];
  }

  setGame() {
    this.updateSkierLives();
    this.skier.draw(this.ctx);
    this.addNatureObjs();
    this.allObjs = this.snowObjs.concat(this.natureObjs);
    this.allObjs.forEach (obj => {
      obj.draw(this.ctx);
    });
  }

  pause() {
    if (this.playing === true) {
      this.playing = false;
      this.pauseStart = Date.now();
    } else {
      this.playing = true;
      this.pauseEnd = Date.now();
      if (this.pauseStart !== 0){
        this.pauseTime = this.pauseEnd - this.pauseStart;
      }
      this.pauseEnd = 0;
      this.pauseStart = 0;
      this.play();
    }
  }

  checkStart(){
    if(this.startTime === 0) {
      this.startTime = Date.now();
      this.pauseTime = 0;
      this.pauseStart = 0;
      this.pauseEnd = 0;
    }
  }

  addNatureObjs() {
    for (let i = 0; i < 10; i++) {
      this.natureObjs.push(new BigTree);
    }

    for (let i = 0; i < 10; i++) {
      this.natureObjs.push(new Tree);
    }

    for(let i = 0; i < 5; i++) {
      this.natureObjs.push(new Rock);
    }

    for(let i =0; i < 12; i++){
      this.snowObjs.push(new Snow);
    }
  }

  checkCollisions(){
    this.natureObjs.find( obj =>{
      if(this.skier.collision(obj) && this.collision === false){
        if (this.hitObjs.length === 0 || this.hitObjs[this.hitObjs.length - 1].pos !== obj.pos) {
          this.hitObjs.push(obj);
          this.collision = true;
          this.pause();
          this.updateSkier();
        }
      }
    });
  }

  updateSkier(){
    this.skier.lives -= 1;
    this.updateSkierLives();
    this.skier.falls(this.ctx);
  }

  updateTime(){
    if(this.startTime === 0) {
      this.timeElapsed = 0;
    } else {
      this.startTime += this.pauseTime;
      var delta = Date.now() - this.startTime;
      this.timeElapsed = Math.floor(delta / 1000);
    }
    this.pauseTime = 0;
    let parent = document.getElementById("time");
    parent.innerHTML = this.timeElapsed;
  }


  updateSkierLives(){
    let parent = document.getElementById("lives");
    parent.innerHTML = this.skier.lives;
  }

  showWinModal(){
    this.pause();
    let overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    let winModal = document.querySelector(".winModal");
    winModal.style.display = "block";
    let infoModal = document.querySelector(".modal");
    infoModal.style.display ="none";
    let gameOverModal = document.querySelector(".gameOver");
    gameOverModal.style.display = "none";
    let pauseModal = document.querySelector(".pauseModal");
    pauseModal.style.display = "none";
  }

  showGameOverModal(){
      let overlay = document.querySelector(".overlay");
      overlay.style.display = "block";
      let gameOverModal = document.querySelector(".gameOver");
      gameOverModal.style.display = "block";
      let winModal = document.querySelector(".winModal");
      winModal.style.display = "none";
      let infoModal = document.querySelector(".modal");
      infoModal.style.display ="none";
      let pauseModal = document.querySelector(".pauseModal");
      pauseModal.style.display = "none";
    }


  play(){
    if(this.skier.lives === 0){
      this.newGame();
      this.gameOver = true;
      this.showGameOverModal();
    } else if (this.playing === false || this.gameOver === true){
      return;
    } else if (this.timeElapsed === 60 && this.skier.lives > 0 && this.gameOver === false){
      this.gameOver = true;
      this.showWinModal();
    } else if (this.collision && this.skier.lives > 0){
      this.skier.clear(this.ctx);
      this.skier.draw(this.ctx);
      this.collision = false;
    }
    this.allObjs.forEach( obj => {
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
