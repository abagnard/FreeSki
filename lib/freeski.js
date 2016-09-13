const Game = require("./game");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvasEl");
  const ctx = canvas.getContext("2d");
  window.game = new Game(ctx);
  window.game.newGame();
});
