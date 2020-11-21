let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;
let reward;

function onClick() {
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

  canvas = document.getElementById('mainForm');
  ctx = canvas.getContext('2d');

  player = new Player(200);
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


var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            player.moveHandler("left")
        } else {
            player.moveHandler("right")
        }                       
    } else {
        if ( yDiff > 0 ) {
            player.moveHandler("up")
        } else { 
            player.moveHandler("down")
        }                                                                 
    }
    maze.redraw();
    xDown = null;
    yDown = null;                                             
};