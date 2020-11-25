let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;
let reward;
let randomModule;
let seed;

var x_down = null;                                                        
var y_down = null;


function getTouches(event) {
  return event.touches ||             // browser API
         event.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(event) {
  const firstTouch = getTouches(event)[0];                                      
  x_down = firstTouch.clientX;                                      
  y_down = firstTouch.clientY;                                      
};                                                

function handleTouchMove(event) {
  if ( ! x_down || ! y_down ) {
      return;
  }

  var x_up = event.touches[0].clientX;                                    
  var y_up = event.touches[0].clientY;

  var x_diff = x_down - x_up;
  var y_diff = y_down - y_up;

  if ( Math.abs( x_diff ) > Math.abs( y_diff ) ) {/*most significant*/
      if ( x_diff > 0 ) {
          player.moveHandler("left")
      } else {
          player.moveHandler("right")
      }                       
  } else {
      if ( y_diff > 0 ) {
          player.moveHandler("up")
      } else { 
          player.moveHandler("down")
      }                                                                 
  }
  maze.redraw();
  x_down = null;
  y_down = null;                                             
};

function onClick() {
  seed = new Date().getTime();
  randomModule = new MersenneTwister(seed);
  player.reset();
  reward.reset();
  maze.cols = document.getElementById("cols").value;
  maze.rows = document.getElementById("rows").value;
  maze.generate();
}

function onControlClick(event) {
  player.moveHandler(event.target.id)
}

function onKeyDown(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      player.moveHandler("left")
      break;
    case 39:
    case 68:
      player.moveHandler("right")
      break;
    case 40:
    case 83:
      player.moveHandler("down")
      break;
    case 38:
    case 87:
      player.moveHandler("up")
      break;
    default:
      break;
  }
  maze.redraw();
}

async function onLoad() {

  seed = new Date().getTime();
  randomModule = new MersenneTwister(seed);

  canvas = document.getElementById('mainForm');
  ctx = canvas.getContext('2d');

  player = new Player(20);
  $('#movesLeft').text(player.moves)

  reward = new Reward();
  maze = new Maze(10, 10, 50, await obtem_csv());

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('touchstart', handleTouchStart, false);        
  document.addEventListener('touchmove', handleTouchMove, false);
  document.getElementById('generate').addEventListener('click', onClick);
  document.getElementById('up').addEventListener('click', onControlClick);
  document.getElementById('right').addEventListener('click', onControlClick);
  document.getElementById('down').addEventListener('click', onControlClick);
  document.getElementById('left').addEventListener('click', onControlClick);
}
