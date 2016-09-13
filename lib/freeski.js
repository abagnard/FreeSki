const Game = require("./game");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsById("canvas");
  window.game = new Game(canvas);
  window.game.setGame();
});
