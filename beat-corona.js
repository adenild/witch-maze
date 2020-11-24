let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;
let reward;
let randomModule;
let seed;

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