'use strict';

function Breakout(canvas, ctx) {

  const _this = this;

  // --> Private variables
  const canvasHeight = canvas.height;
  const canvasWidth = canvas.width;
  const allBricks = [];

  const BRICK_WIDTH = 30;
  const BRICK_HEIGHT = 10;
  const BRICK_COLOR = 'gray';
  const MAX_BRICKS_X = 8;
  const MAX_BRICKS_Y = 4;

  const PLAYER_SPEED = 25

  let leftTrigger, rightTrigger, topTrigger, botomTrigger;
  let startPressed = false;

  // --> Public variables
  this.gameStart = false;

  // --> Instances 
  const player = new Player({
    width: 60,
    height: 12,
    x: canvasWidth / 2 - 60 / 2,
    y: canvasHeight - 15,
    color: 'red'
  });
  const ball = new Ball({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: 4,
    speed_x: 4,
    speed_y: -4,
    color: 'lightCoral'
  });
  const brick = new Brick({
    padding: 10 
  })

  // --> Game Config
  const myGameArea = {
    start: function() {
      this.interval;

      if (!this.interval)
        this.interval = setInterval(_this.updateGameArea, 20);      
    },
    clear: function() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  }

  // --> Public Methods
  this.startGame = function() {
    myGameArea.start();
    initBricksObject();
  }
  this.updateGameArea = function() {

    if(!_this.gameStart)
      return;

    myGameArea.clear();

    ball.updatePosition();
    player.init();

    createBricks();
  }

  // --> Objects
  function Text(x, y, size, text, color, isCentered) {

    isCentered = isCentered || true;

    this.positionX = x;
    this.positionY = y;
    this.size = size;
    this.text = text;
    this.color = color;
    this.font = 'Arial';

    this.init = function() {
      ctx.font = `${this.size} ${this.font}`;
    }
  }

  function Player(config) {

    this.width = config.width;
    this.height = config.height;
    this.positionX = config.x;
    this.positionY = config.y;

    this.init = function() {
      ctx.fillStyle = config.color;
      ctx.fillRect(this.positionX, this.positionY, this.width, this.height);      
    }
  }

  function Brick(config) {

    this.width = BRICK_WIDTH;
    this.height = BRICK_HEIGHT;
    this.positionX = config.x;
    this.positionY = config.y;
    this.color = BRICK_COLOR;
   
    this.init = function(config) {
      ctx.fillStyle = this.color;
      ctx.fillRect(config.x, config.y, this.width, this.height);
    }
  }

  function Ball(config) {

    this.positionX = config.x;
    this.positionY = config.y;
    this.radius = config.radius;
    this.speed_x = config.speed_x;
    this.speed_y = config.speed_y;
    
    this.init = function() {
      ctx.beginPath();
      ctx.arc(this.positionX, this.positionY, this.radius, 0, 2*Math.PI);
      ctx.strokeStyle = config.color;
      ctx.fillStyle = config.color;
      ctx.stroke();
      ctx.fill();
    }

    this.updatePosition = function() {

      leftTrigger = this.positionX - this.radius;
      rightTrigger = this.positionX + this.radius;
      topTrigger = this.positionY - this.radius;
      botomTrigger = this.positionY + this.radius;

      const val_1 = validation(rightTrigger >= canvasWidth);
      const val_2 = validation(botomTrigger >= canvasHeight);

      if (val_1 || leftTrigger <= 0) {

        config.speed_x = -config.speed_x;

      } else if (topTrigger <= 0) {

        config.speed_y = -config.speed_y;

      } else if (val_2) {
        
        // --> Remove ball from canvas
        this.positionY = canvasHeight + this.radius;

        // youLose();

      } else if (botomTrigger >= player.positionY 
        && rightTrigger >= player.positionX 
        && leftTrigger <= player.positionX + player.WIDTH) {

        config.speed_y = -config.speed_y;

      } 

      this.positionX += config.speed_x;
      this.positionY += config.speed_y;

      this.init();
    }
  }

  // --> Private methods
  function initBricksObject() {
    for (var i = 0; i < MAX_BRICKS_X; i++) {
      allBricks[i] = [];
      for (var j = 0; j < MAX_BRICKS_Y; j++) {
        allBricks[i][j] = {
          x: 0, 
          y: 0, 
          status: true
        };
      }
    }
  }

  function createBricks() {

    for (var i = 0; i < MAX_BRICKS_X; i++) {
      for (var j = 0; j < MAX_BRICKS_Y; j++) {
        if (allBricks[i][j].status) {
          var brickX = (i*(brick.width + 10)) + 10;
          var brickY = (j*(brick.height + 10)) + 10;

          allBricks[i][j].x = brickX;
          allBricks[i][j].y = brickY;

          brick.init({
            x: brickX,
            y: brickY
          });

        }
      }
    }
  }

  // --> Events
  document.onkeydown = function(e) {

    e = e || window.event;

    // --> Player Movement
    if (!startPressed) {
      // --> Left Arrow
      if (e.keyCode === 37) {

        if (player.positionX < 0) 
          return;

        player.positionX -= PLAYER_SPEED;
      // --> Right Arrow
      } else if (e.keyCode === 39) {

        if (player.positionX + player.width >= canvas.width) 
          return;

          player.positionX += PLAYER_SPEED;
        }
    }

    // --> Pause Game with enter
    if (e.keyCode === 13) {
      if(myGameArea.interval) {
        startPressed = !startPressed;

        if (startPressed) {
          clearInterval(myGameArea.interval);
        } else {
          myGameArea.interval = setInterval(_this.updateGameArea, 20);
        }
      }
    }
  }

} 


//===========================================



// function Breakout() {
  
//   var player, 
//       ball,
//       pauseText,
//       loseText,
//       brick;

//   // Ball Triggers
//   var leftTrigger,
//       rightTrigger,
//       topTrigger,
//       botomTrigger;

//   // Canvas Context
//   var ctx;

//   // Canvas Width & Height Values
//   var canvasWidth,
//       canvasHeight

//   // Brick max capacity:
//   var maxBricksX,
//       maxBricksY = 5;

//   // Brick positions 
//   var allBricks = [];
//   var bricksTotalHeight = 0; 
//   var bricksTrigger = 20;

//   // Ball Constants
//   var BALL_RADIUS = 8;
//   var BALL_SPEED_X = 5;
//   var BALL_SPEED_Y = -5;
//   var BALL_COLOR = 'lightCoral';

//   // Player Constants
//   var PLAYER_SPEED = 25;
//   var PLAYER_BAR_WIDTH = 110;
//   var PLAYER_BAR_HEIGHT = 10;
//   var PLAYER_BAR_X = 0;
//   var PLAYER_BAR_Y = 0;
//   var PLAYER_BAR_COLOR = '#2EC4B6';

//   // Brick Constants
//   var BRICK_WIDTH = 40;
//   var BRICK_HEIGHT = 20;
//   var BRICK_COLOR = '#E71D36';
//   var BRICK_OFFSET_LEFT = 10;
//   var BRICK_OFFSET_TOP = 10; 
//   var BRICK_PADDING = 10;

//   // Text Constants
//   var PAUSE_TEXT = 'Pause';
//   var LOSE_TEXT = 'YOU LOSE!';
//   var PAUSE_COLOR = '#2EC4B6';
//   var IS_CENTERED = true;

//   // Controls
//   var startPressed = false;
//   var gameStart = false;
  
// // startGame();
//   window.onload = function() {

//     startGame();

//   } 

//   function startGame() {

//     myGameArea.start();

//     canvasWidth = myGameArea.canvas.width;
//     canvasHeight = myGameArea.canvas.height;

//     PLAYER_BAR_Y = canvasHeight - PLAYER_BAR_HEIGHT;
//     PLAYER_BAR_X = canvasWidth / 2 - PLAYER_BAR_WIDTH / 2;

//     maxBricksX = parseInt(canvasWidth / (BRICK_WIDTH + BRICK_PADDING));

//     player = new Player(PLAYER_BAR_WIDTH, PLAYER_BAR_HEIGHT, PLAYER_BAR_COLOR, PLAYER_BAR_X, PLAYER_BAR_Y - 10);
//     ball = new Ball(canvasWidth / 2, canvasHeight / 2, BALL_RADIUS, BALL_COLOR);
//     brick = new Brick(BRICK_PADDING , BRICK_PADDING);
//     pauseText = new Text(canvasWidth / 2, canvasHeight / 2, '40px', PAUSE_TEXT, PAUSE_COLOR, IS_CENTERED);
//     loseText = new Text(canvasWidth / 2, canvasHeight / 2, '40px', LOSE_TEXT, PAUSE_COLOR, IS_CENTERED);

//     bricksTotalHeight = ((brick.HEIGHT + BRICK_PADDING) * maxBricksY) + bricksTrigger; 

//     initBricksObject();

//   }

//   // ==================
//   // ====== Game Config
//   var myGameArea = {
//     canvas: document.createElement("canvas"),
//     restartBtn: document.createElement("button"),
//     startBtn: document.createElement("button"),
//     start: function() {

//       this.canvas.width = 510;
//       this.canvas.height = 500;
//       this.context = this.canvas.getContext("2d");

//       this.restartBtn.innerText = 'Restart';
//       this.restartBtn.className = 'hidden';

//       this.startBtn.innerText = 'Start';
//       this.startBtn.className = '';

//       this.interval; 

//       if (!this.interval)
//         this.interval = setInterval(updateGameArea, 20);

//       document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//       document.body.insertBefore(this.restartBtn, document.body.childNodes[1]);
//       document.body.insertBefore(this.startBtn, document.body.childNodes[2]);

//       ctx = this.context;

//     },
//     clear: function() {
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     } 
//   };


//   // ==============
//   // ====== Objects
//   function Player(width, height, color, x, y) {

//     this.WIDTH = width;
//     this.HEIGHT = height;
//     this.positionX = x;
//     this.positionY = y;
    
//     this.init = function() {

//       ctx.fillStyle = color;
//       ctx.fillRect(this.positionX, this.positionY, this.WIDTH, this.HEIGHT);

//     }
//   }

//   function Ball(x, y, radius, color) {

//     this.positionX = x;
//     this.positionY = y;
//     this.RADIUS = radius;
//     this.BALL_SPEED_X = BALL_SPEED_X;
//     this.BALL_SPEED_Y = BALL_SPEED_Y;
    
//     this.init = function() {

//       ctx.beginPath();
//       ctx.arc(this.positionX, this.positionY, this.RADIUS, 0, 2*Math.PI);
//       ctx.strokeStyle = color;
//       ctx.fillStyle = color;
//       ctx.stroke();
//       ctx.fill();

//     }

//     this.updateBallPosition = function() {

//       leftTrigger = this.positionX - this.RADIUS;
//       rightTrigger = this.positionX + this.RADIUS;
//       topTrigger = this.positionY - this.RADIUS;
//       botomTrigger = this.positionY + this.RADIUS;

//       brickCrash(leftTrigger, rightTrigger, topTrigger, botomTrigger);
      
//       if (rightTrigger >= canvasWidth || leftTrigger <= 0) {

//         BALL_SPEED_X = -BALL_SPEED_X;

//       } else if (topTrigger <= 0) {

//         BALL_SPEED_Y = -BALL_SPEED_Y;

//       } else if (botomTrigger >= canvasHeight) {
        
//         // Remove ball from canvas
//         this.positionY = canvasHeight + this.RADIUS;

//         youLose();

//       } else if (botomTrigger >= player.positionY 
//         && rightTrigger >= player.positionX 
//         && leftTrigger <= player.positionX + player.WIDTH) {

//         BALL_SPEED_Y = -BALL_SPEED_Y;

//       } 

//       this.positionX += BALL_SPEED_X;
//       this.positionY += BALL_SPEED_Y;

//       this.init();

//     }
//   }

//   function Text(x, y, size, text, color, isCentered) {

//     isCentered = isCentered || true;

//     this.positionX = x;
//     this.positionY = y;
//     this.font = 'Arial';
//     this.size = size;
//     this.text = text;
//     this.color = color;

//     this.init = function() {

//       var isCenteredValue

//       ctx.font = this.size + ' ' + this.font;
//       isCenteredValue = isCentered ? this.positionX - (ctx.measureText(this.text).width / 2) : this.positionX;
//       ctx.fillStyle = this.color;
//       ctx.fillText(this.text, isCenteredValue, this.positionY);

//     }
//   }

//   function Brick(x, y) {

//     this.WIDTH = BRICK_WIDTH;
//     this.HEIGHT = BRICK_HEIGHT;
//     this.positionX = x;
//     this.positionY = y;
//     this.color = BRICK_COLOR;
   
//     this.init = function(x, y) {

//       ctx.fillStyle = this.color;
//       ctx.fillRect(x, y, this.WIDTH, this.HEIGHT);

//     }
//   }


//   // ==============
//   // ====== Methods
//   function updateGameArea() {

//     if (!gameStart)
//       return;

//     myGameArea.clear();

//     ball.updateBallPosition();
//     player.init();

//     createBricks();

//   }

//   function youLose() {

//     myGameArea.restartBtn.classList.remove('hidden');
//     loseText.init();

//     clearInterval(myGameArea.interval);
//     myGameArea.interval = null;

//   }

//   function initBricksObject() {

//     for (var i = 0; i < maxBricksX; i++) {

//       allBricks[i] = [];

//       for (var j = 0; j < maxBricksY; j++) {

//         allBricks[i][j] = {x: 0, y: 0, status: true};

//       }

//     }

//   }

//   function createBricks() {

//     for (var i = 0; i < maxBricksX; i++) {

//       for (var j = 0; j < maxBricksY; j++) {

//         if (allBricks[i][j].status) {

//           var brickX = (i*(brick.WIDTH + BRICK_PADDING)) + BRICK_OFFSET_LEFT;
//           var brickY = (j*(brick.HEIGHT + BRICK_PADDING)) + BRICK_OFFSET_TOP;

//           allBricks[i][j].x = brickX;
//           allBricks[i][j].y = brickY;

//           brick.init(brickX, brickY);

//         }

//       }

//     }

//   }


//   function brickCrash(leftTrigger, rightTrigger, topTrigger, botomTrigger) {

//     if (ball.positionY > bricksTotalHeight) 
//       return; 

//     var _brick;

//     for (var i = 0; i < maxBricksX; i++) {

//       for (var j = 0; j < maxBricksY; j++) {

//         _brick = allBricks[i][j];

//         if(_brick.status) {

//           if (topTrigger <= _brick.y + brick.HEIGHT 
//               && ball.positionX >= _brick.x 
//               && ball.positionX <= _brick.x + brick.WIDTH) {

//             BALL_SPEED_Y = -BALL_SPEED_Y;
//             _brick.status = false;

//           } 

//         }

//       }

//     }

//   }

//   // =============
//   // ====== Events
//   document.onkeydown = function(e) {

//       e = e || window.event;

//       // Player Movement
//       // Check if game is paused to avoid moving on start
//       if (!startPressed) {

//         // Left Arrow
//         if (e.keyCode === 37) {

//           if (player.positionX === 0) 
//             return;

//           player.positionX -= PLAYER_SPEED;

//         // Right Arrow
//         } else if (e.keyCode === 39) {

//           if (player.positionX + player.WIDTH >= myGameArea.canvas.width) 
//             return;

//             player.positionX += PLAYER_SPEED;
          
//           }

//       }

//       // Pause Game with enter
//       if (e.keyCode === 13) {

//         if(myGameArea.interval) {

//           startPressed = !startPressed;

//           if (startPressed) {

//             clearInterval(myGameArea.interval);

//             pauseText.init();

//           } else {

//             myGameArea.interval = setInterval(updateGameArea, 20);

//           }

//         }

//       }

//   };

//   myGameArea.restartBtn.onclick = function() {

//     BALL_SPEED_X = 5;
//     BALL_SPEED_Y = -5;

//     startGame();

//     myGameArea.startBtn.classList.add('hidden');

//   }

//   myGameArea.startBtn.onclick = function() {

//     myGameArea.startBtn.classList.add('hidden');

//     gameStart = true;

//   }

// }