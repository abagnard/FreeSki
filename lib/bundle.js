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
	  var canvas = document.getElementsByTagName("canvas");
	  window.game = new Game(canvas);
	});
	
	// window.game.setUpGame();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(2);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _skier = __webpack_require__(3);
	
	var _skier2 = _interopRequireDefault(_skier);
	
	var _tree = __webpack_require__(4);
	
	var _tree2 = _interopRequireDefault(_tree);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	Game.NUM_TREES = 50;
	
	var Game = function () {
	  function Game(canvas) {
	    var _this = this;
	
	    _classCallCheck(this, Game);
	
	    this.ctx = canvas.getContext("2d");
	    this.dimX = 800;
	    this.dimY = 900;
	
	    this.gameOver = false;
	    this.playing = true;
	    this.collision = false;
	
	    this.trees = [];
	    this.setGame();
	
	    this.play = this.play.bind(this);
	
	    key('space', function () {
	      if (_this.playing === true) {
	        _this.playing = false;
	      } else if (_this.playing === false) {
	        _this.playing = true;
	        _this.play();
	      }
	    });
	    key('left', function () {
	      if (_this.playing === true) {
	        _this.trees.forEach(function (tree) {
	          tree.moveLeft(_this.ctx);
	        });
	        _this.checkCollisions();
	      }
	    });
	    key('down', function () {
	      if (_this.playing === true) {
	        _this.trees.forEach(function (tree) {
	          tree.moveDown(_this.ctx);
	        });
	        _this.checkCollisions();
	      }
	    });
	    key('right', function () {
	      if (_this.playing === true) {
	        _this.trees.forEach(function (tree) {
	          tree.moveRight(_this.ctx);
	        });
	        _this.checkCollisions();
	      }
	    });
	  }
	
	  _createClass(Game, [{
	    key: 'setGame',
	    value: function setGame() {
	      var _this2 = this;
	
	      this.skier = new _skier2.default();
	      this.skier.draw(this.ctx);
	      this.addTree();
	      this.trees.forEach(function (tree) {
	        tree.draw(_this2.ctx);
	      });
	      this.play();
	    }
	  }, {
	    key: 'resetGame',
	    value: function resetGame() {
	      var _this3 = this;
	
	      this.skier.clear(this.ctx);
	      this.skier.reset();
	      this.trees.forEach(function (tree) {
	        tree.clear(_this3.ctx);
	        tree.reset();
	      });
	      this.trees = [];
	    }
	  }, {
	    key: 'addTree',
	    value: function addTree() {
	      for (var i = 0; i < this.NUM_TREES; i++) {
	        this.trees.push(new _tree2.default());
	      }
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      var _this4 = this;
	
	      this.trees.find(function (tree) {
	        if (_this4.skier.collision(tree) && _this4.collision === false) {
	          _this4.collision = true;
	          _this4.skier.lives -= 1;
	        }
	      });
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap(object) {
	      if (object.direction === "south" && object.pos.y > this.dimY + 100 || object.direction === "north" && object.pos.y < -this.dimX - 100) {
	        return object.resetPosition();
	      }
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      var _this5 = this;
	
	      if (this.playing === false) {
	        return;
	      }
	      if (this.collision && this.skier.lives === 0) {
	        alert("GAME OVER");
	        this.playing = false;
	        this.gameover = true;
	        this.resetGame();
	      } else if (this.collision && this.skier.lives > 0) {
	        console.log(this.skier.lives);
	        this.skier.clear(this.ctx);
	        this.skier.reset();
	        this.skier.move();
	        this.skier.draw(this.ctx);
	      }
	      this.trees.forEach(function (tree) {
	        tree.clear(_this5.ctx);
	        tree.move();
	        _this5.wrap(tree);
	        tree.draw(_this5.ctx);
	        _this5.collision = false;
	      });
	      window.requestAnimationFrame(this.play);
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;
	
	//   moveObjects(delta) {
	//     this.allObjects().forEach((object) => {
	//       object.move(delta);
	//     });
	//   }
	//
	//   randomPosition() {
	//     return [
	//       Game.DIM_X * Math.random(),
	//       Game.DIM_Y * Math.random()
	//     ];
	//   }
	//
	//   remove(object) {
	//     if (object instanceof Bullet) {
	//       this.bullets.splice(this.bullets.indexOf(object), 1);
	//     } else if (object instanceof Asteroid) {
	//       this.asteroids.splice(this.asteroids.indexOf(object), 1);
	//     } else if (object instanceof Ship) {
	//       this.ships.splice(this.ships.indexOf(object), 1);
	//     } else {
	//       throw "wtf?";
	//     }
	//   }
	//
	// }

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
	
	    this.pos = { x: 0, y: 0 };
	    this.velocity = { x: 0, y: 0 };
	    this.width = 25;
	    this.height = 25;
	    this.direction = "south";
	  }
	
	  _createClass(MovingObject, [{
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.beginPath();
	      ctx.moveTo(this.pos.x, this.pos.y);
	      ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
	      ctx.fillStyle = this.color;
	      ctx.fill();
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
	      this.velocity.x = -10;
	      this.velocity.y = -10;
	      this.clear(ctx);
	      this.move();
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveLeft",
	    value: function moveLeft(ctx) {
	      this.velocity.x = 10;
	      this.velocity.y = -10;
	      this.clear(ctx);
	      this.move();
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveDown",
	    value: function moveDown(ctx) {
	      this.velocity.x = 0;
	      this.velocity.y = -10;
	      this.clear(ctx);
	      this.move();
	      this.draw(ctx);
	    }
	  }, {
	    key: "resetPosition",
	    value: function resetPosition() {
	      // if(this.direction === "south"){
	      //   this.pos.x = this.pos.x;
	      //   this.pos.y = -1000;
	      // } else {
	      //   this.pos.x = this.pos.x;
	      //   this.pos.y = 1000;
	      // }
	    }
	  }, {
	    key: "collision",
	    value: function collision(otherObject) {
	      if (this.pos.x < otherObject.pos.x + otherObject.width && this.pos.x + this.width > otherObject.pos.x && this.pos.y < otherObject.pos.y + otherObject.height && this.height + this.pos.y > otherObject.pos.y) {
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(2);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Skier = function (_MovingObject) {
	  _inherits(Skier, _MovingObject);
	
	  function Skier() {
	    _classCallCheck(this, Skier);
	
	    var _this = _possibleConstructorReturn(this, (Skier.__proto__ || Object.getPrototypeOf(Skier)).call(this));
	
	    _this.pos = { x: 400, y: 200 };
	    _this.velocity = { x: 0, y: 0 };
	    _this.color = "#f6fa0a";
	    _this.lives = 3;
	    return _this;
	  }
	
	  _createClass(Skier, [{
	    key: "reset",
	    value: function reset() {
	      this.color = "#f6fa0a";
	    }
	  }, {
	    key: "moveRight",
	    value: function moveRight(ctx) {
	      this.color = "#0af6fa";
	      this.clear(ctx);
	      this.move();
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveLeft",
	    value: function moveLeft(ctx) {
	      this.color = "#7efa0a";
	      this.clear(ctx);
	      this.move();
	      this.draw(ctx);
	    }
	  }, {
	    key: "moveDown",
	    value: function moveDown(ctx) {
	      this.color = "#fa0a7e";
	      this.clear(ctx);
	      this.move();
	      this.draw(ctx);
	    }
	  }]);
	
	  return Skier;
	}(_moving_object2.default);
	
	exports.default = Skier;

/***/ },
/* 4 */
/***/ function(module, exports) {

	
	
	// randomPosition() {
	//   return [
	//   Game.DIM_X * Math.random(),
	//   Game.DIM_Y * Math.random()
	// ];
	// }
	"use strict";

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map