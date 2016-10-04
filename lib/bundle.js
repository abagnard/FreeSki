/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("canvasEl");
	  var ctx = canvas.getContext("2d");
	  window.game = new Game(ctx);
	  window.game.newGame();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(2);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _nature = __webpack_require__(3);
	
	var _skier = __webpack_require__(4);
	
	var _skier2 = _interopRequireDefault(_skier);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(ctx) {
	    var _this = this;
	
	    _classCallCheck(this, Game);
	
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
	
	    this.skier = new _skier2.default();
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
	
	    key('space', function () {
	      _this.checkStart();
	      if (_this.skier.direction !== "fallen") {
	        _this.pause();
	      }
	      return false;
	    });
	
	    key('left', function () {
	      clearTimeout(_this.skier.sitTimout);
	      _this.checkStart();
	      _this.skier.moveLeft(_this.ctx);
	      _this.allObjs.forEach(function (obj) {
	        obj.moveLeft(_this.ctx);
	      });
	      if (_this.playing === false) {
	        _this.pause();
	      }
	      return false;
	    });
	    key('down', function () {
	      clearTimeout(_this.skier.sitTimout);
	      _this.checkStart();
	      _this.skier.moveDown(_this.ctx);
	      _this.allObjs.forEach(function (obj) {
	        obj.moveDown(_this.ctx);
	      });
	      if (_this.playing === false) {
	        _this.pause();
	      }
	      // this.checkCollisions();
	      return false;
	    });
	    key('right', function () {
	      // if(this.playing === true){
	      clearTimeout(_this.skier.sitTimout);
	      _this.checkStart();
	      _this.skier.moveRight(_this.ctx);
	      _this.allObjs.forEach(function (obj) {
	        obj.moveRight(_this.ctx);
	      });
	      if (_this.playing === false) {
	        _this.pause();
	      }
	      return false;
	      // }
	    });
	  }
	
	  _createClass(Game, [{
	    key: 'newGame',
	    value: function newGame() {
	      this.resetGame();
	      this.pause();
	      setTimeout(this.pause.bind(this), 50);
	      this.setGame();
	      // this.play();
	    }
	  }, {
	    key: 'resetGame',
	    value: function resetGame() {
	      var _this2 = this;
	
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
	      this.allObjs.forEach(function (obj) {
	        obj.resetPosition();
	        obj.clear(_this2.ctx);
	      });
	      this.natureObjs = [];
	      this.snowObjs = [];
	      this.allObjs = [];
	    }
	  }, {
	    key: 'setGame',
	    value: function setGame() {
	      var _this3 = this;
	
	      this.updateSkierLives();
	      this.skier.draw(this.ctx);
	      this.addNatureObjs();
	      this.allObjs = this.snowObjs.concat(this.natureObjs);
	      this.allObjs.forEach(function (obj) {
	        obj.draw(_this3.ctx);
	      });
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (this.playing === true) {
	        this.playing = false;
	        this.pauseStart = Date.now();
	      } else {
	        this.playing = true;
	        this.pauseEnd = Date.now();
	        if (this.pauseStart !== 0) {
	          this.pauseTime = this.pauseEnd - this.pauseStart;
	        }
	        this.pauseEnd = 0;
	        this.pauseStart = 0;
	        this.play();
	      }
	    }
	  }, {
	    key: 'checkStart',
	    value: function checkStart() {
	      if (this.startTime === 0) {
	        this.startTime = Date.now();
	        this.pauseTime = 0;
	        this.pauseStart = 0;
	        this.pauseEnd = 0;
	      }
	    }
	  }, {
	    key: 'addNatureObjs',
	    value: function addNatureObjs() {
	      for (var i = 0; i < 10; i++) {
	        this.natureObjs.push(new _nature.BigTree());
	        this.natureObjs.push(new _nature.Tree());
	        this.natureObjs.push(new _nature.Rock());
	        this.snowObjs.push(new _nature.Snow());
	      }
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      var _this4 = this;
	
	      this.natureObjs.find(function (obj) {
	        if (_this4.skier.collision(obj) && _this4.collision === false) {
	          if (_this4.hitObjs.length === 0 || _this4.hitObjs[_this4.hitObjs.length - 1].pos !== obj.pos) {
	            _this4.hitObjs.push(obj);
	            _this4.collision = true;
	            _this4.pause();
	            _this4.updateSkier();
	          }
	        }
	      });
	    }
	  }, {
	    key: 'updateSkier',
	    value: function updateSkier() {
	      this.skier.lives -= 1;
	      this.updateSkierLives();
	      this.skier.falls(this.ctx);
	    }
	  }, {
	    key: 'updateTime',
	    value: function updateTime() {
	      if (this.startTime === 0) {
	        this.timeElapsed = 0;
	      } else {
	        this.startTime += this.pauseTime;
	        var delta = Date.now() - this.startTime;
	        this.timeElapsed = Math.floor(delta / 1000);
	      }
	      this.pauseTime = 0;
	      var parent = document.getElementById("time");
	      parent.innerHTML = this.timeElapsed;
	    }
	  }, {
	    key: 'updateSkierLives',
	    value: function updateSkierLives() {
	      var parent = document.getElementById("lives");
	      parent.innerHTML = this.skier.lives;
	    }
	  }, {
	    key: 'showWinModal',
	    value: function showWinModal() {
	      this.pause();
	      var overlay = document.querySelector(".overlay");
	      overlay.style.display = "block";
	      var winModal = document.querySelector(".winModal");
	      winModal.style.display = "block";
	      var infoModal = document.querySelector(".modal");
	      infoModal.style.display = "none";
	      var gameOverModal = document.querySelector(".gameOver");
	      gameOverModal.style.display = "none";
	      var pauseModal = document.querySelector(".pauseModal");
	      pauseModal.style.display = "none";
	    }
	  }, {
	    key: 'showGameOverModal',
	    value: function showGameOverModal() {
	      var overlay = document.querySelector(".overlay");
	      overlay.style.display = "block";
	      var gameOverModal = document.querySelector(".gameOver");
	      gameOverModal.style.display = "block";
	      var winModal = document.querySelector(".winModal");
	      winModal.style.display = "none";
	      var infoModal = document.querySelector(".modal");
	      infoModal.style.display = "none";
	      var pauseModal = document.querySelector(".pauseModal");
	      pauseModal.style.display = "none";
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      var _this5 = this;
	
	      if (this.skier.lives === 0) {
	        this.gameOver = true;
	        this.newGame();
	        this.showGameOverModal();
	      } else if (this.playing === false || this.gameOver === true) {
	        return;
	      } else if (this.timeElapsed === 60 && this.skier.lives > 0 && this.gameOver === false) {
	        this.gameOver = true;
	        this.showWinModal();
	      } else if (this.collision && this.skier.lives > 0) {
	        this.skier.clear(this.ctx);
	        this.skier.draw(this.ctx);
	        this.collision = false;
	      }
	      this.allObjs.forEach(function (obj) {
	        obj.clear(_this5.ctx);
	        obj.move();
	        obj.wrap();
	        obj.draw(_this5.ctx);
	      });
	      this.skier.clear(this.ctx);
	      this.skier.draw(this.ctx);
	      this.checkCollisions();
	      this.updateTime();
	      window.requestAnimationFrame(this.play);
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject() {
	    _classCallCheck(this, MovingObject);
	
	    this.pos = this.randomPosition();
	    this.initialPos = this.pos;
	    this.velocity = { x: 0, y: 0 };
	  }
	
	  _createClass(MovingObject, [{
	    key: "randomPosition",
	    value: function randomPosition() {
	      var yVal = 100;
	      var xVal = 250;
	      while (!(yVal > 175 || xVal < 175 || xVal > 325)) {
	        xVal = Math.floor(700 * Math.random());
	        yVal = Math.floor(700 * Math.random());
	      }
	      return { x: xVal, y: yVal };
	    }
	  }, {
	    key: "resetPosition",
	    value: function resetPosition() {
	      this.pos = this.initialPos;
	      this.velocity = { x: 0, y: 0 };
	    }
	  }, {
	    key: "wrappedCord",
	    value: function wrappedCord(coord, max) {
	      if (coord < 0) {
	        return max - coord % max;
	      } else if (coord > max) {
	        return coord % max;
	      } else {
	        return coord;
	      }
	    }
	  }, {
	    key: "wrap",
	    value: function wrap() {
	      this.pos.x = this.wrappedCord(this.pos.x, 800);
	      this.pos.y = this.wrappedCord(this.pos.y, 900);
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      this.pos.x = this.pos.x + this.velocity.x;
	      this.pos.y = this.pos.y + this.velocity.y;
	    }
	  }, {
	    key: "moveRight",
	    value: function moveRight(ctx) {
	      this.velocity.x = -5;
	      this.velocity.y = -5;
	      this.clear(ctx);
	      this.move();
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveLeft",
	    value: function moveLeft(ctx) {
	      this.velocity.x = 5;
	      this.velocity.y = -5;
	      this.clear(ctx);
	      this.move();
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveDown",
	    value: function moveDown(ctx) {
	      this.velocity.x = 0;
	      this.velocity.y = -5;
	      this.clear(ctx);
	      this.move();
	      this.draw(ctx);
	    }
	  }, {
	    key: "crashedInto",
	    value: function crashedInto(ctx) {
	      this.velocity.x = 0;
	      this.velocity.y = -20;
	      this.clear(ctx);
	      this.move();
	      this.draw(ctx);
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Snow = exports.Rock = exports.BigTree = exports.Tree = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(2);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tree = exports.Tree = function (_MovingObject) {
	  _inherits(Tree, _MovingObject);
	
	  function Tree() {
	    _classCallCheck(this, Tree);
	
	    var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this));
	
	    _this.tree = new Image();
	    _this.tree.src = 'images/natureObj.png';
	    _this.height = 31;
	    _this.width = 34;
	    return _this;
	  }
	
	  _createClass(Tree, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.drawImage(this.tree, 0, 29, this.height, this.width, this.pos.x, this.pos.y, this.height * .8, this.width * .8);
	    }
	  }, {
	    key: 'clear',
	    value: function clear(ctx) {
	      ctx.clearRect(this.pos.x, this.pos.y, this.height * .8, this.width * .8);
	    }
	  }]);
	
	  return Tree;
	}(_moving_object2.default);
	
	var BigTree = exports.BigTree = function (_MovingObject2) {
	  _inherits(BigTree, _MovingObject2);
	
	  function BigTree() {
	    _classCallCheck(this, BigTree);
	
	    var _this2 = _possibleConstructorReturn(this, (BigTree.__proto__ || Object.getPrototypeOf(BigTree)).call(this));
	
	    _this2.bigTree = new Image();
	    _this2.bigTree.src = 'images/natureObj.png';
	    _this2.height = 33;
	    _this2.width = 64;
	    return _this2;
	  }
	
	  _createClass(BigTree, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.drawImage(this.bigTree, 94, 66, this.height, this.width, this.pos.x, this.pos.y, this.height * .8, this.width * .8);
	    }
	  }, {
	    key: 'clear',
	    value: function clear(ctx) {
	      ctx.clearRect(this.pos.x, this.pos.y, this.height * .8, this.width * .8);
	    }
	  }]);
	
	  return BigTree;
	}(_moving_object2.default);
	
	var Rock = exports.Rock = function (_MovingObject3) {
	  _inherits(Rock, _MovingObject3);
	
	  function Rock() {
	    _classCallCheck(this, Rock);
	
	    var _this3 = _possibleConstructorReturn(this, (Rock.__proto__ || Object.getPrototypeOf(Rock)).call(this));
	
	    _this3.rock = new Image();
	    _this3.rock.src = 'images/natureObj.png';
	    _this3.height = 27;
	    _this3.width = 14;
	    return _this3;
	  }
	
	  _createClass(Rock, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.drawImage(this.rock, 29, 49, this.height, this.width, this.pos.x, this.pos.y, this.height * .8, this.width * .8);
	    }
	  }, {
	    key: 'clear',
	    value: function clear(ctx) {
	      ctx.clearRect(this.pos.x, this.pos.y, this.height * .8, this.width * .8);
	    }
	  }]);
	
	  return Rock;
	}(_moving_object2.default);
	
	var Snow = exports.Snow = function (_MovingObject4) {
	  _inherits(Snow, _MovingObject4);
	
	  function Snow() {
	    _classCallCheck(this, Snow);
	
	    var _this4 = _possibleConstructorReturn(this, (Snow.__proto__ || Object.getPrototypeOf(Snow)).call(this));
	
	    _this4.snow = new Image();
	    _this4.snow.src = 'images/natureObj.png';
	    _this4.height = 77;
	    _this4.width = 20;
	    return _this4;
	  }
	
	  _createClass(Snow, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.drawImage(this.snow, 181, 27, this.height, this.width, this.pos.x, this.pos.y, this.height * .8, this.width * .8);
	    }
	  }, {
	    key: 'clear',
	    value: function clear(ctx) {
	      ctx.clearRect(this.pos.x, this.pos.y, this.height * .8, this.width * .8);
	    }
	  }]);

	  return Snow;
	}(_moving_object2.default);

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Skier = function () {
	  function Skier() {
	    _classCallCheck(this, Skier);
	
	    this.pos = { x: 250, y: 100 };
	    this.velocity = { x: 0, y: 0 };
	    this.lives = 3;
	    this.direction = "stoped";
	    this.sitTimout = "";
	    this.skierImg = new Image();
	    this.startX = 0;
	    this.startY = 0;
	    this.width = 0;
	    this.height = 0;
	  }
	
	  _createClass(Skier, [{
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.drawImage(this.skierImg, this.startX, this.startY, this.width, this.height, this.pos.x, this.pos.y, this.width * .8, this.height * .8);
	    }
	  }, {
	    key: "clear",
	    value: function clear(ctx) {
	      ctx.clearRect(this.pos.x, this.pos.y, this.width * .8, this.height * .8);
	    }
	  }, {
	    key: "resetPosition",
	    value: function resetPosition(ctx) {
	      this.pos = { x: 250, y: 100 };
	      this.direction = "stoped";
	      clearTimeout(this.sitTimout);
	
	      this.skierImg.src = 'images/skier.png';
	      this.startX = 0;
	      this.startY = 0;
	      this.width = 24;
	      this.height = 35;
	    }
	  }, {
	    key: "falls",
	    value: function falls(ctx) {
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
	  }, {
	    key: "sitting",
	    value: function sitting(ctx) {
	      this.clear(ctx);
	      this.skierImg.src = 'images/skier.png';
	      this.startX = 0;
	      this.startY = 39;
	      this.width = 32;
	      this.height = 29;
	
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveRight",
	    value: function moveRight(ctx) {
	      this.direction = "right";
	      this.clear(ctx);
	
	      this.skierImg.src = 'images/skier.png';
	      this.startX = 23;
	      this.startY = 0;
	      this.width = 26;
	      this.height = 34;
	
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveLeft",
	    value: function moveLeft(ctx) {
	      this.direction = "left";
	      this.clear(ctx);
	
	      this.skierImg.src = 'images/skier_reverse.png';
	      this.startX = 224;
	      this.startY = 0;
	      this.width = 26;
	      this.height = 34;
	
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveDown",
	    value: function moveDown(ctx) {
	      this.direction = "down";
	      this.clear(ctx);
	
	      this.skierImg.src = 'images/skier.png';
	      this.startX = 65;
	      this.startY = 0;
	      this.width = 18;
	      this.height = 34;
	
	      this.draw(ctx);
	    }
	  }, {
	    key: "collision",
	    value: function collision(otherObject) {
	      if (this.pos.x < otherObject.pos.x + otherObject.width * .8 && this.pos.x + this.width * .8 > otherObject.pos.x && this.pos.y < otherObject.pos.y + otherObject.height * .8 - 20 && this.pos.y + this.height * .8 > otherObject.pos.y + 20) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }]);
	
	  return Skier;
	}();
	
	exports.default = Skier;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map