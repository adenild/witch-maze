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
  switch (event.target.id) {
    case 'left':
      player.moveLeft()
      break;
    case 'right':
      player.moveRight()
      break;
    case 'down':
      player.moveDown()
      break;
    case 'up':
      player.moveUp()
      break;
    default:
      break;
  }
  maze.redraw();
}

function onKeyDown(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      player.moveLeft()
      break;
    case 39:
    case 68:
      player.moveRight()
      break;
    case 40:
    case 83:
      player.moveDown()
      break;
    case 38:
    case 87:
      player.moveUp()
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
  document.getElementById('generate').addEventListener('click', onClick);
  document.getElementById('up').addEventListener('click', onControlClick);
  document.getElementById('right').addEventListener('click', onControlClick);
  document.getElementById('down').addEventListener('click', onControlClick);
  document.getElementById('left').addEventListener('click', onControlClick);
}