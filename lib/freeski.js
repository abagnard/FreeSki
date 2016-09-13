const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas");
  window.game = new Game(canvas);
});

// window.game.setUpGame();
