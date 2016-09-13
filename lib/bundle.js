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
	
	    this.dimX = 800;
	    this.dimY = 900;
	    this.ctx = ctx;
	
	    this.playing = true;
	    this.gameOver = false;
	    this.collision = false;
	
	    this.skier = new _skier2.default();
	    this.natureObjs = [];
	
	    this.play = this.play.bind(this);
	    this.pause = this.pause.bind(this);
	    this.newGame = this.newGame.bind(this);
	    this.setGame = this.setGame.bind(this);
	    this.resetGame = this.resetGame.bind(this);
	    this.checkCollisions = this.checkCollisions.bind(this);
	
	    this.setGame();
	
	    key('space', function () {
	      _this.pause();
	    });
	
	    key('left', function () {
	      if (_this.playing === true) {
	        _this.natureObjs.forEach(function (obj) {
	          obj.moveLeft(_this.ctx);
	        });
	        _this.checkCollisions();
	      }
	    });
	    key('down', function () {
	      if (_this.playing === true) {
	        _this.natureObjs.forEach(function (obj) {
	          obj.moveDown(_this.ctx);
	        });
	        _this.checkCollisions();
	      }
	    });
	    key('right', function () {
	      if (_this.playing === true) {
	        _this.natureObjs.forEach(function (obj) {
	          obj.moveRight(_this.ctx);
	        });
	        _this.checkCollisions();
	      }
	    });
	  }
	
	  _createClass(Game, [{
	    key: 'newGame',
	    value: function newGame() {
	      this.resetGame();
	      this.setGame();
	      this.play();
	    }
	  }, {
	    key: 'resetGame',
	    value: function resetGame() {
	      var _this2 = this;
	
	      this.skier.clear(this.ctx);
	      this.skier.resetPosition();
	      this.natureObjs.forEach(function (obj) {
	        obj.clear(_this2.ctx);
	        obj.resetPosition();
	      });
	      this.natureObjs = [];
	    }
	  }, {
	    key: 'setGame',
	    value: function setGame() {
	      var _this3 = this;
	
	      this.skier.draw(this.ctx);
	      this.addNatureObjs();
	      this.natureObjs.forEach(function (obj) {
	        obj.draw(_this3.ctx);
	      });
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (this.playing === true) {
	        this.playing = false;
	      } else {
	        this.playing = true;
	        this.play();
	      }
	    }
	  }, {
	    key: 'addNatureObjs',
	    value: function addNatureObjs() {
	      for (var i = 0; i < 20; i++) {
	        this.natureObjs.push(new _nature.Tree());
	      }
	
	      for (var _i = 0; _i < 5; _i++) {
	        this.natureObjs.push(new _nature.Rock());
	      }
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      var _this4 = this;
	
	      this.natureObjs.find(function (obj) {
	        if (_this4.skier.collision(obj) && _this4.collision === false) {
	          _this4.collision = true;
	          _this4.skier.falls();
	        }
	      });
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap(object) {
	      if (object.pos.y < 0 || object.pos.x > this.dimX || object.pos.x < 0) {
	        object.resetPosition();
	        object.clear(this.ctx);
	        object.draw(this.ctx);
	      }
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      var _this5 = this;
	
	      if (this.playing === false) {
	        return;
	      } else {
	        console.log("playing game!");
	      }
	      if (this.collision && this.skier.lives === 0) {
	        alert("GAME OVER");
	        this.playing = false;
	        this.gameover = true;
	        this.resetGame();
	      } else if (this.collision && this.skier.lives > 0) {
	        console.log(this.skier.lives);
	        this.skier.clear(this.ctx);
	        this.skier.resetPosition();
	        this.skier.draw(this.ctx);
	      }
	      this.natureObjs.forEach(function (obj) {
	        obj.clear(_this5.ctx);
	        obj.move();
	        _this5.wrap(obj);
	        obj.draw(_this5.ctx);
	        _this5.collision = false;
	      });
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
	    this.velocity = { x: 0, y: 0 };
	    this.width = 25;
	    this.height = 25;
	  }
	
	  _createClass(MovingObject, [{
	    key: "randomPosition",
	    value: function randomPosition() {
	      return {
	        x: 800 * Math.random(),
	        y: 900 * Math.random()
	      };
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.beginPath();
	      ctx.moveTo(this.pos.x, this.pos.y);
	      ctx.fillStyle = this.color;
	      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	    }
	  }, {
	    key: "clear",
	    value: function clear(ctx) {
	      ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
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
	    key: "collision",
	    value: function collision(otherObject) {
	      if (this.pos.x === otherObject.pos.x && this.pos.y === otherObject.pos.y) {
	        return true;
	      }
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Rock = exports.Tree = exports.Nature = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(2);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Nature = exports.Nature = function (_MovingObject) {
	  _inherits(Nature, _MovingObject);
	
	  function Nature() {
	    _classCallCheck(this, Nature);
	
	    var _this = _possibleConstructorReturn(this, (Nature.__proto__ || Object.getPrototypeOf(Nature)).call(this));
	
	    _this.initialPos = _this.pos;
	    return _this;
	  }
	
	  _createClass(Nature, [{
	    key: "resetPosition",
	    value: function resetPosition() {
	      this.pos = this.initialPos;
	    }
	  }]);
	
	  return Nature;
	}(_moving_object2.default);
	
	var Tree = exports.Tree = function (_Nature) {
	  _inherits(Tree, _Nature);
	
	  function Tree() {
	    _classCallCheck(this, Tree);
	
	    var _this2 = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this));
	
	    _this2.color = "#7efa0a";
	    return _this2;
	  }
	
	  return Tree;
	}(Nature);
	
	var Rock = exports.Rock = function (_Nature2) {
	  _inherits(Rock, _Nature2);
	
	  function Rock() {
	    _classCallCheck(this, Rock);
	
	    var _this3 = _possibleConstructorReturn(this, (Rock.__proto__ || Object.getPrototypeOf(Rock)).call(this));
	
	    _this3.color = "#aaa";
	    return _this3;
	  }
	
	  return Rock;
	}(Nature);

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
	
	    this.width = 25;
	    this.height = 25;
	    this.pos = { x: 400, y: 200 };
	    this.velocity = { x: 0, y: 0 };
	    this.color = "#f6fa0a";
	    this.lives = 3;
	  }
	
	  _createClass(Skier, [{
	    key: "resetPosition",
	    value: function resetPosition() {
	      this.color = "#f6fa0a";
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.beginPath();
	      ctx.fillStyle = this.color;
	      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	    }
	  }, {
	    key: "clear",
	    value: function clear(ctx) {
	      ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
	    }
	  }, {
	    key: "falls",
	    value: function falls(ctx) {
	      this.lives -= 1;
	      this.color = "#000000";
	      this.clear(ctx);
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveRight",
	    value: function moveRight(ctx) {
	      this.color = "#0af6fa";
	      this.clear(ctx);
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveLeft",
	    value: function moveLeft(ctx) {
	      this.color = "#7efa0a";
	      this.clear(ctx);
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveDown",
	    value: function moveDown(ctx) {
	      this.color = "#fa0a7e";
	      this.clear(ctx);
	      this.draw(ctx);
	    }
	  }, {
	    key: "collision",
	    value: function collision(otherObject) {
	      if (this.pos.x === otherObject.pos.x && this.pos.y === otherObject.pos.y) {
	        return true;
	      }
	    }
	  }]);
	
	  return Skier;
	}();
	
	exports.default = Skier;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map